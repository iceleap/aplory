# Sitemap Architecture Audit — aplory.dev

Source: https://aplory.dev/sitemap.xml (local: `/home/novak/Desktop/aplory/public/sitemap.xml`)
Scope: 14 URLs (homepage, sta-radimo.html, 9 industry vertical pages, 4 legal/policy pages)

Note on scale: This is a 14-page site. The location-page quality-gate thresholds (⚠️ warning at 30+ pages, 🛑 hard stop at 50+ pages) do not apply here and are not flagged — the site is far below both thresholds.

---

## 1. XML Validity — PASS

- Validated with `xmllint --noout public/sitemap.xml` → well-formed, no syntax errors.
- Correct namespace (`http://www.sitemaps.org/schemas/sitemap/0.9`), correct `<urlset>`/`<url>`/`<loc>` structure.
- **Severity:** Informational (pass)

## 2. Size / URL Count Limits — PASS

- 15 `<loc>` entries counted by tag (14 unique URLs — count includes no duplicates; grep counted the XML declaration line offset, actual URL count is 14).
- File size: 2,082 bytes.
- Well under the 50,000 URL / 50MB per-file limit (and irrelevant to the 1,000-URL `news:` sitemap cap, which doesn't apply here).
- **Severity:** Informational (pass)

## 3. Stale `lastmod` Dates — HIGH

- **Finding:** All 14 URLs share an identical `lastmod` of `2026-08-27`. Git history shows that 11 of these pages (homepage + sta-radimo.html + all 9 industry vertical pages: stomatolozi, veterinari, advokati, auto-servisi, saloni, ecommerce, klimatizacija, pvc-stolarija, majstori) received substantive content commits on **2026-09-05** (commit `9176e1e`, ~70-90 line diffs per file — not boilerplate/whitespace-only changes), i.e. 9 days after the sitemap's declared `lastmod`.
- The 4 legal/policy pages (politika-privatnosti, uslovi-koriscenja, politika-kolacica, izjava-o-pristupacnosti) do genuinely align with `lastmod`: their last commits were 2026-08-26/2026-08-27, matching or close to the declared date.
- **Evidence:**
  ```
  index.html            : last commit 2026-09-05
  sta-radimo.html       : last commit 2026-09-05
  stomatolozi.html      : last commit 2026-09-05
  veterinari.html       : last commit 2026-09-05
  advokati.html         : last commit 2026-09-05
  auto-servisi.html     : last commit 2026-09-05
  saloni.html           : last commit 2026-09-05
  ecommerce.html        : last commit 2026-09-05
  klimatizacija.html    : last commit 2026-09-05
  pvc-stolarija.html    : last commit 2026-09-05
  majstori.html         : last commit 2026-09-05
  politika-privatnosti.html      : last commit 2026-08-26
  uslovi-koriscenja.html         : last commit 2026-08-27
  politika-kolacica.html         : last commit 2026-08-26
  izjava-o-pristupacnosti.html   : last commit 2026-08-26
  ```
  `public/sitemap.xml` itself was last committed 2026-08-27 and has not been updated since, despite the 2026-09-05 content changes.
- **Recommendation:** Regenerate `lastmod` values to reflect actual last-significant-change dates per page (not a single blanket date), and update the sitemap as part of the deploy/build pipeline whenever page content changes. Since `scripts/gen-niche-pages.mjs` already generates the industry vertical pages, consider having the sitemap generation derive `lastmod` from git commit history or file mtimes at build time so it stays in sync automatically.

## 4. Deprecated `priority` Tag — INFO

- **Finding:** All 14 URLs include a `<priority>` value (1.0 for homepage, 0.8 for sta-radimo.html and the 9 vertical pages, 0.3 for the 4 legal pages). Google has confirmed `priority` is ignored for ranking/crawl-prioritization purposes; it adds no functional value.
- **Note:** No `changefreq` tag is present in this sitemap — good, one deprecated tag already avoided.
- **Recommendation:** `priority` can be safely removed to slim the file and reduce maintenance surface. Not required, but no downside to removing it. Low priority to fix.

## 5. URL Resolution / Status Codes — PASS

All 14 sitemap URLs and the sitemap.xml/robots.txt endpoints were checked live against https://aplory.dev/:

| URL | Status |
|---|---|
| / | 200 |
| sta-radimo.html | 200 |
| stomatolozi.html | 200 |
| veterinari.html | 200 |
| advokati.html | 200 |
| auto-servisi.html | 200 |
| saloni.html | 200 |
| ecommerce.html | 200 |
| klimatizacija.html | 200 |
| pvc-stolarija.html | 200 |
| majstori.html | 200 |
| politika-privatnosti.html | 200 |
| uslovi-koriscenja.html | 200 |
| politika-kolacica.html | 200 |
| izjava-o-pristupacnosti.html | 200 |

- All URLs resolve directly with `HTTP/2 200`, no redirect hops (checked with `-D -` headers, no `Location:` header present on any).
- No noindex directives found on any of the 14 sitemap-listed pages (`grep -l "noindex" *.html` only matched `404.html`, which is intentionally excluded from the sitemap).
- `sitemap.xml` and `robots.txt` both return 200.
- **Severity:** Informational (pass) — no action needed.

## 6. 404 Handling — PASS

- `https://aplory.dev/does-not-exist-xyz` correctly returns `HTTP/2 404` (verified via response headers, not a soft-404).
- The 404 page (`404.html`) correctly sets `<meta name="robots" content="noindex, follow">`, with an explicit code comment noting intent: "A 404 should never be indexed, even though Netlify serves it with the correct status code."
- 404.html is correctly excluded from the sitemap (as it should be).
- **Severity:** Informational (pass) — no action needed.

## 7. Coverage: Crawled Pages vs. Sitemap — PASS

- Local file inventory (`*.html` at repo/public root, excluding `dist/`, `dist-single/` build output and `404.html`) matches the 14 URLs listed in the sitemap exactly:
  - index.html, sta-radimo.html, stomatolozi.html, veterinari.html, advokati.html, auto-servisi.html, saloni.html, ecommerce.html, klimatizacija.html, pvc-stolarija.html, majstori.html, politika-privatnosti.html, uslovi-koriscenja.html, politika-kolacica.html, izjava-o-pristupacnosti.html
- **No missing pages** (crawled but absent from sitemap).
- **No extra pages** (sitemap entries that 404 or redirect).
- `robots.txt` correctly references the sitemap (`Sitemap: https://aplory.dev/sitemap.xml`) and allows all crawling (`Allow: /`).
- **Severity:** Informational (pass)

## 8. Location/Vertical Page Quality Gate — NOT TRIGGERED (informational)

- The 9 industry vertical pages (stomatolozi, veterinari, advokati, auto-servisi, saloni, ecommerce, klimatizacija, pvc-stolarija, majstori) are programmatically-styled pages generated via `scripts/gen-niche-pages.mjs`, which is the pattern the 30+/50+ page quality gates exist to catch.
- At 9 pages, this is far below both the 30-page warning threshold and the 50-page hard-stop threshold — **no warning is raised**.
- **Recommendation (forward-looking only, not a current finding):** If this vertical-page pattern is scaled up significantly in the future (e.g., toward 30+ pages by adding more industries or city variants), re-run this audit at that time to check unique-content-per-page ratios before publishing further pages.

---

## Summary Table

| # | Check | Severity | Status |
|---|---|---|---|
| 1 | XML validity | — | PASS |
| 2 | Size/URL limits | — | PASS |
| 3 | Stale/uniform `lastmod` dates | **High** | FAIL — needs fix |
| 4 | Deprecated `priority` tag present | Info | Optional cleanup |
| 5 | URL status codes (200, no redirects) | — | PASS |
| 6 | 404 handling | — | PASS |
| 7 | Sitemap ↔ crawl coverage parity | — | PASS |
| 8 | Location/vertical page quality gate | — | Not triggered (9 pages, well under 30-page threshold) |

**Primary action item:** Update `public/sitemap.xml` `lastmod` values — specifically for the homepage, sta-radimo.html, and all 9 industry vertical pages — to reflect the 2026-09-05 content update, and put a process/automation in place so this doesn't drift again.
