import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

/** Breathing room between the sticky header and the section it scrolls to. */
const GAP = 12;

/**
 * Measured rather than hard-coded: the header grows a second row when the nav
 * tabs wrap on narrow screens, and a fixed offset would drop targets underneath
 * it there.
 */
function headerOffset() {
  const header = document.getElementById("site-header");
  return -((header?.getBoundingClientRect().height ?? 72) + GAP);
}

/**
 * Scrolls to a section id through Lenis when it's running, falling back to the
 * native jump when it isn't (reduced motion, or before Lenis has mounted).
 */
export function useScrollTo() {
  const lenis = useContext(LenisContext);

  return (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    const offset = headerOffset();

    if (lenis?.current) {
      lenis.current.scrollTo(target, { offset });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top });
    }
  };
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect the OS setting: no hijacked scrolling for people who asked for
    // less motion. They keep native scrolling, which is already smooth enough.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
