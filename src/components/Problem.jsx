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

          <ul className="prob-list" data-reveal>
            {copy.problem.cards.map((card, i) => (
              <li key={i}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </li>
            ))}
          </ul>

          {/* One plain-language stat, kept from the industry research this
              section used to cite in full — see PRODUCT.md. */}
          <p
            className="mt-14 max-w-[58ch] border-t border-rule pt-8 text-[15px] leading-relaxed text-muted"
            data-reveal
            style={{ "--reveal-delay": "80ms" }}
          >
            <span className="font-display text-[28px] leading-none text-ink">
              {copy.problem.stat.value}
            </span>{" "}
            {copy.problem.stat.body}{" "}
            <span className="text-faint">{copy.problem.stat.source}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
