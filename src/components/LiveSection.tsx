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
      className={`inline-block w-2 h-2 rounded-full animate-pulse ${ok ? "bg-green-400" : "bg-gray-600"}`}
    />
  );
}

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-1">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min(value, 100)}%`, backgroundColor: color }}
      />
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
    <section id="live" className="py-20 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <Dot ok={true} />
          <p className="text-xs font-mono tracking-widest text-gray-500 uppercase">
            Live on my server
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* AMD Price Tracker */}
          <a
            href="https://amd.paisbru.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0f1419] border border-white/5 rounded-xl p-5 hover:border-[#00d4ff]/30 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-gray-600 uppercase tracking-wider">App</span>
              <Dot ok={true} />
            </div>
            <p className="text-white font-semibold mb-1">AMD Price Tracker</p>
            <p className="text-gray-500 text-sm mb-4">Scraping CA prices · 2× daily</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["Next.js 14", "PostgreSQL", "Docker"].map((t) => (
                <span key={t} className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-[#00d4ff] text-xs group-hover:underline">amd.paisbru.com →</p>
          </a>

          {/* Server Stats */}
          <div className="bg-[#0f1419] border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-gray-600 uppercase tracking-wider">Server</span>
              <Dot ok={!!data?.stats} />
            </div>
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-3 bg-white/5 rounded w-3/4" />
                <div className="h-1 bg-white/5 rounded" />
                <div className="h-3 bg-white/5 rounded w-1/2 mt-3" />
                <div className="h-1 bg-white/5 rounded" />
              </div>
            ) : data?.stats ? (
              <div className="space-y-3 text-sm">
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-gray-500">CPU</span>
                    <span className="text-white font-mono">{data.stats.cpu.toFixed(1)}%</span>
                  </div>
                  <Bar value={data.stats.cpu} color="#00d4ff" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-gray-500">RAM</span>
                    <span className="text-white font-mono">
                      {data.stats.ramUsed}/{data.stats.ramTotal} GB
                    </span>
                  </div>
                  <Bar value={data.stats.ram} color="#a855f7" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-gray-500">Disk</span>
                    <span className="text-white font-mono">{data.stats.disk.toFixed(0)}%</span>
                  </div>
                  <Bar value={data.stats.disk} color="#f97316" />
                </div>
                <div className="pt-1 border-t border-white/5 flex justify-between text-xs">
                  <span className="text-gray-500">Uptime</span>
                  <span className="text-[#22c55e] font-mono">{data.stats.uptime}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 text-sm">Stats unavailable</p>
            )}
          </div>

          {/* Services */}
          <div className="bg-[#0f1419] border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-gray-600 uppercase tracking-wider">Services</span>
              <Dot ok={true} />
            </div>
            <p className="text-white font-semibold mb-1">
              {data?.services
                ? `${data.services.up}/${data.services.total} operational`
                : "Self-hosted stack"}
            </p>
            <p className="text-gray-500 text-xs mb-4">Running 24/7 on paisbru.com</p>
            <div className="flex flex-wrap gap-1.5">
              {["nginx", "PostgreSQL", "MongoDB", "Redis", "Cloudflare"].map((s) => (
                <span key={s} className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
