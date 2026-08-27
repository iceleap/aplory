# Technical SEO Audit — aplory.dev

Date: 2026-08-27
Scope: 15 URLs in sitemap.xml (homepage, 10 vertical landing pages, 4 legal pages)
Method: local source inspection (repo at /home/novak/Desktop/aplory and its `dist/` build output), `curl` against the live site, `claude-seo run sitemap_discovery.py`, and `claude-seo run render_page.py` (raw-fetch mode; Playwright is not installed in this environment, so rendered-DOM capture was unavailable — raw-HTML inspection was used instead to answer the JS-rendering question, which is sufficient since it reveals the pre-JS content directly).

**Technical SEO Score: 61 / 100**

The site is well-executed on crawlability, URL structure, canonicals, and metadata, and structured data is already in good shape (see `SCHEMA-REPORT.md`, not re-audited here). However, the homepage and all 10 commercial landing pages ship as an **empty `<div id="root"></div>`** with zero pre-rendered content — a pure client-side-rendered (CSR) SPA per route, not the server-rendered/hydrated pages the project brief assumed. That single issue is scored as Critical and caps the overall score, because it puts indexability and content-based ranking signals for the pages that actually drive commercial value (10 of 11 non-legal URLs) at risk.

---

## Critical

### 1. Homepage and all 10 niche landing pages have no content in raw HTML — pure CSR, not SSR/hydration
**Evidence:** Reading the actual files served (both the repo source `index.html`/`majstori.html`/`stomatolozi.html`/etc. and the built `dist/*.html` that Netlify deploys) shows the entire `<body>` is:
```html
<div id="root"></div>
<script type="module" src="/src/entries/main-majstori.jsx"></script>
```
There is no server-rendered/prerendered markup for the hero, pain points, "how it works", FAQ, niches list, or contact form sections — all of it is injected by React at runtime. Confirmed for: `index.html`, `sta-radimo.html`, `stomatolozi.html`, `veterinari.html`, `advokati.html`, `auto-servisi.html`, `saloni.html`, `ecommerce.html`, `klimatizacija.html`, `pvc-stolarija.html`, `majstori.html` — i.e. **11 of the 15 sitemap URLs (all the commercially important ones)**.

By contrast, the 4 legal pages (`politika-privatnosti.html`, `uslovi-koriscenja.html`, `politika-kolacica.html`, `izjava-o-pristupacnosti.html`) are genuinely static: their full text content is present in raw HTML, with only a small `/src/static/page.js` script for chrome/interactivity. `vite.config.js` confirms this split — it builds 15 separate HTML entry points (real per-URL routing, which is good), but only wires React bundles for the marketing pages; there is no prerendering/SSG plugin (no `vite-plugin-prerender`, `vite-plugin-ssg`, or similar) in the build.

**Why this matters:** This directly contradicts the assumption in the audit brief that raw HTML "has full content" — it does not, for any page that isn't a legal document. Google's indexer can generally execute JavaScript, but:
- Rendering is queued/deferred (can take from seconds to days under crawl-budget pressure), delaying indexing of new/updated content.
- Any crawler, tool, or LLM-answer engine (Bing, many AI assistants/answer engines, social-preview scrapers other than the ones honoring the static `og:` tags, SEO auditing tools without a JS renderer) that does not execute JS sees **zero body content** — just an empty shell. Given this is a Serbian SaaS competing for long-tail "AI odgovara na propuštene pozive" style queries, and increasingly for LLM-driven answer engines, this is a meaningful visibility risk beyond classic Googlebot.
- Text extraction for AI/LLM crawlers (many of which do not render JS at all, e.g. GPTBot in most configurations) will retrieve no usable content from these pages — the pages are effectively invisible to that channel.
- Core Web Vitals: LCP is gated by JS bundle download+parse+execute+hydrate rather than by HTML parse, which is strictly worse than SSR for the same visual output (see Medium finding below).

**Recommendation:** Add prerendering or SSG for the 11 CSR routes so each shipped HTML file contains the fully rendered markup (React can still hydrate on top for interactivity — this is exactly the "static + hydration" architecture the brief assumed was already in place). Practical options given the current Vite + multi-entry setup:
- Use `vite-plugin-ssg`, `vite-plugin-prerender-html`, or a small custom prerender script (Playwright/`react-dom/server` at build time) that runs after `vite build` and replaces each `dist/*.html`'s `<div id="root"></div>` with the rendered markup for that page's entry.
- Since every route already maps 1:1 to a static HTML file and a dedicated JS entry (per `vite.config.js`), this is a moderate, well-scoped change, not a full architecture rewrite.
- At minimum, verify with `curl <url> | grep -c "<h1"` (or similar) post-fix that real heading/paragraph text ships in the initial response for every sitemap URL.

---

## High

### 2. No custom security headers beyond Netlify's default HSTS
**Evidence:** `curl -sD - https://aplory.dev/` response headers:
```
strict-transport-security: max-age=31536000
```
No `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, or `Permissions-Policy`. `netlify.toml` only defines `Cache-Control` rules (for `/assets/*`, `/*.woff2`, `/*.html`); there is no `_headers` file and no `[[headers]]` block for security headers.
- HSTS itself is present (good — Netlify sets `max-age=31536000` by default for HTTPS custom domains) but lacks `includeSubDomains` and `preload`.

**Recommendation:** Add a `netlify.toml` `[[headers]]` block (or a `public/_headers` file) applied to `/*`:
```
X-Content-Type-Options = "nosniff"
Referrer-Policy = "strict-origin-when-cross-origin"
Permissions-Policy = "camera=(), microphone=(), geolocation=()"
X-Frame-Options = "DENY"   # or a CSP frame-ancestors directive
Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
```
Because the site embeds third-party widgets (`widgets.leadconnectorhq.com`, `r2.leadsy.ai`, Google Fonts), a `Content-Security-Policy` needs to be scoped carefully (allow those origins) rather than added blindly — budget this as a follow-up task with a testing pass in `report-only` mode first.

---

## Medium

### 3. Core Web Vitals risk: LCP element is not present until JS renders (compounds Critical #1)
**Evidence:** The hero image on niche pages (`src/components/niche/NicheHero.jsx`) is correctly marked `loading="eager"` with explicit `width={900} height={1200}` (good CLS practice) — but since it only exists in the DOM after `/src/entries/main-*.jsx` downloads, parses, and executes React, the LCP candidate cannot paint until that JS round-trip completes. Google Fonts are loaded via a render-blocking `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...">` in `<head>` with `&display=swap` (mitigates FOIT but the external round-trip to `fonts.googleapis.com`/`fonts.gstatic.com` still adds latency before text renders).
**Recommendation:**
- Fixing #1 (prerendering) removes most of this risk by shipping the LCP image/heading in the initial HTML with `fetchpriority="high"` on the hero `<img>`.
- Consider self-hosting the two Google Fonts files (there's already a self-hosted `AdwaitaSans.woff2` in `public/`, so the toolchain for this exists) to eliminate the `fonts.googleapis.com` → `fonts.gstatic.com` two-hop render-blocking chain.
- Add `fetchpriority="high"` to the hero image once it is part of the initial render.

### 4. IndexNow protocol not implemented
**Evidence:** No IndexNow key file found (`https://aplory.dev/indexnow*.txt` → 404), no reference to IndexNow in `netlify.toml`, `scripts/`, or `package.json`, and no build/deploy hook pinging `https://api.indexnow.org`.
**Recommendation:** Given the site is on Netlify with a scripted deploy, add a simple post-deploy step (Netlify build hook or GitHub Action) that submits the sitemap's 15 URLs to `https://api.indexnow.org/indexnow` after each deploy, with a `<key>.txt` file at the site root matching the submitted key. This is low effort and speeds up Bing/Yandex re-crawling of updated pages (useful here since `lastmod` in `sitemap.xml` is bumped on every deploy).

---

## Low

### 5. HSTS header missing `includeSubDomains` and `preload`
Covered together with Finding #2's recommendation — call out separately here because it's cheap to add and meaningfully hardens the domain (`max-age=31536000` alone doesn't protect subdomains like a future `www.aplory.dev` or `app.aplory.dev` from downgrade attacks).

### 6. Duplicate/self-referential `meta name="robots" content="index, follow"` on legal pages only
**Evidence:** `politika-privatnosti.html`, `uslovi-koriscenja.html`, `politika-kolacica.html`, `izjava-o-pristupacnosti.html` explicitly declare `<meta name="robots" content="index, follow">`, while the homepage and all niche pages omit the tag entirely (default behavior is identical: index/follow). Not incorrect, just inconsistent — no functional impact.
**Recommendation:** Cosmetic only; either add the same explicit tag everywhere for consistency or drop it everywhere since it's the default. No priority.

---

## Info / Passing Checks

| Category | Status | Notes |
|---|---|---|
| **Crawlability** | Pass | `robots.txt` is a clean `Allow: /` for all UAs, correctly declares `Sitemap: https://aplory.dev/sitemap.xml`. `sitemap_discovery.py --json` confirms the robots.txt-declared sitemap resolves (HTTP 200), parses as a valid `urlset`, and is `"valid": true` — a genuinely passing result, not a stale/unverified declaration. Common fallback paths (`sitemap_index.xml`, `sitemap-index.xml`, `wp-sitemap.xml`) correctly return 404 (none needed — single sitemap is appropriate at 15 URLs). |
| **Sitemap content** | Pass | 15 URLs, all `<loc>` values are canonical HTTPS root-domain URLs, sensible `priority` weighting (1.0 home, 0.8 niche pages, 0.3 legal), `lastmod` present and current. |
| **Indexability — canonicals** | Pass | Every one of the 15 pages checked has a correct, self-referential, absolute `<link rel="canonical">` matching its own URL exactly (no cross-page duplication, no relative URLs, no protocol/host mismatches). |
| **Indexability — noindex** | Pass | No `noindex` directives found anywhere in source or headers. |
| **Meta descriptions / titles** | Pass | Every page has a unique, descriptive `<title>` and `<meta name="description">` in Serbian, appropriately localized per vertical (e.g. stomatolozi/veterinari/advokati pages each have distinct pain-point copy, not templated duplicates). Titles are reasonable length (homepage title is 43 characters). |
| **Open Graph / Twitter Cards** | Pass | Homepage and niche pages carry full OG tag sets (`og:type`, `og:title`, `og:description`, `og:locale=sr_RS`, `og:url`, `og:image` at 1200×630, `og:image:alt`) plus `twitter:card=summary_large_image`. These are static tags in raw HTML, so social scrapers (which typically don't execute JS) get correct previews despite the CSR body issue in Critical #1. |
| **HTTPS / redirects** | Pass | `http://aplory.dev/` → 301 → `https://aplory.dev/`. `https://www.aplory.dev/` → 301 → `https://aplory.dev/` (single canonical host, no redirect chains, no loops, single-hop redirects only). |
| **URL structure** | Pass | Clean, descriptive, lowercase, hyphenated Serbian-Latin slugs (`auto-servisi.html`, `pvc-stolarija.html`, etc.), no query strings, no session IDs, no unnecessary nesting. `.html` extension is present but consistent and not a ranking concern. |
| **hreflang** | N/A | Single-language (Serbian) site targeting a single market; no hreflang present, none needed. Confirmed no stray/incorrect hreflang tags exist. |
| **Viewport / mobile** | Pass | Every page declares `<meta name="viewport" content="width=device-width, initial-scale=1.0">`. Tailwind-based layout with `flex-wrap`, responsive grid classes (`lg:justify-self-end`, `aspect-[3/4]`) observed in components — consistent with a mobile-first responsive build. Could not run a live touch-target/tap-size audit without a rendered DOM (Playwright unavailable in this environment). |
| **Structured Data** | Pass (out of scope for deep audit per brief) | `ProfessionalService` JSON-LD confirmed present and valid on homepage (`structured_data.blocks[0].valid: true`, types: Offer, OfferCatalog, OpeningHoursSpecification, ProfessionalService, Service) plus a `Service` schema block per niche page (e.g. `majstori.html`) referencing the same provider. Full validation deferred to `SCHEMA-REPORT.md` per instructions. |
| **JS rendering — legal pages** | Pass | The 4 legal pages are fully static; real text content is present in the raw HTML with no JS dependency for content (a small `/src/static/page.js` handles chrome only). |
| **Caching headers** | Pass | `netlify.toml` correctly gives fingerprinted `/assets/*` files an immutable 1-year cache, `.woff2` a 1-week cache, and forces `max-age=0, must-revalidate` on all `.html` so deploys propagate immediately — a sound cache strategy. |
| **CDN / hosting** | Info | Served via Netlify Edge (CDN hit confirmed via `cache-status: "Netlify Edge"; hit`), HTTP/2 enabled. |

---

## Summary of Priorities

1. **Critical:** Add prerendering/SSG so the 11 CSR routes (homepage + 10 niche pages) ship real content in initial HTML — currently 100% of body content depends on JS execution.
2. **High:** Add missing security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/CSP, `Permissions-Policy`) via `netlify.toml`/`_headers`; strengthen HSTS with `includeSubDomains; preload`.
3. **Medium:** Once prerendering ships, add `fetchpriority="high"` to the LCP hero image and consider self-hosting Google Fonts to cut a render-blocking round trip.
4. **Medium:** Implement IndexNow (key file + post-deploy submission of the 15 sitemap URLs) for faster Bing/Yandex re-crawl.
5. **Low:** Cosmetic consistency of the `meta name="robots"` tag across page types.
