import { NextResponse } from "next/server";

const STATS_URL = process.env.STATS_SERVICE_URL ?? "http://portfolio-stats:5000";
const UPTIME_KUMA_URL = process.env.UPTIME_KUMA_URL;
const UPTIME_KUMA_SLUG = process.env.UPTIME_KUMA_SLUG;

async function fetchWithTimeout(url: string, ms = 4000): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal, cache: "no-store" });
  } finally {
    clearTimeout(timer);
  }
}

export async function GET() {
  const [statsResult, uptimeResult] = await Promise.allSettled([
    fetchWithTimeout(`${STATS_URL}/stats`).then((r) => r.json()),
    UPTIME_KUMA_URL && UPTIME_KUMA_SLUG
      ? fetchWithTimeout(
          `${UPTIME_KUMA_URL}/api/status-page/heartbeat/${UPTIME_KUMA_SLUG}`
        ).then((r) => r.json())
      : Promise.resolve(null),
  ]);

  const raw = statsResult.status === "fulfilled" ? statsResult.value : null;
  const uptime = uptimeResult.status === "fulfilled" ? uptimeResult.value : null;

  let servicesUp = 0;
  let servicesTotal = 0;
  if (uptime?.heartbeatList) {
    for (const list of Object.values(uptime.heartbeatList) as Array<Array<{ status: number }>>) {
      if (list.length > 0) {
        servicesTotal++;
        if (list[list.length - 1].status === 1) servicesUp++;
      }
    }
  }

  return NextResponse.json({
    stats: raw
      ? {
          cpu: raw.cpu_percent,
          ram: raw.ram_percent,
          ramUsed: raw.ram_used_gb,
          ramTotal: raw.ram_total_gb,
          disk: raw.disk_percent,
          uptime: raw.uptime,
        }
      : null,
    services: servicesTotal > 0 ? { up: servicesUp, total: servicesTotal } : null,
  });
}
