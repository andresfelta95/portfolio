"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const layers = [
  {
    id: "infra",
    label: "infrastructure",
    number: "04",
    color: "#22c55e",
    tech: ["Docker", "nginx", "PostgreSQL", "MongoDB", "Redis", "Cloudflare"],
  },
  {
    id: "web",
    label: "web",
    number: "03",
    color: "#3b82f6",
    tech: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "mobile",
    label: "mobile",
    number: "02",
    color: "#a855f7",
    tech: ["React Native", "JavaScript", "Expo"],
  },
  {
    id: "hardware",
    label: "embedded / hardware",
    number: "01",
    color: "#f97316",
    tech: ["ATmega328p", "ESP32", "C", "Python", "MicroPython", "PCB Design"],
  },
];

export default function TechLayers() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="border border-line bg-panel">
      <div className="flex items-center justify-between border-b border-line px-4 py-2 text-xs text-muted">
        <span>
          <span className="text-term">$</span> stack --layers
        </span>
        <span>4 found</span>
      </div>
      <div className="divide-y divide-line">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.5 + i * 0.08 }}
            onMouseEnter={() => setHovered(layer.id)}
            onMouseLeave={() => setHovered(null)}
            className="px-4 py-3 cursor-default transition-colors border-l-2"
            style={{
              borderLeftColor: layer.color,
              backgroundColor: hovered === layer.id ? `${layer.color}14` : "transparent",
            }}
          >
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="font-semibold" style={{ color: layer.color }}>
                {layer.label}
              </span>
              <span className="text-muted text-xs">[{layer.number}]</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {layer.tech.map((t) => (
                <span key={t} className="text-xs px-1.5 py-0.5 border border-line text-muted">
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
