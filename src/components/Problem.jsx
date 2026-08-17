import CallWaffle from "./CallWaffle";
import Research from "./Research";
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
        </div>
        <div>
          <h2 id="problem-title" className="h2" data-reveal>
            {copy.problem.title}
          </h2>
          <p className="lead-note" data-reveal>
            {copy.problem.lead}
          </p>

          <CallWaffle />

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

      {/* The outside figures close the argument the cards make, but they are a
          movement of their own — so they get the same rail-and-content structure
          a section would, rather than trailing the cards. */}
      <div className="wrap grid2 mt-16 border-t border-rule pt-12 lg:mt-20 lg:pt-16">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            {copy.research.eyebrow}
          </p>
        </div>
        <div>
          <Research />
        </div>
      </div>
    </section>
  );
}
