import { benchmarks } from "../data/research";
import CountUp from "../lib/CountUp";
import { useCopy } from "../i18n";

/**
 * The third-party figures behind the problem. Not a section of its own: it sits
 * inside Problem, because a claim and the evidence for it belong together. The
 * rule and the label rail above it come from Problem, which places this as a
 * second movement of that section.
 */
export default function Research() {
  const copy = useCopy();

  return (
    <div>
      <h3 className="h3" data-reveal>
        {copy.research.title}
      </h3>

      <ul className="mt-12 grid list-none gap-x-12 gap-y-14 p-0 sm:grid-cols-3" data-reveal>
        {benchmarks.map((item, i) => (
          <li key={item.value}>
            {/* A heading, not a styled paragraph: at 46px it reads as one, and
                the label under it is the rest of the entry. */}
            <h4 className="text-[46px] leading-none font-[250] tracking-[-0.04em] tabular-nums">
              <CountUp>{item.value}</CountUp>
            </h4>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
              {copy.research.labels[i]}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-14 max-w-[76ch] border-t border-rule pt-6 text-xs leading-relaxed text-muted">
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
  );
}
