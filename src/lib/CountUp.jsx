import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Counts a figure up from zero when it first scrolls into view.
 *
 * Takes the already-formatted string — "23%", "42h", "21×", "62" — rather than a
 * number plus options, so the language files and src/data/research.js stay the
 * single source of how a figure is written, decimal separator included.
 *
 * It carries its own IntersectionObserver instead of hanging off useReveal: the
 * two then can't fall out of step, and a figure that gets remounted (a language
 * switch, say) still animates.
 *
 * The failure mode is always "no animation", never "no number": under reduced
 * motion, without an observer, or when the string carries no digits, the final
 * value renders immediately and nothing else happens.
 */

/* Leading text, the number itself, then whatever trails it. */
const FIGURE = /^(\D*)(\d+)(?:([.,])(\d+))?(.*)$/s;

const DURATION = 1100;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function canAnimate(parts) {
  return (
    !!parts &&
    typeof window !== "undefined" &&
    typeof IntersectionObserver !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function CountUp({ children }) {
  const final = String(children);
  const parts = useMemo(() => FIGURE.exec(final), [final]);

  const ref = useRef(null);
  /* Zero from the very first paint when we intend to animate — starting at the
     final value would make the figure jump backwards the moment it comes into
     view. `null` means "not animating", and the string renders untouched. */
  const [value, setValue] = useState(() => (canAnimate(parts) ? 0 : null));

  useEffect(() => {
    if (!canAnimate(parts)) return;

    const node = ref.current;
    if (!node) return;

    const decimals = parts[4]?.length ?? 0;
    const target = Number(`${parts[2]}.${parts[4] ?? 0}`);

    let frame = 0;
    let start = 0;

    const step = (now) => {
      start ||= now;
      const t = Math.min(1, (now - start) / DURATION);
      setValue(Number((target * easeOut(t)).toFixed(decimals)));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        // Count once; scrolling back up shouldn't replay it.
        observer.disconnect();
        frame = requestAnimationFrame(step);
      },
      // Matches the scroll reveal, so a figure counts as its block fades in.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [parts]);

  if (value === null) return <span ref={ref}>{final}</span>;

  /* Padded to the width of the finished figure: the count holds one width
     instead of pushing its suffix along as it gains a digit, and a leading zero
     in the source ("09:41") survives the trip. */
  const [, prefix, digits, separator, fraction, suffix] = parts;
  const [whole, decimals] = value.toFixed(fraction?.length ?? 0).split(".");
  const shown =
    whole.padStart(digits.length, "0") + (decimals ? (separator ?? ".") + decimals : "");

  /* The ticking value is decorative: assistive tech reads the finished figure
     from the hidden span, so a heading never announces a number mid-count. */
  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {prefix}
        {shown}
        {suffix}
      </span>
      <span className="visually-hidden">{final}</span>
    </span>
  );
}
