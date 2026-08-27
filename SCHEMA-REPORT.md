# Schema Markup Report — aplory.dev

**URL analyzed:** https://aplory.dev/
**Date:** 2026-08-27
**Format found:** JSON-LD (1 block), server-rendered in the initial HTML (good — not JS-injected, so Google sees it immediately). No Microdata or RDFa detected.

## Detection

One JSON-LD block at [index.html:55-119](index.html:55):

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "APLORY",
  "description": "...",
  "email": "office.aplory@gmail.com",
  "telephone": "+381698440885",
  "url": "https://aplory.dev/",
  "availableLanguage": "sr",
  "openingHoursSpecification": { ... "opens": "00:00", "closes": "23:59" },
  "hasOfferCatalog": { ... six Service offers ... }
}
```

## Validation Results

| Schema | Type | Status | Issues |
|--------|------|--------|--------|
| APLORY | ProfessionalService | ⚠️ | Valid and active, but missing several recommended properties (see below) |

### Issues found

1. **Missing `image`/`logo`** (Info) — `ProfessionalService`/`LocalBusiness` types should carry an image; Google uses it for knowledge-panel/business enrichment. `og:image` (`https://aplory.dev/og.png`) already exists and can be reused.
2. **Missing `address`** (Info, not Critical) — No `PostalAddress`. If APLORY has no public storefront and serves clients remotely/online, this is fine to omit — but if it should read as a local business tied to Serbia, add at least `addressCountry: "RS"`.
3. **Missing `sameAs`** (Info) — No links to social/business profiles (Instagram, LinkedIn, Google Business Profile, etc.). Helps Google consolidate the entity and supports Knowledge Panel eligibility.
4. **`Offer` items have no `price`/`priceSpecification`** (Info) — Fine for a generic service catalog (no rich-result requirement here), but if pricing is public, adding it strengthens the listing.
5. **No `WebSite`/`Organization` companion schema** (Info) — Only one entity is declared. Adding a lightweight `Organization` (or merging into a single graph via `@graph`) with `sameAs` and `logo` is a common pairing for SaaS-style service sites and doesn't conflict with `ProfessionalService`.
6. **`openingHoursSpecification` set to 00:00–23:59, all 7 days** — Valid syntax; just confirm this accurately represents an always-on automated service (it reads correctly for that case, flagging only in case it was a placeholder).
7. **No `@id`** (Info) — Not required, but adding a stable `@id` (e.g. `https://aplory.dev/#business`) makes it easier to reference this entity from other schema blocks (e.g. `WebPage.about`) later.

No Critical or blocking errors: `@context`, `@type`, and required fields are present and correctly typed; no placeholder text; no relative URLs; date/phone formats are valid.

### Schema type status check

- `ProfessionalService` — ✅ active, valid subtype of `LocalBusiness`, safe to keep.
- `OpeningHoursSpecification`, `OfferCatalog`, `Offer`, `Service` — ✅ all active/standard, no deprecation concerns.

## Recommendations

- **Add `image`** pointing at `https://aplory.dev/og.png` (or a dedicated square logo) and a `logo` if a distinct brand mark exists.
- **Add `sameAs`** with real profile URLs (Instagram, Facebook, LinkedIn, Google Business Profile) — only include ones that actually exist; don't add placeholders.
- **Consider `address`** with at minimum `addressCountry: "RS"` if the service is Serbia-focused, to strengthen local relevance signals.
- **Consider merging into `@graph`** with a `WebSite` node (adds `url`, `name`, and optionally `potentialAction` for sitelinks search box) if the site grows beyond the single landing page.
- No deprecated types are present — nothing to remove.

See [generated-schema.json](generated-schema.json) for a drop-in replacement block with the above additions marked as placeholders where real data is needed.
