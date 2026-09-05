# Performance & Core Web Vitals Audit — aplory.dev

Date: 2026-09-05 (supersedes the 2026-08-27 version of this file — re-measured live after confirming the site now prerenders full HTML per route)
Scope: homepage (`/`) and one niche landing page (`/stomatolozi.html`), live production site on Netlify. Build: Vite + React 19, static prerendering via `scripts/prerender.mjs` / `vite.ssr.config.js` (SSR entry `src/entry-server.jsx`), CSR hydration on top for interactivity.

**Method / data source:** No Google API key is configured in this environment (PSI API and CrUX API both require it), so **all numbers below are Lighthouse 13.4.1 lab data**, not 28th-day CrUX field percentiles — treat as directional single-run lab measurements, not Google's actual 75th-percentile pass/fail. No system Chrome is installed; a Chromium 131 binary bundled in `~/.cache/ms-playwright/chromium-1148/chrome-linux/chrome` was used as `CHROME_PATH` for `npx lighthouse` against the **live** `https://aplory.dev/` and `https://aplory.dev/stomatolozi.html`, mobile emulation, DevTools throttling (`--throttling-method=devtools`, more internally consistent between the headline metric and its Insight-audit breakdown than the default `simulate` method — a `simulate` run was also done and is noted below where it diverges). TTFB was cross-checked independently with `curl -w` timing against the live Netlify edge. Raw HTML was also fetched directly with `curl` (bypassing any browser JS) to confirm what the server actually sends.

**Correction to the prior version of this file:** the 2026-08-27 draft was written assuming (or was at risk of being read as assuming) a client-rendered SPA shell that blocks LCP on JS/hydration. That is **not** the current architecture. `curl https://aplory.dev/` returns complete, final markup in the initial response — the hero `<h1>`, all copy, the contact form, and footer are already in `<div id="root">` before any JavaScript runs (verified: `grep -o "Kad vas neko" curl-output.html` matches directly in the raw server response, and `content-length` of the raw HTML is 42,850 bytes on `/`, not an empty shell). React hydrates this markup client-side afterward, but **first paint is not gated on JS execution** — it's gated on render-blocking CSS/font requests (see High #1 below). This changes the diagnosis from "SPA hydration delay" to "render-blocking resources delaying paint of already-present content," which is a narrower, cheaper problem to fix.

**Note on INP:** Lighthouse is a lab tool and cannot measure INP (it requires real interaction sampling over a session); it reports **Total Blocking Time (TBT)** as a lab proxy for main-thread responsiveness. No CrUX field INP is available (no API key). TBT was low on both pages tested (see table) — this audit did not measure lab or field INP directly, and the site's chat widget (see High #2) is the most likely source of any field INP divergence from this lab result, since it injects and executes a meaningful chunk of third-party JS on the main thread when triggered.

## Performance Overview

| Page | Lighthouse Performance Score | LCP | LCP element | CLS | TBT (INP proxy) | FCP | Speed Index | Total transfer weight |
|---|---|---|---|---|---|---|---|---|
| `/` (homepage) | 94/100 | **1.6 s** | `<h1 id="hero-title">` (hero headline text) | 0.029 | 30 ms | 1.6 s | 5.9 s | 566 KB (37 requests) |
| `/stomatolozi.html` | 93/100 | **1.7 s** | `<h1 id="hero-title">` (hero headline text) | 0.067 | 20 ms | 1.7 s | 5.7 s | 658 KB (40 requests) |

**Core Web Vitals status (lab, mobile, DevTools throttling, both pages):**
- **LCP: PASS** ("Good" ≤2.5s) — both pages land at 1.6–1.7s. LCP element on both pages is the **hero `<h1>` text**, which is present in the server-rendered HTML — not an image, and not blocked on hydration.
- **CLS: PASS** ("Good" ≤0.1) — 0.029–0.067, comfortably within budget.
- **TBT/INP proxy: PASS** — 20–30ms TBT is very low under lab conditions with the chat widget in its default (not-yet-triggered) state.

**A caveat on lab variance:** the same homepage run under Lighthouse's default `simulate` throttling method reported LCP as 3.7s (stomatolozi: 4.1s) with the LCP breakdown showing implausibly small TTFB+render-delay subtotals relative to the headline number — a known inconsistency in how `simulate` mode's network/CPU multipliers interact with the trace-based Insight breakdown. The `devtools`-throttled numbers above (1.6–1.7s), where headline LCP and its breakdown add up consistently (TTFB + element render delay = total), are treated as the more trustworthy lab estimate here, but this spread (1.6s vs 3.7s for the same page) is a reminder that **lab data is not field data** — real users on real networks/devices are the only way to know the true 75th-percentile CWV pass/fail, and that requires CrUX, not Lighthouse.

**Overall Performance Score: ~94/100** (lab average, not a Google-reported number).

---

## Critical

None. No Core Web Vital fails its "Good" threshold on either page tested in this lab run.

---

## High

### 1. Render-blocking Google Fonts stylesheet + local CSS delay first paint by ~1.4s, even though content is already server-rendered
**Evidence:** `lcp-breakdown-insight` (DevTools-throttled run) shows LCP on both pages splitting almost entirely into: **Time to First Byte ~176-278ms** + **Element Render Delay ~1,380-1,437ms** (there is no `resourceLoadDelay`/`resourceLoadTime` subpart because the LCP element is text, not an image needing its own fetch). The `render-blocking-insight` audit identifies the cause: `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces...&family=Inter...&display=swap">` costs an estimated **1,413-1,415ms** of blocking time on its own, plus the local `base-*.css` bundle (~8.9KB, 158ms) and a small route-specific `Faq-*.css` chunk. Confirmed in the raw served HTML (`dist/index.html` lines 43-47, 165-166): the Google Fonts CSS is a plain synchronous `<link rel="stylesheet">` in `<head>` (no `preload`/`media=print` swap trick), and `base-*.css`/`Faq-*.css` are also plain blocking stylesheet links, not inlined-critical-CSS.
**Why it matters:** The hero headline is fully present in the HTML the server sends (confirmed via `curl`), so it *could* paint essentially at TTFB (~200ms). Instead the browser is held at a blank/partial paint for ~1.4s while it fetches and parses render-blocking CSS before it will paint anything, including text that needs no external resource at all. This is now the single largest, most directly actionable lever on LCP/FCP for both pages tested (and, per the shared `<head>`, effectively every page on the site).
**Recommendation:**
  - Self-host the two web fonts (Fraunces, Inter) as `woff2` via the Vite asset pipeline instead of `fonts.googleapis.com`, and reference them with `@font-face` in the bundled CSS — this removes one render-blocking round trip (DNS+TLS+request to `fonts.googleapis.com`, then a second request to `fonts.gstatic.com`) entirely.
  - Whatever font-loading approach is kept, add `<link rel="preload" as="style">` (or the self-hosted `@font-face` equivalent) so font *files* start downloading in parallel with HTML parsing rather than after the CSSOM blocks on the stylesheet request.
  - Inline critical above-the-fold CSS (hero section + header) directly in `<head>` so first paint of the hero H1 doesn't wait on any external stylesheet at all; defer the remainder of `base-*.css` with the standard `media="print" onload="this.media='all'"` pattern or a `<link rel="preload" as="style" onload="...">` swap.
  - Expected impact: recovering most of the ~1.4s element-render-delay would put LCP in the ~0.3-0.5s range on both pages tested — a large improvement even though both pages already pass the 2.5s "Good" threshold today, and meaningful headroom against slower real-world networks that CrUX field data would otherwise measure at the 75th percentile.

### 2. Third-party GoHighLevel/LeadConnector chat widget is large (~188KB, 9+ requests) and fires a burst of main-thread work on the visitor's first interaction
**Evidence:** `third-parties-insight` attributes **188.6KB transfer / ~87-92ms main-thread time** to `leadconnectorhq.com` alone (plus 15.4KB to `cloudfront.net` for a separate LeadConnector funnel-tracking script, and 1.3KB to `leadsy.ai`). `network-requests` on the stomatolozi page shows the actual chain once triggered: `loader.js` → `chat-widget.esm.js` → five separate `p-*.entry.js`/`p-*.js` chunks (52.2KB + 25.5KB + 15.8KB + 8.3KB + 3.2KB) → plus `intl-tel-input.min.js` (11.7KB) and, notably, **`libphonenumber-js.min.js` at 44.1KB** — a full phone-number-validation library loaded just for the widget's phone field. `cache-insight` shows six of these LeadConnector assets carry only a **4-hour cache lifetime** (`14,400,000ms`), so any returning visitor within a session but past that window re-downloads the full chain.
  On the positive side: `index.html` (lines 191-219) shows this is **already deferred** — the widget script is injected only on the visitor's first `scroll`/`mousemove`/`touchstart`/`keydown`, or after a 6-second idle fallback, not on initial page load. This means it is correctly *not* part of the render-blocking or LCP path today (the 2026-08-27 draft of this file, written before this deferral existed or before it was verified, had flagged the widget as the top render-blocking/LCP-delaying issue — that finding is now resolved/superseded).
**Why it matters:** Because it's deferred to the first interaction rather than idle-loaded in the background, the ~188KB+ download and ~90ms+ of main-thread script execution now happens **concurrently with whatever the user just started doing** (e.g., the moment they begin scrolling to read content, or start typing). That's exactly the kind of burst that can show up as a slow/late Interaction to Next Paint in field data for the interaction that triggered it, even though it never appears in a Lighthouse lab trace that doesn't simulate a real click/scroll deep enough into the page to trigger widget load, or types into the phone field before the polyfill libraries finish loading.
**Recommendation:**
  - Change the trigger from `scroll`/`mousemove`/`touchstart`/`keydown` (which fires on the *first* incidental scroll, likely within the first second or two of most visits) to a lazier signal — e.g., `requestIdleCallback` with a longer fallback (15-20s instead of 6s), or only load on scroll depth past the hero section — so the burst doesn't compete with the user's initial reading/scrolling interaction.
  - Ask whether `intl-tel-input` + `libphonenumber-js` (55.8KB combined) are actually required — if the contact form's phone field doesn't need live international-format validation, a simpler pattern-based check would remove this from the widget's critical path entirely.
  - The 4-hour cache TTL is third-party-controlled and not fixable from this side; it reinforces keeping the trigger as lazy as reasonably possible so the cost is paid rarely rather than aggressively.

---

## Medium

### 3. Niche hero photos are shipped as full-resolution JPEGs 3-8x larger than their display size, in a legacy format
**Evidence:** Every niche landing page hero photo (`dist/niche/*.jpg`) is displayed at the same fixed size (`width="900" height="1200"`, rendered at up to ~648×971 CSS px in a `max-w-[420px]` column) but the source files are native photo resolutions far beyond that:

| File | Native resolution | File size | Oversize factor (vs. 900×1200 markup, worse vs. actual ~650×970 CSS size) |
|---|---|---|---|
| `auto-servisi.jpg` | 2940×1960 | 452 KB | ~3.3x linear / ~10.7x area |
| `saloni.jpg` | 2400×1532 | 364 KB | ~2.7x linear |
| `majstori.jpg` | 1200×1803 | 312 KB | ~1.3x linear, but still full JPEG at near-2x pixel density |
| `ecommerce.jpg` | 1200×1800 | 212 KB | similar |
| `veterinari.jpg` | 1200×1200 | 132 KB | similar |
| `stomatolozi.jpg` | 1200×1800 | 96 KB | flagged directly by Lighthouse (see below) |
| `pvc-stolarija.jpg`, `klimatizacija.jpg`, `advokati.jpg` | — | 96 KB / 68 KB / 48 KB | smaller but same pattern |

  `image-delivery-insight` on the stomatolozi page confirms this quantitatively: `/niche/stomatolozi.jpg` is **95.75KB with 64.4KB (67%) identified as wasted bytes** — "This image file is larger than it needs to be (1200×1602) for its displayed dimensions (648×971)." None of the nine files are WebP or AVIF; all are baseline/progressive JPEG. All are marked `loading="eager"` (correct, since each is above the fold on its own page), so they compete for early network priority against the render-blocking CSS/font requests in Finding 1 rather than being deferred.
**Why it matters:** This is not currently the LCP element on any page tested (the H1 text is), so it doesn't fail a Core Web Vital directly today. But `auto-servisi.html` shipping a 452KB single image is a meaningful mobile-data cost, hurts Speed Index (which does lag LCP significantly on both pages tested — 5.7-5.9s vs. 1.6-1.7s LCP), and adds avoidable contention on the critical network path during the render-blocking window identified in Finding 1.
**Recommendation:** Re-export all nine niche hero photos at a single appropriately-sized WebP or AVIF (e.g., 900×1200 at 2x for retina = ~900×1200 is already close to right if properly compressed; the real fix is format + compression quality, not just resizing) via the Vite asset pipeline or an `<picture>`/`srcset` responsive set. A same-quality WebP re-encode alone typically saves 60-80% versus JPEG at this content type; combined with correct sizing, expect `auto-servisi.jpg` to drop from 452KB to well under 80KB, and the smaller files proportionally.

### 4. Homepage footer logo (`logo-mark.webp`) is 2x oversized for its display size
**Evidence:** `image-delivery-insight` flags `https://aplory.dev/logo-mark.webp` (in `section#kontakt`, displayed at 112×24 CSS px) as **12.6KB total with 11.3KB estimated as wasted** — split between "increasing compression could improve size" (7.2KB) and "file is larger than needed (400×81 native vs. 196×40 displayed)" (9.5KB reported, some overlap between the two reasons is expected).
**Why it matters:** Already WebP (good), so this is purely a sizing/compression tuning issue, not a format issue. Below-the-fold, so no CWV impact, but a quick near-zero-effort win.
**Recommendation:** Re-export at 2x the actual displayed size (≈392×80) with a higher compression factor; expect the file to drop from ~12.6KB to roughly 1-3KB.

### 5. Google Fonts served from an external origin instead of self-hosted, adding an extra cross-origin hop on top of Finding 1
**Evidence:** `total-byte-weight` shows 4 separate `fonts.gstatic.com` woff2 files totaling **~202KB** (two Inter weights at 85.4KB + 49.0KB, two Fraunces optical-size cuts at 34.8KB + 31.9KB), fetched only after the `fonts.googleapis.com` CSS response resolves (visible in `network-dependency-tree-insight`'s request chain: `aplory.dev/` → `fonts.googleapis.com/css2?...` → 4× `fonts.gstatic.com/...woff2`, each already ~450ms deep into the waterfall in this DevTools-throttled run). `network-rtt` separately shows `fonts.googleapis.com` costing 30ms+ in additional round-trip time versus first-party origins.
**Why it matters:** This is a secondary contributor to the same render-blocking chain as Finding 1 — every additional cross-origin hop (DNS, TLS handshake, request) before the fonts are usable adds latency that self-hosting removes entirely.
**Recommendation:** Same fix as Finding 1 — self-host the four woff2 files under `aplory.dev`'s own origin (already the correct approach for the Adwaita Sans font already present as a local file in `dist/`), removing the `fonts.googleapis.com`/`fonts.gstatic.com` dependency chain outright.

---

## Low

### 6. Speed Index and Time to Interactive trail LCP well behind on both pages
**Evidence:** Homepage: Speed Index 5.9s, Interactive 3.1s, vs. LCP 1.6s. Stomatolozi: Speed Index 5.7s, Interactive 3.4s, vs. LCP 1.7s.
**Why it matters:** The hero paints fast (LCP), but visual completeness of the rest of the page and full interactivity trail well behind — consistent with the site's scroll-reveal animation pattern (`data-reveal="true"` attributes visible throughout the served HTML) progressively fading in sections as they enter the viewport, plus the oversized niche images (Finding 3) and font/CSS chain (Finding 1) still resolving in the background. This does not fail any CWV threshold today (Speed Index and TTI are not scored Core Web Vitals), but it does mean the page *feels* like it's still loading well after its official LCP timestamp, and leaves limited margin before a heavier future page could push CLS or TBT into "Needs Improvement" territory as more content/sections are added.
**Recommendation:** Not urgent on its own. Fixing Finding 1 (render-blocking CSS/fonts) and Finding 3 (oversized images) will both pull Speed Index down as a side effect, since less bandwidth/main-thread time will be spent on resources competing with the reveal animations during the loading window.

---

## Info

- **Prerendering confirmed:** `curl https://aplory.dev/` and `curl https://aplory.dev/stomatolozi.html` both return complete final markup (hero headline, full copy, contact form, footer) inside `<div id="root">` in the raw server response — this is not an empty CSR shell waiting on JS/hydration to fill in content. `dist/index.html`'s build output matches. This is the single most important architectural fact for interpreting the LCP numbers above: the bottleneck for LCP is exclusively render-blocking CSS/fonts (Finding 1), never JS execution or hydration.
- **TTFB / server response:** Excellent on both pages — Lighthouse measured 176ms (home) / 278ms (stomatolozi) root-document response time (`server-response-time`/`document-latency-insight` both pass, "serverResponseIsFast": true); independent `curl -w` timing against the live edge confirmed 175ms / 378ms total time-to-first-byte with `Cache-Status: "Netlify Edge"` and Brotli-capable compression (`vary: Accept-Encoding`, `usesCompression: true` per Lighthouse). Not a bottleneck.
- **Chat widget deferral already implemented:** `index.html` lines 191-219 show the LeadConnector/GoHighLevel widget is loaded only on first interaction or a 6s idle fallback — described in an inline code comment as "the largest render-blocking third-party resource on the page (see GEO/SEO audits)." This was clearly a known/addressed issue already; this audit did not find it render-blocking today (see High #2 for the residual concern about the *interaction-time* cost).
- **JS quality is clean:** `legacy-javascript-insight` and `unminified-javascript`/`unminified-css` all pass with zero waste on both pages — the Vite/React 19 build isn't shipping unnecessary transpiled polyfills, unminified code, or duplicate bundles. `unused-javascript` flags only `Contact-D4aAfC2m.js` (69.7KB transferred, ~32.5KB/47% estimated unused on the homepage's initial load) — this is route-split contact-form code with modulepreload hints already in place (`dist/index.html` line 163); likely fine as-is since it's a small absolute amount and is preloaded rather than blocking, but could be revisited if the contact form logic grows.
- **DOM size:** Not flagged (`dom-size-insight` returned "not applicable" — under Lighthouse's threshold — on both pages).
- **No CrUX/field data available:** 100% lab data, single Lighthouse run per page. Recommend re-running with a configured Google API key (`pagespeed_check.py` / CrUX API / CrUX Vis) once the site has sufficient Chrome UX Report traffic, to validate these lab numbers — and, critically, to get real field INP, which cannot be lab-measured at all and is the metric most likely to be affected by the chat-widget interaction burst (Finding 2).
- **Tooling note for future re-runs:** No system Chrome/Chromium is installed in this environment. `npx lighthouse` works if `CHROME_PATH` is pointed at a Playwright-cached Chromium binary (found at `~/.cache/ms-playwright/chromium-<version>/chrome-linux/chrome`). Prefer `--throttling-method=devtools` over the default `simulate` — a `simulate` run on the same homepage reported LCP as 3.7s with an internally inconsistent breakdown (TTFB 175ms + element render delay 328ms summing to only ~500ms against a reported 3.7s LCP), while `devtools` throttling gave a self-consistent 1.6s. Cross-check both if the numbers look surprising.
