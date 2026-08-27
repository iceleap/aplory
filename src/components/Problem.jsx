import { useCopy } from "../i18n";
import "./Problem.css";

export default function Problem() {
  const copy = useCopy();

  return (
    <section className="sec" id="problem" aria-labelledby="problem-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            {copy.problem.eyebrow}
          </p>

          {/* The section's one piece of evidence, moved into the rail so it
              sits beside the argument instead of trailing after it. */}
          <p className="prob-stat" data-reveal style={{ "--reveal-delay": "80ms" }}>
            <span className="prob-stat-num">{copy.problem.stat.value}</span>
            {" "}
            {copy.problem.stat.body}
            <cite className="prob-stat-src">{copy.problem.stat.source}</cite>
          </p>
        </div>
        <div>
          <h2 id="problem-title" className="h2" data-reveal>
            {copy.problem.title}
          </h2>

          <ul className="prob-list" data-reveal>
            {copy.problem.cards.map((card, i) => (
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
