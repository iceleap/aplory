# Content Quality / E-E-A-T / AI Citation Audit — aplory.dev

Scope: index.html, sta-radimo.html, and the 9 vertical landing pages (stomatolozi,
veterinari, advokati, auto-servisi, saloni, ecommerce, klimatizacija,
pvc-stolarija, majstori). Source reviewed directly (Vite/React, one static HTML
shell + JS entry per route): `src/data/niches.js`, `src/pages/NicheLanding.jsx`,
`src/components/niche/*`, `src/i18n/sr.js`, `src/data/research.js`,
`politika-privatnosti.html`, `uslovi-koriscenja.html`.

**Content Quality Score: 42 / 100**

**Verdict on the 9 vertical pages: template-driven thin content, not genuine
unique pages.** Each page is produced by the same `NicheLanding.jsx` component
(`NicheHeader → NicheHero → NichePain → NicheHow → Contact`) fed by one entry
in `src/data/niches.js`. The genuinely unique text per vertical is small —
one hero title, one hero lede, three short "pain" cards, and a 6-line demo
chat transcript — roughly **150–200 unique words per page**. Everything else
(section eyebrows, the "How it works" 3-step explainer, the FAQ-free page
skeleton, the contact form, the footer, and — critically — **the exact same
H2 headline, "Poziv na koji niko ne odgovori je klijent koji zove sledećeg na
spisku."**, word-for-word identical across all 9 vertical pages and the
homepage's Problem section) is boilerplate repeated verbatim. This is the
classic programmatic-SEO thin/near-duplicate pattern: distinct URLs and meta
tags, but a shared skeleton wrapped around a small swapped-out payload, well
under any reasonable topical-coverage floor for a service page (~800 words).
The differentiation that exists (pain points and demo dialogue) is well
written and plausibly industry-specific, but there is no genuinely deep,
vertical-specific content anywhere (no pricing nuance, no integration/booking
system specifics, no compliance notes, no FAQ, no case study, no testimonial)
that would justify each page as a standalone comprehensive resource on its
topic.

---

## Critical

- **No FAQ / Q&A content on any of the 9 vertical pages.** `NicheLanding.jsx`
  renders `NicheHeader, NicheHero, NichePain, NicheHow, Contact` — the `Faq`
  component only appears on the homepage. Vertical pages have zero
  structured, quotable Q&A content, which is the single highest-value format
  for both featured snippets and LLM citation extraction. Combined with thin
  unique word count, these pages have almost nothing an AI answer engine or
  Google could confidently extract and attribute as vertical-specific
  expertise.
  - Fix: add 3–5 vertical-specific FAQ entries per page (pricing model for
    that trade, integration with the booking/scheduling tools that vertical
    actually uses, data/compliance question relevant to that industry — e.g.
    patient data handling for `stomatolozi.html`/`veterinari.html`, legal
    privilege for `advokati.html`), marked up with `FAQPage` schema.

- **Exact duplicate H2 across 10 pages.** `NichePain.jsx` hardcodes the string
  `"Poziv na koji niko ne odgovori je klijent koji zove sledećeg na spisku."`
  as the section heading on every one of the 9 niche pages, and
  `src/i18n/sr.js` (`problem.title`) uses the identical sentence on the
  homepage. This is literal duplicate content in the single most
  SEO-weighted on-page element (H2) across 10 URLs.
  - Fix: write a distinct, vertical-specific H2 for each niche page (the
    pain-card bodies already exist as good raw material — mirror that level
    of specificity in the heading).

## High

- **No About/company/team page and no visible entity trust signals anywhere
  in the primary navigation or footer.** `Header.jsx` and `Contact.jsx`
  (which doubles as the footer) expose only an email (`office.aplory@gmail.com`
  — a personal Gmail address, not a branded domain address) and a mobile
  number. There is no team bio, founder identity, headcount, years-in-business,
  client logos, testimonials, case studies, or third-party recognition
  anywhere on index.html, sta-radimo.html, or any vertical page. For a SaaS
  product asking small businesses to route their calls/WhatsApp/Instagram
  through it, this is a significant Trustworthiness and Authoritativeness gap
  under the Sept 2025 QRG (which weights "who is behind this and can they be
  trusted with my business" heavily for YMYL-adjacent commercial services).
  - Fix: add an About/Company page (or expand `sta-radimo.html`) with founder
    name(s)/photo, company registration details, and the physical address
    that currently exists only inside `politika-privatnosti.html` /
    `uslovi-koriscenja.html` ("Alekse Dundića 61, Valjevo, Srbija") — surface
    it in the footer and/or a dedicated contact page, not just buried in the
    legal boilerplate.

- **No company registration number (PIB/matični broj) disclosed anywhere**,
  including in the legal pages reviewed. Serbian consumers/B2B buyers and
  quality raters alike look for this on a commercial site; its absence
  undermines Trustworthiness for both users and QRG-style evaluation.
  - Fix: add PIB/MB to the footer and/or legal pages.

- **Primary statistic is old, small-sample, and market-mismatched, presented
  as the site's core value proposition.** The 62% headline stat
  (`problem.stat` in `src/i18n/sr.js`, rendered in `Problem.jsx`) is sourced
  to "411 Locals, 2016 · 85 firmi, 58 delatnosti" — a 2016 U.S. study of 85
  companies — used to argue a claim about Serbian small businesses without
  any disclosure that the underlying data is not Serbian or current. The
  source is at least cited with a visible `<cite>` element and a working
  source URL in `research.js` (`https://411locals.us/...`), which is better
  practice than an unsourced stat, but a decade-old, 85-company U.S. sample
  as *the* evidentiary anchor for a Serbian SaaS pitch is a real E-E-A-T/trust
  risk if scrutinized, and is exactly the kind of stat an AI answer engine
  could mis-cite as "62% of Serbian business calls go unanswered."
  - Fix: either (a) commission/cite a Serbia- or Balkans-relevant data point,
    (b) explicitly label the stat as a U.S. benchmark ("prema istraživanju u
    SAD..." ) rather than letting it read as a universal/local fact, or (c)
    replace with the company's own aggregated client data once available
    (the code comments in `research.js` already flag this as the intended
    long-term fix — do it before it's cited elsewhere as fact).

## Medium

- **"How it works" explainer is 100% identical across all 9 vertical pages
  and the homepage.** `NicheHow.jsx` pulls its eyebrow, section title, mock
  captions and all three numbered steps directly from the shared
  `sr.js how.*` object — nothing here is niche-specific except the demo chat
  transcript and the missed-call label. This compounds the duplicate-H2
  issue: readers/bots landing on any two vertical pages will see near-
  identical page structure with only a small swapped payload.
  - Fix: localize at least the three step bodies per vertical (e.g. what
    "termin zakazan" means concretely for a locksmith vs. a dentist vs. an
    e-commerce store).

- **Unused/undisplayed secondary stats risk becoming a future dead-source
  problem.** `research.js` defines HBR 2011 (23%, 42h) and MIT/InsideSales
  2007 (21×) benchmarks with a comment stating "the copy that renders them
  says so explicitly" — but no current component in `src/components/`
  actually imports or renders `benchmarks`. If these are reintroduced later
  without the disclosed "US samples" caveat mentioned in the code comment
  actually appearing in visible copy, they'd repeat the same mismatch issue
  as the 62% stat, and today they're 15–19 years old.
  - Fix: either remove the dead data file or, if reintroduced, keep the
    US-sample disclosure in the actual rendered `sr.js` copy (currently it
    only exists as a code comment, not user-facing text).

- **No FAQPage / QAPage structured data despite having FAQ content on the
  homepage.** The homepage FAQ (`sr.js faq.items`, 4 Q&As) is good, honest,
  specific content — notably it candidly states the voice-agent feature
  isn't ready yet ("Da li radite glasovnog agenta... Još ne.") which is a
  genuine positive trust/trustworthiness signal (rare, credible admission of
  a limitation) — but with no `FAQPage` JSON-LD, it's not eligible for FAQ
  rich results or as cleanly extractable structured data for AI answer
  engines.
  - Fix: add `FAQPage` schema wrapping the existing FAQ items; consider
    adding a short FAQ block to each vertical page too (see Critical, above).

- **Thin overall word count relative to search intent.** Estimated
  genuinely-unique body copy per vertical page is ~150–200 words (hero +
  3 pain cards + demo dialogue); total rendered page copy including shared
  boilerplate is still well under typical service-page comprehensiveness
  norms. `sta-radimo.html` ("what we do") is also short and largely restates
  homepage services copy rather than going deeper into how the service
  actually integrates with a business's existing number/WhatsApp/Instagram
  accounts, onboarding steps, SLAs, or data handling — all things a
  prospective buyer and an AI citation engine would want as extractable
  facts.
  - Fix: expand `sta-radimo.html` with a genuinely deeper explanation of
    the mechanism (how number/account porting-free "handoff" technically
    works), SLAs/response-time commitments, and data retention — all strong
    AI-citation-ready factual material that's currently missing sitewide.

## Low

- **Readability is generally good.** The Serbian copy across hero/pain/FAQ
  sections uses short sentences, concrete scenarios, and plain language
  (e.g. "Ruke su vam pod haubom," "Bušilica u ruci ne dozvoljava da podignete
  telefon") — appropriate for the small-business-owner audience and easy to
  skim. No readability issues to flag beyond the thinness of the content
  itself.
- **Demo chat transcripts are a genuine positive AI-citation/experience
  signal.** Each vertical's 6-message demo conversation (`niches.js`
  `demo.messages`) is specific and plausible for that trade (dentist
  discussing a toothache, vet discussing a vomiting cat, auto shop asking
  Golf 7 model year, PVC installer discussing measurement visits). This is
  the one piece of content on each page that reads as genuinely tailored
  rather than templated, and is exactly the kind of concrete, first-hand-
  feeling example that would help both human trust and AI extraction if it
  were paired with more surrounding factual depth.
- **Structured data present per page.** Each niche page carries a
  `Service`/`ProfessionalService` JSON-LD block with contact details and
  `areaServed: "RS"` — good baseline entity signal, though it would benefit
  from a matching `Organization` block on the homepage with `sameAs`/social
  profile links (none currently found) to reinforce authoritativeness.

## Info

- Physical address does exist (`Alekse Dundića 61, Valjevo, Srbija`) but is
  only present inside `politika-privatnosti.html` and `uslovi-koriscenja.html`
  legal body text — not in the footer, not on a Contact/About page, and not
  in any JSON-LD `address` field. Low-cost fix with meaningful trust upside.
- Contact channels are limited to one email + one mobile number
  (`Contact.jsx`); no live chat, no support hours beyond an
  `openingHoursSpecification` in JSON-LD claiming 24/7 (`Monday`–`Sunday`
  in `index.html`'s schema) — worth double-checking that 24/7 availability
  claim is accurate, since an inaccurate "always available" claim on an
  answering-service product is a credibility risk if a query actually goes
  unanswered.
- No blog, changelog, or content-freshness signal anywhere in the site
  structure (only `politika-privatnosti.html` carries a "Poslednje ažurirano"
  date: 21 August 2026). No dated, updated, or evergreen editorial content
  exists to demonstrate ongoing expertise/freshness for either Google or AI
  crawlers.

---

## E-E-A-T Breakdown (internal scoring model)

| Factor | Weight | Score /100 | Notes |
|---|---|---|---|
| Experience | 20% | 45 | Demo chat transcripts feel authentic and vertical-specific; no other first-hand signals (no founder story, no real client examples, no screenshots of the actual product/dashboard). |
| Expertise | 25% | 35 | No author/expert bylines anywhere; copy is confident and plausible but there's no credentialing (who built this, do they have call-center/CX/AI expertise) surfaced anywhere. |
| Authoritativeness | 25% | 30 | No external citations of APLORY (press, reviews, case studies, client logos), no social profiles linked, no third-party recognition of any kind. |
| Trustworthiness | 30% | 40 | Transparent, cited stat (rare positive); honest FAQ admission about the unfinished voice-agent feature (positive); but no company registration number, no visible physical address/About page, personal Gmail contact address, and a 2016/85-company U.S. stat used as the site's core proof point. |
| **Weighted E-E-A-T** | | **37** | |

## AI Citation Readiness Score: 30 / 100

- Positive: one clearly sourced, quotable statistic (62%, with citation) on
  the homepage; clean per-page JSON-LD; short declarative hero/pain
  sentences that are individually quotable.
- Negative: no FAQ/Q&A on 9 of 11 audited pages; no `FAQPage` schema anywhere;
  near-duplicate H2/structure across pages makes it hard for an LLM to treat
  each vertical page as a distinct authoritative source rather than
  boilerplate; no dated/freshness signals; no deeper factual content
  (SLAs, mechanism, data handling) that AI answer engines could extract as
  differentiated facts about APLORY specifically.

## Priority Fix List

1. Give each of the 9 vertical pages a unique H2/problem framing and at least
   3 vertical-specific FAQ entries with `FAQPage` schema. (Critical)
2. Add an About/Company section surfacing the founder(s), physical address,
   and business registration number; move the address out of legal-boilerplate-only. (High)
3. Re-anchor or caveat the 62% "62% of calls go unanswered" stat — it is the
   single most load-bearing trust claim on the site and rests on a 2016,
   85-company U.S. study. (High)
4. Localize the "How it works" step copy per vertical instead of reusing the
   identical three steps sitewide. (Medium)
5. Expand `sta-radimo.html` with mechanism/SLA/data-handling depth to give
   both users and AI systems more extractable factual substance. (Medium)
