import { recoveryFlow } from "../data/content";

/* One dot per step; the tone decides its colour and mark. */
const TONE = {
  miss: { ring: "border-c-none/40", dot: "bg-c-none", label: "Propušteno" },
  send: { ring: "border-brand-a/40", dot: "bg-brand-a", label: "Automatski" },
  done: { ring: "border-live/40", dot: "bg-live", label: "Rešeno" },
};

export default function Flow() {
  return (
    <section className="sec" id="rezultat" aria-labelledby="rezultat-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">Rezultat</p>
          <p className="rail-note">Isti propušten poziv, samo sa drugačijim krajem.</p>
        </div>
        <div>
          <h2 id="rezultat-title" className="h2">
            Tri minuta umesto izgubljenog klijenta.
          </h2>

          <ol className="mt-12 list-none p-0">
            {recoveryFlow.map((step, i) => {
              const tone = TONE[step.tone];
              const last = i === recoveryFlow.length - 1;

              return (
                <li key={step.time} className="grid grid-cols-[110px_32px_1fr] gap-x-5">
                  <span className="pt-0.5 text-right text-[13.5px] font-semibold text-muted tabular-nums">
                    {step.time}
                  </span>

                  {/* Rail: the dot, plus the line running down to the next step. */}
                  <span className="relative flex justify-center" aria-hidden="true">
                    <span
                      className={`z-10 mt-1.5 grid size-4 place-items-center rounded-full border-2 bg-paper ${tone.ring}`}
                    >
                      <span className={`size-1.5 rounded-full ${tone.dot}`} />
                    </span>
                    {!last && (
                      <span className="absolute top-6 bottom-0 w-px bg-rule" />
                    )}
                  </span>

                  <div className={last ? "pb-0" : "pb-9"}>
                    {/* The status sits inside the heading rather than above it —
                        a bold standalone label reads as a heading it isn't. */}
                    <h3 className="flex flex-wrap items-center gap-3 text-[19px] font-semibold tracking-[-0.012em]">
                      <span className="rounded-full border border-rule px-2.5 py-0.5 text-xs font-bold tracking-[0.1em] text-muted uppercase">
                        {tone.label}
                      </span>
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-[54ch] text-[15px] text-muted">{step.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="mt-10 border-t border-rule pt-6 text-[15px] text-ink-2">
            Bez nas, korak dva se nikad ne desi — pozivalac zove sledećeg na spisku.
          </p>
        </div>
      </div>
    </section>
  );
}
