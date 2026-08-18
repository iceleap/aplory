import { callOutcomes } from "../data/research";
import CountUp from "../lib/CountUp";
import { useCopy } from "../i18n";
import "./CallWaffle.css";

/**
 * 100 cells = 100 incoming calls, one cell per call. A waffle is used rather
 * than a pie or stacked bar because the unit is countable and the audience is
 * non-technical: "38 of every 100" reads without decoding an axis.
 *
 * Palette is the validated status set (--color-c-live / --c-vm / --c-none),
 * re-validated against the dark surface. Every segment carries a visible label
 * and percentage, which is the relief the contrast check requires.
 *
 * The segments flagged `missed` in the data — voicemail and no-answer — sit on
 * a panel of their own. Those cells are the 62% headline standing beside them,
 * so the figure can be counted off the grid rather than taken on trust, and the
 * answered blue reads as the remainder left on bare ground. The panel is
 * redundant with copy that is already visible and in the chart's description,
 * so nothing is lost without it.
 */

/* Grid geometry, mirrored from CallWaffle.css. The panel is drawn in these
   units and scaled to whatever the breakpoint renders. */
const COLS = 10;
const CELL = 22;
const GAP = 4;
const CELL_RADIUS = 3;
const PITCH = CELL + GAP;
const SIZE = COLS * PITCH - GAP;
/* The panel's own margins. Nearly all of its area is hidden behind the cells,
   so it needs somewhere to show or it reads as tinted gutters rather than as a
   field. Most of that room comes from below, where the grid borders nothing.
   The sides stay to one gutter's width: the grid's left edge is the section's
   text margin, and on mobile its right edge is too, so a panel much wider than
   the grid starts to break a line the caption, the cells and the source note
   all share. Against the answered cells it takes half a gutter, the most it can
   have without sliding under them and laying claim to calls that were picked
   up. Turn these up together to make the grouping louder. */
const PAD_BOTTOM = 10;
const PAD_SIDE = GAP;
const PAD_SEAM = GAP / 2;
/* One unit of air beyond the panel so its edge is never clipped. Must stay in
   step with the `inset` on .waffle-plate, which pulls the box out to match. */
const BLEED = PAD_BOTTOM + 1;
/* Corner radii, offset from the cells the panel wraps: a curve 2 units outside a
   3-unit corner is a 5-unit curve, so the panel stays concentric with the cells
   rather than cutting its own square across them. The lower corners open up to
   match the room they have. The step's inner corner curves the other way, so it
   tightens to the cell's own radius instead. */
const R_SEAM = CELL_RADIUS + PAD_SEAM;
const R_SKIRT = CELL_RADIUS + PAD_SIDE;
const R_STEP = CELL_RADIUS;

/**
 * Traces the panel under cells `start`…last. The block ends at the grid's last
 * cell but rarely begins at a row boundary, so the shape is a step: the tail of
 * one row, then every row below it.
 */
function platePath(start) {
  const row = Math.floor(start / COLS);
  const col = start % COLS;
  const left = -PAD_SIDE;
  const right = SIZE + PAD_SIDE;
  const bottom = SIZE + PAD_BOTTOM;
  const top = row * PITCH - PAD_SEAM;
  /* Every corner but the step's is convex, so all of these sweep the same way. */
  const arc = (r, x, y) => `A ${r} ${r} 0 0 1 ${x} ${y}`;

  /* Right side, skirt, and back up the left: the same on both shapes. */
  const outer = [
    `V ${bottom - R_SKIRT}`,
    arc(R_SKIRT, right - R_SKIRT, bottom),
    `H ${left + R_SKIRT}`,
    arc(R_SKIRT, left, bottom - R_SKIRT),
  ];

  if (col === 0) {
    return [
      `M ${left + R_SEAM} ${top}`,
      `H ${right - R_SEAM}`,
      arc(R_SEAM, right, top + R_SEAM),
      ...outer,
      `V ${top + R_SEAM}`,
      arc(R_SEAM, left + R_SEAM, top),
      "Z",
    ].join(" ");
  }

  const stepX = col * PITCH - PAD_SEAM;
  const stepY = (row + 1) * PITCH - PAD_SEAM;

  return [
    `M ${stepX + R_SEAM} ${top}`,
    `H ${right - R_SEAM}`,
    arc(R_SEAM, right, top + R_SEAM),
    ...outer,
    `V ${stepY + R_SEAM}`,
    arc(R_SEAM, left + R_SEAM, stepY),
    `H ${stepX - R_STEP}`,
    /* The step's inner corner turns against the others, so it sweeps back. */
    `A ${R_STEP} ${R_STEP} 0 0 0 ${stepX} ${stepY - R_STEP}`,
    `V ${top + R_SEAM}`,
    arc(R_SEAM, stepX + R_SEAM, top),
    "Z",
  ].join(" ");
}

export default function CallWaffle() {
  const copy = useCopy();
  const { segments, headline, sourceUrl } = callOutcomes;

  const cells = segments.flatMap((seg) =>
    Array.from({ length: seg.cells }, (_, i) => ({
      key: `${seg.key}-${i}`,
      color: seg.color,
      answered: !seg.missed,
    })),
  );

  // Where the panelled block starts: every cell before the first `missed`
  // segment. Taken from the data so the shape follows the figures.
  const missedFrom = segments
    .slice(0, segments.findIndex((seg) => seg.missed))
    .reduce((sum, seg) => sum + seg.cells, 0);

  return (
    <figure className="waffle-fig">
      <figcaption className="waffle-cap">{copy.chart.caption}</figcaption>

      <div className="waffle-body">
        <div className="waffle-grid" role="img" aria-labelledby="waffle-desc">
          {cells.map((cell) => (
            <span
              key={cell.key}
              className={cell.answered ? "waffle-cell is-answered" : "waffle-cell"}
              style={{ background: cell.color }}
            />
          ))}

          <svg
            className="waffle-plate"
            viewBox={`${-BLEED} ${-BLEED} ${SIZE + BLEED * 2} ${SIZE + BLEED * 2}`}
            aria-hidden="true"
          >
            <path d={platePath(missedFrom)} />
          </svg>
        </div>

        <div className="waffle-side">
          <p className="waffle-big">
            <strong>
              <CountUp>{headline}</CountUp>
            </strong>
            <span>%</span>
          </p>
          <p className="waffle-big-label">{copy.chart.headlineLabel}</p>

          <ul className="waffle-legend">
            {segments.map((seg) => (
              <li key={seg.key} className={seg.missed ? "is-missed" : "is-answered"}>
                <span className="swatch" style={{ background: seg.color }} />
                <span className="legend-label">{copy.chart.segments[seg.key]}</span>
                <span className="legend-val">{copy.chart.pct[seg.key]}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p id="waffle-desc" className="visually-hidden">
        {copy.chart.description}
      </p>

      <p className="waffle-source">
        {copy.chart.sourcePrefix}{" "}
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
          {copy.chart.sourceLabel}
        </a>
      </p>
    </figure>
  );
}
