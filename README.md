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
index.html          landing page shell: meta tags + JSON-LD structured data
politika-privatnosti.html   legal page - static HTML, no React
uslovi-koriscenja.html      legal page - static HTML, no React
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
  legal/
    legal.js        the legal pages' only script: imports base.css
public/             served at the site root — one logo, one font
```

The two legal pages are Vite entry points, not client-side routes: real URLs that
stay crawlable and need no SPA fallback on the host. They ship no framework — the
entry exists purely to pull in the stylesheet, so they inherit the theme.

Only two components keep a separate `.css` file — `Problem.css` and
`CallWaffle.css`. That section is deliberately frozen, and hand-converting a
100-cell chart grid to utilities is how drift gets introduced.

`bundle-artifact.py` flattens `dist/` into a single self-contained HTML file. It
discovers `url(/…)` references in the built CSS and inlines whatever it finds, so
renaming an asset can't silently ship a dead link.

## Design notes

- **Type** is one variable font, Adwaita Sans, used from weight 250 (display) to
  700 (labels). The thin display weight deliberately echoes the logo wordmark.
- **Color** tokens live in the `@theme` block of `src/base.css`, which is also
  what generates the Tailwind utilities. The brand blues (`--color-brand-a`,
  `--color-brand-b`) were sampled from the logo's own gradient.
- **The site is dark-only** — a deep indigo-violet ground chosen to sit under the
  logo's indigo end. There is no light theme and no toggle, so every colour can be
  tuned for one ground. `--color-brand-soft` exists because `--color-brand-b` is
  too close to the surface to use for text here.
- **Scrolling** is driven by Lenis. Do **not** add `scroll-behavior: smooth` to
  the CSS — Lenis owns the scroll loop and the two together make anchor jumps
  double-animate. Nav anchors go through `useScrollTo()`, which applies
  `HEADER_OFFSET` so targets clear the sticky header. Lenis is not instantiated
  at all under `prefers-reduced-motion: reduce`.
- **Chart colors** (`--color-c-live`, `--color-c-vm`, `--color-c-none`) are a separate
  status palette, validated for colourblind separation **against the dark surface**
  — not flipped from a light theme. If the ground ever changes, re-run the
  validator rather than eyeballing: the amber and red are close enough in hue that
  small shifts break their separation. Don't reuse these three as brand accents.

## What we claim

The site advertises only what APLORY can deliver today — the six entries in
`services`. The voice agent is not offered anywhere; the only mention left is an
FAQ answer saying it isn't for sale yet.

Every section paints its own background rather than inheriting from `body`. That
is deliberate: when the page is embedded somewhere that paints its own ground
first, transparent sections show that through, and near-white text on a light
ground disappears. Keep `background` on `.sec` and on any new section.

## About the timings in Rezultat

The fork diagram in `src/data/content.js` (`outcomeFork`) is an **illustrative
scenario, not measured data** — 09:47 is roughly how long it takes someone to
hang up, reopen search results and dial the next listing. Keep it distinct from
the cited research below.

## About the numbers

Everything in `src/data/research.js` is **third-party industry research, not
APLORY's own client results**, and the page says so where the figures appear.
All three studies are US samples from 2007–2016, noted in small print on the
page. Replace them with real client data once it exists — the sources are
recorded alongside each figure so their provenance stays traceable.
