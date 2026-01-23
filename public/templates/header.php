<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($page_title ?? 'Video Portal'); ?></title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <h1><a href="index.php" style="color: white; text-decoration: none;">Video Portal</a></h1>
            </div>
            <nav>
                <ul>
                    <li><a href="index.php">Gallery</a></li>
                    <li><a href="run_fetch.php">Script Control</a></li>
                    <li><a href="?clear_cache=true" onclick="return confirm('Clear all cache?')">Clear Cache</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <div class="container">

            <section class="search-section">
                <form class="search-form" id="searchForm">
                    <input type="text" id="searchInput" name="search" placeholder="Search videos..."
                           value="<?php echo htmlspecialchars($search_query); ?>" class="search-input">
                    <button type="submit" class="search-btn">Search</button>
                    <?php if ($search_query): ?>
                        <button type="button" id="clearSearchBtn" class="btn btn-secondary">Clear</button>
                    <?php endif; ?>
                </form>
            </section>
