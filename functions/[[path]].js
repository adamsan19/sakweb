 // functions/[[path]].js
// Cloudflare Pages Functions format with Complete SEO Schema Structure

export async function onRequest(context) {
    const { request, env, next } = context;
    const url = new URL(request.url);
    const p = url.pathname;

    if (p === "/" || p === "") return withCache(request, () => list(url, env, "1"));
    if (p === "/robots.txt") return robots();
    if (p === "/sitemap.xml") return sitemap(url, env);
    if (p === "/video-sitemap.xml") return videoSitemap(url, env);
    if (p === "/sitemap-pages.xml") return pagesSitemap(url, env);

    if (p.startsWith("/e/")) return withCache(request, () => detail(url, env));
    if (p.startsWith("/f/")) return withCache(request, () => search(url, env));
    if (p.startsWith("/page/")) return withCache(request, () => list(url, env));

    return next();
}

async function withCache(req, fn) {
    const url = new URL(req.url);
    const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    const noCache = url.searchParams.has("nocache");

    if (isLocal || noCache) return fn();

    const cache = caches.default;
    let res = await cache.match(req);
    if (res) return res;
    res = await fn();
    res = new Response(res.body, res);
    res.headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400");
    await cache.put(req, res.clone());
    return res;
}

async function get(url, env, path) {
    try {
        const r = await env.ASSETS.fetch(new URL(path, url.origin));
        if (!r.ok) return null;
        const contentType = r.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) return null;
        return await r.json();
    } catch (e) {
        console.error(`Error fetching ${path}:`, e);
    }
    return null;
}

const norm = (t) => (t || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
function h(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const p2 = (t) => {
    const n = norm(t).replace(/\s+/g, "");
    return !n ? "__" : n.length === 1 ? n + "_" : n.slice(0, 2);
};
const p3 = (t) => {
    const n = norm(t).replace(/\s+/g, "");
    return !n ? "___" : n.length === 1 ? n + "__" : n.length === 2 ? n + "_" : n.slice(0, 3);
};

const CONFIG = {
    name: "VideoStream",
    logo: "https://wsrv.nl/?url=https://videostream.pages.dev/images/apple-touch-icon.png",
    description: "Situs streaming video viral terbaru dan terlengkap 2024 - Nonton video gratis kualitas HD",
    foundingDate: "2024-01-01",
    socialMedia: [
        "https://www.facebook.com/videostream",
        "https://twitter.com/videostream",
        "https://www.instagram.com/videostream"
    ],
    keywords: "video viral, streaming video, download video, video terbaru, nonton video gratis",
    language: "id-ID",
    copyrightYear: new Date().getFullYear()
};

const IMG_ERR = "this.onerror=null;this.src='data:image/svg+xml,%3Csvg%20width=%22200%22%20height=%22200%22%20viewBox=%220%200%20100%100%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect%20width=%22100%22%20height=%22100%22%20fill=%22%23FEF2F2%22/%3E%3Ctext%20x=%2250%22%20y=%2250%22%20text-anchor=%22middle%22%20dominant-baseline=%22middle%22%20fill=%22%23F87171%22%20style=%22font-family:sans-serif;font-size:10px;font-weight:bold%22%3EIMAGE%20ERROR%3C/text%3E%3C/svg%3E';";

async function detail(url, env) {
    const origin = url.origin;
    const id = url.pathname.split("/")[2];
    const lookup = await get(url, env, "/data/lookup_shard.json");
    if (!lookup || !lookup[id]) return notFound(url);

    const shardKey = lookup[id];
    const data = await get(url, env, `/data/detail/${shardKey}.json`);
    if (!data) return notFound(url);

    const v = data.find((x) => x.f === id);
    if (!v) return notFound(url);

    // Generate title words for related scoring
    const titleWords = norm(v.t).split(" ").filter(w => w.length >= 3);
    const related = data
        .filter((x) => x.f !== id)
        .map((x) => {
            let score = 0;
            if (v.kt && x.kt && norm(v.kt) === norm(x.kt)) score += 20;
            const nt = norm(x.t);
            const matches = titleWords.filter((w) => nt.includes(w));
            score += matches.length * 10;
            if (matches.length >= 2) score += 30;
            return { ...x, _score: score };
        })
        .sort((a, b) => b._score - a._score || (parseInt(b.vw) || 0) - (parseInt(a.vw) || 0))
        .slice(0, 16);

    // Prepare data for schema
    const publisherId = `${origin}/#organization`;
    const websiteId = `${origin}/#website`;
    const webpageId = origin + url.pathname;
    const videoId = origin + url.pathname + "#video";
    const articleId = origin + url.pathname + "#article";
    const breadcrumbId = origin + url.pathname + "#breadcrumb";
    const itemListId = origin + url.pathname + "#itemlist";

    const catName = v.kt || "Video";
    const catUrl = v.kt_url || `${origin}/f/video`;
    const durationISO = v.dr || "PT10M30S";
    const uploadDate = v.up || new Date().toISOString();
    const viewCount = parseInt(v.vw) || 0;
    const videoTitle = v.t_esc || h(v.t);
    const videoDescription = v.ds_esc || v.ds || `Nonton streaming video ${videoTitle} kualitas HD gratis. Video viral terbaru 2024.`;
    const thumbnailUrl = v.sp || v.si;
    const embedUrl = v.pe;
    const contentUrl = v.dl || v.pe;

    // Format duration for display
    const durationFormatted = v.ln || (v.d ? `${Math.floor(v.d / 60)}:${(v.d % 60).toString().padStart(2, '0')}` : '10:30');

    // ============================================
    // COMPLETE SCHEMA STRUCTURE
    // ============================================

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            // 1. ORGANIZATION SCHEMA
            {
                "@type": "Organization",
                "@id": publisherId,
                "name": CONFIG.name,
                "url": origin,
                "logo": {
                    "@type": "ImageObject",
                    "url": CONFIG.logo,
                    "width": 180,
                    "height": 180
                },
                "sameAs": CONFIG.socialMedia,
                "foundingDate": CONFIG.foundingDate,
                "description": CONFIG.description,
                "email": "contact@videostream.pages.dev",
                "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "ID"
                }
            },
            // 2. WEBSITE SCHEMA
            {
                "@type": "WebSite",
                "@id": websiteId,
                "url": origin,
                "name": CONFIG.name,
                "description": CONFIG.description,
                "publisher": { "@id": publisherId },
                "inLanguage": CONFIG.language,
                "keywords": CONFIG.keywords,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": `${origin}/f/{search_term_string}`
                    },
                    "query-input": "required name=search_term_string"
                }
            },
            // 3. WEBPAGE SCHEMA
            {
                "@type": "WebPage",
                "@id": webpageId,
                "url": webpageId,
                "name": `${videoTitle} - ${CONFIG.name}`,
                "isPartOf": { "@id": websiteId },
                "description": videoDescription,
                "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": thumbnailUrl,
                    "width": 1280,
                    "height": 720
                },
                "breadcrumb": { "@id": breadcrumbId },
                "datePublished": uploadDate,
                "dateModified": uploadDate,
                "inLanguage": CONFIG.language,
                "mainEntity": { "@id": videoId }
            },
            // 4. BREADCRUMBLIST SCHEMA
            {
                "@type": "BreadcrumbList",
                "@id": breadcrumbId,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Beranda",
                        "item": origin
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": catName,
                        "item": catUrl
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": videoTitle,
                        "item": webpageId
                    }
                ]
            },
            // 5. VIDEOOBJECT SCHEMA (LENGKAP)
            {
                "@type": "VideoObject",
                "@id": videoId,
                "name": videoTitle,
                "description": videoDescription,
                "thumbnailUrl": [thumbnailUrl],
                "uploadDate": uploadDate,
                "duration": durationISO,
                "contentUrl": contentUrl,
                "embedUrl": embedUrl,
                "interactionStatistic": [
                    {
                        "@type": "InteractionCounter",
                        "interactionType": "https://schema.org/WatchAction",
                        "userInteractionCount": viewCount
                    }
                ],
                "publisher": { "@id": publisherId },
                "mainEntityOfPage": { "@id": webpageId },
                "isFamilyFriendly": "false",
                "contentSize": v.sz || "N/A",
                "encodingFormat": "video/mp4",
                "regionsAllowed": "ID"
            },
            // 6. ARTICLE SCHEMA
            {
                "@type": "Article",
                "@id": articleId,
                "headline": videoTitle,
                "description": videoDescription,
                "image": [thumbnailUrl],
                "datePublished": uploadDate,
                "dateModified": uploadDate,
                "author": {
                    "@type": "Organization",
                    "name": CONFIG.name,
                    "url": origin
                },
                "publisher": { "@id": publisherId },
                "mainEntityOfPage": { "@id": webpageId },
                "keywords": v.kt || catName
            },
            // 7. ITEMLIST SCHEMA (Untuk Video Terkait)
            {
                "@type": "ItemList",
                "@id": itemListId,
                "name": "Video Terkait",
                "description": `Video-video lain yang mirip dengan ${videoTitle}`,
                "numberOfItems": related.length,
                "itemListOrder": "https://schema.org/ItemListOrderDescending",
                "itemListElement": related.map((rv, idx) => ({
                    "@type": "ListItem",
                    "position": idx + 1,
                    "item": {
                        "@type": "VideoObject",
                        "name": rv.t_esc || h(rv.t),
                        "url": `${origin}/e/${rv.f}`,
                        "thumbnailUrl": rv.si || rv.sp,
                        "interactionStatistic": {
                            "@type": "InteractionCounter",
                            "interactionType": "https://schema.org/WatchAction",
                            "userInteractionCount": parseInt(rv.vw) || 0
                        }
                    }
                }))
            }
        ]
    };

    // Tambahkan Related Video Objects ke graph
    related.forEach((rv) => {
        schema["@graph"].push({
            "@type": "VideoObject",
            "name": rv.t_esc || h(rv.t),
            "thumbnailUrl": rv.si || rv.sp,
            "url": `${origin}/e/${rv.f}`,
            "interactionStatistic": {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/WatchAction",
                "userInteractionCount": parseInt(rv.vw) || 0
            }
        });
    });

    // HTML Breadcrumbs with Schema
    const breadcrumbsHtml = `
    <nav class="breadcrumbs" aria-label="Breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
        <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <a href="/" itemprop="item"><span itemprop="name">Beranda</span></a>
            <meta itemprop="position" content="1">
        </span> / 
        <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <a href="${catUrl}" itemprop="item"><span itemprop="name">${h(catName)}</span></a>
            <meta itemprop="position" content="2">
        </span> / 
        <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <span itemprop="name">${h(v.t)}</span>
            <meta itemprop="position" content="3">
        </span>
    </nav>`;

    const formatNumber = (num) => {
        if (!num) return '0';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const body = `
    ${breadcrumbsHtml}
    <div class="player-section" itemscope itemtype="https://schema.org/VideoObject">
        <meta itemprop="name" content="${h(v.t)}">
        <meta itemprop="description" content="${videoDescription}">
        <meta itemprop="thumbnailUrl" content="${thumbnailUrl}">
        <meta itemprop="uploadDate" content="${uploadDate}">
        <meta itemprop="duration" content="${durationISO}">
        <meta itemprop="embedUrl" content="${embedUrl}">
        <div class="video-wrapper" id="videoContainer">
            <img src="${thumbnailUrl}" alt="${h(v.t)}" class="video-placeholder" id="mainThumbnail" width="1280" height="720" onerror="${IMG_ERR}" itemprop="thumbnail">
            <button class="play-overlay" id="playTrigger" aria-label="Putar Video" data-video-url="${embedUrl}">
                <div class="play-btn-large"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
            </button>
            <div id="playerFrameContainer" style="display:none; width:100%; height:100%;"></div>
        </div>
        <div class="video-info">
            <h1 class="video-title" itemprop="name">${v.t_esc}</h1>
            <div class="video-meta">
                <span class="badge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    ${durationFormatted}
                </span>
                <span class="badge" itemprop="interactionStatistic" itemscope itemtype="https://schema.org/InteractionCounter">
                    <meta itemprop="interactionType" content="https://schema.org/WatchAction">
                    <span itemprop="userInteractionCount">${formatNumber(viewCount)}</span> views
                </span>
                <span class="badge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    ${v.up_fmt || uploadDate.split('T')[0]}
                </span>
            </div>
            <div class="video-description" itemprop="description">
                <p><strong>${v.t_esc}</strong> - ${v.ds_esc || `Streaming video viral terbaru ${v.t_esc} kualitas HD.`}</p>
                <p>${v.tags ? v.tags.map(t => '#' + t.replace(/\s+/g, '')).join(' ') : '#VideoViral #Streaming #HD #Terbaru'}</p>
            </div>
            <div class="btn-group">
                <a href="${v.dl || '#'}" class="btn btn-primary" download itemprop="contentUrl">Download</a>
                <button class="btn btn-outline" onclick="copyVideoUrl()">Copy Link</button>
                <button class="btn btn-outline" onclick="shareVideo()">Share</button>
            </div>
        </div>
    </div>
    <section itemscope itemtype="https://schema.org/ItemList">
        <meta itemprop="name" content="Video Terkait">
        <meta itemprop="numberOfItems" content="${related.length}">
        <meta itemprop="itemListOrder" content="https://schema.org/ItemListOrderDescending">
        <h2 class="section-title">Video Terkait</h2>
        <div class="video-grid">
            ${related.map((rv, idx) => `
                <div class="video-card" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <meta itemprop="position" content="${idx + 1}">
                    <a href="/e/${rv.f}" class="video-card-link" itemprop="item" itemscope itemtype="https://schema.org/VideoObject">
                        <div class="card-thumb">
                            <img src="${rv.si || rv.sp}" alt="${h(rv.t)}" loading="lazy" onerror="${IMG_ERR}" itemprop="thumbnailUrl">
                            <span class="card-duration">${rv.ln || '10:30'}</span>
                        </div>
                        <div class="card-content">
                            <h3 class="card-title" itemprop="name">${h(rv.t)}</h3>
                            <div class="card-stats" itemprop="interactionStatistic" itemscope itemtype="https://schema.org/InteractionCounter">
                                <meta itemprop="interactionType" content="https://schema.org/WatchAction">
                                <span itemprop="userInteractionCount">${formatNumber(rv.vw)}</span> views
                            </div>
                        </div>
                    </a>
                </div>
            `).join("")}
        </div>
    </section>`;

    return render(v.t, body, schema, url, { 
        description: videoDescription, 
        image: thumbnailUrl,
        keywords: v.kt || catName
    });
}

async function search(url, env) {
    const origin = url.origin;
    const parts = url.pathname.split("/");
    let rawQ = parts[2] || url.searchParams.get("q") || "";
    rawQ = decodeURIComponent(rawQ).replace(/-/g, " ").trim();
    
    if (rawQ.length < 2) {
        return render("Search", '<div class="player-section"><p class="video-title">Minimal 2 karakter untuk pencarian</p></div>', null, url);
    }

    const keywords = norm(rawQ).split(/\s+/);
    const prefixes = [...new Set(keywords.slice(0, 3).map(p2))];
    const datasets = await Promise.all(prefixes.map(p => get(url, env, `/data/index/${p}.json`)));
    
    let results = [];
    const seen = new Set();
    for (const d of datasets) {
        if (!d) continue;
        for (const item of d) {
            if (seen.has(item.f)) continue;
            if (keywords.some(k => norm(item.t).includes(k))) {
                seen.add(item.f);
                results.push(item);
            }
        }
    }

    const totalResults = results.length;
    const searchQuery = h(rawQ);
    
    // Search Page Schema
    const searchSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "name": `Hasil Pencarian: ${searchQuery} - ${CONFIG.name}`,
                "description": `Menemukan ${totalResults} video untuk pencarian "${searchQuery}". Streaming dan download video gratis.`,
                "url": url.href,
                "inLanguage": CONFIG.language
            },
            {
                "@type": "SearchResultsPage",
                "name": `Hasil Pencarian: ${searchQuery}`,
                "description": `${totalResults} video ditemukan untuk "${searchQuery}"`,
                "url": url.href,
                "mainEntity": {
                    "@type": "ItemList",
                    "name": `Hasil Pencarian: ${searchQuery}`,
                    "numberOfItems": totalResults,
                    "itemListOrder": "https://schema.org/ItemListOrderRelevance",
                    "itemListElement": results.slice(0, 40).map((item, idx) => ({
                        "@type": "ListItem",
                        "position": idx + 1,
                        "item": {
                            "@type": "VideoObject",
                            "name": h(item.t),
                            "url": `${origin}/e/${item.f}`,
                            "thumbnailUrl": item.si || item.sp
                        }
                    }))
                }
            }
        ]
    };

    const body = `<div class="player-section" style="padding:1rem">
        <h1 class="video-title">Hasil Pencarian: "${searchQuery}"</h1>
        <p class="video-meta" style="margin-bottom:1rem">Ditemukan ${totalResults} video</p>
        <div class="video-grid" itemscope itemtype="https://schema.org/ItemList">
            <meta itemprop="name" content="Hasil Pencarian: ${searchQuery}">
            <meta itemprop="numberOfItems" content="${totalResults}">
            ${results.slice(0, 40).map((v, idx) => `
                <div class="video-card" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <meta itemprop="position" content="${idx + 1}">
                    <a href="/e/${v.f}" class="video-card-link" itemprop="item" itemscope itemtype="https://schema.org/VideoObject">
                        <div class="card-thumb">
                            <img src="${v.si || v.sp}" alt="${h(v.t)}" loading="lazy" onerror="${IMG_ERR}" itemprop="thumbnailUrl">
                            <span class="card-duration">${v.ln || '10:30'}</span>
                        </div>
                        <div class="card-content">
                            <h3 class="card-title" itemprop="name">${h(v.t)}</h3>
                            <div class="card-stats">${v.vw ? formatNumber(v.vw) : '0'} views</div>
                        </div>
                    </a>
                </div>
            `).join("")}
        </div>
        ${totalResults > 40 ? '<p class="video-meta" style="text-align:center;margin-top:1rem">Menampilkan 40 dari ' + totalResults + ' hasil</p>' : ''}
    </div>`;
    
    return render(`Cari: ${searchQuery}`, body, searchSchema, url, {
        description: `Hasil pencarian video untuk "${searchQuery}". Temukan ${totalResults} video viral terbaru.`
    });
}

async function list(url, env, pageParam) {
    const origin = url.origin;
    const page = parseInt(pageParam || url.pathname.split("/")[2] || "1");
    const meta = await get(url, env, "/data/meta.json");
    const data = await get(url, env, `/data/list/${page}.json`);
    
    if (!data) return notFound(url);

    const files = data.result?.files || [];
    const totalVideos = meta?.total || 0;
    const totalPages = Math.ceil(totalVideos / 200);
    
    // List Page Schema
    const listSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "name": `Video Terbaru - Halaman ${page} | ${CONFIG.name}`,
                "description": `Koleksi video viral terbaru halaman ${page} dari ${totalPages} halaman. Streaming dan download video gratis.`,
                "url": url.href,
                "inLanguage": CONFIG.language
            },
            {
                "@type": "ItemList",
                "name": "Video Terbaru",
                "description": `Daftar video terbaru halaman ${page}`,
                "numberOfItems": files.length,
                "itemListOrder": "https://schema.org/ItemListOrderDescending",
                "itemListElement": files.map((v, idx) => ({
                    "@type": "ListItem",
                    "position": idx + 1,
                    "item": {
                        "@type": "VideoObject",
                        "name": h(v.title),
                        "url": `${origin}/e/${v.file_code}`,
                        "thumbnailUrl": v.single_img,
                        "uploadDate": v.uploaded || new Date().toISOString()
                    }
                }))
            }
        ]
    };

    const body = `<div class="player-section" style="padding:1rem">
        <h1 class="video-title">Video Terbaru - Halaman ${page}</h1>
        <p class="video-meta" style="margin-bottom:1rem">Total ${totalVideos} video</p>
        <div class="video-grid" itemscope itemtype="https://schema.org/ItemList">
            <meta itemprop="name" content="Video Terbaru Halaman ${page}">
            <meta itemprop="numberOfItems" content="${files.length}">
            ${files.map((v, idx) => `
                <div class="video-card" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <meta itemprop="position" content="${idx + 1}">
                    <a href="/e/${v.file_code}" class="video-card-link" itemprop="item" itemscope itemtype="https://schema.org/VideoObject">
                        <div class="card-thumb">
                            <img src="${v.single_img}" alt="${h(v.title)}" loading="lazy" onerror="${IMG_ERR}" itemprop="thumbnailUrl">
                            <span class="card-duration">${v.length || '10:30'}</span>
                        </div>
                        <div class="card-content">
                            <h3 class="card-title" itemprop="name">${h(v.title)}</h3>
                            <div class="card-stats">${v.views ? formatNumber(v.views) : '0'} views</div>
                        </div>
                    </a>
                </div>
            `).join("")}
        </div>
        <div class="pagination">
            ${page > 1 ? `<a href="${page === 2 ? '/' : '/page/' + (page - 1)}" class="pagination-link" rel="prev">Prev</a>` : ''}
            <span class="pagination-current">Halaman ${page} dari ${totalPages}</span>
            ${page < totalPages ? `<a href="/page/${page + 1}" class="pagination-link" rel="next">Next</a>` : ''}
        </div>
    </div>`;
    
    return render(`Video Terbaru - Hal ${page}`, body, listSchema, url);
}

async function sitemap(url, env) {
    const meta = await get(url, env, "/data/meta.json");
    let out = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    const total = meta?.total || 0;
    for (let i = 1; i <= Math.min(50, Math.ceil(total / 200)); i++) {
        out += `<url><loc>${url.origin}${i === 1 ? '' : '/page/' + i}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><changefreq>weekly</changefreq><priority>${i === 1 ? '1.0' : '0.8'}</priority></url>`;
    }
    return new Response(out + "</urlset>", { headers: { "content-type": "application/xml" } });
}

async function videoSitemap(url, env) {
    const meta = await get(url, env, "/data/meta.json");
    let out = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;
    const total = meta?.total || 0;
    const totalPages = Math.ceil(total / 200);
    
    for (let page = 1; page <= Math.min(10, totalPages); page++) {
        const listData = await get(url, env, `/data/list/${page}.json`);
        if (listData?.result?.files) {
            for (const v of listData.result.files.slice(0, 100)) {
                out += `<url>
                    <loc>${url.origin}/e/${v.file_code}</loc>
                    <video:video>
                        <video:title><![CDATA[${h(v.title)}]]></video:title>
                        <video:description><![CDATA[${h(v.title)} - Streaming video viral terbaru]]></video:description>
                        <video:thumbnail_loc>${v.single_img}</video:thumbnail_loc>
                        <video:duration>${parseInt(v.length) || 600}</video:duration>
                        <video:publication_date>${v.uploaded || new Date().toISOString()}</video:publication_date>
                        <video:family_friendly>no</video:family_friendly>
                    </video:video>
                </url>`;
            }
        }
    }
    return new Response(out + "</urlset>", { headers: { "content-type": "application/xml" } });
}

async function pagesSitemap(url, env) {
    const meta = await get(url, env, "/data/meta.json");
    const totalPages = Math.ceil((meta?.total || 0) / 200);
    let out = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    out += `<url><loc>${url.origin}</loc><priority>1.0</priority><changefreq>daily</changefreq></url>`;
    for (let i = 2; i <= totalPages; i++) {
        out += `<url><loc>${url.origin}/page/${i}</loc><priority>0.7</priority><changefreq>weekly</changefreq></url>`;
    }
    return new Response(out + "</urlset>", { headers: { "content-type": "application/xml" } });
}

function formatNumber(num) {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function robots() {
    return new Response(`User-agent: *
Allow: /
Sitemap: https://videostream.pages.dev/sitemap.xml
Sitemap: https://videostream.pages.dev/video-sitemap.xml
Sitemap: https://videostream.pages.dev/sitemap-pages.xml`, { headers: { "content-type": "text/plain" } });
}

// ============================================
// RENDER FUNCTION WITH MINIFICATION
// ============================================
function render(t, b, schema, url, meta = {}) {
    const siteTitle = `${t} - ${CONFIG.name}`;
    const description = meta.description || CONFIG.description;
    const image = meta.image || CONFIG.logo;
    const keywords = meta.keywords || CONFIG.keywords;

    const style = `
       :root{--background:240 10% 3.9%;--foreground:0 0% 98%;--card:240 10% 6%;--primary:24 100% 50%;--primary-foreground:240 5.9% 10%;--secondary:240 3.7% 15.9%;--secondary-foreground:0 0% 98%;--muted:240 3.7% 15.9%;--muted-foreground:240 5% 64.9%;--border:240 3.7% 15.9%;--radius:0.5rem}:root.light{--background:0 0% 100%;--foreground:240 10% 3.9%;--card:0 0% 98%;--primary:24 100% 50%;--primary-foreground:0 0% 98%;--secondary:240 4.8% 95.9%;--secondary-foreground:240 5.9% 10%;--muted:240 4.8% 95.9%;--muted-foreground:240 3.8% 46.1%;--border:240 5.9% 90%}*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Inter",sans-serif;background-color:hsl(var(--background));color:hsl(var(--foreground));line-height:1.4;font-size:.9375rem;transition:background-color 0.3s ease,color 0.3s ease}body.mobile-menu-open{overflow:hidden;position:fixed;width:100%;height:100%}.container{max-width:1000px;margin:0 auto;padding:0 .75rem}header{position:sticky;top:0;z-index:100;background-color:hsla(var(--background),.9);backdrop-filter:blur(8px);border-bottom:1px solid hsl(var(--border));transition:background-color 0.3s ease}.header-content{height:50px;display:flex;align-items:center;justify-content:space-between}.logo{display:flex;align-items:center;gap:.35rem;text-decoration:none;color:hsl(var(--foreground));font-weight:700;font-size:1.1rem;position:relative}.logo svg{width:24px;height:24px;color:hsl(var(--primary))}.logo span{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.nav-links{display:none;gap:1rem}@media (min-width:768px){.nav-links{display:flex}}.nav-links a{text-decoration:none;color:hsl(var(--muted-foreground));font-size:.8125rem;font-weight:500;transition:color 0.2s}.nav-links a:hover{color:hsl(var(--primary))}.actions{display:flex;align-items:center;gap:.25rem}button.icon-btn{background:none;border:none;padding:.4rem;border-radius:calc(var(--radius) - 2px);color:hsl(var(--foreground));cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s,color 0.3s ease}button.icon-btn:hover{background-color:hsl(var(--secondary))}button.icon-btn svg{width:18px;height:18px;transition:transform 0.3s ease}button.icon-btn:active svg{transform:scale(.9)}.mobile-menu-btn{display:flex!important}@media (min-width:768px){.mobile-menu-btn{display:none!important}}.mobile-menu{position:fixed;top:0;left:-300px;width:280px;height:100vh;background-color:hsl(var(--card));border-right:1px solid hsl(var(--border));z-index:1000;transition:left 0.3s ease-in-out;display:flex;flex-direction:column;padding:1rem;box-shadow:2px 0 10px rgb(0 0 0 / .3)}.mobile-menu.active{left:0}.mobile-menu-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid hsl(var(--border))}.mobile-menu-title{font-weight:700;font-size:1rem;color:hsl(var(--foreground));display:flex;align-items:center}.mobile-menu-links{display:flex;flex-direction:column;gap:.25rem;flex:1}.mobile-menu-links a{text-decoration:none;color:hsl(var(--foreground));font-size:.9375rem;padding:.75rem;border-radius:var(--radius);transition:background-color 0.2s,color 0.2s;display:flex;align-items:center;gap:.75rem}.mobile-menu-links a:hover{background-color:hsl(var(--primary));color:#fff}.mobile-menu-links a svg{width:18px;height:18px}.mobile-menu-footer{margin-top:auto;padding-top:1rem;border-top:1px solid hsl(var(--border));font-size:.75rem;color:hsl(var(--muted-foreground));text-align:center}.menu-overlay{position:fixed;inset:0;background:rgb(0 0 0 / .5);z-index:999;opacity:0;visibility:hidden;transition:opacity 0.3s,visibility 0.3s;backdrop-filter:blur(2px)}.menu-overlay.active{opacity:1;visibility:visible}main{padding:.75rem 0;transition:filter 0.3s}main.menu-open{filter:blur(2px)}.breadcrumbs{padding:.5rem 0;font-size:.75rem;color:hsl(var(--muted-foreground));white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.breadcrumbs a{color:inherit;text-decoration:none}.player-section{background-color:hsl(var(--card));border-radius:var(--radius);border:1px solid hsl(var(--border));overflow:hidden;margin-bottom:1.25rem;transition:background-color 0.3s ease,border-color 0.3s ease}.video-wrapper{position:relative;aspect-ratio:16/9;background-color:#000}.video-placeholder{width:100%;height:100%;object-fit:contain}.play-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#fff0;cursor:pointer;border:0;width:100%;text-align:center}.play-overlay:focus{outline:2px solid hsl(var(--primary))}.play-btn-large{width:60px;height:60px;background:hsl(0 0% 0% / .58);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;pointer-events:none;box-shadow:0 8px 16px rgb(0 0 0 / .3);transition:transform 0.2s ease}.play-overlay:hover .play-btn-large{transform:scale(1.1)}.play-btn-large svg{width:28px;height:28px;margin-left:3px;fill:#fff;color:#fff}.video-info{padding:.75rem 1rem}.video-title{font-size:1.125rem;font-weight:700;margin-bottom:.5rem;line-height:1.3}.video-meta{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:.5rem}.badge{background-color:hsl(var(--secondary));color:hsl(var(--secondary-foreground));padding:.15rem .5rem;border-radius:4px;font-size:.6875rem;font-weight:600;display:inline-flex;align-items:center;gap:.25rem;transition:background-color 0.3s ease,color 0.3s ease}.badge svg{width:12px;height:12px}.video-description{margin:.75rem 0 .5rem 0;padding:.75rem;background-color:hsl(var(--secondary));border-radius:var(--radius);border-left:4px solid hsl(var(--primary));font-size:.8125rem;line-height:1.5;color:hsl(var(--secondary-foreground));transition:background-color 0.3s ease,color 0.3s ease}.video-description p{margin-bottom:.25rem}.video-description strong{color:hsl(var(--primary))}.btn-group{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.75rem}.btn{padding:.4rem .8rem;border-radius:var(--radius);font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:.35rem;border:1px solid #fff0;font-size:.75rem;text-decoration:none;transition:opacity 0.2s,background-color 0.3s ease,border-color 0.3s ease,color 0.3s ease}.btn:hover{opacity:.9}.btn svg{width:14px;height:14px}.btn-primary{background-color:hsl(var(--primary));color:hsl(var(--primary-foreground))}.btn-outline{background:#fff0;border-color:hsl(var(--border));color:hsl(var(--foreground))}.btn-outline:hover{background-color:hsl(var(--secondary))}.section-title{font-size:.9375rem;font-weight:700;margin-bottom:.75rem;display:flex;align-items:center;gap:.4rem}.section-title svg{width:16px;height:16px;color:hsl(var(--primary))}.video-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.75rem}.video-card{background-color:hsl(var(--card));border-radius:var(--radius);border:1px solid hsl(var(--border));overflow:hidden;transition:border-color 0.2s,transform 0.2s,background-color 0.3s ease;text-decoration:none;color:inherit;display:block}.video-card:hover{border-color:hsl(var(--primary));transform:translateY(-2px)}.video-card-link{text-decoration:none;color:inherit;display:block}.card-thumb{position:relative;aspect-ratio:16/9;background-color:hsl(var(--muted))}.card-thumb img{width:100%;height:100%;object-fit:cover}.card-duration{position:absolute;bottom:4px;right:4px;background:rgb(0 0 0 / .8);color:#fff;font-size:.625rem;padding:1px 4px;border-radius:2px}.card-hover-overlay{position:absolute;inset:0;background:rgb(0 0 0 / .3);opacity:0;display:flex;align-items:center;justify-content:center;transition:opacity 0.2s;color:#fff}.video-card:hover .card-hover-overlay{opacity:1}.card-hover-overlay svg{width:2.5rem;height:2.5rem}.card-content{padding:.5rem}.card-title{font-size:.8125rem;font-weight:600;margin-bottom:.15rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.3;color:hsl(var(--foreground));text-decoration:none;transition:color 0.3s ease}.card-stats{font-size:.6875rem;color:hsl(var(--muted-foreground));transition:color 0.3s ease}.pagination{display:flex;justify-content:center;align-items:center;gap:1rem;margin-top:2rem}.pagination-link{padding:.5rem 1rem;background-color:hsl(var(--secondary));color:hsl(var(--foreground));text-decoration:none;border-radius:var(--radius);font-size:.875rem;transition:background-color 0.2s,color 0.3s ease}.pagination-link:hover{background-color:hsl(var(--primary));color:#fff}.pagination-current{color:hsl(var(--muted-foreground));font-size:.875rem;transition:color 0.3s ease}.pagination-next{background-color:hsl(var(--primary));color:#fff}footer{margin-top:2rem;padding:1rem 0;border-top:1px solid hsl(var(--border));text-align:center;color:hsl(var(--muted-foreground));font-size:.75rem;transition:border-color 0.3s ease,color 0.3s ease}.modal{position:fixed;inset:0;background:rgb(0 0 0 / .6);backdrop-filter:blur(4px);z-index:2000;display:none;align-items:center;justify-content:center;padding:1rem}.modal.active{display:flex}.modal-content{background-color:hsl(var(--background));width:100%;max-width:400px;border-radius:var(--radius);padding:1rem;border:1px solid hsl(var(--border));position:relative;transition:background-color 0.3s ease,border-color 0.3s ease}.close-modal{position:absolute;top:.5rem;right:.5rem;background:none;border:none;cursor:pointer;color:hsl(var(--muted-foreground))}.search-form{display:flex;gap:.5rem;margin-top:.75rem}.search-input{flex:1;padding:.5rem;border-radius:var(--radius);border:1px solid hsl(var(--border));background:hsl(var(--secondary));color:inherit;font-size:.875rem;transition:background-color 0.3s ease,border-color 0.3s ease,color 0.3s ease}.search-input:focus{outline:2px solid hsl(var(--primary))}@media (max-width:480px){.video-grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}.video-description{font-size:.75rem}.badge{font-size:.625rem}}
    `;

    const script = `
        document.getElementById('playTrigger')?.addEventListener('click', function(){
            const u = this.getAttribute('data-video-url');
            this.style.display='none';
            const thumb = document.getElementById('mainThumbnail');
            if(thumb) thumb.style.display='none';
            const f = document.getElementById('playerFrameContainer');
            f.style.display='block';
            f.innerHTML='<iframe src="'+u+'" frameborder="0" allow="autoplay;fullscreen" style="width:100%;height:100%"></iframe>';
        });
        document.getElementById('searchBtn')?.addEventListener('click',()=>document.getElementById('searchModal').classList.add('active'));
        document.getElementById('closeSearch')?.addEventListener('click',()=>document.getElementById('searchModal').classList.remove('active'));
        function copyVideoUrl(){
            const t = document.createElement('textarea'); t.value=window.location.href; document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t);
            alert('Link berhasil disalin!');
        }
        function shareVideo(){
            if(navigator.share) navigator.share({title:document.title,url:window.location.href});
            else copyVideoUrl();
        }
    `;

    const html = `<!doctype html><html lang="id"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5.0,user-scalable=yes">
    <title>${siteTitle}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <meta name="author" content="${CONFIG.name}">
    <meta name="robots" content="index,follow">
    <meta name="theme-color" content="#101010">
    <link rel="canonical" href="${url.href}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${siteTitle}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${url.href}">
    <meta property="og:image" content="${image}">
    <meta property="og:site_name" content="${CONFIG.name}">
    <meta property="og:locale" content="id_ID">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${siteTitle}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    ${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ""}
    <style>${style}</style>
    </head>
    <body>
    <header><div class="container header-content">
        <a href="/" class="logo"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>${CONFIG.name}</span></a>
        <div class="actions">
            <button class="icon-btn" id="searchBtn" aria-label="Cari video"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>
        </div>
    </div></header>
    <main class="container">${b}</main>
    <div class="modal" id="searchModal"><div class="modal-content">
        <h3>Cari Video</h3>
        <form class="search-form" onsubmit="event.preventDefault();let v=this.q.value.trim().replace(/\\s+/g,'-');if(v)window.location.href='/f/'+encodeURIComponent(v)">
            <input type="search" name="q" class="search-input" placeholder="Ketik kata kunci..." autofocus required>
            <button type="submit" class="btn btn-primary" style="justify-content:center">Cari</button>
            <button type="button" id="closeSearch" class="btn btn-outline" style="justify-content:center;margin-top:0">Batal</button>
        </form>
    </div></div>
    <footer><div class="container">&copy; ${CONFIG.copyrightYear} ${CONFIG.name}. All rights reserved.</div></footer>
    <script>${script}</script>
    </body></html>`;

    // Minify output
    const minified = html
        .replace(/>\s+</g, '><')
        .replace(/\s{2,}/g, ' ')
        .replace(/\n/g, '');

    return new Response(minified, { 
        headers: { 
            "content-type": "text/html;charset=utf-8",
            "x-robots-tag": "index,follow"
        } 
    });
}

function notFound(url) {
    return new Response("404 Not Found", { status: 404 });
}
