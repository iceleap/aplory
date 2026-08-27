# Action Plan — aplory.dev

Dependency note: **Phase 1, Item 1 (prerendering)** unblocks the most other work — it is the shared root cause behind the Technical, Content-extractability, and GEO score caps. Sequence it first even though it's the highest-effort item, because several later items (verifying tap targets in a real DOM, IndexNow submission of "real" content, IndexNow benefit for AI crawlers) are more valuable once it ships.

## Phase 1: Critical Fixes (Week 1)

1. **Add prerendering/SSG for the 11 CSR routes** (homepage + 9 vertical pages + `sta-radimo.html`) so each `dist/*.html` ships fully rendered markup, not an empty `<div id="root">`. Use a Vite-compatible prerender plugin or a build-time `react-dom/server`/headless-render step; React can still hydrate on top. Verify post-fix with `curl <url> | grep -c "<h1"` for every sitemap URL.
   *How would we know this failed?* Re-run `curl https://aplory.dev/<page> | grep root` — if `<div id="root"></div>` is still empty, the fix didn't ship.
   *Leading indicator:* GSC "Crawled — currently not indexed" / "Discovered — not indexed" counts should drop once configured; monitor via Search Console (not yet connected — see Phase 4).

2. **Resolve the voice-vs-text product-claim mismatch** on all 9 vertical pages. Either (a) rewrite hero/pain copy to lead explicitly with the text-based value prop ("kad ne stignete da se javite, klijent odmah dobije poruku"), or (b) accelerate the voice-agent feature before spending further on this keyword cluster. This is a product/positioning decision as much as an SEO one — flag to the founder, not just fix silently.
   *How would we know this failed?* User research / support tickets citing "thought it would answer the phone" would persist; bounce rate on niche pages (once analytics exist) stays high on first visit.

3. **De-duplicate the H2 across all 10 pages** — write a distinct, vertical-specific problem-framing headline per niche page (pain-card bodies already provide the raw material).
   *How would we know this failed?* `grep -r "Poziv na koji niko ne odgovori" src/` should return at most one match after the fix.

## Phase 2: High-Impact Improvements (Weeks 2–3)

4. **Defer/lazy-load the LeadConnector chat widget script** (largest render-blocking resource, ~1,340ms). Load after `window.load` or on scroll/interaction.
5. **Consolidate font loading to one provider** (Google Fonts *or* Bunny Fonts, not both) and consider self-hosting given the toolchain already self-hosts `AdwaitaSans.woff2`.
6. **Add security headers** via `netlify.toml` `[[headers]]` (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/CSP scoped to allow the chat-widget/font origins, `Permissions-Policy`) and strengthen HSTS with `includeSubDomains; preload`.
7. **Add an About/Company section** — founder name(s), physical address (already exists buried in legal pages — surface it), and company registration number (PIB/matični broj).
8. **Add 3–5 vertical-specific FAQ entries per niche page** — pricing model for that trade, relevant integration, and (for `advokati.html`/`stomatolozi.html`) a data-handling/confidentiality reassurance, mirroring the homepage's existing legal-citation FAQ. Frame as prose content, not `FAQPage` schema (Google retired the FAQ rich result in May 2026 — no SERP benefit to the markup itself).
9. **Reformat the "62% of missed calls" stat** into a single, fully attributed sentence and disclose it's a 2016, 85-company U.S. study — or replace with Serbia-relevant data once available.
10. **Publish `/llms.txt`** with a plain-text summary of what APLORY is, who it serves, and links to key pages.

## Phase 3: Content & Authority (Month 2)

11. **Localize the "How it works" 3-step copy per vertical** instead of the identical sitewide text.
12. **Expand `sta-radimo.html`** with mechanism/SLA/data-handling depth — currently restates homepage copy rather than going deeper.
13. **Add directional trust proof** — at minimum a client count or a single quote per vertical; closes the largest Trust gap identified for both SXO personas (skeptical owner 55/100, comparison-shopper 47/100).
14. **Publish minimal pricing/packaging** (or an explicit "free assessment call" framing) so comparison-shoppers can self-qualify before the lead form.
15. **Add expanded 134–167-word citable paragraphs** (legal-compliance answer, a synthesizing "how it works" paragraph) as prose — the optimal length for AI-answer-engine extraction.
16. **Compress `logo-mark.png`** to WebP/AVIF at correct dimensions (19.6KB of 20.9KB is currently wasted).
17. **Purge unused CSS** (~17KB/page) — verify Tailwind `content` globs cover all 15 entry points; consider per-route CSS chunking.
18. **Begin Serbian-market link-building**: Startit.rs/Netokracija/Bizlife press pitch, Product Hunt/SaaSHub/Capterra listings, PKS/business-directory registrations, NALED/coworking-space partnerships.
19. **Add `Organization` schema with `sameAs`** (social profiles), `image`/`logo`, and `address` to the existing `ProfessionalService` JSON-LD (see `SCHEMA-REPORT.md`).

## Phase 4: Monitoring & Iteration (Ongoing)

20. **Connect Google Search Console + a PageSpeed Insights API key** — no Google API credentials are configured in this environment, so indexation status, field CWV (CrUX), and search performance are currently invisible. This is the single highest-value monitoring gap: it directly validates whether Phase 1 Item 1 (prerendering) actually improved indexing.
21. **Add a free Moz API key** (2,500 rows/month) to move backlink tracking from Tier 0 (insufficient data) to Tier 1, so link-building progress (Phase 3 Item 18) can be measured.
22. **Verify the mobile hamburger menu's true tap-target size** with `getBoundingClientRect()` in a real browser/DevTools session (pixel-scan estimate was ~54×39px, borderline).
23. **Re-run this audit** (`/seo audit https://aplory.dev/`) after Phase 1–2 land to confirm the Technical, GEO, and Content scores move as expected.
24. **Set an SEO drift baseline** (`/seo drift baseline https://aplory.dev/`) once Phase 1 ships, to catch regressions on future deploys automatically.
