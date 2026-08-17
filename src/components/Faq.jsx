import { faq } from "../data/content";

export default function Faq() {
  return (
    <section className="sec" id="pitanja" aria-labelledby="pitanja-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            Pitanja
          </p>
        </div>
        <div>
          <h2 id="pitanja-title" className="h2" data-reveal>
            Četiri pitanja, četiri odgovora.
          </h2>

          {/* Answers are open by default — nothing here is long enough to be worth
              a click, and hiding it just costs the reader a step. */}
          <dl className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2" data-reveal>
            {faq.map((item) => (
              <div key={item.q} className="border-t border-rule pt-6">
                <dt className="text-[19px] leading-snug font-semibold tracking-[-0.015em] text-ink">
                  {item.q}
                </dt>
                <dd className="mt-3 ml-0 max-w-[46ch] text-[15px] text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
