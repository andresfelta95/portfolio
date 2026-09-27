import PixelSprite from "./PixelSprite";
import { SPRITES } from "@/lib/sprites";
import { SectionHeading, Tag } from "./ui";
import CircuitBackdrop from "./CircuitBackdrop";

const layers = [
  {
    id: "ai",
    label: "ai & tooling",
    number: "05",
    color: "#fbbf24",
    sprite: SPRITES.monitor,
    tech: ["Anthropic SDK", "Claude vision", "ComfyUI", "SDXL Turbo", "Demucs", "basic-pitch", "Electron"],
  },
  {
    id: "infra",
    label: "infrastructure",
    number: "04",
    color: "#4ade80",
    sprite: SPRITES.server,
    tech: ["Docker", "nginx", "PostgreSQL", "MongoDB", "Redis", "Cloudflare Tunnel", "Cloudflare Access", "WSL2"],
  },
  {
    id: "web",
    label: "web",
    number: "03",
    color: "#38bdf8",
    sprite: SPRITES.browser,
    tech: ["Next.js 15", "React 19", "Angular 22", "TypeScript", "Tailwind", "Drizzle", "FastAPI", "Express"],
  },
  {
    id: "mobile",
    label: "mobile",
    number: "02",
    color: "#c084fc",
    sprite: SPRITES.phone,
    tech: ["React Native", "Expo", "JavaScript"],
  },
  {
    id: "hardware",
    label: "embedded / hardware",
    number: "01",
    color: "#fb923c",
    sprite: SPRITES.chip,
    tech: ["ATmega328p", "ESP32", "C", "MicroPython", "PCB Design", "I²C / SPI", "Sensors"],
  },
] as const;

/**
 * The stack, drawn as five boards wired to one bus. Each row is a socket:
 * sprite, layer number, and the parts that live on it.
 */
export default function TechLayers() {
  return (
    <section id="stack" className="relative py-20 sm:py-24 px-5 sm:px-6 border-t border-line">
      <CircuitBackdrop seed={31} count={6} intensity={0.45} className="absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,6,13,0.95) 0%, rgba(5,6,13,0.75) 60%, rgba(5,6,13,0.95) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading cmd="stack --layers --verbose" title="THE STACK" sprite={SPRITES.stack}>
          Five layers, one person. Most of these projects touch three or more of them at once —
          the dartboard runs from an ultrasonic sensor to a phone screen, and the server under
          the desk is the same one serving this page.
        </SectionHeading>

        <div className="relative">
          {/* The bus every socket taps into. */}
          <span
            aria-hidden
            className="absolute left-[15px] sm:left-[19px] top-6 bottom-6 w-px bg-line2"
          />

          <div className="space-y-3">
            {layers.map((layer) => (
              <div key={layer.id} className="relative flex gap-4 sm:gap-5 group">
                {/* Socket on the bus. */}
                <div
                  className="relative z-10 shrink-0 w-8 h-8 sm:w-10 sm:h-10 grid place-items-center border bg-bg transition-colors"
                  style={{ borderColor: `${layer.color}66` }}
                >
                  <PixelSprite sprite={layer.sprite} className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <div
                  className="flex-1 min-w-0 border border-line bg-panel/85 px-4 py-3 transition-colors group-hover:border-line2"
                  style={{ borderLeftColor: layer.color, borderLeftWidth: 2 }}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-2.5">
                    <span
                      className="font-pixel text-[10px] sm:text-[11px]"
                      style={{ color: layer.color }}
                    >
                      {layer.label}
                    </span>
                    <span className="text-muted text-[10px] tracking-widest shrink-0">
                      [{layer.number}]
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {layer.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
