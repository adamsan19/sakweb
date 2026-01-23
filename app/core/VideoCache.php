<?php
/**
 * Video Cache Management Class
 *
 * Handles caching operations with file-based storage
 *
 * @package VideoPortal
 * @author System Administrator
 * @version 1.0.0
 */

class VideoCache {
    private $cache_duration;

    /**
     * Constructor
     *
     * @param int $cache_duration Cache duration in seconds
     */
    public function __construct($cache_duration = null) {
        $this->cache_duration = $cache_duration ?: AppConfig::CACHE_DURATION;
    }

    /**
     * Get cached data
     *
     * @param string $key Cache key
     * @param string $type Cache type
     * @return mixed Cached data or false if not found/expired
     */
    public function get($key, $type = 'general') {
        try {
            $cache_file = AppConfig::getCacheFilePath($key, $type);

            if (!file_exists($cache_file)) {
                return false;
            }

            // Check cache expiration
            if (filemtime($cache_file) + $this->cache_duration < time()) {
                unlink($cache_file);
                return false;
            }

            $data = unserialize(file_get_contents($cache_file));
            AppConfig::log("Cache hit for key: $key (type: $type)", 'access', 'DEBUG');
            return $data;

        } catch (Exception $e) {
            AppConfig::log("Cache read error for key: $key - " . $e->getMessage(), 'error', 'ERROR');
            return false;
        }
    }

    /**
     * Set cache data
     *
     * @param string $key Cache key
     * @param mixed $data Data to cache
     * @param string $type Cache type
     * @return bool True if successful
     */
    public function set($key, $data, $type = 'general') {
        try {
            $cache_file = AppConfig::getCacheFilePath($key, $type);
            $temp_file = $cache_file . '.tmp';

            // Write to temporary file first
            if (file_put_contents($temp_file, serialize($data), LOCK_EX) === false) {
                throw new Exception("Failed to write cache file");
            }

            // Atomic rename
            if (!rename($temp_file, $cache_file)) {
                throw new Exception("Failed to rename cache file");
            }

            AppConfig::log("Cache set for key: $key (type: $type)", 'access', 'DEBUG');
            return true;

        } catch (Exception $e) {
            AppConfig::log("Cache write error for key: $key - " . $e->getMessage(), 'error', 'ERROR');
            return false;
        }
    }

    /**
     * Clear cache
     *
     * @param string $type Specific cache type to clear, or null for all
     * @return bool True if successful
     */
    public function clear($type = null) {
        try {
            if ($type) {
                $pattern = AppConfig::CACHE_DIR . '/' . $type . '/*.cache';
            } else {
                $pattern = AppConfig::CACHE_DIR . '/*/*.cache';
            }

            $files = glob($pattern);
            $deleted_count = 0;

            foreach ($files as $file) {
                if (is_file($file)) {
                    unlink($file);
                    $deleted_count++;
                }
            }

            AppConfig::log("Cache cleared: $deleted_count files (type: " . ($type ?: 'all') . ")", 'access', 'INFO');
            return true;

        } catch (Exception $e) {
            AppConfig::log("Cache clear error: " . $e->getMessage(), 'error', 'ERROR');
            return false;
        }
    }

    /**
     * Get cache statistics
     *
     * @return array Cache statistics
     */
    public function getStats() {
        $stats = [
            'total_files' => 0,
            'total_size' => 0,
            'types' => []
        ];

        $cache_types = ['pages', 'search', 'videos', 'general'];

        foreach ($cache_types as $type) {
            $type_dir = AppConfig::CACHE_DIR . '/' . $type;
            if (!is_dir($type_dir)) continue;

            $files = glob($type_dir . '/*.cache');
            $type_stats = [
                'files' => count($files),
                'size' => 0
            ];

            foreach ($files as $file) {
                $type_stats['size'] += filesize($file);
            }

            $stats['types'][$type] = $type_stats;
            $stats['total_files'] += $type_stats['files'];
            $stats['total_size'] += $type_stats['size'];
        }

        return $stats;
    }
}
?>
