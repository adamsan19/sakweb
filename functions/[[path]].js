// functions/[[path]].js
// Cloudflare Pages Functions format dengan CACHE OPTIMIZED

import { withCache } from './lib/cache.js';
import { detail } from './handlers/detail.js';
import { search } from './handlers/search.js';
import { list } from './handlers/list.js';
import { downloadPage } from './handlers/download.js';
import { sitemap, videoSitemap, postSitemap, robots } from './handlers/sitemap.js';

export async function onRequest(context) {
    const { request, env, next } = context;
    const url = new URL(request.url);
    const p = url.pathname;

    // Route handlers dengan cache
    if (p === "/" || p === "") return withCache(request, () => list(url, env, "1"));
    if (p === "/robots.txt") return withCache(request, () => robots(request));
    if (p === "/sitemap.xml") return withCache(request, () => sitemap(url, env));
    if (p.startsWith("/post-sitemap")) return withCache(request, () => postSitemap(url, env, p));
    if (p === "/video-sitemap.xml") return withCache(request, () => videoSitemap(url, env));
    if (/^\/e\/[\w-]+$/.test(p)) return withCache(request, () => detail(url, env));
    if (/^\/dl\/[\w-]+$/.test(p)) return withCache(request, () => downloadPage(url, env));
    if (/^\/f\/.+[^\/]$/.test(p)) return withCache(request, () => search(url, env));
    if (/^\/[a-zA-Z0-9_.-]+\/\d+$/.test(p)) {
        if (!p.startsWith('/page/')) {
            const num = p.split('/')[2];
            if (num === "1") return Response.redirect(url.origin + '/', 301);
            return Response.redirect(url.origin + `/page/${num}`, 301);
        }
        if (p === '/page/1') return Response.redirect(url.origin + '/', 301);
        return withCache(request, () => list(url, env));
    }

    // Jika tidak ada route yang cocok, coba fetch static assets terlebih dahulu
    const res = await next();
    // Jika static asset ditemukan, kirimkan apa adanya
    if (res.ok) {
        return res;
    }
    // untuk requests ke path yang nampak seperti asset (ekstensi file), biarkan 404 muncul
    // sehingga browser dapat menampilkan gambar atau error, bukan diarahkan ke beranda
    if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico|css|js|mp4|woff2?)$/i)) {
        return res;
    }
    // default: redirect ke homepage
    return Response.redirect(url.origin + '/', 301);
}