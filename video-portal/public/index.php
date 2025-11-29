<?php
/**
 * Video Portal Main Page
 *
 * Displays paginated video gallery with search functionality
 *
 * @package VideoPortal
 * @author System Administrator
 * @version 1.0.0
 */

// Bootstrap application
require_once __DIR__ . '/../app/config/AppConfig.php';
require_once __DIR__ . '/../app/core/VideoCache.php';
require_once __DIR__ . '/../app/core/VideoManager.php';

// Initialize components
$videoManager = new VideoManager();
$current_page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$search_query = $_GET['search'] ?? '';
$clear_cache = isset($_GET['clear_cache']) && $_GET['clear_cache'] === 'true';

// Handle cache clear
if ($clear_cache) {
    $videoManager->clearCache();
    header('Location: ?');
    exit;
}

// Get metadata and data
$metadata = $videoManager->getPagesMetadata();
$stats = $videoManager->getStatistics();

// Set page title
$page_title = $search_query ?
    "Search: " . htmlspecialchars($search_query) . " - Video Portal" :
    "Video Portal - " . number_format($stats['total_videos']) . " Videos";

// Include header template
include __DIR__ . '/templates/header.php';

// Display main content
if (!$metadata) {
    include __DIR__ . '/templates/no_data.php';
} else {
    if ($search_query) {
        include __DIR__ . '/templates/search_results.php';
    } else {
        include __DIR__ . '/templates/video_gallery.php';
    }
}

// Include footer template
include __DIR__ . '/templates/footer.php';
?>
