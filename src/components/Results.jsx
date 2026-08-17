import { benchmarks } from "../data/research";
import CountUp from "../lib/CountUp";
import { useCopy } from "../i18n";

export default function Results() {
  const copy = useCopy();

  return (
    <section className="sec bg-surface" id="istrazivanja" aria-labelledby="istrazivanja-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            {copy.research.eyebrow}
          </p>
        </div>
        <div>
          <h2 id="istrazivanja-title" className="h2" data-reveal>
            {copy.research.title}
          </h2>

          <ul className="mt-11 grid list-none gap-x-12 gap-y-8 p-0 sm:grid-cols-3" data-reveal>
            {benchmarks.map((item, i) => (
              <li key={item.value}>
                {/* A heading, not a styled paragraph: at 46px it reads as one,
                    and the label under it is the rest of the entry. */}
                <h3 className="text-[46px] leading-none font-[250] tracking-[-0.04em] tabular-nums">
                  <CountUp>{item.value}</CountUp>
                </h3>
                <p className="mt-3 text-[15px] leading-snug text-ink-2">
                  {copy.research.labels[i]}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-[76ch] border-t border-rule pt-5 text-xs leading-relaxed text-muted">
            {copy.research.caveatBefore}{" "}
            <a
              className="border-b border-rule hover:border-brand-a hover:text-ink"
              href={benchmarks[0].source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {benchmarks[0].source.label}
            </a>{" "}
            {copy.research.caveatBetween}{" "}
            <a
              className="border-b border-rule hover:border-brand-a hover:text-ink"
              href={benchmarks[2].source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {benchmarks[2].source.label}
            </a>
            {copy.research.caveatAfter}
          </p>
        </div>
      </div>
    </section>
  );
}
