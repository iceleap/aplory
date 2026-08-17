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

function Row({ item, muted = false, badge = null }) {
  return (
    <li
      className={`grid grid-cols-[34px_1fr] items-start gap-x-5 border-b border-rule py-6 ${
        muted ? "opacity-55" : ""
      }`}
    >
      <span
        className={`grid size-[34px] place-items-center rounded-lg border ${
          muted ? "border-rule bg-surface text-muted" : "border-rule bg-paper text-brand-b"
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-[18px] fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]"
        >
          {ICONS[item.icon]}
        </svg>
      </span>
      <div>
        <h3 className="flex flex-wrap items-center gap-3 text-[19px] font-semibold tracking-[-0.012em]">
          {item.name}
          {badge}
        </h3>
        <p className="mt-1 max-w-[62ch] text-[15px] text-muted">{item.line}</p>
      </div>
    </li>
  );
}

export default function Services() {
  return (
    <section className="sec bg-surface" id="resenje" aria-labelledby="resenje-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">Rešenje</p>
          <p className="rail-note">Počnite od jedne stvari. Ostalo se dodaje kad zatreba.</p>
        </div>
        <div>
          <h2 id="resenje-title" className="h2">
            Hvatamo svaki upit i odgovaramo umesto vas.
          </h2>

          <ul className="mt-12 list-none border-t border-rule p-0">
            {services.map((service) => (
              <Row key={service.name} item={service} />
            ))}

            <Row
              item={upcoming}
              muted
              badge={
                <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-bold tracking-[0.12em] text-muted uppercase">
                  U pripremi
                </span>
              }
            />
          </ul>
        </div>
      </div>
    </section>
  );
}
