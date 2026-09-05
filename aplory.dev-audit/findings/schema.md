# Schema.org / Structured Data Audit — aplory.dev

**Scope:** `https://aplory.dev/` (home) and the 10 vertical landing pages —
`sta-radimo.html`, `stomatolozi.html`, `veterinari.html`, `advokati.html`,
`auto-servisi.html`, `saloni.html`, `ecommerce.html`, `klimatizacija.html`,
`pvc-stolarija.html`, `majstori.html`.

**Method:** Read source HTML directly (`/home/novak/Desktop/aplory/*.html`),
cross-checked against live responses (`curl -s https://aplory.dev/...`) —
identical, confirming schema ships server-rendered/pre-rendered in the
initial HTML, not injected client-side by React. Parsed every
`application/ld+json` block with `json.loads()` to check for syntax errors.
Also read the prior `SCHEMA-REPORT.md` and `generated-schema.json` in the
repo root for context on what was previously proposed (proposals — not yet
applied to the live files) and the parallel `technical.md` / `content.md`
findings for cross-checking.

**Prior findings confirmed by other audits (agreeing, not re-deriving):**
technical.md confirms the site is now build-time prerendered
(`scripts/prerender.mjs` + `vite.ssr.config.js`), so JSON-LD and visible
content ship together in the static HTML for crawlers that don't execute JS.
content.md/other agents flagged the same missing-property gaps on the
homepage entity (image, sameAs, address) — this audit agrees with those and
does not re-litigate them beyond confirming they're still unfixed in the
current source.

---

## Detection Summary

| Page | JSON-LD blocks | Types present |
|---|---|---|
| index.html | 2 | `ProfessionalService` (+ nested `OfferCatalog`/`Offer`/`Service`), `FAQPage` |
| sta-radimo.html | 1 | `Service` (provider: `ProfessionalService`) |
| stomatolozi.html | 2 | `Service`, `FAQPage` |
| veterinari.html | 2 | `Service`, `FAQPage` |
| advokati.html | 2 | `Service`, `FAQPage` |
| auto-servisi.html | 2 | `Service`, `FAQPage` |
| saloni.html | 2 | `Service`, `FAQPage` |
| ecommerce.html | 2 | `Service`, `FAQPage` |
| klimatizacija.html | 2 | `Service`, `FAQPage` |
| pvc-stolarija.html | 2 | `Service`, `FAQPage` |
| majstori.html | 2 | `Service`, `FAQPage` |

No Microdata or RDFa found anywhere. All 20 blocks across the 11 pages
parse as valid JSON — no syntax errors. `@context` is consistently
`"https://schema.org"` (correct, HTTPS form) and no relative URLs or
placeholder text (`[Business Name]`-style) were found in any live block.
`FAQPage` visible content matches the JSON-LD `Question`/`Answer` text
1:1 on all 9 niche pages that have it (confirmed against
`src/data/niches.js` `faq: [...]` arrays feeding both the `Faq` component
and the JSON-LD) — this is a small but real correctness plus, since
mismatched visible-vs-structured FAQ text is a common cause of manual
action / spam flags.

No deprecated types (`HowTo`, `SpecialAnnouncement`, `CourseInfo`,
`EstimatedSalary`, `LearningVideo`) are present anywhere. Nothing to remove
on that front.

---

## Findings

### 1. `ProfessionalService`/`LocalBusiness` is a type mismatch for a remote B2B SaaS product
**Severity: Medium**

**Evidence:** The homepage entity (`index.html:57`) and every vertical
page's `provider` object (e.g. `stomatolozi.html:40`) declare
`"@type": "ProfessionalService"` — a subtype of `LocalBusiness`. That
branch of schema.org is modeled for businesses with a real service area
tied to a physical presence (plumber, law firm's office, clinic): Google's
LocalBusiness rich results are meant to feed Local Pack / Maps / Knowledge
Panel surfaces keyed on address and hours. APLORY is a SaaS automation
product sold to *other* small businesses (dentists, garages, salons, etc.)
— it has no storefront, no walk-in service area of its own, and the
`openingHoursSpecification` block declares `00:00`–`23:59`, every day,
which is really "the software runs continuously," not "our premises are
staffed 24/7." Using `LocalBusiness`/`ProfessionalService` semantics for
that fact is a mismatch dressed up to satisfy a property that doesn't
apply to the entity.

**Why it matters:** This isn't a validator error (the block is
syntactically valid `ProfessionalService`), but it risks Google trying to
surface APLORY as a literal local business (map pin, "open now" hours) for
an entity that has neither, and it dilutes future entity-consolidation
work (Knowledge Panel, `sameAs`) because the "kind of thing" being declared
doesn't match the "kind of thing" APLORY actually is.

**Recommendation:** Model APLORY as an `Organization` (the company) that
`provider`s a `Service` (the automated-response product) — not a
`LocalBusiness` subtype. Skip `SoftwareApplication` too: that type expects
`operatingSystem`/`applicationCategory` and is meant for installable
apps/app-store-style entities eligible for star-rating rich results, which
doesn't fit a subscription automation service with no app listing. Drop
`openingHoursSpecification` entirely — it has no valid home once the top
type isn't `LocalBusiness`, and "always on" is already implied by the
product description text.

Suggested homepage replacement (`index.html`, replacing the current
`ProfessionalService` block; also fixes finding 3 below by adding `image`/
`sameAs`/`address`-equivalent signals appropriately for `Organization`):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://aplory.dev/#organization",
  "name": "APLORY",
  "description": "Automatski odgovor na propušten poziv, preusmeravanje na kanale koje klijenti koriste, podsetnici za termine, Google recenzije, chat na sajtu i izrada sajta.",
  "email": "office.aplory@gmail.com",
  "telephone": "+381698440885",
  "url": "https://aplory.dev/",
  "logo": "https://aplory.dev/icon.png",
  "image": "https://aplory.dev/og.png",
  "areaServed": "RS",
  "availableLanguage": "sr",
  "sameAs": [
    "https://www.instagram.com/aplory..."
  ],
  "makesOffer": {
    "@type": "OfferCatalog",
    "name": "Usluge",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Poruka posle propuštenog poziva" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Preusmeravanje na kanale koje klijenti koriste" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Podsetnici za termine" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google recenzije" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Chat na sajtu" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Izrada sajta" } }
    ]
  }
}
```
(Only include `sameAs` URLs that actually exist — do not add placeholders,
per Google's structured-data guidelines.) `address` is deliberately
omitted here: `Organization` doesn't need one, and inventing a
`PostalAddress` just to satisfy a `LocalBusiness`-shaped expectation would
recreate the same mismatch this finding is about. If APLORY does want to
claim a Serbia-based Knowledge Panel identity later, `Organization` still
supports `address`/`areaServed` without forcing the `LocalBusiness` rich
result semantics.

Then update every vertical page's `provider` object from the inline
`ProfessionalService` to an `@id` reference to this same node (see finding
4) and add `serviceType` per niche:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "APLORY — Za stomatološke ordinacije",
  "serviceType": "Automatizovan odgovor na propuštene pozive i poruke",
  "description": "Propušten poziv dok ste sa pacijentom u stolici? APLORY odmah odgovara porukom na propušten poziv, WhatsApp i Instagram poruku, zakazuje termin i šalje podsetnik pre dolaska.",
  "provider": { "@id": "https://aplory.dev/#organization" },
  "areaServed": "RS",
  "availableLanguage": "sr",
  "url": "https://aplory.dev/stomatolozi.html"
}
```

This is a recommendation to consider, not an emergency fix — `ProfessionalService` is not deprecated and the current blocks are valid. Treat as a "get it right the next time this is touched" item rather than a hotfix.

---

### 2. `FAQPage` present on homepage + 9 vertical pages — no Google SERP benefit, keep as-is
**Severity: Info**

**Evidence:** `index.html` and all vertical pages except `sta-radimo.html`
(which has no FAQ section) carry a `FAQPage` block whose `Question`/
`Answer` pairs match the visibly rendered FAQ content 1:1 (verified
against `src/data/niches.js`'s `faq: [...]` arrays, which feed both the
on-page `Faq` component and the JSON-LD per the comment at
`src/data/niches.js:22`).

**Why Info, not Critical/blocking:** Google retired FAQ rich results for
all sites in May 2026 (this superseded the Aug 2023 restriction to
government/health sites) — there is currently no SERP feature this markup
can produce. Any benefit for AI/LLM answer engines citing this content is
unconfirmed, not a validated ranking or citation signal.

**Recommendation:** Leave the existing `FAQPage` blocks in place — they
are valid, match visible content, and cost nothing to keep. Do not invest
further effort adding `FAQPage` to `sta-radimo.html` for Google SERP
purposes (there is none to gain); if a genuine FAQ section is added to
that page for content-quality reasons, mirroring it in `FAQPage` JSON-LD
is harmless but should not be sold internally as an SEO/rich-result win.
If APLORY ever builds real, user-submitted Q&A (support forum, etc.), use
`QAPage`, not `FAQPage`, for that content — they're semantically distinct
types.

---

### 3. Homepage `Organization`/`ProfessionalService` entity still missing `image`, `sameAs`, `address` in the live block
**Severity: Info**

**Evidence:** `SCHEMA-REPORT.md` and `generated-schema.json` (both in the
repo root) already identified this gap and drafted a fix, but the fix was
never applied — the live `index.html:57-119` block still has no `image`,
`sameAs`, or `address` property. Confirmed via live `curl` match with
source.

**Recommendation:** Roll this into whichever entity type is chosen for
finding 1 (`Organization` per the recommendation above, or `LocalBusiness`
family if the team decides to keep it). At minimum add `logo`
(`https://aplory.dev/icon.png`) and `image`
(`https://aplory.dev/og.png`, already used for `og:image`), and `sameAs`
with only real, currently-live profile URLs (Instagram/Facebook/Google
Business Profile) — do not ship placeholder strings like the ones in
`generated-schema.json` (`"[Instagram URL — fill in if it exists]"`), since
placeholder text in a live JSON-LD block is exactly the kind of thing
Google's structured-data guidelines flag and would fail the "no
placeholder text" validation gate if actually deployed as-is.

---

### 4. Vertical-page `provider` objects duplicate the organization entity inline instead of referencing it by `@id`
**Severity: Low**

**Evidence:** Every vertical page's `Service` block
(e.g. `stomatolozi.html:39-45`, `veterinari.html`, `advokati.html`, etc.)
repeats a full inline `provider` object:
```json
"provider": {
  "@type": "ProfessionalService",
  "name": "APLORY",
  "email": "office.aplory@gmail.com",
  "telephone": "+381698440885",
  "url": "https://aplory.dev/"
}
```
across all 10 pages, and none of these — nor the homepage entity itself —
declare an `@id`. This is valid schema (each block is self-contained,
which is exactly why it parses fine), but it's a missed opportunity for
entity consolidation: Google's guidance for multi-page sites recommends
giving the canonical entity a stable `@id` and referencing it from other
pages, rather than repeating a full copy on every page (which also means
any future edit to phone/email/name has to be made in 11 places instead
of one — a real maintenance risk given this is already templated from
`src/data/niches.js`).

**Recommendation:** Add `"@id": "https://aplory.dev/#organization"` to the
homepage entity (see finding 1's example) and replace every vertical
page's inline `provider` object with `{"@id": "https://aplory.dev/#organization"}`.

---

### 5. No `BreadcrumbList` anywhere on the site
**Severity: Low**

**Evidence:** `grep -rn "BreadcrumbList" *.html src` returns nothing. The
site has a clear, crawlable hierarchy — home → 10 vertical landing pages —
but none of it is declared in structured data.

**Recommendation:** Add a `BreadcrumbList` to each vertical page reflecting
Home → [Vertical name]:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Početna", "item": "https://aplory.dev/" },
    { "@type": "ListItem", "position": 2, "name": "Za stomatološke ordinacije", "item": "https://aplory.dev/stomatolozi.html" }
  ]
}
```
Low priority — breadcrumb rich results are a nice-to-have for a
flat/shallow site like this one (one hop from home), not a major SERP
lever, but it's a cheap, template-friendly addition given `niches.js`
already stores per-page names.

---

### 6. No `WebSite` schema (sitelinks search box eligibility) / no `WebPage` wrapper nodes
**Severity: Info**

**Evidence:** No `WebSite` type found anywhere; each page's JSON-LD jumps
straight to `Service`/`ProfessionalService`/`FAQPage` with no `WebPage`
node tying the page-level entities together via `@graph`.

**Recommendation:** Optional. If/when the homepage `Organization` block is
added (finding 1/3), consider converting the homepage to a single
`@graph` combining `Organization`, `WebSite`
(`{"@type":"WebSite","url":"https://aplory.dev/","name":"APLORY", "publisher": {"@id":"https://aplory.dev/#organization"}}`),
and the existing `FAQPage`. There's no `potentialAction`/sitelinks-search-box
justification here (the site has no internal search), so this is purely
an entity-graph tidiness improvement, not something with a distinct rich
result — keep as Info/optional.

---

## No Rich-Result Opportunities Being Left on the Table

Checked for and intentionally **not** recommending:
- **`HowTo`** — deprecated (Sept 2023), not applicable regardless of content shape.
- **`AggregateRating`/`Review`** — no testimonials or review content exist on the site yet (confirmed via `src/data/niches.js` and the page components); do not add this schema until real, on-page review content backs it — fabricated/aggregated ratings without visible supporting content violate Google's structured-data policy.
- **`SoftwareApplication`** — considered and rejected for finding 1's reasons (no app-store listing, no installable app, would require properties like `operatingSystem`/`applicationCategory` that don't map cleanly onto a subscription automation service).
- **New `FAQPage` additions** — see finding 2; no Google SERP benefit to chase.

---

## Summary Table

| # | Finding | Severity |
|---|---|---|
| 1 | `ProfessionalService`/`LocalBusiness` type mismatch for a remote SaaS product | Medium |
| 2 | `FAQPage` present, valid, matches visible content — no SERP benefit (May 2026 retirement) | Info |
| 3 | Homepage entity still missing `image`/`sameAs`/`address` (proposed but never applied) | Info |
| 4 | `provider` duplicated inline on 10 pages instead of `@id` reference | Low |
| 5 | No `BreadcrumbList` | Low |
| 6 | No `WebSite`/`@graph` consolidation | Info |

No Critical or High severity structured-data issues: every JSON-LD block
on the site is syntactically valid, uses live/non-deprecated types, has no
placeholder text, and uses absolute HTTPS URLs.
