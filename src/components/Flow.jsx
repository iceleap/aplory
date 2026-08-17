import { Fragment } from "react";
import { outcomeTimeline, recoveryThread } from "../data/content";

/* Dot colour per event. `miss` is shared by both tracks — it is the same missed
   call in each — so it stays neutral; what happens after is the point. */
const DOT = {
  miss: "bg-muted",
  lost: "bg-c-none",
  send: "bg-brand-a",
  done: "bg-live",
};

/* Anchor a label by where it sits on the axis, not by its index: centred in the
   middle, but flush left near 0% and flush right near the end, so nothing
   overflows the container. */
function anchor(pct) {
  if (pct <= 10) return "";
  if (pct >= 70) return "md:-translate-x-full";
  return "md:-translate-x-1/2";
}

function Track({ track, spanMin }) {
  const bad = track.tone === "bad";
  // The axis stops at the last event. The success track therefore ends a quarter
  // of the way across while the other runs on — the comparison the section is for.
  const endPct = (track.nodes[track.nodes.length - 1].atMin / spanMin) * 100;

  return (
    <div className="pt-2">
      <h3
        className={`text-xs font-bold tracking-[0.14em] uppercase ${
          bad ? "text-muted" : "text-brand-b"
        }`}
      >
        {track.label}
      </h3>

      {/* Below md the absolute positioning never applies, so the same nodes
          simply stack as a list. One set of markup, two layouts. */}
      <div className="relative mt-4 md:mt-9 md:h-24">
        <span
          aria-hidden="true"
          style={{ width: `${endPct}%` }}
          className={`hidden md:block md:absolute md:top-7.5 md:left-0 md:h-px ${
            bad
              ? "md:bg-[repeating-linear-gradient(to_right,var(--color-rule)_0_4px,transparent_4px_9px)]"
              : "md:bg-rule"
          }`}
        />

        <ol className="flex list-none flex-col gap-3 p-0 md:block">
          {track.nodes.map((node, i) => {
            const pct = (node.atMin / spanMin) * 100;
            // Alternate labels above/below the axis: 09:41 and +30 sek sit only
            // ~4% apart and would otherwise overlap.
            const below = i % 2 === 1;

            return (
              <Fragment key={`${node.time}-${node.title}`}>
              <li
                style={{ "--x": `${pct}%` }}
                className="flex items-center gap-3 md:absolute md:top-0 md:left-(--x) md:block md:h-24"
              >
                <span
                  aria-hidden="true"
                  className={`size-3 shrink-0 rounded-full ring-4 ring-paper md:absolute md:top-6 md:left-0 md:-translate-x-1/2 ${DOT[node.tone]}`}
                />
                <span
                  className={`block md:absolute md:left-0 md:w-max ${
                    below ? "md:top-11.5" : "md:top-0"
                  } ${anchor(pct)}`}
                >
                  <span className="text-[12.5px] font-semibold text-muted tabular-nums">
                    {node.time}
                  </span>
                  <span
                    className={`ml-2 text-[15px] md:mt-0.5 md:ml-0 md:block ${
                      bad ? "text-ink-2" : "text-ink"
                    }`}
                  >
                    {node.title}
                  </span>
                </span>
              </li>

              {/* The silence sits inside the list so it survives both layouts:
                  a line between the two events on mobile, a caption floating
                  over the empty stretch of axis from md up. */}
              {track.gap && i === 0 && (
                <li
                  style={{
                    "--gx": `${((track.gap.fromMin + track.gap.toMin) / 2 / spanMin) * 100}%`,
                  }}
                  className="pl-6 text-[13px] text-muted md:absolute md:top-9.5 md:left-(--gx) md:-translate-x-1/2 md:pl-0 md:text-[12.5px]"
                >
                  {track.gap.label}
                </li>
              )}
              </Fragment>
            );
          })}
        </ol>
      </div>

      <p
        className={`mt-4 border-t border-rule pt-3 text-[15px] font-semibold md:mt-2 ${
          bad ? "text-c-none" : "text-live"
        }`}
      >
        {track.outcome}
      </p>
    </div>
  );
}

function PhoneMockup() {
  const { caption, missed, messages, confirmation } = recoveryThread;

  return (
    <figure className="m-0 w-full max-w-82.5">
      <figcaption className="mb-3 text-xs font-bold tracking-[0.14em] text-muted uppercase">
        {caption}
      </figcaption>

      <div className="overflow-hidden rounded-[22px] border border-rule bg-paper shadow-[0_20px_50px_-30px_rgba(11,18,32,0.5)]">
        <div className="flex items-center gap-2.5 border-b border-rule-soft bg-surface px-4 py-3">
          <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-c-none/12">
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
                className={`flex max-w-[86%] flex-col gap-1 ${ours ? "self-start" : "self-end items-end"}`}
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
          <p className="rail-note">Isti propušten poziv, samo sa drugačijim krajem.</p>
        </div>
        <div>
          <h2 id="rezultat-title" className="h2">
            Tri minuta umesto izgubljenog klijenta.
          </h2>

          <div className="mt-10 flex flex-col gap-10 md:mt-12 md:gap-6">
            {outcomeTimeline.tracks.map((track) => (
              <Track key={track.key} track={track} spanMin={outcomeTimeline.spanMin} />
            ))}
          </div>

          <div className="mt-12 border-t border-rule pt-10">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
