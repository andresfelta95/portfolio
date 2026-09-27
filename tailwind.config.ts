import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Board substrate — deep navy-black, the colour of an unlit PCB.
        bg: "#05060d",
        panel: "#0a0e1a",
        panel2: "#101728",
        line: "#1b2740",
        line2: "#2b3c5e",
        txt: "#dbe6f4",
        muted: "#8296b0",

        // Neon rail. Cyan is the signal, magenta the counter-signal,
        // phosphor green stays reserved for "this is live right now".
        cyan: "#22d3ee",
        magenta: "#ff2d95",
        term: "#4ade80",
        amber: "#fbbf24",
        violet: "#a78bfa",
        accent: "#22d3ee",

        // Category coding for projects (kept for at-a-glance scanning).
        "layer-hardware": "#fb923c",
        "layer-mobile": "#c084fc",
        "layer-web": "#38bdf8",
        "layer-infra": "#4ade80",
        "layer-desktop": "#fbbf24",
        "layer-game": "#ff2d95",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        // Display face — real 8-bit bitmap letterforms. Used sparingly and
        // never for running text; it is unreadable below ~10px.
        pixel: ["var(--font-press-start)", "monospace"],
        // Tall phosphor terminal face for labels and readouts.
        crt: ["var(--font-vt323)", "monospace"],
      },
      borderRadius: {
        // Brutalist/pixel: sharp by default, always.
        DEFAULT: "0px",
        none: "0px",
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(34,211,238,0.35), 0 0 22px -6px rgba(34,211,238,0.55)",
        "neon-magenta": "0 0 0 1px rgba(255,45,149,0.35), 0 0 22px -6px rgba(255,45,149,0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
