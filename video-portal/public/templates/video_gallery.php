<section class="stats">
    <div class="stat-card">
        <div class="stat-number"><?php echo number_format($stats['total_videos']); ?></div>
        <div class="stat-label">Total Videos</div>
    </div>
    <div class="stat-card">
        <div class="stat-number"><?php echo number_format($stats['total_pages']); ?></div>
        <div class="stat-label">Total Pages</div>
    </div>
    <div class="stat-card">
        <div class="stat-number"><?php echo $stats['status'] === 'available' ? 'Available' : 'No Data'; ?></div>
        <div class="stat-label">Status</div>
    </div>
    <div class="stat-card">
        <div class="stat-number">
            <?php
            if ($stats['last_updated']) {
                echo date('M j, H:i', strtotime($stats['last_updated']));
            } else {
                echo 'Never';
            }
            ?>
        </div>
        <div class="stat-label">Last Updated</div>
    </div>
</section>

<section class="video-grid">
    <?php foreach ($videos as $video): ?>
        <div class="video-card" data-filecode="<?php echo htmlspecialchars($video['filecode'] ?? $video['file_code'] ?? ''); ?>">
            <div class="video-thumbnail">
                <img src="<?php echo htmlspecialchars($video['thumbnail'] ?? ''); ?>" alt="<?php echo htmlspecialchars($video['title'] ?? ''); ?>" loading="lazy">
                <?php if (isset($video['duration']) && $video['duration'] > 0): ?>
                    <span class="video-duration"><?php echo gmdate('i:s', $video['duration']); ?></span>
                <?php endif; ?>
            </div>
            <div class="video-info">
                <h3 class="video-title"><?php echo htmlspecialchars($video['title'] ?? 'Unknown Title'); ?></h3>
                <div class="video-meta">
                    <div class="video-tags">
                        <?php
                        $tags = $video['tag'] ?? $video['tags'] ?? [];
                        if (is_string($tags)) {
                            $tags = array_map('trim', explode(',', $tags));
                        }
                        $tags = array_slice($tags, 0, 3); // Show max 3 tags
                        foreach ($tags as $tag):
                            if (!empty(trim($tag))):
                        ?>
                            <span class="tag"><?php echo htmlspecialchars(trim($tag)); ?></span>
                        <?php
                            endif;
                        endforeach;
                        ?>
                    </div>
                </div>
            </div>
        </div>
    <?php endforeach; ?>
</section>

<?php if ($metadata && $metadata['total_pages'] > 1): ?>
<section class="pagination">
    <?php
    $total_pages = $metadata['total_pages'];
    $current_page = $current_page;
    $start_page = max(1, $current_page - 2);
    $end_page = min($total_pages, $current_page + 2);

    // Previous button
    if ($current_page > 1):
    ?>
        <a href="?page=<?php echo $current_page - 1; ?>" class="page-btn">« Previous</a>
    <?php endif; ?>

    <?php for ($i = $start_page; $i <= $end_page; $i++): ?>
        <a href="?page=<?php echo $i; ?>" class="page-btn <?php echo $i === $current_page ? 'active' : ''; ?>">
            <?php echo $i; ?>
        </a>
    <?php endfor; ?>

    <?php if ($end_page < $total_pages): ?>
        <span class="page-btn disabled">...</span>
        <a href="?page=<?php echo $total_pages; ?>" class="page-btn"><?php echo $total_pages; ?></a>
    <?php endif; ?>

    <?php if ($current_page < $total_pages): ?>
        <a href="?page=<?php echo $current_page + 1; ?>" class="page-btn">Next »</a>
    <?php endif; ?>
</section>
<?php endif; ?>
