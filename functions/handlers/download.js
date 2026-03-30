import { get } from "../lib/fetch.js";
import { h, wpImg, generateSrcset, formatDuration } from "../lib/utils.js";
import { render } from "../lib/render.js";
import { CONFIG, DESCRIPTIONS, TITLES, desc, IMG_ERR } from "../lib/config.js";
export async function downloadPage(url, env) {
  const origin = url.origin;
  const id = url.pathname.split("/")[2];
  const lookup = await get(url, env, "/data/lookup_shard.json");
  if (!lookup || !lookup[id]) return notFound(url);

  const shardKey = lookup[id];
  const detailData = await get(url, env, `/data/detail/${shardKey}.json`);
  if (!detailData) return notFound(url);

  const v = detailData.find((x) => x.f === id);
  if (!v) return notFound(url);

  // FETCH RANDOM RELATED VIDEOS
  let relatedHtml = "";
  let cache;
  try {
    cache = caches.default;
  } catch (e) {
    cache = null;
  }

  const randomCacheKey = new Request(new URL(`/cache-internal/random-related-dl/${shardKey}`, origin).toString());

  if (cache) {
    try {
      const cached = await cache.match(randomCacheKey);
      if (cached) {
        relatedHtml = await cached.text();
      }
    } catch (e) {}
  }

  if (!relatedHtml) {
    const metaData = await get(url, env, "/data/meta.json");
    const totalPages = Math.ceil((metaData?.total || 26000) / 200);
    const randomPage = Math.floor(Math.random() * totalPages) + 1;
    const listData = await get(url, env, `/data/list/${randomPage}.json`);
    const files = listData?.result?.files || [];

    // Shuffle and take 30
    const related = files.sort(() => 0.5 - Math.random()).slice(0, 30);

    relatedHtml =
      related.length > 0 ? buildRelatedHTML(related, origin) : "";

    if (cache && relatedHtml) {
      try {
        const res = new Response(relatedHtml, {
          headers: {
            "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400"
          }
        });
        await cache.put(randomCacheKey, res);
      } catch (e) {}
    }
  }

  const body = buildDownloadBody(v, relatedHtml, origin);

  const meta = {
    description: desc(DESCRIPTIONS.downloadMeta, { title: h(v.t) }),
    image: wpImg(v.sp || v.si, 300),
    canonical: `${origin}/dl/${v.f}`,
    robots: "noindex, follow",
    type: "website",
  };

  return render(desc(TITLES.downloadPage, { title: v.t }), body, null, url, meta);
}

function notFound(url) {
  return Response.redirect(url.origin + "/", 301);
}

function buildRelatedHTML(related, origin) {
  return `
    <section style="margin-top: 3rem; text-align: left;" aria-label="Video rekomendasi">
        <h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="8" y1="2" x2="8" y2="22"/><line x1="16" y1="2" x2="16" y2="22"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="2" y1="16" x2="22" y2="16"/></svg> ${TITLES.downloadRecommended}</h2>
        <div class="video-grid">
            ${related.map((rv, i) => VideoCard(rv, origin, i)).join("")}
        </div>
    </section>
    `;
}

function buildDownloadBody(v, relatedHtml, origin) {
  return `
    <section class="player-section" style="padding:2rem; text-align:center;" aria-label="Download video">
        <h1 class="video-title" style="margin-bottom:1rem;">${h(v.t)}</h1>
        <p style="margin-bottom:1rem; color: hsl(var(--muted-foreground));">${desc(TITLES.downloadH1, { title: `<strong>${h(v.t)}</strong>` })}</p>
        <div id="downloadContainer">
         <center> <script async data-cfasync="false" data-clbaid="" src="//bartererfaxtingling.com/bn.js"></script>
<div data-cl-spot="2064816"></div> </center>
            <div class="btn-group" style="justify-content: center; gap: 1rem;">
                <button id="downloadBtn" class="btn btn-primary" onclick="startDownload()" style="padding: 0.6rem 1.2rem; font-size: 1rem;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Video</button>
                <a href="/e/${v.f}" class="btn btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> Kembali ke Detail</a>
            </div>
            <div id="countdownContainer" style="display:none; margin-top:1rem;">
                <div id="countdownText" style="font-size:1.2rem; font-weight:bold; color:hsl(var(--primary)); margin-bottom:0.5rem;"></div>
                <div id="downloadLink" style="display:none;"></div>
            </div>
        </div>
    </section>

    ${relatedHtml}

    <script>
        let countdownInterval;
        let countdownTime = 1;

        function startDownload() {
            const downloadBtn = document.getElementById('downloadBtn');
            const countdownContainer = document.getElementById('countdownContainer');
            const countdownText = document.getElementById('countdownText');
            const downloadLink = document.getElementById('downloadLink');

            // Disable button
            downloadBtn.disabled = true;
            downloadBtn.textContent = 'Menunggu...';

            // Show countdown
            countdownContainer.style.display = 'block';
            countdownText.textContent = 'Download akan dimulai dalam 1 detik...';

            countdownInterval = setInterval(() => {
                countdownTime--;
                countdownText.textContent = \`Download akan dimulai dalam \${countdownTime} detik...\`;

                if (countdownTime <= 0) {
                    clearInterval(countdownInterval);
                    countdownText.textContent = 'Download siap!';
                    downloadBtn.style.display = 'none';
                    downloadLink.style.display = 'block';
                    downloadLink.innerHTML = \`<a href="\${'${v.pd}'}" class="btn btn-primary" download style="padding: 0.8rem 1.5rem; font-size: 1.1rem; margin-top:0.5rem;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Klik untuk Download</a>\`;
                }
            }, 1000);
        }
    </script>
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
                    <span style="text-transform: capitalize;">${v.as || 'Video'}</span> • 
                    <time datetime="${uploadDate}" title="Diupload pada ${formattedDate}">${formattedDate}</time>
                </div>
            </div>
        </a>
    </article>
    `;
}
