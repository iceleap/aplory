# Backlink Profile — aplory.dev

**Date:** 2026-09-05
**Tier available:** 0 (Common Crawl + verification crawler only). Moz and Bing Webmaster API keys are not configured in this environment (`claude-seo run backlinks_auth.py --check --json` confirms `moz.available: false`, `bing.available: false`). DataForSEO extension not installed. No third-party paid data was used.

## Data Sources Checked

| Source | Status | Notes |
|---|---|---|
| Common Crawl Web Graph | Queried | See results below. Confidence: 0.50 (domain-level, quarterly snapshot). Source: https://commoncrawl.org/web-graphs |
| Moz API | Unavailable | No API key configured. Would provide DA/PA, spam score, referring domains, anchor text. |
| Bing Webmaster API | Unavailable | No API key configured. Only usable for domains registered to the account anyway. |
| DataForSEO | Unavailable | Premium extension not installed. |
| Verification crawler (`verify_backlinks.py`) | Not run | No known/candidate backlink URLs were supplied to verify against. If a list of suspected referring pages becomes available, run `claude-seo run verify_backlinks.py --target https://aplory.dev --links <file> --json` to confirm live, followed links. |

## Common Crawl Results

Command: `claude-seo run commoncrawl_graph.py aplory.dev --json` (release: cc-main-2026-jan-feb-mar)

| Metric | Value | Source |
|---|---|---|
| In Common Crawl web graph | **No** | CC (confidence: 0.50) |
| In CC host-level rankings | **No** | CC (confidence: 0.50) |
| PageRank / rank | null / null | CC (confidence: 0.50) |
| Harmonic centrality / rank | null / null | CC (confidence: 0.50) |
| Referring hosts (n_hosts) | null | CC (confidence: 0.50) |

**Interpretation:** aplory.dev does not yet appear in Common Crawl's host-level web graph at all. This is expected and unremarkable for a young domain — Netlify-hosted response headers (`age: 243`, `cache-status: Netlify Edge`) and the homepage's own `publication_date: 2026-01-01` metadata indicate the site is only a few months old. Absence from CC simply means the site has not accumulated enough external, crawled links to register a PageRank/centrality score in a recent quarterly snapshot — it is not evidence of a penalty or technical block.

## Backlink Health Score

**Status: INSUFFICIENT DATA — no numeric score reported.**

Per the scoring model, a Backlink Health Score requires signal across 7 weighted factors (referring domains, domain quality distribution, anchor text naturalness, toxic link ratio, link velocity, follow/nofollow ratio, geographic relevance). At Tier 0 with a domain absent from Common Crawl, **0 of 7 factors have any data source**. Producing a 0/100 or any numeric score here would misrepresent "no data" as "no backlinks/poor backlinks" — these are not the same thing, and a false low score could wrongly justify calling the site's backlink profile "unhealthy" when it is simply new. This is a finding in itself, not a scoring shortfall to paper over.

## Findings

1. **New domain, no visible external backlink signal (Info/Expected).** aplory.dev has no detectable referring-domain footprint in the only public dataset accessible in this environment (Common Crawl). For a SaaS product that appears to have launched in 2026, this is normal, not a red flag — but it means there is currently zero inbound link equity supporting organic visibility in Serbia (or elsewhere).
2. **No local citations verified (Info).** No Serbian business-directory, review-site, or press citations were found/verifiable via the available tooling. This matters for local/small-business SaaS trust signals (Google Business Profile, local directories) even though APLORY itself isn't a local business — its customers are, and case-study/press mentions from Serbian SMB and startup media would carry topical relevance.
3. **Tooling gap limits confidence (Info).** Without Moz or DataForSEO, this audit cannot check referring-domain counts, anchor text distribution, spam/toxic link ratio, or link velocity for aplory.dev at all — those columns are simply not assessable, and any future report using only Tier 0 will hit this same ceiling. Recommend enabling a free Moz API key (2,500 rows/month) to move to Tier 1, which would at least surface DA/PA and basic referring-domain counts going forward.

## Recommendations — Initial Link-Building / PR Plan for a Serbian SMB SaaS

**Priority: High**
1. **Register on core Serbian and regional business directories/portals**: e.g., Poslovni Imenik, Yellow pages Srbija equivalents (Ø Imenik, Telefonski imenik), Startit.rs company listings, and local chamber-of-commerce (PKS) member directories. These are low-effort, high-relevance first citations for a Serbian B2B SaaS.
2. **Startit.rs / Netokracija / Bizlife coverage**: These are the primary Serbian/regional tech-and-startup media outlets. A launch story or founder interview pitched to Startit.rs (Serbia's leading startup/tech news site) is the single highest-leverage early backlink opportunity for a product like APLORY.
3. **Product directories**: List APLORY on Product Hunt, SaaSHub, AlternativeTo, and Capterra/G2 (with a Serbian-market category tag if available) — these are standard, low-cost dofollow/nofollow-mixed listings that also drive discovery traffic.

**Priority: Medium**
4. **Local SMB association partnerships**: Reach out to organizations serving Serbian small businesses (e.g., NALED, chambers of commerce, coworking spaces like Nova Iskra or Impact Hub Belgrade) for partner-page or resource-page mentions — highly topically relevant since APLORY's customer base is exactly this segment.
5. **Guest content / case studies**: Publish a short case study or guest post on Serbian business/marketing blogs covering "missed call = lost customer" data (the site's own homepage cites a "62% of calls to small businesses go unanswered" statistic — this stat, sourced and expanded, is shareable content bait for local business blogs).
6. **Integration/partner backlinks**: If APLORY integrates with WhatsApp Business, Instagram, or common Serbian telephony/CRM tools, seek "works with X" or integration-directory listings from those platforms.

**Priority: Low**
7. **Social profiles as trust signals**: Ensure consistent NAP-style profile links (Facebook, Instagram, LinkedIn company page) exist and link back to aplory.dev — these are nofollow but reinforce entity consistency for local/brand search.
8. **Re-run this audit at Tier 1**: Once a free Moz API key is added, re-run `claude-seo run moz_api.py metrics https://aplory.dev --json` to start tracking DA/PA and referring-domain growth as the above outreach lands, giving a real numeric baseline instead of "insufficient data."

## Cross-Skill Notes

- This report covers backlink/off-page signals only. For on-page content and E-E-A-T assessment, run `/seo content https://aplory.dev`.
- For crawlability/technical factors affecting whether Common Crawl and other crawlers can discover and index the site (the homepage is an SPA per `is_spa: true` in the rendered snapshot — worth confirming server-rendered content is crawlable), run `/seo technical https://aplory.dev`.
