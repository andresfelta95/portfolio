import CircuitBackdrop from "./CircuitBackdrop";
import CircuitCore from "./CircuitCore";
import { Led } from "./ui";
import { projects } from "@/lib/projects";

// Derived from the project list so the readout cannot drift from the grid.
const DEPLOYED = projects.filter((p) => p.status === "live" && (p.live || p.privateNote)).length;

/** Staggered CSS entrance — see `.rise` in globals.css. */
const rise = (delay: number) => ({ ["--rise-delay" as string]: `${delay}s` });

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-5 sm:px-6 overflow-hidden"
    >
      {/* The board the hero sits on, faded out under the text column. */}
      <CircuitBackdrop seed={13} count={11} className="absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 22% 45%, rgba(5,6,13,0.94) 0%, rgba(5,6,13,0.62) 55%, transparent 100%)",
        }}
      />
      {/* Neon wash from below, like a city out of frame. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(255,45,149,0.10) 0%, rgba(34,211,238,0.05) 45%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          {/* ── Left: terminal output ── */}
          <div>
            <p className="rise text-muted text-xs sm:text-sm mb-5" style={rise(0)}>
              <span className="text-cyan">$</span> whoami
            </p>

            <h1
              className="rise font-pixel text-[1.55rem] sm:text-4xl lg:text-[2.7rem] text-txt mb-6 leading-[1.4] neon-cyan"
              style={rise(0.08)}
            >
              <span className="glitch" data-text="andres">
                andres
              </span>
              <br />
              <span className="text-cyan">_</span>tangarife
            </h1>

            <div
              className="rise flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-[10px] uppercase tracking-[0.2em] text-muted"
              style={rise(0.16)}
            >
              <span className="flex items-center gap-1.5">
                <Led color="#4ade80" /> {DEPLOYED} apps deployed
              </span>
              <span className="flex items-center gap-1.5">
                <Led color="#22d3ee" /> {projects.length} projects
              </span>
              <span className="flex items-center gap-1.5">
                <Led color="#ff2d95" pulse={false} /> self-hosted
              </span>
            </div>

            <p
              className="rise text-sm sm:text-base text-muted mb-9 leading-relaxed max-w-lg"
              style={rise(0.22)}
            >
              <span className="text-cyan"># </span>
              building from <span className="text-[#fb923c]">silicon</span> to{" "}
              <span className="text-term">cloud</span> — embedded firmware, mobile apps, web
              platforms, self-hosted infrastructure, and AI tooling for pixel art.
              <span className="cursor" aria-hidden />
            </p>

            <div className="rise flex flex-wrap items-center gap-3 text-sm" style={rise(0.3)}>
              <a
                href="#projects"
                className="border border-cyan bg-cyan text-bg font-bold px-5 py-2.5 hover:bg-transparent hover:text-cyan hover:shadow-neon transition-all"
              >
                ./run projects
              </a>
              <a
                href="https://github.com/andresfelta95"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line text-muted px-5 py-2.5 hover:border-magenta hover:text-magenta transition-colors"
              >
                git clone →
              </a>
            </div>
          </div>

          {/* ── Right: the board ── */}
          <div className="boot" style={rise(0.35)}>
            <CircuitCore />
          </div>
        </div>
      </div>
    </section>
  );
}
