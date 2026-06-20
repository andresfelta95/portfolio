"use client";

import { useEffect, useState } from "react";

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

function Dot({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-block w-2 h-2 animate-pulse ${ok ? "bg-term" : "bg-line"}`}
    />
  );
}

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 bg-line overflow-hidden mt-1">
      <div
        className="h-full transition-all duration-500"
        style={{ width: `${Math.min(value, 100)}%`, backgroundColor: color }}
      />
    </div>
  );
}

function Panel({ cmd, children }: { cmd: string; children: React.ReactNode }) {
  return (
    <div className="border border-line bg-panel">
      <div className="border-b border-line px-4 py-2 text-xs text-muted">
        <span className="text-term">$</span> {cmd}
      </div>
      <div className="p-4">{children}</div>
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
    <section id="live" className="py-20 px-6 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10 text-sm text-muted">
          <Dot ok={true} />
          <span>
            <span className="text-term">$</span> uptime --self-hosted
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* AMD Price Tracker */}
          <a
            href="https://amd.paisbru.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line bg-panel hover:border-term/50 transition-colors group block"
          >
            <div className="border-b border-line px-4 py-2 flex items-center justify-between text-xs text-muted">
              <span><span className="text-term">$</span> ./app</span>
              <Dot ok={true} />
            </div>
            <div className="p-4">
              <p className="text-txt font-semibold mb-1">AMD Price Tracker</p>
              <p className="text-muted text-sm mb-4">scraping CA prices · 2× daily</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["Next.js 14", "PostgreSQL", "Docker"].map((t) => (
                  <span key={t} className="text-xs text-muted border border-line px-1.5 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-term text-xs group-hover:underline">amd.paisbru.com →</p>
            </div>
          </a>

          {/* Server Stats */}
          <Panel cmd="top -bn1">
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-3 bg-line w-3/4" />
                <div className="h-1.5 bg-line" />
                <div className="h-3 bg-line w-1/2 mt-3" />
                <div className="h-1.5 bg-line" />
              </div>
            ) : data?.stats ? (
              <div className="space-y-3 text-sm">
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-muted">cpu</span>
                    <span className="text-txt">{data.stats.cpu.toFixed(1)}%</span>
                  </div>
                  <Bar value={data.stats.cpu} color="#4ade80" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-muted">ram</span>
                    <span className="text-txt">
                      {data.stats.ramUsed}/{data.stats.ramTotal} GB
                    </span>
                  </div>
                  <Bar value={data.stats.ram} color="#a855f7" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-muted">disk</span>
                    <span className="text-txt">{data.stats.disk.toFixed(0)}%</span>
                  </div>
                  <Bar value={data.stats.disk} color="#f97316" />
                </div>
                <div className="pt-2 border-t border-line flex justify-between text-xs">
                  <span className="text-muted">uptime</span>
                  <span className="text-term">{data.stats.uptime}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted text-sm">stats unavailable</p>
            )}
          </Panel>

          {/* Services */}
          <Panel cmd="systemctl status">
            <p className="text-txt font-semibold mb-1">
              {data?.services
                ? `${data.services.up}/${data.services.total} operational`
                : "self-hosted stack"}
            </p>
            <p className="text-muted text-xs mb-4">running 24/7 on paisbru.com</p>
            <div className="flex flex-wrap gap-1.5">
              {["nginx", "PostgreSQL", "MongoDB", "Redis", "Cloudflare"].map((s) => (
                <span key={s} className="text-xs text-muted border border-line px-1.5 py-0.5">
                  {s}
                </span>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
