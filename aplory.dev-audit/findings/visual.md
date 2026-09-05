# Visual / Mobile Rendering Audit — aplory.dev

Date: 2026-09-05
Scope: homepage (`https://aplory.dev/`) and one representative vertical landing page (`https://aplory.dev/stomatolozi.html`)
Method: headless Firefox screenshots (`firefox --headless --screenshot --window-size=W,H`) captured live against the production site — desktop 1920×1080 and true mobile viewport 375×812 (iPhone-class), one screenshot per URL/viewport combination taken with no scrolling, so each mobile capture shows exactly the above-the-fold content a visitor sees on load. Pixel-level crops were also inspected to measure tap-target sizes. Previous screenshots in this directory (~1 week old) were overwritten with fresh captures reflecting the current deployed code; filenames are unchanged: `homepage-desktop.png`, `homepage-mobile.png`, `stomatolozi-desktop.png`, `stomatolozi-mobile.png`.

**Visual/Mobile Score: Good overall, no blocking issues found.** Both pages tested render cleanly at desktop and mobile widths, the value proposition and primary CTA are visible without scrolling on both viewports, and no overlapping elements, text clipping, or broken layout were observed. The only actionable items are a borderline-small tap target and a minor mobile-navigation access gap.

---

## Medium

### 1. Header CTA/hamburger tap targets are under the 48px touch-target guideline on mobile
**Evidence:** `homepage-mobile.png` (top nav bar). Pixel measurement of the black "Zakažite razgovor" pill button in the mobile header shows a rendered height of ~41px (y≈11 to y≈52 in the 375×812 capture), and the adjacent hamburger icon button appears similarly sized. Both are below the widely-used 48×48px minimum recommended by Google's mobile usability guidance (and Apple's 44pt/WCAG 2.5.5's 44px).
**Recommendation:** Increase the vertical padding on the mobile header CTA and hamburger button so the tappable area (not just the visible pill) is at least 48px tall. This is a small CSS change (padding/min-height on the button and the hamburger's hit area) and directly supports Google's mobile-friendliness signal, which factors into mobile search ranking.

---

## Low

### 2. Secondary nav link ("Nazad na početnu") is not reachable on mobile for vertical landing pages
**Evidence:** Comparing `stomatolozi-desktop.png` (shows "Nazad na početnu" text link next to the CTA in the header) against `stomatolozi-mobile.png` (header shows only the "Zakažite razgovor" button — no hamburger icon and no visible "back to home" affordance at all, unlike the homepage's mobile header which does show a hamburger icon next to its CTA).
**Recommendation:** Confirm whether "Nazad na početnu" is intentionally dropped on mobile for vertical pages, or whether it's supposed to live inside a hamburger menu that isn't rendering on this route. If it's meant to be present, add it to whatever mobile menu pattern the homepage uses, so visitors arriving on a niche landing page from search have an obvious, tappable way back to the main site on mobile.

### 3. Redundant duplicate CTA copy in the mobile hero (cosmetic, not a defect)
**Evidence:** `homepage-mobile.png` and `stomatolozi-mobile.png` both show the identical "Zakažite razgovor" label used twice above the fold — once in the sticky header, once as the primary hero button — with only ~550px of vertical separation on a 812px-tall viewport. This is a deliberate, common landing-page pattern (persistent header CTA + hero CTA) and is not flagged as an issue, but it's worth confirming it isn't accidental duplication versus intentional CRO design, since on the shortest mobile viewports it does put two near-identical buttons in the same screen.

---

## Positive findings (no action needed)

- **Above-the-fold clarity (both viewports, both pages):** The H1, one-line eyebrow/kicker, supporting paragraph, and both CTA buttons ("Zakažite razgovor" / "Kako radi") are all fully visible without scrolling at 375×812 mobile and 1920×1080 desktop, on both the homepage and the stomatolozi vertical page. The value proposition ("Kad vas neko traži, APLORY odgovara. Automatski." / "Kad pacijent zove, APLORY zakazuje termin. Dok ste u ordinaciji.") reads clearly at both sizes with no truncation.
- **No overlapping elements or layout breakage** observed in any of the four captures — the animated "missed call / WhatsApp / Instagram / website message → answered" diagram on the right side of the desktop hero reflows cleanly to a stacked, cropped-at-the-fold position on mobile rather than overlapping text.
- **No text clipping or overflow**, no obvious horizontal scroll indicators, and heading/body font sizes appear comfortably above the 16px mobile-readability floor.
- **Visual polish is consistent** across the homepage and the vertical page — same header, same button styles, same subtle grid/gradient hero background, same photography treatment on stomatolozi's hero image (rounded corners, no distortion/stretching at either viewport width).
- **CTA is unambiguous and singular in intent** ("Zakažite razgovor" = book a call) — no competing or confusing calls to action above the fold.

---

## Screenshots referenced
- `screenshots/homepage-desktop.png` — 1920×1080
- `screenshots/homepage-mobile.png` — 375×812
- `screenshots/stomatolozi-desktop.png` — 1920×1080
- `screenshots/stomatolozi-mobile.png` — 375×812
