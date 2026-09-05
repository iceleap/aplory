/**
 * "Računica" — a per-profession, self-reported cost-of-inaction calculator
 * (src/data/niches.js `proof`). Renders right after HowItWorks: first explain
 * the mechanism, then the cost of not having it, before the pain/capability
 * sections that follow.
 *
 * Skipped entirely when the niche has no `proof` block yet, same convention
 * as NicheCapabilities.
 */
export default function NicheProof({ proof }) {
  if (!proof) return null;

  return (
    <section className="sec bg-surface" id="racunica" aria-labelledby="racunica-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            {proof.eyebrow}
          </p>
        </div>
        <div>
          <h2 id="racunica-title" className="h2" data-reveal>
            {proof.title}
          </h2>
          <p className="lead-note" data-reveal>
            {proof.lede}
          </p>

          <ul
            className="mt-10 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3"
            data-reveal
            style={{ "--reveal-delay": "80ms" }}
          >
            {proof.figures.map((figure, i) => (
              <li key={i} className="card">
                <p className="font-display text-[36px] leading-none tracking-[-0.01em] text-ink min-[840px]:text-[40px]">
                  {figure.value}
                </p>
                <p className="mt-3 text-[14.5px] leading-snug font-semibold text-ink">
                  {figure.label}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{figure.note}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[64ch] text-[16px] leading-relaxed text-ink-2" data-reveal>
            {proof.conclusion}
          </p>
          <p className="mt-4 max-w-[64ch] border-t border-rule pt-3 text-[12px] text-faint" data-reveal>
            {proof.source}
          </p>
        </div>
      </div>
    </section>
  );
}
