"use client";

import { motion } from "framer-motion";
import TechLayers from "./TechLayers";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 px-6">
      <div className="max-w-6xl mx-auto w-full">
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
              className="text-lg text-gray-400 mb-8 leading-relaxed"
            >
              Building from{" "}
              <span className="text-[#f97316] font-medium">silicon</span> to{" "}
              <span className="text-[#22c55e] font-medium">cloud</span>.{" "}
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
                className="bg-[#00d4ff] text-[#080c10] font-semibold px-6 py-3 rounded-lg hover:bg-cyan-300 transition-colors"
              >
                View GitHub
              </a>
              <a
                href="#projects"
                className="border border-white/10 text-gray-300 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] px-6 py-3 rounded-lg transition-colors"
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
