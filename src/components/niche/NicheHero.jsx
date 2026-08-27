import LightBlobs from "../LightBlobs";
import { useScrollTo } from "../../lib/SmoothScroll";
import { useCopy } from "../../i18n";

export default function NicheHero({ niche }) {
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
      <div className="wrap relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
        <div>
          <p className="eyebrow" aria-hidden="true">
            {niche.eyebrow}
          </p>
          <h1 id="hero-title" className="h1 mt-4 max-w-[16ch]">
            {niche.heroTitle}
          </h1>
          <p className="mt-7 max-w-[46ch] text-[19px] text-ink-2">{niche.heroLede}</p>
          <div className="mt-10 flex flex-wrap gap-3.5">
            <a className="btn btn-primary" href="#kontakt" onClick={(e) => go(e, "kontakt")}>
              {copy.hero.ctaPrimary}
            </a>
            <a className="btn btn-ghost" href="#kako" onClick={(e) => go(e, "kako")}>
              {copy.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="w-full max-w-[420px] justify-self-center lg:justify-self-end">
          <img
            src={niche.photo}
            alt={niche.photoAlt}
            width={900}
            height={1200}
            loading="eager"
            style={{ objectPosition: niche.photoPosition || "center" }}
            className="aspect-[3/4] w-full rounded-[28px] border border-rule object-cover shadow-[0_30px_60px_-30px_rgba(23,25,28,0.35)]"
          />
        </div>
      </div>
    </section>
  );
}
