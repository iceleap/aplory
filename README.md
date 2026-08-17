# APLORY

Landing page for APLORY — automated handling of inbound inquiries. Vite + React +
Tailwind CSS v4, Serbian copy, static build with no backend.

## Commands

```bash
npm install        # once
npm run dev        # dev server with hot reload
npm run build      # static site -> dist/
npm run preview    # serve the production build locally
```

To produce a single self-contained HTML file (CSS, JS, font and logo all
inlined) for sharing or for hosts that block external requests:

```bash
npm run build && python3 bundle-artifact.py   # -> dist-single/index.html
```

## Layout

```
index.html          document shell: meta tags + JSON-LD structured data
src/
  main.jsx          entry point
  App.jsx           section order: Problem -> Rešenje -> Rezultat
  base.css          Tailwind entry + @theme tokens + shared component classes
  lib/
    SmoothScroll.jsx  Lenis provider and the useScrollTo hook
  components/       one .jsx per section (Tailwind utilities inline)
  data/
    content.js      all page copy — edit text here, not in the JSX
    research.js     every statistic, each with its primary source
public/             served at the site root (logo, font)
source/             original material: company context doc, master logos
```

Only two components keep a separate `.css` file — `Problem.css` and
`CallWaffle.css`. That section is deliberately frozen, and hand-converting a
100-cell chart grid to utilities is how drift gets introduced.

## Design notes

- **Type** is one variable font, Adwaita Sans, used from weight 250 (display) to
  700 (labels). The thin display weight deliberately echoes the logo wordmark.
- **Color** tokens live in the `@theme` block of `src/base.css`, which is also
  what generates the Tailwind utilities. The brand blues (`--color-brand-a`,
  `--color-brand-b`) were sampled from the logo's own gradient.
- **Scrolling** is driven by Lenis. Do **not** add `scroll-behavior: smooth` to
  the CSS — Lenis owns the scroll loop and the two together make anchor jumps
  double-animate. Nav anchors go through `useScrollTo()`, which applies
  `HEADER_OFFSET` so targets clear the sticky header. Lenis is not instantiated
  at all under `prefers-reduced-motion: reduce`.
- **Chart colors** (`--color-c-live`, `--color-c-vm`, `--color-c-none`) are a separate status
  palette, validated for colorblind separation. The amber falls just under 3:1
  against white, so every chart segment carries a visible text label — don't
  remove those labels, and don't reuse these three as brand accents.

## What we claim

The site advertises only what APLORY can deliver today. The voice agent is listed
once, greyed, as `U pripremi`, with a matching FAQ answer saying it isn't for sale
yet — see `upcoming` in `src/data/content.js`. Don't promote it into the services
list until it actually works.

## About the numbers

Everything in `src/data/research.js` is **third-party industry research, not
APLORY's own client results**, and the page says so where the figures appear.
All three studies are US samples from 2007–2016, noted in small print on the
page. Replace them with real client data once it exists — the sources are
recorded alongside each figure so their provenance stays traceable.
