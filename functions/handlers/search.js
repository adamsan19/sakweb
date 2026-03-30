import { get } from '../lib/fetch.js';
import { h, norm, p2, p3, wpImg, generateSrcset, formatDuration } from '../lib/utils.js';
import { render } from '../lib/render.js';
import { CONFIG, DESCRIPTIONS, TITLES, desc, IMG_ERR } from '../lib/config.js';
import { Pagination } from '../templates/components/pagination.js';

export async function search(url, env) {
    const parts = url.pathname.split("/");
    const slug = parts[2] ? decodeURIComponent(parts[2]) : "";
    const origin = url.origin;
    const searchQ = url.searchParams.get('q');
    const searchP = url.searchParams.get('page');
    
    // 1. Ekstrak Keyword Dasar
    let rawQ = slug || searchQ || "";
    rawQ = decodeURIComponent(rawQ).replace(/-/g, " ").trim();
    
    // Hapus duplikat kata urutan (case-insensitive)
    const seenWords = new Set();
    rawQ = rawQ.split(/\s+/).filter(w => {
        const lw = w.toLowerCase();
        if (seenWords.has(lw)) return false;
        seenWords.add(lw);
        return true;
    }).join(" ");

    const qSlug = norm(rawQ).replace(/\s+/g, '-').toLowerCase();

    // 2. Ekstrak Page Dasar
    let page = 1;
    if (parts.length === 5 && parts[3] === "page") {
        page = parseInt(parts[4], 10);
    } else if (searchP) {
        page = parseInt(searchP, 10);
    }
    if (isNaN(page) || page < 1) page = 1;

    // 3. SEO REDIRECTS (Force clean path-based URL)
    // Redirect jika: ada query param, ada typo segment selain 'page', ada uppercase, atau akses /page/1
    const isStandardPath = parts.length === 3 || (parts.length === 5 && parts[3] === "page");
    const isCanonicalSlug = slug === qSlug;
    const isCanonicalPage = (page === 1 && parts.length === 3) || (page > 1 && parts.length === 5);

    if (searchQ || searchP || !isStandardPath || !isCanonicalSlug || !isCanonicalPage) {
        let target = `/f/${qSlug}`;
        if (page > 1) target += `/page/${page}`;
        return Response.redirect(origin + target, 301);
    }

    // Lanjut proses jika URL sudah bersih
    const escapedQ_raw = rawQ.replace(/\b\w/g, c => c.toUpperCase());
    const qShow = escapedQ_raw; // Nama cantik untuk tampilan

    if (qShow.length < 2) return Response.redirect(origin + "/", 302);

    const qNorm = norm(qShow);
    const keywords = qNorm.split(/\s+/).filter(w => w.length > 0);

    if (keywords.length === 0) return Response.redirect(origin + "/", 302);

    const prefixes = [...new Set(keywords.slice(0, 5).map((k) => p2(k)))];
    const dataPromises = prefixes.map(async (prefix) => {
        let d = await get(url, env, `/data/index/${prefix}.json`);
        if (!d) {
            const k = keywords.find((kw) => p2(kw) === prefix);
            if (k) {
                const prefix3 = p3(k);
                d = await get(url, env, `/data/index/${prefix}/${prefix3}.json`);
            }
        }
        return d || [];
    });

    const datasets = await Promise.all(dataPromises);
    const scoredResults = [];
    const seen = new Set();
    const seenDup = new Set(); // dedup by title+duration
    let hasCompleteKeywordMatch = false;

    for (const dataset of datasets) {
        for (const item of dataset) {
            // Dedup: skip jika durasi sama persis (agar tidak ada video durasi ganda)
            const rawDur = item.ln || item.length || item.d || '';
            const normDur = rawDur ? (parseInt(rawDur) || 0) : 0;
            
            // Key = durasi saja. Fallback = file_code jika durasi tidak ada atau 0
            const dupKey = normDur > 0 ? `dur_${normDur}` : item.f;
            
            if (seenDup.has(dupKey)) continue;
            seenDup.add(dupKey);

            const tNorm = norm(item.t);

            let score = 0;
            let matchCount = 0;

            if (tNorm === qNorm) score += 10000;
            else if (tNorm.includes(qNorm)) score += 5000;

            for (const kw of keywords) {
                if (tNorm.includes(kw)) {
                    matchCount++;
                    score += 100;
                    if (tNorm.startsWith(kw) || tNorm.includes(" " + kw)) {
                        score += 50;
                    }
                }
            }

            if (matchCount === 0) continue;
            if (matchCount === keywords.length) {
                score += 2000;
                hasCompleteKeywordMatch = true;
            }

            const views = parseInt(item.vw) || 0;
            score += Math.log10(views + 1) * 10;

            scoredResults.push({
                ...item,
                _score: score,
                _views: views
            });
        }
    }

    if (scoredResults.length === 0) {
        return Response.redirect(origin + "/", 302);
    }

    const sortedResults = scoredResults.sort((a, b) => b._score - a._score || b._views - a._views);
    const totalResults = sortedResults.length;
    const perPage = 50;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const res = sortedResults.slice(start, end);
    
    // Jika page > 1 tapi tidak ada hasil di slice ini, redirect ke base search URL
    if (page > 1 && res.length === 0) {
        return Response.redirect(`${origin}/f/${qSlug}`, 301);
    }

    const publisherId = `${origin}/#organization`;
    const websiteId = `${origin}/#website`;
    const qUrlSafe = encodeURIComponent(rawQ.replace(/\s+/g, "-")).toLowerCase();
    const webpageId = origin + `/f/${qUrlSafe}` + (page > 1 ? `/page/${page}` : '');

    const searchSchema = buildSearchSchema(origin, qShow, page, webpageId, totalResults, res, start, publisherId, websiteId);

    const body = buildSearchBody(qShow, page, totalResults, res, origin, start, end);

    const escapedQ = h(qShow);

    const metaData = {
        description: `${desc(DESCRIPTIONS.searchMeta, { query: escapedQ, name: CONFIG.name })}${page > 1 ? ` Halaman ${page}.` : ''}`,
        canonical: page === 1 ? `${url.origin}/f/${qUrlSafe}` : `${url.origin}/f/${qUrlSafe}/page/${page}`,
        robots: (hasCompleteKeywordMatch && page === 1) ? "index, follow" : "noindex, follow",
        type: "website",
    };

    const response = render(desc(TITLES.searchPage, { query: escapedQ, total: totalResults, name: CONFIG.name }), body, searchSchema, url, metaData);

    // Apply cache headers only if all keywords match
    if (hasCompleteKeywordMatch) {
        const newHeaders = new Headers(response.headers);
        newHeaders.set('Cache-Control', 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400');
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
        });
    }

    return response;
}

function buildSearchSchema(origin, rawQ, page, webpageId, totalResults, res, start, publisherId, websiteId) {
    const escapedQ = h(rawQ);
    const pub = {
        "@type": "Organization",
        "name": CONFIG.name,
        "logo": {
            "@type": "ImageObject",
            "url": origin + CONFIG.logo
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "name": desc(TITLES.searchPage, { query: escapedQ, total: totalResults, name: CONFIG.name }),
                "description": desc(DESCRIPTIONS.searchMeta, { query: escapedQ, name: CONFIG.name }),
                "url": webpageId,
                "dateModified": new Date().toISOString().split('T')[0]
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": CONFIG.name,
                        "item": origin
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": TITLES.searchBreadcrumb || "Pencarian",
                        "item": `${origin}/search/`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": escapedQ,
                        "item": webpageId
                    }
                ]
            },
            {
                "@type": "SearchResultsPage",
                "name": desc(TITLES.searchH1, { query: escapedQ, total: totalResults, name: CONFIG.name }),
                "description": desc(DESCRIPTIONS.searchMainEntity, { query: escapedQ, total: totalResults, name: CONFIG.name }),
                "url": webpageId,
                "mainEntity": {
                    "@type": "ItemList",
                    "name": "Hasil Pencarian",
                    "numberOfItems": res.length,
                    "itemListElement": res.map((v, index) => ({
                        "@type": "ListItem",
                        "position": start + index + 1,
                        "item": {
                            "@type": "Article",
                            "headline": v.t,
                            "image": [wpImg(v.si || v.sp, 300)],
                            "url": `${origin}/e/${v.f}`,
                            "publisher": pub
                        }
                    }))
                }
            }
        ]
    };

    return schema;
}

function buildSearchBody(rawQ, page, totalResults, res, origin, start, end) {
    const qEsc = h(rawQ);
    const h1Text = desc(TITLES.searchH1, { query: qEsc, total: totalResults, name: CONFIG.name });
    const foundText = desc(TITLES.searchFound, { total: totalResults, query: qEsc, name: CONFIG.name });
    return `
    <section itemscope itemtype="https://schema.org/ItemList">
        <meta itemprop="name" content="${h1Text}${page > 1 ? ` - Halaman ${page}` : ''}">
        <meta itemprop="description" content="Ditemukan ${totalResults} video untuk kata kunci '${qEsc}'">
        <meta itemprop="numberOfItems" content="${totalResults}">
        
        <h1 class="section-title" itemprop="name">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            ${h1Text}${page > 1 ? ` - Halaman ${page}` : ''}
        </h1>
        <p style="color: hsl(var(--muted-foreground)); font-size: 0.875rem; margin-bottom: 1rem;">${foundText}${page > 1 ? ` - Halaman ${page}` : ''}</p>
        
        <div class="video-grid">
            ${res.map((v, index) => VideoCard(v, origin, start + index)).join("")}
        </div>
        
        ${Pagination(page, totalResults, 50, "/f/", rawQ)}
    </section>
    `;
}

function VideoCard(v, origin, i) {
    const duration = formatDuration(v.ln || v.length || v.d);
    const position = i + 1;
    const titleVal = v.t || v.title || 'Video';
    const titleEsc = v.t_esc || h(titleVal);
    const thumb = v.si || v.sp || v.single_img || v.splash_img || '';
    const views = v.vw_fmt || v.vw || v.views || "0";
    const uploadVal = v.up || v.added || null;
    const uploadDate = uploadVal || new Date().toISOString();
    const formattedDate = uploadVal ? new Date(uploadVal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : 'baru';
    const filecode = v.f || v.file_code || v.filecode;

    return `
    <article class="video-card" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <meta itemprop="position" content="${position}">
        <meta itemprop="url" content="${origin}/e/${filecode}">
        <a href="/e/${filecode}" class="video-card-link" title="${titleEsc}" aria-label="Tonton video: ${titleEsc}" style="display: block; text-decoration: none; color: inherit;">
            <div class="card-thumb">
                <img
                    itemprop="image"
                    src="${wpImg(thumb, 320)}"
                    srcset="${generateSrcset(thumb)}"
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 300px"
                    alt="${titleEsc} - ${CONFIG.name}"
                    loading="lazy"
                    decoding="async"
                    width="320"
                    height="180"
                    onerror="this.onerror=null; this.removeAttribute('srcset'); this.src='${IMG_ERR}'; this.width=320; this.height=180;">
                <div class="card-hover-overlay"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
                <span class="card-views" aria-label="${views} tayangan"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> ${views}</span>
                <span class="card-duration" aria-label="Durasi video: ${duration}">${duration}</span>
            </div>
            <div class="card-content">
                <h3 class="card-title" itemprop="name">${titleEsc}</h3>
                <div class="card-stats">
                    <span style="text-transform: capitalize;">${v.kt || 'Video'}</span> • 
                    <time datetime="${uploadDate}" title="Diupload pada ${formattedDate}">${formattedDate}</time>
                </div>
            </div>
        </a>
    </article>
    `;
}

