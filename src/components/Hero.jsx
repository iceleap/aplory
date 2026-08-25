import ChannelFlow from "./ChannelFlow";
import LightBlobs from "./LightBlobs";
import { useScrollTo } from "../lib/SmoothScroll";
import { useCopy } from "../i18n";

export default function Hero() {
  const copy = useCopy();
  const scrollTo = useScrollTo();

  const go = (event, id) => {
    event.preventDefault();
    scrollTo(id);
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="grid-webbing relative flex min-h-[calc(100svh-var(--header-h))] items-center overflow-hidden border-b border-rule py-16 md:py-20"
    >
      <LightBlobs />
      <div className="wrap relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_520px] lg:gap-16">
        <div>
          <p className="eyebrow" aria-hidden="true">
            {copy.hero.kicker}
          </p>
          <h1 id="hero-title" className="h1 mt-4 max-w-[14ch]">
            {copy.hero.title}
          </h1>
          <p className="mt-7 max-w-[46ch] text-[19px] text-ink-2">{copy.hero.lede}</p>
          <div className="mt-10 flex flex-wrap gap-3.5">
            <a className="btn btn-primary" href="#kontakt" onClick={(e) => go(e, "kontakt")}>
              {copy.hero.ctaPrimary}
            </a>
            <a className="btn btn-ghost" href="#kako" onClick={(e) => go(e, "kako")}>
              {copy.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="w-full max-w-[520px] justify-self-center lg:justify-self-end">
          <ChannelFlow />
        </div>
      </div>
    </section>
  );
}
