import PixelSprite from "./PixelSprite";
import { SPRITES } from "@/lib/sprites";
import { Led } from "./ui";

const links = [
  { href: "#stack", label: "stack" },
  { href: "#live", label: "live" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-bg/92 backdrop-blur-sm">
      {/* Power rail along the very top of the board. */}
      <div
        aria-hidden
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, #22d3ee 0%, #22d3ee 22%, transparent 22%, transparent 26%, #ff2d95 26%, #ff2d95 40%, transparent 40%, transparent 46%, #4ade80 46%, #4ade80 62%, transparent 62%, transparent 68%, #fbbf24 68%, #fbbf24 78%, transparent 78%)",
          opacity: 0.55,
        }}
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between gap-4 text-sm">
        <a href="#top" className="flex items-center gap-2.5 min-w-0">
          <PixelSprite sprite={SPRITES.chip} className="w-5 h-5 shrink-0" />
          <span className="truncate">
            <span className="text-cyan">andres</span>
            <span className="text-muted">@paisbru</span>
            <span className="text-muted">:~$</span>
          </span>
        </a>

        <div className="flex items-center gap-4 sm:gap-5 text-muted">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden md:inline hover:text-cyan transition-colors"
            >
              <span className="text-cyan/40">cd </span>
              {l.label}/
            </a>
          ))}
          <span className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-widest">
            <Led />
            online
          </span>
          <a
            href="https://github.com/andresfelta95"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line px-3 py-1.5 text-txt hover:border-cyan hover:text-cyan hover:shadow-neon transition-all whitespace-nowrap"
          >
            git remote →
          </a>
        </div>
      </div>
    </nav>
  );
}
