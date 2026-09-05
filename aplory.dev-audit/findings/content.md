# Content Quality / E-E-A-T / AI Citation Audit — aplory.dev

**Update (this pass):** the previous version of this file (mtime ~Aug 27) was
written against the pre-prerendering build, when `index.html` and all niche
pages shipped an empty `<div id="root">` and the real copy only existed after
client-side React hydration. That is no longer accurate. `vite.ssr.config.js`
+ `scripts/prerender.mjs` now bake full rendered HTML into every route at
build time, and both `dist/*.html` and a live `curl` of `https://aplory.dev/`
confirm the complete hero copy, headings, nav, FAQ Q&As, and JSON-LD are
present in the raw served HTML — not just after JS execution. This pass
re-reads `dist/*.html` (the actual shipped output) and the current
`src/data/niches.js` / `src/pages/NicheLanding.jsx` source, not the older
assumptions. Several of the prior Critical findings have genuinely been
fixed; one new, non-obvious issue (authored content that is silently never
rendered) was found in their place.

Scope: `dist/index.html`, `dist/sta-radimo.html`, and the 9 vertical landing
pages (stomatolozi, veterinari, advokati, auto-servisi, saloni, ecommerce,
klimatizacija, pvc-stolarija, majstori), cross-checked against
`src/data/niches.js`, `src/pages/NicheLanding.jsx`,
`src/components/niche/NicheCapabilities.jsx`, `src/components/Faq.jsx`,
`src/data/research.js`, `politika-privatnosti.html`, `uslovi-koriscenja.html`.

**Content Quality Score: 63 / 100** (up from 42 in the prior pass — the two
prior Critical findings, no FAQ on niche pages and a duplicate H2 across all
10 pages, are both fixed.)

**Verdict:** the 9 vertical pages are no longer thin, near-duplicate
templates. Each niche now has a distinct H2 problem statement
(`painTitle`), a distinct "what you get" capability list (4–7 items,
genuinely specific to that trade — dosage of hitnost/urgency triage for
vets and locksmiths, confidentiality framing for lawyers, stock-accuracy
caveats for e-commerce), a distinct 6-message demo conversation, and 4–6
vertical-specific FAQ entries wrapped in `FAQPage` JSON-LD. Rendered word
counts (measured from `dist/*.html`, tags stripped) run **781–869 words**
for 8 of the 9 verticals and **622 words** for `stomatolozi.html`, against
homepage **581 words** and `sta-radimo.html` at a thin **196 words**. That
puts most vertical pages close to, but still under, the ~800-word
service-page topical-coverage floor once shared nav/footer/contact
boilerplate (~90–100 words) is subtracted. The remaining duplication is
now limited to the "How it works" 3-step explainer (see High finding below)
rather than the whole page skeleton.

---

## High

- **No About/company/team page and no visible entity trust signals in
  primary navigation or footer.** `Header.jsx`/`Contact.jsx` (which doubles
  as the footer) still expose only `office.aplory@gmail.com` (a personal
  Gmail address, not a branded domain address) and a mobile number. No
  founder identity, headcount, years-in-business, client logos,
  testimonials, or third-party recognition appears anywhere on
  `index.html`, `sta-radimo.html`, or any vertical page. Unchanged from the
  prior audit. For a service asking small businesses to route their
  calls/WhatsApp/Instagram through it, this remains a real
  Trustworthiness/Authoritativeness gap under the Sept 2025 QRG.
  - Fix: add an About/Company page or expand `sta-radimo.html` with
    founder name(s), and surface the company's registration details and
    physical address (see next finding) outside the legal boilerplate.

- **No company registration number (PIB/matični broj) disclosed anywhere**,
  on any page or in either legal document reviewed. Still absent. This is a
  standard trust checkpoint for a commercial Serbian service and its
  absence undermines Trustworthiness for both human buyers and QRG-style
  evaluation.
  - Fix: add PIB/MB to the footer and/or legal pages.

## Medium

- **Core statistic is still a decade-old, 85-company U.S. sample, though it
  is disclosed reasonably well.** The rendered homepage text reads: "62%
  poziva ka malim firmama ne dobije odgovor. 411 Locals, 2016 (SAD) · 85
  firmi, 58 delatnosti — orijentacioni podatak, nema ekvivalentno
  istraživanje za Srbiju." That is a genuinely honest treatment — the stat
  is attributed, dated, sample-sized, and explicitly flagged as not
  equivalent to Serbian data, all in the same visible sentence rather than
  a buried footnote — which is better practice than most sites manage with
  a single load-bearing statistic. It is not rated Critical/High for that
  reason. It remains a residual risk, though: it is still the site's single
  most prominent proof point, still 10 years old, still a small (85-company)
  sample, and still non-Serbian, and an AI answer engine paraphrasing this
  page could easily drop the disclaimer clause and mis-cite it as "62% of
  Serbian small-business calls go unanswered."
  - Fix: keep the current disclosure, but treat it as a placeholder to
    replace with Serbia/Balkans-relevant data or the company's own
    aggregated client data once available, as `research.js`'s own code
    comments already intend.

- **"How it works" 3-step explainer is still 100% identical across all 9
  vertical pages and the homepage.** Confirmed byte-for-byte identical text
  ("01 Klijent vas kontaktira... 02 APLORY odmah odgovori... 03 Termin
  zakazan...") in `dist/stomatolozi.html`, `dist/veterinari.html`, and
  `dist/advokati.html`. This is the one remaining significant duplicate
  block across pages (the H2 problem statement and demo transcript are now
  unique per page, per the fix already applied). With the rest of the page
  now differentiated, this is a smaller problem than before but still worth
  fixing.
  - Fix: localize at least the three step bodies per vertical, as previously
    recommended.

- **`sta-radimo.html` is thin and shallow relative to its role.** Rendered
  word count is 196 words including nav/footer/contact-form boilerplate —
  effectively a bulleted restatement of the six services already listed on
  the homepage's `hasOfferCatalog` schema, with no added depth on
  mechanism (how the number/account "handoff" technically works without
  porting), onboarding steps, SLAs/response-time commitments, or data
  retention. This is exactly the kind of factual depth a prospective buyer
  and an AI citation engine would want, and it's still missing sitewide.
  - Fix: expand with genuine mechanism/SLA/data-handling detail.

- **`stomatolozi.html` (622 rendered words) is now the outlier, not the
  template.** Every other niche picked up a rendered `proof` block and a
  wider capabilities list (6–7 items vs. stomatolozi's 4), leaving it
  visibly the shortest of the 9 vertical pages.
  - Fix: bring `stomatolozi` up to parity with the capabilities-list depth
    the other 8 niches now have.

## Low / Info

- **FAQPage schema exists on the homepage and, now, on every niche page**
  — a genuine improvement over the prior audit's finding. Confirmed
  `"@type": "FAQPage"` present in `dist/index.html` and `dist/veterinari.html`
  head blocks, generated from the same `faq` arrays rendered visibly in the
  page body (so schema and visible content match, which is what Google's
  guidelines require).
  - **Flagging as Info, not a fix item:** Google retired FAQ rich results
    for all sites in May 2026. Keep the schema — it's harmless, correctly
    matches on-page content, and costs nothing — but don't expect a SERP
    rich-result benefit from it, and don't assume it confers any confirmed
    AI/LLM citation advantage either; no such benefit is established, only
    a plausible structural-clarity upside for machine parsers in general.
- **`llms.txt` exists at the site root** (`dist/llms.txt`) with a plain-text
  summary of what APLORY does, what it explicitly doesn't do yet (the
  missing voice agent — the same honest admission that appears in the
  homepage FAQ), the target verticals, and a page list with one-line
  descriptions. This is a positive, low-cost AI-citation-readiness signal;
  keep it in sync with `niches.js` slugs/titles as pages change.
  - Prior GEO/schema audits (`GEO-ANALYSIS.md`, `SCHEMA-REPORT.md`, both
    dated 2026-08-27) assessed the pre-prerendering CSR build and concluded
    the site was near-invisible to non-Google AI crawlers because of an
    empty `<body>`. That root cause is now fixed (see the update note at
    the top of this file); those two documents should be treated as
    historical, not current, and ideally re-run or annotated as
    superseded.
- **Readability remains good.** Short sentences, concrete second-person
  scenarios ("Ruke su vam pod haubom," "Bušilica u ruci ne dozvoljava da
  podignete telefon"), plain language appropriate for a small-business
  owner audience. No change needed.
- **Demo chat transcripts remain a genuine positive Experience/AI-citation
  signal** — plausible, industry-specific 6-message exchanges (dentist
  tooth pain, vet vomiting cat, mechanic asking Golf 7 year, PVC installer
  discussing a measurement visit) that read as authored from real domain
  knowledge rather than generic filler.
- **No Organization/`sameAs` schema and no `address`/`image` on the
  `ProfessionalService` block** (confirmed still absent from
  `dist/index.html`'s JSON-LD) — unchanged from the prior schema audit's
  Info-level findings; low-cost authoritativeness upside if social/business
  profile URLs exist to link.
- Physical address (`Alekse Dundića 61, Valjevo, Srbija`) and a
  freshness date ("Poslednje ažurirano: 21. avgust 2026") still exist only
  inside `politika-privatnosti.html` / `uslovi-koriscenja.html` legal body
  text, not in the footer, an About page, or any JSON-LD `address` field.
  No blog, changelog, or other dated editorial content exists elsewhere to
  demonstrate ongoing freshness/expertise.
- `openingHoursSpecification` in the homepage schema still claims
  00:00–23:59, all 7 days — worth double-checking that this accurately
  reflects an always-on automated response, since an inaccurate
  "always available" claim on an answering-service product is a
  credibility risk if a query actually goes unanswered.

---

## E-E-A-T Breakdown (internal scoring model)

| Factor | Weight | Score /100 | Notes |
|---|---|---|---|
| Experience | 20% | 55 | Demo transcripts and the rendered ROI ("Računica") figures show real domain familiarity with each trade; still no founder story, real client examples, or product screenshots. |
| Expertise | 25% | 45 | Vertical-specific capability lists and FAQ answers (e.g. correctly distinguishing "APLORY doesn't diagnose/prescribe/give legal advice" per niche) show applied understanding of each trade's constraints; still no author/expert bylines or credentialing of who built this. |
| Authoritativeness | 25% | 35 | Still no external citations of APLORY (press, reviews, case studies, client logos), no linked social/business profiles, no third-party recognition. |
| Trustworthiness | 30% | 55 | Honest, disclosed stat sourcing; candid FAQ admission about the unfinished voice-agent feature (repeated consistently in both the homepage FAQ and `llms.txt`); FAQPage schema matches visible content. Still missing: PIB/registration number, visible address/About page, and a branded (non-Gmail) contact address. |
| **Weighted E-E-A-T** | | **47** | Up from 37 — driven mainly by Trustworthiness and Expertise gains; Authoritativeness is the largest remaining gap. |

## AI Citation Readiness Score: 58 / 100

- **Positive, and the single biggest change since the prior pass:** all
  page content, FAQ Q&As, and JSON-LD are now present in the raw served
  HTML (prerendered), not gated behind JS execution — this alone was the
  root cause the prior GEO audit scored at 34/100, and it is fixed.
  `llms.txt` gives crawlers/agents an explicit, structured summary.
  `FAQPage` schema is present and matches visible content on 10 of 11
  pages. Vertical-specific FAQ answers are short, declarative, and
  individually quotable (e.g. "Ne postavlja dijagnozu kvara... pravu
  dijagnozu daje mehaničar na pregledu").
- **Negative:** the "How it works" boilerplate remains identical across
  pages, which still gives an LLM reason to treat the 9 verticals as one
  templated source rather than 9 distinct authorities; no dated/freshness
  signal outside the legal pages; no Organization/`sameAs` entity graph;
  and `stomatolozi`, the one niche without a `proof` block, still misses
  out on the richest, most numeric, most citation-friendly content the
  other 8 niche pages carry.

## Priority Fix List

1. Write a matching `proof` ("Računica") block for `stomatolozi` so it
   reaches parity with the other 8 niches — the field and rendering already
   exist, this is copy-only. (High)
2. Add an About/Company section with founder identity, PIB/registration
   number, and the physical address currently buried only in legal
   boilerplate. (High)
3. Localize the "How it works" 3-step copy per vertical instead of reusing
   identical text across all 10 pages. (Medium)
4. Expand `sta-radimo.html` with mechanism/SLA/data-handling depth. (Medium)
5. Bring `stomatolozi.html`'s capability list up to the same depth as the
   other 8 niches. (Medium)
6. Keep the 62% stat's existing disclosure as-is for now, but replace it
   with Serbia-relevant or first-party client data when available. (Medium)
7. Keep `FAQPage` schema on all pages (it's correctly implemented and
   costs nothing) but don't expect a SERP rich-result benefit from it —
   FAQ rich results were retired for all sites in May 2026 — and don't
   claim a confirmed AI/LLM citation benefit either. (Info)
