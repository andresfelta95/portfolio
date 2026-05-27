import type { Metadata } from "next";
import { VT323, Press_Start_2P } from "next/font/google";
import "./globals.css";

// CSS variable consumed via Tailwind's `font-pixel` and `font-press` utilities.
const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vt323",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: "Andrés Tangarife — Developer",
  description:
    "Full-stack developer building from embedded hardware to cloud infrastructure. ESP32, React Native, Next.js, Docker, and AI-powered pixel-art tooling.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${vt323.variable} ${pressStart.variable}`}>
      <body className="bg-[#080c10] text-white antialiased relative">
        {/* CRT scanline overlay — full viewport, barely-there opacity. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[1] mix-blend-overlay opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(255,255,255,0.6) 2px, rgba(255,255,255,0.6) 3px)",
          }}
        />
        <div className="relative z-[2]">{children}</div>
      </body>
    </html>
  );
}
