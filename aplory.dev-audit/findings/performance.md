# Performance & Core Web Vitals Audit — aplory.dev

Date: 2026-08-27
Scope: homepage (`/`) plus two niche landing pages (`/sta-radimo.html`, `/stomatolozi.html`), all built with Vite + React 19, deployed on Netlify with Brotli compression.

**Method / data source:** PageSpeed Insights API was unavailable (no Google API key configured in this environment; the shared, unauthenticated PSI quota — 240 QPM / 25,000 QPD — was already exhausted, and CrUX field data requires the same key, so field data could not be obtained regardless). System Chrome/Playwright is also not installed for interactive use, but a Chromium binary bundled with the `claude-seo` plugin's Playwright cache (`~/.cache/ms-playwright/chromium-1148/chrome-linux/chrome`) was usable as `CHROME_PATH` for `npx lighthouse`. **All numbers below are Lighthouse 13.x lab data (single run, mobile emulation, simulated throttling), not 28-day CrUX field percentiles** — treat as directional, not as the 75th-percentile pass/fail Google actually scores. TTFB was cross-checked independently with `curl` timing against the live Netlify edge.

**Note on INP:** Lighthouse is a lab tool and cannot measure INP (it requires real user interaction over a session); it reports **Total Blocking Time (TBT)** and **Max Potential FID** as lab proxies for main-thread responsiveness. No CrUX field INP is available (no API key). Findings below use TBT as the interactivity proxy; treat as a caveat when reporting "INP" — this audit did not measure lab or field INP directly.

## Performance Overview

| Page | Lighthouse Performance Score | LCP | CLS | TBT (INP proxy) | FCP | Total byte weight |
|---|---|---|---|---|---|---|
| `/` (homepage) | 93/100 | 2.2 s (2,154 ms) | 0.029 | 40 ms | 2.2 s | 545 KiB |
| `/sta-radimo.html` | 96/100 | 2.4 s (2,446 ms) | 0.045 | 20 ms | 1.9 s | 535 KiB |
| `/stomatolozi.html` | 93/100 | 2.0 s (2,008 ms) | 0.067 | 50 ms | 2.0 s | 635 KiB |

**Core Web Vitals status (lab, mobile, all three pages):**
- **LCP: PASS** ("Good" ≤2.5s) — all three pages land 2.0–2.4s, comfortably under the 2.5s threshold, though `/sta-radimo.html` is closest to the boundary.
- **CLS: PASS** ("Good" ≤0.1) — all three pages are well within budget (0.03–0.07).
- **TBT/INP proxy: PASS** — 20-50ms TBT is very low; no evidence of long-task-driven interactivity problems in these lab runs. Actual field INP is unmeasured (see caveat above) — SPA route transitions and third-party widget interaction (chat) are the most likely places field INP could diverge from this lab result.

**Overall Performance Score: 94/100** (average of the three lab scores; representative composite for the site's Vite/React/Netlify architecture, not a Google-reported number).

TTFB is excellent and consistent across pages: Lighthouse measured 67-69ms root-document TTFB on all three pages; independent `curl` timing against the live edge (`Cache-Status: "Netlify Edge"; hit`, `content-encoding: br`) confirmed 71-184ms total time-to-first-byte, consistent with a CDN cache hit and Brotli compression already working correctly — this is not a bottleneck anywhere on the site.

---

## Critical

None. No Core Web Vital fails its "Good" threshold on any of the three pages tested in this lab run.

---

## High

### 1. Third-party chat widget (`widgets.leadconnectorhq.com`) is the single largest render-blocking and LCP-delaying resource
**Evidence:** Lighthouse's render-blocking-requests insight on the homepage flags `https://widgets.leadconnectorhq.com/loader.js` as costing **~1,340ms** of blocking time on its own, out of a total **~950ms of estimated LCP/FCP savings** available from render-blocking requests (loader.js, `base-*.css`, the Google Fonts CSS request, and `niches-*.css`). The LCP breakdown shows nearly all of LCP time (2,086 of 2,154ms on the homepage) sitting in **"element render delay"** rather than TTFB (67ms) — i.e., the hero text is ready to render almost immediately but is held up by blocking script/style execution ahead of it. The chat widget also injects several additional JS chunks (`p-8e6d82f5.entry.js` 52KB, `p-wn9th3jR.js` 25KB, plus 3 smaller files) that only carry a 4-hour (`14400000ms`) cache lifetime, and an oversized 512x512 avatar image (`filesafe.space/.../6a896f1167bb7...png`, 6.6KB, displayed at 70x70 — 6.5KB wasted).
**Why it matters:** This is a synchronous, third-party-controlled dependency sitting directly in the critical rendering path of every page on the site. It is currently the largest single lever on LCP (potential ~1s), and because it's third-party JS it is also the most likely source of any field-measured INP regression that this lab test cannot see (chat widget interaction handlers, DOM injection into `<chat-widget>` shadow content, etc.).
**Recommendation:** Load the chat widget script with `defer` or dynamically inject it after `window.load` / on user interaction (e.g. IntersectionObserver on scroll-to-footer, or a "chat with us" click trigger) rather than blocking initial render. Add `<link rel="preconnect">` for `widgets.leadconnectorhq.com` if it must load early. This alone should recover most of the ~950ms render-blocking savings Lighthouse identified. Expected impact: LCP improvement of several hundred ms to ~1s across all pages (highest-impact single fix identified).

### 2. Render-blocking Google Fonts request stacks on top of the chat widget
**Evidence:** `https://fonts.googleapis.com/css2?family=Fraunces:...&family=Inter:...&display=swap` is flagged as render-blocking with an estimated **1,418ms** wasted duration on the homepage (this overlaps with, but compounds, the chat-widget blocking above since both are on the critical path before first paint). Separately, `font-display-insight` flags `fonts.bunny.net/roboto/files/roboto-latin-400-normal.woff2` for an estimated **685ms** savings — indicating a second, apparently redundant web-font source (Google Fonts *and* Bunny Fonts both loading a Roboto/Inter-family stack) is present in the page.
**Why it matters:** Two separate third-party font origins load synchronously ahead of render, doubling DNS/TLS/request overhead for what should be a single font-loading strategy, and increasing FOIT/FOUT risk (though CLS remains fine here because layout is dimensioned correctly).
**Recommendation:** Consolidate to one font provider (self-host the woff2 files from `aplory.dev`'s own origin via Vite's asset pipeline, or use `<link rel="preload" as="font">` + `font-display: swap` on a single source) and remove the unused second font origin. Add `rel="preconnect"` (with the origin actually used) if an external font CDN is kept.

---

## Medium

### 3. Unoptimized `/logo-mark.png` — largest single image-delivery waste identified
**Evidence:** `image-delivery-insight` flags `https://aplory.dev/logo-mark.png` (in the footer/contact section, `section#kontakt`) as **19.6KB of the file's 20.9KB wasted** — the image is a 400x81px PNG displayed at 196x40px (2x oversized) and is not in a modern format (WebP/AVIF), accounting for the majority of avoidable image weight found in the audit.
**Why it matters:** This is a below-the-fold logo instance, so it doesn't affect LCP directly on these three pages, but it's pure wasted bandwidth on every page load and is a quick, high-ratio win (95% of the file's bytes are unnecessary).
**Recommendation:** Re-export the logo mark as a properly sized (196x40 @2x = ~392x80) WebP or AVIF asset via the existing Vite asset pipeline; expect the file to drop from ~21KB to well under 2KB.

### 4. Unused CSS — ~17KB estimated savings on every page
**Evidence:** `unused-css-rules` reports an estimated 17KB savings identically on all three pages tested (homepage, sta-radimo, stomatolozi), pointing at a shared base CSS bundle (`base-*.css`, `niches-*.css`) that ships more rules than any single route needs.
**Why it matters:** Consistent across routes — this is a bundling/code-splitting issue in the shared Vite/Tailwind build rather than a per-page content problem. Modest but free win; also reduces the render-blocking-CSS cost described in Finding 1.
**Recommendation:** Verify Tailwind's `content` purge globs cover all 15 HTML entry points and their JSX; consider per-route CSS chunking (Vite already builds 15 separate HTML entries per the technical audit — extend that separation to CSS) so each landing page only ships the niche-specific styles it uses.

### 5. Short cache lifetimes on third-party chat-widget assets
**Evidence:** `cache-insight` shows 8 third-party resources (all under `leadconnectorhq.com`, `cloudfront.net`, `leadsy.ai`) with only a 4-hour cache lifetime (`14400000ms`), representing a combined **~74KB of estimated re-download waste** per repeat-visit cache miss window, dominated by the chat widget's own JS chunks (35.5KB + 17.3KB + 10.7KB + others).
**Why it matters:** These are third-party-controlled cache headers (outside direct control), but they compound the chat-widget cost from Finding 1 for repeat visitors within a session.
**Recommendation:** No direct fix available (third-party controlled), but this reinforces the case in Finding 1 for deferring/lazy-loading the widget rather than trying to cache around it.

---

## Low

### 6. Speed Index and Time to Interactive lag LCP on the homepage and stomatolozi page
**Evidence:** Homepage: Speed Index 5.0s, TTI 5.7s vs. LCP 2.2s. Stomatolozi: Speed Index 4.9s, TTI 6.6s vs. LCP 2.0s. (sta-radimo is notably better: Speed Index 2.5s, TTI 6.3s.) 3-4 long tasks were recorded on each page (main-thread work 1.2-2.2s).
**Why it matters:** Visual completeness and full interactivity trail well behind the LCP paint, suggesting continued layout/paint activity and JS execution (scroll-reveal animations, niches list, third-party scripts initializing) after the hero is visible. This doesn't fail any CWV threshold today but represents headroom before a heavier page (more images, more niches content) could push LCP or TBT into "Needs Improvement."
**Recommendation:** Not urgent. If adding more content/sections to these pages in the future, audit main-thread work again — current 1.2-2.2s of main-thread work per page leaves limited margin before TBT/INP would regress.

---

## Info

- **TTFB / server response:** Excellent everywhere — Lighthouse measured 67-69ms root-document response time on all three pages; `curl` against the live edge confirmed 71-184ms total (with `Cache-Status: "Netlify Edge"; hit`). Netlify's edge CDN + Brotli (`content-encoding: br` confirmed via `curl -H "Accept-Encoding: br, gzip"`) are already working correctly; no action needed here.
- **Total page weight:** 535-635KB across the three pages tested — reasonable for a marketing SPA with a chat widget, not flagged as excessive on its own.
- **No CrUX/field data available:** This audit is 100% lab data from a single Lighthouse run per page under simulated mobile throttling. Google's actual pass/fail is based on the 75th percentile of real Chrome user sessions over 28 days, which is not visible here. Recommend re-running this audit with a configured `GOOGLE_API_KEY` (for `pagespeed_check.py` / CrUX API) once the site has sufficient Chrome UX Report traffic, to validate these lab numbers against field reality — particularly for INP, which cannot be lab-measured at all.
- **Legacy JavaScript / duplicated JavaScript:** Both audits passed clean (0 wasted bytes) on the homepage — the Vite/React 19 build is not shipping unnecessary transpiled polyfills or duplicate bundles.
- **Tooling note for future re-runs:** PSI API access in this environment is a shared, unauthenticated quota (240 QPM / 25,000 QPD) that was already exhausted at audit time. `npx lighthouse` works if `CHROME_PATH` is pointed at the Playwright-bundled Chromium binary (found at `~/.cache/ms-playwright/chromium-<version>/chrome-linux/chrome` in this environment), since no system Chrome/Chromium is installed.
