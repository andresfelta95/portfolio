import { Github, Mail } from "lucide-react";
import PixelSprite from "./PixelSprite";
import { SPRITES } from "@/lib/sprites";
import CircuitBackdrop from "./CircuitBackdrop";
import { PixelDivider } from "./ui";

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 sm:py-28 px-5 sm:px-6 border-t border-line">
      <CircuitBackdrop seed={99} count={7} intensity={0.5} className="absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(5,6,13,0.95) 0%, rgba(5,6,13,0.72) 60%, rgba(5,6,13,0.9) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <PixelSprite
          sprite={SPRITES.mail}
          label="Contact"
          className="w-12 h-12 mx-auto mb-5 sprite-glow pixel-bob"
        />
        <p className="text-xs sm:text-sm text-muted mb-4">
          <span className="text-cyan">$</span> ./contact.sh --open
        </p>
        <h2 className="font-pixel text-base sm:text-2xl text-txt mb-5 neon-cyan leading-relaxed">
          <span className="glitch" data-text="LET'S CONNECT">
            LET&apos;S CONNECT
          </span>
          <span className="cursor" aria-hidden />
        </h2>
        <p className="text-muted mb-10 max-w-md mx-auto text-sm leading-relaxed">
          Open to opportunities, collaborations, and anything that needs a person who is as
          comfortable with a soldering iron as with a Dockerfile.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <a
            href="mailto:andresfelta95@gmail.com"
            className="flex items-center gap-2 bg-panel border border-line hover:border-cyan hover:text-cyan hover:shadow-neon text-muted px-5 py-2.5 transition-all"
          >
            <Mail size={16} /> andresfelta95@gmail.com
          </a>
          <a
            href="https://github.com/andresfelta95"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-panel border border-line hover:border-magenta hover:text-magenta hover:shadow-neon-magenta text-muted px-5 py-2.5 transition-all"
          >
            <Github size={16} /> andresfelta95
          </a>
        </div>

        <div className="mt-16 max-w-sm mx-auto">
          <PixelDivider />
        </div>
        <p className="text-muted text-[11px] mt-6 leading-relaxed">
          <span className="text-cyan"># </span>
          paisbru.com · next.js on docker · cloudflare tunnel · no open ports
          <br />
          <span className="text-muted/70">
            the sprites and traces are svg, drawn from character grids at build time
          </span>
        </p>
      </div>
    </section>
  );
}
