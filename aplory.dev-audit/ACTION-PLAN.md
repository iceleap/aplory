# Action Plan — aplory.dev

SEO Health Score: **71/100**. Ordered by impact and dependency — items in Phase 1 unblock or de-risk nothing downstream by themselves but are cheap and high-signal; Phase 2 items are the highest-leverage content/performance work; Phase 3 is authority-building, which is slow by nature and should start now even though it pays off later; Phase 4 is ongoing hygiene.

---

## Phase 1: Critical & Quick Fixes (This Week)

1. **Update `public/sitemap.xml` `<lastmod>` values** for the homepage, `sta-radimo.html`, and all 9 vertical pages to 2026-09-05 (or automate generation from git/build metadata so this can't drift again). *Effort: trivial. Falsifiable check: `curl -s https://aplory.dev/sitemap.xml` shows per-page dates matching actual last-significant-change, not one blanket date.*
2. **Add a CSP violation collector** (`report-to`/`report-uri`) to the existing `Content-Security-Policy-Report-Only` header in `netlify.toml`. *Depends on nothing; unblocks eventually flipping to enforced CSP. Effort: low (Netlify Function or a free Report URI/Sentry endpoint). Check: violations appear in the collector's dashboard within a day of deploy.*
3. **Add an explicit redirect from extensionless URLs to the canonical `.html` form** (`/stomatolozi` → `/stomatolozi.html`, 301) via `netlify.toml` or `_redirects`. *Effort: low, one rule pattern for all vertical pages. Check: `curl -sI https://aplory.dev/stomatolozi` returns a 301 to the `.html` form.*
4. **Compress the footer logo** (`logo-mark.webp`) to its actual display size (~392×80 @2x). *Effort: trivial. Check: file size drops from ~12.6KB to ~1-3KB.*
5. **Fix mobile tap-target sizing** on the header CTA/hamburger buttons (pad to ≥48px tall). *Effort: trivial CSS change. Check: pixel-measured tap target ≥48px on a 375px-wide screenshot.*

## Phase 2: High-Impact Improvements (Weeks 2–3)

6. **Done.** The `proof` ("Računica") block now renders on `NicheLanding.jsx` as the page's third section, right after `HowItWorks`. The `scenario` ("Jedan dan") block was a deliberate cut, not an oversight — its data has been removed entirely from `src/data/niches.js` and its component deleted, so it will not resurface as a "dead content" finding in a future audit. Remaining gap: write a matching `proof` block for `stomatolozi.html`, the one niche that still doesn't have one.
7. **Self-host the Fraunces/Inter web fonts** instead of loading from `fonts.googleapis.com`/`fonts.gstatic.com`, and inline critical above-the-fold CSS. *Effort: medium (Vite asset pipeline change touching every page template). Check: Lighthouse LCP on homepage and a vertical page drops from ~1.6-1.7s toward ~0.3-0.5s; render-blocking-insight no longer flags the fonts stylesheet.*
8. **Re-export the 9 niche hero photos as WebP/AVIF at correct display dimensions.** *Effort: medium (asset re-export + build pipeline). Check: `auto-servisi.jpg`-equivalent drops from 452KB to well under 80KB; `image-delivery-insight` no longer flags wasted bytes.*
9. **Move voice-vs-text disambiguation into the meta description/H1 pattern site-wide** (not just the on-page FAQ) so it differentiates in the SERP snippet itself, and name the Poziv.net-style text-based competitor at least once to convert category confusion into a comparative advantage. *Depends on #6 conceptually (same content pass). Effort: low-medium, repeats across 10 pages. Check: meta descriptions explicitly state "porukom, ne pozivom" or equivalent.*
10. **Adjust the chat-widget load trigger** to a lazier signal (longer idle delay or scroll-depth gate instead of first scroll/mousemove/keydown) and evaluate whether `libphonenumber-js` (44KB) is needed for the phone field. *Effort: low. Check: widget script no longer loads within the first 1-2 seconds of a typical scroll interaction.*

## Phase 3: Content & Authority (Month 2)

11. **Add an About/Company section** with founder identity, PIB/company registration number, and the physical address currently buried only in legal boilerplate. *Effort: low-medium. Check: PIB and founder name appear in the footer or a dedicated page.*
12. **Add 1–2 expanded, self-contained 134–167-word paragraphs** for AI-citation readiness — the legal-compliance FAQ answer and/or a fully-attributed version of the "62% of calls" statistic. *Depends conceptually on #6 (same writing pass). Effort: low-medium.*
13. **Localize the "How it works" 3-step copy per vertical** instead of reusing identical text across all 10 pages. *Effort: low-medium, repeats across pages.*
14. **Expand `sta-radimo.html`** with genuine mechanism/SLA/data-handling depth instead of a bulleted restatement of the homepage's service list. *Effort: medium.*
15. **Begin external authority building**: register on Serbian business directories (Startit.rs, PKS chamber listings), pitch a launch story to Startit.rs/Netokracija/Bizlife, list on Product Hunt/SaaSHub/AlternativeTo, and add a free Moz API key to enable real backlink tracking in future audits. *Long-horizon, cannot be shortcut by code changes — start now so it compounds. Effort: low per item, ongoing.*
16. **Update the homepage/vertical-page JSON-LD from `ProfessionalService`/`LocalBusiness` to `Organization` + `Service`** (drop `openingHoursSpecification`, add `image`/`sameAs`/`logo`, consolidate `provider` objects via `@id` reference instead of duplicating inline on all 10 pages). *Effort: low-medium, template-wide change. Check: `json.loads()` validates, and Google's Rich Results Test shows no LocalBusiness-type warnings.*

## Phase 4: Monitoring & Iteration (Ongoing)

17. Configure a PageSpeed Insights/CrUX API key to replace lab estimates with real field data for LCP/INP/CLS once traffic is sufficient.
18. Add a CI/pre-deploy smoke check (`curl <url> | grep -c "<h1"` for every sitemap URL) so a future refactor can't silently reintroduce the empty-shell CSR regression.
19. Add an IndexNow key/endpoint for faster Bing/Copilot discovery of content changes.
20. Add a `BreadcrumbList` and `WebSite`/`@graph` consolidation to structured data (low priority, cheap once the `Organization` migration in #16 is done).
21. Re-run this audit's Backlinks and GEO sections quarterly as the Phase 3 authority-building work lands, to track real progress against the current "insufficient data" / 58-score baselines.

---

## Leading Indicators to Watch (without re-running the full audit)

- **Sitemap accuracy:** `lastmod` values should update automatically on every content deploy going forward.
- **CSP violations:** collector dashboard should show a stable, understood violation pattern (or none) before flipping to enforced.
- **LCP (lab):** should drop meaningfully after the font self-hosting fix — track via a quick Lighthouse run, not a full re-audit.
- **`stomatolozi.html` word count:** should reach parity (~800+ rendered words) with its siblings once #6 lands.
- **Backlink count:** first non-zero Common Crawl or Moz signal will indicate the Phase 3 outreach is landing.
