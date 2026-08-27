# Full SEO Audit — aplory.dev

**Date:** 2026-08-27
**Business type:** SaaS (B2B automated-response platform) with 9 industry-vertical landing pages, targeting small businesses in Serbia (dentists, vets, lawyers, auto shops, salons, e-commerce, HVAC, PVC joinery, handymen)
**Scope:** 15 URLs (homepage, `sta-radimo.html`, 9 vertical pages, 4 legal pages), all indexed in `sitemap.xml`
**Method:** Local source inspection (`/home/novak/Desktop/aplory`), live `curl`/render checks against `https://aplory.dev/`, Lighthouse lab performance runs, headless-browser screenshots, and 7 parallel specialist reviews (technical, content, performance, visual, GEO, SXO, backlinks). No Google API (GSC/CrUX/GA4) or Moz/Bing credentials were configured, so field CWV, indexation status, and paid backlink data are unavailable — noted per finding.

---

## SEO Health Score: 58 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 61 | 13.4 |
| Content Quality | 23% | 42 | 9.7 |
| On-Page SEO | 20% | 58 | 11.6 |
| Schema / Structured Data | 10% | 72 | 7.2 |
| Performance (CWV) | 10% | 94 | 9.4 |
| AI Search Readiness (GEO) | 10% | 34 | 3.4 |
| Images | 5% | 70 | 3.5 |
| **Total** | | | **58.2 ≈ 58/100** |

The score is held down almost entirely by one architectural decision — **the site ships as pure client-side-rendered HTML with no server-rendered content on any of its 11 commercial pages** — which simultaneously caps Technical, Content extractability, and AI Search Readiness. Performance is strong once JS runs; the underlying copy and technical hygiene (canonicals, metadata, sitemap) are solid. This is a fixable-in-weeks profile, not a fundamentally broken site.

---

## Top 5 Critical Issues

1. **Pure CSR, zero server-rendered content on 11 of 15 pages.** The homepage and all 9 vertical pages ship `<div id="root"></div>` with no text in the raw HTML — confirmed via `curl` and in both source and the `dist/` build. Only the 4 legal pages are genuinely static. Google's renderer eventually sees the content (with delay/risk), but non-JS crawlers, AI answer engines (GPTBot, PerplexityBot, ClaudeBot), and most SEO tools see an empty page. *(Technical, GEO)*

2. **Product-claim vs. search-intent mismatch on every vertical page (SXO).** All 9 niche pages imply APLORY answers phone calls live, but the homepage FAQ admits: *"Da li radite glasovnog agenta koji se javlja na telefon? — Još ne."* (voice agent: not yet). The Serbian SERP for this exact query cluster is now dominated by competitors (Wisefox, Virtuelna Recepcija/"Olivija", 360Serbia, VoiceFleet) that **do** answer calls with a live voice bot. This is a trust/expectation risk, not just a ranking gap — a searcher expecting live call pickup will bounce or churn on discovering it's text-only.

3. **Duplicate H2 across 10 URLs + template-driven thin content.** The exact sentence *"Poziv na koji niko ne odgovori je klijent koji zove sledećeg na spisku."* is the section heading on all 9 vertical pages and the homepage. Genuinely unique copy per vertical page is only ~150–200 words; the "How it works" explainer is 100% identical sitewide. Classic programmatic-SEO thin/near-duplicate pattern.

4. **No FAQ, testimonials, pricing, or trust signals on any of the 9 vertical pages.** Zero client logos, reviews, case studies, or pricing anywhere on the site. Authority scored 2–3/15 in the SXO review. No About/company page; contact is a personal Gmail address; no PIB/company registration number disclosed.

5. **Zero AI/LLM citability.** GEO Readiness scores 34/100 — driven by Critical #1 plus the absence of any self-contained 134–167-word citable passages (every FAQ answer is 16–36 words) and zero external brand signals (no YouTube, Reddit, LinkedIn, or press presence).

## Top 5 Quick Wins

1. **Defer/lazy-load the LeadConnector chat widget script** — it is the single largest render-blocking resource (~1,340ms) and the top lever on LCP. Load on scroll/interaction instead of blocking initial render. *(Low effort, ~1s LCP improvement)*
2. **Publish `/llms.txt`** with a clean plain-text summary of what APLORY is, who it serves, and page links — currently 404s. *(Low effort, same-day)*
3. **Compress `logo-mark.png`** — 19.6KB of its 20.9KB is waste (2× oversized PNG, no WebP/AVIF). *(Low effort)*
4. **Add missing security headers** (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/CSP, `Permissions-Policy`) via `netlify.toml` `[[headers]]` — HSTS already exists but lacks `includeSubDomains; preload`. *(Low effort)*
5. **Reformat the "62% of missed calls" statistic** into one fully attributed sentence (study name, year, sample size, source) and disclose it's a 2016, 85-company U.S. study, not Serbian data. *(Low effort, closes an E-E-A-T/trust gap)*

---

## Technical SEO — 61/100
Findings: [findings/technical.md](findings/technical.md)

**Critical:** Homepage + 10 niche pages are pure CSR (see Top Issue #1). No SSG/prerendering plugin in `vite.config.js` despite each route already having its own HTML entry point — a moderate, well-scoped fix, not a rewrite.
**High:** No custom security headers beyond default HSTS.
**Medium:** LCP gated by JS execution (compounds Critical #1); IndexNow protocol not implemented.
**Low:** Minor `meta robots` inconsistency (cosmetic only).
**Passing:** robots.txt, sitemap.xml (valid, 15 URLs), canonicals, no noindex, unique titles/descriptions, full OG/Twitter tags, clean HTTPS/redirect chain, clean URL structure, correct viewport, sound cache-control strategy, server-rendered JSON-LD on homepage.

## Content Quality (E-E-A-T) — 42/100
Findings: [findings/content.md](findings/content.md)

**Verdict:** The 9 vertical pages are template-driven thin/near-duplicate content, not genuine unique pages (~150–200 unique words each; shared skeleton otherwise).
**Critical:** No FAQ on any vertical page; duplicate H2 across 10 URLs.
**High:** No About/team/company trust signals anywhere; no PIB/company registration number; core "62%" stat is a 2016, 85-company U.S. study presented without disclosure.
**Medium:** "How it works" 100% duplicated sitewide; unused dead stat data (`research.js`) risks future mismatch; no `FAQPage` schema; thin word count relative to service-page norms.
**Positive:** Readability is good; demo chat transcripts are genuinely vertical-specific and a real trust signal; the homepage FAQ's candid admission that the voice agent isn't ready yet is a rare, credible trust signal (undercut by the fact niche pages never show it — see SXO).
**E-E-A-T breakdown:** Experience 45, Expertise 35, Authoritativeness 30, Trustworthiness 40 → weighted 37/100. AI citation readiness: 30/100.

## On-Page SEO — 58/100 (derived)
Rolled up from Technical + Content findings. **Strong:** unique titles/meta descriptions per page, clean URLs, correct canonicals, full OG/Twitter tags. **Weak:** identical H2 across 10 pages, no internal linking depth beyond nav, no FAQ headings on vertical pages, thin heading hierarchy driven by the shared template.

## Schema / Structured Data — 72/100
Full detail: `SCHEMA-REPORT.md` (pre-existing in repo, not re-audited in depth per instructions). Server-rendered `ProfessionalService` + `OfferCatalog`/`Service`/`Offer` JSON-LD is valid, no deprecated types. Missing: `image`/`logo`, `sameAs`, `address`, and — per SXO — no `FAQPage` on any page, no `Review`/`AggregateRating`, no `LocalBusiness`/`GeoCoordinates` despite `areaServed: "RS"`. Note per current guidance: do **not** add `FAQPage` schema expecting a Google SERP benefit (retired May 2026) — any FAQ expansion should be framed as prose/content-structure work.

## Performance (Core Web Vitals) — 94/100 (lab only)
Findings: [findings/performance.md](findings/performance.md)

No CrUX field data available (no Google API key). Lab results (Lighthouse, mobile, 3 pages): LCP 2.0–2.4s (Pass), CLS 0.03–0.07 (Pass), TBT 20–50ms (Pass, INP proxy only — field INP unmeasured). TTFB excellent (67–184ms) with Brotli + Netlify edge caching confirmed working.
**High:** Chat widget script (~1,340ms) and duplicate Google Fonts + Bunny Fonts loading (~1,418ms + 685ms) are the two largest render-blocking costs.
**Medium:** Oversized `logo-mark.png` (19.6KB waste); ~17KB unused CSS per page; short 4-hour cache lifetime on third-party widget assets.

## Images — 70/100 (derived)
Hero images correctly sized with explicit `width`/`height` (good CLS practice) but gated behind CSR. `logo-mark.png` is the one clear waste (95% of its bytes unnecessary). No broader alt-text or format audit was run as a standalone pass; no other issues surfaced across the specialist reviews.

## Visual / Mobile
Findings: [findings/visual.md](findings/visual.md) · Screenshots: `screenshots/`

Value proposition is clear above the fold on both desktop and mobile, on both homepage and vertical page tested. Primary/secondary CTAs meet touch-target minimums. **Medium:** homepage mobile hamburger icon's visible glyph measures ~54×39px, under the 48px guideline on the height axis — verify true tap-target size in a real browser. **Low:** large empty top margin on desktop hero (spacing choice, not a defect).

## AI Search Readiness (GEO) — 34/100
Findings: [findings/geo.md](findings/geo.md)

Platform estimates: Google AI Overviews ~30, ChatGPT ~15, Perplexity ~15, Bing Copilot ~25 — the gap versus Google is explained almost entirely by the CSR issue, not content quality. robots.txt is clean (no AI-bot blocks). `/llms.txt` missing (404). No passage on the site reaches the ~134–167-word citable-passage length. Zero external brand/entity signals (no YouTube/Reddit/LinkedIn/press). **The single highest-leverage fix for this entire category is the same Critical #1 fix already required for Technical.**

## Search Experience (SXO)
Findings: [findings/sxo.md](findings/sxo.md)

**Primary finding:** product-claim vs. SERP-intent mismatch (Top Issue #2). SXO Gap Score: niche pages 38/100, homepage 47/100. Persona scores: skeptical small-business owner 55/100, comparison-shopper 47/100 — both weakest on Trust (no testimonials/logos/reviews anywhere) and, for the comparison-shopper, Clarity (no pricing, no feature/integration list, no competitor contrast).

## Backlinks
Findings: [findings/backlinks.md](findings/backlinks.md)

Tier 0 only (no Moz/Bing keys). aplory.dev does not yet appear in Common Crawl's web graph — expected for a domain live only since ~January 2026, not a penalty signal. Backlink Health Score reported as **insufficient data**, not a misleading 0/100. A prioritized Serbian-market link-building plan (directories, Startit.rs/Netokracija/Bizlife press outreach, Product Hunt/SaaSHub/Capterra listings, SMB association partnerships) is included in the findings file.

---

## Artifacts

- Findings detail: `findings/technical.md`, `findings/content.md`, `findings/performance.md`, `findings/visual.md`, `findings/geo.md`, `findings/sxo.md`, `findings/backlinks.md`
- Screenshots: `screenshots/homepage-desktop.png`, `screenshots/homepage-mobile.png`, `screenshots/stomatolozi-desktop.png`, `screenshots/stomatolozi-mobile.png`
- Structured data envelope: `audit-data.json`
- Action plan: `ACTION-PLAN.md`
- Pre-existing schema report (not re-audited): `../SCHEMA-REPORT.md`
