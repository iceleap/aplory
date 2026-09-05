# SXO Audit — aplory.dev + vertical landing pages

**Date re-verified:** 2026-09-05 (supersedes the 2026-08-27 version of this file, which
was based on a source-code read, not a live fetch). This run re-fetched the live site
and diffed it against the current `src/` and `dist/` to confirm what actually ships.

**Rendering-mode correction (explicit confirmation):** The site is **not** a bare CSR
SPA. `scripts/prerender.mjs` bakes each route's React output into its `dist/*.html`
after `vite build` + `vite build --config vite.ssr.config.js`, replacing the empty
`<div id="root"></div>` shell with real markup so non-JS crawlers see full content.
Live verification: `claude-seo run render_page.py "https://aplory.dev/stomatolozi.html"
--mode auto --json` returned `"is_spa": false`, `"mode_used": "raw"` (Playwright was
never invoked — a raw fetch already contains everything), and the raw HTML byte-matches
`dist/stomatolozi.html`, including the full hero copy, all headings, the FAQ `<dl>`, and
both JSON-LD blocks. `parse_html.py` confirms real text/heading counts on the raw
document (H1: 1, H2: 5, Word Count: 606 for stomatolozi; 565 for the homepage). **None
of the findings below depend on a CSR assumption** — all content/UX/copy claims are
read from this live, fully-rendered HTML (cross-checked against `src/data/niches.js`
and `src/pages/NicheLanding.jsx` for the authoring intent behind it).

Scope: homepage (`index.html`) and the 9 vertical pages, with **homepage +
`stomatolozi.html` scored in depth** per the requested persona (skeptical small-business
owner). Method: live render + parse of both pages, source read of the shared template
(`NicheLanding.jsx`) and per-niche data (`niches.js`), and 4 live Serbian-language
Google searches via WebSearch (see §7 Limitations for what this does and doesn't cover).

---

## 1. Site architecture (as-is, current)

All 9 vertical pages share one template (`NicheHeader → NicheHero → Problem (3 pain
cards) → HowItWorks (chat-demo mock + 3 steps) → NicheCapabilities (4-7 "what you get"
cards) → Faq (per-niche, renders only if the niche defines it) → Contact`). The
homepage adds `ChannelFlow`/`Services`/`Niches` sections around the same skeleton.

**Correction to the prior audit's architecture claims** (both now demonstrably false
against the live/current site):
- *"No niche page has a FAQ; FAQs are homepage-only."* — False today. All 9 niches in
  `niches.js` define a `faq` array (4 Q&As each), and it renders with real `FAQPage`
  JSON-LD **on the niche page itself** — confirmed live: `stomatolozi.html`'s
  `structured_data` block includes `["Answer","FAQPage","Question"]` alongside
  `["ProfessionalService","Service"]`. This is a genuine, recent fix (see §6).
- *"No proof or ROI figures anywhere."* — Partially false. 7 of the 9 niches
  (veterinari, advokati, auto-servisi, saloni, ecommerce, klimatizacija,
  pvc-stolarija, majstori) now carry a `proof` block (a small, self-reported "how much
  a missed call costs you" arithmetic calculator with stated assumptions), rendered as
  the page's second section, right after the hero. **`stomatolozi.html` does not** —
  see §3, this is now the single most concrete, page-specific finding for the exact
  page requested for scoring.

Still true: no pricing, no testimonials/case studies/client logos, no third-party
review or press mention, on any of the 10 pages.

## 2. THE PRIMARY FINDING — SERP-type mismatch persists, but the internal honesty risk from the prior audit has been substantially fixed (HIGH, downgraded from CRITICAL)

Live SERP sampling (4 queries, see §7) confirms the Serbian query cluster for
"propušten poziv + automatski odgovor [struka]" is currently dominated by two distinct
competitor shapes, not one:

1. **Live voice-AI receptionist vendors** — Wisefox ("AI sekretarica koja se javlja na
   telefon umesto Vas"), Virtuelna Recepcija/"Olivija" (govori srpski, sluša pacijenta,
   upisuje termin glasom), VoiceFleet, 360Serbia, oneclick.rs voicebot — these promise
   the assistant **talks** to the caller. This is the shape the prior audit flagged.
2. **A direct text/SMS-based competitor that looks a lot like APLORY** —
   **Poziv.net** ("Automatski Odgovor na Propuštene Pozive") ranked in 3 of 4 sampled
   queries (dental, auto-servis, and the general query). It auto-sends an SMS/WhatsApp
   message on a missed call, lets the owner customize the message per business, and
   markets a 3-minute setup. This is functionally the closest same-mechanism competitor
   found in this sampling, and **no APLORY page names or differentiates against it, or
   against the "human answering service" alternative** — the SERP has a real text-based
   peer, but APLORY's copy only implicitly contrasts against silence/voicemail, never
   against another vendor.

**What changed since the last audit:** the copy no longer overclaims "javlja se na
telefon" (answers the phone). The homepage title is now "kad vas neko traži — APLORY
odgovara za vas" (responds), the stomatolozi meta description says "APLORY odmah
odgovara **porukom**" (with a message — explicit), and the stomatolozi FAQ now states
outright: *"Da li pacijent zna da ne piše sa nama lično? Da. Poruka jasno kaže da je
ordinacija trenutno zauzeta i da odgovara asistent."* This resolves the prior audit's
CRITICAL "expectation-mismatch / churn risk" framing — a visitor who reads past the
hero will not be misled about voice vs. text.

**What has not changed:** ranking exposure. The dominant SERP page type for this query
family is still commercial vendor pages built around voice, with case-study-style
numbers and 24/7 live-answer framing. APLORY's hero language ("APLORY odgovara na
propušten poziv... odmah") is close enough in surface phrasing to the voice vendors'
that a searcher skimming a SERP snippet cannot tell APLORY apart from them — the
disambiguation only happens once they're already on-page. That's a click-through/
positioning problem, not a deception problem: recommend making "odgovara porukom, ne
glasom" (or equivalent) visible in the **meta description and H1**, not just the FAQ,
so it differentiates in the SERP snippet itself, and naming the Poziv.net-style
alternative explicitly ("ne samo SMS obaveštenje — APLORY vodi razgovor i zakazuje")
to convert the category-confusion into a comparative advantage.

## 3. Page-type / page-specific findings

| Page | Live page type | SERP dominant type (sampled) | Mismatch |
|---|---|---|---|
| index.html | Commercial hybrid landing page (problem → mechanism → verticals → FAQ → contact) | Mixed: voice-AI vendor commercial pages + Poziv.net (text-based, direct peer) + informational blog posts (Wisefox "šta je AI sekretarica") | HIGH — no glossary/definitional content exists to capture the awareness-stage share of this SERP, and snippet-level copy doesn't yet disambiguate voice vs. text (§2) |
| **stomatolozi.html** | Commercial niche landing page, **structurally the thinnest of the 9 verticals** | Voice-AI vendors (Wisefox, Virtuelna Recepcija/Olivija) + dental-practice software (eStomatolog) + Poziv.net + a chatbot-agency competitor (chatbot.hr "Dentalni AI Asistent") | HIGH — same voice/text ambiguity as §2, **plus** this specific page is missing the `proof` (ROI arithmetic) section that all 8 other niches carry, despite being labeled the "pilot" niche in the source comments. It is the page requested for deep scoring and it is quantifiably the least-developed one in the set. |
| advokati.html | Same thin-plus-FAQ template | **Different SERP shape than the others**: individual law firms' own "Pitanja klijenata"/"Najčešća pitanja" pages rank alongside Poziv.net — not vendor tools. Legal buyers are met by competitors' own trust-building FAQ content, not other SaaS. | MEDIUM-HIGH — the competitive set here is law firms' own content depth and confidentiality language, not other automation vendors; APLORY's generic data-handling FAQ answer is thinner than what individual firms already publish about client confidentiality |
| auto-servisi, klimatizacija, pvc-stolarija, majstori | Same template | Local trade queries here likely surface Google Business Profiles/local pack (not independently re-verified this run — see Limitations) plus Wisefox/Poziv.net | MEDIUM — local-pack competition is a `/seo local` question, not addressed here |
| veterinari, saloni, ecommerce | Same template, all have a proof block (unlike stomatolozi) | Category-specific vendor/tooling competitors (Instagram-scheduling/chatbot tools for saloni/ecommerce) | MEDIUM — reasonably aligned; ecommerce SERP typically shows integration lists (Shopify/WhatsApp Business API) and pricing tiers that no APLORY page has |

## 4. User stories (derived from live SERP signals, ≥2 journey stages)

1. **"Is this a robot that talks, or one that texts back?"** (awareness → consideration).
   Signal: the SERP mixes voice-AI vendors (Wisefox, Olivija) with text/SMS vendors
   (Poziv.net) under the same query. APLORY's on-page FAQ answers this correctly now,
   but the **snippet-level copy** (title/meta/H1) doesn't state the mechanism, so the
   click-through decision is made without this information. Fix: put "porukom, ne
   pozivom" (or the equivalent) in the meta description/H1 pattern site-wide, not just
   in stomatolozi's meta.

2. **"Will my patient/client know it's not really me answering?"** (decision, trust).
   Signal: this is now a real, answered question — the stomatolozi FAQ item ("Da li
   pacijent zna da ne piše sa nama lično? Da.") is a good, specific, non-evasive answer.
   This story is *resolved* on stomatolozi/veterinari/advokati/etc. (wherever a `faq`
   block exists) but the same disclosure discipline should be checked against Poziv.net-
   style competitors that lead with "potpuno personalizovana poruka" — APLORY's answer
   is arguably more reassuring and could be surfaced higher, not buried at the bottom of
   the page.

3. **"What does this actually cost, and can I try before I commit staff time to it?"**
   (decision). Signal: every vendor surfaced in the SERP sample (Wisefox, Virtuelna
   Recepcija, Poziv.net, VoiceFleet) is a paid SaaS category where "3-minute setup" or
   trial framing is a normal claim. APLORY has zero pricing on any of its 10 pages, and
   the CTA is "Zakažite razgovor" (book a call) — a live phone number and WhatsApp are
   at least visible in the Contact section as a lower-friction fallback to the lead
   form, which is a real (previously under-credited) mitigation, but there's still no
   self-serve way to see cost or try the product.

4. **"Does this work for a business exactly like mine, and do others like me use it?"**
   (consideration). Signal: 9 genuinely differentiated verticals with credible,
   trade-specific pain copy (chat demo language reads as authentic, not templated) —
   but zero social proof (no client count, no logo, no quote) backs the vertical-fit
   claim on any page, and stomatolozi specifically lacks even the self-reported ROI
   arithmetic ("proof" block) that veterinari/advokati/etc. use as a stand-in for real
   testimonials.

5. **"As a lawyer, where exactly does my client's information go?"** (decision,
   advokati-specific). Signal: this vertical's real competitors are law firms' own
   "Pitanja klijenata" pages, which typically address confidentiality directly and at
   length because it's core to legal marketing. APLORY's advokati FAQ should be
   benchmarked against that bar specifically, not against SaaS competitors' FAQs.

## 5. Persona scoring (homepage + stomatolozi.html, skeptical small-business-owner lens)

### Persona A — Skeptical dentist/practice owner evaluating trust (25 pts/dimension)

| Dimension | Homepage | stomatolozi.html | Evidence |
|---|---|---|---|
| Relevance | 20/25 | 21/25 | Pain copy is trade-specific and credible on both; stomatolozi's chat demo ("Boli me zub gore levo") reads authentic, not generic |
| Clarity | 14/25 | 15/25 | Improved vs. prior audit: FAQ now explicitly states the assistant texts, not calls. Still capped because this disambiguation isn't visible until the visitor scrolls to the FAQ — the hero/meta don't state it |
| Trust | 9/25 | 8/25 | Improved vs. prior audit (was 6/25): per-page FAQ now answers "does the patient know," "does it give medical advice," "what data is collected" — real, specific, non-evasive answers, plus a visible phone/WhatsApp number for a human fallback. Still capped low: zero testimonials/reviews/client counts anywhere, and stomatolozi additionally lacks the ROI-arithmetic ("proof") block that 7 other niches use as partial trust-building |
| Action | 18/25 | 17/25 | Single clear primary CTA ("Zakažite razgovor") plus a real lower-friction path (phone/WhatsApp/email visible in Contact); multi-step lead form has a "Preskočite" (skip) escape hatch. Docked slightly because there's still no self-serve trial, demo video, or pricing to self-qualify before contacting |
| **Total** | **61/100** | **61/100** | Both improved materially from the 8/27 baseline (was 55 for the shared template); Trust is still the weakest dimension on both |

### Persona B — Comparison-shopper (vs. Poziv.net, a human answering service, or doing nothing)

| Dimension | Homepage | stomatolozi.html | Evidence |
|---|---|---|---|
| Relevance | 18/25 | 18/25 | Pain framing is right; no page names or contrasts against Poziv.net or any named alternative even though a near-identical mechanism competitor now surfaces in the same SERP |
| Clarity | 12/25 | 11/25 | No feature/integration list, no comparison table; stomatolozi's 4-item "what you get" list is shorter than the 7-item lists other niches carry |
| Trust | 9/25 | 7/25 | Same FAQ-driven improvement as Persona A, but no third-party proof; stomatolozi additionally missing the "proof" arithmetic block |
| Action | 14/25 | 13/25 | Phone/WhatsApp fallback helps, but no pricing means a comparison-shopper still cannot self-qualify against Poziv.net's or Wisefox's public claims before contacting |
| **Total** | **53/100** | **49/100** | Weakest: Clarity and Trust, tied |

**Priority order (weakest first): stomatolozi.html Persona B (49) → homepage Persona B
(53) → stomatolozi.html Persona A (61) ≈ homepage Persona A (61).**

Recommended fixes, in order of leverage:
1. Bring stomatolozi.html up to template parity — add the `proof` (ROI arithmetic)
   block the other 8 niches already have. This is a same-day content task (the field
   and rendering already exist; only stomatolozi's data object is missing it) and
   directly raises Trust and Content Depth on the exact page requested for this audit.
2. Move the voice-vs-text disambiguation up into meta description/H1 pattern site-wide,
   not just the on-page FAQ, so it differentiates in the SERP snippet itself (§2, §4.1).
3. Name the comparison explicitly at least once per page family ("ne samo SMS
   obaveštenje", "vs. da ništa ne radite", "vs. dodatna osoba na recepciji") — closes
   the Comparison-shopper Clarity gap.
4. Publish minimal pricing or an explicit "besplatna procena, bez obaveze" framing so
   Persona B can self-qualify before using the multi-step form or calling.
5. Add even one piece of directional third-party proof (client count, a single quote)
   — this is the largest remaining Trust gap for both personas and both pages.

## 6. Gap analysis (SXO Gap Score — distinct from SEO Health Score)

| Dimension | Homepage | stomatolozi.html | Evidence |
|---|---|---|---|
| Page Type (15) | 9/15 | 7/15 | Commercial-hybrid type is directionally aligned with the SERP's vendor pages, but thinner than the "case-study numbers" pattern those pages use; stomatolozi additionally lacks the proof section its siblings have |
| Content Depth (15) | 9/15 | 6/15 | Live word counts: homepage 565, stomatolozi 606 — but stomatolozi's count is inflated by boilerplate/form markup relative to siblings that carry an extra content section (proof) at similar or lower raw word counts |
| UX Signals (15) | 11/15 | 11/15 | Confirmed live: prerendered (no CSR flash), one primary CTA, a real phone/WhatsApp/email fallback, multi-step form with a skip option. No secondary asset (video/demo) |
| Schema (15) | 10/15 | 10/15 | Confirmed live via `structured_data`: `ProfessionalService`+`OfferCatalog` (home) / `ProfessionalService`+`Service` (niche), plus `FAQPage` on **both** — this closes the prior audit's biggest schema gap. Still missing `Review`/`AggregateRating` (no reviews exist to mark up yet), `address`/geo, and `sameAs`, per `SCHEMA-REPORT.md` |
| Media (15) | 7/15 | 6/15 | One hero photo + one animated chat-demo mock per page; no video, no dashboard/report screenshot, no client logos |
| Authority (15) | 3/15 | 2/15 | Zero testimonials, logos, press, or third-party mentions on any of the 10 pages |
| Freshness (10) | 4/10 | 4/10 | No dated content or last-updated signal visible to a visitor, despite active near-daily development in the git history — that velocity isn't surfaced anywhere on-page |
| **Total** | **53/100** | **46/100** | Both up from the 8/27 baseline (47/38) — largely driven by the FAQ/FAQPage schema rollout; stomatolozi remains the weakest of the 9 verticals specifically because it's missing the proof content its siblings have |

## 7. Limitations
- SERP sampling was 4 live WebSearch queries (general dental, general AI-recepcionar,
  auto-servis, advokat), not a full top-10 capture across all 9 verticals x all
  plausible query variants. The advokati-specific finding (individual law-firm content
  dominating that SERP, distinct from the vendor-dominated pattern elsewhere) is based
  on one query and should be treated as directional, not a measured top-10 pull.
- No Search Console/analytics access — current rankings, impressions, or actual
  bounce/conversion data for these pages could not be incorporated.
- Local-pack/Google Business Profile presence for the trade verticals (auto-servisi,
  klimatizacija, pvc-stolarija, majstori) was not independently re-verified this run;
  the MEDIUM rating in §3 for those pages is carried forward from category knowledge,
  not a fresh SERP pull — recommend `/seo local` as a follow-up.
- Rendering/CSR concern is resolved for this audit: verified live via
  `render_page.py --mode auto` (`is_spa: false`, raw fetch already contains full
  content) and cross-checked against `dist/*.html` and `scripts/prerender.mjs`. No
  finding in this file assumes an empty `<div id="root">`.
- Word counts are compared using `parse_html.py`'s raw-document parse; a discrepancy
  between similar word counts and differing perceived depth (see stomatolozi vs.
  siblings) is flagged qualitatively in §6 rather than re-measured section-by-section.

## 8. Cross-skill recommendations
- `/seo content` — write the missing `proof` block for stomatolozi.html to reach
  template parity with the other 8 niches; also draft snippet-level (meta/H1)
  voice-vs-text disambiguation copy for all 10 pages.
- `/seo schema` — the FAQPage rollout is a real win; next add `Review`/`AggregateRating`
  once testimonials exist, and `address`/`sameAs` per the existing `SCHEMA-REPORT.md`
  recommendations (not re-litigated in depth here since that audit already covers it).
- `/seo local` — auto-servisi, klimatizacija, pvc-stolarija, majstori, saloni target
  inherently local-service queries; GBP/local-pack competition was not freshly
  re-assessed here.
- `/seo page` — quantify the stomatolozi-vs-siblings content-depth gap precisely
  (word/section count diff) once the missing sections are drafted, to confirm parity.

Offer: Generate a PDF report? Use `/seo google report`.
