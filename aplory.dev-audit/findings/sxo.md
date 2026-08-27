# SXO Audit — aplory.dev + 9 vertical landing pages

Scope: homepage (`index.html`) and `stomatolozi.html`, `veterinari.html`, `advokati.html`,
`auto-servisi.html`, `saloni.html`, `ecommerce.html`, `klimatizacija.html`,
`pvc-stolarija.html`, `majstori.html`.

Method: source read (SPA, all pages share `src/pages/NicheLanding.jsx` template +
per-niche data in `src/data/niches.js`), Serbian-language Google SERP sampling via
WebSearch (2 queries; live SERP for the full 9-vertical x N-query matrix could not be
run exhaustively — see Limitations), and manual page-type classification.

---

## 1. Site architecture (as-is)

All 9 vertical pages are generated from one template with only copy swapped:
`NicheHeader → NicheHero → NichePain (3 pain points) → NicheHow (6-message chat demo +
3 steps) → Contact (lead form)`. No page has pricing, testimonials/case studies,
client logos, review schema, an FAQ, or a blog. The homepage adds `Problem`,
`ChannelFlow`, `Services`, `HowItWorks`, and one `Faq` section (4 Q&As) — but FAQs are
homepage-only, not repeated per vertical, and are not marked up as `FAQPage` schema.

Schema: homepage uses `ProfessionalService` + `OfferCatalog`; each niche page uses a
thin `Service` node with `provider: ProfessionalService`. No `AggregateRating`,
`Review`, `FAQPage`, or `LocalBusiness`/`GeoCoordinates` schema anywhere, despite the
product being explicitly local/Serbia-only (`areaServed: "RS"`).

## 2. THE PRIMARY FINDING — product-claim vs. SERP-intent mismatch (CRITICAL)

Every vertical page's hero and pain-point copy is written around **missed phone calls**
("Telefon zvoni dok ste u stolici", "propušten poziv") and implies the assistant
"answers" the caller. In reality, per the homepage FAQ itself:

> **"Da li radite glasovnog agenta koji se javlja na telefon?" → "Još ne."**
> (Do you have a voice agent that picks up the phone? — Not yet.)

APLORY does not answer live calls; it sends an automated text follow-up (SMS/WhatsApp/
Instagram) after a call is missed. But the Serbian SERP for the exact intent these
pages target ("automatski odgovor na propušten poziv [struka]", "AI recepcionar za
propuštene pozive Srbija") is now dominated by products that **do** answer the phone
with a live conversational voice agent — Wisefox ("AI sekretarica"), Virtuelna
Recepcija/"Olivija" (javlja se, sluša, zakazuje termin glasom), 360Serbia AI
Recepcionar, VoiceFleet. These are the exact page type Google is currently rewarding
for this query cluster: commercial vendor pages promising **voice** call-answering,
often with case-study numbers ("smanjen broj no-show sa 20% na 5%").

Because APLORY's messaging ("odgovara na poziv") reads as equivalent to those
voice-agent competitors but the product is text-only, this is not just an SEO gap —
it is an **expectation-mismatch risk**: a searcher who lands on `stomatolozi.html`
expecting "javlja se na telefon" will bounce (or convert and churn) once they discover
the assistant only texts back. Recommend either (a) rewriting hero copy to lead with
the text-based value prop explicitly ("kad ne stignete da se javite, klijent odmah
dobije poruku" — already partially true in the demo threads) so the page is honest
and differentiated, or (b) fast-tracking the voice feature before spending further on
this keyword cluster, since it is what the market has decided "answering missed calls"
means. Cross-reference: `/seo content` for an E-E-A-T rewrite of the promise language.

## 3. Page-type mismatch by page

| Page | Page targets (inferred) | SERP dominant type (sampled) | Target page type | Mismatch |
|---|---|---|---|---|
| index.html | "automatski odgovor na propuštene pozive/poruke", brand-adjacent | Mixed: vendor commercial pages + definitional blog posts (Wisefox "AI sekretarica, voicebot, AI recepcionar: šta je šta?") | Single-scroll commercial landing page, no glossary/definition content | HIGH — no content ranks for the "šta je / kako radi" awareness layer that currently owns top positions |
| stomatolozi.html | "propušteni pozivi stomatolozi", "automatski odgovor pacijentima" | Commercial voice-agent product pages + dental-practice-software sites (eStomatolog) | Thin 4-section commercial template, no proof/case study | CRITICAL (voice-vs-text claim, see §2) |
| veterinari.html | "propušten poziv veterinarska klinika" | Sparse/no dedicated vertical competitors — mostly generic AI-receptionist vendors | Same thin template | MEDIUM — low competition, but zero differentiation from other 8 pages besides copy swap |
| advokati.html | "propušten poziv advokatska kancelarija", intake automation | Legal-intake SaaS (international) + local vendor pages | Same thin template, no compliance/confidentiality reassurance beyond generic FAQ | HIGH — legal buyers specifically search for data-handling/confidentiality guarantees; page has none |
| auto-servisi.html, klimatizacija.html, pvc-stolarija.html, majstori.html | "poziv za ponudu/servis [struka]" — local trades, high commercial/transactional intent | Local directories, individual business GBP-style pages, some vendor pages | Same thin template | ALIGNED-to-MEDIUM — commercial template roughly fits, but local intent means these SERPs likely surface Google Business Profiles and directories the site cannot compete with; recommend `/seo local` |
| saloni.html | "propuštena poruka salon/Instagram DM" | Instagram-scheduling tools, salon-booking SaaS | Same thin template | MEDIUM |
| ecommerce.html | "automatski odgovor kupcima Instagram/sajt" | E-commerce chatbot/Instagram-automation vendors (Manychat-type), more feature-dense pages | Same thin template, thinnest relative depth vs. this SERP's feature-heavy competitors | HIGH — this SERP typically shows integration lists (Shopify, Instagram, WhatsApp Business API), pricing tiers; page has none |

Note: full 10-result SERP capture per keyword per page (90 result-page classifications)
was not run — see Limitations. The table above uses the two sampled SERPs plus
category knowledge of what ranks for this query family in the RS market.

## 4. User stories (derived from SERP signals)

1. **"I need a receptionist right now, not next quarter"** (awareness→consideration).
   Signal: competitor pages (Virtuelna Recepcija, Wisefox) lead with "javlja se odmah,
   24/7" and concrete before/after numbers. APLORY's hero matches the urgency framing
   but never states time-to-live ("uveliko u toku dana / za X dana") — no onboarding-
   speed proof point on any vertical page.

2. **"Does it actually talk to my caller, or just text them?"** (consideration).
   Signal: SERP is now full of voice-agent vendors. This story is the direct
   consequence of §2's mismatch — the page must answer this question above the fold,
   not bury it in an FAQ item on the homepage that niche visitors never see (niche
   pages have no FAQ section at all).

3. **"Is this compliant / where does my clients' data go?"** (decision, esp. advokati
   and stomatolozi verticals). Signal: homepage FAQ cites Zakon o oglašavanju čl. 63
   and Zakon o zaštiti podataka čl. 17 — good instinct — but this FAQ is homepage-only;
   a lawyer or dentist landing directly on their vertical page from a search never
   sees it.

4. **"What does this cost and can I cancel?"** (decision). Signal: every competitor
   surfaced in the SERP sample is a paid SaaS category where pricing/trial framing is
   a normal SERP snippet element (sitelinks to "Cenovnik"/"Pricing"). APLORY has no
   pricing anywhere on any of the 10 pages audited — pure lead-gen intake, which raises
   friction for comparison-shoppers.

5. **"Does this work for a business exactly like mine?"** (consideration). Signal:
   the 9 verticals exist specifically to answer this, and the copy customization
   (pain points, demo chat) is genuinely good — but zero proof (no client logo, no
   quote, no "used by N stomatoloških ordinacija") backs the vertical fit claim.

## 5. Persona scoring (out of 25 pts per dimension = 100 total)

### Persona A — Skeptical small-business owner (e.g., stomatolog/majstor) evaluating trust
| Dimension | Score | Evidence |
|---|---|---|
| Relevance | 20/25 | Pain points are specific and accurate to the trade (chat demo language is credible, non-generic) |
| Clarity | 12/25 | Hero implies live call-answering; actual mechanism (text-back after missed call) isn't stated until step copy, and voice-vs-text is never disambiguated on vertical pages |
| Trust | 6/25 | No testimonials, no client count, no logos, no review schema/star rating, no case-study numbers anywhere on any of the 10 pages |
| Action | 17/25 | Single clear CTA (lead form) pre-filled to the right industry — good; but no lower-commitment option (no demo video, no "watch it work" outside the animated mock, no phone number to just call and test it) |
| **Total** | **55/100** | Weakest: Trust |

### Persona B — Comparison-shopper (vs. human answering service, competitor SaaS, or doing nothing)
| Dimension | Score | Evidence |
|---|---|---|
| Relevance | 18/25 | Pain framing is right, but no page ever names or contrasts against alternatives (human answering service, competitor voice-AI tools, or "doing nothing") |
| Clarity | 10/25 | No feature/integration list, no comparison table, no "what's included" breakdown beyond a 3-item OfferCatalog on the homepage schema (invisible to users) |
| Trust | 6/25 | Same as above — no third-party proof; also no security/compliance page linked from niche pages |
| Action | 13/25 | No pricing means a comparison-shopper cannot self-qualify before submitting a lead form — high-friction ask for someone still evaluating |
| **Total** | **47/100** | Weakest: Trust, tied with Clarity |

**Priority order (weakest persona first): Comparison-shopper (47) → Skeptical owner (55).**
Recommended fixes, in order of leverage:
1. Add at least directional proof (client count, a single quote per vertical, or an
   aggregate stat) — closes the largest Trust gap for both personas.
2. Disambiguate voice vs. text explicitly in every niche hero/pain section, not just
   the homepage FAQ (fixes Persona A Clarity and the CRITICAL mismatch in §2).
3. Publish even minimal pricing/packaging (or an explicit "besplatan poziv za procenu"
   framing) so Persona B can self-qualify before the lead form.
4. Add a comparison angle ("vs. dodatna osoba na recepciji", "vs. da ništa ne radite")
   to at least the homepage and highest-intent verticals (stomatolozi, advokati).

## 6. Gap analysis (SXO Gap Score, distinct from SEO Health Score)

Scored for the shared template (applies near-identically to all 9 vertical pages;
homepage scored separately where it differs).

| Dimension | Niche pages | Homepage | Evidence |
|---|---|---|---|
| Page Type (15) | 7/15 | 8/15 | Commercial template is directionally right but thin vs. voice-agent competitors' proof-heavy commercial pages |
| Content Depth (15) | 4/15 | 7/15 | ~250-400 words/page (hero + 3 pains + 3 steps); no FAQ, no glossary, no objection handling on niche pages |
| UX Signals (15) | 9/15 | 10/15 | Clean single scroll, one clear CTA, good mobile-first chat demo; no secondary lower-friction CTA |
| Schema (15) | 5/15 | 7/15 | Service/ProfessionalService present but no FAQPage, Review/AggregateRating, or LocalBusiness/geo despite RS-only local service |
| Media (15) | 6/15 | 7/15 | One static niche photo + one animated chat mock; no demo video, no screenshots of dashboard/reports |
| Authority (15) | 2/15 | 3/15 | Zero testimonials, logos, press, or third-party mentions on any page |
| Freshness (10) | 5/10 | 5/10 | No dated content, no last-updated signal, no blog cadence to show active development |
| **Total** | **38/100** | **47/100** | |

## 7. Limitations
- Live rendering via a headless browser/render_page.py-equivalent was not run in this
  environment; analysis is based on direct source read of the React SPA source
  (`src/data/niches.js`, `src/pages/NicheLanding.jsx`, `src/components/*`) plus the
  static `<head>` of each `.html` entry file, which is equivalent for this codebase
  since content is deterministic from that data (confirmed template is shared 1:1
  across all 9 verticals).
- Only 2 SERP queries were sampled live via WebSearch (general "automatski odgovor na
  propušten poziv stomatološka ordinacija" and "AI recepcionar za propuštene pozive
  Srbija"), not a full top-10 capture for all plausible keyword variants x 9 verticals.
  The per-vertical SERP-type table in §3 for auto-servisi/klimatizacija/pvc-stolarija/
  majstori/saloni/ecommerce/veterinari is inferred from category knowledge of the RS
  market plus the two sampled SERPs, not independently verified top-10 pulls — treat
  those rows as directional, not measured.
- No access to Search Console/analytics, so current rankings, impressions, or actual
  bounce/conversion data for these pages could not be incorporated.
- No PDF/GBP/local-pack screenshot capture was performed for the trade verticals
  (auto-servisi, klimatizacija, pvc-stolarija, majstori) even though local-pack
  presence is likely material there — recommend `/seo local` as a follow-up.

## 8. Cross-skill recommendations
- `/seo content` — rewrite hero/pain copy to resolve the voice-vs-text claim (§2) and
  add E-E-A-T signals (author/company credibility) since Authority scored 2-3/15.
- `/seo schema` — add FAQPage (per vertical, not homepage-only), Review/AggregateRating
  once testimonials exist, and LocalBusiness/geo given `areaServed: "RS"`.
- `/seo local` — auto-servisi, klimatizacija, pvc-stolarija, majstori, saloni pages
  target inherently local-service queries; GBP/local-pack competition was not
  assessed here.
- `/seo page` — niche pages are thin (~250-400 words); a page-level audit can quantify
  the content-depth gap against the class of vendor competitors surfaced in §2/§3.

Offer: Generate a PDF report? Use `/seo google report`.
