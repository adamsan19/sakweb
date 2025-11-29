<section class="no-data">
    <h2><?php echo htmlspecialchars($error ?? 'An Error Occurred'); ?></h2>
    <p><?php echo htmlspecialchars($error ?? 'Something went wrong while processing your request.'); ?></p>
    <div class="control-group">
        <a href="index.php" class="btn btn-primary">← Back to Gallery</a>
        <a href="?clear_cache=true" class="btn btn-secondary">Clear Cache & Retry</a>
    </div>
</section>
