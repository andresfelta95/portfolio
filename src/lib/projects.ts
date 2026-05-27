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
    id: "maketabs",
    title: "MakeTabs",
    description:
      "Generate guitar tabs from any Spotify track. Songsterr-first pipeline pulls official human-transcribed tabs, FluidSynth synthesizes a multi-track WAV from the MIDI, and a dual on-page player lets you A/B between an in-browser oscillator mix and the backend render. Falls back to an ML pipeline (Demucs + basic-pitch) for songs Songsterr doesn't have.",
    categories: ["web", "infra"],
    featured: false,
    tech: ["Python", "FastAPI", "React", "TypeScript", "Songsterr API", "FluidSynth", "Demucs", "basic-pitch", "Web Audio API", "PostgreSQL"],
    github: "https://github.com/andresfelta95/MakeTabs",
    live: "https://tabs.paisbru.com",
    status: "live",
  },
  {
    id: "retro-creator",
    title: "Retro Creator",
    description:
      "Desktop AI sidekick for pixel-art workflows. Electron app with five tools backed by Claude (palette gen, sprite critique with vision, tileset planner with autotiling rules, animation brief, concept generator) and a self-hosted ComfyUI container running SDXL Turbo + pixel-art LoRA on a local GPU. API keys encrypted with safeStorage (with an AES-GCM fallback for headless environments).",
    categories: ["desktop", "infra"],
    featured: false,
    tech: ["Electron", "React", "TypeScript", "Vite", "Anthropic SDK", "ComfyUI", "SDXL Turbo", "sharp", "Tailwind"],
    github: "https://github.com/andresfelta95/retro-creator",
    status: "in-dev",
  },
  {
    id: "greenday-game",
    title: "GREEN DAY: Boulevard of Broken Pixels",
    description:
      "16-bit side-scrolling tribute platformer in Godot 4. Each level is a Green Day song with chiptune backing generated live by MakeTabs. Art direction: chibi punk, Scott Pilgrim style. Game design document complete, asset pipeline being built in Retro Creator.",
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
      "Tracks Canadian CAD prices on AMD CPUs and GPUs across retailers. Web scraping with axios/cheerio, full price history in PostgreSQL, interactive charts, and a price alert system.",
    categories: ["web", "infra"],
    featured: false,
    tech: ["Next.js 14", "TypeScript", "PostgreSQL", "Docker", "Web Scraping", "Tailwind CSS"],
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
      "Full self-hosted stack on WSL2/Docker: nginx reverse proxy, PostgreSQL, MongoDB, Redis, Cloudflare Tunnel, Uptime Kuma monitoring, and multiple apps running 24/7 at paisbru.com.",
    categories: ["infra"],
    featured: false,
    tech: ["Docker", "Docker Compose", "nginx", "PostgreSQL", "Cloudflare Tunnel", "WSL2"],
    github: "https://github.com/andresfelta95",
  },
];
