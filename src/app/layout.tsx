import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

// Body + UI. Monospace everywhere keeps the terminal conceit honest.
const jetbrains = JetBrains_Mono({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

// Display only. Real 8-bit bitmap letterforms — headings, never paragraphs.
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start",
});

// Tall phosphor face for readouts and silkscreen labels.
const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "andres_tangarife — developer",
  description:
    "Full-stack developer building from embedded hardware to cloud infrastructure. ESP32, Angular, React Native, Next.js, Docker, and AI-powered pixel-art tooling. Self-hosted at paisbru.com.",
};

export const viewport: Viewport = {
  themeColor: "#05060d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${pressStart.variable} ${vt323.variable}`}
    >
      <body className="bg-bg text-txt font-mono antialiased relative">
        {/* ── CRT stack. Three fixed layers, none of them interactive. ── */}

        {/* Scanlines: the tube's raster, at the threshold of visibility. */}
        <div
          aria-hidden
          className="flicker pointer-events-none fixed inset-0 z-[3]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0 1px, transparent 1px 3px)",
            opacity: 0.5,
          }}
        />
        {/* One bright bar sweeping the screen, slowly. */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[3] overflow-hidden">
          <div
            className="scanbar absolute left-0 right-0 h-32 opacity-[0.045]"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(34,211,238,0.9), transparent)",
            }}
          />
        </div>
        {/* Vignette: the glass falls off at the corners. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[3]"
          style={{
            background:
              "radial-gradient(ellipse 120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <div className="relative z-[2]">{children}</div>
      </body>
    </html>
  );
}
