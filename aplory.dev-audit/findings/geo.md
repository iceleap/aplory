# GEO / AI Search Readiness — aplory.dev

Audited: 2026-08-27. Methods: live fetch of `/robots.txt`, `/llms.txt`, `/sitemap.xml`; raw (pre-JS) HTML fetch of the homepage and niche pages; comparison against the built `dist/` output; source inspection of the Vite/React repo at `/home/novak/Desktop/aplory`.

Site: APLORY, a Serbian-language SaaS product that auto-answers missed calls, WhatsApp, Instagram DMs, and website messages for small businesses (dentists, vets, lawyers, auto shops, salons, e-commerce, HVAC, PVC joinery, handymen).

**GEO Readiness Score: 34/100**

| Dimension | Weight | Score /100 | Weighted |
|---|---|---|---|
| Citability | 25% | 30 | 7.5 |
| Structural Readability | 20% | 55 | 11.0 |
| Multi-Modal Content | 15% | 15 | 2.25 |
| Authority & Brand Signals | 20% | 15 | 3.0 |
| Technical Accessibility | 20% | 20 | 4.0 |

Platform estimates: Google AI Overviews/AI Mode ~30 (Google renders JS, but with delay/risk), ChatGPT (GPTBot/OAI-SearchBot) ~15, Perplexity ~15, Bing Copilot ~25. The gap between Google and everyone else is explained almost entirely by the technical-accessibility finding below, not by content quality or brand signals.

---

## Critical

- **Homepage and all niche pages are fully client-side rendered with an empty `<body>` in the document actually served.** Confirmed in both source (`index.html`) and the production build (`dist/index.html`): the raw HTML contains only a hidden Netlify form-detection stub and `<div id="root"></div>` — zero visible text, no headline, no FAQ, no service list. All real copy lives in `src/i18n/sr.js` and is injected by React (`main.jsx`) at runtime. OpenAI's, Anthropic's, and Perplexity's crawlers are documented to have little-to-no reliable JavaScript execution, so for those platforms the page is effectively text-empty on fetch. Google can eventually render it via its indexing pipeline, but that is delayed and not guaranteed on every crawl. This single issue caps every other dimension — content, schema, and FAQ quality are irrelevant to non-Google AI crawlers until it's fixed.
  - Fix: statically pre-render each route (the site is already built as distinct per-page HTML shells — `stomatolozi.html`, `veterinari.html`, etc. — so a build-time prerender step, e.g. `vite-prerender-plugin` or a headless-render-to-HTML step, is the most realistic path) so the shipped HTML contains the actual page text, not just an empty mount point. Effort: Medium–High.

## High

- **No `/llms.txt`.** `GET https://aplory.dev/llms.txt` returns HTTP 404 (falls through to the SPA's 404 page). This is optional and does not affect Google (Google does not use `llms.txt` for Search/AI Overviews/AI Mode), but given how little raw text non-JS-executing crawlers currently receive, it is one of very few channels available today to hand those crawlers a clean, guaranteed-readable summary of what APLORY is, who it serves, and where to find more. Effort: Low, same-day.
- **No long-form, self-contained citable passages anywhere on the site.** Optimal AI-citation passage length is ~134–167 words; every extractable answer block on the homepage falls well short:
  - FAQ "Šta konkretno dobijam?" → 31 words
  - FAQ "Da li radite glasovnog agenta koji se javlja na telefon?" → 25 words
  - FAQ "Da li moram da menjam broj telefona ili način rada?" → 16 words
  - FAQ "Da li je ovo u skladu sa zakonom?" → 36 words (best candidate — cites specific statute articles: Zakon o oglašavanju čl. 63; Zakon o zaštiti podataka o ličnosti čl. 17)
  - The "62% of missed calls" statistic (sourced to "411 Locals, 2016") is a strong, attributable data point but is presented as a bare fragment, not embedded in a citable sentence with full attribution.
  - Fix: keep the current terse copy for the visible UI, but add one or two expanded 134–167 word paragraphs (e.g., an expandable "Saznajte više" disclosure on the legal-compliance answer, and a synthesizing "how it works" paragraph before the 3-step visual breakdown) that state the direct answer first, then substantiate it. This is a content-structure recommendation, not a schema recommendation — do not add `FAQPage` structured data expecting a Google SERP benefit; that markup type was retired from Google's search features in May 2026 and has no ranking or rich-result value there. If a longer FAQ block improves how cleanly a passage can be lifted by an AI system reading page text, that value comes from the *prose itself* being self-contained and well-labeled with question-style headings, not from marking it up as `FAQPage` JSON-LD.
- **Zero external brand/entity signals.** No Wikipedia entity, no Reddit mentions, no YouTube presence (the single most-correlated signal for AI citation, ~0.737), no LinkedIn company page found in accessible search results. This is expected for a brand-new project and cannot be shortcut, but it is a real gap versus the correlation data: YouTube and Reddit presence correlate far more strongly with AI citation than domain authority does.

## Medium

- **Homepage FAQ and "how it works" content is direct and well-structured but too short to serve as a standalone answer block.** The 3-step "how it works" section is well-organized (numbered, titled, one sentence each) but has no single paragraph summarizing the full flow — a good candidate for one synthesizing 134–167 word paragraph placed above the visual steps.
- **No question-phrased H2/H3 headings confirmed in the rendered DOM** for sections other than the FAQ itself (source-level review; full heading audit was not run against the client-rendered DOM). Once pre-rendering ships, verify major sections use direct question-style headings (e.g., "Kako APLORY radi?", "Da li je ovo zakonito u Srbiji?") rather than generic labels, since this is a strong, low-cost citability lever once the underlying HTML is crawlable.
- **Niche pages (stomatolozi, veterinari, advokati, auto-servisi, saloni, ecommerce, klimatizacija, pvc-stolarija, majstori) inherit the same CSR problem and the same short-copy pattern** as the homepage — not audited line-by-line here (that would duplicate the homepage findings 9x), but each is a plausible long-tail citation target ("usluga za propuštene pozive za [industry] u Srbiji") once server-rendered and given at least one industry-specific citable paragraph.

## Low

- **`robots.txt` is clean and correctly configured for AI visibility.** `User-agent: *` / `Allow: /` with no bot-specific rules — GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, and all others (including training-only crawlers CCBot/anthropic-ai/cohere-ai) are currently unblocked. No action required unless the owner wants to opt specific training-only crawlers out, which is a business decision, not a GEO defect.
- **`sitemap.xml` is present, current, and correctly referenced from `robots.txt`**, covering the homepage and all niche/legal pages with reasonable `lastmod`/`priority` values.
- **Existing `ProfessionalService` JSON-LD is server-rendered (present in raw HTML, not JS-injected)** and gives non-JS crawlers a usable summary (name, description, contact, opening hours, six named services) even before the CSR fix — this is the main reason the site scores above a near-zero floor today. Full schema-quality audit is out of scope here (see separate schema review / `SCHEMA-REPORT.md`).

## Info

- **11% cross-platform citation overlap.** Only ~11% of domains are cited by both ChatGPT and Google AI Overviews — expect to need platform-specific tactics rather than one fix serving all four surfaces (Google AIO, ChatGPT, Perplexity, Bing Copilot). Given this site's near-total CSR dependency, the pre-render fix is nonetheless the one change that would move all four platforms simultaneously.
- **Top 5 highest-impact changes, ranked:**
  1. Statically pre-render homepage + niche pages so real content ships in the initial HTML response. Effort: Medium–High. Impact: unlocks everything else; likely moves Technical Accessibility from ~20 to ~80+.
  2. Publish `/llms.txt` with a clean plain-text summary of what APLORY is, who it serves, and page links. Effort: Low.
  3. Add 1–2 expanded 134–167 word citable paragraphs (legal-compliance answer, "how it works" summary) as prose content — not as `FAQPage` schema. Effort: Low–Medium.
  4. Reformat the "62% of missed calls" statistic into one self-contained, fully attributed sentence (study name, year, sample size, source) rather than a headline + bare citation fragment. Effort: Low.
  5. Build minimal external entity presence over time: a short demo/explainer video (YouTube has the strongest observed correlation with AI citation, ~0.737), a LinkedIn company page, and encouragement of early-customer mentions on Reddit/review platforms. Effort: Low per item, but long-horizon — cannot be shortcut for a brand-new site.
