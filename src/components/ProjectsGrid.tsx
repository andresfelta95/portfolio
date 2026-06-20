"use client";

import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { projects, type ProjectCategory } from "@/lib/projects";

const FILTERS: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "all", value: "all" },
  { label: "hardware", value: "hardware" },
  { label: "web", value: "web" },
  { label: "mobile", value: "mobile" },
  { label: "desktop", value: "desktop" },
  { label: "games", value: "game" },
  { label: "infra", value: "infra" },
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
  hardware: "hardware",
  mobile: "mobile",
  web: "web",
  infra: "infra",
  desktop: "desktop",
  game: "game",
};

const STATUS_LABELS: Record<NonNullable<import("@/lib/projects").Project["status"]>, { label: string; color: string }> = {
  live: { label: "● live", color: "#4ade80" },
  "in-dev": { label: "▶ in-dev", color: "#eab308" },
  "pre-production": { label: "◇ pre-prod", color: "#a855f7" },
};

export default function ProjectsGrid() {
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const visible = projects.filter(
    (p) => !p.featured && (active === "all" || p.categories.includes(active))
  );

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-muted mb-2">
          <span className="text-term">$</span> ls -la projects/
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-txt mb-8 tracking-tight">
          more work
        </h2>

        {/* Filters as flags */}
        <div className="flex flex-wrap gap-2 mb-8 text-sm">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-3 py-1.5 border transition-colors active:translate-y-px ${
                active === f.value
                  ? "border-term text-term"
                  : "border-line text-muted hover:border-muted hover:text-txt"
              }`}
            >
              --{f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((project) => (
            <div
              key={project.id}
              className="bg-panel border border-line overflow-hidden flex flex-col group hover:border-term/40 transition-colors"
            >
              {project.image && (
                <div className="relative aspect-[16/9] bg-bg overflow-hidden border-b border-line">
                  <img
                    src={project.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
                </div>
              )}

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  {project.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs px-1.5 py-0.5 border"
                      style={{ color: COLORS[cat], borderColor: `${COLORS[cat]}55` }}
                    >
                      {LABELS[cat]}
                    </span>
                  ))}
                  {project.status && (
                    <span
                      className="text-[10px] px-1.5 py-0.5 ml-auto"
                      style={{ color: STATUS_LABELS[project.status].color }}
                    >
                      {STATUS_LABELS[project.status].label}
                    </span>
                  )}
                </div>

                <h3 className="text-txt font-semibold mb-2">{project.title}</h3>
                <p className="text-muted text-sm mb-4 flex-1 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="text-xs text-muted border border-line px-1.5 py-0.5">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-xs text-muted px-1 py-0.5">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-line text-xs">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-muted hover:text-txt transition-colors"
                    >
                      <Github size={12} /> github
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-term hover:underline ml-auto"
                    >
                      <ExternalLink size={12} /> live
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
