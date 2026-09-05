# Technical SEO Audit — aplory.dev

Date: 2026-09-05
Scope: 15 URLs in `sitemap.xml` (homepage, 10 vertical/niche landing pages, `sta-radimo.html`, 4 legal pages).
Method: `curl` against the **live site** (source of truth), `claude-seo run sitemap_discovery.py https://aplory.dev/ --json`, `claude-seo run render_page.py <url> --mode auto --json`, and local source inspection at `/home/novak/Desktop/aplory/` (root-level `*.html` templates, `netlify.toml`, `public/robots.txt`, `public/sitemap.xml`, `vite.ssr.config.js`, `scripts/prerender.mjs`, `package.json`).

Note: the local `dist/` build output in the repo is a **stale local build** (asset hashes, e.g. `base-CgEw-WAa.css`, don't match the live site's `base-RbUnmfLW.css` and return 404 when requested live). It was not used as evidence for anything content-sensitive below — all content/markup claims were re-verified directly against `https://aplory.dev/` with raw `curl` (no JS execution).

**Technical SEO Score: 84 / 100**

The site is a static Vite build on Netlify with clean per-route HTML files, solid crawl directives, a valid sitemap, and — critically — genuine build-time prerendering: every route ships full real markup in `<div id="root">`, not an empty SPA shell. The main deductions are (1) `Content-Security-Policy` shipping as **Report-Only only**, with no enforced policy and no `report-to`/`report-uri` collection endpoint, and (2) an unresolved duplicate-URL surface where extensionless paths (`/stomatolozi`) 200 with identical content to the canonical `.html` path instead of redirecting to it.

---

## Resolved / Info

### 0. [RESOLVED] Prerendering now bakes full content into every route — no CSR/empty-shell risk
**Evidence:** `curl -s https://aplory.dev/` (raw fetch, no JS) returns a `<div id="root">` containing the complete rendered homepage: header/nav, hero `<h1 id="hero-title">Kad vas neko traži, APLORY odgovara. Automatski.</h1>`, problem section, "how it works" mock conversation, the 10-vertical "za koga" grid, FAQ `<dl>`, and the contact form markup — all present in the initial HTTP response. Spot-checked identically on verticals:
```
stomatolozi.html → <h1 id="hero-title">Kad pacijent zove, APLORY zakazuje termin. Dok ste u ordinaciji.</h1>
advokati.html    → <h1 id="hero-title">Klijent zove usred ročišta. APLORY odgovara porukom umesto vas.</h1>
sta-radimo.html  → <h1 id="resenje-title">Hvatamo svaki upit i odgovaramo umesto vas.</h1>
```
`package.json`'s build script — `"build": "vite build && vite build --config vite.ssr.config.js && node scripts/prerender.mjs"` — confirms this is a deliberate SSR-render-then-inline prerender step (`vite.ssr.config.js` builds `src/entry-server.jsx`, then `scripts/prerender.mjs` writes the rendered markup into each `dist/*.html`), not an accident of caching.

The 4 legal pages (`politika-privatnosti.html`, `uslovi-koriscenja.html`, `politika-kolacica.html`, `izjava-o-pristupacnosti.html`) are separately confirmed fully static as well (`curl -s .../politika-privatnosti.html | grep -c "Pravni dokument"` → `1`), served without a `#root`/React mount at all — just markup plus a tiny `page-*.js` for header interactivity.

**Why this matters (historical context):** An earlier pass of this audit (2026-08-27, superseded by this report) flagged this as the #1 Critical issue based on an older build. That issue is now fixed and should be considered closed — it was the dominant score-capping factor and its resolution is the main reason the score above is materially higher than the prior report's 61/100. No further action needed; just keep `scripts/prerender.mjs` wired into the Netlify build command (`npm run build`, per `netlify.toml`) so it doesn't silently regress on a future refactor.

**Recommendation:** None required. Optionally add a CI/pre-deploy smoke check (`curl <url> | grep -c "<h1"` for every sitemap URL) so a future change that breaks the prerender step fails the build instead of shipping an empty shell unnoticed.

---

## High

### 1. Content-Security-Policy ships Report-Only, with no report collector — currently provides zero enforced protection
**Evidence:** `netlify.toml` and live response headers (`curl -sD - https://aplory.dev/`) both show:
```
content-security-policy-report-only: default-src 'self'; script-src 'self' 'unsafe-inline' https://r2.leadsy.ai https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com https://*.msgsndr.com https://*.gohighlevel.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://*.leadconnectorhq.com https://*.msgsndr.com wss://*.leadconnectorhq.com https://r2.leadsy.ai; frame-src https://*.leadconnectorhq.com; base-uri 'self'; form-action 'self'; object-src 'none'
```
There is no enforced `Content-Security-Policy` header at all — only `-Report-Only`. Per the `netlify.toml` comment, this is intentional ("ships as Report-Only first ... so a real deploy can confirm the LeadConnector widget's full resource list before switching to enforced"), which is a sound rollout strategy in principle. But as shipped, the policy also has no `report-uri`/`report-to` directive, so violations are only visible in each individual visitor's own browser DevTools console — nobody on the team ever sees them, meaning there is no practical way to know when it's safe to flip to enforced. In its current state the CSP is inert documentation, not a working control, and `'unsafe-inline'` on `script-src`/`style-src` (needed today for the inline chat-widget loader and inline styles) will remain a real gap even once enforced.

**Why this matters:** CSP-Report-Only doesn't block anything — XSS/injection risk mitigation this header is meant to provide isn't active. This isn't a ranking-factor issue directly, but Google's security/UX signals (and increasingly, browser trust indicators) reward sites with real hardening, and an unmonitored Report-Only policy tends to never graduate to enforced (nobody notices when it's safe).
**Recommendation:**
- Add a `report-to`/`report-uri` endpoint (Netlify Function, or a third-party collector like Sentry's/Report URI's free tier) so violations are actually visible before flipping the switch.
- Once a deploy cycle passes with no unexpected violations logged, promote `Content-Security-Policy-Report-Only` to an enforced `Content-Security-Policy` header.
- Plan to remove `'unsafe-inline'` from `script-src` by moving the inline chat-widget-loader script (`index.html`'s `loadChatWidget` IIFE) to an external file or a per-deploy nonce/hash, since `'unsafe-inline'` defeats most of CSP's script-injection protection regardless of the rest of the policy.

---

## Medium

### 2. Extensionless URLs 200 with identical content instead of redirecting to the canonical `.html` form
**Evidence:** Netlify's default "pretty URLs" behavior is active on this site:
```
curl -sI https://aplory.dev/stomatolozi.html   → 200
curl -sI https://aplory.dev/stomatolozi        → 200 (same content-length, same md5 body)
curl -sI https://aplory.dev/Stomatolozi.html   → 301 → /stomatolozi   (not to /stomatolozi.html)
curl -sI https://aplory.dev/stomatolozi.html/  → 301 → /stomatolozi   (not to /stomatolozi.html)
```
So there are effectively **two live, indexable-by-default URLs per page** (`/stomatolozi.html` and `/stomatolozi`), both returning 200 with byte-identical content, and Netlify's own normalization redirects (trailing slash, case) point to the extensionless form — which *contradicts* the canonical tag, which points to the `.html` form (`<link rel="canonical" href="https://aplory.dev/stomatolozi.html" />`, confirmed present on all 10 vertical pages plus `sta-radimo.html`). This is a self-inconsistent signal: Netlify's redirect layer says "the extensionless URL is canonical," the HTML says "the `.html` URL is canonical."
A crawl to a nonexistent path (`/this-page-does-not-exist`) does correctly return `404` (no soft-404 catch-all), so this is specific to the pretty-URL rewrite, not a broader routing problem.

**Why this matters:** The `<link rel="canonical">` tag is a strong but not absolute signal; Google can and sometimes does choose to index the non-canonical URL anyway, especially when there's an internal redirect actively pointing the other way. At minimum this creates two crawlable URLs per page competing for the same content, split link equity if either form gets external links, and confusing data in Search Console/analytics (two URL forms for one page).
**Recommendation:** Add an explicit Netlify redirect (in `netlify.toml` or a `public/_redirects` file) forcing the extensionless form to 301 to the `.html` form for every route, e.g.:
```
/stomatolozi   /stomatolozi.html   301
```
(or, if the extensionless URL is actually preferred long-term, flip the canonical tags and the sitemap to match instead — but pick one direction and make the redirect and the canonical agree). Alternatively, disable Netlify's pretty-URL rewriting for this site if it's not otherwise needed (there's no evidence the app or its internal links rely on the extensionless form — all internal `<a href>`s observed in the rendered markup use the `.html` form).

---

## Low

### 3. No IndexNow key/endpoint configured
**Evidence:** No IndexNow key file at the site root (`/<key>.txt`), no `IndexNow-Key` reference in `robots.txt`, and no `public/*.txt` key file matching the IndexNow convention (checked `public/` and `dist/` contents; only `llms.txt`, `robots.txt`, `sitemap.xml` are present as root text files). robots.txt/sitemap themselves are fine — this is purely about the separate IndexNow push protocol.
**Why this matters:** IndexNow lets you push new/changed URLs to Bing, Yandex, and (via Bing's shared index) other participating engines within minutes instead of waiting for their next crawl. For a small, newer site like this, with periodic content edits (the sitemap already carries per-page `lastmod` dates that are updated), the cost of adding this is very low relative to the faster-indexing benefit, particularly for Bing/Copilot-sourced discovery.
**Recommendation:** Generate an IndexNow key, publish `https://aplory.dev/<key>.txt` (static file, trivial to add under `public/`), and add a small post-deploy step (Netlify build hook or GitHub Action) that pings `https://api.indexnow.org/indexnow` with the 15 sitemap URLs whenever content changes. Not urgent, but cheap to implement.

### 4. Google Fonts stylesheet is a synchronous render-blocking request with no fallback-metrics matching
**Evidence:** `index.html` (and all page templates) load fonts via:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```
`preconnect` is correctly used (good), and `display=swap` avoids invisible text, but the stylesheet itself is still a blocking `<link rel="stylesheet">` in `<head>`, and there's no evidence of `size-adjust`/fallback-font-metric matching for Fraunces (a serif display face with distinctive metrics, used in `<h1>`/`<h2>` at large sizes) or `Inter`. A swap from a system fallback to Fraunces/Inter after font load, at hero-heading and body-copy sizes, is a common CLS contributor.
**Why this matters:** This is a plausible CLS source at the hero (`<h1 id="hero-title">`, large `.h1`/`.h2` display type) — can't be measured precisely without field/lab CWV data (see Core Web Vitals section below), but it's a known pattern worth checking once real CWV data is available.
**Recommendation:** If lab/field CLS data (once available) shows a shift near text load, add `size-adjust`/`ascent-override`/`descent-override` `@font-face` fallback declarations (or a tool like Fontaine/Capsize) to match the fallback font's box metrics to Fraunces/Inter, minimizing the reflow on swap.

### 5. No `Cross-Origin-Opener-Policy` / `Cross-Origin-Resource-Policy` headers
**Evidence:** Full live header set on `https://aplory.dev/`: `strict-transport-security`, `x-content-type-options`, `x-frame-options`, `referrer-policy`, `permissions-policy`, `content-security-policy-report-only` — no `Cross-Origin-Opener-Policy` or `Cross-Origin-Resource-Policy`.
**Why this matters:** Minor additional isolation hardening; low risk given the site has no authenticated sessions or sensitive user data, but cheap to add alongside the other security headers already in `netlify.toml`.
**Recommendation:** Add `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Resource-Policy: same-site` to the existing `[[headers]]` block for `/*` in `netlify.toml`, testing that the LeadConnector chat widget (loaded cross-origin) still functions correctly afterward.

---

## Passing Checks (no action needed)

- **Crawlability:** `robots.txt` (`User-agent: *` / `Allow: /` / `Sitemap:` declaration) validated live and via `claude-seo run sitemap_discovery.py https://aplory.dev/ --json` — sitemap is `found`, `kind: urlset`, `valid: true`, declared correctly via robots.txt (not a stale/guessed fallback). All 14 documented URLs (+1 for the home `/` itself = the 15 total sitemap entries) resolve 200 live. `404.html` correctly serves `<meta name="robots" content="noindex, follow" />` on real 404s (verified a nonexistent path returns HTTP 404, not a soft-404).
- **Indexability:** Every sitemap page carries a unique, self-referencing, absolute canonical (`<link rel="canonical" href="https://aplory.dev/...">`); no `noindex` on any indexable page; unique `<title>` (19–75 chars) and `<meta name="description">` (85–182 chars, all within a reasonable display range) per page — checked across all 15 templates, no duplicates or truncation risk found.
- **Security:** HSTS present with `includeSubDomains; preload` (best-practice form, not just the Netlify default `max-age`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` locking down `geolocation`/`camera`/`microphone`/`payment` all confirmed live via `curl -sD -`. HTTPS is enforced site-wide (`http://` and bare `www.` both 301 to `https://aplory.dev/`, single-hop, no redirect chains observed anywhere tested).
- **URL structure:** Clean, descriptive, all-lowercase, hyphen-free single-word or ASCII-transliterated Serbian slugs (`stomatolozi.html`, `pvc-stolarija.html`, etc.); flat (no unnecessary subdirectories); `www` → apex normalized with a single 301 (see Medium #2 for the one real gap, extensionless duplication).
- **Mobile:** Correct `<meta name="viewport" content="width=device-width, initial-scale=1.0">` present on all 15 templates, no `maximum-scale`/`user-scalable=no` restricting pinch-zoom (accessibility-friendly). Layout uses Tailwind responsive utility classes throughout (`sm:`/`md:`/`lg:` breakpoints observed in the rendered markup); nav collapses to a mobile menu below `md:`. Interactive touch targets sampled (mobile nav toggle, footer icon buttons) use `size-10`/`size-9` (40/36px) — close to but slightly under the 44×44px recommended minimum; not flagged as its own finding since it's a minor gap, but worth bumping to 44px on the next design pass.
- **Structured Data (presence only, not deep-validated per audit scope):** JSON-LD present on the homepage (`ProfessionalService`, `OpeningHoursSpecification`, `OfferCatalog`/`Offer`/`Service`, `FAQPage`) and on all 10 vertical pages (`Service`, `ProfessionalService`, `FAQPage`) — confirmed via `curl` + `<script type="application/ld+json">` block extraction. Legal pages and `sta-radimo.html` correctly carry lighter or no schema. Full markup validation (required-property checks, Rich Results eligibility) is out of scope here — see the dedicated schema audit.
- **JavaScript Rendering:** See Resolved #0 above — genuinely prerendered, not CSR-dependent, for every sitemap URL.
- **IndexNow:** See Low #3 — not implemented, flagged as a Low-priority opportunity rather than a defect.

---

## Core Web Vitals — Limitation Notice

**No CrUX/PageSpeed Insights API key is configured in this environment**, so this audit could not pull field data (real Chrome User Experience Report values) or a Lighthouse-equivalent lab score for LCP/INP/CLS. Findings above (font-swap CLS risk, render-blocking stylesheet) are **source-inspection-based hypotheses**, not measured values, and should be treated as things to verify once PSI/CrUX access is available, not confirmed regressions. Given the page is lightweight (prerendered HTML, no heavy above-the-fold images beyond an SVG hero graphic and page-specific `width`/`height`-attributed niche photos with explicit dimensions — checked, all `<img>` tags across all 15 templates carry both `width` and `height` attributes, which is good CLS hygiene), there's no structural reason to expect Poor-range LCP/CLS, but this should be confirmed with real PSI/CrUX data before being treated as settled.

**Recommendation:** Configure a PageSpeed Insights API key (or run Lighthouse in CI) for a follow-up pass with real LCP/INP/CLS numbers once traffic volume is sufficient for CrUX field data to populate (CrUX requires a minimum traffic threshold per origin/page).
