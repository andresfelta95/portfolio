import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: "#0f1419",
        "layer-hardware": "#f97316",
        "layer-mobile": "#a855f7",
        "layer-web": "#3b82f6",
        "layer-infra": "#22c55e",
        "layer-desktop": "#eab308",
        "layer-game": "#ec4899",
        accent: {
          DEFAULT: "#00d4ff",
          soft: "#00d4ff1a",
        },
      },
      fontFamily: {
        // Sora — geometric, technical body/UI face; the default everywhere.
        sans: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
        // VT323 — readable retro terminal feel; used for eyebrows and stat pills.
        pixel: ["var(--font-vt323)", "ui-monospace", "monospace"],
        // Press Start 2P — chunky NES-style; used very sparingly (section headers / hover labels).
        press: ["var(--font-press-start)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        // Consistent elevation scale — layered, low-opacity shadows read far
        // better than a single harsh one on the near-black surface.
        card: "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -12px rgba(0,0,0,0.7)",
        "card-hover":
          "0 1px 2px rgba(0,0,0,0.4), 0 16px 40px -16px rgba(0,0,0,0.8)",
        glow: "0 0 0 1px rgba(0,212,255,0.25), 0 12px 32px -12px rgba(0,212,255,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
