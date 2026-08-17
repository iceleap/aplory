import { useEffect, useState } from "react";
import { useScrollTo } from "../lib/SmoothScroll";
import { useCopy, useLanguage } from "../i18n";

/* No "Kontakt" tab here on purpose: the CTA button already points at #kontakt,
   and two adjacent links to the same target is a redundant link. */
const TAB_IDS = ["problem", "resenje", "rezultat", "istrazivanja", "pitanja"];

/* Crowds the CTA off-screen in the inline nav between md and lg; shown in the
   mobile dropdown and again once there is room. */
const TIGHT = new Set(["istrazivanja"]);

function LanguageSwitch({ label }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label={label}
      className="flex shrink-0 overflow-hidden rounded-full border border-rule"
    >
      {["sr", "en"].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`cursor-pointer px-2.5 py-1 text-[11px] font-bold tracking-[0.1em] uppercase transition-colors ${
            lang === code ? "bg-ink text-paper" : "text-muted hover:text-ink"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const copy = useCopy();
  const scrollTo = useScrollTo();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Underline whichever section is currently crossing the upper third of the
  // viewport, so the tabs track where the reader actually is.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    [...TAB_IDS, "kontakt"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Escape closes the menu — expected of anything that opens over the page.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (event, id) => {
    event.preventDefault();
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md"
    >
      <div className="wrap flex h-16 items-center gap-3 md:h-[72px] md:gap-6">
        <a
          className="logo mr-auto h-[26px] w-[126px] shrink-0"
          href="#top"
          onClick={(e) => go(e, "top")}
          aria-label={copy.nav.home}
        >
          <span className="visually-hidden">APLORY</span>
        </a>

        {/* One nav for both layouts: a dropdown panel under the header on
            narrow screens, an inline row from md up. */}
        <nav
          id="site-nav"
          aria-label={copy.nav.sections}
          className={`absolute inset-x-0 top-full border-b border-rule bg-paper p-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.75)] md:static md:ml-auto md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
            open ? "block" : "hidden md:block"
          }`}
        >
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-7">
            {TAB_IDS.map((id) => (
              <li key={id} className={TIGHT.has(id) ? "md:hidden lg:block" : undefined}>
                <a
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  aria-current={active === id ? "true" : undefined}
                  className={`block border-b py-2.5 text-[17px] transition-colors md:py-1.5 md:text-[15px] ${
                    active === id
                      ? "border-brand-a text-ink"
                      : "border-transparent text-ink-2 hover:border-rule hover:text-ink"
                  }`}
                >
                  {copy.nav.tabs[id]}
                </a>
              </li>
            ))}
          </ul>

          {/* Sits at the bottom of the open menu; the header-row copy below is
              hidden while the menu is open, so only one is ever visible. */}
          <div className="mt-4 flex items-center gap-3 md:hidden">
            <LanguageSwitch label={copy.nav.language} />
            <a
              className="btn btn-primary flex-1 justify-center"
              href="#kontakt"
              onClick={(e) => go(e, "kontakt")}
            >
              {copy.nav.cta}
            </a>
          </div>
        </nav>

        <div className="ml-auto hidden shrink-0 md:block">
          <LanguageSwitch label={copy.nav.language} />
        </div>

        <a
          className={`btn btn-primary shrink-0 px-4 py-2.5 text-sm md:inline-flex md:px-5 ${
            open ? "hidden" : "inline-flex"
          }`}
          href="#kontakt"
          onClick={(e) => go(e, "kontakt")}
        >
          {copy.nav.cta}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg border border-rule text-ink transition-colors hover:border-ink md:hidden"
        >
          <span className="relative block h-3 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 block h-[1.5px] w-full rounded bg-current transition-transform duration-200 ${
                open ? "top-[5px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-[1.5px] w-full rounded bg-current transition-transform duration-200 ${
                open ? "top-[5px] -rotate-45" : "top-[10.5px]"
              }`}
            />
          </span>
        </button>
      </div>
    </header>
  );
}
