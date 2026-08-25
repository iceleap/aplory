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
 * The Lenis instance ref, for code that has to pause the scroll loop — freezing
 * the page under an open menu, say. Null while Lenis isn't running.
 */
export function useLenis() {
  return useContext(LenisContext);
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
    // Independent of Lenis: once it stops hijacking wheel events over the chat
    // widget (below), the browser's own scroll chaining takes over, and a
    // scrollable panel inside the widget's shadow DOM that hits its own top/
    // bottom still bubbles the rest of the scroll up into the page. Contain it
    // at the source since we can't add this CSS inside third-party markup.
    //
    // The widget loads from an external script and attaches its shadow root
    // asynchronously (and Stencil re-renders that tree as the panel changes
    // views), so this can't just run once on mount — it watches for the host
    // element and re-applies the style if Stencil's re-render drops it.
    let cancelled = false;

    const contain = (root) => {
      if (root.querySelector("style[data-scroll-contain]")) return;
      const style = document.createElement("style");
      style.setAttribute("data-scroll-contain", "");
      style.textContent = "* { overscroll-behavior: contain; }";
      root.appendChild(style);
    };

    const watchShadow = (widget) => {
      contain(widget.shadowRoot);
      const observer = new MutationObserver(() => contain(widget.shadowRoot));
      observer.observe(widget.shadowRoot, { childList: true });
      return observer;
    };

    let shadowObserver = null;
    const existing = document.querySelector("chat-widget");
    if (existing?.shadowRoot) {
      shadowObserver = watchShadow(existing);
    }

    const bodyObserver = new MutationObserver(() => {
      if (cancelled || shadowObserver) return;
      const widget = document.querySelector("chat-widget");
      if (widget?.shadowRoot) shadowObserver = watchShadow(widget);
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelled = true;
      bodyObserver.disconnect();
      shadowObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    // Respect the OS setting: no hijacked scrolling for people who asked for
    // less motion. They keep native scrolling, which is already smooth enough.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // The GHL chat widget (index.html) renders into its own shadow DOM, fixed
      // above the page. Without this, Lenis's global wheel listener still hijacks
      // scrolling over it and drags the page instead of the chat panel.
      prevent: (node) => node.tagName === "CHAT-WIDGET",
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
