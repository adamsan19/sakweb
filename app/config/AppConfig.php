<?php
/**
 * Application Configuration Class
 *
 * @package VideoPortal
 * @author System Administrator
 * @version 1.0.0
 */

class AppConfig {
    // Directory Configuration
    const BASE_DIR = __DIR__ . '/../..';
    const STORAGE_DIR = self::BASE_DIR . '/storage';
    const CACHE_DIR = self::STORAGE_DIR . '/cache';
    const LOGS_DIR = self::STORAGE_DIR . '/logs';
    const OUTPUT_DIR = self::STORAGE_DIR . '/output';

    // Cache Configuration
    const CACHE_ENABLED = true;
    const CACHE_DURATION = 300; // 5 minutes in seconds
    const CACHE_PREFIX = 'video_portal_';

    // Python Script Configuration
    const PYTHON_SCRIPT = __DIR__ . '/../../scripts/main_async_fetch.py';
    const PYTHON_TIMEOUT = 3600; // 1 hour in seconds

    // Application Settings
    const ITEMS_PER_PAGE = 200;
    const MAX_SEARCH_RESULTS = 100;
    const MAX_LOG_LINES = 1000;

    // Security Settings
    const ALLOWED_ORIGINS = ['*'];
    const MAX_FILE_SIZE = 10485760; // 10MB

    /**
     * Initialize application directories
     *
     * @return void
     * @throws Exception If directory creation fails
     */
    public static function initialize() {
        $directories = [
            self::STORAGE_DIR,
            self::CACHE_DIR,
            self::LOGS_DIR,
            self::OUTPUT_DIR,
            self::CACHE_DIR . '/pages',
            self::CACHE_DIR . '/search',
            self::CACHE_DIR . '/videos'
        ];

        foreach ($directories as $directory) {
            if (!is_dir($directory) && !mkdir($directory, 0755, true)) {
                throw new Exception("Failed to create directory: " . $directory);
            }
        }

        // Security: Create .htaccess in storage
        self::createSecurityFiles();
    }

    /**
     * Create security files to protect storage directory
     *
     * @return void
     */
    private static function createSecurityFiles() {
        $htaccess_content = "Order deny,allow\nDeny from all\n";
        $htaccess_file = self::STORAGE_DIR . '/.htaccess';

        if (!file_exists($htaccess_file)) {
            file_put_contents($htaccess_file, $htaccess_content);
        }

        // Create index.html to prevent directory listing
        $index_file = self::STORAGE_DIR . '/index.html';
        if (!file_exists($index_file)) {
            file_put_contents($index_file, '<!DOCTYPE html><html><head><title>403 Forbidden</title></head><body><h1>Forbidden</h1><p>You don\'t have permission to access this resource.</p></body></html>');
        }
    }

    /**
     * Get cache file path for a specific key
     *
     * @param string $key Cache key
     * @param string $type Cache type (pages, search, videos)
     * @return string Full cache file path
     */
    public static function getCacheFilePath($key, $type = 'general') {
        $safe_key = preg_replace('/[^a-zA-Z0-9_-]/', '_', $key);
        $filename = self::CACHE_PREFIX . $type . '_' . $safe_key . '.cache';
        return self::CACHE_DIR . '/' . $type . '/' . $filename;
    }

    /**
     * Get log file path
     *
     * @param string $type Log type (execution, error, access)
     * @return string Full log file path
     */
    public static function getLogFilePath($type = 'execution') {
        $date = date('Y-m-d');
        return self::LOGS_DIR . '/' . $type . '_' . $date . '.log';
    }

    /**
     * Log message to file
     *
     * @param string $message Message to log
     * @param string $type Log type
     * @param string $level Log level (INFO, WARN, ERROR)
     * @return void
     */
    public static function log($message, $type = 'execution', $level = 'INFO') {
        $log_file = self::getLogFilePath($type);
        $timestamp = date('Y-m-d H:i:s');
        $log_entry = "[$timestamp] [$level] $message\n";

        file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
    }
}

// Initialize configuration
try {
    AppConfig::initialize();
} catch (Exception $e) {
    error_log("Configuration initialization failed: " . $e->getMessage());
}
?>
