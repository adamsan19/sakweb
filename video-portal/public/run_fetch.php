<?php
/**
 * Python Script Execution Interface
 *
 * Web interface for executing Python data fetching scripts
 *
 * @package VideoPortal
 * @author System Administrator
 * @version 1.0.0
 */

// Bootstrap application
require_once __DIR__ . '/../app/config/AppConfig.php';
require_once __DIR__ . '/../app/core/PythonExecutor.php';

// Initialize Python executor
$pythonExecutor = new PythonExecutor();

// Handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');

    $action = $_POST['action'] ?? '';

    switch ($action) {
        case 'execute':
            $async = isset($_POST['async']) && $_POST['async'] === 'true';
            $result = $pythonExecutor->executeScript($async);
            echo json_encode($result);
            break;

        case 'stop':
            $result = $pythonExecutor->stopScript();
            echo json_encode($result);
            break;

        case 'status':
            $result = $pythonExecutor->getExecutionStatus();
            echo json_encode($result);
            break;

        case 'logs':
            $lines = isset($_POST['lines']) ? (int)$_POST['lines'] : 50;
            $result = $pythonExecutor->getExecutionLogs($lines);
            echo json_encode(['logs' => $result]);
            break;

        default:
            echo json_encode([
                'success' => false,
                'message' => 'Invalid action'
            ]);
    }

    exit;
}

// Get current status for display
$status = $pythonExecutor->getExecutionStatus();
$python_info = $pythonExecutor->checkPythonAvailability();

// Set page title
$page_title = 'Script Execution - Video Portal';

// Include header template
include __DIR__ . '/templates/header.php';

// Display execution interface
include __DIR__ . '/templates/script_execution.php';

// Include footer template
include __DIR__ . '/templates/footer.php';
?>
