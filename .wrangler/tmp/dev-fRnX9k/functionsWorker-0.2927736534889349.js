var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-gyJ7qt/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// .wrangler/tmp/pages-CcDj4r/functionsWorker-0.2927736534889349.mjs
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var urls2 = /* @__PURE__ */ new Set();
function checkURL2(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls2.has(url.toString())) {
      urls2.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL2, "checkURL");
__name2(checkURL2, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL2(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});
var norm = /* @__PURE__ */ __name2((t) => (t || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim(), "norm");
function h(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
__name(h, "h");
__name2(h, "h");
var p2 = /* @__PURE__ */ __name2((t) => {
  const n = norm(t).replace(/\s+/g, "");
  return !n ? "__" : n.length === 1 ? n + "_" : n.slice(0, 2);
}, "p2");
var p3 = /* @__PURE__ */ __name2((t) => {
  const n = norm(t).replace(/\s+/g, "");
  return !n ? "___" : n.length === 1 ? n + "__" : n.length === 2 ? n + "_" : n.slice(0, 3);
}, "p3");
function getCacheAge(response) {
  const date = response.headers.get("date");
  if (!date) return "unknown";
  const age = Math.floor((Date.now() - new Date(date).getTime()) / 1e3);
  return `${age}s`;
}
__name(getCacheAge, "getCacheAge");
__name2(getCacheAge, "getCacheAge");
function formatNumber(num) {
  if (!num) return "0";
  const n = typeof num === "string" ? parseInt(num) : num;
  if (isNaN(n)) return "0";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toString();
}
__name(formatNumber, "formatNumber");
__name2(formatNumber, "formatNumber");
function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return "00:10:30";
  const s = parseInt(seconds);
  const h2 = Math.floor(s / 3600);
  const m = Math.floor(s % 3600 / 60);
  const sec = s % 60;
  return `${String(h2).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}
__name(formatDuration, "formatDuration");
__name2(formatDuration, "formatDuration");
var WP_HOSTS = ["i0.wp.com", "i1.wp.com", "i2.wp.com", "i3.wp.com"];
function wpImg(imageUrl, w = 320, q = 85) {
  if (!imageUrl) return "";
  const host = WP_HOSTS[Math.floor(Math.random() * WP_HOSTS.length)];
  const clean = imageUrl.replace(/^https?:\/\//, "");
  return `https://${host}/${clean}?w=${w}&q=${q}&strip=all`;
}
__name(wpImg, "wpImg");
__name2(wpImg, "wpImg");
function generateSrcset(imageUrl, widths = [320, 640, 960]) {
  if (!imageUrl) return "";
  const clean = imageUrl.replace(/^https?:\/\//, "");
  return widths.map((w, i) => `https://${WP_HOSTS[i % WP_HOSTS.length]}/${clean}?w=${w}&q=85&strip=all ${w}w`).join(", ");
}
__name(generateSrcset, "generateSrcset");
__name2(generateSrcset, "generateSrcset");
var CONFIG = {
  name: "Video Viral",
  logo: "/images/logo.png",
  description: "Nonton Video Viral Terbaru Gratis Full HD 720p.",
  foundingDate: "2024-01-01",
  socialMedia: [
    "https://www.facebook.com/videostream",
    "https://twitter.com/videostream",
    "https://www.instagram.com/videostream"
  ],
  version: "1.0.0"
};
var DESCRIPTIONS = {
  // Welcome page
  welcomeMeta: `Selamat datang di {name}. Platform streaming video viral terbaru dan terlengkap dengan koleksi video berkualitas tinggi.`,
  welcomeDescription: `Temukan ribuan video viral terbaru dari berbagai kategori favorit. Streaming gratis tanpa iklan dengan kualitas HD terbaik.`,
  // Detail page
  detailMeta: `Nonton video {title} terbaru. Streaming video viral dan terbaru hanya di {name}.`,
  detailBody: `Streaming video viral terbaru {title}. Video ini menyajikan konten menarik yang wajib Anda saksikan hingga akhir.`,
  detailKeywords: `video Doodstream  , streaming video, Video Viral`,
  detailTags: `#VideoViral #VideoIndo #VideoMesum #VideoHot`,
  // Search page
  searchMeta: `Hasil pencarian video untuk '{query}' di {name}. Temukan video viral dan terbaru.`,
  searchSchema: `Hasil pencarian video untuk '{query}' di {name}. Temukan video viral dan terbaru.`,
  searchMainEntity: `Temukan video {query} terbaru dan terlengkap. {total} video tersedia untuk streaming dan download gratis di {name}.`,
  // List page
  listMeta: `Daftar video terbaru koleksi {name} - Halaman {page}. Platform streaming video viral terlengkap.`,
  listSchema: `Daftar video terbaru koleksi {name} - Halaman {page}. Platform streaming video viral terlengkap.`,
  listCollection: `Koleksi video terbaru di {name} - Halaman {page}.`,
  // Download page
  downloadMeta: `Download video {title} gratis di {name}.`
};
var TITLES = {
  // Welcome page
  welcomePage: `Selamat Datang di {name}`,
  // Search page
  searchPage: `Kumpulan {total} Video {query}`,
  searchH1: `{total} Video Kumpulan {query} yang sedang Viral di {name}`,
  searchFound: `Ditemukan {total} video {query} yang sedang viral saat ini di {name}. Viral Tiktok, Instagram, Twitter, Telagram VIP Terbaru Gratis`,
  searchBreadcrumb: `Pencarian`,
  // List page
  listPage: `Daftar Video - Halaman {page}`,
  listH1: `Video Terbaru - Halaman {page}`,
  // Download page
  downloadPage: `Download {title}`,
  downloadH1: `Download Video: {title}`,
  // Detail page
  detailRelated: `Video Terkait Lainnya`,
  detailRelatedDesc: `Video-video terkait dengan {title}`,
  detailRecommended: `Video Rekomendasi Lainnya`,
  downloadRecommended: `Video Rekomendasi Untuk Kamu`
};
function desc(template, vars = {}) {
  let s = template;
  for (const [k, v] of Object.entries(vars)) {
    s = s.replaceAll(`{${k}}`, v);
  }
  return s;
}
__name(desc, "desc");
__name2(desc, "desc");
var CATEGORIES = [
  { name: "Janda Muda", slug: "janda-muda" },
  { name: "Toket Bagus", slug: "toket-bagus" },
  { name: "Video Mesum", slug: "video-mesum" },
  { name: "Jilbab Viral", slug: "jilbab-viral" },
  { name: "Abg Mesum", slug: "abg-mesum" },
  { name: "Arachu", slug: "arachu" },
  { name: "SMA", slug: "sma" },
  { name: "VCS", slug: "vcs" },
  { name: "Doods Pro", slug: "doods-pro" },
  { name: "Tante Yona", slug: "tante-yona" },
  { name: "Ngentot", slug: "ngentot" },
  { name: "Syakirah", slug: "syakirah" },
  { name: "Penjaga Warung", slug: "penjaga-warung" },
  { name: "Video Viral", slug: "video-viral" },
  { name: "Open Bo", slug: "open-bo" },
  { name: "Bebasindo", slug: "bebasindo" },
  { name: "Bokep Viral", slug: "bokep-viral" },
  { name: "Bokep Pelajar", slug: "bokep-pelajar" },
  { name: "Video Ngentot", slug: "video-ngentot" },
  { name: "Bokep Perawan", slug: "bokep-perawan" },
  { name: "Jilbab Mesum", slug: "jilbab-mesum" },
  { name: "Prank Ojol", slug: "prank-ojol" },
  { name: "Pijat Plus", slug: "pijat-plus" },
  { name: "Mbah Maryono", slug: "mbah-maryono" },
  { name: "Sepong Kontol", slug: "sepong-kontol" },
  { name: "Hijab Tobrut", slug: "hijab-tobrut" },
  { name: "Tante Sange", slug: "tante-sange" },
  { name: "Abg Viral", slug: "abg-viral" },
  { name: "Skandal Mesum", slug: "skandal-mesum" },
  { name: "Cewek Colmek", slug: "cewek-colmek" },
  { name: "Doggy Style", slug: "doggy-style" },
  { name: "Tante Bohay", slug: "tante-bohay" },
  { name: "Cewek Semok", slug: "cewek-semok" },
  { name: "Msbreewc", slug: "msbreewc" },
  { name: "Cewek Tobrut", slug: "cewek-tobrut" },
  { name: "Janda Sange", slug: "janda-sange" },
  { name: "Bokep Jepang", slug: "bokep-jepang" },
  { name: "Bokepsatset", slug: "bokepsatset" },
  { name: "Doodstream", slug: "doodstream" },
  { name: "Dood Tele", slug: "dood-tele" },
  { name: "Cantik Tobrut", slug: "cantik-tobrut" },
  { name: "Memeksiana", slug: "memeksiana" },
  { name: "Susu Gede", slug: "susu-gede" },
  { name: "Adik Kakak", slug: "adik-kakak" },
  { name: "Simontok", slug: "simontok" },
  { name: "Bokep Indo", slug: "bokep-indo" },
  { name: "Bokep STW", slug: "bokep-stw" },
  { name: "Video Lokal", slug: "video-lokal" }
];
var IMG_ERR = "data:image/svg+xml,%3Csvg%20width=%22320%22%20height=%22180%22%20viewBox=%220%200%20320%20180%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect%20width=%22320%22%20height=%22180%22%20fill=%22%23FEF2F2%22/%3E%3Ctext%20x=%22160%22%20y=%2290%22%20text-anchor=%22middle%22%20dominant-baseline=%22middle%22%20fill=%22%23F87171%22%20style=%22font-family:sans-serif;font-size:14px;font-weight:bold%22%3EIMAGE%20ERROR%3C/text%3E%3C/svg%3E";
async function withCache(req, fn) {
  const url = new URL(req.url);
  if (req.method !== "GET") return fn();
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
    console.log(`\u{1F527} DEV MODE: ${url.pathname}`);
    const res2 = await fn();
    const newHeaders2 = new Headers(res2.headers);
    newHeaders2.set("X-Cache", "BYPASS-DEV");
    return new Response(res2.body, {
      status: res2.status,
      statusText: res2.statusText,
      headers: newHeaders2
    });
  }
  let cacheKeyUrl = url.toString();
  if (url.pathname.startsWith("/api/")) {
    const u = new URL(url.toString());
    u.searchParams.set("v", CONFIG.version);
    cacheKeyUrl = u.toString();
  }
  const cacheKey = new Request(cacheKeyUrl, {
    method: "GET",
    headers: {
      "accept": req.headers.get("accept")?.split(",")[0] || "*/*"
    }
  });
  let cache;
  try {
    cache = caches.default;
  } catch (e) {
    cache = null;
  }
  if (cache) {
    try {
      const res2 = await cache.match(cacheKey);
      if (res2) {
        console.log(`\u26A1 CACHE HIT: ${url.pathname}`);
        const newHeaders2 = new Headers(res2.headers);
        newHeaders2.set("X-Cache", "HIT");
        newHeaders2.set("X-Cache-Age", getCacheAge(res2));
        return new Response(res2.body, {
          status: res2.status,
          statusText: res2.statusText,
          headers: newHeaders2
        });
      }
    } catch (e) {
      console.warn("Cache match failed, bypassing cache", e);
    }
  }
  console.log(`\u{1F504} CACHE MISS: ${url.pathname}`);
  const original = await fn();
  const newHeaders = new Headers(original.headers);
  const res = new Response(original.body, {
    status: original.status,
    statusText: original.statusText,
    headers: newHeaders
  });
  const isErrorResponse = !res.ok && ![301, 302].includes(res.status);
  if (isErrorResponse) {
    newHeaders.set("Cache-Control", "public, max-age=60, s-maxage=60, stale-while-revalidate=300");
    newHeaders.set("X-Cache-Type", "error");
    newHeaders.set("X-Cache", "MISS");
    newHeaders.set("X-Cache-Date", (/* @__PURE__ */ new Date()).toISOString());
    newHeaders.set("X-Cache-Key", url.pathname);
    const errorRes = res.clone();
    await cache.put(cacheKey, errorRes);
    return res;
  }
  const isStatic = url.pathname.match(/\.(css|js|jpg|jpeg|png|ico|svg|woff2?|webp|mp4|gif)$/i);
  const isVideoPage = url.pathname.startsWith("/e/");
  const isSearchPage = url.pathname.startsWith("/f/");
  const isListingPage = url.pathname.startsWith("/page/") || url.pathname.startsWith("/list/") || url.pathname === "/";
  const isApi = url.pathname.startsWith("/api/");
  if (isStatic) {
    newHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
    newHeaders.set("X-Cache-Type", "static");
  } else if (isApi) {
    newHeaders.set("Cache-Control", "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400");
    newHeaders.set("X-Cache-Type", "api");
  } else if (isVideoPage) {
    newHeaders.set("Cache-Control", "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400");
    newHeaders.set("X-Cache-Type", "video");
  } else if (isSearchPage) {
    newHeaders.set("Cache-Control", "public, max-age=1800, s-maxage=3600, stale-while-revalidate=3600");
    newHeaders.set("X-Cache-Type", "search");
  } else if (isListingPage) {
    newHeaders.set("Cache-Control", "public, max-age=3600, s-maxage=7200, stale-while-revalidate=7200");
    newHeaders.set("X-Cache-Type", "listing");
  } else {
    newHeaders.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
    newHeaders.set("X-Cache-Type", "default");
  }
  const tags = [];
  if (isVideoPage) tags.push("video");
  if (isSearchPage) tags.push("search");
  if (isListingPage) tags.push("list");
  if (tags.length) {
    newHeaders.set("Cache-Tag", tags.join(","));
  }
  newHeaders.set("X-Cache", "MISS");
  newHeaders.set("X-Cache-Date", (/* @__PURE__ */ new Date()).toISOString());
  newHeaders.set("X-Cache-Key", url.pathname);
  if (cache) {
    try {
      await cache.put(cacheKey, res.clone());
    } catch (e) {
      console.warn("Cache put failed, returning response without caching", e);
    }
  }
  return res;
}
__name(withCache, "withCache");
__name2(withCache, "withCache");
function getServerTime() {
  const now = /* @__PURE__ */ new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
__name(getServerTime, "getServerTime");
__name2(getServerTime, "getServerTime");
function apiResponse(status, msg, result) {
  return {
    status,
    msg,
    result,
    server_time: getServerTime(),
    version: CONFIG.version
  };
}
__name(apiResponse, "apiResponse");
__name2(apiResponse, "apiResponse");
var CACHE = /* @__PURE__ */ new Map();
var CACHE_TTL = 24 * 60 * 60 * 1e3;
var MAX_CACHE_SIZE = 1e3;
var CACHE_STATS = { hits: 0, misses: 0, size: 0 };
function getCached(key) {
  const rec = CACHE.get(key);
  if (!rec) {
    CACHE_STATS.misses++;
    return null;
  }
  if (Date.now() - rec.ts > CACHE_TTL) {
    CACHE.delete(key);
    CACHE_STATS.misses++;
    return null;
  }
  CACHE_STATS.hits++;
  return rec.value;
}
__name(getCached, "getCached");
__name2(getCached, "getCached");
function setCache(key, value, ttl = CACHE_TTL) {
  try {
    if (CACHE.size >= MAX_CACHE_SIZE) {
      const firstKey = CACHE.keys().next().value;
      CACHE.delete(firstKey);
    }
    CACHE.set(key, { ts: Date.now(), value, ttl });
    CACHE_STATS.size = CACHE.size;
  } catch (e) {
  }
}
__name(setCache, "setCache");
__name2(setCache, "setCache");
function getCacheStats() {
  const total = CACHE_STATS.hits + CACHE_STATS.misses;
  return {
    hits: CACHE_STATS.hits,
    misses: CACHE_STATS.misses,
    total,
    hitRate: total > 0 ? (CACHE_STATS.hits / total * 100).toFixed(2) + "%" : "0%",
    size: CACHE_STATS.size
  };
}
__name(getCacheStats, "getCacheStats");
__name2(getCacheStats, "getCacheStats");
async function handleRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  const params = url.searchParams;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-API-Version": CONFIG.version,
    // Edge/browser cache control: allow public caching at edge and browsers for 1 day
    // s-maxage used by shared caches (Cloudflare), max-age by browsers
    "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600"
  };
  try {
    if (path === "/api/list") {
      let page = parseInt(params.get("page") || "1", 10);
      let per_page = parseInt(params.get("per_page") || "50", 10);
      if (isNaN(page) || page < 1) page = 1;
      if (isNaN(per_page) || per_page < 1) per_page = 50;
      const target = `${url.origin}/data/list/${page}.json`;
      try {
        const res = await fetch(target);
        if (res.ok) {
          const data = await res.json();
          if (data && data.result && Array.isArray(data.result.files)) {
            let filesArray = data.result.files;
            if (per_page && per_page !== 50) {
              if (per_page < 50) {
                filesArray = filesArray.slice((page - 1) * per_page % 50, (page - 1) * per_page % 50 + per_page);
              } else {
                filesArray = filesArray.slice(0, per_page);
              }
            }
            data.result.files = filesArray.map((file) => {
              const lengthSecs = typeof file.ln === "number" ? String(file.ln) : "0";
              return {
                download_url: file.download_url || "",
                api_source: file.download_url && file.download_url.includes("lulu") ? "lulustream" : "doodstream",
                single_img: file.si || "",
                file_code: file.f || "",
                canplay: file.canplay !== void 0 ? file.canplay : 0,
                length: lengthSecs,
                views: String(file.vw || "0"),
                uploaded: file.up || "",
                public: file.public !== void 0 ? String(file.public) : "1",
                fld_id: file.fld_id || "",
                title: file.t || ""
              };
            });
            data.result.per_page = per_page;
          }
          data.version = CONFIG.version;
          data.server_time = getServerTime();
          return new Response(JSON.stringify(data), { headers });
        } else {
          return new Response(JSON.stringify(apiResponse(404, "Data tidak ditemukan", [])), { status: 404, headers });
        }
      } catch (err) {
        return new Response(JSON.stringify(apiResponse(500, "Error fetching data", [])), { status: 500, headers });
      }
    }
    if (path === "/api/search") {
      let q = params.get("q") || "";
      q = q.trim().toLowerCase();
      let page = parseInt(params.get("page") || "1", 10);
      let perPage = parseInt(params.get("per_page") || "50", 10);
      if (isNaN(page) || page < 1) page = 1;
      if (isNaN(perPage) || perPage < 1) perPage = 50;
      const generateEmptySearch = /* @__PURE__ */ __name2(() => ({
        server_time: getServerTime(),
        status: 200,
        msg: "OK",
        result: [],
        total_results: 0,
        page,
        per_page: perPage,
        total_pages: 0
      }), "generateEmptySearch");
      if (!q) {
        return new Response(JSON.stringify(generateEmptySearch()), { headers });
      }
      const keywords = q.split(/\s+/).map((kw) => kw.replace(/[^a-z0-9]/g, "")).filter((kw) => kw.length > 0);
      if (keywords.length === 0) {
        return new Response(JSON.stringify(generateEmptySearch()), { headers });
      }
      const cacheKey = `search:${keywords.join(" ")}:p${page}:l${perPage}`;
      const cachedSearch = getCached(cacheKey);
      if (cachedSearch) {
        cachedSearch.server_time = getServerTime();
        return new Response(JSON.stringify(cachedSearch), { headers });
      }
      try {
        const primaryPrefix = keywords[0].substring(0, 2).padEnd(2, "a");
        async function getAllItemsFromPrefix(prefix) {
          const items = [];
          const prefixCacheKey = `prefix:${prefix}`;
          const cachedPrefix = getCached(prefixCacheKey);
          if (cachedPrefix) {
            return cachedPrefix;
          }
          try {
            const res = await fetch(`${url.origin}/data/index/${prefix}.json`);
            if (res.ok) {
              const data = await res.json();
              if (Array.isArray(data)) items.push(...data);
            }
          } catch (e) {
          }
          try {
            const suffixes = [];
            for (let i = 0; i < 26; i++) {
              suffixes.push(String.fromCharCode(97 + i));
            }
            suffixes.push("__");
            const subfolderPromises = suffixes.map(async (suffix) => {
              try {
                const res = await fetch(
                  `${url.origin}/data/index/${prefix}/${prefix}${suffix}.json`
                );
                if (res.ok) return await res.json();
              } catch (e) {
                return [];
              }
              return [];
            });
            const subfolderResults = await Promise.all(subfolderPromises);
            for (const result of subfolderResults) {
              if (Array.isArray(result)) items.push(...result);
            }
          } catch (e) {
          }
          try {
            setCache(prefixCacheKey, items, 24 * 60 * 60 * 1e3);
          } catch (e) {
          }
          return items;
        }
        __name(getAllItemsFromPrefix, "getAllItemsFromPrefix");
        __name2(getAllItemsFromPrefix, "getAllItemsFromPrefix");
        let combinedPool = [];
        combinedPool = await getAllItemsFromPrefix(primaryPrefix);
        const seenKeys = /* @__PURE__ */ new Set();
        const deduplicatedPool = combinedPool.filter((item) => {
          if (!item) return false;
          const fc = item.f || item.file_code || "";
          const dur = parseInt(item.ln || item.length || item.d || 0) || 0;
          const dupKey = dur > 0 ? `dur_${dur}` : fc;
          if (dupKey) {
            if (seenKeys.has(dupKey)) return false;
            seenKeys.add(dupKey);
          }
          return true;
        });
        const scoredEntries = deduplicatedPool.map((item) => {
          if (!item || !item.t) return { item, score: 0, matchCount: 0 };
          const titleLower = item.t.toLowerCase();
          let totalScore = 0;
          let matchCount = 0;
          keywords.forEach((kw, idx) => {
            const pos = titleLower.indexOf(kw);
            if (pos !== -1) {
              matchCount++;
              let keywordScore = 100;
              if (titleLower === kw) keywordScore += 500;
              if (pos === 0) {
                keywordScore += idx === 0 ? 300 : 150;
              }
              const isWordStart = pos === 0 || titleLower[pos - 1] === " ";
              const isWordEnd = pos + kw.length === titleLower.length || titleLower[pos + kw.length] === " ";
              if (isWordStart && isWordEnd) {
                keywordScore += 200;
              } else if (isWordStart) {
                keywordScore += 100;
              }
              keywordScore += Math.max(0, 50 - pos);
              totalScore += keywordScore;
            }
          });
          return {
            item,
            score: totalScore,
            hasAll: matchCount === keywords.length,
            matchCount
          };
        }).filter((entry) => entry.matchCount > 0).sort((a, b) => {
          if (a.hasAll && !b.hasAll) return -1;
          if (!a.hasAll && b.hasAll) return 1;
          return b.score - a.score;
        });
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const finalResults = scoredEntries.slice(startIndex, endIndex).map((entry) => {
          const video = entry.item;
          const lengthSecs = typeof video.ln === "number" ? String(video.ln) : "0";
          return {
            single_img: video.si || "",
            length: lengthSecs,
            views: String(video.vw || "0"),
            title: video.t || "",
            file_code: video.f || "",
            uploaded: video.up || "",
            splash_img: video.sp || "",
            canplay: 0,
            api_source: video.as || "",
            relevance: entry.score
          };
        });
        const searchResponse = {
          server_time: getServerTime(),
          status: 200,
          msg: "OK",
          result: finalResults,
          total_results: scoredEntries.length,
          page,
          per_page: perPage,
          total_pages: Math.ceil(scoredEntries.length / perPage) || 0,
          version: CONFIG.version
        };
        try {
          setCache(cacheKey, searchResponse);
        } catch (e) {
        }
        return new Response(JSON.stringify(searchResponse), { headers });
      } catch (err) {
        return new Response(JSON.stringify(generateEmptySearch()), { headers });
      }
    }
    if (path === "/api/info") {
      const fcode = params.get("file_code") || "";
      const raw = params.get("raw") === "true";
      if (!fcode) {
        return new Response(
          JSON.stringify(apiResponse(400, "file_code dibutuhkan", [])),
          { status: 400, headers }
        );
      }
      const shard = await getMD5Prefix(fcode);
      if (raw) {
        const target = `${url.origin}/data/detail/${shard}.json`;
        return Response.redirect(target, 302);
      }
      const cacheKeyInfo = `info:${fcode}`;
      const cachedInfo = getCached(cacheKeyInfo);
      if (cachedInfo) {
        return new Response(
          JSON.stringify(apiResponse(200, "OK", cachedInfo)),
          { headers }
        );
      }
      const shardCacheKey = `shard:${shard}`;
      let shardData = getCached(shardCacheKey);
      if (!shardData) {
        const shardRes = await fetch(`${url.origin}/data/detail/${shard}.json`);
        if (!shardRes.ok) {
          return new Response(
            JSON.stringify(apiResponse(404, "Video tidak ditemukan", [])),
            { status: 404, headers }
          );
        }
        shardData = await shardRes.json();
        try {
          setCache(shardCacheKey, shardData, 24 * 60 * 60 * 1e3);
        } catch (e) {
        }
      }
      if (!Array.isArray(shardData)) {
        return new Response(
          JSON.stringify(apiResponse(500, "Invalid shard format", [])),
          { status: 500, headers }
        );
      }
      const video = shardData.find((v) => v.f === fcode);
      if (!video) {
        return new Response(
          JSON.stringify(apiResponse(404, "Video tidak ditemukan", [])),
          { status: 404, headers }
        );
      }
      const sizeParsed = parseFloat(video.sz) || 0;
      const lengthParsed = typeof video.ln === "number" ? video.ln : 0;
      const fullData = {
        filecode: video.f || "",
        size: sizeParsed,
        status: 200,
        protected_embed: video.pe || "",
        uploaded: video.up || "",
        last_view: video.lv || "",
        canplay: 0,
        protected_dl: video.pd || "",
        single_img: video.si || "",
        title: video.t || "",
        views: String(video.vw || "0"),
        length: lengthParsed || 0,
        splash_img: video.sp || "",
        api_source: video.as || ""
      };
      try {
        setCache(cacheKeyInfo, [fullData]);
      } catch (e) {
      }
      return new Response(JSON.stringify(apiResponse(200, "OK", [fullData])), {
        headers
      });
    }
    if (path === "/api/random") {
      let count = parseInt(params.get("count") || "30", 10);
      if (isNaN(count) || count < 1) count = 30;
      if (count > 30) count = 30;
      let totalPages = 132;
      try {
        const firstPageRes = await fetch(`${url.origin}/data/list/1.json`);
        if (firstPageRes.ok) {
          const firstPageData = await firstPageRes.json();
          if (firstPageData && firstPageData.result && firstPageData.result.total_pages) {
            totalPages = firstPageData.result.total_pages;
          }
        }
      } catch (e) {
      }
      const randomPage = Math.floor(Math.random() * totalPages) + 1;
      const target = `${url.origin}/data/list/${randomPage}.json`;
      try {
        const res = await fetch(target);
        if (res.ok) {
          const data = await res.json();
          if (data && data.result && Array.isArray(data.result.files)) {
            let filesArray = data.result.files;
            let selected = [];
            let indices = Array.from({ length: filesArray.length }, (_, i) => i);
            for (let i = 0; i < count && indices.length > 0; i++) {
              let idx = Math.floor(Math.random() * indices.length);
              selected.push(filesArray[indices[idx]]);
              indices.splice(idx, 1);
            }
            const finalResults = selected.map((file) => {
              const lengthSecs = typeof file.ln === "number" ? String(file.ln) : "0";
              return {
                download_url: file.download_url || "",
                api_source: file.download_url && file.download_url.includes("lulu") ? "lulustream" : "doodstream",
                single_img: file.si || "",
                file_code: file.f || "",
                canplay: file.canplay !== void 0 ? file.canplay : 0,
                length: lengthSecs,
                views: String(file.vw || "0"),
                uploaded: file.up || "",
                public: file.public !== void 0 ? String(file.public) : "1",
                fld_id: file.fld_id || "",
                title: file.t || ""
              };
            });
            return new Response(
              JSON.stringify(apiResponse(200, "OK", finalResults)),
              { headers }
            );
          }
        }
        return new Response(
          JSON.stringify(apiResponse(404, "Data tidak ditemukan", [])),
          { status: 404, headers }
        );
      } catch (err) {
        return new Response(
          JSON.stringify(apiResponse(500, "Error fetching random data", [])),
          { status: 500, headers }
        );
      }
    }
    if (path === "/api/cache-stats") {
      const stats = getCacheStats();
      return new Response(JSON.stringify(apiResponse(200, "OK", stats)), {
        headers
      });
    }
    return new Response(
      JSON.stringify(apiResponse(404, "Endpoint tidak ditemukan", [])),
      { status: 404, headers }
    );
  } catch (err) {
    return new Response(
      JSON.stringify(apiResponse(500, "Internal Server Error", [])),
      { status: 500, headers }
    );
  }
}
__name(handleRequest, "handleRequest");
__name2(handleRequest, "handleRequest");
async function onRequest(context) {
  return withCache(context.request, () => handleRequest(context));
}
__name(onRequest, "onRequest");
__name2(onRequest, "onRequest");
async function getMD5Prefix(text) {
  try {
    const msgUint8 = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex.substring(0, 2);
  } catch (e) {
    return text.substring(0, 2).toLowerCase().padEnd(2, "0");
  }
}
__name(getMD5Prefix, "getMD5Prefix");
__name2(getMD5Prefix, "getMD5Prefix");
function Header(origin) {
  const halfIndex = Math.ceil(CATEGORIES.length / 2);
  const headerCategories = CATEGORIES.slice(0, halfIndex);
  return `
    <header role="banner">
        <div class="container header-content">
            <a href="/" class="logo" aria-label="${CONFIG.name} - Halaman Utama">
                <img src="/images/logo.png" alt="${CONFIG.name} logo" width="140" height="32" decoding="async" loading="eager">
                <span>${CONFIG.name}</span>
            </a>

            <nav class="nav-links" aria-label="Navigasi utama" role="navigation">
                <a href="/" style="display: flex; align-items: center; gap: 4px;">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    Beranda
                </a>
                <a href="/f/jav-sub-indo">Jav Sub Indo</a>
                <div class="dropdown">
                    <button class="dropbtn" aria-haspopup="true" aria-expanded="false" style="background:none;border:none;color:inherit;font:inherit;cursor:pointer;padding:inherit;">Kategori \u25BC</button>
                    <div class="dropdown-content" role="menu">
                        ${headerCategories.map((cat) => `<a href="/f/${cat.slug}" role="menuitem">${cat.name}</a>`).join("\n                        ")}
                    </div>
                </div>
                <a href="/f/bokep-indo">Bokep Indo</a>
            </nav>

            <div class="actions">
                <button class="icon-btn" id="searchBtn" aria-label="Cari video">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </button>
                <button class="icon-btn" id="themeToggle" aria-label="Ganti Tema">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="themeIcon" data-lucide="sun"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                </button>
                <button class="icon-btn mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </button>
            </div>
        </div>
    </header>
    `;
}
__name(Header, "Header");
__name2(Header, "Header");
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const halfIndex = Math.ceil(CATEGORIES.length / 2);
  const footerCategories = CATEGORIES.slice(halfIndex);
  return `
    <footer role="contentinfo">
        <div class="container">
            <nav class="footer-links" aria-label="Kategori populer" style="display:flex;flex-wrap:wrap;gap:8px 16px;justify-content:center;margin-bottom:12px;font-size:0.8125rem;">
                ${footerCategories.map((cat) => `<a href="/f/${cat.slug}" style="color:hsl(var(--muted-foreground));text-decoration:none;">${cat.name}</a>`).join("")}
            </nav>
            <p><small>&copy; ${year} ${CONFIG.name}. All rights reserved. - Nonton dan Download Video Bokep Viral Tiktok, Instagram, Twitter, Telagram VIP Terbaru Gratis</small></p>
        </div>
    </footer>
    `;
}
__name(Footer, "Footer");
__name2(Footer, "Footer");
function MobileMenu() {
  return `
    <style>
        .mobile-dropdown {
            width: 100%;
            border-bottom: 1px solid var(--border-color, #333);
        }
        .mobile-dropdown summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            cursor: pointer;
            color: var(--text-color, #fff);
            list-style: none; /* Hide default triangle */
        }
        .mobile-dropdown summary::-webkit-details-marker {
            display: none;
        }
        .mobile-dropdown[open] .dropdown-arrow {
            transform: rotate(180deg);
        }
        .dropdown-arrow {
            transition: transform 0.2s ease;
        }
        .mobile-dropdown-content {
            display: flex;
            flex-direction: column;
            background-color: var(--nav-bg-hover, #2a2a2a);
            padding: 8px 0;
        }
        .mobile-dropdown-content a {
            padding: 12px 16px 12px 48px; /* Indent sub-items */
            font-size: 0.95rem;
            color: var(--text-muted, #ccc);
            text-decoration: none;
            display: block;
            border-bottom: none;
        }
        .mobile-dropdown-content a:hover {
            color: var(--accent, #e50914);
            background-color: rgba(255,255,255,0.05);
        }
    </style>
    <div class="menu-overlay" id="menuOverlay"></div>

    <aside class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-header">
            <span class="mobile-menu-title">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                Menu
            </span>
            <button class="icon-btn" id="closeMobileMenu" aria-label="Tutup Menu">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>
        
        <nav class="mobile-menu-links" aria-label="Menu navigasi mobile">
            <a href="/">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Beranda
            </a>
            <a href="/f/populer">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8 10 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                Populer
            </a>
            
            <details class="mobile-dropdown">
                <summary>
                    <div style="display: flex; align-items: center;">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                        <span style="margin-left: 12px; font-weight: 500;">Kategori</span>
                    </div>
                    <svg aria-hidden="true" class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <div class="mobile-dropdown-content">
                    ${CATEGORIES.map((cat) => `<a href="/f/${cat.slug}">${cat.name}</a>`).join("\n                    ")}
                </div>
            </details>
            <a href="/f/terbaru">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Terbaru
            </a>
        </nav>
        
        <div class="mobile-menu-footer">
            <p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} ${CONFIG.name}</p>
            <p style="font-size: 0.7rem; margin-top: 4px;">v${CONFIG.version}</p>
        </div>
    </aside>
    `;
}
__name(MobileMenu, "MobileMenu");
__name2(MobileMenu, "MobileMenu");
function SearchModal() {
  return `
    <div class="modal" id="searchModal" role="dialog" aria-modal="true" aria-label="Pencarian video">
        <div class="modal-content">
            <button class="close-modal" id="closeSearch" aria-label="Tutup pencarian">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <h3 style="font-weight: 700; font-size: 0.9375rem;">Cari Video</h3>
            <form class="search-form" role="search" action="/f/" method="get" onsubmit="event.preventDefault(); var v=this.q.value.trim().toLowerCase().replace(/\\s+/g,'-'); if(v) window.location.href='/f/'+encodeURIComponent(v)">
                <label for="searchInput" class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">Cari video</label>
                <input type="search" name="q" id="searchInput" class="search-input" placeholder="Ketik kata kunci..." aria-label="Kata kunci pencarian" autocomplete="off" autofocus>
                <button type="submit" class="btn btn-primary">Cari</button>
            </form>
        </div>
    </div>
    `;
}
__name(SearchModal, "SearchModal");
__name2(SearchModal, "SearchModal");
function Styles() {
  return `
        :root {
            --background: 240 10% 3.9%;
            --foreground: 0 0% 98%;
            --card: 240 10% 6%;
            --primary: 24 100% 50%;
            --primary-foreground: 0 0% 100%;
            --secondary: 240 3.7% 15.9%;
            --secondary-foreground: 0 0% 98%;
            --muted: 240 3.7% 15.9%;
            --muted-foreground: 240 5% 64.9%;
            --border: 240 3.7% 15.9%;
            --radius: 0.5rem;
        }

        :root.light {
            --background: 0 0% 100%;
            --foreground: 240 10% 3.9%;
            --card: 0 0% 98%;
            --primary: 24 100% 50%;
            --primary-foreground: 0 0% 100%;
            --secondary: 240 4.8% 95.9%;
            --secondary-foreground: 240 5.9% 10%;
            --muted: 240 4.8% 95.9%;
            --muted-foreground: 240 3.8% 46.1%;
            --border: 240 5.9% 90%;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif;
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
            line-height: 1.4;
            font-size: 0.9375rem;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        body.mobile-menu-open {
            overflow: hidden;
            position: fixed;
            width: 100%;
            height: 100%;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 0.75rem;
        }

        header {
            position: sticky;
            top: 0;
            z-index: 100;
            background-color: hsla(var(--background), 0.9);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid hsl(var(--border));
            transition: background-color 0.3s ease;
        }

        .header-content {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.35rem;
            text-decoration: none;
            color: hsl(var(--foreground));
            font-weight: 700;
            font-size: 1.1rem;
            position: relative;
        }

        .logo img {
            height: 32px;
            max-width: 140px;
            object-fit: contain;
            filter: brightness(1);
            transition: filter 0.3s ease;
        }

        :root.light .logo img {
            filter: brightness(0.8);
        }

        .logo span {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
            border: 0;
        }

        .nav-links {
            display: none;
            gap: 1rem;
        }

        @media (min-width: 768px) {
            .nav-links {
                display: flex;
            }
        }

        .nav-links a {
            text-decoration: none;
            color: hsl(var(--foreground) / 0.8);
            font-size: 0.8125rem;
            font-weight: 500;
            transition: color 0.2s;
        }

        .nav-links a:hover {
            color: hsl(var(--primary));
        }

        .nav-links a:active,
        .nav-links a.active {
            color: hsl(var(--foreground));
        }

        .actions {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        button.icon-btn {
            background: none;
            border: none;
            padding: 0.4rem;
            border-radius: calc(var(--radius) - 2px);
            color: hsl(var(--foreground));
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s, color 0.3s ease;
        }

        button.icon-btn:hover {
            background-color: hsl(var(--secondary));
        }

        button.icon-btn svg {
            width: 18px;
            height: 18px;
            transition: transform 0.3s ease;
        }

        button.icon-btn:active svg {
            transform: scale(0.9);
        }

        .mobile-menu-btn {
            display: flex !important;
        }

        @media (min-width: 768px) {
            .mobile-menu-btn {
                display: none !important;
            }
        }

        .mobile-menu {
            position: fixed;
            top: 0;
            left: -300px;
            width: 280px;
            height: 100vh;
            background-color: hsl(var(--card));
            border-right: 1px solid hsl(var(--border));
            z-index: 1000;
            transition: left 0.3s ease-in-out;
            display: flex;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
        }

        .mobile-menu.active {
            left: 0;
        }

        .mobile-menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid hsl(var(--border));
        }

        .mobile-menu-title {
            font-weight: 700;
            font-size: 1rem;
            color: hsl(var(--foreground));
            display: flex;
            align-items: center;
        }

        .mobile-menu-links {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            flex: 1;
        }

        .mobile-menu-links a {
            text-decoration: none;
            color: hsl(var(--foreground));
            font-size: 0.9375rem;
            padding: 0.75rem;
            border-radius: var(--radius);
            transition: background-color 0.2s, color 0.2s;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .mobile-menu-links a:hover {
            background-color: hsl(var(--primary));
            color: white;
        }

        .mobile-menu-links a svg {
            width: 18px;
            height: 18px;
        }

        .mobile-menu-footer {
            margin-top: auto;
            padding-top: 1rem;
            border-top: 1px solid hsl(var(--border));
            font-size: 0.75rem;
            color: hsl(var(--muted-foreground));
            text-align: center;
        }

        .menu-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
            backdrop-filter: blur(2px);
        }

        .menu-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        main {
            padding: 0.75rem 0;
            transition: filter 0.3s;
        }

        main.menu-open {
            filter: blur(2px);
        }

        .breadcrumbs {
            padding: 0.5rem 0;
            font-size: 0.75rem;
            color: hsl(var(--muted-foreground));
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .breadcrumbs a {
            color: inherit;
            text-decoration: none;
            transition: color 0.2s;
        }

        .breadcrumbs a:hover {
            color: hsl(var(--primary));
        }

        .player-section {
            background-color: hsl(var(--card));
            border-radius: var(--radius);
            border: 1px solid hsl(var(--border));
            overflow: hidden;
            margin-bottom: 1.25rem;
            transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .video-wrapper {
            position: relative;
            aspect-ratio: 16/9;
            background-color: #000;
        }

        .video-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

        .play-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0);
            cursor: pointer;
            border: 0;
            width: 100%;
            text-align: center;
        }

        .play-overlay:focus {
            outline: 2px solid hsl(var(--primary));
        }

        .play-btn-large {
            width: 60px;
            height: 60px;
            background: hsla(0, 0%, 0%, 0.58);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            pointer-events: none;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            transition: transform 0.2s ease;
        }

        .play-overlay:hover .play-btn-large {
            transform: scale(1.1);
        }

        .play-btn-large svg {
            width: 28px;
            height: 28px;
            margin-left: 3px;
            fill: white;
            color: white;
        }

        .video-info {
            padding: 0.75rem 1rem;
        }

        .video-title {
            font-size: 1.125rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            line-height: 1.3;
        }

        .video-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }

        .badge {
            background-color: hsl(var(--secondary));
            color: hsl(var(--secondary-foreground));
            padding: 0.15rem 0.5rem;
            border-radius: 4px;
            font-size: 0.6875rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .badge svg {
            width: 12px;
            height: 12px;
        }

        .video-description {
            margin: 0.75rem 0 0.5rem 0;
            padding: 0.75rem;
            background-color: hsl(var(--secondary));
            border-radius: var(--radius);
            border-left: 4px solid hsl(var(--primary));
            font-size: 0.8125rem;
            line-height: 1.5;
            color: hsl(var(--secondary-foreground));
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .video-description p {
            margin-bottom: 0.25rem;
        }

        .video-description strong {
            color: hsl(var(--primary));
        }

        .btn-group {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.75rem;
        }

        .btn {
            padding: 0.4rem 0.8rem;
            border-radius: var(--radius);
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            border: 1px solid transparent;
            font-size: 0.75rem;
            text-decoration: none;
            transition: opacity 0.2s, background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }

        .btn:hover {
            opacity: 0.9;
        }

        .btn svg {
            width: 14px;
            height: 14px;
        }

        .btn-primary {
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
        }

        .btn-outline {
            background: transparent;
            border-color: hsl(var(--border));
            color: hsl(var(--foreground));
        }

        .btn-outline:hover {
            background-color: hsl(var(--secondary));
        }

        .section-title {
            font-size: 0.9375rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }

        .section-title svg {
            width: 16px;
            height: 16px;
            color: hsl(var(--primary));
        }

        .video-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 0.75rem;
        }

        .video-card {
            background-color: hsl(var(--card));
            border-radius: var(--radius);
            border: 1px solid hsl(var(--border));
            overflow: hidden;
            transition: border-color 0.2s, transform 0.2s, background-color 0.3s ease;
            text-decoration: none;
            color: inherit;
            display: block;
        }

        .video-card:hover {
            border-color: hsl(var(--primary));
            transform: translateY(-2px);
        }

        .video-card-link {
            text-decoration: none;
            color: inherit;
            display: block;
        }

        .card-thumb {
            position: relative;
            aspect-ratio: 16/9;
            background-color: hsl(var(--muted));
        }

        .card-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .card-duration {
            position: absolute;
            bottom: 4px;
            right: 4px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            font-size: 0.625rem;
            padding: 1px 4px;
            border-radius: 2px;
        }

        .card-views {
            position: absolute;
            bottom: 4px;
            left: 4px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            font-size: 0.625rem;
            padding: 1px 4px;
            border-radius: 2px;
            display: flex;
            align-items: center;
            gap: 3px;
        }

        .card-views svg {
            width: 10px;
            height: 10px;
        }

        .card-hover-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.3);
            opacity: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.2s;
            color: white;
        }

        .video-card:hover .card-hover-overlay {
            opacity: 1;
        }

        .card-hover-overlay svg {
            width: 2.5rem;
            height: 2.5rem;
        }

        .card-content {
            padding: 0.5rem;
        }

        .card-title {
            font-size: 0.8125rem;
            font-weight: 600;
            margin-bottom: 0.15rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.3;
            color: hsl(var(--foreground));
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .card-stats {
            font-size: 0.6875rem;
            color: hsl(var(--muted-foreground));
            transition: color 0.3s ease;
        }

        .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            margin-top: 2rem;
        }

        .pagination-link {
            padding: 0.5rem 1rem;
            background-color: hsl(var(--secondary));
            color: hsl(var(--foreground));
            text-decoration: none;
            border-radius: var(--radius);
            font-size: 0.875rem;
            transition: background-color 0.2s, color 0.3s ease;
        }

        .pagination-link:hover {
            background-color: hsl(var(--primary));
            color: white;
        }

        .pagination-current {
            color: hsl(var(--muted-foreground));
            font-size: 0.875rem;
            transition: color 0.3s ease;
        }

        .pagination-next {
            background-color: hsl(var(--primary));
            color: white;
        }

        footer {
            margin-top: 2rem;
            padding: 1rem 0;
            border-top: 1px solid hsl(var(--border));
            text-align: center;
            color: hsl(var(--muted-foreground));
            font-size: 0.75rem;
            transition: border-color 0.3s ease, color 0.3s ease;
        }

        .modal {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 2000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background-color: hsl(var(--background));
            width: 100%;
            max-width: 400px;
            border-radius: var(--radius);
            padding: 1rem;
            border: 1px solid hsl(var(--border));
            position: relative;
            transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .close-modal {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: none;
            border: none;
            cursor: pointer;
            color: hsl(var(--muted-foreground));
        }

        .search-form {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.75rem;
        }

        .search-input {
            flex: 1;
            padding: 0.5rem;
            border-radius: var(--radius);
            border: 1px solid hsl(var(--border));
            background: hsl(var(--secondary));
            color: hsl(var(--foreground));
            font-size: 0.875rem;
            transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }

        .search-input::placeholder {
            color: hsl(var(--muted-foreground));
        }

        img.error-fallback {
            background-color: hsl(var(--muted));
            object-fit: cover;
        }

        .search-input:focus {
            outline: 2px solid hsl(var(--primary));
        }

.ad-container {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background-color: #f0f0f0
}

.ad-container img {
    width: 100%;
    height: auto;
    display: block;
    opacity: 0;
    transition: opacity 0.3s ease-in-out
}

.ad-container.lazy-loaded img {
    opacity: 1
}

.ad-container {
    width: auto;
    height: auto;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: hsla(var(--background), 0.95);
    box-shadow: 0 4px 8px rgb(0 0 0 / .1);
    border-radius: 8px;
    border: 1px solid hsl(var(--border));
    z-index: 1000;
    display: none
}

.close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: hsla(var(--background), 0.8);
    border: 1px solid hsl(var(--border));
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 14px;
    cursor: pointer;
    color: hsl(var(--foreground));
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s, color 0.2s
}

        /* Dropdown Styles */
        .dropdown {
            position: relative;
            display: inline-block;
        }
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: var(--nav-bg, #1f1f1f);
            min-width: 160px;
            box-shadow: 0 8px 16px 0 rgb(0 0 0 / 0.5);
            z-index: 1000;
            border-radius: 8px;
            overflow: hidden;
            top: 100%;
            left: 0;
        }
        .dropdown-content a {
            color: var(--text, #fff);
            padding: 10px 16px;
            text-decoration: none;
            display: block;
            font-size: 14px;
        }
        .dropdown-content a:hover {
            background-color: var(--accent, #e50914);
            color: #fff;
        }
        .dropdown:hover .dropdown-content {
            display: block;
        }

        @media (max-width: 480px) {
            .video-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 0.5rem;
            }
            
            .video-description {
                font-size: 0.75rem;
            }
            
            .badge {
                font-size: 0.625rem;
            }
        }
    `;
}
__name(Styles, "Styles");
__name2(Styles, "Styles");
function BaseLayout(t, b, schema, url, meta = {}) {
  const canonical = meta.canonical || url.href;
  const description = meta.description || `Situs streaming video viral dan terbaru terlengkap. Nonton video HD gratis hanya di ${CONFIG.name}.`;
  const image = meta.image || CONFIG.logo;
  const keywords = meta.keywords || "video viral, streaming video, video lucu, hiburan, konten viral 2024";
  const siteTitle = `${t} - ${CONFIG.name}`;
  const style = Styles();
  const script = getScript();
  const paginationLinks = (meta.prevUrl ? `<link rel="prev" href="${meta.prevUrl}">` : "") + (meta.nextUrl ? `<link rel="next" href="${meta.nextUrl}">` : "");
  return `<!doctype html><html lang="id" class="dark"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="theme-color" content="#0a0a0a">
    <title>${siteTitle}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <meta name="robots" content="${meta.robots || "index, follow"}">
    <link rel="canonical" href="${canonical}">
    ${paginationLinks}
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
    <link rel="shortcut icon" href="/images/favicon.ico">
    
    <meta property="og:locale" content="id_ID">
    <meta property="og:site_name" content="${CONFIG.name}">
    <meta property="og:title" content="${siteTitle}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${image}">
    <meta property="og:image:width" content="1280">
    <meta property="og:image:height" content="720">
    <meta property="og:type" content="${meta.type || "website"}">
    
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${siteTitle}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">

    ${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}<\/script>` : ""}
    
    <link rel="preconnect" href="https://i0.wp.com" crossorigin>
    <link rel="dns-prefetch" href="https://i0.wp.com">

    <style>${style}</style>
    </head><body>
    <a href="#mainContent" class="skip-nav" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:9999;padding:8px 16px;background:hsl(var(--primary));color:#fff;text-decoration:none;&:focus{position:fixed;left:16px;top:16px;width:auto;height:auto;overflow:visible;}">Langsung ke Konten</a>
    ${MobileMenu()}
    ${Header(url.origin)}
 
    <main class="container" role="main" id="mainContent">${b}</main>

    ${SearchModal()}
    ${Footer()}

    <script>${script}<\/script> 

 <!-- Histats.com  START  (aync)-->
<script type="text/javascript">var _Hasync= _Hasync|| [];
_Hasync.push(['Histats.start', '1,4258060,4,0,0,0,00010000']);
_Hasync.push(['Histats.fasi', '1']);
_Hasync.push(['Histats.track_hits', '']);
(function() {
var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
hs.src = ('//s10.histats.com/js15_as.js');
(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
})();<\/script>
<noscript><a href="/" target="_blank"><img  src="//sstatic1.histats.com/0.gif?4258060&101" alt="${CONFIG.name} stats" border="0"></a></noscript>
<!-- Histats.com  END  -->
 <aside id="ad-container" class="ad-container" style="display: none;" aria-label="Iklan">
    <button class="close-btn" onclick="closeAd()" aria-label="Tutup iklan">\xD7</button>
     <script async data-cfasync="false" data-clbaid="" src="//bartererfaxtingling.com/bn.js"><\/script>
<div data-cl-spot="2064816"></div>
</aside>

<script data-cfasync="false">!function(){"use strict";for(var n=decodeURI("wd%60andp%5EjZd%5CZZQP_%5DQYUNURVWGLIECONDPP?MCIL:BI;%3C65?%3C/6:0%3Eq%3C,3-%25160-+-%7D%20%20%7Dyyut#t%20v$v!ryz!nQ%7BkrvhrmabcAkh%5Bbfkjaie%5EUbPZYUY%5D%5DIUIJ%5EIIQOOSMP%3CAS%3E%3E9D886=3;=05/-5*(/)'/+1)#%7C%20(yzzvzzv)yp%25x%7Brkj%7Cltfeffggvonih%5D%5C%5Bcba%5CZk%5BSRcW_dPSa%60MN%5DLWKMJITWOJAAKKK:=v?vCB%3E@@o8%22+;604,C2$+%25%222#1)%7C-!&$CBQTedSPj33H76o4EEEEEEEEEEEEEEEEEEEEEEEEEEKKKKKKKKKKKKKKKKKKKKKKKKKK__________3&%3Cv16#'m,%25).,T%3C~xPO9ls96I3ej5%2262=1/%5E+($%3CX)%22%5Cgdr%5Eb%7BN%20%7CC%5DbOS/_MUZTRWQVCGQQ=MN8H:7A@@#10@@0AnA10.:,3.862%227-%7Co!'~'!,#s%5CVVoasp%7B%7Dnnzfekrvesedlmh%5Cn_gickYaV%60bR%5DY%5B%5D.NX%5BNTVLGOT@@RFKIa0AEhf%5COYIgdVISw+,p5:*0Kb10+#%7B0%20--vux!ttuv%22%22%22~txptvifpVvpr%60ebdonik1%25$WYSdi%5DQTQ_%3ERUL%60TRH1GFRCQ@@%3CN:d23ut!%25vOZCA2Wa/)39*").replace(/((\\x40){2})/g,"$2").split("").map(((n,t)=>{const r=n.charCodeAt(0)-32;return r>=0&&r<95?String.fromCharCode(32+(r+t)%95):n})).join(""),t=[0,9,16,23,29,35,41,47,53,59,65,71,75,79,80,81,91,104,107,110,112,115,123,126,131,134,141,143,149,155,161,174,178,180,181,187,188,190,192,194,197,200,204,208,213,219,226,234,241,250,251,251,257,265,267,268,273,275,279,280,281,343,357,358,359,362,368,384,396,397,407,419,421,426,429,431,437,441,446,468,469,472,478,486,492,502,513,537,542,549,556,562,574,582,589,606,611,612,613,619,620,625,630],r=0;r<t.length-1;r++)t[r]=n.substring(t[r],t[r+1]);var o=[t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10]];o.push(o[1]+t[11]);var e=window,s=e.Math,i=e.Error,c=e.RegExp,u=e.document,l=e.navigator,h=e.Uint8Array;r=[t[12],o[7],t[13]+o[8],t[14]+o[8],t[15],t[16],t[17],t[18],t[19],t[20],t[21]];const a=t[22]+o[10],f={2:a+t[23],15:a+t[23],9:a+o[4],16:a+o[4],10:a+o[3],17:a+o[3],19:a+t[24],20:a+t[24],21:a+t[24]},E=t[25]+o[10],d={2:o[2],15:o[2],9:o[4],16:o[4],10:o[3],17:o[3],5:t[26],7:t[26],19:t[24],20:t[24],21:t[24]},v={15:t[27],16:t[28],17:t[29],19:o[6],20:o[6],21:o[6]},K=t[30],C=K+t[31],w=K+o[7],p=t[32]+o[1]+t[33],g=t[34],B=g+(o[1]+t[35]),_=g+o[11],D=g+(o[11]+t[36]),I=[t[37],t[38],t[39],t[40],t[41],t[42],t[43],t[44],t[45],t[46]],S={0:t[47],1:t[48]};class y extends i{constructor(n,o=0,s){super(n+(s?t[49]+s:t[50])),this[r[0]]=S[o],e.Object.setPrototypeOf(this,y.prototype)}}function P(n,r,o){try{return t[51],n()}catch(n){if(r)return r(n)}}const Q=n=>{const[o]=n.split(t[53]);let[e,s,i]=((n,t)=>{let[r,o,...e]=n.split(t);return o=[o,...e].join(t),[r,o,!!e.length]})(n,t[54]);i&&P((()=>{throw new y(t[55])}),typeof handleException===t[52]?n=>{null===handleException||void 0===handleException||handleException(n)}:undefined);const u=new c(t[56]+o+t[57],t[58]),[l,...h]=e.replace(u,t[50]).split(t[59]);return{protocol:o,origin:e,[r[1]]:l,path:h.join(t[59]),search:s}},b=t[60],x=[[97,122],[65,90],[48,57]],A=t[61],N=(n,t)=>s.floor(s.random()*(t-n+1))+n;function O(n){let r=t[50];for(let t=0;t<n;t++)r+=b.charAt(s.floor(s.random()*b.length));return r}const R=()=>{const n=I[N(0,I.length-1)],r=N(0,1)?N(1,999999):(n=>{let r=t[50];for(let t=0;t<n;t++)r+=e.String.fromCharCode(N(97,122));return r})(N(2,6));return n+t[62]+r},V=(n,r)=>(null==n?void 0:n.length)?n.split(t[63]).map((n=>{const o=n.indexOf(t[62])+1,e=n.slice(0,o),s=n.slice(o);return e+r(s)})).join(t[63]):t[50],k=(n,r)=>{const{search:o,origin:i}=Q(n),c=o?o.split(t[63]):[],[u,l]=((n,t)=>{const r=[],o=[];return n.forEach((n=>{n.indexOf(t)>-1?o.push(n):r.push(n)})),[r,o]})(c,K);if(!u.length)return n;const h=((n,t)=>{const r=[],o=N(n,t);for(let n=0;n<o;n++)r.push(R());return r})(...c.length>4?[0,2]:[5,9]),a=t[64]+r;u.indexOf(a)<0&&u.push(a);const f=(n=>{const t=[...n];let r=t.length;for(;0!==r;){const n=s.floor(s.random()*r);r--;[t[r],t[n]]=[t[n],t[r]]}return t})([...u,...h]);let E=((n,r)=>{const o=(n=>{let t=n%71387;return()=>t=(23251*t+12345)%71387})((n=>n.split(t[50]).reduce(((n,t)=>31*n+t.charCodeAt(0)&33554431),19))(n)),s=(i=r,V(i,e.decodeURIComponent)).split(t[50]).map((n=>((n,t)=>{const r=n.charCodeAt(0);for(const n of x){const[o,s]=n;if(r>=o&&r<=s){const n=s-o+1,i=o+(r-o+t())%n;return e.String.fromCharCode(i)}}return n})(n,o))).join(t[50]);var i;return n+t[63]+(n=>V(n,e.encodeURIComponent))(s)})(O(N(2,6))+t[62]+O(N(2,6)),f.join(t[63]));return l.length>0&&(E+=t[63]+l.join(t[63])),i+t[54]+E},m=()=>{const n=new c(C+t[65]).exec(e.location.href),r=n?+n[1]:null;return null!=r?r:e.Date.now()},M=new c(t[67]);function T(n){const r=function(){const n=new c(w+t[66]).exec(e.location.href);return n&&n[1]?n[1]:null}();return r?n.replace(M,t[68]+r+t[59]):n}function U(){if(l){const n=/Mac/.test(l.userAgent)&&l[A]>2,t=/iPhone|iPad|iPod/.test(l.userAgent);return n||t}return!1}function z(){return l&&/android/i.test(l.userAgent)}const W=o[0];function Y(){return t[71]+o[9]in e||t[72]+o[9]in e||t[73]+o[9]+t[74]in e||P((()=>!!(e[W]||l[W]||u.documentElement.getAttribute(W))),(()=>!1))||t[75]in e||t[76]in e||t[77]in e||t[78]in e||t[32]+o[0]+t[79]+o[5]+t[80]in u||(U()||z())&&l&&/Mobi/i.test(l.userAgent)&&!function(){try{return u.createEvent(t[69]),t[70]in u.documentElement}catch(n){return!1}}()||function(){var n;const r=t[81],o=t[82],s=t[83],i=t[84],u=t[85];let h=!1;var a,f;return l&&e[r]&&(z()||U())&&(h=l[A]<2&&new c(t[86]).test(l[o]),U()&&(h=h&&(a=null!==(n=l[s])&&void 0!==n?n:t[50],f=t[87],!(a.indexOf(f)>-1))&&e[r][i]<32&&!!e[r][u])),h}()}const Z=t[89];function $(){if((n=>{const[o]=(n=>{let o;try{if(o=e[n],!o)return[!1,o];const s=t[32]+n+t[88];return o[r[2]](s,s),o[r[3]](s)!==s?[!1,o]:(o[r[4]](s),[!0])}catch(n){return[!1,o,n]}})(n);return o})(t[91]))try{const n=localStorage[r[3]](Z);return[n?e.JSON.parse(n):null,!1]}catch(n){return[null,!0]}return[null,!0]}function j(n,r,o){let e=(/https?:\\/\\//.test(n)?t[50]:t[92])+n;return r&&(e+=t[59]+r),o&&(e+=t[54]+o),e}const L=(()=>{var n;const[o,s]=$();if(!s){const s=null!==(n=function(n){if(!n)return null;const r={};return e.Object.keys(n).forEach((o=>{const s=n[o];(function(n){const r=null==n?void 0:n[0],o=null==n?void 0:n[1];return typeof r===t[90]&&e.isFinite(+o)&&o>e.Date.now()})(s)&&(r[o]=s)})),r}(o))&&void 0!==n?n:{};localStorage[r[2]](Z,e.JSON.stringify(s))}return{get:n=>{const[t]=$();return null==t?void 0:t[n]},set:(n,t,o)=>{const i=[t,e.Date.now()+1e3*o],[c]=$(),u=null!=c?c:{};u[n]=i,s||localStorage[r[2]](Z,e.JSON.stringify(u))}}})(),G=(H=L,(n,t)=>{const{[r[1]]:o,path:e,search:s}=Q(n),i=H.get(o);if(i)return[j(i[0],e,s),!1];if((null==t?void 0:t[r[5]])&&(null==t?void 0:t[r[6]])){const{[r[1]]:n}=Q(null==t?void 0:t[r[5]]);return n!==o&&H.set(o,t[r[5]],t[r[6]]),[j(t[r[5]],e,s),!0]}return[n,!1]});var H;const J=[1,3,6,5,8,9,10,11,12,13,14,18,22],F=t[93],X=t[94];class q{constructor(n,t,o){this.t=n,this.o=t,this.i=o,this.u=u.currentScript,this.l=n=>this.h.then((t=>t&&t[r[7]](this.v(n)))),this.K=n=>h.from(e.atob(n),(n=>n.charCodeAt(0))),this.C=n=>0!=+n,this.h=this.p(),this[r[8]]=this.B(),e[p]=this[r[8]],e[D]=k}in(n){!this.C(n)||e[E+d[n]]||e[f[n]]||this._(n)}_(n){this.l(n).then((r=>{e[_+d[n]]=this.o;const s=this.D(),c=v[n],l=G(T(r))[0];if(c){const r=t[95]+c,e=u.querySelector(o[5]+t[96]+r+t[97]);if(!e)throw new i(t[98]+n);const l=e.getAttribute(r).trim();e.removeAttribute(r),s.setAttribute(r,l)}s.src=l,u.head.appendChild(s)}))}B(){return e[B]={},e.Promise[r[9]](J.map((n=>this.l(n).then((t=>{e[B][n]=t?T(t):void 0}))))).then((()=>!0))}v(n){const r=l?l.userAgent:t[50],o=e.location.hostname||t[50],s=e.innerHeight,i=e.innerWidth,c=sessionStorage?1:0,h=u.cookie?u.cookie.length:0,a=this.I(),f=Y()?1:0;return[s,i,c,m(),0,n,o.slice(0,100),h,a,r.slice(0,15),f].join(t[99])}I(){const n=(new e.Date)[X]();return!n||n>720||n<-720?0:720+n}p(){const n=e.WebAssembly&&e.WebAssembly.instantiate;return n?n(this.K(this.t),{}).then((({[r[10]]:n})=>{const{memory:o,[r[7]]:s}=n.exports,i=new e.TextEncoder,c=new e.TextDecoder(t[100]);return{[r[7]]:n=>{const t=i.encode(n),r=new h(o.buffer,0,t.length);r.set(t);const e=r.byteOffset+t.length,u=s(r,t.length,e),l=new h(o.buffer,e,u);return c.decode(l)}}})):e.Promise.resolve(null)}D(){const n=u.createElement(o[5]);return e.Object.assign(n.dataset,{[F]:t[101]},this.u?this.u.dataset:{}),n.async=!0,n}}const nn=(n,t,r,o)=>{const s=new q(n,t,r);e[o]=n=>s.in(n)};nn("AGFzbQEAAAABHAVgAAF/YAN/f38Bf2ADf39/AX5gAX8AYAF/AX8DCQgAAQIBAAMEAAQFAXABAQEFBgEBgAKAAgYJAX8BQdCIwAILB2cHBm1lbW9yeQIAA3VybAADGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBABBfX2Vycm5vX2xvY2F0aW9uAAcJc3RhY2tTYXZlAAQMc3RhY2tSZXN0b3JlAAUKc3RhY2tBbGxvYwAGCuMICCEBAX9BwAhBwAgoAgBBE2xBoRxqQYfC1y9wIgA2AgAgAAuTAQEFfxAAIAEgAGtBAWpwIABqIgQEQEEAIQBBAyEBA0AgAUEDIABBA3AiBhshARAAIgVBFHBBkAhqLQAAIQMCfyAHQQAgBhtFBEBBACAFIAFwDQEaIAVBBnBBgwhqLQAAIQMLQQELIQcgACACaiADQbQILQAAazoAACABQQFrIQEgAEEBaiIAIARJDQALCyACIARqC3ECA38CfgJAIAFBAEwNAANAIARBAWohAyACIAUgACAEai0AAEEsRmoiBUYEQCABIANMDQIDQCAAIANqMAAAIgdCLFENAyAGQgp+IAd8QjB9IQYgA0EBaiIDIAFHDQALDAILIAMhBCABIANKDQALCyAGC5QGAgN+B38gACABQQMQAiEDIAAgAUEFEAIhBUGwCCgCACIGQQZsIQggBkEBdCIKQQRqIQkgACABQQgQAiEEIAZBMmoiByAHbEHoB2whByAAIAFBChACQgFRBEAgAyAGQQJqIAZBCGtuIAdsrX0hAwsgCCAJbCEBIAZBBGshCQJAIANCgMDiwsczWgRAQYCAgBBBgICACCAEIAGtgqcgCiAGQfn///8HamxuIgBBCUZBGHQgAEEDRhsgAEERRhtBACADIAetgCAJrYAiBELjggVSQRZ0IARCs4MFURtyIQBBASEKDAELQYCAgAIhAEEAIQogA0KAkIjarzN9Qv/3wL8XVg0AIAQgAa2CpyIBIAggBkEHa2wiCG4iC0F9cUEBRyEAIAtBBUYEfyABIAhBA25uIABqBSAAC0EXdEGAgIACciEAC0HACCADQbgIKQMAIgQgAyAEVBsgB62AIgQgBkEOaiILIAkgA0KAgPHtxzBUIgkbrYCnQQAgACADQoCQzKf2MVQiDBtyNgIAEAAaEAAaIAJC6OjRg7fOzpcvNwAAQQdBCkEIIANCgNDFl4MyVBsgA0KAlqKd5TBUIgYbQQtBDCAGGyACQQhqEAEhASMAQRBrIgAkACABQS46AAAgAEHj3rUDNgIEIABBgggtAAA6AAIgAEGACC8AADsBACAAIAA2AgwgACAAQQRqNgIIIAFBAWohB0EAIQEgAEEIaiAKQQJ0aigCACIKLQAAIggEQANAIAEgB2ogCDoAACAKIAFBAWoiAWotAAAiCA0ACwsgAEEQaiQAIAEgB2ohABAAGkHACCAEIAutgCAFQhuGQgBCgICAIEKAgIAwQoCAgAhCgICAGCAFQghRG0KAgIASQoCAwA0gA0KAiJfarDJUGyAMGyADQoCYxq7PMVQbIAYbIAkbhIQ+AgAQABpBAkEEQQUgA0KAkOqA0zJUIgEbEABBA3AiBhshB0EFQQggARshCEEAIQEDQCAAQS86AAAgASAGRiEJIAcgCCAAQQFqEAEhACABQQFqIQEgCUUNAAsgACACawsEACMACwYAIAAkAAsQACMAIABrQXBxIgAkACAACwUAQcQICwtJAgBBgAgLLmluAJ6ipqyytgAAAAAAAACfoKGjpKWnqKmqq62ur7Cxs7S1t21ucG9ycXRzdnUAQbAICw4KAAAAPQAAAP+/U+KeAQ==","13","1.1.32-st","ovvcgxb")}();<\/script>
<script data-cfasync="false" data-clocid="1867443" async src="//crittereasilyhangover.com/on.js" onerror="ovvcgxb(15)" onload="ovvcgxb(15)"><\/script>

</body></html>`;
}
__name(BaseLayout, "BaseLayout");
__name2(BaseLayout, "BaseLayout");
function getScript() {
  return `
    function handleImageError(img) {
        img.removeAttribute('srcset');
        img.onerror = null;
        img.src = '${IMG_ERR}';
        img.classList.add('error-fallback');
    }

    document.addEventListener('error', function(e) {
        var target = e.target;
        if (target.tagName === 'IMG' && !target.dataset.fallbackApplied) {
            e.stopPropagation();
            target.dataset.fallbackApplied = "true";
            handleImageError(target);
        }
    }, true);

      
window.addEventListener('load', function() {
    var adContainer = document.getElementById('ad-container');
    var lastClosed = localStorage.getItem('adLastClosed');
    var now = new Date().getTime();

    // Cek apakah iklan sudah ditutup sebelumnya dan apakah 5 menit telah berlalu
    if (!lastClosed || (now - lastClosed) > 5 * 60 * 1000) {
        adContainer.style.display = 'block';
    }
});

function closeAd() {
    var adContainer = document.getElementById('ad-container');
    adContainer.style.display = 'none';

    // Simpan waktu penutupan iklan ke localStorage
    localStorage.setItem('adLastClosed', new Date().getTime());
}


    function initIcons(){if(typeof lucide!=='undefined'){lucide.createIcons()}}
function copyVideoUrl(){var url=window.location.href;navigator.clipboard.writeText(url).then(function(){alert('URL video berhasil disalin!')}).catch(function(){alert('Gagal menyalin URL')})}
function shareVideo(){if(navigator.share){navigator.share({title:document.title,text:document.querySelector('meta[name="description"]')?.content||'Nonton video viral di ${CONFIG.name}',url:window.location.href}).catch(function(){})}else{copyVideoUrl()}}
document.addEventListener('DOMContentLoaded',function(){var themeToggle=document.getElementById('themeToggle');var themeIcon=document.getElementById('themeIcon');var searchBtn=document.getElementById('searchBtn');var searchModal=document.getElementById('searchModal');var closeSearch=document.getElementById('closeSearch');var playTrigger=document.getElementById('playTrigger');var playerFrameContainer=document.getElementById('playerFrameContainer');var mainThumbnail=document.getElementById('mainThumbnail');var mainContent=document.getElementById('mainContent');var mobileMenuBtn=document.getElementById('mobileMenuBtn');var mobileMenu=document.getElementById('mobileMenu');var menuOverlay=document.getElementById('menuOverlay');var closeMobileMenu=document.getElementById('closeMobileMenu');function setTheme(theme){var root=document.documentElement;var icon=document.getElementById('themeIcon');if(theme==='light'){root.classList.add('light');root.classList.remove('dark');if(icon){icon.setAttribute('data-lucide','moon');icon.setAttribute('stroke','currentColor')}
localStorage.setItem('theme','light')}else{root.classList.remove('light');root.classList.add('dark');if(icon){icon.setAttribute('data-lucide','sun');icon.setAttribute('stroke','currentColor')}
localStorage.setItem('theme','dark')}
if(typeof lucide!=='undefined'){setTimeout(function(){lucide.createIcons()},10)}}
function toggleTheme(){var root=document.documentElement;var isLight=root.classList.contains('light');setTheme(isLight?'dark':'light')}
var savedTheme=localStorage.getItem('theme');if(savedTheme==='light'){setTheme('light')}else{setTheme('dark')}
if(themeToggle){themeToggle.addEventListener('click',function(e){e.preventDefault();toggleTheme()})}
function openMobileMenu(){if(mobileMenu)mobileMenu.classList.add('active');if(menuOverlay)menuOverlay.classList.add('active');document.body.classList.add('mobile-menu-open');if(mainContent)mainContent.classList.add('menu-open');}
function closeMobileMenuFunc(){if(mobileMenu)mobileMenu.classList.remove('active');if(menuOverlay)menuOverlay.classList.remove('active');document.body.classList.remove('mobile-menu-open');if(mainContent)mainContent.classList.remove('menu-open');}
if(mobileMenuBtn){mobileMenuBtn.addEventListener('click',function(e){e.stopPropagation();openMobileMenu()})}
if(closeMobileMenu){closeMobileMenu.addEventListener('click',function(e){e.stopPropagation();closeMobileMenuFunc()})}
if(menuOverlay){menuOverlay.addEventListener('click',function(){closeMobileMenuFunc()})}
window.addEventListener('resize',function(){if(window.innerWidth>=768){closeMobileMenuFunc()}});if(searchBtn){searchBtn.addEventListener('click',function(){if(searchModal)searchModal.classList.add('active');})}
if(closeSearch){closeSearch.addEventListener('click',function(){if(searchModal)searchModal.classList.remove('active');})}
if(searchModal){searchModal.addEventListener('click',function(e){if(e.target===searchModal)searchModal.classList.remove('active');})}
if(playTrigger&&playerFrameContainer&&mainThumbnail){playTrigger.addEventListener('click',function(){var videoUrl=playTrigger.getAttribute('data-video-url');playTrigger.style.display='none';mainThumbnail.style.display='none';playerFrameContainer.style.display='block';playerFrameContainer.innerHTML='<iframe src="'+videoUrl+'" frameborder="0" allow="autoplay; fullscreen" style="width:100%; height:100%;" title="Video Player - '+document.title+'" loading="lazy"></iframe>'})}
        initIcons();
    });

    `;
}
__name(getScript, "getScript");
__name2(getScript, "getScript");
function minifyCSS(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,>~+])\s*/g, "$1").replace(/;}/g, "}").replace(/^\s+|\s+$/g, "");
}
__name(minifyCSS, "minifyCSS");
__name2(minifyCSS, "minifyCSS");
function minifyJS(js) {
  return js.replace(/\/\*[\s\S]*?\*\//g, "").split("\n").map((line) => line.trim()).filter((line) => line.length > 0 && !line.startsWith("//")).join("\n").replace(/([{,;(=\-+*/&|<>!?:\[])\n+/g, "$1").replace(/\n+([},;)\].,])/g, "$1");
}
__name(minifyJS, "minifyJS");
__name2(minifyJS, "minifyJS");
function minifyHTML(html) {
  const preserved = [];
  html = html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (match2, css) => {
    return `<style>${minifyCSS(css)}</style>`;
  });
  html = html.replace(/<(pre|code|script|textarea)([^>]*)>([\s\S]*?)<\/\1>/gi, (match2, tag, attrs, content) => {
    if (tag.toLowerCase() === "script") {
      content = minifyJS(content);
    }
    preserved.push(`<${tag}${attrs}>${content}</${tag}>`);
    return `<!--PRESERVED_${preserved.length - 1}-->`;
  });
  html = html.replace(/<!--(?!\[if|PRESERVED)[\s\S]*?-->/g, "").replace(/\s+/g, " ").replace(/>\s+</g, "><").replace(/\s+>/g, ">").replace(/\s+\/>/g, "/>").trim();
  html = html.replace(/<!--PRESERVED_(\d+)-->/g, (_, i) => preserved[i]);
  return html;
}
__name(minifyHTML, "minifyHTML");
__name2(minifyHTML, "minifyHTML");
function render(t, b, schema, url, meta = {}) {
  const html = minifyHTML(BaseLayout(t, b, schema, url, meta));
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
__name(render, "render");
__name2(render, "render");
async function welcome(url, env) {
  const origin = url.origin;
  const publisherId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;
  const webpageId = origin + url.pathname;
  const welcomeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": publisherId,
        name: CONFIG.name,
        url: origin,
        logo: {
          "@type": "ImageObject",
          url: origin + CONFIG.logo
        },
        sameAs: CONFIG.socialMedia,
        foundingDate: CONFIG.foundingDate,
        description: CONFIG.description
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: origin,
        name: CONFIG.name,
        publisher: { "@id": publisherId },
        description: CONFIG.description,
        inLanguage: "id-ID",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${origin}/f/{search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: webpageId,
        name: `${CONFIG.name} - Selamat Datang`,
        isPartOf: { "@id": websiteId },
        description: desc(DESCRIPTIONS.welcomeMeta, { name: CONFIG.name }),
        inLanguage: "id-ID"
      }
    ]
  };
  const body = buildWelcomeBody(origin);
  const metaData = {
    description: desc(DESCRIPTIONS.welcomeMeta, { name: CONFIG.name }),
    canonical: url.origin,
    robots: "index, follow",
    type: "website"
  };
  return render(desc(TITLES.welcomePage, { name: CONFIG.name }), body, welcomeSchema, url, metaData);
}
__name(welcome, "welcome");
__name2(welcome, "welcome");
function buildWelcomeBody(origin) {
  return `
    <section class="welcome-section" style="text-align: center; padding: 3rem 1rem; max-width: 800px; margin: 0 auto;">
        <div class="welcome-header" style="margin-bottom: 2rem;">
            <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: hsl(var(--foreground));">
                Selamat Datang di ${CONFIG.name}
            </h1>
            <p style="font-size: 1.1rem; color: hsl(var(--muted-foreground)); line-height: 1.6; margin-bottom: 2rem;">
                ${desc(DESCRIPTIONS.welcomeDescription, { name: CONFIG.name })}
            </p>
        </div>

        <div class="welcome-actions" style="display: flex; flex-direction: column; gap: 1rem; align-items: center; margin-bottom: 3rem;">
            <a href="/list/" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                </svg>
                Jelajahi Video Terbaru
            </a>

            <div class="search-section" style="width: 100%; max-width: 500px; margin-top: 1rem;">
                <form action="/f/" method="get" style="display: flex; gap: 0.5rem;">
                    <input
                        type="text"
                        name="q"
                        placeholder="Cari video..."
                        required
                        style="flex: 1; padding: 0.75rem 1rem; border: 1px solid hsl(var(--border)); border-radius: var(--radius); background: hsl(var(--secondary)); color: hsl(var(--foreground)); font-size: 1rem;"
                    >
                    <button type="submit" class="btn btn-outline" style="padding: 0.75rem 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        Cari
                    </button>
                </form>
            </div>
        </div>

        <div class="welcome-features" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
            <div class="feature-card" style="background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: var(--radius); padding: 1.5rem; text-align: center;">
                <div style="color: hsl(var(--primary)); margin-bottom: 1rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: hsl(var(--foreground));">Koleksi Video Lengkap</h3>
                <p style="color: hsl(var(--muted-foreground)); font-size: 0.9rem; line-height: 1.5;">
                    Nikmati ribuan video berkualitas tinggi dari berbagai kategori favorit Anda.
                </p>
            </div>

            <div class="feature-card" style="background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: var(--radius); padding: 1.5rem; text-align: center;">
                <div style="color: hsl(var(--primary)); margin-bottom: 1rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: hsl(var(--foreground));">Pencarian Cepat</h3>
                <p style="color: hsl(var(--muted-foreground)); font-size: 0.9rem; line-height: 1.5;">
                    Temukan video yang Anda cari dengan fitur pencarian canggih dan filter yang mudah.
                </p>
            </div>

            <div class="feature-card" style="background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: var(--radius); padding: 1.5rem; text-align: center;">
                <div style="color: hsl(var(--primary)); margin-bottom: 1rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
                    </svg>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: hsl(var(--foreground));">Gratis & Bebas Iklan</h3>
                <p style="color: hsl(var(--muted-foreground)); font-size: 0.9rem; line-height: 1.5;">
                    Tonton semua video tanpa gangguan iklan, cepat dan tanpa biaya tersembunyi.
                </p>
            </div>
        </div>

        <div class="welcome-footer" style="border-top: 1px solid hsl(var(--border)); padding-top: 2rem;">
            <p style="color: hsl(var(--muted-foreground)); font-size: 0.9rem;">
                \xA9 2026 ${CONFIG.name}. Dibuat dengan \u2764\uFE0F untuk pengalaman menonton terbaik.
            </p>
        </div>
    </section>
    `;
}
__name(buildWelcomeBody, "buildWelcomeBody");
__name2(buildWelcomeBody, "buildWelcomeBody");
var memoryCache = /* @__PURE__ */ new Map();
var CACHE_TTL2 = {
  "/data/lookup_shard.json": 86400,
  // 24h — rarely changes
  "/data/meta.json": 3600,
  // 1h  — changes infrequently
  "default": 1800
  // 30m — default for all other data
};
function getTTL(path) {
  return CACHE_TTL2[path] || CACHE_TTL2["default"];
}
__name(getTTL, "getTTL");
__name2(getTTL, "getTTL");
async function get(url, env, path) {
  const memKey = path;
  const memEntry = memoryCache.get(memKey);
  if (memEntry && Date.now() < memEntry.expires) {
    return memEntry.data;
  }
  const cacheKeyUrl = new URL(`/cache-data${path}`, url.origin).toString();
  const cacheKey = new Request(cacheKeyUrl);
  let cfCache;
  try {
    cfCache = caches.default;
  } catch (e) {
    cfCache = null;
  }
  if (cfCache) {
    try {
      const cached = await cfCache.match(cacheKey);
      if (cached) {
        const data = await cached.json();
        const ttl = getTTL(path);
        memoryCache.set(memKey, {
          data,
          expires: Date.now() + ttl * 1e3
        });
        return data;
      }
    } catch (e) {
    }
  }
  try {
    const r = await env.ASSETS.fetch(new URL(path, url.origin));
    if (!r.ok) return null;
    const contentType = r.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.warn(`Expected JSON for ${path} but got ${contentType}`);
      return null;
    }
    const data = await r.json();
    const ttl = getTTL(path);
    memoryCache.set(memKey, {
      data,
      expires: Date.now() + ttl * 1e3
    });
    if (cfCache) {
      try {
        const cacheResp = new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": `public, max-age=${ttl}, s-maxage=${ttl}, stale-while-revalidate=${ttl}`
          }
        });
        await cfCache.put(cacheKey, cacheResp);
      } catch (e) {
      }
    }
    return data;
  } catch (e) {
    console.error(`Error fetching/parsing ${path}:`, e);
  }
  return null;
}
__name(get, "get");
__name2(get, "get");
function Breadcrumbs(catName, catUrl, title, webpageId) {
  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
        <a href="/" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <span itemprop="name">Beranda</span>
            <meta itemprop="item" content="${webpageId.split("/").slice(0, 3).join("/")}/">
            <meta itemprop="position" content="1">
        </a> / 
        <a href="${catUrl}" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <span itemprop="name">${h(catName)}</span>
            <meta itemprop="item" content="${catUrl}">
            <meta itemprop="position" content="2">
        </a> / 
        <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <span itemprop="name">${h(title)}</span>
            <meta itemprop="item" content="${webpageId}">
            <meta itemprop="position" content="3">
        </span>
    </nav>
    `;
}
__name(Breadcrumbs, "Breadcrumbs");
__name2(Breadcrumbs, "Breadcrumbs");
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
  const titleWords = norm(v.t).split(" ").filter((w) => w.length >= 3);
  const seenDup = /* @__PURE__ */ new Set();
  const related = data.filter((x) => {
    if (x.f === id) return false;
    const dupKey = norm(x.t) + "|" + (x.ln || x.length || x.d || "");
    if (seenDup.has(dupKey)) return false;
    seenDup.add(dupKey);
    return true;
  }).map((x) => {
    let score = 0;
    if (v.kt && x.kt && norm(v.kt) === norm(x.kt)) score += 20;
    const nt = norm(x.t);
    const matches = titleWords.filter((w) => nt.includes(w));
    score += matches.length * 10;
    if (matches.length >= 2) score += 30;
    return { ...x, _score: score };
  }).sort(
    (a, b) => b._score - a._score || (parseInt(b.vw) || 0) - (parseInt(a.vw) || 0)
  ).slice(0, 16);
  const publisherId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;
  const webpageId = origin + url.pathname;
  const videoId = origin + url.pathname + "#video";
  const articleId = origin + url.pathname + "#article";
  const breadcrumbId = origin + url.pathname + "#breadcrumb";
  const catName = v.kt || "Video";
  const rawCatUrl = v.kt_url || `/f/video`;
  const catUrl = rawCatUrl.startsWith("http") ? rawCatUrl : `${origin}${rawCatUrl}`;
  const durationISO = v.dr || "PT10M30S";
  const uploadDate = v.up || (/* @__PURE__ */ new Date()).toISOString();
  const viewCount = parseInt(v.vw) || 0;
  const schema = buildSchema(origin, url, v, related, {
    publisherId,
    websiteId,
    webpageId,
    videoId,
    articleId,
    breadcrumbId,
    catName,
    catUrl,
    durationISO,
    uploadDate,
    viewCount
  });
  const breadcrumbsHtml = Breadcrumbs(catName, catUrl, v.t, webpageId);
  const duration = formatDuration(v.ln || v.length || v.d);
  const body = buildDetailBody(
    v,
    related,
    breadcrumbsHtml,
    duration,
    origin,
    viewCount,
    uploadDate,
    durationISO
  );
  let randomRelatedHtml = "";
  const fullBody = body + randomRelatedHtml;
  const meta = {
    description: v.ds_esc || v.ds || desc(DESCRIPTIONS.detailMeta, { title: v.t_esc || h(v.t), name: CONFIG.name }),
    image: wpImg(v.sp || v.si, 300),
    canonical: `${origin}/e/${v.f}`,
    type: "article",
    robots: "index, follow",
    keywords: v.tags ? v.tags.join(", ") : DESCRIPTIONS.detailKeywords
  };
  return render(v.t, fullBody, schema, url, meta);
}
__name(detail, "detail");
__name2(detail, "detail");
function notFound(url) {
  return Response.redirect(url.origin + "/", 301);
}
__name(notFound, "notFound");
__name2(notFound, "notFound");
function buildSchema(origin, url, v, related, ids) {
  const {
    publisherId,
    websiteId,
    webpageId,
    videoId,
    articleId,
    breadcrumbId,
    catName,
    catUrl,
    durationISO,
    uploadDate,
    viewCount
  } = ids;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": publisherId,
        name: CONFIG.name,
        url: origin,
        logo: {
          "@type": "ImageObject",
          url: origin + CONFIG.logo
        },
        sameAs: CONFIG.socialMedia,
        foundingDate: CONFIG.foundingDate,
        description: CONFIG.description
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: origin,
        name: CONFIG.name,
        publisher: { "@id": publisherId },
        description: CONFIG.description,
        inLanguage: "id-ID",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${origin}/f/{search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: webpageId,
        name: v.t_esc || h(v.t),
        isPartOf: { "@id": websiteId },
        description: v.ds_esc || v.ds || desc(DESCRIPTIONS.detailMeta, { title: v.t_esc || h(v.t), name: CONFIG.name }),
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: wpImg(v.sp || v.si, 1280),
          width: 1280,
          height: 720
        },
        breadcrumb: { "@id": breadcrumbId },
        datePublished: uploadDate,
        dateModified: uploadDate,
        inLanguage: "id-ID"
      },
      {
        "@type": "VideoObject",
        "@id": videoId,
        name: v.t_esc || h(v.t),
        description: v.ds_esc || v.ds || desc(DESCRIPTIONS.detailMeta, { title: v.t_esc || h(v.t), name: CONFIG.name }),
        thumbnailUrl: [wpImg(v.sp || v.si, 1280)],
        uploadDate,
        duration: durationISO,
        contentUrl: v.pe,
        embedUrl: v.pe,
        interactionStatistic: [
          {
            "@type": "InteractionCounter",
            interactionType: { "@type": "WatchAction" },
            userInteractionCount: viewCount
          },
          {
            "@type": "InteractionCounter",
            interactionType: { "@type": "LikeAction" },
            userInteractionCount: Math.floor(viewCount * 0.1)
          }
        ],
        genre: v.kt ? [v.kt, "Viral", "Hiburan"] : ["Viral", "Hiburan", "Komedi"],
        publisher: { "@id": publisherId },
        regionsAllowed: "ID",
        isFamilyFriendly: true,
        keywords: v.tags ? v.tags.join(", ") : "video viral, video terbaru, video trending",
        potentialAction: {
          "@type": "SeekToAction",
          target: `${webpageId}?t={seek_to_second_number}`,
          "startOffset-input": "required name=seek_to_second_number"
        }
      },
      {
        "@type": "Article",
        "@id": articleId,
        headline: v.t_esc || h(v.t),
        description: v.ds_esc || v.ds || desc(DESCRIPTIONS.detailMeta, { title: v.t_esc || h(v.t), name: CONFIG.name }),
        image: {
          "@type": "ImageObject",
          url: wpImg(v.sp || v.si, 1280),
          width: 1280,
          height: 720
        },
        datePublished: uploadDate,
        dateModified: uploadDate,
        author: {
          "@type": "Person",
          "name": "Admin",
          "url": origin + "/author/admin"
        },
        publisher: { "@id": publisherId },
        mainEntityOfPage: { "@id": webpageId },
        video: { "@id": videoId },
        wordCount: v.ds ? v.ds.split(/\s+/).length : 50,
        articleSection: catName,
        inLanguage: "id-ID"
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beranda",
            item: origin
          },
          {
            "@type": "ListItem",
            position: 2,
            name: catName,
            item: catUrl
          },
          {
            "@type": "ListItem",
            position: 3,
            name: v.t,
            item: webpageId
          }
        ]
      }
    ]
  };
  if (related.length > 0) {
    schema["@graph"].push({
      "@type": "ItemList",
      "@id": origin + url.pathname + "#related",
      name: TITLES.detailRelated,
      description: desc(TITLES.detailRelatedDesc, { title: v.t }),
      numberOfItems: related.length,
      itemListElement: related.map((rv, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${origin}/e/${rv.f}`,
        name: rv.t,
        image: {
          "@type": "ImageObject",
          "url": wpImg(rv.si || rv.sp, 300),
          "width": 300,
          "height": 200
        }
      }))
    });
  }
  return schema;
}
__name(buildSchema, "buildSchema");
__name2(buildSchema, "buildSchema");
function buildDetailBody(v, related, breadcrumbsHtml, duration, origin, viewCount, uploadDate, durationISO) {
  return `
    ${breadcrumbsHtml}
    
    <article class="player-section" itemscope itemtype="https://schema.org/Article">

        
        <div class="video-wrapper" id="videoContainer">
            <img srcset="${generateSrcset(v.sp || v.si, [320, 640, 960])}"
     sizes="(max-width: 600px) 100vw, 1200px"
     src="${wpImg(v.sp || v.si, 1200)}" 
     alt="${h(v.t)} - ${CONFIG.name}"
     class="video-placeholder" 
     id="mainThumbnail"
     width="1200" 
     height="630" 
     loading="lazy" itemprop="image"
     onerror="this.onerror=null; this.removeAttribute('srcset'); this.src='${IMG_ERR}';">
            <button class="play-overlay" id="playTrigger" aria-label="Putar Video" data-video-url="${v.pe}">
                <div class="play-btn-large"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
            </button>
            <div id="playerFrameContainer" style="display:none; width:100%; height:100%;"></div>
        </div>

        <div class="video-info">
            <h1 class="video-title" itemprop="headline">${v.t_esc}</h1>
            <div class="video-meta">
                <span class="badge" itemprop="author" itemscope itemtype="https://schema.org/Person"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fc0015ff" stroke-width="2"> <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path> <circle cx="12" cy="7" r="4"></circle> </svg> <span itemprop="name">Admin</span></span>
                <span class="badge"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${duration}</span>
                <span class="badge"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> ${v.vw_fmt}</span>
                <span class="badge"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="22" y2="10"/></svg> <time datetime="${uploadDate}" itemprop="datePublished">${v.up_fmt}</time></span>
            </div>
            
            <div class="video-description" itemprop="articleBody">
                <p><strong>${v.t_esc}</strong> - ${v.ds_esc || desc(DESCRIPTIONS.detailBody, { title: v.t_esc })}</p>
                <p>${v.tags ? v.tags.map((t) => "#" + t.replace(/\s+/g, "")).join(" ") : DESCRIPTIONS.detailTags}</p>
            </div>
            <center> <script async data-cfasync="false" data-clbaid="" src="//bartererfaxtingling.com/bn.js"><\/script>
<div data-cl-spot="2064816"></div> </center>
            <div class="btn-group">
                <a href="/dl/${v.f}" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Video</a>
                <button class="btn btn-outline" onclick="copyVideoUrl()"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h4"/><path d="M18 13v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3z"/></svg> Like (${formatNumber(viewCount)})</button>
                <button class="btn btn-outline" onclick="shareVideo()"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share</button>
            </div>
        </div>
    </article>

    <section aria-label="Video terkait">
        
        <h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="8" y1="2" x2="8" y2="22"/><line x1="16" y1="2" x2="16" y2="22"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="2" y1="16" x2="22" y2="16"/></svg> ${TITLES.detailRelated}</h2>
        
        <div class="video-grid">
            ${related.map((rv, i) => VideoCard(rv, origin, i)).join("")}
        </div>
    </section>
    `;
}
__name(buildDetailBody, "buildDetailBody");
__name2(buildDetailBody, "buildDetailBody");
function VideoCard(v, origin, i) {
  const duration = formatDuration(v.ln || v.length || v.d);
  const position = i + 1;
  const titleVal = v.t || v.title || "Video";
  const titleEsc = v.t_esc || h(titleVal);
  const thumb = v.si || v.sp || v.single_img || v.splash_img || "";
  const views = v.vw_fmt || v.vw || v.views || "0";
  const uploadVal = v.up || v.added || null;
  const uploadDate = uploadVal || (/* @__PURE__ */ new Date()).toISOString();
  const formattedDate = uploadVal ? new Date(uploadVal).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) : "baru";
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
                    <span style="text-transform: capitalize;">${v.kt || "Video"}</span> \u2022 
                    <time datetime="${uploadDate}" title="Diupload pada ${formattedDate}">${formattedDate}</time>
                </div>
            </div>
        </a>
    </article>
    `;
}
__name(VideoCard, "VideoCard");
__name2(VideoCard, "VideoCard");
function Pagination(page, totalResults, perPage, baseUrl, rawQ = "") {
  const end = page * perPage;
  const qSlug = rawQ ? encodeURIComponent(norm(rawQ).replace(/\s+/g, "-")) : "";
  let prevUrl, nextUrl;
  if (baseUrl === "/page/") {
    prevUrl = page === 2 ? "/" : `/page/${page - 1}`;
    nextUrl = `/page/${page + 1}`;
  } else if (baseUrl === "/list/") {
    prevUrl = page === 2 ? "/list/" : `/list/${page - 1}`;
    nextUrl = `/list/${page + 1}`;
  } else if (baseUrl === "/f/") {
    const safeSlug = qSlug.toLowerCase();
    prevUrl = page === 2 ? `${baseUrl}${safeSlug}` : `${baseUrl}${safeSlug}/page/${page - 1}`;
    nextUrl = `${baseUrl}${safeSlug}/page/${page + 1}`;
  } else {
    prevUrl = page === 2 ? `${baseUrl}${qSlug}` : `${baseUrl}${qSlug}?page=${page - 1}`;
    nextUrl = `${baseUrl}${qSlug}?page=${page + 1}`;
  }
  return `
    <nav class="pagination" aria-label="Navigasi halaman" role="navigation">
        ${page > 1 ? `<a href="${prevUrl}" rel="prev" class="pagination-link">\u2190 Sebelumnya</a>` : ""}
        <span class="pagination-current" aria-current="page">Halaman ${page}</span>
        ${end < totalResults ? `<a href="${nextUrl}" rel="next" class="pagination-link pagination-next">Berikutnya \u2192</a>` : ""}
    </nav>
    `;
}
__name(Pagination, "Pagination");
__name2(Pagination, "Pagination");
async function search(url, env) {
  const parts = url.pathname.split("/");
  const slug = parts[2] ? decodeURIComponent(parts[2]) : "";
  const origin = url.origin;
  const searchQ = url.searchParams.get("q");
  const searchP = url.searchParams.get("page");
  let rawQ = slug || searchQ || "";
  rawQ = decodeURIComponent(rawQ).replace(/-/g, " ").trim();
  const seenWords = /* @__PURE__ */ new Set();
  rawQ = rawQ.split(/\s+/).filter((w) => {
    const lw = w.toLowerCase();
    if (seenWords.has(lw)) return false;
    seenWords.add(lw);
    return true;
  }).join(" ");
  const qSlug = norm(rawQ).replace(/\s+/g, "-").toLowerCase();
  let page = 1;
  if (parts.length === 5 && parts[3] === "page") {
    page = parseInt(parts[4], 10);
  } else if (searchP) {
    page = parseInt(searchP, 10);
  }
  if (isNaN(page) || page < 1) page = 1;
  const isStandardPath = parts.length === 3 || parts.length === 5 && parts[3] === "page";
  const isCanonicalSlug = slug === qSlug;
  const isCanonicalPage = page === 1 && parts.length === 3 || page > 1 && parts.length === 5;
  if (searchQ || searchP || !isStandardPath || !isCanonicalSlug || !isCanonicalPage) {
    let target = `/f/${qSlug}`;
    if (page > 1) target += `/page/${page}`;
    return Response.redirect(origin + target, 301);
  }
  const escapedQ_raw = rawQ.replace(/\b\w/g, (c) => c.toUpperCase());
  const qShow = escapedQ_raw;
  if (qShow.length < 2) return Response.redirect(origin + "/", 302);
  const qNorm = norm(qShow);
  const keywords = qNorm.split(/\s+/).filter((w) => w.length > 0);
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
  const seen = /* @__PURE__ */ new Set();
  const seenDup = /* @__PURE__ */ new Set();
  let hasCompleteKeywordMatch = false;
  for (const dataset of datasets) {
    for (const item of dataset) {
      const rawDur = item.ln || item.length || item.d || "";
      const normDur = rawDur ? parseInt(rawDur) || 0 : 0;
      const dupKey = normDur > 0 ? `dur_${normDur}` : item.f;
      if (seenDup.has(dupKey)) continue;
      seenDup.add(dupKey);
      const tNorm = norm(item.t);
      let score = 0;
      let matchCount = 0;
      if (tNorm === qNorm) score += 1e4;
      else if (tNorm.includes(qNorm)) score += 5e3;
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
        score += 2e3;
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
  if (page > 1 && res.length === 0) {
    return Response.redirect(`${origin}/f/${qSlug}`, 301);
  }
  const publisherId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;
  const qUrlSafe = encodeURIComponent(rawQ.replace(/\s+/g, "-")).toLowerCase();
  const webpageId = origin + `/f/${qUrlSafe}` + (page > 1 ? `/page/${page}` : "");
  const searchSchema = buildSearchSchema(origin, qShow, page, webpageId, totalResults, res, start, publisherId, websiteId);
  const body = buildSearchBody(qShow, page, totalResults, res, origin, start, end);
  const escapedQ = h(qShow);
  const metaData = {
    description: `${desc(DESCRIPTIONS.searchMeta, { query: escapedQ, name: CONFIG.name })}${page > 1 ? ` Halaman ${page}.` : ""}`,
    canonical: page === 1 ? `${url.origin}/f/${qUrlSafe}` : `${url.origin}/f/${qUrlSafe}/page/${page}`,
    robots: hasCompleteKeywordMatch && page === 1 ? "index, follow" : "noindex, follow",
    type: "website"
  };
  const response = render(desc(TITLES.searchPage, { query: escapedQ, total: totalResults, name: CONFIG.name }), body, searchSchema, url, metaData);
  if (hasCompleteKeywordMatch) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Cache-Control", "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
  return response;
}
__name(search, "search");
__name2(search, "search");
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
        "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
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
__name(buildSearchSchema, "buildSearchSchema");
__name2(buildSearchSchema, "buildSearchSchema");
function buildSearchBody(rawQ, page, totalResults, res, origin, start, end) {
  const qEsc = h(rawQ);
  const h1Text = desc(TITLES.searchH1, { query: qEsc, total: totalResults, name: CONFIG.name });
  const foundText = desc(TITLES.searchFound, { total: totalResults, query: qEsc, name: CONFIG.name });
  return `
    <section itemscope itemtype="https://schema.org/ItemList">
        <meta itemprop="name" content="${h1Text}${page > 1 ? ` - Halaman ${page}` : ""}">
        <meta itemprop="description" content="Ditemukan ${totalResults} video untuk kata kunci '${qEsc}'">
        <meta itemprop="numberOfItems" content="${totalResults}">
        
        <h1 class="section-title" itemprop="name">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            ${h1Text}${page > 1 ? ` - Halaman ${page}` : ""}
        </h1>
        <p style="color: hsl(var(--muted-foreground)); font-size: 0.875rem; margin-bottom: 1rem;">${foundText}${page > 1 ? ` - Halaman ${page}` : ""}</p>
        
        <div class="video-grid">
            ${res.map((v, index) => VideoCard2(v, origin, start + index)).join("")}
        </div>
        
        ${Pagination(page, totalResults, 50, "/f/", rawQ)}
    </section>
    `;
}
__name(buildSearchBody, "buildSearchBody");
__name2(buildSearchBody, "buildSearchBody");
function VideoCard2(v, origin, i) {
  const duration = formatDuration(v.ln || v.length || v.d);
  const position = i + 1;
  const titleVal = v.t || v.title || "Video";
  const titleEsc = v.t_esc || h(titleVal);
  const thumb = v.si || v.sp || v.single_img || v.splash_img || "";
  const views = v.vw_fmt || v.vw || v.views || "0";
  const uploadVal = v.up || v.added || null;
  const uploadDate = uploadVal || (/* @__PURE__ */ new Date()).toISOString();
  const formattedDate = uploadVal ? new Date(uploadVal).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) : "baru";
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
                    <span style="text-transform: capitalize;">${v.kt || "Video"}</span> \u2022 
                    <time datetime="${uploadDate}" title="Diupload pada ${formattedDate}">${formattedDate}</time>
                </div>
            </div>
        </a>
    </article>
    `;
}
__name(VideoCard2, "VideoCard2");
__name2(VideoCard2, "VideoCard");
async function list(url, env, pageParam) {
  const p = pageParam || url.pathname.split("/")[2];
  let page = parseInt(p, 10);
  if (isNaN(page) || page < 1) page = 1;
  const meta = await get(url, env, "/data/meta.json");
  if (!meta) return notFound2(url);
  const data = await get(url, env, `/data/list/${page}.json`);
  if (!data) return notFound2(url);
  const seenDup = /* @__PURE__ */ new Set();
  const files = (data.result?.files || []).filter((v) => {
    const fileCode = v.f || v.file_code || v.filecode;
    const rawDur = v.length || v.d || v.ln || "";
    const normDur = rawDur ? parseInt(rawDur) || 0 : 0;
    const dupKey = normDur > 0 ? `dur_${normDur}` : fileCode;
    if (seenDup.has(dupKey)) return false;
    seenDup.add(dupKey);
    return true;
  });
  if (page > 1 && files.length === 0) {
    return notFound2(url);
  }
  const origin = url.origin;
  const publisherId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;
  const webpageId = origin + url.pathname;
  const listSchema = buildListSchema(
    origin,
    page,
    files,
    publisherId,
    websiteId,
    webpageId
  );
  const body = buildListBody(files, page, meta, origin);
  const metaData = {
    description: desc(DESCRIPTIONS.listMeta, { name: CONFIG.name, page }),
    canonical: page === 1 ? `${url.origin}/list/` : `${url.origin}/list/${page}`,
    robots: page === 1 ? "index, follow" : "noindex, follow",
    type: "website"
  };
  return render(desc(TITLES.listPage, { page }), body, listSchema, url, metaData);
}
__name(list, "list");
__name2(list, "list");
function notFound2(url) {
  return Response.redirect(url.origin + "/", 301);
}
__name(notFound2, "notFound2");
__name2(notFound2, "notFound");
function buildListSchema(origin, page, files, publisherId, websiteId, webpageId) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": publisherId,
        name: CONFIG.name,
        url: origin,
        logo: {
          "@type": "ImageObject",
          url: origin + CONFIG.logo
        },
        sameAs: CONFIG.socialMedia,
        foundingDate: CONFIG.foundingDate,
        description: CONFIG.description
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: origin,
        name: CONFIG.name,
        publisher: { "@id": publisherId },
        description: CONFIG.description,
        inLanguage: "id-ID",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${origin}/f/{search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: webpageId,
        name: page === 1 ? `${CONFIG.name} - Video Terbaru` : `Video Terbaru - Halaman ${page}`,
        isPartOf: { "@id": websiteId },
        description: desc(DESCRIPTIONS.listSchema, { name: CONFIG.name, page }),
        inLanguage: "id-ID"
      },
      {
        "@type": "ItemList",
        "@id": webpageId + "#itemlist",
        name: page === 1 ? "Video Terbaru" : `Video Terbaru - Halaman ${page}`,
        description: desc(DESCRIPTIONS.listCollection, { name: CONFIG.name, page }),
        numberOfItems: files.length,
        itemListElement: files.map((v, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${origin}/e/${v.file_code}`,
          name: v.title,
          image: {
            "@type": "ImageObject",
            "url": wpImg(v.single_img, 300),
            "width": 300,
            "height": 168
          }
        }))
      }
    ]
  };
}
__name(buildListSchema, "buildListSchema");
__name2(buildListSchema, "buildListSchema");
function buildListBody(files, page, meta, origin) {
  return `
    <section itemscope itemtype="https://schema.org/ItemList">
        <meta itemprop="name" content="${page === 1 ? "Video Terbaru" : `Video Terbaru - Halaman ${page}`}">
        <meta itemprop="description" content="${desc(DESCRIPTIONS.listCollection, { name: CONFIG.name, page })}">
        <meta itemprop="numberOfItems" content="${files.length}">
        
        <h1 class="section-title" itemprop="name">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> 
            ${desc(TITLES.listH1, { page })}
        </h1>
        
        <div class="video-grid">
            ${files.map((v, index) => VideoCard3(v, origin, index)).join("")}
        </div>
        
        ${Pagination(page, meta.total, 200, "/list/", "")}
    </section>
    `;
}
__name(buildListBody, "buildListBody");
__name2(buildListBody, "buildListBody");
function VideoCard3(v, origin, i) {
  const duration = formatDuration(v.ln || v.length || v.d);
  const position = i + 1;
  const titleVal = v.t || v.title || "Video";
  const titleEsc = v.t_esc || h(titleVal);
  const thumb = v.si || v.sp || v.single_img || v.splash_img || "";
  const views = v.vw_fmt || v.vw || v.views || "0";
  const uploadVal = v.up || v.added || null;
  const uploadDate = uploadVal || (/* @__PURE__ */ new Date()).toISOString();
  const formattedDate = uploadVal ? new Date(uploadVal).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) : "baru";
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
                    <span style="text-transform: capitalize;">${v.kt || "Video"}</span> \u2022 
                    <time datetime="${uploadDate}" title="Diupload pada ${formattedDate}">${formattedDate}</time>
                </div>
            </div>
        </a>
    </article>
    `;
}
__name(VideoCard3, "VideoCard3");
__name2(VideoCard3, "VideoCard");
async function downloadPage(url, env) {
  const origin = url.origin;
  const id = url.pathname.split("/")[2];
  const lookup = await get(url, env, "/data/lookup_shard.json");
  if (!lookup || !lookup[id]) return notFound3(url);
  const shardKey = lookup[id];
  const detailData = await get(url, env, `/data/detail/${shardKey}.json`);
  if (!detailData) return notFound3(url);
  const v = detailData.find((x) => x.f === id);
  if (!v) return notFound3(url);
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
    } catch (e) {
    }
  }
  if (!relatedHtml) {
    const metaData = await get(url, env, "/data/meta.json");
    const totalPages = Math.ceil((metaData?.total || 26e3) / 200);
    const randomPage = Math.floor(Math.random() * totalPages) + 1;
    const listData = await get(url, env, `/data/list/${randomPage}.json`);
    const files = listData?.result?.files || [];
    const related = files.sort(() => 0.5 - Math.random()).slice(0, 30);
    relatedHtml = related.length > 0 ? buildRelatedHTML(related, origin) : "";
    if (cache && relatedHtml) {
      try {
        const res = new Response(relatedHtml, {
          headers: {
            "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400"
          }
        });
        await cache.put(randomCacheKey, res);
      } catch (e) {
      }
    }
  }
  const body = buildDownloadBody(v, relatedHtml, origin);
  const meta = {
    description: desc(DESCRIPTIONS.downloadMeta, { title: h(v.t) }),
    image: wpImg(v.sp || v.si, 300),
    canonical: `${origin}/dl/${v.f}`,
    robots: "noindex, follow",
    type: "website"
  };
  return render(desc(TITLES.downloadPage, { title: v.t }), body, null, url, meta);
}
__name(downloadPage, "downloadPage");
__name2(downloadPage, "downloadPage");
function notFound3(url) {
  return Response.redirect(url.origin + "/", 301);
}
__name(notFound3, "notFound3");
__name2(notFound3, "notFound");
function buildRelatedHTML(related, origin) {
  return `
    <section style="margin-top: 3rem; text-align: left;" aria-label="Video rekomendasi">
        <h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="8" y1="2" x2="8" y2="22"/><line x1="16" y1="2" x2="16" y2="22"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="2" y1="16" x2="22" y2="16"/></svg> ${TITLES.downloadRecommended}</h2>
        <div class="video-grid">
            ${related.map((rv, i) => VideoCard4(rv, origin, i)).join("")}
        </div>
    </section>
    `;
}
__name(buildRelatedHTML, "buildRelatedHTML");
__name2(buildRelatedHTML, "buildRelatedHTML");
function buildDownloadBody(v, relatedHtml, origin) {
  return `
    <section class="player-section" style="padding:2rem; text-align:center;" aria-label="Download video">
        <h1 class="video-title" style="margin-bottom:1rem;">${h(v.t)}</h1>
        <p style="margin-bottom:1rem; color: hsl(var(--muted-foreground));">${desc(TITLES.downloadH1, { title: `<strong>${h(v.t)}</strong>` })}</p>
        <div id="downloadContainer">
         <center> <script async data-cfasync="false" data-clbaid="" src="//bartererfaxtingling.com/bn.js"><\/script>
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
    <\/script>
    `;
}
__name(buildDownloadBody, "buildDownloadBody");
__name2(buildDownloadBody, "buildDownloadBody");
function VideoCard4(v, origin, i) {
  const duration = formatDuration(v.ln || v.length || v.d);
  const position = i + 1;
  const titleVal = v.t || v.title || "Video";
  const titleEsc = v.t_esc || h(titleVal);
  const thumb = v.si || v.sp || v.single_img || v.splash_img || "";
  const views = v.vw_fmt || v.vw || v.views || "0";
  const uploadVal = v.up || v.added || null;
  const uploadDate = uploadVal || (/* @__PURE__ */ new Date()).toISOString();
  const formattedDate = uploadVal ? new Date(uploadVal).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) : "baru";
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
                    <span style="text-transform: capitalize;">${v.as || "Video"}</span> \u2022 
                    <time datetime="${uploadDate}" title="Diupload pada ${formattedDate}">${formattedDate}</time>
                </div>
            </div>
        </a>
    </article>
    `;
}
__name(VideoCard4, "VideoCard4");
__name2(VideoCard4, "VideoCard");
async function sitemap(url, env) {
  const lookup = await get(url, env, "/data/lookup_shard.json");
  const keys = Object.keys(lookup || {});
  const pages = Math.ceil(keys.length / 500);
  let out = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  for (let i = 1; i <= pages; i++) {
    out += `<sitemap><loc>${url.origin}/post-sitemap${i}.xml</loc></sitemap>`;
  }
  return new Response(out + "</sitemapindex>", {
    headers: { "content-type": "application/xml" }
  });
}
__name(sitemap, "sitemap");
__name2(sitemap, "sitemap");
async function postSitemap(url, env, path) {
  const match2 = path.match(/post-sitemap(\d+)\.xml/);
  if (!match2) return new Response("Not found", { status: 404 });
  const page = parseInt(match2[1], 10);
  const lookup = await get(url, env, "/data/lookup_shard.json");
  const keys = Object.keys(lookup || {});
  const start = (page - 1) * 500;
  const end = start + 500;
  const slice = keys.slice(start, end);
  if (slice.length === 0) return new Response("Not found", { status: 404 });
  const sliceSet = new Set(slice);
  const requiredShards = [...new Set(slice.map((id) => lookup[id]))];
  const videoMap = {};
  const chunkSize = 20;
  for (let i = 0; i < requiredShards.length; i += chunkSize) {
    const chunk = requiredShards.slice(i, i + chunkSize);
    await Promise.all(chunk.map(async (shard) => {
      if (!shard) return;
      const data = await get(url, env, `/data/detail/${shard}.json`);
      if (data && Array.isArray(data)) {
        for (const v of data) {
          if (sliceSet.has(v.f)) {
            videoMap[v.f] = v;
          }
        }
      }
    }));
  }
  let out = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  for (const id of slice) {
    const v = videoMap[id];
    let isoDate = "";
    if (v && v.up) {
      isoDate = v.up.replace(" ", "T") + "+00:00";
    } else {
      isoDate = (/* @__PURE__ */ new Date()).toISOString().split(".")[0] + "+00:00";
    }
    out += `
<url>
<loc>${url.origin}/e/${id}</loc>
<lastmod>${isoDate}</lastmod>
</url>`;
  }
  out += "\n</urlset>";
  return new Response(out, {
    headers: { "content-type": "application/xml" }
  });
}
__name(postSitemap, "postSitemap");
__name2(postSitemap, "postSitemap");
async function videoSitemap(url, env) {
  const lookup = await get(url, env, "/data/lookup_shard.json");
  let out = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;
  let c = 0;
  for (let id in lookup) {
    if (c++ > 1e3) break;
    out += `<url><loc>${url.origin}/e/${id}</loc><video:video><video:title>Video ${id}</video:title></video:video></url>`;
  }
  return new Response(out + "</urlset>", {
    headers: { "content-type": "application/xml" }
  });
}
__name(videoSitemap, "videoSitemap");
__name2(videoSitemap, "videoSitemap");
function robots(req) {
  const url = new URL(req.url);
  return new Response(
    "User-agent: *\nAllow: /\nSitemap: https://" + url.hostname + "/sitemap.xml",
    { headers: { "content-type": "text/plain" } }
  );
}
__name(robots, "robots");
__name2(robots, "robots");
async function onRequest2(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const p = url.pathname;
  if (p === "/" || p === "") return withCache(request, () => welcome(url, env));
  if (p === "/robots.txt") return withCache(request, () => robots(request));
  if (p === "/sitemap.xml") return withCache(request, () => sitemap(url, env));
  if (p.startsWith("/post-sitemap")) return withCache(request, () => postSitemap(url, env, p));
  if (p === "/video-sitemap.xml") return withCache(request, () => videoSitemap(url, env));
  if (/^\/e\/[\w-]+$/.test(p)) return withCache(request, () => detail(url, env));
  if (/^\/dl\/[\w-]+$/.test(p)) return withCache(request, () => downloadPage(url, env));
  if (/^\/f\/.+[^\/]$/.test(p)) return withCache(request, () => search(url, env));
  if (p === "/list/") return withCache(request, () => list(url, env, "1"));
  if (/^\/list\/\d+$/.test(p)) {
    const page = p.split("/")[2];
    return withCache(request, () => list(url, env, page));
  }
  if (p === "/page/1" || p === "/page/") return Response.redirect(url.origin + "/list/", 301);
  if (/^\/page\/\d+$/.test(p)) {
    const page = p.split("/")[2];
    return Response.redirect(url.origin + `/list/${page}`, 301);
  }
  if (/^\/[a-zA-Z0-9_.-]+\/\d+$/.test(p)) {
    if (!p.startsWith("/page/") && !p.startsWith("/list/")) {
      const num = p.split("/")[2];
      if (num === "1") return Response.redirect(url.origin + "/list/", 301);
      return Response.redirect(url.origin + `/list/${num}`, 301);
    }
  }
  const res = await next();
  if (res.ok) {
    return res;
  }
  if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico|css|js|mp4|woff2?)$/i)) {
    return res;
  }
  return Response.redirect(url.origin + "/", 301);
}
__name(onRequest2, "onRequest2");
__name2(onRequest2, "onRequest");
var routes = [
  {
    routePath: "/api/:route*",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/:path*",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest2]
  }
];
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name2(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
var drainBody = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// ../../home/codespace/.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// ../../home/codespace/.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-gyJ7qt/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// ../../home/codespace/.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-gyJ7qt/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.2927736534889349.js.map
