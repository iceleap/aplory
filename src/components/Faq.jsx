import { useScrollTo } from "../lib/SmoothScroll";
import { useCopy } from "../i18n";

export default function Faq() {
  const copy = useCopy();
  const scrollTo = useScrollTo();

  const go = (event, id) => {
    event.preventDefault();
    scrollTo(id);
  };

  return (
    <section className="sec bg-surface" id="pitanja" aria-labelledby="pitanja-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            {copy.faq.eyebrow}
          </p>
        </div>
        <div>
          <h2 id="pitanja-title" className="h2" data-reveal>
            {copy.faq.title}
          </h2>

          {/* Answers are open by default — nothing here is long enough to be worth
              a click, and hiding it just costs the reader a step. */}
          <dl className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2" data-reveal>
            {copy.faq.items.map((item, i) => (
              <div key={i} className="border-t border-rule pt-6">
                <dt className="text-[19px] leading-snug font-semibold tracking-[-0.015em] text-ink">
                  {item.q}
                </dt>
                <dd className="mt-3 ml-0 max-w-[46ch] text-[15px] text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>

          {/* Outside the <dl>: only dt/dd (or a div wrapping them) belong in a
              definition list, and this is a prompt, not another answer. */}
          <div
            className="mt-10 flex flex-col gap-5 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between"
            data-reveal
            style={{ "--reveal-delay": "100ms" }}
          >
            <p className="text-[19px] leading-snug font-semibold tracking-[-0.015em] text-ink">
              {copy.faq.more.prompt}
            </p>
            <a
              className="btn btn-primary self-start"
              href="#kontakt"
              onClick={(e) => go(e, "kontakt")}
            >
              {copy.faq.more.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
