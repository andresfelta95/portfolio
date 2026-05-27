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
        accent: "#00d4ff",
      },
      fontFamily: {
        // VT323 — readable retro terminal feel; used for eyebrows and stat pills.
        pixel: ["var(--font-vt323)", "ui-monospace", "monospace"],
        // Press Start 2P — chunky NES-style; used very sparingly (section headers / hover labels).
        press: ["var(--font-press-start)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
