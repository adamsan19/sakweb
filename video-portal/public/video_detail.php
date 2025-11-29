<?php
/**
 * Video Detail Page
 *
 * Displays detailed information for a specific video
 *
 * @package VideoPortal
 * @author System Administrator
 * @version 1.0.0
 */

// Bootstrap application
require_once __DIR__ . '/../app/config/AppConfig.php';
require_once __DIR__ . '/../app/core/VideoManager.php';

// Initialize components
$videoManager = new VideoManager();
$filecode = $_GET['filecode'] ?? '';
$video = null;
$error = null;

// Get video data
if (!empty($filecode)) {
    $video = $videoManager->getVideoByFilecode($filecode);
    if (!$video) {
        $error = "Video not found";
    }
} else {
    $error = "No video filecode provided";
}

// Set page title
if ($video) {
    $page_title = htmlspecialchars($video['title']) . " - Video Portal";
} else {
    $page_title = "Video Not Found - Video Portal";
}

// Include header template
include __DIR__ . '/templates/header.php';

// Display video detail or error
if ($video) {
    include __DIR__ . '/templates/video_detail.php';
} else {
    include __DIR__ . '/templates/error.php';
}

// Include footer template
include __DIR__ . '/templates/footer.php';
?>
