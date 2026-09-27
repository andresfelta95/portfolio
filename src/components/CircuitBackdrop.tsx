import { traceField, type Trace } from "@/lib/circuit";

const FLOW_COLORS = ["#22d3ee", "#ff2d95", "#4ade80", "#22d3ee", "#a78bfa"];

interface Props {
  /** Different seeds give visibly different board layouts per section. */
  seed?: number;
  /** How many traces to route. Keep it low on tall, narrow sections. */
  count?: number;
  /** 0–1. Sections behind text want ~0.35; a hero can take 1. */
  intensity?: number;
  className?: string;
}

/**
 * The board every section sits on: solder pads on a grid, copper traces routed
 * across it, and a few signals travelling those traces.
 *
 * Rendered server-side from seeded geometry — no canvas, no effect hook, no
 * layout thrash. `slice` crops rather than stretches so the 45° corners stay
 * at 45° whatever the aspect ratio.
 */
export default function CircuitBackdrop({
  seed = 7,
  count = 9,
  intensity = 1,
  className = "",
}: Props) {
  const W = 1200;
  const H = 760;
  const traces: Trace[] = traceField({ seed, count, w: W, h: H, grid: 20 });
  const padId = `pads-${seed}`;

  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        shapeRendering="crispEdges"
      >
        <defs>
          {/* Solder pads on a 40-unit pitch — the board under the copper. */}
          <pattern id={padId} width={40} height={40} patternUnits="userSpaceOnUse">
            <rect x={0} y={0} width={2} height={2} fill="#2b3c5e" opacity={0.75 * intensity} />
          </pattern>
        </defs>

        <rect width={W} height={H} fill={`url(#${padId})`} />

        {/* Copper. */}
        {traces.map((t, i) => (
          <path
            key={`t${i}`}
            d={t.d}
            fill="none"
            stroke="#22d3ee"
            strokeWidth={2}
            opacity={0.14 * intensity}
          />
        ))}

        {/* Vias — a plated hole where a trace changes layer. */}
        {traces.flatMap((t, i) =>
          t.vias.map((v, j) => (
            <rect
              key={`v${i}-${j}`}
              x={v.x - 3}
              y={v.y - 3}
              width={6}
              height={6}
              fill="#05060d"
              stroke="#2b3c5e"
              strokeWidth={2}
              opacity={0.9 * intensity}
            />
          ))
        )}

        {/* Signals. One dash per trace, each on its own clock. */}
        {traces.map((t, i) => (
          <path
            key={`f${i}`}
            className="trace-flow"
            d={t.d}
            fill="none"
            stroke={FLOW_COLORS[i % FLOW_COLORS.length]}
            strokeWidth={2}
            strokeLinecap="butt"
            opacity={0.85 * intensity}
            style={{
              strokeDasharray: `28 ${t.len}`,
              ["--flow-len" as string]: `${t.len + 28}`,
              ["--flow-dur" as string]: `${7 + (i % 5) * 1.6}s`,
              ["--flow-delay" as string]: `${(i * 1.3) % 9}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
