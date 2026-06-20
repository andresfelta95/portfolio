import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Terminal canvas — near-black with a true neutral ramp.
        bg: "#0a0a0a",
        panel: "#0e0e0e",
        line: "#262626",
        txt: "#e4e4e4",
        muted: "#7a7a7a",
        // Phosphor-green accent (the prompt / cursor / links).
        term: "#4ade80",
        accent: "#4ade80",
        // Category coding for projects (kept for at-a-glance scanning).
        "layer-hardware": "#f97316",
        "layer-mobile": "#a855f7",
        "layer-web": "#3b82f6",
        "layer-infra": "#22c55e",
        "layer-desktop": "#eab308",
        "layer-game": "#ec4899",
      },
      fontFamily: {
        // Everything is monospace — brutalist/terminal honesty. JetBrains Mono
        // is the single family; hierarchy comes from weight + size + tracking.
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        // Brutalist: sharp by default. (Use `rounded-none` explicitly too.)
        DEFAULT: "0px",
        none: "0px",
      },
    },
  },
  plugins: [],
};

export default config;
