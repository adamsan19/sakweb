  /**
 * Cloudflare Pages Functions - API Router dengan Batch Sharding
 * Handler untuk /api/list, /api/search, dan /api/info
 * 
 * Detail Structure (Batch Sharding):
 * - /data/detail/00.json sampai ff.json (256 files max)
 * - Setiap file berisi array dari multiple video objects
 * - Diakses via MD5 hash dari file_code
 */

function getServerTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function apiResponse(status, msg, result) {
  return {
    status,
    msg,
    result,
    server_time: getServerTime()
  };
}

// In-memory per-worker cache (automatically cleared on redeploy)
const CACHE = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 1 day in ms
const MAX_CACHE_SIZE = 1000; // Prevent unbounded growth
const CACHE_STATS = { hits: 0, misses: 0, size: 0 };

function getCached(key) {
  const rec = CACHE.get(key);
  if (!rec) { CACHE_STATS.misses++; return null; }
  if ((Date.now() - rec.ts) > CACHE_TTL) { CACHE.delete(key); CACHE_STATS.misses++; return null; }
  CACHE_STATS.hits++;
  return rec.value;
}

function setCache(key, value, ttl = CACHE_TTL) {
  try {
    // Simple LRU: delete oldest if at capacity
    if (CACHE.size >= MAX_CACHE_SIZE) {
      const firstKey = CACHE.keys().next().value;
      CACHE.delete(firstKey);
    }
    CACHE.set(key, { ts: Date.now(), value, ttl });
    CACHE_STATS.size = CACHE.size;
  } catch (e) { /* ignore */ }
}

function getCacheStats() {
  const total = CACHE_STATS.hits + CACHE_STATS.misses;
  return {
    hits: CACHE_STATS.hits,
    misses: CACHE_STATS.misses,
    total,
    hitRate: total > 0 ? ((CACHE_STATS.hits / total) * 100).toFixed(2) + '%' : '0%',
    size: CACHE_STATS.size
  };
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  const params = url.searchParams;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // Edge/browser cache control: allow public caching at edge and browsers for 1 day
    // s-maxage used by shared caches (Cloudflare), max-age by browsers
    "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
  };

  try {
    // 1. ENDPOINT: /api/list?page=1&per_page=50
    // Implemented as 100% static: redirect to pre-generated JSON under /data/list/{page}.json
    if (path === "/api/list") {
      const page = parseInt(params.get("page") || "1");
      const per_page = parseInt(params.get("per_page") || "50");

      // Redirect client to the static JSON file so it's served directly by Pages/edge
      const target = `${url.origin}/data/list/${page}.json`;
      return Response.redirect(target, 302);
    }

    // 2. ENDPOINT: /api/search?q=keyword
    if (path === "/api/search") {
      let q = params.get("q") || "";
      q = q.trim().toLowerCase();
      
      if (!q) {
        return new Response(JSON.stringify(apiResponse(200, "OK", [])), { headers });
      }

      // 1. Normalisasi Keyword
      const keywords = q
        .split(/\s+/)
        .map(kw => kw.replace(/[^a-z0-9]/g, ''))
        .filter(kw => kw.length > 0);

      if (keywords.length === 0) {
        return new Response(JSON.stringify(apiResponse(200, "OK", [])), { headers });
      }

      // Check search cache (normalized keywords joined by space)
      const cacheKey = `search:${keywords.join(' ')}`;
      const cachedSearch = getCached(cacheKey);
      if (cachedSearch) {
        return new Response(JSON.stringify(apiResponse(200, "OK", cachedSearch)), { headers });
      }

      try {
        // 2. Tentukan shard mana yang akan dibuka (Batch Sharding)
        // Kita ambil 2 karakter pertama dari kata kunci utama
        const primaryPrefix = keywords[0].substring(0, 2).padEnd(2, 'a'); 
        
        // Helper function untuk fetch dari prefix (support subfolder)
        async function getAllItemsFromPrefix(prefix) {
          const items = [];
          const prefixCacheKey = `prefix:${prefix}`;
          
          // Check if prefix data is cached
          const cachedPrefix = getCached(prefixCacheKey);
          if (cachedPrefix) {
            return cachedPrefix;
          }
          
          // 1. Coba fetch dari file langsung: /data/index/{prefix}.json
          try {
            const res = await fetch(`${url.origin}/data/index/${prefix}.json`);
            if (res.ok) {
              const data = await res.json();
              if (Array.isArray(data)) items.push(...data);
            }
          } catch (e) {
            // File tidak ada, lanjut ke subfolder
          }
          
          // 2. Coba fetch dari subfolder: /data/index/{prefix}/{prefix}xx.json
          try {
            const suffixes = [];
            // a-z
            for (let i = 0; i < 26; i++) {
              suffixes.push(String.fromCharCode(97 + i));
            }
            // __ (underscore)
            suffixes.push('__');
            
            const subfolderPromises = suffixes.map(async (suffix) => {
              try {
                const res = await fetch(`${url.origin}/data/index/${prefix}/${prefix}${suffix}.json`);
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
            // No subfolder, sudah fetch dari file langsung
          }
          
          // Cache prefix data for reuse
          try { setCache(prefixCacheKey, items, 24 * 60 * 60 * 1000); } catch (e) {}
          
          return items;
        }

        let combinedPool = [];

        // 3. Fetch dari primary prefix (dengan subfolder support)
        combinedPool = await getAllItemsFromPrefix(primaryPrefix);

        // 4. Filtering Logic (OR Logic dengan Scoring)
        // Item dapat match dengan minimal 1 keyword, dengan scoring berdasarkan jumlah match
        const scoredResults = combinedPool.map(item => {
          if (!item || !item.t) return { item, score: 0 };
          
          const titleLower = item.t.toLowerCase();
          let matchCount = 0;
          
          keywords.forEach(kw => {
            if (titleLower.includes(kw)) matchCount++;
          });
          
          return { 
            item, 
            score: matchCount,
            hasAll: matchCount === keywords.length // bonus jika dapat semua
          };
        })
        .filter(entry => entry.score > 0) // minimal 1 match (OR logic)
        .sort((a, b) => {
          // Prioritaskan yang match semua keyword dulu
          if (a.hasAll && !b.hasAll) return -1;
          if (!a.hasAll && b.hasAll) return 1;
          // Lalu sort berdasarkan jumlah match
          return b.score - a.score;
        })
        .map(entry => entry.item);

        const filteredResults = scoredResults;

        // 5. Mapping Kembali (Short Keys ke Full Keys)
        // Agar format JSON output tetap konsisten dengan /api/info
        const finalResults = filteredResults.slice(0, 50).map(video => ({
          file_code: video.f,
          title: video.t,
          single_img: video.si,
          splash_img: video.sp,
          length: video.ln,
          views: video.vw,
          uploaded: video.up,
          size: video.sz,
          page: video.pg
        }));

        // Cache search result for 1 day
        try { setCache(cacheKey, finalResults); } catch (e) {}

        return new Response(JSON.stringify(apiResponse(200, "OK", finalResults)), { headers });

      } catch (err) {
        return new Response(JSON.stringify(apiResponse(200, "OK", [])), { headers });
      }
    }

    // 3. ENDPOINT: /api/info?file_code=xxx[&raw=true]
    if (path === "/api/info") {
      const fcode = params.get("file_code") || "";
      const raw = params.get("raw") === "true";
      
      if (!fcode) {
        return new Response(JSON.stringify(apiResponse(400, "file_code dibutuhkan", [])), { status: 400, headers });
      }

      // Get MD5 shard (00-ff)
      const shard = await getMD5Prefix(fcode);
      
      // If raw=true, redirect to static shard file (minimize function requests)
      if (raw) {
        const target = `${url.origin}/data/detail/${shard}.json`;
        return Response.redirect(target, 302);
      }

      // Check info cache (for normal mode)
      const cacheKeyInfo = `info:${fcode}`;
      const cachedInfo = getCached(cacheKeyInfo);
      if (cachedInfo) {
        return new Response(JSON.stringify(apiResponse(200, "OK", cachedInfo)), { headers });
      }
      
      // Check if shard data is cached
      const shardCacheKey = `shard:${shard}`;
      let shardData = getCached(shardCacheKey);
      
      // Fetch batch shard file only if not cached
      if (!shardData) {
        const shardRes = await fetch(`${url.origin}/data/detail/${shard}.json`);
        if (!shardRes.ok) {
          return new Response(JSON.stringify(apiResponse(404, "Video tidak ditemukan", [])), { status: 404, headers });
        }
        
        shardData = await shardRes.json();
        
        // Cache entire shard for 1 day
        try { setCache(shardCacheKey, shardData, 24 * 60 * 60 * 1000); } catch (e) {}
      }
      
      // Find specific video dalam batch shard
      if (!Array.isArray(shardData)) {
        return new Response(JSON.stringify(apiResponse(500, "Invalid shard format", [])), { status: 500, headers });
      }
      
      const video = shardData.find(v => v.f === fcode);
      if (!video) {
        return new Response(JSON.stringify(apiResponse(404, "Video tidak ditemukan", [])), { status: 404, headers });
      }
      
      // Map shortened keys back to full names for API response
      const fullData = {
        filecode: video.f,
        title: video.t,
        deskripsi: video.ds,
        tag: video.tg,
        protected_embed: video.pe,
        protected_dl: video.pd,
        single_img: video.si,
        splash_img: video.sp,
        size: video.sz,
        length: video.ln,
        duration: video.dr,
        views: video.vw,
        uploaded: video.up,
        last_view: video.lv,
        api_source: video.as,
        kategori: video.kt,
        page: video.pg,
        index: video.ix
      };
      
      // Cache info response for 1 day
      try { setCache(cacheKeyInfo, [fullData]); } catch (e) {}

      return new Response(JSON.stringify(apiResponse(200, "OK", [fullData])), { headers });
    }

    // DEBUG: /api/cache-stats
    if (path === "/api/cache-stats") {
      const stats = getCacheStats();
      return new Response(JSON.stringify(apiResponse(200, "OK", stats)), { headers });
    }

    return new Response(JSON.stringify(apiResponse(404, "Endpoint tidak ditemukan", [])), { status: 404, headers });

  } catch (err) {
    return new Response(JSON.stringify(apiResponse(500, "Internal Server Error", [])), { status: 500, headers });
  }
}

async function getMD5Prefix(text) {
  try {
    const msgUint8 = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex.substring(0, 2);
  } catch (e) {
    // Fallback jika crypto.subtle tidak tersedia
    return text.substring(0, 2).toLowerCase().padEnd(2, '0');
  }
}
