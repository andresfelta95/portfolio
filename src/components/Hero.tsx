"use client";

import { motion } from "framer-motion";
import TechLayers from "./TechLayers";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-14 px-6 overflow-hidden">
      {/* Faint terminal grid — texture, not gloss. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 70% 60% at 30% 40%, #000 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 30% 40%, #000 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left — terminal output */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-muted text-sm mb-4"
            >
              <span className="text-term">$</span> whoami
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-txt mb-5 leading-[1.05] tracking-tight"
            >
              andres
              <wbr />
              _tangarife
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-muted mb-8 leading-relaxed max-w-lg"
            >
              <span className="text-term"># </span>
              building from{" "}
              <span className="text-[#ff8a3c]">silicon</span> to{" "}
              <span className="text-term">cloud</span> — embedded systems, mobile
              apps, web platforms, and self-hosted infrastructure.
              <span className="cursor" aria-hidden />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 text-sm"
            >
              <a
                href="https://github.com/andresfelta95"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-term bg-term text-bg font-semibold px-5 py-2.5 hover:bg-transparent hover:text-term transition-colors"
              >
                ./view-github.sh
              </a>
              <a
                href="#projects"
                className="border border-line text-muted px-5 py-2.5 hover:border-term hover:text-term transition-colors"
              >
                cd projects/
              </a>
            </motion.div>
          </div>

          {/* Right — tech layers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <TechLayers />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
