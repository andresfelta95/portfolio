# Portfolio — paisbru.com

Personal portfolio for Andrés Tangarife. Built with Next.js 14 (app router),
TypeScript and Tailwind. Self-hosted on a Docker stack behind Cloudflare Tunnel.

Design language: **pixel-art cyberpunk circuit board**. Deep-navy substrate,
neon cyan signal / magenta counter-signal / phosphor-green "live", copper traces
routed at 45° with data pulses running along them, and hand-drawn 16×16 sprites.

## Stack

- **Next.js 14** (app router, server components throughout)
- **TypeScript** strict
- **Tailwind CSS** + custom CSS variables
- **lucide-react** for the few line icons (links, locks)
- Fonts: `JetBrains Mono` (body), `Press Start 2P` (bitmap display type),
  `VT323` (readouts) — all via `next/font/google`
- No animation library. Entrances, glitch, scanlines and the travelling trace
  dashes are all CSS, so the page renders fully with JavaScript disabled.
- Deployed in Docker behind a Cloudflare Tunnel at <https://paisbru.com>

## The pixel art

There are **no image assets for the art** — everything is generated markup.

- `src/lib/sprites.ts` — sprites authored as 16×16 character grids with a
  per-sprite palette (`.` is transparent). A dev-only assertion throws if a row
  is the wrong length or uses a colour that isn't in the palette, so a typo
  fails the build instead of silently drawing a hole.
- `src/components/PixelSprite.tsx` — renders a grid to SVG, collapsing runs of
  identical pixels into single `<rect>`s and setting `shapeRendering="crispEdges"`
  so it stays sharp at any scale.
- `src/lib/circuit.ts` — seeded, pure PCB trace geometry. `traceField()` routes
  copper across a section; `traceConverge()` runs it into the hero's chip.
  Corners are chamfered at 45° like real board layout, and each path reports its
  measured length so a `stroke-dashoffset` animation crosses it exactly once.
  Seeded means server and client generate identical paths — no hydration drift.
- `src/components/CircuitBackdrop.tsx` / `CircuitCore.tsx` — the section
  backdrops and the hero board.

To add a sprite: add a grid to `SPRITES` in `sprites.ts` and render it with
`<PixelSprite sprite={SPRITES.yourThing} />`.

## Sections

- **Hero** — name, live counters (derived from the project list), and the board
- **The stack** — five layers, each a socket on a bus
- **Live from the box** — public endpoints, server telemetry via `/api/live`,
  container count
- **Featured** — the Interactive Dartboard, as a signal pipeline
- **Projects** — filterable grid with category sprites and status LEDs
- **Contact**

## Status (2026-09-27)

✅ **Live and stable.** 13 projects: Workbench, Libro and Grove Guide added in
this pass; FIFA Tracker, MakeTabs, AMD Tracker and the infrastructure entry
refreshed to their current state.

**Libro is listed without a link on purpose.** It holds household financial data
and sits behind Cloudflare Access; the card shows a lock and the reason instead
of a URL. If it should not appear at all, delete the `libro` entry from
`src/lib/projects.ts`.

Accessibility: everything animated is disabled under
`prefers-reduced-motion: reduce`, the art stays, and the sweeping scan bar is
removed rather than frozen.

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

> `next start` warns under `output: standalone`. To preview the real artefact,
> copy `.next/static` and `public` into `.next/standalone/` and run
> `node .next/standalone/server.js` from inside that directory.

## Deploy

Two containers, both defined in `/home/server_pc/docker/compose/portfolio.yml`:

```bash
docker compose -f /home/server_pc/docker/compose/portfolio.yml up -d --build
```

- **`portfolio`** — the Next.js standalone image (512 MB / 0.5 CPU). No host port;
  cloudflared routes `paisbru.com` and `www.paisbru.com` straight to
  `portfolio:3000`. nginx is *not* in the request path.
- **`portfolio-stats`** — small stats sidecar on :5000 that the Live section
  reads through `/api/live` (`STATS_SERVICE_URL`). When it is unreachable the
  section says so and the rest of the page is unaffected. Optional Uptime Kuma
  wiring is stubbed in the compose file but commented out.

> Code is baked into the image — editing source does nothing live until you rebuild.

## Project data

`src/lib/projects.ts` is the single source of truth for the project list; the
hero counters and the endpoint list in the Live section are both derived from
it. Add an entry there and it shows up in the grid and the category filters.
Categories: `hardware | mobile | web | infra | desktop | game`. Set `privateNote`
instead of `live` for anything that must not be linked publicly.
