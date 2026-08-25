import { useEffect, useRef } from "react";

const BLOBS = [
  { key: "a", push: 90 },
  { key: "b", push: 70 },
  { key: "c", push: 120 },
  { key: "d", push: 80 },
  { key: "e", push: 55 },
];

// Cursor proximity beyond which a blob no longer reacts, in pixels.
const FLEE_RADIUS = 480;

// Centre-to-centre distance below which two blobs start pushing each other
// apart, and how far apart that push can move a blob at most.
const REPEL_RADIUS = 520;
const REPEL_STRENGTH = 130;
const REPEL_MAX = 160;

// How often the mutual-repulsion pass re-measures blob positions. The float
// drift is slow (40-58s loops), so this doesn't need to run every frame —
// the CSS transition on `.light-blob-drift` smooths each step into a glide.
const REPEL_INTERVAL_MS = 450;

/**
 * Five pale, blurred colour fields drifting on their own slow loop across the
 * whole hero (see the `blob-float-a` through `-e` keyframes and
 * `.light-blob--a` through `--e` in base.css), each shrinking away from the
 * cursor when it gets close, and all five gently pushing each other apart
 * whenever their independent drift paths bring them too close together —
 * the ambient-depth counterpart to the grid webbing, both confined to the
 * hero. `--e` is the prismatic one (a conic sweep through the rest of the
 * palette); it's given the smallest cursor-flee push so the busiest-looking
 * blob is also the calmest one.
 *
 * Both behaviours are computed from each blob's actual rendered centre (via
 * `getBoundingClientRect` on the inner `.light-blob`, which already carries
 * the CSS float animation's transform), not from nominal positions, so the
 * push direction is always correct regardless of where a blob's own drift
 * has carried it.
 *
 * Each blob is two nested elements: `.light-blob-drift` gets its transform
 * set here — a sum of the cursor-flee offset and the inter-blob repulsion
 * offset — eased with a CSS transition rather than every-frame lerping, so
 * the motion settles smoothly; `.light-blob` runs its own CSS animation.
 * Splitting the two keeps JS and CSS from fighting over one `transform`.
 *
 * Skipped entirely for touch-only pointers (nothing to flee) and for
 * `prefers-reduced-motion`, matching the bar already set elsewhere in this
 * app — the blobs still render, just static, via the CSS media query.
 */
export default function LightBlobs() {
  const driftRefs = useRef({});
  const blobRefs = useRef({});
  const fleeOffsets = useRef({});
  const repelOffsets = useRef({});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    for (const { key } of BLOBS) {
      fleeOffsets.current[key] = { x: 0, y: 0 };
      repelOffsets.current[key] = { x: 0, y: 0 };
    }

    const applyTransform = (key) => {
      const drift = driftRefs.current[key];
      if (!drift) return;
      const flee = fleeOffsets.current[key];
      const repel = repelOffsets.current[key];
      const x = flee.x + repel.x;
      const y = flee.y + repel.y;
      drift.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    let frame = null;

    const move = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        for (const { key, push } of BLOBS) {
          const blob = blobRefs.current[key];
          if (!blob) continue;

          const rect = blob.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;

          const dx = cx - event.clientX;
          const dy = cy - event.clientY;
          const dist = Math.hypot(dx, dy) || 1;

          if (dist >= FLEE_RADIUS) {
            fleeOffsets.current[key] = { x: 0, y: 0 };
          } else {
            const strength = 1 - dist / FLEE_RADIUS;
            const amount = strength * push;
            fleeOffsets.current[key] = {
              x: (dx / dist) * amount,
              y: (dy / dist) * amount,
            };
          }
          applyTransform(key);
        }
        frame = null;
      });
    };

    window.addEventListener("mousemove", move, { passive: true });

    // Mutual repulsion: on a slow timer (not every frame — the drift these
    // are correcting for is itself slow), measure every blob's actual
    // centre and push any pair that's drifted too close directly apart from
    // one another, so the five fields read as a spread rather than a knot.
    const repelTick = () => {
      const centres = {};
      for (const { key } of BLOBS) {
        const blob = blobRefs.current[key];
        if (!blob) continue;
        const rect = blob.getBoundingClientRect();
        centres[key] = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }

      const push = {};
      for (const { key } of BLOBS) push[key] = { x: 0, y: 0 };

      for (let i = 0; i < BLOBS.length; i++) {
        for (let j = i + 1; j < BLOBS.length; j++) {
          const keyA = BLOBS[i].key;
          const keyB = BLOBS[j].key;
          const a = centres[keyA];
          const b = centres[keyB];
          if (!a || !b) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist >= REPEL_RADIUS) continue;

          const strength = 1 - dist / REPEL_RADIUS;
          const amount = strength * REPEL_STRENGTH;
          const ux = dx / dist;
          const uy = dy / dist;

          push[keyA].x += ux * amount;
          push[keyA].y += uy * amount;
          push[keyB].x -= ux * amount;
          push[keyB].y -= uy * amount;
        }
      }

      for (const { key } of BLOBS) {
        const p = push[key];
        const mag = Math.hypot(p.x, p.y);
        const clamped =
          mag > REPEL_MAX && mag > 0
            ? { x: (p.x / mag) * REPEL_MAX, y: (p.y / mag) * REPEL_MAX }
            : p;
        repelOffsets.current[key] = clamped;
        applyTransform(key);
      }
    };

    repelTick();
    const repelInterval = window.setInterval(repelTick, REPEL_INTERVAL_MS);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      window.clearInterval(repelInterval);
    };
  }, []);

  return (
    <div className="light-blobs" aria-hidden="true">
      {BLOBS.map(({ key }) => (
        <div
          key={key}
          ref={(node) => (driftRefs.current[key] = node)}
          className="light-blob-drift"
        >
          <div
            ref={(node) => (blobRefs.current[key] = node)}
            className={`light-blob light-blob--${key}`}
          />
        </div>
      ))}
    </div>
  );
}
