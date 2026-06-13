"use client";

import { motion } from "framer-motion";
import SynthwaveBackdrop from "./SynthwaveBackdrop";
import TechLayers from "./TechLayers";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 px-6 overflow-hidden">
      <SynthwaveBackdrop />
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[#00d4ff] font-pixel text-base tracking-[0.3em] mb-4"
            >
              &gt; HELLO, I&apos;M
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
            >
              Andrés Tangarife
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-200 mb-8 leading-relaxed"
              style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
            >
              Building from{" "}
              <span className="text-[#ff8a3c] font-medium">silicon</span> to{" "}
              <span className="text-[#5fff9b] font-medium">cloud</span>.{" "}
              Embedded systems, mobile apps, web platforms, and self-hosted infrastructure.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="https://github.com/andresfelta95"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00d4ff] text-[#080c10] font-semibold px-6 py-3 rounded-lg shadow-glow hover:bg-cyan-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                View GitHub
              </a>
              <a
                href="#projects"
                className="border border-white/10 text-gray-300 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] hover:-translate-y-0.5 active:translate-y-0 px-6 py-3 rounded-lg transition-all duration-200"
              >
                See Projects
              </a>
            </motion.div>
          </div>

          {/* Right — Tech layers */}
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
