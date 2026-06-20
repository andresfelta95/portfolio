import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Single monospace family for the whole site — the terminal/brutalist concept.
const jetbrains = JetBrains_Mono({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "andres_tangarife — developer",
  description:
    "Full-stack developer building from embedded hardware to cloud infrastructure. ESP32, React Native, Next.js, Docker, and AI-powered pixel-art tooling.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className="bg-bg text-txt font-mono antialiased relative">
        {/* Faint CRT scanlines — barely-there terminal texture, not gloss. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[1] opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(74,222,128,0.7) 2px, rgba(74,222,128,0.7) 3px)",
          }}
        />
        <div className="relative z-[2]">{children}</div>
      </body>
    </html>
  );
}
