/**
 * Five inbound channels converging into a single answered state — the page's
 * one-sentence thesis, drawn.
 *
 * Inline SVG rather than canvas: this is a structural diagram, so it stays sharp
 * at any pixel density, carries real text for screen readers, and animates with
 * plain CSS. The travelling pulses stop under prefers-reduced-motion.
 */

const CHANNELS = [
  {
    label: "Propušten poziv",
    icon: <path d="M5.2 2.8h2.4l1.2 3.2-1.6 1.2a9.6 9.6 0 0 0 4.8 4.8l1.2-1.6 3.2 1.2v2.4a1.6 1.6 0 0 1-1.8 1.6A13.6 13.6 0 0 1 3.6 4.6 1.6 1.6 0 0 1 5.2 2.8Z" />,
  },
  {
    label: "WhatsApp",
    icon: <path d="M16 9.2a6 6 0 0 1-8.7 5.4L3.6 15.6l1.1-3.6A6 6 0 1 1 16 9.2Z" />,
  },
  {
    label: "Viber",
    icon: <path d="M10 2.6c4 0 6.6 2.4 6.6 6 0 3.7-2.6 6.1-6.6 6.1-.7 0-1.3 0-1.9-.2l-3 2.2.5-3A5.8 5.8 0 0 1 3.4 8.6c0-3.6 2.6-6 6.6-6Z" />,
  },
  {
    label: "Instagram",
    icon: (
      <>
        <rect x="3.2" y="3.2" width="13.6" height="13.6" rx="4" />
        <circle cx="10" cy="10" r="3.4" />
        <circle cx="14.1" cy="5.9" r="0.9" />
      </>
    ),
  },
  {
    label: "Poruka sa sajta",
    icon: (
      <>
        <rect x="2.8" y="3.6" width="14.4" height="11" rx="2" />
        <path d="M2.8 7.2h14.4" />
      </>
    ),
  },
];

const ROW_Y = [40, 104, 168, 232, 296];
const HUB_X = 392;
const HUB_Y = 168;

export default function ChannelFlow() {
  return (
    <svg
      viewBox="0 0 520 348"
      className="h-auto w-full max-w-[520px]"
      role="img"
      aria-label="Propušten poziv, WhatsApp, Viber, Instagram i poruke sa sajta — svi kanali vode do jednog odgovorenog upita."
    >
      <defs>
        <linearGradient id="cf-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-a)" />
          <stop offset="100%" stopColor="var(--color-brand-b)" />
        </linearGradient>
      </defs>

      {/* Connecting curves, drawn under everything else. */}
      <g fill="none">
        {ROW_Y.map((y, i) => {
          const d = `M186,${y} C280,${y} 300,${HUB_Y} ${HUB_X - 46},${HUB_Y}`;
          return (
            <g key={y}>
              <path d={d} stroke="var(--color-rule)" strokeWidth="1.5" />
              <path
                className="cf-pulse"
                d={d}
                stroke="url(#cf-grad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="5 115"
                style={{ animationDelay: `${i * 0.45}s` }}
              />
            </g>
          );
        })}
      </g>

      {/* Channel rows */}
      {CHANNELS.map((channel, i) => (
        <g key={channel.label}>
          <rect
            x="1"
            y={ROW_Y[i] - 19}
            width="170"
            height="38"
            rx="19"
            fill="var(--color-paper)"
            stroke="var(--color-rule)"
          />
          <g
            transform={`translate(16, ${ROW_Y[i] - 10})`}
            stroke="var(--color-brand-b)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {channel.icon}
          </g>
          <text
            x="46"
            y={ROW_Y[i] + 4}
            fill="var(--color-ink-2)"
            fontSize="13"
            fontWeight="500"
          >
            {channel.label}
          </text>
        </g>
      ))}

      {/* The single answered state */}
      <circle
        cx={HUB_X}
        cy={HUB_Y}
        r="60"
        fill="var(--color-surface)"
        stroke="var(--color-rule)"
      />
      <circle cx={HUB_X} cy={HUB_Y} r="46" fill="url(#cf-grad)" />
      <path
        d={`M${HUB_X - 15},${HUB_Y + 1} l10,10 l20,-21`}
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x={HUB_X}
        y={HUB_Y + 88}
        textAnchor="middle"
        fill="var(--color-ink)"
        fontSize="15"
        fontWeight="600"
      >
        Odgovoreno
      </text>
      <text
        x={HUB_X}
        y={HUB_Y + 108}
        textAnchor="middle"
        fill="var(--color-muted)"
        fontSize="12.5"
      >
        za nekoliko sekundi
      </text>
    </svg>
  );
}
