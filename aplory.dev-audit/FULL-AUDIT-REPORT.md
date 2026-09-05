# SEO Audit — aplory.dev

**Date:** 2026-09-05
**Business type:** SaaS (B2B automated-response platform for small businesses), with 9 industry-vertical landing pages (dentists, vets, lawyers, auto shops, salons, e-commerce, HVAC, PVC windows, handymen) plus a homepage and a "what we do" overview page. Serbian-language, static Vite build on Netlify with build-time SSR prerendering.
**Pages audited:** 15 (homepage, `sta-radimo.html`, 9 vertical pages, 4 legal pages)
**Supersedes:** the 2026-08-27 audit in this same directory, which was written against a pre-prerendering build. That audit's #1 finding (empty client-rendered shell) has since been fixed in production; this report re-verifies everything live.

---

## SEO Health Score: 71 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 84 | 18.5 |
| Content Quality | 23% | 63 | 14.5 |
| On-Page SEO | 20% | 70 | 14.0 |
| Schema / Structured Data | 10% | 78 | 7.8 |
| Performance (CWV) | 10% | 82 | 8.2 |
| AI Search Readiness (GEO) | 10% | 58 | 5.8 |
| Images | 5% | 45 | 2.3 |
| **Total** | 100% | | **71.0** |

The dominant story of this audit is a large recent improvement, not a fresh set of problems: the previous pass's #1 Critical finding — the homepage and all 10 commercial landing pages shipping as an empty, client-side-rendered `<div id="root">` — is now resolved via a build-time prerender step (`scripts/prerender.mjs` wired into `npm run build`). That single fix lifted the Technical score from 61→84 and the GEO score from 34→58, and unlocked real content-quality gains (FAQPage schema now matches visible content sitewide). What's left is a smaller, well-scoped set of issues: an inert Report-Only CSP, render-blocking fonts, oversized images, thin trust/authority signals, and one concrete content gap (the dentist page missing sections its siblings already have).

---

## Executive Summary

### Top 5 Issues
1. **`stomatolozi.html`, the page most likely to be shown to prospects first, is now the thinnest and least-developed of the 9 verticals** — missing the `proof` ROI block and running a shorter capability list than its siblings (High — Content/SXO).
2. **Content-Security-Policy ships Report-Only with no violation collector**, so it can never safely graduate to enforced — currently zero real XSS/injection hardening despite the header being present (High — Technical).
3. **Render-blocking Google Fonts + local CSS delay first paint by ~1.4s** even though the hero text is already server-rendered and could paint at TTFB (High — Performance).
4. **No trust/authority signals anywhere**: no About page, no PIB/company registration number, no testimonials, zero backlinks, zero external brand mentions (High — Content/GEO/Backlinks, compounding across categories).

### Top 5 Quick Wins
1. Update `public/sitemap.xml` `<lastmod>` values for the 11 pages that changed on 2026-09-05 (currently all still say 2026-08-27) — trivial, high signal-accuracy value.
2. Add a `report-to`/`report-uri` endpoint to the CSP so it can be evaluated and eventually enforced.
3. Add an explicit Netlify redirect from extensionless URLs (`/stomatolozi`) to the canonical `.html` form, resolving a self-contradicting duplicate-URL signal.
4. Self-host the Fraunces/Inter web fonts instead of loading from `fonts.googleapis.com` — removes a ~1.4s render-blocking chain in one change.
5. Re-export the 9 niche hero JPEGs as WebP/AVIF at correct dimensions — `auto-servisi.jpg` alone should drop from 452KB to well under 80KB.

---

## Technical SEO — Score: 84/100

**What works:** Crawlability, indexability, and security header baseline are all solid. `robots.txt`/`sitemap.xml` validate cleanly and are correctly cross-referenced; every page has a unique, self-referencing canonical, unique title (19–75 chars) and meta description (85–182 chars); HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy are all live and correctly configured; HTTPS is enforced site-wide with clean single-hop redirects; 404 handling is correct (`noindex, follow`, proper 404 status, excluded from sitemap). Most importantly, **the prerendering fix is confirmed live** — every route serves complete HTML in the initial response, verified via raw `curl` with no JS execution.

**Resolved since last audit:** Pure-CSR empty-shell issue — fixed via `scripts/prerender.mjs`. No further action needed beyond a CI smoke check to prevent regression.

**High**
- Content-Security-Policy ships as `Report-Only` with no `report-to`/`report-uri` collector, so violations are invisible to the team and the policy will likely never graduate to enforced. `'unsafe-inline'` on `script-src`/`style-src` remains a real gap even once enforced.

**Medium**
- Extensionless URLs (`/stomatolozi`) return 200 with byte-identical content to the canonical `.html` form, and Netlify's own normalization redirects point to the extensionless form — contradicting the `<link rel="canonical">` tag, which points to `.html`. This creates two crawlable URLs per page.

**Low**
- No IndexNow key/endpoint configured (cheap win for faster Bing/Copilot discovery).
- Google Fonts stylesheet is render-blocking with no fallback-metrics matching — plausible CLS contributor at the hero (cross-referenced with Performance finding below).
- No `Cross-Origin-Opener-Policy` / `Cross-Origin-Resource-Policy` headers (minor hardening gap).

**Limitation:** No PageSpeed Insights/CrUX API key is configured, so Core Web Vitals here are lab-only (see Performance section) — no real field data yet.

---

## Content Quality (E-E-A-T) — Score: 63/100

**What works:** The 9 vertical pages are genuinely differentiated, not thin templated duplicates — each has a distinct problem statement, a distinct 4–7 item capability list, a distinct 6-message demo conversation that reads as authored from real domain knowledge (dentist tooth pain, vet vomiting cat, mechanic asking a car's year), and 4–6 vertical-specific FAQ entries matching their `FAQPage` JSON-LD 1:1. Rendered word counts run 781–869 words for 8 of 9 verticals. The core "62% of missed calls" statistic is disclosed honestly and specifically (source, year, sample size, and an explicit caveat that no equivalent Serbian data exists) — better practice than most sites manage with a single load-bearing statistic.

**High**
- No About/company/team page and no visible entity trust signals (founder identity, headcount, client logos, testimonials) anywhere on the site.
- No company registration number (PIB/matični broj) disclosed on any page or legal document.

**Medium**
- The "How it works" 3-step explainer is byte-for-byte identical across all 9 vertical pages and the homepage — the one remaining significant duplicate block (the problem statement and demo transcript are now unique per page).
- `sta-radimo.html` is thin (196 rendered words) relative to its role — a bulleted restatement of services already listed in the homepage schema, with no depth on mechanism, onboarding, SLAs, or data retention.
- `stomatolozi.html` (622 words) is now the shortest and least-developed of the 9 verticals, missing the capability-list depth (4 vs. 6–7 items) and the proof section its siblings have.
- The core statistic remains a decade-old, 85-company U.S. sample — disclosed well, but still the site's single most prominent proof point and a residual risk if an AI answer engine paraphrases it without the disclaimer clause.

**Info**
- `FAQPage` schema is present and matches visible content on the homepage and 9/10 vertical pages — a genuine improvement. Per current guidance (Google retired FAQ rich results for all sites May 2026), keep it, but expect no SERP benefit and no confirmed AI-citation benefit.
- `llms.txt` exists and is accurate and in sync with `niches.js` — a low-cost, positive signal.
- `openingHoursSpecification` claims 00:00–23:59, all 7 days — worth confirming this accurately reflects an always-on *automated* response, not implying live staff availability.

**E-E-A-T breakdown:** Experience 55, Expertise 45, Authoritativeness 35, Trustworthiness 55 → weighted 47/100, up from 37. Authoritativeness (zero external validation) is the largest remaining gap and cannot be closed by content edits alone.

---

## On-Page SEO — Score: 70/100

- Titles and meta descriptions: unique and well-sized across all 15 templates (technical audit, passing).
- Heading structure: clear H1 per page, but no question-phrased H2s anywhere — every section heading is declarative, which limits how AI retrieval systems are believed to segment pages into answerable chunks (GEO finding).
- Internal linking: flat, shallow site (home → 10 vertical pages, one hop) with no breadcrumbs; nav and footer link structure is consistent across templates.
- The duplicated "How it works" boilerplate (Content finding) and thin `sta-radimo.html` are the main drags on this category, alongside the missing freshness/dated-content signals (no visible "last updated," no `datePublished`/`dateModified` in JSON-LD anywhere).

---

## Schema / Structured Data — Score: 78/100

**What works:** All 20 JSON-LD blocks across 11 pages parse as valid JSON, use non-deprecated types, contain no placeholder text, and use absolute HTTPS URLs. `FAQPage` visible content matches its JSON-LD 1:1 on all pages that carry it — a real correctness plus, since mismatches are a common cause of manual-action flags. Schema ships pre-rendered, consistent with the site's build-time SSR.

**Medium**
- `ProfessionalService`/`LocalBusiness` is a type mismatch for a remote B2B SaaS product with no storefront or physical service area — its `openingHoursSpecification: 00:00–23:59` block really means "the software runs continuously," not "our premises are staffed." Recommended fix: model APLORY as an `Organization` that `provider`s a `Service`, not a `LocalBusiness` subtype (full example JSON-LD in `findings/schema.md`). `SoftwareApplication` was considered and correctly rejected — it needs app-store-style properties that don't fit a subscription service.

**Low**
- `provider` object duplicated inline across all 10 vertical pages instead of referenced by a stable `@id` — a maintenance risk (11 places to edit instead of one).
- No `BreadcrumbList` for the home → vertical-page hierarchy.

**Info**
- `FAQPage` presence: see Content section — no SERP benefit expected, keep as-is.
- Homepage entity still missing `image`/`sameAs`/`address` — already identified in the repo's own `SCHEMA-REPORT.md` but never applied to live `index.html`.
- No `WebSite`/`@graph` consolidation — optional tidiness improvement, not a distinct rich-result opportunity.
- Correctly **not** recommending: `HowTo` (deprecated), `AggregateRating`/`Review` (no real review content exists yet — fabricating ratings would violate Google's structured-data policy), new `FAQPage` additions for SERP purposes.

---

## Performance — Score: 82/100 (lab data only)

**Method note:** No PageSpeed Insights/CrUX API key is configured, so all numbers are Lighthouse lab data (mobile, DevTools throttling), not field data. Treat as directional.

**Lab results (both homepage and `stomatolozi.html`):** LCP 1.6–1.7s (Good), CLS 0.03–0.07 (Good), TBT 20–30ms (Good, low). The LCP element on both pages is the hero `<h1>` text — already present in server-rendered HTML, not gated on JS/hydration. TTFB is excellent (176–278ms).

**High**
- Render-blocking Google Fonts stylesheet + local CSS delay first paint by an estimated ~1.4s even though the hero text needs no external resource to render. Self-hosting the fonts and inlining critical above-the-fold CSS could bring LCP down to ~0.3–0.5s.
- The GoHighLevel/LeadConnector chat widget (~188KB, 9+ requests, ~90ms main-thread time) is already correctly deferred to first interaction — good — but that means its cost now lands *concurrently* with the user's first scroll/interaction, which is the most likely source of a slow field INP even though it doesn't show up in a lab trace. Recommend a lazier trigger (idle callback, longer delay, or scroll-depth gate) and reconsidering whether the bundled `libphonenumber-js` (44KB) is needed for a simple phone field.

**Medium**
- Niche hero photos are shipped as full-resolution JPEGs 1.3–3.3x larger than their display size, none in WebP/AVIF (`auto-servisi.jpg`: 452KB, 67% identified as waste on the equivalent stomatolozi image). Re-exporting as WebP/AVIF at correct dimensions would cut most of these by 60–80%.
- Footer logo is 2x oversized for its display size (~11KB of 12.6KB is waste) — trivial fix.
- Fonts served from `fonts.googleapis.com`/`fonts.gstatic.com` add an extra cross-origin hop on top of the render-blocking issue above; self-hosting fixes both at once.

**Low**
- Speed Index (5.7–5.9s) and Time to Interactive (3.1–3.4s) trail LCP well behind — not a failing Core Web Vital today, but a sign of limited headroom before a heavier future page could regress CLS/TBT.

**Info:** Chat widget deferral is already correctly implemented (this was flagged as the top issue in the pre-prerendering audit; it's now resolved). JS bundle quality is clean — no unminified code, no unnecessary polyfills.

---

## Images — Score: 45/100

Rolled up from the Performance findings: 8 of 9 niche hero photos ship as oversized baseline JPEGs with no modern-format alternative, one running at 452KB with 67%+ identified as wasted bytes for its actual display size. The footer logo (already WebP, good) is still 2x oversized for its display dimensions. No `<picture>`/`srcset` responsive image sets are in use anywhere. All images do correctly carry explicit `width`/`height` attributes (good CLS hygiene) and appropriate `loading="eager"`/lazy usage for above-the-fold content — the gap is purely format/compression, not markup discipline.

---

## AI Search Readiness (GEO) — Score: 58/100 (up from 34)

**What changed:** The single highest-impact prior recommendation — fixing the client-side-rendered empty shell — has shipped. Live `curl` confirms full heading structure, body copy, and per-niche FAQ content are present with no JS execution required. `/llms.txt` now exists and is accurate; `FAQPage` JSON-LD now matches visible content sitewide.

| Dimension | Score |
|---|---|
| Citability | 40 |
| Structural Readability | 65 |
| Multi-Modal Content | 15 |
| Authority & Brand Signals | 15 |
| Technical Accessibility | 85 |

**High**
- No self-contained passages in the 134–167-word "optimal AI citation length" range anywhere on the site — FAQ answers run 16–36 words, terse by design. Adding 1–2 expanded paragraphs (the legal-compliance FAQ, a synthesizing "how it works" paragraph, or a fully-attributed version of the "62%" stat) is now the highest-leverage remaining content change.
- Zero external brand/entity signals: no `sameAs`, no Wikipedia entity, no YouTube/Reddit/LinkedIn footprint. This is a long-horizon problem that cannot be shortcut by markup changes — it has to be earned as the business operates.

**Medium**
- No question-phrased H2/H3 headings (cross-referenced with On-Page SEO).
- No visible dates or authorship signals anywhere — `sitemap.xml`'s static `lastmod` doesn't help (see Sitemap section).
- No `Organization`/`WebSite` companion schema, no `sameAs` (cross-referenced with Schema section).

**Platform estimates (directional, unverified — no live LLM-citation tool was available):** Google AI Overviews ~55, ChatGPT ~45, Perplexity ~45, Bing Copilot ~50. Being a small, brand-new, Serbian-only site with no backlink/mention profile is a structural disadvantage for non-Google platforms regardless of on-page fixes.

---

## Sitemap — Findings

- **XML validity, size, URL resolution, 404 handling, and sitemap↔crawl coverage: all PASS.** All 14 URLs resolve 200 with no redirects; sitemap and actual site files match exactly.
- **High:** All 14 URLs share an identical `lastmod` of 2026-08-27, but 11 pages (homepage + `sta-radimo.html` + all 9 verticals) received substantive content commits on 2026-09-05 (~70–90 line diffs each). The 4 legal pages do genuinely match the declared date. Recommend deriving `lastmod` from git history or file mtimes at build time so it can't drift again.
- **Info:** The `<priority>` tag is present but ignored by Google — safe to remove, no urgency. The 30+/50+ page quality-gate thresholds for programmatic vertical pages don't apply at this site's current 9-page scale.

---

## Visual / Mobile — Findings

**Overall: no blocking issues.** Above-the-fold value proposition and primary CTA are fully visible without scrolling on both desktop and mobile, on both pages tested (homepage and `stomatolozi.html`). No overlapping elements, text clipping, or broken layout.

**Medium:** Header CTA and hamburger tap targets measure ~41px on mobile, under the 48px touch-target guideline — a small CSS padding fix.
**Low:** The "Nazad na početnu" (back to home) link visible on desktop for vertical pages has no mobile equivalent — worth confirming this is intentional. The "Zakažite razgovor" CTA label appears twice above the fold on mobile (header + hero) — likely intentional, flagged for awareness only.

---

## Search Experience (SXO) — Findings

**Primary finding, downgraded from Critical to High since the last pass:** the site's copy no longer overclaims voice answering — the homepage title now says "APLORY odgovara" (responds) and the stomatolozi FAQ explicitly discloses that a message, not the practice owner, replies. This closes the prior audit's expectation-mismatch/churn-risk concern. What remains is a **click-through positioning problem**: live SERP sampling found the Serbian query cluster for "propušten poziv + automatski odgovor [struka]" is dominated by both voice-AI vendors (Wisefox, Virtuelna Recepcija) and a direct text/SMS-based competitor, **Poziv.net**, that no APLORY page names or differentiates against. The voice-vs-text disambiguation currently lives only in the on-page FAQ, not in the meta description/H1 where it would affect the SERP snippet itself.

**Page-specific finding:** `stomatolozi.html` — the page most likely to be shown to a prospect first — is structurally the thinnest of the 9 verticals (see Content section), and its SXO Gap Score (46/100) is the lowest of the two pages scored in depth, with the "comparison-shopper" persona scoring weakest (49/100) due to the missing proof content and shorter capability list.

**User stories surfaced:** (1) "Is this a robot that talks or texts?" — answered on-page but not in the snippet; (2) "Will my patient know it's not really me?" — now well-answered via FAQ; (3) "What does this cost, can I try it?" — zero pricing on any page, a real gap against every competitor sampled; (4) "Does this work for a business like mine?" — well-served by genuinely differentiated vertical copy, undercut by zero social proof; (5) lawyer-specific — the `advokati` SERP is dominated by law firms' own confidentiality-focused FAQ content, a different competitive bar than the SaaS-vendor pattern elsewhere.

---

## Backlinks — Findings

**Status: no numeric score reported (insufficient data, not a low score).** aplory.dev does not yet appear in Common Crawl's host-level web graph — expected and unremarkable for a domain only a few months old, not evidence of a penalty. No Moz or Bing Webmaster API keys are configured, so referring-domain counts, anchor text, and spam ratio cannot be assessed at all in this environment (Tier 0).

**Recommendations:** Add a free Moz API key (2,500 rows/month) to reach Tier 1 for future audits. For actual link-building: register on Serbian business directories (Startit.rs, PKS chamber-of-commerce listings), pitch a launch story to Startit.rs/Netokracija/Bizlife (Serbia's primary startup/tech media), and list on Product Hunt/SaaSHub/AlternativeTo.

---

## Cross-Category Pattern

Several findings recur across categories and reinforce each other:
- **Authority/trust is the thread running through Content, GEO, SXO, and Backlinks** — no About page, no PIB, zero testimonials, zero backlinks, zero external brand mentions. No single fix closes this; it requires the business to accumulate real-world signals (press, reviews, client logos) over time, not another code change.
- **The `stomatolozi.html` content gap appears independently in Content, SXO, and (implicitly) On-Page findings** — three separate specialist passes converged on the same page being under-built relative to its 8 siblings, which raises confidence this is a real, not spurious, finding.
- **Render-blocking fonts appear in both Technical and Performance findings** — same root cause (external Google Fonts load), two different symptom lenses (CLS risk vs. LCP delay).
