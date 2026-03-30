// functions/handlers/sitemap.js
import { get } from "../lib/fetch.js";

export async function sitemap(url, env) {
  const lookup = await get(url, env, "/data/lookup_shard.json");
  const keys = Object.keys(lookup || {});
  const pages = Math.ceil(keys.length / 500);

  let out = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  for (let i = 1; i <= pages; i++) {
    out += `<sitemap><loc>${url.origin}/post-sitemap${i}.xml</loc></sitemap>`;
  }
  return new Response(out + "</sitemapindex>", {
    headers: { "content-type": "application/xml" },
  });
}

export async function postSitemap(url, env, path) {
  const match = path.match(/post-sitemap(\d+)\.xml/);
  if (!match) return new Response("Not found", { status: 404 });
  const page = parseInt(match[1], 10);

  const lookup = await get(url, env, "/data/lookup_shard.json");
  const keys = Object.keys(lookup || {});
  const start = (page - 1) * 500;
  const end = start + 500;
  const slice = keys.slice(start, end);
  if (slice.length === 0) return new Response("Not found", { status: 404 });

  const sliceSet = new Set(slice);
  const requiredShards = [...new Set(slice.map(id => lookup[id]))];
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
      isoDate = new Date().toISOString().split(".")[0] + "+00:00";
    }
    out += `\n<url>\n<loc>${url.origin}/e/${id}</loc>\n<lastmod>${isoDate}</lastmod>\n</url>`;
  }
  out += "\n</urlset>";

  return new Response(out, {
    headers: { "content-type": "application/xml" },
  });
}

export async function videoSitemap(url, env) {
  const lookup = await get(url, env, "/data/lookup_shard.json");
  let out = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;
  let c = 0;
  for (let id in lookup) {
    if (c++ > 1000) break;
    out += `<url><loc>${url.origin}/e/${id}</loc><video:video><video:title>Video ${id}</video:title></video:video></url>`;
  }
  return new Response(out + "</urlset>", {
    headers: { "content-type": "application/xml" },
  });
}

export function robots(req) {
  const url = new URL(req.url);
  return new Response(
    "User-agent: *\nAllow: /\nSitemap: https://" +
      url.hostname +
      "/sitemap.xml",
    { headers: { "content-type": "text/plain" } },
  );
}
