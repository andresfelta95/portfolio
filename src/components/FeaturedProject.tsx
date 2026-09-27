import { Github } from "lucide-react";
import PixelSprite from "./PixelSprite";
import { SPRITES, type Sprite } from "@/lib/sprites";
import { Panel, SectionHeading, Tag } from "./ui";
import CircuitBackdrop from "./CircuitBackdrop";

const stages: { label: string; sub: string; color: string; sprite: Sprite }[] = [
  { label: "Dartboard", sub: "physical board", color: "#dc2626", sprite: SPRITES.target },
  { label: "ESP32", sub: "ultrasonic + mux", color: "#fb923c", sprite: SPRITES.chip },
  { label: "Python", sub: "serial → db", color: "#fbbf24", sprite: SPRITES.wave },
  { label: "Database", sub: "dart positions", color: "#22d3ee", sprite: SPRITES.stack },
  { label: "React Native", sub: "live scores", color: "#c084fc", sprite: SPRITES.phone },
];

/** A length of copper between two stages, with a signal running down it. */
function Link({ delay }: { delay: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 8"
      className="w-8 sm:w-10 h-2 shrink-0"
      shapeRendering="crispEdges"
      preserveAspectRatio="none"
    >
      <path d="M 0 4 L 40 4" stroke="#1b2740" strokeWidth={2} fill="none" />
      <path
        className="trace-flow"
        d="M 0 4 L 40 4"
        stroke="#22d3ee"
        strokeWidth={2}
        fill="none"
        style={{
          strokeDasharray: "10 40",
          ["--flow-len" as string]: "50",
          ["--flow-dur" as string]: "2.4s",
          ["--flow-delay" as string]: `${delay}s`,
        }}
      />
    </svg>
  );
}

export default function FeaturedProject() {
  return (
    <section className="relative py-20 sm:py-24 px-5 sm:px-6 border-t border-line bg-panel/30">
      <CircuitBackdrop seed={57} count={5} intensity={0.35} className="absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(5,6,13,0.82)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          cmd="cat featured/README.md"
          title="INTERACTIVE DARTBOARD"
          sprite={SPRITES.target}
          accent="#fb923c"
        >
          The project that explains the rest of them. A dart hits a physical board, ultrasonic
          sensors on an ESP32 work out where, a Python bridge writes the position to a database,
          and a React Native app has the score before the dart stops wobbling.
        </SectionHeading>

        <Panel cmd="./pipeline --trace" accent="#fb923c" className="mb-8">
          <div className="overflow-x-auto">
            <div className="flex items-stretch gap-0 min-w-max p-5 sm:p-6">
              {stages.map((s, i) => (
                <div key={s.label} className="flex items-center">
                  <div
                    className="border px-3 sm:px-4 py-3 text-center min-w-[112px] sm:min-w-[132px] bg-bg/70"
                    style={{ borderColor: `${s.color}55` }}
                  >
                    <PixelSprite
                      sprite={s.sprite}
                      className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-2 pixel-bob"
                    />
                    <p className="text-xs sm:text-sm font-semibold" style={{ color: s.color }}>
                      {s.label}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted mt-0.5">{s.sub}</p>
                  </div>
                  {i < stages.length - 1 && <Link delay={i * 0.45} />}
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {[
            "ESP32",
            "MicroPython",
            "Python",
            "Ultrasonic Sensors",
            "Multiplexer",
            "React Native",
            "JavaScript",
            "SQLite",
          ].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href="https://github.com/andresfelta95/Point-Detector"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted border border-line px-4 py-2 hover:border-cyan hover:text-cyan transition-colors"
          >
            <Github size={14} /> firmware — esp32
          </a>
          <a
            href="https://github.com/andresfelta95/InteractiveDartBoard_MobileApp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted border border-line px-4 py-2 hover:border-cyan hover:text-cyan transition-colors"
          >
            <Github size={14} /> app — react native
          </a>
        </div>
      </div>
    </section>
  );
}
