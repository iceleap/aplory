import { useCopy } from "../i18n";

/**
 * The chat mockup, shared by the home page and every niche landing page.
 *
 * Called bare on the home page, where it falls back to the generic thread in
 * sr.js; niche pages pass their own `title` and `demo` (see src/data/niches.js)
 * so the conversation is the one that profession actually has. This used to be
 * two near-identical files — HowItWorks.jsx and niche/NicheHow.jsx — which is
 * how the home page's thread and klimatizacija's drifted apart.
 */
/* Bubble slot suffixes control the reveal animation's timing only (see
   base.css) — they're independent from how-bubble--in/--out, which controls
   color and picks the actual speaker via each message's `type`. This lets a
   channel like Instagram put the customer's message in the slot that used to
   always be APLORY's, without needing new animation rules. Dots (typing
   indicator) sit on slots 3 and 5 regardless of who's speaking there. */
const SLOT_SUFFIXES = ["in-1", "out-1", "in-2", "out-2", "in-3", "out-3"];
const DOTTED_SLOTS = { 2: 2, 4: 3 };

export default function HowItWorks({ title, demo, steps }) {
  const copy = useCopy();
  const thread = demo || copy.how.mock.demo;
  const isInstagram = thread.icon === "instagram";

  return (
    <section className="sec bg-surface" id="kako" aria-labelledby="kako-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            {copy.how.eyebrow}
          </p>
        </div>
        <div>
          <h2 id="kako-title" className="h2" data-reveal>
            {title || (demo ? copy.how.nicheTitle : copy.how.title)}
          </h2>

          <div className="how-layout mt-12">
            <div className="how-mock" data-reveal aria-hidden="true">
              <div className="how-mock__call">
                <span className={`how-mock__icon${isInstagram ? " how-mock__icon--instagram" : ""}`}>
                  <span className="how-mock__ring" />
                  {isInstagram ? (
                    <svg viewBox="0 0 20 20" fill="none" stroke="#e1306c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2.6" y="2.6" width="14.8" height="14.8" rx="4.6" />
                      <circle cx="10" cy="10" r="3.6" />
                      <circle cx="14.3" cy="5.7" r="0.65" fill="#e1306c" stroke="none" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="none" stroke="var(--color-danger)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5.2 2.8h2.4l1.2 3.2-1.6 1.2a9.6 9.6 0 0 0 4.8 4.8l1.2-1.6 3.2 1.2v2.4a1.6 1.6 0 0 1-1.8 1.6A13.6 13.6 0 0 1 3.6 4.6 1.6 1.6 0 0 1 5.2 2.8Z" />
                      <path d="M12.4 3.2l4.4 4.4M16.8 3.2l-4.4 4.4" />
                    </svg>
                  )}
                </span>
                <span>
                  <b>{thread.missedLabel}</b>
                  <i>{thread.missedNumber}</i>
                </span>
              </div>

              <div className="how-mock__connector">
                <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 1v9M2.2 6.6 6 10.4l3.8-3.8" />
                </svg>
                <span>{copy.how.mock.connector}</span>
              </div>

              <div className="how-legend">
                <span className="how-legend__item">
                  <span className="how-legend__swatch how-legend__swatch--in" />
                  {copy.how.mock.legendIn}
                </span>
                <span className="how-legend__item">
                  <span className="how-legend__swatch how-legend__swatch--out" />
                  {copy.how.mock.legendOut}
                </span>
              </div>

              <div className="how-mock__thread">
                {thread.messages.map((msg, i) => {
                  const colorClass = msg.type === "in" ? "how-bubble--in" : "how-bubble--out";
                  const slotClass = `how-bubble--${SLOT_SUFFIXES[i]}`;
                  const dotN = DOTTED_SLOTS[i];
                  if (dotN) {
                    return (
                      <div key={i} className={`how-bubble ${colorClass} ${slotClass}`}>
                        <span className={`how-dots how-dots-${dotN}`}>
                          <i /><i /><i />
                        </span>
                        <span className={`how-bubble__text how-text-${dotN}`}>{msg.text}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={i} className={`how-bubble ${colorClass} ${slotClass}`}>
                      {msg.text}
                    </div>
                  );
                })}
              </div>
            </div>

            <ol className="how-steps">
              {(steps || copy.how.steps).map((step) => (
                <li key={step.n}>
                  <span className="how-steps__n">{step.n}</span>
                  <span className="how-steps__title">{step.title}</span>
                  <span className="how-steps__body">{step.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
