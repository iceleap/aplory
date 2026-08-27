import niches from "../data/niches";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
  className: "size-5 fill-none stroke-current stroke-[1.5]",
};

const NICHE_ICONS = {
  stomatolozi: (
    <svg {...ICON_PROPS}>
      <path
        d="M12 4c-2.2 0-3.2 1.3-4.5 1.3C5.8 5.3 4.5 6.8 4.5 9c0 2.6 1 4.8 1.6 7.2.4 1.6.8 3.3 2 3.3 1.4 0 1.4-2.8 1.9-4.6.3-1.1.7-1.9 2-1.9s1.7.8 2 1.9c.5 1.8.5 4.6 1.9 4.6 1.2 0 1.6-1.7 2-3.3.6-2.4 1.6-4.6 1.6-7.2 0-2.2-1.3-3.7-3-3.7-1.3 0-2.3-1.3-4.5-1.3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  veterinari: (
    <svg {...ICON_PROPS}>
      <circle cx="7" cy="8.3" r="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="8.3" r="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.7" cy="4.8" r="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14.3" cy="4.8" r="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="12" cy="15.3" rx="4.3" ry="3.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  advokati: (
    <svg {...ICON_PROPS}>
      <path d="M12 3v18M8 21h8M3 7h18M6.5 4.5 12 3l5.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M3 7 1 12.5a2.7 2.7 0 0 0 2.6 2A2.7 2.7 0 0 0 6 12.5L4 7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 7l-2 5.5a2.7 2.7 0 0 0 2.4 2A2.7 2.7 0 0 0 23 12.5L21 7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "auto-servisi": (
    <svg {...ICON_PROPS}>
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  saloni: (
    <svg {...ICON_PROPS}>
      <circle cx="6" cy="6" r="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 5 7.8 14M20 19 7.8 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ecommerce: (
    <svg {...ICON_PROPS}>
      <path
        d="M6 8h12l-1 12H7L6 8Zm2.5 0V6a3.5 3.5 0 0 1 7 0v2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  klimatizacija: (
    <svg {...ICON_PROPS}>
      <rect x="3" y="4" width="18" height="7" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.2" cy="7.5" r="0.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 15v4M12 15v5M17 15v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "pvc-stolarija": (
    <svg {...ICON_PROPS}>
      <rect x="4" y="4" width="16" height="16" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4v16M4 12h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  majstori: (
    <svg {...ICON_PROPS}>
      <path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.64 15 22 10.64" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

/**
 * Links out to the per-niche landing pages (src/pages/NicheLanding.jsx, one
 * real URL per profession — see vite.config.js). A real page link, not an
 * anchor: NAV goes to it via a plain href, unlike every other tab in
 * Header.jsx which scrolls within this page.
 */
export default function Niches() {
  return (
    <section className="sec bg-surface" id="za-koga" aria-labelledby="za-koga-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            Za koga
          </p>
        </div>
        <div>
          <h2 id="za-koga-title" className="h2" data-reveal>
            Ista ideja, prilagođena vašoj delatnosti.
          </h2>
          <p className="lead-note" data-reveal>
            Isti princip, drugačiji razgovor. Izaberite svoju delatnost i pogledajte kako APLORY
            odgovara vašim klijentima.
          </p>

          <ul
            className="mt-10 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3"
            data-reveal
            style={{ "--reveal-delay": "80ms" }}
          >
            {niches.map((niche) => (
              <li key={niche.slug}>
                <a
                  href={`/${niche.slug}.html`}
                  className="group flex flex-col gap-4 rounded-2xl border border-rule bg-paper p-4 transition-colors hover:border-ink"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-surface text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                    {NICHE_ICONS[niche.slug]}
                  </span>
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[14.5px] font-semibold tracking-[-0.008em] text-ink">
                      {niche.navLabel}
                    </span>
                    <svg
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="size-3.5 shrink-0 fill-none stroke-current stroke-[1.5] text-faint transition-colors group-hover:text-ink"
                    >
                      <path d="M5 15 15 5M7 5h8v8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
