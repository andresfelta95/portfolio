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
- Deployed in Docker behind nginx + Cloudflare Tunnel at <https://paisbru.com>

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

A standalone Docker image is produced by `Dockerfile`. The container runs
behind the same nginx + Cloudflare Tunnel stack that hosts the other apps on
this server.

## Project data

`src/lib/projects.ts` is the single source of truth for the project list.
Add an entry there and it'll show up in both the grid and category filters.
Project categories: `hardware | mobile | web | infra | desktop | game`.
