import "../Problem.css";

export default function NichePain({ niche }) {
  return (
    <section className="sec" id="problem" aria-labelledby="problem-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            Problem
          </p>
        </div>
        <div>
          <h2 id="problem-title" className="h2" data-reveal>
            Poziv na koji niko ne odgovori je klijent koji zove sledećeg na spisku.
          </h2>

          <ul className="prob-list" data-reveal>
            {niche.pains.map((card, i) => (
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
