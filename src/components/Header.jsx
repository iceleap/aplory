import { useEffect, useState } from "react";
import { useScrollTo } from "../lib/SmoothScroll";

/* No "Kontakt" tab here on purpose: the CTA button already points at #kontakt,
   and two adjacent links to the same target is a redundant link. */
const TABS = [
  { id: "problem", label: "Problem" },
  { id: "resenje", label: "Rešenje" },
  { id: "rezultat", label: "Rezultat" },
  { id: "pitanja", label: "Pitanja" },
];

export default function Header() {
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

    [...TABS.map((t) => t.id), "kontakt"].forEach((id) => {
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
      <div className="wrap flex h-16 items-center gap-3 md:h-[72px] md:gap-8">
        <a
          className="logo mr-auto h-[26px] w-[126px] shrink-0"
          href="#top"
          onClick={(e) => go(e, "top")}
          aria-label="APLORY — početna"
        >
          <span className="visually-hidden">APLORY</span>
        </a>

        {/* One nav for both layouts: a dropdown panel under the header on
            narrow screens, an inline row from md up. */}
        <nav
          id="site-nav"
          aria-label="Sekcije"
          className={`absolute inset-x-0 top-full border-b border-rule bg-paper p-5 shadow-[0_18px_40px_-28px_rgba(11,18,32,0.5)] md:static md:ml-auto md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
            open ? "block" : "hidden md:block"
          }`}
        >
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-8">
            {TABS.map((tab) => (
              <li key={tab.id}>
                <a
                  href={`#${tab.id}`}
                  onClick={(e) => go(e, tab.id)}
                  aria-current={active === tab.id ? "true" : undefined}
                  className={`block border-b py-2.5 text-[17px] transition-colors md:py-1.5 md:text-[15px] ${
                    active === tab.id
                      ? "border-brand-a text-ink"
                      : "border-transparent text-ink-2 hover:border-rule hover:text-ink"
                  }`}
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Sits at the bottom of the open menu; the header-row copy below is
              hidden while the menu is open, so only one is ever visible. */}
          <a
            className="btn btn-primary mt-4 w-full justify-center md:hidden"
            href="#kontakt"
            onClick={(e) => go(e, "kontakt")}
          >
            Zakažite razgovor
          </a>
        </nav>

        <a
          className={`btn btn-primary shrink-0 px-4 py-2.5 text-sm md:inline-flex md:px-5 ${
            open ? "hidden" : "inline-flex"
          }`}
          href="#kontakt"
          onClick={(e) => go(e, "kontakt")}
        >
          Zakažite razgovor
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Zatvori meni" : "Otvori meni"}
          className="grid size-10 shrink-0 place-items-center rounded-lg border border-rule text-ink transition-colors hover:border-ink md:hidden"
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
