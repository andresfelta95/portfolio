"use client";

import { useState } from "react";
import { Github, ExternalLink, Lock } from "lucide-react";
import { projects, type Project, type ProjectCategory } from "@/lib/projects";
import { SPRITES, CATEGORY_SPRITE } from "@/lib/sprites";
import PixelSprite from "./PixelSprite";
import { SectionHeading, Tag, Led } from "./ui";

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
  hardware: "#fb923c",
  mobile: "#c084fc",
  web: "#38bdf8",
  infra: "#4ade80",
  desktop: "#fbbf24",
  game: "#ff2d95",
};

const STATUS: Record<NonNullable<Project["status"]>, { label: string; color: string }> = {
  live: { label: "live", color: "#4ade80" },
  "in-dev": { label: "in dev", color: "#fbbf24" },
  "pre-production": { label: "pre-prod", color: "#c084fc" },
};

/** Short enough to sit on one card without a fold. */
const CLAMP = 320;

function Card({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const accent = COLORS[project.categories[0]];
  const sprite = SPRITES[CATEGORY_SPRITE[project.categories[0]]];
  const long = project.description.length > CLAMP;

  return (
    <article
      className="group relative flex flex-col bg-panel/85 border border-line transition-colors hover:border-cyan/50"
      style={{ borderTopColor: accent, borderTopWidth: 2 }}
    >
      {/* Corner bracket lights up with the card. */}
      <span
        aria-hidden
        className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-line group-hover:border-cyan transition-colors"
      />

      {project.image && (
        <div className="relative aspect-[16/9] bg-bg overflow-hidden border-b border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt=""
            className="pixelated w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-3">
          <div
            className="shrink-0 w-9 h-9 grid place-items-center border bg-bg"
            style={{ borderColor: `${accent}55` }}
          >
            <PixelSprite sprite={sprite} className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-txt font-semibold text-sm leading-snug">{project.title}</h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {project.categories.map((cat) => (
                <span key={cat} className="text-[10px]" style={{ color: COLORS[cat] }}>
                  {cat}
                </span>
              ))}
              {project.status && (
                <span
                  className="flex items-center gap-1 text-[10px] ml-auto uppercase tracking-wider"
                  style={{ color: STATUS[project.status].color }}
                >
                  <Led color={STATUS[project.status].color} pulse={project.status === "live"} />
                  {STATUS[project.status].label}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-muted text-[13px] leading-relaxed">
          {long && !open ? `${project.description.slice(0, CLAMP).trimEnd()}…` : project.description}
        </p>
        {long && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="self-start mt-2 text-[11px] text-cyan hover:underline"
          >
            {open ? "— less" : "+ more"}
          </button>
        )}

        <div className="flex flex-wrap gap-1.5 my-4">
          {project.tech.slice(0, 5).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          {project.tech.length > 5 && (
            <span className="text-[10px] text-muted px-1 py-0.5">+{project.tech.length - 5}</span>
          )}
        </div>

        <div className="flex items-center gap-4 mt-auto pt-3 border-t border-line text-xs">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted hover:text-txt transition-colors"
            >
              <Github size={12} /> source
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-cyan hover:underline ml-auto"
            >
              <ExternalLink size={12} /> open
            </a>
          )}
          {!project.live && project.privateNote && (
            <span className="flex items-center gap-1.5 text-muted ml-auto text-[11px]">
              <Lock size={11} /> {project.privateNote}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

const TOTAL = projects.filter((p) => !p.featured).length;

export default function ProjectsGrid() {
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const visible = projects.filter(
    (p) => !p.featured && (active === "all" || p.categories.includes(active))
  );

  return (
    <section id="projects" className="py-20 sm:py-24 px-5 sm:px-6 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          cmd="ls -la projects/ --sort=recent"
          title="THE REST OF THE BOARD"
          sprite={SPRITES.gamepad}
          accent="#ff2d95"
        >
          {TOTAL} more, newest first. Anything marked live is running right now on the same server
          as this page.
        </SectionHeading>

        {/* Filters as command flags. */}
        <div className="flex flex-wrap gap-2 mb-8 text-xs sm:text-sm">
          {FILTERS.map((f) => {
            const on = active === f.value;
            const sprite =
              f.value === "all" ? undefined : SPRITES[CATEGORY_SPRITE[f.value]];
            return (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                aria-pressed={on}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 border transition-all active:translate-y-px ${
                  on
                    ? "border-cyan text-cyan shadow-neon"
                    : "border-line text-muted hover:border-line2 hover:text-txt"
                }`}
              >
                {sprite && <PixelSprite sprite={sprite} className="w-3.5 h-3.5" />}
                --{f.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {visible.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
