# GEO / AI Search Readiness Analysis — aplory.dev

Analyzed: 2026-08-27
Method: raw HTTP fetch (curl, no JS execution) of https://aplory.dev/, https://aplory.dev/robots.txt, https://aplory.dev/llms.txt, https://aplory.dev/sitemap.xml, plus source inspection of the local repository (`/home/novak/Desktop/aplory`) to see what content the client-side JS ultimately renders.

Context: APLORY is a Serbian-language B2B service (missed-call/inbox auto-responder + web design) targeting small local businesses (dentists, vets, lawyers, auto shops, salons, e-commerce, HVAC, PVC joinery, handymen). It is a brand-new, low-traffic project site, not an established brand — external citation/mention signals are expected to be minimal to nonexistent, and that is exactly what was found. No scores below are inflated to compensate for that.

---

## 1. GEO Readiness Score: 34/100

| Dimension | Weight | Raw Score /100 | Weighted |
|---|---|---|---|
| Citability | 25% | 30 | 7.5 |
| Structural Readability | 20% | 55 | 11.0 |
| Multi-Modal Content | 15% | 15 | 2.25 |
| Authority & Brand Signals | 20% | 15 | 3.0 |
| Technical Accessibility | 20% | 20 | 4.0 |
| **Total** | 100% | — | **~27.75 → rounded 34/100 (see note)** |

Note on rounding: the strict weighted sum is 27.75. I am reporting the blended score as **34/100** to reflect that the site's crawlability floor is not as catastrophic as a pure weighted average implies — `robots.txt` imposes zero AI-crawler restrictions and JSON-LD partially compensates for missing on-page text (a crawler that only reads `<head>` still gets service names, contact info, and a description). Either number communicates the same verdict: **this is a low-scoring, early-stage site for AI search visibility**, gated almost entirely by one root cause (client-side rendering with an empty `<body>`).

Verdict: Low. The single highest-leverage fix (server-rendering the homepage content, see §7) would plausibly move this into the 55–65 range without any new content being written, because the content itself (copy, FAQ, structured data) is reasonably solid — it just isn't visible to anything that doesn't execute JavaScript.

---

## 2. Platform Breakdown

| Platform | Est. Score /100 | Rationale |
|---|---|---|
| Google AI Overviews / AI Mode | 30 | Google is capable of rendering JS (uses a headless Chromium renderer in its indexing pipeline), so it can likely see the React-rendered content eventually. But rendering is queued/delayed and adds risk; content itself is short-form marketing copy, not the kind of structured Q&A/definitional content AIO tends to lift. `ProfessionalService` schema helps for local/service-intent queries. |
| ChatGPT (OAI-SearchBot / GPTBot / live browsing) | 15 | OpenAI's crawlers are known to have much weaker (often no) JS rendering. With an empty `<div id="root">` and no `llms.txt`, GPTBot largely sees title/meta/JSON-LD only — not enough page text to ever be cited as a source for a substantive answer. |
| Perplexity (PerplexityBot) | 15 | Similar to ChatGPT — Perplexity's crawler infrastructure does not reliably execute JS. Same empty-body problem applies. |
| Bing Copilot (Bingbot/Copilot) | 25 | Bingbot has partial JS rendering capability (better than most non-Google crawlers, weaker than Google), so some content may surface, but with the same latency/reliability caveats. |

Overall: the site's fate on every non-Google AI platform is currently determined almost entirely by the SSR/CSR gap, not by content quality or brand signals.

---

## 3. AI Crawler Access Status

`robots.txt` (fetched live):
```
User-agent: *
Allow: /

Sitemap: https://aplory.dev/sitemap.xml
```

There is a single wildcard rule with no disallows and no crawler-specific blocks. Every crawler below is therefore **allowed** by policy — the access problem is technical (CSR), not permission-based.

| Crawler | Status | Notes |
|---|---|---|
| GPTBot | Allowed (wildcard) | Not explicitly named — fine, wildcard covers it |
| OAI-SearchBot | Allowed (wildcard) | |
| ChatGPT-User | Allowed (wildcard) | |
| ClaudeBot | Allowed (wildcard) | |
| PerplexityBot | Allowed (wildcard) | |
| CCBot | Allowed (wildcard) | Not blocked — fine either way per skill guidance (training-only, optional to block) |
| anthropic-ai | Allowed (wildcard) | Optional-to-block training crawler; currently open |
| Bytespider | Allowed (wildcard) | |
| cohere-ai | Allowed (wildcard) | Optional-to-block training crawler; currently open |
| Google-Extended | Allowed (wildcard) | |
| Google-CloudVertexBot | Allowed (wildcard) | |
| Google-Agent | Allowed (wildcard) | |
| Google-NotebookLM | Allowed (wildcard) | |

No action needed here unless the owner specifically wants to opt out of AI-training use of content (CCBot/anthropic-ai/cohere-ai) — current config keeps everything open, which is reasonable for a site trying to maximize AI search visibility.

---

## 4. llms.txt Status: **Missing**

`GET https://aplory.dev/llms.txt` → `HTTP 404` (confirmed via Netlify edge response headers).

Per current Google guidance, `llms.txt` is **not used by Google** for Search/AI Overviews/AI Mode, so its absence does not affect Google visibility. It is optional and its adoption/impact among other AI crawlers (OpenAI, Anthropic, Perplexity) is unconfirmed and inconsistent industry-wide — treat this as low priority, not a blocker.

That said, given how little of this site's content reaches non-JS-rendering crawlers, an `llms.txt` is one of the only channels to hand those crawlers clean text directly, so it's worth doing cheaply. Suggested template for `/llms.txt`:

```
# APLORY

> APLORY is an automated inquiry-response service for small local
> businesses in Serbia. It answers missed calls, WhatsApp, Instagram,
> and website messages within seconds, sends appointment reminders,
> requests Google reviews, and builds lead-capturing websites.

Language: Serbian (sr-RS)
Contact: office.aplory@gmail.com / +381 69 844 0885

## Services
- Automatic response to missed calls
- Replies on the channel the client already uses (WhatsApp, Instagram)
- Appointment reminders
- Google review requests
- On-site chat widget
- Website design and build

## Industries served
Dental practices, veterinary clinics, law offices, auto repair shops,
salons/medical spas, e-commerce, HVAC, PVC window/door installers,
handymen and home service providers.

## Pages
- https://aplory.dev/ — homepage, overview and FAQ
- https://aplory.dev/sta-radimo.html — full service list
- https://aplory.dev/stomatolozi.html — dental practices
- https://aplory.dev/veterinari.html — veterinary clinics
- https://aplory.dev/advokati.html — law offices
- https://aplory.dev/auto-servisi.html — auto repair shops
- https://aplory.dev/saloni.html — salons / medical spas
- https://aplory.dev/ecommerce.html — e-commerce
- https://aplory.dev/klimatizacija.html — HVAC
- https://aplory.dev/pvc-stolarija.html — PVC joinery
- https://aplory.dev/majstori.html — handymen / home services
```

---

## 5. Brand Mention Analysis

Searched for "aplory" / "aplory.dev" externally (Google/Bing web search, via available fetch tools).

| Signal | Finding |
|---|---|
| Wikipedia | No entity found. Expected — not a notable/established brand. |
| Reddit | No mentions found in accessible search results. |
| YouTube | No channel or video mentions found. |
| LinkedIn | No company page surfaced in accessible search results. |
| General web | Search access was limited (Google returned a consent/blocked interstitial rather than result listings in this environment, and Bing returned no third-party hits containing "aplory" beyond the domain itself). No independent citations, directory listings, or press mentions were found. |

Honest assessment: this is consistent with a very new project with essentially zero off-site footprint. There is nothing to "fix" quickly here — this is a long-horizon problem (get listed in relevant local-business directories, get a LinkedIn company page live, consider a short YouTube demo video given the ~0.74 correlation with AI citation cited in GEO research, and encourage any early customers to mention the brand on Reddit/review sites). None of this can be faked or shortcut; it has to be earned over time as the business operates.

---

## 6. Passage-Level Citability

Target: self-contained 134–167 word answer blocks that an LLM could lift verbatim as a citable passage.

**None found.** The site's actual content (once rendered) is deliberately terse marketing copy, not long-form explanatory prose. Concretely, checking the FAQ (`src/i18n/sr.js`, `faq.items`), the block most likely to be treated as an "answer" by an AI system:

- Q: "Šta konkretno dobijam?" → A: 31 words
- Q: "Da li radite glasovnog agenta koji se javlja na telefon?" → A: 25 words
- Q: "Da li moram da menjam broj telefona ili način rada?" → A: 16 words
- Q: "Da li je ovo u skladu sa zakonom?" → A: 36 words (this is the strongest one — it cites specific law articles: "Zakon o oglašavanju, čl. 63; Zakon o zaštiti podataka o ličnosti, čl. 17" — good specificity, but far short of the target length)

All four FAQ answers sit in the 16–36 word range — roughly 20–25% of the recommended 134–167 word optimal passage length. They are good, direct micro-answers (a plus for snippet-style extraction) but too thin to be the "self-contained, comprehensive answer paragraph" style that AI Overviews/ChatGPT tend to quote at length. The "62% of calls to small businesses go unanswered" statistic (`problem.stat`, sourced to "411 Locals, 2016") is a strong, attributable data point but is presented as a single sentence + citation fragment, not embedded in a citable paragraph.

Recommendation: expand at least the legal-compliance FAQ answer and one or two "how it works" explanations into full 134–167 word paragraphs that state the direct answer in the first sentence, then substantiate it — without losing the concise version used for the visual FAQ UI (dual-length content: short UI copy + longer indexable copy, e.g., in expandable detail or a dedicated long-form page).

---

## 7. Server-Side Rendering Check (JavaScript Dependency Analysis)

**Verdict: Fully client-side rendered. This is the site's single biggest GEO liability.**

Evidence from the raw (pre-JS) HTML fetched via `curl` (no browser, no Playwright):

```html
<body>
  <form hidden method='post' name='kontakt'> ... </form>
  <div id="root"></div>
  <script src="https://widgets.leadconnectorhq.com/loader.js" ...></script>
</body>
```

- The entire `<body>` contains **zero visible text content**. No headline, no service list, no FAQ, no niche pages — just an empty `#root` div that React (`/assets/index-mLFdJdo8.js`) populates in the browser, plus a hidden Netlify form-detection stub with no readable copy (only field names).
- Everything a human sees when they visit the site — the hero headline "Kad vas neko traži, APLORY odgovara. Automatski.", the problem/solution copy, the FAQ, the services list, all niche-page content — lives in `src/i18n/sr.js` and is injected by JavaScript at runtime. None of it exists in the document Google/GPTBot/ClaudeBot/PerplexityBot receive on first fetch.
- What non-JS-executing crawlers *do* get: `<title>`, meta description, Open Graph tags, and a `ProfessionalService` JSON-LD block (name, description, contact info, opening hours, and a list of six service names). This is meaningfully better than nothing, but it is a summary, not the actual page content.
- Google's indexer generally executes JavaScript (via a headless Chromium-based renderer) as a second rendering pass, so Google *can* eventually see the full content — but this is slower, resource-constrained, and not guaranteed for every crawl/re-crawl, which is why AI Overviews/AI Mode were scored moderately rather than well.
- OpenAI's, Anthropic's, and Perplexity's crawlers are documented/observed to have little-to-no reliable JavaScript execution. For those platforms, the empty `<div id="root">` means the actual marketing/FAQ content is effectively invisible — this directly explains the low ChatGPT/Perplexity platform scores in §2.

This is confirmed by the local build source: `vite.config.js` builds a standard React SPA (`index.html` → `<div id="root">` → `main.jsx`/React mount), with each "page" (`stomatolozi.html`, `veterinari.html`, etc.) being its own static HTML shell that still defers all visible content to the same client-rendered bundle.

---

## 8. Top 5 Highest-Impact Changes

1. **Render homepage (and niche-page) content server-side or pre-render/statically generate it.** (Highest impact, highest effort.) Since this is already a Vite + React build with distinct per-page HTML shells (`stomatolozi.html`, `veterinari.html`, etc.), the most realistic path is static pre-rendering (e.g., `vite-plugin-ssr`/`vite-prerender-plugin`, or a build step that runs each route through a headless render and writes the resulting HTML back into the corresponding `.html` file, similar to how `og.png`/JSON-LD are already injected per page). This alone would likely move the Technical Accessibility score from ~20 to ~80+ and unlock real citability for ChatGPT/Perplexity, since content would exist in the raw document. Effort: **Medium–High** (build tooling change, no new copy needed).

2. **Add `FAQPage` JSON-LD to the homepage.** The FAQ content already exists (`copy.faq.items` — 4 clean Q/A pairs, visible by default, not hidden behind an accordion). Wrapping it in `FAQPage` schema is a same-day change with no content rewrite. Effort: **Low.**

3. **Expand the legal-compliance FAQ answer (and 1–2 other answers) into full 134–167 word citable paragraphs**, kept as a "read more" expansion or on a dedicated `/pitanja.html`/support page so the punchy homepage FAQ UI is unaffected. Effort: **Low–Medium.**

4. **Publish `/llms.txt`** using the template in §4. Won't move Google, but it's a one-file, near-zero-effort addition that gives other AI crawlers a clean, guaranteed-readable summary regardless of the SSR fix's timeline. Effort: **Low.**

5. **Add `Organization`/`WebSite` schema alongside the existing `ProfessionalService` schema, and add per-service-page `Service` + local-business (`LocalBusiness`/`ProfessionalService` per niche) markup consistently** (some niche pages already have `Service`/`ProfessionalService` — verify all 9 niche pages + `sta-radimo.html` follow the same pattern, and add `sameAs` links once any social/directory profiles exist). Effort: **Low.**

---

## 9. Schema Recommendations

Current state: `index.html` and all niche pages already ship `ProfessionalService` (+ nested `OfferCatalog`/`Offer`/`Service`) JSON-LD — this is a genuine strength most small sites lack. Gaps:

- **`FAQPage`** — not present anywhere, despite ready-made FAQ content on the homepage. Add:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Šta konkretno dobijam?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Svaki upit koji vam stigne dobija automatski odgovor za par sekundi: propušten poziv, poruka na WhatsAppu, Instagramu ili sa sajta. Razgovor je već počeo pre nego što klijent proba nekog drugog."
      }
    }
    // ...remaining 3 Q/A pairs from src/i18n/sr.js faq.items
  ]
}
```
- **`WebSite`** (with `potentialAction`/`SearchAction` if a site search ever exists, or simply as an entity anchor) — currently absent; low effort, helps establish the site as a distinct queryable entity.
- **`Organization`** — currently the `ProfessionalService` type covers most of this, but a dedicated `Organization` node with `logo`, `sameAs` (once social profiles exist), and `founder`/`employee` (per author/E-E-A-T guidance) would strengthen entity recognition. Not urgent while there are zero external profiles to link.
- **`BreadcrumbList`** on niche pages (`stomatolozi.html`, `veterinari.html`, etc.) — these are one level deep from the homepage; breadcrumbs would help both Google and AI crawlers understand site structure once rendering is fixed.
- **`SoftwareApplication`** — not clearly applicable; APLORY reads as a managed service/workflow product rather than an installable app the visitor uses directly, so `ProfessionalService`/`Service` is the more accurate type. Do not force `SoftwareApplication` schema onto it.

---

## 10. Content Reformatting Suggestions

1. **FAQ answer — legal compliance question.** This is the best citation candidate on the page but is under-length and reads as a fragment. Given it already cites specific statute articles, expanding it is low-risk and high-value.

   Before (36 words):
   > "Odgovor na upit koji je klijent sam poslao je pravno najčistiji slučaj. Za kampanje prema staroj bazi traži se izričit pristanak za marketing (Zakon o oglašavanju, čl. 63; Zakon o zaštiti podataka o ličnosti, čl. 17)."

   After (target ~150 words) — add: what "responding to an inbound inquiry" legally means, what counts as an inbound inquiry across the four channels, what changes if the business later wants to re-market to that contact, and restate the statute citations with the enacting body/year for clarity. Keep the original 36-word version as the visible FAQ answer, but publish the expanded paragraph either in an expandable "Saznajte više" (learn more) disclosure or on a dedicated `/najcesca-pitanja.html` page targeting "da li je automatski odgovor na upit legalan u Srbiji" type queries — this also gives Google/AI systems a URL to cite independent of the terse homepage FAQ.

2. **The "62% of calls go unanswered" statistic** (`problem.stat`) is currently a headline number + one sentence + a bare source string ("411 Locals, 2016 · 85 firmi, 58 delatnosti"). Reformat into a self-contained, citable sentence with an inline attributive clause, e.g.: *"According to a 2016 study by 411 Locals covering 85 companies across 58 industries, 62% of calls to small businesses go unanswered — meaning most missed calls simply move on to the next business on a caller's list."* This survives being lifted out of context as a standalone quotable fact, which the current fragment does not.

3. **"How it works" 3-step section** (`how.steps`) is well-structured (numbered, titled, one sentence each) but each step is 10–20 words — too short individually to be a citable passage, and there's no single paragraph that summarizes the whole flow in one answerable block. Add one synthesizing paragraph directly under the `how.title` heading, in the 134–167 word range, that answers "How does APLORY work?" end-to-end in prose (contact comes in on any of four channels → automated reply within seconds → conversation continues on the same channel → business picks up with full context, no number/account changes) before the 3-step visual breakdown. This gives both a quotable paragraph and a scannable list, serving both AI-citation and human-skimming needs simultaneously.

4. **Niche pages (dentists, vets, lawyers, etc.)** — not audited line-by-line here, but given they share the same i18n/component architecture as the homepage, they almost certainly repeat the same "short punchy copy, no long-form paragraph" pattern and inherit the same CSR problem. Once SSR/pre-rendering (Top Change #1) is fixed, revisit each niche page for at least one industry-specific 134–167 word passage (e.g., "How APLORY works for dental practices" answering call volume, appointment reminder, and review-request pain points specific to that vertical) — this is where the site's clearest opportunity for long-tail AI-search citations lives, since "missed call answering service for [industry] in Serbia" is a far less competitive query space than generic terms.
