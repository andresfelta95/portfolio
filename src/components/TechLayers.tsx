"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const layers = [
  {
    id: "infra",
    label: "Infrastructure",
    number: "04",
    color: "#22c55e",
    tech: ["Docker", "nginx", "PostgreSQL", "MongoDB", "Redis", "Cloudflare"],
  },
  {
    id: "web",
    label: "Web",
    number: "03",
    color: "#3b82f6",
    tech: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "mobile",
    label: "Mobile",
    number: "02",
    color: "#a855f7",
    tech: ["React Native", "JavaScript", "Expo"],
  },
  {
    id: "hardware",
    label: "Embedded / Hardware",
    number: "01",
    color: "#f97316",
    tech: ["ATmega328p", "ESP32", "C", "Python", "MicroPython", "PCB Design"],
  },
];

export default function TechLayers() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      <p className="text-gray-400 text-xs font-mono mb-4 tracking-widest uppercase">
        Tech Stack
      </p>
      <div className="space-y-2">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            onMouseEnter={() => setHovered(layer.id)}
            onMouseLeave={() => setHovered(null)}
            className="border border-white/10 rounded-xl p-4 cursor-default transition-all duration-300 backdrop-blur-sm"
            style={{
              borderLeftColor: layer.color,
              borderLeftWidth: "3px",
              // Solid dark base so the cards don't blend into the synthwave backdrop.
              backgroundColor: hovered === layer.id ? `${layer.color}1f` : "rgba(10,14,20,0.7)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm font-semibold" style={{ color: layer.color }}>
                {layer.label}
              </span>
              <span className="text-gray-400 text-xs font-mono">{layer.number}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {layer.tech.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-300">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
