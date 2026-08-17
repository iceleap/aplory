import { outcomeFork, recoveryThread } from "../data/content";

/* Where the branches split away from the shared stem, and how far apart they
   sit vertically. Fixed pixels: only the horizontal extents are fluid. */
const FORK_X = 130; // px from the left edge — clears the origin label
const RADIUS = 16; // corner radius of the elbows
const SPREAD = 72; // px from the centre line to each branch

/* Both branches end at the same moment, so there is no time scale to place them
   on — one shared stopping point is the whole layout model. */
const END_PCT = 62;

/* The phone hangs from the success branch's opening node — where the
   conversation actually starts — so it occupies the run between that node and
   the ending, under the line. */
const PHONE_X = FORK_X + RADIUS; // the opening node's x
const SUCCESS_Y = 160 + SPREAD; // success line, measured from the fork's own top

function Endpoint({ branch }) {
  const good = branch.tone === "good";
  // Losing path on top, ours below, so the section ends on the good outcome.
  const dy = good ? SPREAD : -SPREAD;

  /* The branch's own labels go on the inward side and the ending goes outward.
     Keeping them on opposite sides of the line is what stops them colliding
     when the column narrows — they can never share a horizontal band. */
  const inward = good ? "md:-translate-y-[calc(100%+10px)]" : "md:translate-y-2.5";
  const outward = good ? "md:translate-y-3" : "md:-translate-y-[calc(100%+12px)]";

  return (
    <>
      {/* Branch line, from the elbow out to the endpoint. */}
      <span
        aria-hidden="true"
        style={{
          left: `${FORK_X + RADIUS}px`,
          top: `calc(50% + ${dy}px)`,
          width: `calc(${END_PCT}% - ${FORK_X + RADIUS}px)`,
        }}
        className={`hidden md:block md:absolute md:h-px ${
          good
            ? "md:bg-rule"
            : "md:bg-[repeating-linear-gradient(to_right,var(--color-rule)_0_4px,transparent_4px_9px)]"
        }`}
      />

      {/* Inward: what happens along the way. One short line, so the area around
          the split stays quiet — the branch name now lives at the far end. */}
      <span
        style={{ left: `${FORK_X + RADIUS + 18}px`, top: `calc(50% + ${dy}px)` }}
        className={`hidden md:block md:absolute md:w-max ${inward}`}
      >
        {branch.start ? (
          <>
            <span className="text-[12.5px] font-semibold text-brand-b">
              {branch.start.time}
            </span>
            <span className="ml-2 text-[13.5px] text-ink-2">{branch.start.title}</span>
          </>
        ) : (
          <span className="text-[12.5px] text-muted">{branch.path}</span>
        )}
      </span>

      {/* Opening node, pinned where the branch leaves the fork. */}
      {branch.start && (
        <span
          aria-hidden="true"
          style={{ left: `${FORK_X + RADIUS}px`, top: `calc(50% + ${dy}px)` }}
          className="hidden md:block md:absolute md:size-2.5 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-full md:bg-brand-a md:ring-4 md:ring-paper"
        />
      )}

      {/* Outward: the ending, headed by the branch name so everything about a
          path is grouped in one place. */}
      <span
        aria-hidden="true"
        style={{ left: `${END_PCT}%`, top: `calc(50% + ${dy}px)` }}
        className={`hidden md:block md:absolute md:size-3.5 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-full md:ring-4 md:ring-paper ${
          good ? "md:bg-live" : "md:bg-c-none"
        }`}
      />
      {/* Both endings are written the same way and sit to the right of their
          own dot — same clock time, opposite outcome, one above the line and
          one below. Extending rightward rather than back over the branch also
          keeps this clear of the phone, which occupies the run between the
          opening and closing nodes. */}
      <span
        style={{ left: `calc(${END_PCT}% + 22px)`, top: `calc(50% + ${dy}px)` }}
        className={`hidden md:block md:absolute md:w-max ${outward}`}
      >
        <span
          className={`block text-xs font-bold tracking-[0.14em] uppercase ${
            good ? "text-brand-b" : "text-muted"
          }`}
        >
          {branch.label}
        </span>
        <span className="mt-1.5 block">
          <span className="text-[12.5px] font-semibold text-muted tabular-nums">
            {branch.end.time}
          </span>
          <span className="ml-2 text-[15px] text-ink">{branch.end.title}</span>
        </span>
        <span
          className={`mt-0.5 block text-[13px] font-semibold ${
            good ? "text-live" : "text-c-none"
          }`}
        >
          {branch.end.outcome}
        </span>
      </span>
    </>
  );
}

/** Stacked, connector-free rendering used below md. */
function ForkList() {
  return (
    <div className="md:hidden">
      <p className="flex items-baseline gap-3">
        <span className="size-3 shrink-0 translate-y-0.5 rounded-full bg-muted" aria-hidden="true" />
        <span>
          <span className="text-[12.5px] font-semibold text-muted tabular-nums">
            {outcomeFork.origin.time}
          </span>
          <span className="ml-2 text-[15px]">{outcomeFork.origin.title}</span>
        </span>
      </p>

      <div className="mt-5 flex flex-col gap-5">
        {outcomeFork.branches.map((branch) => {
          const good = branch.tone === "good";
          return (
            <div
              key={branch.key}
              className={`border-l-2 pl-4 ${good ? "border-live/40" : "border-c-none/30"}`}
            >
              <p
                className={`text-xs font-bold tracking-[0.14em] uppercase ${
                  good ? "text-brand-b" : "text-muted"
                }`}
              >
                {branch.label}
              </p>
              {branch.start ? (
                <p className="mt-1.5">
                  <span className="text-[12.5px] font-semibold text-brand-b">
                    {branch.start.time}
                  </span>
                  <span className="ml-2 text-[13.5px] text-ink-2">{branch.start.title}</span>
                </p>
              ) : (
                <p className="mt-1.5 text-[13px] text-muted">{branch.path}</p>
              )}
              <p className="mt-2">
                <span className="text-[12.5px] font-semibold text-muted tabular-nums">
                  {branch.end.time}
                </span>
                <span className="ml-2 text-[15px] text-ink">{branch.end.title}</span>
              </p>
              <p
                className={`mt-1 text-[13px] font-semibold ${
                  good ? "text-live" : "text-c-none"
                }`}
              >
                {branch.end.outcome}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Fork() {
  const { origin, branches } = outcomeFork;

  return (
    <div className="relative md:h-80">
      <ForkList />

      {/* Shared stem out to the fork point. */}
      <span
        aria-hidden="true"
        style={{ width: `${FORK_X}px` }}
        className="hidden md:block md:absolute md:top-1/2 md:left-0 md:h-px md:bg-rule"
      />

      {/* Riser plus the two rounded elbows that turn each branch outward. */}
      <span
        aria-hidden="true"
        style={{
          left: `${FORK_X}px`,
          top: `calc(50% - ${SPREAD - RADIUS}px)`,
          height: `${(SPREAD - RADIUS) * 2}px`,
        }}
        className="hidden md:block md:absolute md:w-px md:bg-rule"
      />
      <span
        aria-hidden="true"
        style={{
          left: `${FORK_X}px`,
          top: `calc(50% - ${SPREAD}px)`,
          width: `${RADIUS}px`,
          height: `${RADIUS}px`,
          borderTopLeftRadius: `${RADIUS}px`,
        }}
        className="hidden md:block md:absolute md:border-t md:border-l md:border-rule"
      />
      <span
        aria-hidden="true"
        style={{
          left: `${FORK_X}px`,
          top: `calc(50% + ${SPREAD - RADIUS}px)`,
          width: `${RADIUS}px`,
          height: `${RADIUS}px`,
          borderBottomLeftRadius: `${RADIUS}px`,
        }}
        className="hidden md:block md:absolute md:border-b md:border-l md:border-rule"
      />

      {/* Shared origin — the same missed call either way, so it stays neutral. */}
      <span
        aria-hidden="true"
        className="hidden md:block md:absolute md:top-1/2 md:left-0 md:size-3.5 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-full md:bg-muted md:ring-4 md:ring-paper"
      />
      <span className="hidden md:block md:absolute md:top-1/2 md:left-0 md:w-max md:translate-y-3">
        <span className="block text-[12.5px] font-semibold text-muted tabular-nums">
          {origin.time}
        </span>
        <span className="block text-[15px] text-ink">{origin.title}</span>
      </span>

      {branches.map((branch) => (
        <Endpoint key={branch.key} branch={branch} />
      ))}
    </div>
  );
}

/**
 * What the automatic reply turns into. It hangs from the success branch's
 * opening node, so the "odmah · Automatski odgovor" label on the line above is
 * its heading — it carries no caption of its own, and the booking is stated
 * once, on the branch's endpoint.
 */
function PhoneMockup() {
  const { missed, messages, confirmation } = recoveryThread;

  return (
    <figure className="m-0 w-full max-w-82.5">

      <div className="overflow-hidden rounded-[22px] border border-rule bg-paper shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)]">
        <div className="flex items-center gap-2.5 border-b border-rule-soft bg-surface px-4 py-3">
          <span
            aria-hidden="true"
            className="grid size-6 place-items-center rounded-full bg-c-none/12"
          >
            <svg
              viewBox="0 0 20 20"
              className="size-3 fill-none stroke-c-none stroke-[1.7] [stroke-linecap:round]"
            >
              <path d="M5.4 2.6h2.5l1.2 3.3-1.6 1.2a10 10 0 0 0 5 5l1.2-1.6 3.3 1.2v2.5a1.7 1.7 0 0 1-1.8 1.7A14 14 0 0 1 3.7 4.4a1.7 1.7 0 0 1 1.7-1.8Z" />
            </svg>
          </span>
          <span className="text-[13px] font-semibold">{missed.label}</span>
          <span className="ml-auto text-[12px] text-muted tabular-nums">{missed.time}</span>
        </div>

        <ol className="flex list-none flex-col gap-2.5 p-4">
          {messages.map((msg) => {
            const ours = msg.from === "us";
            return (
              <li
                key={msg.text}
                className={`flex max-w-[86%] flex-col gap-1 ${
                  ours ? "self-start" : "items-end self-end"
                }`}
              >
                <span
                  className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
                    ours
                      ? "rounded-bl-sm bg-linear-to-br from-brand-a to-brand-b text-white"
                      : "rounded-br-sm bg-surface-2 text-ink"
                  }`}
                >
                  {msg.text}
                </span>
                <span className="text-[11px] text-muted tabular-nums">{msg.time}</span>
              </li>
            );
          })}
        </ol>

        <p className="flex items-center gap-2 border-t border-rule-soft bg-surface px-4 py-3">
          <span aria-hidden="true" className="grid size-5 place-items-center rounded-full bg-live">
            <svg
              viewBox="0 0 20 20"
              className="size-2.5 fill-none stroke-white stroke-[2.4] [stroke-linecap:round] [stroke-linejoin:round]"
            >
              <path d="M4.5 10.5l3.6 3.6L15.5 6" />
            </svg>
          </span>
          <span className="text-[12.5px] font-semibold">{confirmation}</span>
        </p>
      </div>

    </figure>
  );
}

export default function Flow() {
  return (
    <section className="sec" id="rezultat" aria-labelledby="rezultat-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            Rezultat
          </p>
          <p className="rail-note">Sve se odlučuje u prva tri minuta.</p>
        </div>
        <div>
          <h2 id="rezultat-title" className="h2" data-reveal>
            Dva kraja istog poziva.
          </h2>
          <p className="lead-note" data-reveal>
            Razliku pravi jedna automatska poruka, poslata odmah.
          </p>

          {/* On wide screens the phone hangs directly off the success endpoint,
              centred on that branch's line, so the branch ends in it. Narrower
              than xl there is no room beside the fork, so it stacks and is tied
              to the branch by a left rule in the same colour instead. */}
          <div className="relative mt-10 md:mt-14 xl:h-165">
            <Fork />
            <div
              style={{ left: `${PHONE_X}px`, top: `${SUCCESS_Y}px` }}
              className="mt-10 border-l-2 border-live/40 pl-5 xl:absolute xl:mt-0 xl:w-75 xl:translate-y-4 xl:border-l-0 xl:pl-0"
            >
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
