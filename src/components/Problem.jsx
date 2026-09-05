import { useCopy } from "../i18n";
import "./Problem.css";

/**
 * Shared by the home page and the niche landing pages: bare on the home page,
 * with `title`/`cards` overridden per profession (src/data/niches.js `pains`).
 * `stat` defaults to the site-wide figure; pass `stat={null}` to drop the rail
 * figure, which is what niche pages do — their evidence is the cost block in
 * niche/NicheProof.jsx, sized to that profession rather than to everyone.
 */
export default function Problem({ title, cards, stat }) {
  const copy = useCopy();
  const figure = stat === undefined ? copy.problem.stat : stat;

  return (
    <section className="sec" id="problem" aria-labelledby="problem-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            {copy.problem.eyebrow}
          </p>

          {/* The section's one piece of evidence, moved into the rail so it
              sits beside the argument instead of trailing after it. */}
          {figure && (
            <p className="prob-stat" data-reveal style={{ "--reveal-delay": "80ms" }}>
              <span className="prob-stat-num">{figure.value}</span>
              {" "}
              {figure.body}
              <cite className="prob-stat-src">{figure.source}</cite>
            </p>
          )}
        </div>
        <div>
          <h2 id="problem-title" className="h2" data-reveal>
            {title || copy.problem.title}
          </h2>

          <ul className="prob-list" data-reveal>
            {(cards || copy.problem.cards).map((card, i) => (
              <li key={i}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
