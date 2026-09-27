"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { SPRITES } from "@/lib/sprites";
import { projects } from "@/lib/projects";
import { Panel, SectionHeading, Led, Tag } from "./ui";

interface LiveData {
  stats: {
    cpu: number;
    ram: number;
    ramUsed: number;
    ramTotal: number;
    disk: number;
    uptime: string;
  } | null;
  services: { up: number; total: number } | null;
}

/** Public endpoints, read off the project list so the two never disagree. */
const ENDPOINTS = [
  { host: "paisbru.com", what: "this page", url: "https://paisbru.com" },
  ...projects
    .filter((p) => p.live)
    .map((p) => ({
      host: p.live!.replace("https://", ""),
      what: p.title.split(" — ")[0],
      url: p.live!,
    })),
];

const SEGMENTS = 24;

/**
 * Segmented meter. Discrete blocks rather than a smooth fill — a bar graph on
 * an LED panel, which is what the rest of the page is pretending to be.
 */
function PixelBar({ value, color }: { value: number; color: string }) {
  const filled = Math.round((Math.min(Math.max(value, 0), 100) / 100) * SEGMENTS);
  return (
    <div className="flex gap-[2px] mt-1.5" aria-hidden>
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <span
          key={i}
          className="h-2 flex-1"
          style={{
            backgroundColor: i < filled ? color : "#16203a",
            boxShadow: i < filled ? `0 0 5px ${color}66` : undefined,
          }}
        />
      ))}
    </div>
  );
}

function Meter({ label, read, value, color }: { label: string; read: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-muted">{label}</span>
        <span className="text-txt">{read}</span>
      </div>
      <PixelBar value={value} color={color} />
    </div>
  );
}

export default function LiveSection() {
  const [data, setData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () =>
      fetch("/api/live")
        .then((r) => r.json())
        .then((d: LiveData) => {
          setData(d);
          setLoading(false);
        })
        .catch(() => setLoading(false));

    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="live" className="relative py-20 sm:py-24 px-5 sm:px-6 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          cmd="ssh paisbru && watch -n30 ./status"
          title="LIVE FROM THE BOX"
          sprite={SPRITES.wave}
          accent="#4ade80"
        >
          Everything below runs on one machine under a desk in Alberta — WSL2, Docker, a
          Cloudflare Tunnel and no open ports. These numbers are read from it every 30 seconds.
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* ── Public endpoints ── */}
          <Panel cmd="curl -I *.paisbru.com" accent="#4ade80" className="lg:col-span-1">
            <ul className="divide-y divide-line">
              {ENDPOINTS.map((e) => (
                <li key={e.host}>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 group hover:bg-panel2 transition-colors"
                  >
                    <Led />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-txt truncate group-hover:text-term transition-colors">
                        {e.host}
                      </span>
                      <span className="block text-[11px] text-muted truncate">{e.what}</span>
                    </span>
                    <ExternalLink size={12} className="text-muted shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </Panel>

          {/* ── Telemetry ── */}
          <Panel
            cmd="top -bn1"
            meta={<span className="text-[10px] text-muted">30s</span>}
            className="lg:col-span-1"
          >
            <div className="p-4">
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[0, 1, 2].map((i) => (
                    <div key={i}>
                      <div className="h-3 bg-line w-2/3 mb-2" />
                      <div className="h-2 bg-line" />
                    </div>
                  ))}
                </div>
              ) : data?.stats ? (
                <div className="space-y-4">
                  <Meter
                    label="cpu"
                    read={`${data.stats.cpu.toFixed(1)}%`}
                    value={data.stats.cpu}
                    color="#22d3ee"
                  />
                  <Meter
                    label="ram"
                    read={`${data.stats.ramUsed} / ${data.stats.ramTotal} GB`}
                    value={data.stats.ram}
                    color="#c084fc"
                  />
                  <Meter
                    label="disk"
                    read={`${data.stats.disk.toFixed(0)}%`}
                    value={data.stats.disk}
                    color="#fb923c"
                  />
                  <div className="pt-3 border-t border-line flex justify-between text-xs">
                    <span className="text-muted">uptime</span>
                    <span className="text-term neon-term">{data.stats.uptime}</span>
                  </div>
                </div>
              ) : (
                <p className="text-muted text-sm">
                  stats unavailable — the sidecar is down, the apps are not.
                </p>
              )}
            </div>
          </Panel>

          {/* ── Services ── */}
          <Panel cmd="docker ps | wc -l" accent="#ff2d95" className="lg:col-span-1">
            <div className="p-4">
              <p className="font-pixel text-[11px] text-txt mb-3 leading-relaxed">
                {data?.services ? `${data.services.up}/${data.services.total} UP` : "19 CONTAINERS"}
              </p>
              <p className="text-muted text-xs mb-4 leading-relaxed">
                Reverse proxy, four databases, the tunnel, monitoring and every app above —
                restarted unless-stopped, backed up nightly.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["nginx", "PostgreSQL", "MongoDB", "MySQL", "Redis", "cloudflared", "Uptime Kuma", "Portainer"].map(
                  (s) => (
                    <Tag key={s}>{s}</Tag>
                  )
                )}
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
