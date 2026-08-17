import { useLayoutEffect } from "react";

/**
 * Fades elements marked `data-reveal` in as they enter the viewport.
 *
 * The hidden state is scoped to `.reveal-ready`, a class this hook puts on
 * <html> only once it has decided to animate and has an observer in hand. That
 * ordering matters: if the observer were ever missing or threw, content hidden
 * by CSS alone would stay invisible permanently. Opting in from JS means the
 * failure mode is "no animation", not "no content".
 *
 * `useLayoutEffect` runs before paint, so the class lands in the same frame as
 * the first render and there is no flash of visible-then-hidden content.
 *
 * Under `prefers-reduced-motion` the class is never added, so nothing is hidden
 * and nothing animates.
 */
export default function useReveal() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!nodes.length) return;

    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          // Reveal once; scrolling back up shouldn't replay it.
          observer.unobserve(entry.target);
        });
      },
      // Fires a little before the element is fully on screen, so the motion
      // reads as the page settling rather than as something arriving late.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}
