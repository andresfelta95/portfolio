import PixelSprite from "./PixelSprite";
import { SPRITES } from "@/lib/sprites";
import { traceConverge } from "@/lib/circuit";

const SIZE = 480;
/** Where traces stop — just under the chip's pins, so they appear soldered. */
const PAD = 86;
const C = SIZE / 2;

const FLOW = ["#22d3ee", "#ff2d95", "#4ade80", "#fbbf24"];

/** Components sitting on the board, one per layer of the stack. */
const CORNERS = [
  { sprite: SPRITES.chip, label: "silicon", pos: "top-5 left-5", color: "#fb923c" },
  { sprite: SPRITES.phone, label: "mobile", pos: "top-5 right-5", color: "#c084fc" },
  { sprite: SPRITES.browser, label: "web", pos: "bottom-5 left-5", color: "#38bdf8" },
  { sprite: SPRITES.server, label: "cloud", pos: "bottom-5 right-5", color: "#4ade80" },
] as const;

/**
 * The hero's board: four components wired to one controller at the centre,
 * with signals running inward along the copper. It is the site's thesis as a
 * diagram — every layer terminates at the same chip.
 */
export default function CircuitCore() {
  const traces = traceConverge({ seed: 21, count: 12, size: SIZE, pad: PAD, grid: 12 });
  // Marching-ants ring around the chip. One dash cycle as the animation
  // distance makes the loop seamless.
  const ring = PAD + 14;

  return (
    <div className="relative w-full max-w-[26rem] mx-auto aspect-square border border-line bg-panel/70">
      {/* Corner brackets — the frame reads as a socket, not a card. */}
      {[
        "top-0 left-0 border-t-2 border-l-2",
        "top-0 right-0 border-t-2 border-r-2",
        "bottom-0 left-0 border-b-2 border-l-2",
        "bottom-0 right-0 border-b-2 border-r-2",
      ].map((cls) => (
        <span key={cls} aria-hidden className={`absolute w-4 h-4 border-cyan/70 ${cls}`} />
      ))}

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 w-full h-full"
        shapeRendering="crispEdges"
        aria-hidden
      >
        <defs>
          <pattern id="core-pads" width={24} height={24} patternUnits="userSpaceOnUse">
            <rect width={2} height={2} fill="#2b3c5e" opacity={0.85} />
          </pattern>
        </defs>
        <rect width={SIZE} height={SIZE} fill="url(#core-pads)" />

        {traces.map((t, i) => (
          <path key={`c${i}`} d={t.d} fill="none" stroke="#22d3ee" strokeWidth={2} opacity={0.22} />
        ))}

        {traces.flatMap((t, i) =>
          t.vias.map((v, j) => (
            <rect
              key={`cv${i}-${j}`}
              x={v.x - 3}
              y={v.y - 3}
              width={6}
              height={6}
              fill="#05060d"
              stroke="#2b3c5e"
              strokeWidth={2}
            />
          ))
        )}

        {traces.map((t, i) => (
          <path
            key={`cf${i}`}
            className="trace-flow"
            d={t.d}
            fill="none"
            stroke={FLOW[i % FLOW.length]}
            strokeWidth={2}
            opacity={0.95}
            style={{
              strokeDasharray: `22 ${t.len}`,
              ["--flow-len" as string]: `${t.len + 22}`,
              ["--flow-dur" as string]: `${3.4 + (i % 4) * 0.9}s`,
              ["--flow-delay" as string]: `${(i * 0.45) % 4}s`,
            }}
          />
        ))}

        {/* Marching-ants ring: the controller is clocking. */}
        <rect
          className="trace-flow"
          x={C - ring}
          y={C - ring}
          width={ring * 2}
          height={ring * 2}
          fill="none"
          stroke="#22d3ee"
          strokeWidth={2}
          opacity={0.45}
          style={{
            strokeDasharray: "8 16",
            ["--flow-len" as string]: "24",
            ["--flow-dur" as string]: "1.2s",
          }}
        />
      </svg>

      {/* The controller. */}
      <div className="absolute inset-0 grid place-items-center">
        <PixelSprite
          sprite={SPRITES.chip}
          label="Microcontroller"
          className="w-[38%] h-[38%] sprite-glow"
        />
      </div>

      {/* Board components. */}
      {CORNERS.map((c) => (
        <div key={c.label} className={`absolute ${c.pos} flex flex-col items-center gap-1`}>
          <PixelSprite sprite={c.sprite} className="w-7 h-7 sm:w-8 sm:h-8" />
          <span className="text-[9px] uppercase tracking-[0.18em]" style={{ color: c.color }}>
            {c.label}
          </span>
        </div>
      ))}

      {/* Silkscreen, top centre — the only place on the board with room. */}
      <span className="absolute left-1/2 -translate-x-1/2 top-2 text-[9px] text-muted tracking-[0.3em] uppercase">
        paisbru · rev 2.6
      </span>
    </div>
  );
}
