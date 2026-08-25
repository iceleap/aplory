# Design

<!-- impeccable:design-doc -->

## Direction

Editorial, light, restrained-plus-one-accent. Built from a pinned reference
(styles.refero.design "Steep" style) after the previous dark, data-heavy
design tested as confusing to first-time visitors. This rebuild optimizes for
one thing: a visitor understands what APLORY is and does within seconds.

## Palette

Near-monochrome ink-on-paper with one warm accent, used on at most one surface
per section.

- `--color-paper` `#ffffff` — page ground
- `--color-surface` `#fafafb` — alternating section band
- `--color-surface-2` `#f2f2f3` — card / form ground
- `--color-rule` `#e6e6e9` — hairline borders
- `--color-ink` `#17191c` — primary text, button fill
- `--color-ink-2` `#4b4e57` — body copy
- `--color-muted` `#777b86` / `--color-faint` `#a3a6af` — secondary/tertiary text
- `--color-accent` `#fbe1d1` / `--color-accent-ink` `#5d2a1a` — the one peach
  surface (Services' lead card only — do not spread it to more than one card
  per section)
- `--color-brand-a` `#2e8ff1` / `--color-brand-b` `#465ec2` — the logo's own
  gradient. Reserved for the wordmark, the hero diagram's hub, and small icon
  accents. Never used on buttons.
- `--color-live` `#16a47a`, `--color-danger` `#c23b4f` — form success/error only.

## Typography

- Display (`--font-display`, `.h1`/`.h2`/`.h3`): Fraunces, weight 400 only.
  Tighter tracking at larger sizes.
- Body/UI (`--font-sans`): Inter, weights 300–700.
- Both loaded via Google Fonts in every HTML entry point (`index.html`, the
  four legal pages, `404.html`) — see the `<link>` block near the top of
  `<head>`.

## Components

- `.btn-primary`: filled ink pill (`border-radius: 999px`), white text.
- `.btn-ghost`: ink outline pill, transparent fill.
- `.card`: 24px radius, `--color-surface-2` background, no shadow.
- `.card-accent`: same shape, peach ground + sienna text — the one rare
  highlight surface.
- Rail-and-content section grid (`.grid2`) and the `.sec` alternating
  paper/surface bands carry over from the previous system unchanged.

## What this rebuild cut

- The call-answer-rate waffle chart, the third-party research citations
  panel, and the animated "Rezultat" call-fork diagram — all judged as
  friction for a first-time visitor. `Problem` keeps one plain-language stat
  (62%, 411 Locals 2016) instead.
- The SR/EN language toggle — Serbian only for now (see PRODUCT.md).
- A new `HowItWorks` section (3 plain steps) replaces the fork diagram as the
  "how does this actually work" explainer.

## Constraints for future work

- Keep the accent (`--color-accent`) to one card per section — that scarcity
  is what makes it read as a highlight rather than decoration.
- Buttons stay ink-black pills; do not reintroduce the old blue-gradient CTA.
- The wordmark (`public/logo-mark.png`) keeps its own gradient and is never
  recolored or filtered — that's the one place brand color is inherited
  rather than chosen.
- Every claim on the page must be something APLORY can deliver today (see
  PRODUCT.md's Product Principles) — the voice agent stays unmentioned.
