export type ProjectCategory = "hardware" | "mobile" | "web" | "infra" | "desktop" | "game";

export interface Project {
  id: string;
  title: string;
  description: string;
  categories: ProjectCategory[];
  featured: boolean;
  tech: string[];
  github?: string;
  githubAlt?: string;
  live?: string;
  /** Optional preview image (relative path under /public). */
  image?: string;
  /** Optional status label — useful for in-progress work. */
  status?: "live" | "in-dev" | "pre-production";
  /** Shown instead of a link when the app is deliberately not public. */
  privateNote?: string;
}

export const projects: Project[] = [
  {
    id: "dartboard",
    title: "Interactive Dartboard System",
    description:
      "End-to-end system bridging hardware and software. ESP32 with ultrasonic sensors and a multiplexer detect where darts land, push scores to a database in real time, and a React Native app displays live game state.",
    categories: ["hardware", "mobile"],
    featured: true,
    tech: ["ESP32", "Python", "MicroPython", "Ultrasonic Sensors", "Multiplexer", "React Native", "JavaScript"],
    github: "https://github.com/andresfelta95/Point-Detector",
    githubAlt: "https://github.com/andresfelta95/InteractiveDartBoard_MobileApp",
    status: "live",
  },
  {
    id: "workbench",
    title: "Workbench — Interactive Electronics Course",
    description:
      "Free bilingual (EN/ES) electronics course where every concept ships with an instrument you operate and a consequence you see or hear at the same instant. Circuits are drawn as live SVG components rather than images, so values update as you turn a knob and the prose can highlight the exact part it is talking about. Twelve modules from Ohm's law to PCB design; lessons are Markdown compiled into lazy-loaded modules at build time, and the build fails loudly if the two languages disagree about what exists — a half-translated lesson cannot ship. Angular 22 standalone + signals, zoneless, prerendered to static HTML with no backend at all. MIT for the code, CC BY-SA for the course content.",
    categories: ["web", "hardware"],
    featured: false,
    tech: ["Angular 22", "TypeScript", "Signals", "SSG / Prerender", "SVG Schematics", "Markdown Pipeline", "i18n", "nginx", "Docker"],
    live: "https://electronics.paisbru.com",
    status: "live",
  },
  {
    id: "fifa-tracker",
    title: "FIFA Tracker — World Cup 2026 Album & Live Scores",
    description:
      "Web app to track filling the Panini World Cup 2026 sticker album (980 stickers): owned / missing / duplicates, special-colour parallels with rarity, and QR swap-codes compatible with the official app's format (reverse-engineered gzip bitfields). Full accounts — email, Google and Microsoft sign-in, two-factor auth — plus a Community leaderboard with duplicate-swap matching. A live Matches section follows the real tournament: near-real-time scores (openfootball structure + ESPN overlay with graceful fallback), group standings with best-third qualification, a two-sided knockout bracket that advances winners through penalties, and tappable match pages with lineups drawn on a pitch by formation, goal and assist badges, team stats and live play-by-play commentary.",
    categories: ["web", "infra"],
    featured: false,
    tech: ["React", "TypeScript", "Vite", "Tailwind", "Express", "PostgreSQL", "ESPN API", "OAuth 2.0", "TOTP 2FA", "Docker"],
    live: "https://fifa.paisbru.com",
    status: "live",
  },
  {
    id: "maketabs",
    title: "MakeTabs",
    description:
      "Turn any Spotify track into guitar tabs and 16-bit chiptunes. Songsterr-first pipeline pulls official human-transcribed tabs, with an ML fallback (Demucs + basic-pitch) for songs it doesn't have. The chiptune engine quantizes the transcription onto a beat grid and rebuilds it as melody / harmony / bass voices — with opt-in solo and drum channels — played on a Web Audio synth; a dual on-page player A/Bs the in-browser oscillator mix against a FluidSynth backend render. Wrapped in a backstage amp-rig design system with a browsable tab and 16-bit library, filters and personal folders.",
    categories: ["web", "infra"],
    featured: false,
    tech: ["Python", "FastAPI", "React", "TypeScript", "Songsterr API", "FluidSynth", "Demucs", "basic-pitch", "Web Audio API", "PostgreSQL"],
    github: "https://github.com/andresfelta95/MakeTabs",
    live: "https://tabs.paisbru.com",
    status: "live",
  },
  {
    id: "libro",
    title: "Libro — Household Finance & Debt Planner",
    description:
      "Self-hosted spending tracker and debt payoff planner for one household. Imports CSV/OFX/QFX bank statements with per-account column mapping and hash-based dedupe (re-importing overlapping statements never duplicates, and every import can be undone), then auto-categorizes with a rules engine plus an optional Claude pass for the long tail. The core is a pure-TypeScript, unit-tested debt engine: monthly compounding, statement-style minimums, avalanche / snowball / custom orderings, payment rollover and lump sums — the dashboard counts down to the debt-free date. Spending analytics surface trends, merchants and a recurring-charge radar, and route the monthly surplus into the payoff plan. Money is integer cents everywhere. Design language: a modernized cheque register.",
    categories: ["web", "infra"],
    featured: false,
    tech: ["Next.js 14", "TypeScript", "PostgreSQL", "Tailwind", "Anthropic SDK", "Cloudflare Access", "Docker"],
    status: "live",
    privateNote: "private — financial data, behind Cloudflare Access",
  },
  {
    id: "retro-creator",
    title: "Retro Creator",
    description:
      "Desktop AI sidekick for pixel-art workflows. Electron app with tools backed by Claude (palette gen, sprite critique with vision, tileset planner with autotiling rules, animation brief, concept generator) plus per-project reference libraries and a re-runnable call history. Self-hosted ComfyUI container runs SDXL Turbo + a pixel-art LoRA on a local GPU, with img2img reference for character consistency. API keys encrypted with safeStorage (AES-GCM fallback for headless environments).",
    categories: ["desktop", "infra"],
    featured: false,
    tech: ["Electron", "React", "TypeScript", "Vite", "Anthropic SDK", "ComfyUI", "SDXL Turbo", "sharp", "Tailwind"],
    github: "https://github.com/andresfelta95/retro-creator",
    status: "in-dev",
  },
  {
    id: "grove-guide",
    title: "Grove Guide",
    description:
      "A curated local guide to the businesses of Spruce Grove and the tri-region: original photography and written profiles on top of a complete directory, with local deals. API-first — every read goes through a versioned data/meta envelope, so the planned Expo app is a client rather than a rewrite. Postgres full-text search with trigram typo tolerance, business pages statically rendered with hourly ISR behind Cloudflare because the whole thing runs on a residential uplink, and a database CHECK constraint that makes it impossible to publish a story without a signed photo release.",
    categories: ["web", "infra"],
    featured: false,
    tech: ["Next.js 15", "React 19", "TypeScript", "Drizzle", "PostgreSQL FTS", "Tailwind v4", "Cloudflare R2", "Docker"],
    status: "in-dev",
  },
  {
    id: "greenday-game",
    title: "GREEN DAY: Boulevard of Broken Pixels",
    description:
      "16-bit side-scrolling tribute platformer in Godot 4. Each level is a Green Day song with chiptune backing generated live by MakeTabs. Art direction: Scott Pilgrim-inspired pixel art. Game design document complete, asset pipeline being built in Retro Creator.",
    categories: ["game"],
    featured: false,
    tech: ["Godot 4", "GDScript", "Pixel Art", "Aseprite", "MakeTabs"],
    github: "https://github.com/andresfelta95/greenday-game",
    image: "/pixel/greenday-stage.jpg",
    status: "pre-production",
  },
  {
    id: "amd-tracker",
    title: "AMD Price Tracker CA",
    description:
      "Tracks Canadian CAD prices on AMD CPUs and GPUs across retailers — Newegg and Canada Computers via axios/cheerio, and Amazon.ca through a Playwright stealth microservice. Full price history in PostgreSQL, interactive charts, GPU AIB variants and a price-alert system, refreshed on a schedule. Presented as a silicon telemetry console.",
    categories: ["web", "infra"],
    featured: false,
    tech: ["Next.js 14", "TypeScript", "PostgreSQL", "Docker", "Playwright", "Web Scraping", "Tailwind CSS"],
    github: "https://github.com/andresfelta95/amd-price-tracker",
    live: "https://amd.paisbru.com",
    status: "live",
  },
  {
    id: "computer-nanny",
    title: "ComputerUseNanny",
    description:
      "Custom PCB built around ATmega328p. A VL53L1X laser distance sensor detects proximity, driving an 8-LED strip and a 128×32 OLED display to give visual feedback about computer usage time.",
    categories: ["hardware"],
    featured: false,
    tech: ["ATmega328p", "C", "PCB Design", "VL53L1X", "OLED Display", "LED Strip"],
    github: "https://github.com/andresfelta95/ComputerUseNanny",
  },
  {
    id: "pokedex",
    title: "MyPokeDex",
    description:
      "Mobile Pokédex app built with React Native. Fetches Pokémon data from PokéAPI and presents it with a clean browsable interface.",
    categories: ["mobile"],
    featured: false,
    tech: ["React Native", "JavaScript", "PokéAPI", "Expo"],
    github: "https://github.com/andresfelta95/MyPokeDex",
  },
  {
    id: "shop-admin",
    title: "Shop Admin Dashboard",
    description:
      "Admin dashboard for managing an e-commerce platform. Allows updating product information through a clean Next.js interface.",
    categories: ["web"],
    featured: false,
    tech: ["Next.js", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/andresfelta95/Next-App-Shop-Admin",
  },
  {
    id: "server-infra",
    title: "Personal Server Infrastructure",
    description:
      "Full self-hosted stack on WSL2/Docker running 24/7 behind paisbru.com: nginx, PostgreSQL, MongoDB, MySQL, Redis, a Cloudflare Tunnel with no open host ports, Cloudflare Access on anything private, Uptime Kuma monitoring, Portainer and Adminer. Nineteen containers serving this portfolio, Workbench, MakeTabs, the AMD tracker, FIFA Tracker and its API, Libro, Grove Guide, a Playwright stealth scraper and a GPU-backed ComfyUI box — plus nightly pg_dumpall backups that keep the last good dump when a new one fails.",
    categories: ["infra"],
    featured: false,
    tech: ["Docker", "Docker Compose", "nginx", "PostgreSQL", "Cloudflare Tunnel", "Cloudflare Access", "Uptime Kuma", "WSL2"],
    github: "https://github.com/andresfelta95",
    status: "live",
  },
];
