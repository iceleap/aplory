import { callOutcomes } from "../data/research";
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
 */
export default function CallWaffle() {
  const copy = useCopy();
  const { segments, headline, sourceUrl } = callOutcomes;

  const cells = segments.flatMap((seg) =>
    Array.from({ length: seg.cells }, (_, i) => ({ key: `${seg.key}-${i}`, color: seg.color })),
  );

  return (
    <figure className="waffle-fig">
      <figcaption className="waffle-cap">{copy.chart.caption}</figcaption>

      <div className="waffle-body">
        <div className="waffle-grid" role="img" aria-labelledby="waffle-desc">
          {cells.map((cell) => (
            <span key={cell.key} className="waffle-cell" style={{ background: cell.color }} />
          ))}
        </div>

        <div className="waffle-side">
          <p className="waffle-big">
            <strong>{headline}</strong>
            <span>%</span>
          </p>
          <p className="waffle-big-label">{copy.chart.headlineLabel}</p>

          <ul className="waffle-legend">
            {segments.map((seg) => (
              <li key={seg.key}>
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
