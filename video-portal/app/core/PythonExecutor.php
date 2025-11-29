<?php
/**
 * Python Script Execution Manager
 *
 * Handles execution of Python data fetching scripts with monitoring
 *
 * @package VideoPortal
 * @author System Administrator
 * @version 1.0.0
 */

class PythonExecutor {
    private $python_script;
    private $lock_file;
    private $status_file;
    private $max_execution_time;

    /**
     * Constructor
     *
     * @param string $python_script Path to Python script
     * @param int $max_execution_time Maximum execution time in seconds
     */
    public function __construct($python_script = null, $max_execution_time = null) {
        $this->python_script = $python_script ?: AppConfig::PYTHON_SCRIPT;
        $this->lock_file = AppConfig::STORAGE_DIR . '/python_execution.lock';
        $this->status_file = AppConfig::STORAGE_DIR . '/execution_status.json';
        $this->max_execution_time = $max_execution_time ?: AppConfig::PYTHON_TIMEOUT;
    }

    /**
     * Check if Python is available on the system
     *
     * @return array Python availability information
     */
    public function checkPythonAvailability() {
        $output = null;
        $return_code = null;

        exec('python3 --version 2>&1', $output, $return_code);

        $available = $return_code === 0;
        $version = $available ? implode(' ', $output) : 'Not available';

        return [
            'available' => $available,
            'version' => $version,
            'return_code' => $return_code
        ];
    }

    /**
     * Check if script is currently running
     *
     * @return bool True if script is running
     */
    public function isScriptRunning() {
        if (!file_exists($this->lock_file)) {
            return false;
        }

        $lock_time = filemtime($this->lock_file);

        // Check for stale lock (older than max execution time)
        if (time() - $lock_time > $this->max_execution_time) {
            $this->cleanupStaleLock();
            return false;
        }

        return true;
    }

    /**
     * Get execution status
     *
     * @return array Execution status information
     */
    public function getExecutionStatus() {
        if (!file_exists($this->status_file)) {
            return [
                'status' => 'never_run',
                'message' => 'Script has never been executed',
                'last_execution' => null
            ];
        }

        try {
            $status = json_decode(file_get_contents($this->status_file), true);
            return $status ?: [
                'status' => 'unknown',
                'message' => 'Invalid status file',
                'last_execution' => null
            ];
        } catch (Exception $e) {
            return [
                'status' => 'error',
                'message' => 'Failed to read status file: ' . $e->getMessage(),
                'last_execution' => null
            ];
        }
    }

    /**
     * Execute Python script
     *
     * @param bool $async Whether to execute asynchronously
     * @return array Execution result
     */
    public function executeScript($async = true) {
        // Check if already running
        if ($this->isScriptRunning()) {
            AppConfig::log("Script execution attempted while already running", 'execution', 'WARN');
            return [
                'success' => false,
                'message' => 'Script is already running. Please wait for completion.',
                'async' => $async
            ];
        }

        // Check Python availability
        $python_info = $this->checkPythonAvailability();
        if (!$python_info['available']) {
            AppConfig::log("Python not available for script execution", 'execution', 'ERROR');
            return [
                'success' => false,
                'message' => 'Python 3 is not available on this system.',
                'python_available' => false
            ];
        }

        // Check script file existence
        if (!file_exists($this->python_script)) {
            AppConfig::log("Python script not found: " . $this->python_script, 'execution', 'ERROR');
            return [
                'success' => false,
                'message' => 'Python script not found: ' . $this->python_script,
                'script_exists' => false
            ];
        }

        try {
            // Create lock file
            file_put_contents($this->lock_file, json_encode([
                'started_at' => date('Y-m-d H:i:s'),
                'pid' => getmypid(),
                'async' => $async
            ]));

            // Initialize status
            $initial_status = [
                'status' => 'running',
                'started_at' => date('Y-m-d H:i:s'),
                'async' => $async,
                'message' => 'Script execution started'
            ];
            file_put_contents($this->status_file, json_encode($initial_status, JSON_PRETTY_PRINT));

            // Build command
            $log_file = AppConfig::getLogFilePath('python_execution');
            $command = "python3 " . escapeshellarg($this->python_script) . " 2>&1";

            if ($async) {
                // Asynchronous execution
                $pid = shell_exec("nohup $command >> " . escapeshellarg($log_file) . " 2>&1 & echo $!");
                $pid = trim($pid);

                $status = [
                    'status' => 'running',
                    'started_at' => date('Y-m-d H:i:s'),
                    'pid' => $pid,
                    'async' => true,
                    'message' => 'Script running in background'
                ];

                AppConfig::log("Python script started asynchronously with PID: $pid", 'execution', 'INFO');
            } else {
                // Synchronous execution
                $output = [];
                $return_code = null;
                exec($command, $output, $return_code);

                // Log output
                file_put_contents($log_file, implode("\n", $output) . "\n", FILE_APPEND);

                $status = [
                    'status' => $return_code === 0 ? 'completed' : 'error',
                    'started_at' => date('Y-m-d H:i:s'),
                    'completed_at' => date('Y-m-d H:i:s'),
                    'return_code' => $return_code,
                    'async' => false,
                    'message' => $return_code === 0 ? 'Script completed successfully' : 'Script execution failed'
                ];

                // Remove lock file for sync execution
                if (file_exists($this->lock_file)) {
                    unlink($this->lock_file);
                }

                AppConfig::log("Python script executed synchronously, return code: $return_code", 'execution', 'INFO');
            }

            // Update status
            file_put_contents($this->status_file, json_encode($status, JSON_PRETTY_PRINT));

            return [
                'success' => true,
                'message' => $async ? 'Script started in background' : 'Script execution completed',
                'pid' => $async ? $pid : null,
                'return_code' => !$async ? $return_code : null,
                'async' => $async,
                'status' => $status
            ];

        } catch (Exception $e) {
            // Cleanup on error
            $this->cleanupStaleLock();

            AppConfig::log("Python script execution error: " . $e->getMessage(), 'execution', 'ERROR');
            return [
                'success' => false,
                'message' => 'Execution error: ' . $e->getMessage(),
                'async' => $async
            ];
        }
    }

    /**
     * Stop running script
     *
     * @return array Stop operation result
     */
    public function stopScript() {
        if (!$this->isScriptRunning()) {
            return [
                'success' => false,
                'message' => 'No script is currently running'
            ];
        }

        try {
            $status = $this->getExecutionStatus();
            $pid = $status['pid'] ?? null;

            if ($pid) {
                exec("kill " . escapeshellarg($pid));
                AppConfig::log("Python script stopped with PID: $pid", 'execution', 'INFO');
            }

            // Update status
            $status['status'] = 'stopped';
            $status['stopped_at'] = date('Y-m-d H:i:s');
            $status['message'] = 'Script was stopped manually';
            file_put_contents($this->status_file, json_encode($status, JSON_PRETTY_PRINT));

            // Remove lock file
            if (file_exists($this->lock_file)) {
                unlink($this->lock_file);
            }

            AppConfig::log("Script execution stopped", 'execution', 'INFO');
            return [
                'success' => true,
                'message' => 'Script stopped successfully'
            ];

        } catch (Exception $e) {
            AppConfig::log("Error stopping script: " . $e->getMessage(), 'execution', 'ERROR');
            return [
                'success' => false,
                'message' => 'Error stopping script: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Cleanup stale lock file
     *
     * @return bool True if lock was cleaned up
     */
    private function cleanupStaleLock() {
        if (file_exists($this->lock_file) && time() - filemtime($this->lock_file) > $this->max_execution_time) {
            unlink($this->lock_file);
            AppConfig::log("Stale lock file cleaned up", 'execution', 'WARN');
            return true;
        }
        return false;
    }

    /**
     * Get execution logs
     *
     * @param int $lines Number of lines to return
     * @return array Log lines
     */
    public function getExecutionLogs($lines = 50) {
        $log_file = AppConfig::getLogFilePath('python_execution');

        if (!file_exists($log_file)) {
            return ["Log file not found"];
        }

        try {
            $log_content = file($log_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            return array_slice($log_content, -$lines);
        } catch (Exception $e) {
            AppConfig::log("Error reading execution logs: " . $e->getMessage(), 'error', 'ERROR');
            return ["Error reading log file: " . $e->getMessage()];
        }
    }
}
?>
