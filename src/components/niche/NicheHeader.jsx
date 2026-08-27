import { useScrollTo } from "../../lib/SmoothScroll";
import { useCopy } from "../../i18n";

/**
 * A lighter header for niche landing pages. The home page's Header.jsx drives
 * a scroll-spy across its own section ids (#problem, #resenje, #pitanja) —
 * none of which exist here, so rather than bend that component around a page
 * it was never built for, this is its own small header: logo back to the
 * homepage, and the same primary CTA scrolled to this page's own #kontakt.
 */
export default function NicheHeader() {
  const copy = useCopy();
  const scrollTo = useScrollTo();

  const goToContact = (event) => {
    event.preventDefault();
    scrollTo("kontakt");
  };

  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md"
    >
      <div className="wrap flex h-16 items-center gap-3 md:h-[72px]">
        <a
          className="logo mr-auto h-[21px] w-[104px] shrink-0 sm:h-[26px] sm:w-[126px]"
          href="/"
          aria-label={copy.nav.home}
        >
          <span className="visually-hidden">APLORY</span>
        </a>

        <a
          className="hidden text-[15px] text-ink-2 transition-colors hover:text-ink sm:inline-flex"
          href="/#"
        >
          Nazad na početnu
        </a>

        <a
          className="btn btn-primary shrink-0 px-4 py-2.5 text-sm md:px-5"
          href="#kontakt"
          onClick={goToContact}
        >
          {copy.nav.cta}
        </a>
      </div>
    </header>
  );
}
