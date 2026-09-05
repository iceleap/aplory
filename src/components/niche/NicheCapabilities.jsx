/**
 * "Šta APLORY radi za vas" — the per-profession answer to the home page's
 * generic Services ledger (src/components/Services.jsx). Deliberately a card
 * grid rather than a bordered ledger: Problem (above) and HowItWorks' steps
 * are both single-column lists already, so a third one back to back read as
 * one long undifferentiated list. A grid gives the eye a different shape to
 * land on and keeps the section short — four items, not a full service menu.
 *
 * Skipped entirely when the niche has no `capabilities` block yet.
 */
export default function NicheCapabilities({ capabilities }) {
  if (!capabilities) return null;

  return (
    <section className="sec" id="resenje" aria-labelledby="resenje-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            {capabilities.eyebrow || "Šta dobijate"}
          </p>
        </div>
        <div>
          <h2 id="resenje-title" className="h2" data-reveal>
            {capabilities.title}
          </h2>

          <ul
            className="mt-10 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2"
            data-reveal
            style={{ "--reveal-delay": "80ms" }}
          >
            {capabilities.items.map((item, i) => (
              <li
                key={i}
                className="rounded-2xl border border-rule bg-paper p-5 min-[840px]:p-6"
              >
                <p className="text-[15.5px] leading-snug font-semibold tracking-[-0.012em] text-ink">
                  {item.name}
                </p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{item.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
