# Portfolio — paisbru.com

Personal portfolio for Andrés Tangarife. Built with Next.js 14 (app router),
TypeScript, Tailwind, framer-motion. Self-hosted on a Docker stack behind
Cloudflare Tunnel.

## Stack

- **Next.js 14** (app router, RSC where possible)
- **TypeScript** strict
- **Tailwind CSS** + custom CSS variables
- **framer-motion** for hero / intro animations
- **lucide-react** for line icons
- Pixel-font accents via `VT323` and `Press Start 2P` from `next/font/google`
- Deployed in Docker behind a Cloudflare Tunnel at <https://paisbru.com>

## Status (2026-08-24)

✅ **Live and stable.** 10 projects in the grid: 5 marked `live`, 2 `in-dev`
(Retro Creator, ComputerUseNanny), 2 `pre-production` (GREEN DAY game). The
household finance tracker is deliberately **not** listed — it holds financial data
and lives behind Cloudflare Access.

No outstanding work. Content refresh is the only maintenance: project descriptions
were last reviewed 2026-07-07, and `status` fields drift as apps ship.

## Sections

- Hero
- Live status (pulls realtime data from the personal server via `/api/live`)
- Featured project (Interactive Dartboard System)
- Projects grid with category + status filters
- Contact

## Dev

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Deploy

Two containers, both defined in `/home/server_pc/docker/compose/portfolio.yml`:

```bash
docker compose -f /home/server_pc/docker/compose/portfolio.yml up -d --build
```

- **`portfolio`** — the Next.js standalone image (512 MB / 0.5 CPU). No host port;
  cloudflared routes `paisbru.com` and `www.paisbru.com` straight to
  `portfolio:3000`. nginx is *not* in the request path.
- **`portfolio-stats`** — small stats sidecar on :5000 that the Live-status section
  reads through `/api/live` (`STATS_SERVICE_URL`). Optional Uptime Kuma wiring is
  stubbed in the compose file but commented out.

> Code is baked into the image — editing source does nothing live until you rebuild.

## Project data

`src/lib/projects.ts` is the single source of truth for the project list.
Add an entry there and it'll show up in both the grid and category filters.
Project categories: `hardware | mobile | web | infra | desktop | game`.
