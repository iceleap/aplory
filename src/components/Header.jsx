import { useEffect, useRef, useState } from "react";
import { useLenis, useScrollTo } from "../lib/SmoothScroll";
import { useCopy, useLanguage } from "../i18n";

/* No "Kontakt" tab here on purpose: the CTA button already points at #kontakt,
   and two adjacent links to the same target is a redundant link. */
const TAB_IDS = ["problem", "resenje", "rezultat", "istrazivanja", "pitanja"];

/* Crowds the CTA off-screen in the inline nav between md and lg; shown in the
   mobile dropdown and again once there is room. */
const TIGHT = new Set(["istrazivanja"]);

/* How far a finger has to travel before it counts as scrolling rather than
   tapping, and so dismisses the open menu. */
const DRAG_PX = 12;

/**
 * One button, not two: the whole pill is the target and a press flips the
 * language, so there is no half of the control that does nothing when tapped.
 * The codes are decoration — the accessible name says what pressing it does.
 */
function LanguageSwitch() {
  const copy = useCopy();
  const { lang, setLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "sr" ? "en" : "sr")}
      aria-label={copy.nav.languageToggle}
      className="flex shrink-0 cursor-pointer overflow-hidden rounded-full border border-rule transition-colors hover:border-ink"
    >
      {["sr", "en"].map((code) => (
        <span
          key={code}
          aria-hidden="true"
          className={`px-2.5 py-1 text-[11px] font-bold tracking-[0.1em] uppercase transition-colors ${
            lang === code ? "bg-ink text-paper" : "text-muted"
          }`}
        >
          {code}
        </span>
      ))}
    </button>
  );
}

export default function Header() {
  const copy = useCopy();
  const scrollTo = useScrollTo();
  const lenis = useLenis();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  // The toggle sits outside the panel, so an outside-tap check has to spare it
  // or the press that opens the menu would close it again on the way out.
  const toggleRef = useRef(null);

  // Underline whichever section is currently crossing the upper third of the
  // viewport, so the tabs track where the reader actually is.
  //
  // The hero is observed alongside the sections even though it has no tab: it is
  // what makes "reader is at the top, highlight nothing" a state the observer can
  // report, rather than something inferred from an empty callback. Whichever
  // observed element comes first in page order wins, so a batch of entries can
  // never resolve to whatever happened to be delivered last.
  useEffect(() => {
    const order = ["top", ...TAB_IDS, "kontakt"];
    const inBand = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        });
        setActive(order.find((id) => inBand.has(id)) ?? "");
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    order.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /**
   * Everything that dismisses the open menu, plus the freeze underneath it.
   *
   * The page cannot scroll while the menu is open, so `scroll` never fires —
   * the gesture itself (wheel, or a finger dragging) is what has to be listened
   * for. That gesture closes the menu rather than scrolling the page, and
   * scrolling is handed straight back.
   *
   * Deliberately not listening for `scroll`: with the page locked, any scroll
   * event that does arrive is a leftover or the mobile URL bar settling, and
   * dismissing the menu on those made it close on its own.
   */
  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);
    const onKey = (e) => e.key === "Escape" && close();
    const onPointerDown = (e) => {
      const nav = document.getElementById("site-nav");
      if (!nav?.contains(e.target) && !toggleRef.current?.contains(e.target)) close();
    };

    /* A finger never holds perfectly still: a tap on a menu link emits touchmove
       too, and closing on that swallowed the tap before it could land on the
       link. Only a deliberate drag counts as "started scrolling". */
    let startY = 0;
    const onTouchStart = (e) => {
      startY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e) => {
      if (Math.abs((e.touches[0]?.clientY ?? startY) - startY) > DRAG_PX) close();
    };

    // Held in a local so the cleanup starts the same instance it stopped.
    const scroller = lenis?.current;

    document.documentElement.classList.add("menu-open");
    scroller?.stop();

    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("wheel", close, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      document.documentElement.classList.remove("menu-open");
      scroller?.start();
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("wheel", close);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [open, lenis]);

  const go = (event, id) => {
    event.preventDefault();
    setOpen(false);

    /* Release the page here rather than leaving it to the close effect: that
       cleanup has not run yet, and a scroll issued against a frozen page and a
       stopped Lenis is simply dropped — which is what made the mobile menu's
       tabs close the menu and go nowhere. Repeating it in the cleanup is
       harmless. */
    document.documentElement.classList.remove("menu-open");
    lenis?.current?.start();

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
          {/* No gap below md: each tab's own bottom rule is the divider between
              rows, so the items have to sit flush. */}
          <ul className="flex flex-col md:flex-row md:items-center md:gap-7">
            {TAB_IDS.map((id) => (
              <li key={id} className={TIGHT.has(id) ? "md:hidden lg:block" : undefined}>
                <a
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  aria-current={active === id ? "true" : undefined}
                  /* That bottom rule does double duty: a divider between the
                     stacked tabs on mobile, and the active underline in both
                     layouts. Inline from md up it goes back to invisible until
                     hovered, where a rule under every tab would be noise. */
                  className={`block border-b py-2.5 text-[17px] transition-colors md:py-1.5 md:text-[15px] ${
                    active === id
                      ? "border-brand-a text-ink"
                      : "border-rule text-ink-2 hover:text-ink md:border-transparent md:hover:border-rule"
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
            <LanguageSwitch />
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
          <LanguageSwitch />
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
          ref={toggleRef}
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
