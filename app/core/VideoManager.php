<?php
/**
 * Video Manager Core Class
 *
 * Handles all video data operations including caching, pagination, and search
 *
 * @package VideoPortal
 * @author System Administrator
 * @version 1.0.0
 */

class VideoManager {
    private $cache;
    private $last_error;

    /**
     * Constructor
     *
     * @param VideoCache $cache Cache instance
     */
    public function __construct(VideoCache $cache = null) {
        $this->cache = $cache ?: new VideoCache();
        $this->last_error = null;
    }

    /**
     * Get pages metadata with caching
     *
     * @return array|null Metadata array or null if not available
     */
    public function getPagesMetadata() {
        try {
            $cache_key = 'pages_metadata';

            if (AppConfig::CACHE_ENABLED) {
                $cached = $this->cache->get($cache_key, 'pages');
                if ($cached !== false) {
                    AppConfig::log("Pages metadata retrieved from cache", 'access', 'INFO');
                    return $cached;
                }
            }

            $metadata_file = AppConfig::OUTPUT_DIR . '/pages_metadata.json';
            if (!file_exists($metadata_file)) {
                $this->last_error = "Metadata file not found";
                AppConfig::log("Metadata file not found: $metadata_file", 'error', 'WARN');
                return null;
            }

            $metadata = json_decode(file_get_contents($metadata_file), true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->last_error = "Invalid JSON in metadata file: " . json_last_error_msg();
                AppConfig::log("JSON decode error in metadata: " . json_last_error_msg(), 'error', 'ERROR');
                return null;
            }

            if (AppConfig::CACHE_ENABLED) {
                $this->cache->set($cache_key, $metadata, 'pages');
            }

            AppConfig::log("Pages metadata loaded from file", 'access', 'INFO');
            return $metadata;

        } catch (Exception $e) {
            $this->last_error = $e->getMessage();
            AppConfig::log("Error getting pages metadata: " . $e->getMessage(), 'error', 'ERROR');
            return null;
        }
    }

    /**
     * Get paginated video data with caching
     *
     * @param int $page_number Page number (1-based)
     * @return array|null Video data array or null if not available
     */
    public function getPageData($page_number) {
        try {
            $page_number = max(1, (int)$page_number);
            $cache_key = "page_{$page_number}";

            if (AppConfig::CACHE_ENABLED) {
                $cached = $this->cache->get($cache_key, 'pages');
                if ($cached !== false) {
                    AppConfig::log("Page $page_number data retrieved from cache", 'access', 'INFO');
                    return $cached;
                }
            }

            $page_file = AppConfig::OUTPUT_DIR . "/data_page_{$page_number}.json";
            if (!file_exists($page_file)) {
                $this->last_error = "Page file not found: $page_file";
                AppConfig::log("Page file not found: $page_file", 'error', 'WARN');
                return null;
            }

            $data = json_decode(file_get_contents($page_file), true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->last_error = "Invalid JSON in page file: " . json_last_error_msg();
                AppConfig::log("JSON decode error in page $page_number: " . json_last_error_msg(), 'error', 'ERROR');
                return null;
            }

            if (AppConfig::CACHE_ENABLED) {
                $this->cache->set($cache_key, $data, 'pages');
            }

            AppConfig::log("Page $page_number data loaded from file", 'access', 'INFO');
            return $data;

        } catch (Exception $e) {
            $this->last_error = $e->getMessage();
            AppConfig::log("Error getting page $page_number data: " . $e->getMessage(), 'error', 'ERROR');
            return null;
        }
    }

    /**
     * Search videos across multiple pages with caching
     *
     * @param string $query Search query
     * @param int $limit Maximum results to return
     * @return array Search results
     */
    public function searchVideos($query, $limit = null) {
        try {
            if (empty(trim($query))) {
                return [];
            }

            $limit = $limit ?: AppConfig::MAX_SEARCH_RESULTS;
            $cache_key = "search_" . md5($query . '_' . $limit);

            if (AppConfig::CACHE_ENABLED) {
                $cached = $this->cache->get($cache_key, 'search');
                if ($cached !== false) {
                    AppConfig::log("Search results for '$query' retrieved from cache", 'access', 'INFO');
                    return $cached;
                }
            }

            $metadata = $this->getPagesMetadata();
            if (!$metadata) {
                return [];
            }

            $results = [];
            $total_pages = $metadata['total_pages'];
            $query_lower = strtolower(trim($query));

            // Limit search to first 20 pages for performance
            $max_search_pages = min($total_pages, 20);

            for ($page = 1; $page <= $max_search_pages && count($results) < $limit; $page++) {
                $videos = $this->getPageData($page);
                if (!$videos) continue;

                foreach ($videos as $video) {
                    if (count($results) >= $limit) break;

                    if ($this->videoMatchesQuery($video, $query_lower)) {
                        $results[] = $video;
                    }
                }
            }

            if (AppConfig::CACHE_ENABLED) {
                $this->cache->set($cache_key, $results, 'search');
            }

            AppConfig::log("Search completed for '$query': " . count($results) . " results", 'access', 'INFO');
            return $results;

        } catch (Exception $e) {
            $this->last_error = $e->getMessage();
            AppConfig::log("Search error for '$query': " . $e->getMessage(), 'error', 'ERROR');
            return [];
        }
    }

    /**
     * Check if video matches search query
     *
     * @param array $video Video data
     * @param string $query_lower Lowercase search query
     * @return bool True if video matches query
     */
    private function videoMatchesQuery($video, $query_lower) {
        $title = strtolower($video['title'] ?? '');
        $tags = implode(' ', array_map('strtolower', $video['tag'] ?? []));
        $description = strtolower($video['deskripsi'] ?? '');

        return strpos($title, $query_lower) !== false ||
               strpos($tags, $query_lower) !== false ||
               strpos($description, $query_lower) !== false;
    }

    /**
     * Get video by filecode with caching
     *
     * @param string $filecode Video filecode
     * @return array|null Video data or null if not found
     */
    public function getVideoByFilecode($filecode) {
        try {
            if (empty($filecode)) {
                $this->last_error = "Filecode cannot be empty";
                return null;
            }

            $cache_key = "video_{$filecode}";

            if (AppConfig::CACHE_ENABLED) {
                $cached = $this->cache->get($cache_key, 'videos');
                if ($cached !== false) {
                    AppConfig::log("Video $filecode retrieved from cache", 'access', 'INFO');
                    return $cached;
                }
            }

            $metadata = $this->getPagesMetadata();
            if (!$metadata || !isset($metadata['filecode_page_map'][$filecode])) {
                $this->last_error = "Video not found in metadata";
                AppConfig::log("Video $filecode not found in metadata", 'access', 'WARN');
                return null;
            }

            $page_number = $metadata['filecode_page_map'][$filecode];
            $videos = $this->getPageData($page_number);

            if (!$videos) {
                $this->last_error = "Page data not available";
                return null;
            }

            foreach ($videos as $video) {
                $current_filecode = $video['filecode'] ?? $video['file_code'] ?? '';
                if ($current_filecode === $filecode) {
                    if (AppConfig::CACHE_ENABLED) {
                        $this->cache->set($cache_key, $video, 'videos');
                    }

                    AppConfig::log("Video $filecode found on page $page_number", 'access', 'INFO');
                    return $video;
                }
            }

            $this->last_error = "Video not found in page data";
            AppConfig::log("Video $filecode not found in page $page_number", 'access', 'WARN');
            return null;

        } catch (Exception $e) {
            $this->last_error = $e->getMessage();
            AppConfig::log("Error getting video $filecode: " . $e->getMessage(), 'error', 'ERROR');
            return null;
        }
    }

    /**
     * Get video statistics
     *
     * @return array Statistics data
     */
    public function getStatistics() {
        $metadata = $this->getPagesMetadata();

        if (!$metadata) {
            return [
                'total_videos' => 0,
                'total_pages' => 0,
                'last_updated' => null,
                'status' => 'no_data'
            ];
        }

        return [
            'total_videos' => $metadata['total_videos'] ?? 0,
            'total_pages' => $metadata['total_pages'] ?? 0,
            'last_updated' => $metadata['last_updated'] ?? null,
            'status' => 'available'
        ];
    }

    /**
     * Clear all cache
     *
     * @return bool True if cache cleared successfully
     */
    public function clearCache() {
        try {
            $this->cache->clear();
            AppConfig::log("All cache cleared", 'access', 'INFO');
            return true;
        } catch (Exception $e) {
            $this->last_error = $e->getMessage();
            AppConfig::log("Error clearing cache: " . $e->getMessage(), 'error', 'ERROR');
            return false;
        }
    }

    /**
     * Get last error message
     *
     * @return string|null Error message or null if no error
     */
    public function getLastError() {
        return $this->last_error;
    }
}
?>
