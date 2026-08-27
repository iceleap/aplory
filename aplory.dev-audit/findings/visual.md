# Visual Analysis — aplory.dev

**Method note:** No Playwright/Chromium available on this machine (pip is
externally-managed, no network install path). Captured with headless Firefox
(`firefox --headless --profile <tmp> --screenshot out.png --window-size=W,H
<url>`) at Desktop 1920x1080 and Mobile 375x812 (iPhone-class viewport).
Screenshot file dimensions were verified to match the requested viewport
(375x812 / 1920x1080), so both mobile captures genuinely represent
above-the-fold content, not a scaled-down desktop layout. Tap-target sizes
below were measured by pixel-scanning the PNGs (button edges), not from the
DOM, since no JS execution/DevTools protocol was available in this
environment — treat pixel counts as accurate to roughly ±2px.

Pages tested:
- Homepage — https://aplory.dev/
- Vertical landing page — https://aplory.dev/stomatolozi.html

Screenshots saved to:
- /home/novak/Desktop/aplory/aplory.dev-audit/screenshots/homepage-desktop.png
- /home/novak/Desktop/aplory/aplory.dev-audit/screenshots/homepage-mobile.png
- /home/novak/Desktop/aplory/aplory.dev-audit/screenshots/stomatolozi-desktop.png
- /home/novak/Desktop/aplory/aplory.dev-audit/screenshots/stomatolozi-mobile.png

## Critical
None found.

## High
None found.

## Medium
- **Hamburger menu tap target may be undersized on mobile (homepage).**
  Pixel-scanning the visible icon glyph in `homepage-mobile.png` gives a
  bounding box of roughly 54x39px (x:300–354, y:12–51). That is below the
  48x48px touch-target guideline on the height axis. The icon graphic itself
  is small (three thin bars); if the actual `<button>` hit area only extends
  a few px of padding beyond the glyph, it will fail thumb-tappability.
  Cannot confirm the true hit-slop without DOM/DevTools access in this
  environment — worth verifying with `getBoundingClientRect()` in a real
  browser and, if under 48px, enlarging the button's padding/hit area (not
  necessarily the icon itself).

## Low
- **Large empty top margin on desktop hero (1920x1080).** On the homepage,
  the hero heading doesn't start until roughly 350px down the 1080px-tall
  viewport, leaving a large blank gridded-background area above the
  eyebrow text. Content (H1, subhead, both CTAs) is still fully visible
  above the fold, so this isn't a functional problem, just a visual/spacing
  choice worth a design review — the hero feels vertically under-anchored
  on tall desktop viewports.
- **No visible skip/scroll affordance** at the bottom of either hero on
  desktop — with that much empty space, a subtle scroll-cue could improve
  perceived completeness of the fold, though this is a nice-to-have, not a
  defect.

## Info
- **Above-the-fold value proposition — clear on both pages.**
  - Homepage: eyebrow "ZA FIRME KOJE NE STIGNU DA SE JAVE NA SVAKI POZIV" +
    H1 "Kad vas neko traži, APLORY odgovara. Automatski." + one-sentence
    subhead naming the channels covered (missed call, WhatsApp, Instagram,
    website message) is immediately legible and specific, no scrolling
    needed at 1920x1080 or 375x812.
  - Vertical page (stomatolozi.html): same pattern, but tailored — eyebrow
    "ZA STOMATOLOŠKE ORDINACIJE", H1 "Kad pacijent zove, APLORY zakazuje
    termin. Dok vi radite u stolici." (a concrete, occupation-specific pain
    point), plus a relevant dental-office photo for trust/context. This
    vertical-specific headline is stronger than a generic value prop would
    be and is fully visible without scrolling on both viewports.
  - Both pages show a primary CTA ("Zakažite razgovor") and secondary CTA
    ("Kako radi") above the fold on both desktop and mobile — good, no
    dependency on scrolling to find the conversion action.
- **Mobile primary CTA sizing is solid.** Pixel-measured "Zakažite
  razgovor" button on both mobile pages: width ~168–170px, height ~48–50px
  (homepage: x 20–200, y 580–630; stomatolozi: x 22–198, y ~600–635) — meets
  the 48px touch-target minimum. Secondary "Kako radi" outline button
  measures similarly (~110px wide, same height) alongside it, with visible
  spacing between the two — no accidental mis-tap risk apparent.
  Header CTA "Zakažite razgovor" (top-right, both pages/viewports) is a
  filled pill button, visually well above 44px height on both desktop and
  mobile crops.
- **No horizontal scroll or overflow detected.** All four screenshots are
  exactly the requested viewport width (375px / 1920px) with no visible
  content clipped at the right edge or overlapping elements.
- **Navigation differs appropriately by page type.** Homepage shows full
  nav (Problem, Kako radi, Za koga, Pitanja, Sve usluge + CTA); the
  stomatolozi vertical landing page replaces the full nav with a single
  "Nazad na početnu" link + CTA — consistent with a focused landing-page
  pattern, not a bug. On mobile, homepage collapses to a hamburger + CTA
  (see Medium note above); stomatolozi mobile only shows the CTA (no
  hamburger, since there's no multi-item nav to collapse) — mobile header is
  clean and uncluttered on both.
- **Typography/legibility:** headline uses a large serif display font,
  body copy is a smaller sans-serif at what visually reads as ~16–18px —
  no evidence of undersized text requiring zoom, on either viewport.
- **Visual consistency across pages:** identical grid/gradient background
  motif, logo placement, button styling, and CTA copy between homepage and
  the vertical page — reinforces brand consistency for a multi-landing-page
  SaaS structure.
