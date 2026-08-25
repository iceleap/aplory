import { useCopy } from "../i18n";

export default function HowItWorks() {
  const copy = useCopy();

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
            {copy.how.title}
          </h2>

          <div className="how-layout mt-12">
            <div className="how-mock" data-reveal aria-hidden="true">
              <div className="how-mock__call">
                <span className="how-mock__ring" />
                <svg viewBox="0 0 20 20" fill="none" stroke="var(--color-danger)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5.2 2.8h2.4l1.2 3.2-1.6 1.2a9.6 9.6 0 0 0 4.8 4.8l1.2-1.6 3.2 1.2v2.4a1.6 1.6 0 0 1-1.8 1.6A13.6 13.6 0 0 1 3.6 4.6 1.6 1.6 0 0 1 5.2 2.8Z" />
                  <path d="M12.4 3.2l4.4 4.4M16.8 3.2l-4.4 4.4" />
                </svg>
                <span>
                  <b>Propušten poziv</b>
                  <i>+381 6x xxx xxx</i>
                </span>
              </div>

              <div className="how-mock__thread">
                <div className="how-bubble how-bubble--in how-bubble--in-1">
                  Zdravo. Ovde servis klima uređaja. Nismo mogli da se javimo, na terenu smo. Napišite šta vam treba i odgovaramo odmah.
                </div>
                <div className="how-bubble how-bubble--out how-bubble--out-1">
                  Ne radi mi klima u stanu, duva mlako. Može neko danas?
                </div>
                <div className="how-bubble how-bubble--in how-bubble--in-2">
                  <span className="how-dots how-dots-2">
                    <i /><i /><i />
                  </span>
                  <span className="how-bubble__text how-text-2">
                    Može. Koji je model i koja adresa?
                  </span>
                </div>
                <div className="how-bubble how-bubble--out how-bubble--out-2">
                  Gree, dvanaestica. Vojvode Mišića 14, Valjevo.
                </div>
                <div className="how-bubble how-bubble--in how-bubble--in-3">
                  <span className="how-dots how-dots-3">
                    <i /><i /><i />
                  </span>
                  <span className="how-bubble__text how-text-3">
                    Imamo termin danas u 16.30 ili sutra u 9. Šta vam odgovara?
                  </span>
                </div>
                <div className="how-bubble how-bubble--out how-bubble--out-3">Danas u 16.30.</div>
              </div>
            </div>

            <ol className="how-steps">
              {copy.how.steps.map((step) => (
                <li key={step.n}>
                  <span className="how-steps__n">{step.n}</span>
                  <span className="how-steps__title">{step.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
