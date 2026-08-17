import { services, upcoming } from "../data/content";

/* Line icons, one per service, kept visually distinct at 18px. */
const ICONS = {
  message: (
    <>
      <path d="M3.5 6.5h17v11h-9l-4 3v-3h-4Z" />
      <path d="M8 11.5h8" />
    </>
  ),
  nodes: (
    <>
      <circle cx="12" cy="5" r="2.3" />
      <circle cx="5.5" cy="17" r="2.3" />
      <circle cx="18.5" cy="17" r="2.3" />
      <path d="m10.5 7-3.2 5.8M13.5 7l3.2 5.8M8 17.5h8" />
    </>
  ),
  bell: (
    <>
      <path d="M6 10a6 6 0 1 1 12 0c0 3.5 1.2 5 1.2 5H4.8S6 13.5 6 10Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>
  ),
  star: <path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8Z" />,
  window: (
    <>
      <rect x="3.5" y="4.5" width="17" height="13" rx="2" />
      <path d="M3.5 8.5h17M8 20h8" />
    </>
  ),
  layout: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M9 9.5v10" />
    </>
  ),
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />,
};

function Icon({ name, muted = false }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-8 shrink-0 place-items-center rounded-lg ${
        muted ? "bg-surface text-muted" : "bg-surface-2 text-brand-b"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4 fill-none stroke-current stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]"
      >
        {ICONS[name]}
      </svg>
    </span>
  );
}

export default function Services() {
  return (
    <section className="sec bg-surface" id="resenje" aria-labelledby="resenje-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            Rešenje
          </p>
          <p className="rail-note">Počnite od jedne stvari. Ostalo se dodaje kad zatreba.</p>
        </div>
        <div>
          <h2 id="resenje-title" className="h2" data-reveal>
            Hvatamo svaki upit i odgovaramo umesto vas.
          </h2>

          {/* A hairline matrix rather than separate cards: the 1px gaps let the
              section's own rule colour show through, which keeps six items
              compact without six sets of borders competing. */}
          <ul
            className="mt-10 grid list-none grid-cols-1 gap-px overflow-hidden rounded-xl border border-rule bg-rule p-0 sm:grid-cols-2 lg:grid-cols-3"
            data-reveal
          >
            {services.map((service) => (
              <li
                key={service.name}
                className="flex flex-col gap-3 bg-paper p-5 transition-colors hover:bg-surface"
              >
                <Icon name={service.icon} />
                <h3 className="text-[15.5px] leading-snug font-semibold tracking-[-0.01em]">
                  {service.name}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-muted">{service.line}</p>
              </li>
            ))}
          </ul>

          {/* Not sold yet, so it sits outside the grid entirely — a roadmap note
              rather than a seventh thing on the menu. */}
          <div
            className="mt-3 flex items-center gap-4 rounded-xl border border-dashed border-rule px-5 py-4"
            data-reveal
            style={{ "--reveal-delay": "80ms" }}
          >
            <Icon name={upcoming.icon} muted />
            <div className="min-w-0">
              <h3 className="flex flex-wrap items-center gap-2.5 text-[15.5px] font-semibold text-muted">
                {upcoming.name}
                <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[10.5px] font-bold tracking-[0.12em] text-muted uppercase">
                  U pripremi
                </span>
              </h3>
              <p className="mt-0.5 text-[13.5px] text-muted">{upcoming.line}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
