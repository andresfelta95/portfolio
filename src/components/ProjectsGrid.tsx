"use client";

import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { projects, type ProjectCategory } from "@/lib/projects";

const FILTERS: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Hardware", value: "hardware" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "Desktop", value: "desktop" },
  { label: "Games", value: "game" },
  { label: "Infrastructure", value: "infra" },
];

const COLORS: Record<ProjectCategory, string> = {
  hardware: "#f97316",
  mobile: "#a855f7",
  web: "#3b82f6",
  infra: "#22c55e",
  desktop: "#eab308",
  game: "#ec4899",
};

const LABELS: Record<ProjectCategory, string> = {
  hardware: "Hardware",
  mobile: "Mobile",
  web: "Web",
  infra: "Infra",
  desktop: "Desktop",
  game: "Game",
};

const STATUS_LABELS: Record<NonNullable<import("@/lib/projects").Project["status"]>, { label: string; color: string }> = {
  live: { label: "● LIVE", color: "#22c55e" },
  "in-dev": { label: "▶ IN DEV", color: "#eab308" },
  "pre-production": { label: "◇ PRE-PROD", color: "#a855f7" },
};

export default function ProjectsGrid() {
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const visible = projects.filter(
    (p) => !p.featured && (active === "all" || p.categories.includes(active))
  );

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-base font-pixel text-gray-400 tracking-[0.3em] uppercase mb-2">{"// "}PROJECTS</p>
        <h2 className="text-3xl font-bold text-white mb-8">More Work</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`text-sm px-4 py-1.5 rounded-full border transition-all duration-150 active:scale-95 ${
                active === f.value
                  ? "border-[#00d4ff] text-[#00d4ff] bg-[#00d4ff]/10"
                  : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((project) => (
            <div
              key={project.id}
              className="bg-[#0f1419] border border-white/5 rounded-xl overflow-hidden flex flex-col group shadow-card hover:shadow-card-hover hover:border-[#00d4ff]/20 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Optional preview image — used for the games / creative tools.
                  Pixel-art look is preserved with image-rendering:pixelated. */}
              {project.image && (
                <div className="relative aspect-[16/9] bg-[#0a0e14] overflow-hidden border-b border-white/5">
                  <img
                    src={project.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419] via-transparent to-transparent" />
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                {/* Category + status row */}
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  {project.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{
                        color: COLORS[cat],
                        backgroundColor: `${COLORS[cat]}15`,
                      }}
                    >
                      {LABELS[cat]}
                    </span>
                  ))}
                  {project.status && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded font-pixel tracking-wider ml-auto"
                      style={{
                        color: STATUS_LABELS[project.status].color,
                        backgroundColor: `${STATUS_LABELS[project.status].color}10`,
                      }}
                    >
                      {STATUS_LABELS[project.status].label}
                    </span>
                  )}
                </div>

                <h3 className="text-white font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-1 leading-relaxed">
                  {project.description}
                </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.slice(0, 4).map((t) => (
                  <span key={t} className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-xs text-gray-400 px-1 py-0.5">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={12} /> GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[#00d4ff] hover:text-cyan-300 transition-colors ml-auto"
                    >
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
