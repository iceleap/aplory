import { callOutcomes } from "../data/research";
import "./CallWaffle.css";

/**
 * 100 cells = 100 incoming calls, one cell per call. A waffle is used rather
 * than a pie or stacked bar because the unit is countable and the audience is
 * non-technical: "38 of every 100" reads without decoding an axis.
 *
 * Palette is the validated status set (--c-live / --c-vm / --c-none). The amber
 * sits below 3:1 against white, so every segment carries a visible label and a
 * table view exists below — that is the required relief, not an oversight.
 */
export default function CallWaffle() {
  const { segments, headline, headlineLabel, source } = callOutcomes;

  const cells = segments.flatMap((seg) =>
    Array.from({ length: seg.cells }, (_, i) => ({
      key: `${seg.key}-${i}`,
      color: seg.color,
      label: seg.label,
    })),
  );

  return (
    <figure className="waffle-fig">
      <figcaption className="waffle-cap">
        Od svakih 100 poziva ka maloj firmi
      </figcaption>

      <div className="waffle-body">
        <div className="waffle-grid" role="img" aria-labelledby="waffle-desc">
          {cells.map((cell) => (
            <span
              key={cell.key}
              className="waffle-cell"
              style={{ background: cell.color }}
            />
          ))}
        </div>

        <div className="waffle-side">
          <p className="waffle-big">
            <strong>{headline}</strong>
            <span>%</span>
          </p>
          <p className="waffle-big-label">{headlineLabel}</p>

          <ul className="waffle-legend">
            {segments.map((seg) => (
              <li key={seg.key}>
                <span className="swatch" style={{ background: seg.color }} />
                <span className="legend-label">{seg.label}</span>
                <span className="legend-val">{seg.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p id="waffle-desc" className="visually-hidden">
        Od 100 poziva upućenih maloj firmi, na 37,8 odsto se neko javi, 37,8 odsto
        završi na govornoj pošti, a na 24,3 odsto niko se ne javi i nema odgovora.
      </p>

      <p className="waffle-source">
        Izvor:{" "}
        <a href={source.url} target="_blank" rel="noopener noreferrer">
          {source.label}
        </a>
      </p>
    </figure>
  );
}
