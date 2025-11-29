<section class="video-detail">
    <div class="video-player">
        <?php if (!empty($video['embed_url'])): ?>
            <iframe src="<?php echo htmlspecialchars($video['embed_url']); ?>" allowfullscreen></iframe>
        <?php else: ?>
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #000; color: white;">
                <div style="text-align: center;">
                    <h3>Video Player</h3>
                    <p>Embed URL not available</p>
                    <?php if (!empty($video['filecode'])): ?>
                        <p><strong>File Code:</strong> <?php echo htmlspecialchars($video['filecode']); ?></p>
                    <?php endif; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <div class="video-content">
        <div class="video-header">
            <h1><?php echo htmlspecialchars($video['title'] ?? 'Unknown Title'); ?></h1>
        </div>

        <?php if (!empty($video['deskripsi'] ?? $video['description'])): ?>
            <div class="video-description">
                <?php echo nl2br(htmlspecialchars($video['deskripsi'] ?? $video['description'])); ?>
            </div>
        <?php endif; ?>

        <div class="video-details-grid">
            <?php if (!empty($video['filecode'])): ?>
                <div class="detail-item">
                    <div class="detail-label">File Code</div>
                    <div class="detail-value"><?php echo htmlspecialchars($video['filecode']); ?></div>
                </div>
            <?php endif; ?>

            <?php if (isset($video['duration']) && $video['duration'] > 0): ?>
                <div class="detail-item">
                    <div class="detail-label">Duration</div>
                    <div class="detail-value"><?php echo gmdate('H:i:s', $video['duration']); ?></div>
                </div>
            <?php endif; ?>

            <?php if (!empty($video['uploader'])): ?>
                <div class="detail-item">
                    <div class="detail-label">Uploader</div>
                    <div class="detail-value"><?php echo htmlspecialchars($video['uploader']); ?></div>
                </div>
            <?php endif; ?>

            <?php if (!empty($video['category'])): ?>
                <div class="detail-item">
                    <div class="detail-label">Category</div>
                    <div class="detail-value"><?php echo htmlspecialchars($video['category']); ?></div>
                </div>
            <?php endif; ?>

            <?php if (!empty($video['quality'])): ?>
                <div class="detail-item">
                    <div class="detail-label">Quality</div>
                    <div class="detail-value"><?php echo htmlspecialchars($video['quality']); ?></div>
                </div>
            <?php endif; ?>

            <?php if (isset($video['views']) && $video['views'] > 0): ?>
                <div class="detail-item">
                    <div class="detail-label">Views</div>
                    <div class="detail-value"><?php echo number_format($video['views']); ?></div>
                </div>
            <?php endif; ?>

            <?php if (isset($video['likes']) && $video['likes'] > 0): ?>
                <div class="detail-item">
                    <div class="detail-label">Likes</div>
                    <div class="detail-value"><?php echo number_format($video['likes']); ?></div>
                </div>
            <?php endif; ?>

            <?php if (!empty($video['upload_date'])): ?>
                <div class="detail-item">
                    <div class="detail-label">Upload Date</div>
                    <div class="detail-value"><?php echo htmlspecialchars($video['upload_date']); ?></div>
                </div>
            <?php endif; ?>

            <?php if (isset($video['size']) && $video['size'] > 0): ?>
                <div class="detail-item">
                    <div class="detail-label">File Size</div>
                    <div class="detail-value"><?php echo format_file_size($video['size']); ?></div>
                </div>
            <?php endif; ?>
        </div>

        <?php
        $tags = $video['tag'] ?? $video['tags'] ?? [];
        if (is_string($tags)) {
            $tags = array_map('trim', explode(',', $tags));
        }
        if (!empty($tags)):
        ?>
            <div class="video-tags">
                <h3>Tags</h3>
                <div>
                    <?php foreach ($tags as $tag): ?>
                        <?php if (!empty(trim($tag))): ?>
                            <span class="tag"><?php echo htmlspecialchars(trim($tag)); ?></span>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>

        <div style="margin-top: 2rem;">
            <a href="index.php" class="btn btn-secondary">← Back to Gallery</a>
        </div>
    </div>
</section>
