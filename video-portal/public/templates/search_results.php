<section class="search-results">
    <h2>Search Results for "<?php echo htmlspecialchars($search_query); ?>"</h2>
    <p class="search-meta">
        Found <?php echo count($videos); ?> result<?php echo count($videos) !== 1 ? 's' : ''; ?>
        <?php if (count($videos) === AppConfig::MAX_SEARCH_RESULTS): ?>
            (showing first <?php echo AppConfig::MAX_SEARCH_RESULTS; ?> results)
        <?php endif; ?>
    </p>

    <?php if (empty($videos)): ?>
        <div class="no-results">
            <h3>No videos found</h3>
            <p>Try different keywords or check your spelling.</p>
            <a href="index.php" class="btn btn-secondary">← Back to Gallery</a>
        </div>
    <?php else: ?>
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

        <div style="text-align: center; margin-top: 2rem;">
            <a href="index.php" class="btn btn-secondary">← Back to Gallery</a>
        </div>
    <?php endif; ?>
</section>
