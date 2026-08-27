import { useCopy } from "../i18n";

/* Line icons, one per service. Drawn bare rather than set in a filled chip: six
   32px squares were the only card-like thing left in the section, and they read
   as weight rather than as information. */
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
};

function Icon({ name, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round] ${className}`}
    >
      {ICONS[name]}
    </svg>
  );
}

/* Icon order matches the service order in the language files. The first entry is
   the lead; the rest fall through to the ledger, hence the +1 offset there. */
const ICON_ORDER = ["message", "nodes", "bell", "star", "window", "layout"];

export default function Services({ titleAs: Title = "h2" }) {
  const copy = useCopy();
  const [lead, ...rest] = copy.services.items;
  const ItemTitle = Title === "h1" ? "h2" : "h3";

  return (
    <section className="sec" id="resenje" aria-labelledby="resenje-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            {copy.services.eyebrow}
          </p>
        </div>
        <div>
          <Title id="resenje-title" className="h2" data-reveal>
            {copy.services.title}
          </Title>

          {/* The one service the rest of the page is an argument for — the missed
              call in Problem and both ends of the fork in Rezultat resolve here —
              so it is stated at full width instead of sharing a cell with five
              others. It is also the section's only raised surface: one step up
              from the ground rather than the old grid's cells, which were painted
              darker than the section containing them. */}
          <div
            className="card card-accent mt-10 grid gap-x-12 gap-y-4 min-[1080px]:grid-cols-2 min-[1080px]:items-end min-[840px]:p-10"
            data-reveal
          >
            <div>
              <p className="flex items-center gap-2.5 text-eyebrow font-bold tracking-[0.16em] text-accent-ink/70 uppercase">
                <Icon name={ICON_ORDER[0]} className="size-3.5 shrink-0" />
                {copy.services.leadTag}
              </p>
              {/* Display weight, not the ledger's semibold: this is the one name
                  in the section that carries at heading size. */}
              <ItemTitle className="font-display mt-4 max-w-[16ch] text-[26px] leading-[1.14] font-normal tracking-[-0.012em] min-[1080px]:text-[32px]">
                {lead.name}
              </ItemTitle>
            </div>
            {/* Set beside the name rather than under it, bottom-aligned, so the
                cell fills its own width instead of trailing off into empty space
                on the right. */}
            <p className="max-w-[46ch] text-[15.5px] leading-relaxed text-ink-2 min-[1080px]:pb-1">
              {lead.line}
            </p>
          </div>

          {/* Everything else as a ledger: name and line on one line each,
              separated by the same hairline the rest of the page divides with.
              Both this and the lead above split at 1080px, not 840px, so the
              section goes two-column at exactly the width where .grid2 returns to
              its full 240px rail. The old grid broke at Tailwind's own 640/1024
              instead, and spent 840–1024px two-up under an already-stacked
              rail. */}
          <div className="mt-14" data-reveal style={{ "--reveal-delay": "90ms" }}>
            <p className="eyebrow">{copy.services.moreTag}</p>

            <ul className="mt-5 list-none border-b border-rule p-0">
              {rest.map((service, i) => (
                <li
                  key={ICON_ORDER[i + 1]}
                  className="group grid gap-x-10 gap-y-1.5 border-t border-rule py-5 min-[1080px]:grid-cols-[minmax(0,16rem)_1fr] min-[1080px]:py-6"
                >
                  <ItemTitle className="flex items-start gap-3 text-[16px] leading-snug font-semibold tracking-[-0.012em]">
                    <Icon
                      name={ICON_ORDER[i + 1]}
                      className="mt-0.5 size-4 shrink-0 text-faint transition-colors group-hover:text-brand-soft"
                    />
                    {service.name}
                  </ItemTitle>
                  <p className="pl-7 text-[14.5px] leading-relaxed text-muted min-[1080px]:pl-0">
                    {service.line}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
