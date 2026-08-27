import { useCopy } from "../../i18n";

/**
 * Same mockup and animation classes as the home page's HowItWorks.jsx (see
 * base.css's .how-* rules and the reveal timing keyed to -1/-2/-3), with the
 * missed-call banner and the six-message thread swapped for this niche's own
 * `demo` data instead of the hardcoded HVAC conversation.
 */
export default function NicheHow({ niche }) {
  const copy = useCopy();
  const [in1, out1, in2, out2, in3, out3] = niche.demo.messages;

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
            {copy.how.nicheTitle}
          </h2>

          <div className="how-layout mt-12">
            <div className="how-mock" data-reveal aria-hidden="true">
              <div className="how-mock__call">
                <span className="how-mock__icon">
                  <span className="how-mock__ring" />
                  <svg viewBox="0 0 20 20" fill="none" stroke="var(--color-danger)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5.2 2.8h2.4l1.2 3.2-1.6 1.2a9.6 9.6 0 0 0 4.8 4.8l1.2-1.6 3.2 1.2v2.4a1.6 1.6 0 0 1-1.8 1.6A13.6 13.6 0 0 1 3.6 4.6 1.6 1.6 0 0 1 5.2 2.8Z" />
                    <path d="M12.4 3.2l4.4 4.4M16.8 3.2l-4.4 4.4" />
                  </svg>
                </span>
                <span>
                  <b>{niche.demo.missedLabel}</b>
                  <i>{niche.demo.missedNumber}</i>
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
                <div className="how-bubble how-bubble--in how-bubble--in-1">{in1.text}</div>
                <div className="how-bubble how-bubble--out how-bubble--out-1">{out1.text}</div>
                <div className="how-bubble how-bubble--in how-bubble--in-2">
                  <span className="how-dots how-dots-2">
                    <i /><i /><i />
                  </span>
                  <span className="how-bubble__text how-text-2">{in2.text}</span>
                </div>
                <div className="how-bubble how-bubble--out how-bubble--out-2">{out2.text}</div>
                <div className="how-bubble how-bubble--in how-bubble--in-3">
                  <span className="how-dots how-dots-3">
                    <i /><i /><i />
                  </span>
                  <span className="how-bubble__text how-text-3">{in3.text}</span>
                </div>
                <div className="how-bubble how-bubble--out how-bubble--out-3">{out3.text}</div>
              </div>
            </div>

            <ol className="how-steps">
              {copy.how.steps.map((step) => (
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
