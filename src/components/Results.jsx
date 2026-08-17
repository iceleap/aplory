import { benchmarks } from "../data/research";

export default function Results() {
  return (
    <section className="sec bg-surface" aria-labelledby="istrazivanja-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            Istraživanja
          </p>
        </div>
        <div>
          <h2 id="istrazivanja-title" className="h2" data-reveal>
            Zašto brzina odgovora odlučuje.
          </h2>

          <ul className="mt-11 grid list-none gap-x-12 gap-y-8 p-0 sm:grid-cols-3" data-reveal>
            {benchmarks.map((item) => (
              <li key={item.value}>
                <h3 className="text-[46px] leading-none font-[250] tracking-[-0.04em] tabular-nums">
                  {item.value}
                </h3>
                <p className="mt-3 text-[15px] leading-snug text-ink-2">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-[76ch] border-t border-rule pt-5 text-xs leading-relaxed text-muted">
            Tuđa istraživanja, ne naši rezultati — navodimo ih kao pokazatelj
            problema. Izvori:{" "}
            <a
              className="border-b border-rule hover:border-brand-a hover:text-ink"
              href={benchmarks[0].source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Harvard Business Review, 2011
            </a>{" "}
            i{" "}
            <a
              className="border-b border-rule hover:border-brand-a hover:text-ink"
              href={benchmarks[2].source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT / InsideSales, 2007
            </a>
            . Američko tržište, 2007–2016.
          </p>
        </div>
      </div>
    </section>
  );
}
