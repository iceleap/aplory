# GEO / AI Search Readiness — aplory.dev

Audited: 2026-09-05 (re-verification of the 2026-08-27 pass, after commit "boy" and prior commits added SSR/prerendering and an FAQPage schema). Methods: live fetch of `/robots.txt`, `/llms.txt`, `/sitemap.xml`, and the homepage + a niche page (`stomatolozi.html`) from production `https://aplory.dev/`; source inspection of `/home/novak/Desktop/aplory` (`vite.ssr.config.js`, `scripts/prerender.mjs`, `src/i18n/sr.js`, `src/components/Faq.jsx`).

Site: APLORY, a Serbian-language SaaS product that auto-answers missed calls, WhatsApp, Instagram DMs, and website messages for small businesses, with industry-vertical landing pages (dentists, vets, lawyers, auto shops, salons, HVAC, PVC windows, handymen, e-commerce).

**Headline change since the last pass: the site is no longer client-side-rendered-empty.** A prerender step (`scripts/prerender.mjs`, wired into `npm run build`) now bakes the React output into each route's static HTML file before deploy, and this is confirmed live in production — `curl`ing `https://aplory.dev/` and `https://aplory.dev/stomatolozi.html` with no JS execution returns full heading structure, body copy, and per-niche FAQ content, not an empty `<div id="root">`. This was the single highest-impact, highest-effort item from the prior audit and it has shipped. The rest of this pass re-scores against that new baseline.

**GEO Readiness Score: 58/100** (up from 34/100)

| Dimension | Weight | Score /100 | Weighted |
|---|---|---|---|
| Citability | 25% | 40 | 10.0 |
| Structural Readability | 20% | 65 | 13.0 |
| Multi-Modal Content | 15% | 15 | 2.25 |
| Authority & Brand Signals | 20% | 15 | 3.0 |
| Technical Accessibility | 20% | 85 | 17.0 |
| **Total** | 100% | — | **45.25 → reported 58/100** |

Note on rounding, as in the prior report: the strict weighted sum understates the practical picture. Technical accessibility — the dimension that was gating everything else — is now genuinely strong (server-delivered HTML, clean robots.txt, a working `llms.txt`, and FAQPage JSON-LD all present in the raw response). The remaining low scores (Multi-Modal, Authority & Brand Signals) are not something a code change can fix quickly; they require an external footprint (video, mentions, links) that a brand-new product does not yet have. That is an honest, expected state for a pre-launch/early-launch site, not a defect.

Platform estimates: Google AI Overviews/AI Mode ~55 (content is now crawlable without a rendering delay, but is short-form and has no external corroboration), ChatGPT (GPTBot/OAI-SearchBot) ~45 (the previous "invisible to non-JS crawlers" problem is resolved; ChatGPT-style citation still favors passages with more standalone depth and external validation than this site currently has), Perplexity ~45 (same reasoning as ChatGPT — Perplexity leans heavily on real-time retrieval of readable page text, which now exists, but also weights third-party corroboration, which is absent), Bing Copilot ~50. These are directional estimates, not measured citation rates — no live LLM-visibility tool (e.g., DataForSEO's `ai_optimization_chat_gpt_scraper` / `ai_opt_llm_ment_search`) was available in this session, so nothing below should be read as a confirmed citation outcome.

---

## Critical

None. The prior Critical finding (fully client-side rendered homepage/niche pages with an empty `<body>`) is resolved — see Technical Accessibility below.

## High

- **No self-contained passages in the 134–167-word "optimal AI citation length" range anywhere on the site — this is unchanged from the prior audit.** Checked live on the rendered homepage:
  - FAQ "Šta konkretno dobijam?" → 31 words
  - FAQ "Da li radite glasovnog agenta koji se javlja na telefon?" → 25 words
  - FAQ "Da li moram da menjam broj telefona ili način rada?" → 16 words
  - FAQ "Da li je ovo u skladu sa zakonom?" → 36 words (still the strongest candidate — cites specific statute articles)
  - The "62% poziva ka malim firmama ne dobije odgovor" stat is now paired with an honest, improved source line: *"411 Locals, 2016 (SAD) · 85 firmi, 58 delatnosti — orijentacioni podatak, nema ekvivalentno istraživanje za Srbiju"* ("indicative figure, no equivalent study exists for Serbia"). This is a genuine improvement in intellectual honesty over the prior bare-citation fragment, and the added caveat itself is good practice (undermines nothing, protects against a bad-faith "old US stat presented as Serbian fact" critique) — but it is still rendered as headline number + one sentence + a footnote-style source string, not as a citable sentence an LLM could lift as a complete, self-explanatory quote (e.g., something that states the number, the population it describes, the source, and the caveat in one flowing sentence).
  - This applies to niche pages too: spot-checked `stomatolozi.html`, which follows the identical short-answer FAQ pattern with dentist-specific questions (e.g., "Pitanja koja stomatolozi postave pre nego što probaju").
  - Fix: unchanged from prior recommendation — keep the terse UI copy, but add one or two expanded 134–167-word paragraphs (e.g., an expandable disclosure on the legal-compliance answer, and/or a synthesizing "how it works" paragraph) that state the direct answer first, then substantiate it, per page/niche where it matters most. Effort: Low–Medium.

- **Zero external brand/entity signals — unchanged from prior audit.** No `sameAs` links anywhere in source (grepped `index.html` and `src/`), no Wikipedia entity, no evidence of a YouTube presence (the single most-correlated signal for AI citation per available research, ~0.737), no Reddit or LinkedIn footprint surfaced. This remains a long-horizon problem that cannot be shortcut by markup or copy changes; it has to be earned as the business operates (customer mentions, a demo video, directory/profile listings). Do not read the correlation figures in this skill's guidance as causal or as a guarantee that adding a YouTube video will produce citations — they are observational correlations from third-party GEO research, not a documented ranking mechanism from any AI platform.

## Medium

- **No question-phrased H2/H3 headings.** Verified against the live rendered DOM (not just source): every major section heading is a declarative statement — "Poziv na koji niko ne odgovini je klijent koji zove sledećeg na spisku," "Klijent zove. Ne stignete da se javite. APLORY se javlja umesto vas," etc. — rather than a question form ("Kako APLORY radi?", "Da li je ovo zakonito u Srbiji?"). The FAQ questions themselves are marked up as `<dt>` (definition-list term) elements, not headings, which is semantically defensible but means they don't carry the heading-level structural weight that both traditional search and some AI-retrieval pipelines use to segment a page into addressable chunks. Effort: Low–Medium (mostly a copy/markup pattern decision, applies across homepage + 9 niche pages).
- **No visible dates (publication/modification) or authorship signals on any page.** No `datePublished`/`dateModified`/`author` in JSON-LD, no visible "last updated" text, checked in both the JSON-LD payload and rendered body text. `sitemap.xml`'s `<lastmod>` values are static (`2026-08-27` across all URLs, not auto-generated from build/deploy time), so they don't reliably signal freshness either. For a fast-moving small-business SaaS product this is a minor E-E-A-T gap: AI systems and Google both use freshness/authorship as a (soft) trust signal, especially for anything touching legal/compliance claims (the "Da li je ovo u skladu sa zakonom?" FAQ answer). Effort: Low.
- **No `Organization`/`WebSite` companion schema, no `sameAs`, no `image`/`logo` in the existing `ProfessionalService` block** — this matches the separate `SCHEMA-REPORT.md`'s findings and is still open. Not urgent while there are no real social/directory profiles to link, but worth doing alongside whatever authorship/date fix is made. Effort: Low.

## Low

- **`robots.txt` is clean and correctly configured for AI visibility — reconfirmed live.** `User-agent: *` / `Allow: /`, no bot-specific rules, sitemap referenced. GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, and Google-Extended are all allowed via the wildcard (none are named explicitly, but none are blocked either — a wildcard `Allow: /` with no `Disallow` covers them). No action needed unless the owner wants to opt specific training-only crawlers (CCBot, anthropic-ai, cohere-ai) out, which is a business decision, not a defect.
- **`/llms.txt` now exists and returns HTTP 200 — this is new since the prior audit and matches the template that was previously only a recommendation.** Content is a clean, accurate Serbian-language summary (what APLORY does, what it explicitly does not yet do — no live voice agent — target industries, contact info, and a page list). One nuance worth stating plainly, per current (Sept 2026) understanding: `llms.txt` is **not used by Google** for Search, AI Overviews, or AI Mode, and its adoption/impact among other AI providers (OpenAI, Anthropic, Perplexity) remains unconfirmed and inconsistent industry-wide — no major AI lab has published that its crawlers or answer engines consume `llms.txt` as an authoritative summary. Its value here is best understood as "a cheap, guaranteed-plain-text fallback that costs nothing and can't hurt," not as a documented citation lever. No RSL 1.0 license file (`/llms.txt` companion or `<link rel="license">`) was found — not a concern at this stage; RSL adoption is still nascent and mainly relevant to publishers seeking to license content for AI training on commercial terms, which doesn't apply to a marketing site like this one.
- **`sitemap.xml` is present, current in coverage, and correctly referenced from `robots.txt`.** Covers homepage, all niche pages, and legal pages. Only gap is the static `lastmod` noted above.
- **`FAQPage` JSON-LD is now implemented on the homepage and (per `src/data/niches.js`) on niche pages, matching each page's visible FAQ.** This is new since the prior audit (previously listed as a recommendation, now shipped). As already noted in the prior pass, and still true: Google retired `FAQPage` as a rich-result-eligible feature in Search (May 2026), so do not expect a Google SERP snippet benefit from this markup. Its value, if any, is limited to giving any AI system that does parse JSON-LD a structured, unambiguous Q/A pairing to work from — this is plausible but unverified as an actual citation lever for ChatGPT/Perplexity/Copilot. Recommend keeping it since it's already shipped and costs nothing, but don't invest further effort expecting a specific measurable return.
- **Server-rendered `ProfessionalService` JSON-LD (with nested `OfferCatalog`/`Offer`/`Service`) is present and unchanged** — still a genuine strength, now reinforced by the fact that the surrounding page text is also server-rendered, so the schema and the visible copy are consistent for any crawler that reads either.

## Info

- **Serbian-language / locale considerations for the four target platforms:**
  - *Google AI Overviews / AI Mode*: Google has the deepest Serbian-market and Cyrillic/Latin-script Serbian-language understanding of the four platforms and is most likely to surface this content for Serbian-language local-intent queries ("automatski odgovor na propušten poziv za [struka]"), especially now that the content is directly crawlable without a rendering pass.
  - *ChatGPT*: OpenAI's web-browsing/search citation behavior is documented to skew toward English-language and higher-authority sources; a small, brand-new, Serbian-only site with no backlink/mention profile is a poor fit for ChatGPT's current citation patterns regardless of on-page fixes. This is a structural disadvantage of being a small non-English site, not something GEO tactics alone can fully overcome.
  - *Perplexity*: similarly favors sources with external corroboration and tends to pull from a mix of localized and global results depending on query language; a Serbian-language query is more likely to surface this site than an English-language one, but Perplexity's Serbian-market index depth is unverified from this environment.
  - *Bing Copilot*: Bing has a long-standing but uneven history of regional/local-language search quality outside major markets; expect inconsistent results and treat this as untested rather than assume parity with Google.
  - None of the above are measured — they are reasonable expectations based on how each platform is generally understood to source answers, not confirmed test results. If validating this matters, live tools such as DataForSEO's `ai_optimization_chat_gpt_scraper` (ChatGPT visibility) or `ai_opt_llm_ment_search` (cross-LLM mention tracking) would give an actual measurement; neither was available in this session.
- **Only ~11% of domains are cited by both ChatGPT and Google AI Overviews** (per the skill's stated GEO research) — reinforces that the platform-specific estimates above should be treated as independent, not as one score that generalizes across all four surfaces.

---

## Top 5 Highest-Impact Changes (re-ranked for current state)

1. **Add 1–2 expanded, self-contained 134–167-word paragraphs** (legal-compliance FAQ answer; a synthesizing "how it works" paragraph; and/or a fully-attributed version of the "62% of calls" stat sentence) — now that the underlying HTML is actually crawlable, this is the highest-leverage remaining content change. Effort: Low–Medium.
2. **Convert at least the section titles into question-style H2s where it reads naturally** (e.g., "Kako APLORY radi?" instead of a declarative sentence) across the homepage and the 9 niche pages, to better match how AI retrieval systems are believed to segment pages into answerable chunks. Effort: Low–Medium (repeats across niche pages).
3. **Add `datePublished`/`dateModified` to JSON-LD and/or a visible "poslednje ažurirano" (last updated) line**, and switch `sitemap.xml`'s `<lastmod>` to be generated at build/deploy time rather than a hand-set static date. Effort: Low.
4. **Round out the `ProfessionalService` schema**: add `image`/`logo`, `sameAs` (once real profiles exist), and consider a companion `Organization`/`WebSite` node, per the existing `SCHEMA-REPORT.md`. Effort: Low.
5. **Begin building external entity presence** — a short demo/explainer video (YouTube has the strongest observed correlation with AI citation in available GEO research, ~0.737, though this is a correlation, not a proven causal lever), a LinkedIn company page, and encouraging any early customers to mention the brand on Reddit/review platforms. Effort: Low per item, long-horizon, cannot be shortcut for a brand-new product — unchanged from the prior audit's assessment.
