import { Github } from "lucide-react";

const arch = [
  { label: "Dartboard", sub: "Physical board", color: "#f97316" },
  { label: "ESP32", sub: "Ultrasonic + Multiplexer", color: "#f97316" },
  { label: "Python Bridge", sub: "Serial → DB", color: "#eab308" },
  { label: "Database", sub: "Dart positions", color: "#3b82f6" },
  { label: "React Native", sub: "Live scores", color: "#a855f7" },
];

export default function FeaturedProject() {
  return (
    <section className="py-20 px-6 bg-[#0a0e14] border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <p className="text-base font-pixel text-gray-600 tracking-[0.3em] uppercase mb-2">
          {"// "}FEATURED PROJECT
        </p>
        <h2 className="text-3xl font-bold text-white mb-3">
          Interactive Dartboard System
        </h2>
        <p className="text-gray-400 max-w-2xl mb-10 leading-relaxed">
          End-to-end system connecting physical hardware to a mobile app. Darts are detected by
          ultrasonic sensors on an ESP32 with a multiplexer, scores are processed by a Python
          bridge, stored in a database, and displayed live on a React Native app.
        </p>

        {/* Architecture diagram */}
        <div className="bg-[#080c10] border border-white/5 rounded-xl p-6 md:p-8 mb-8 overflow-x-auto">
          <p className="text-sm font-pixel text-gray-700 mb-6 uppercase tracking-[0.3em]">
            &gt; system architecture
          </p>
          <div className="flex items-center gap-0 min-w-max">
            {arch.map((step, i) => (
              <div key={i} className="flex items-center">
                <div
                  className="rounded-xl px-4 py-3 text-center min-w-[136px] border"
                  style={{
                    borderColor: `${step.color}30`,
                    backgroundColor: `${step.color}0a`,
                  }}
                >
                  <p className="text-sm font-semibold" style={{ color: step.color }}>
                    {step.label}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{step.sub}</p>
                </div>
                {i < arch.length - 1 && (
                  <div className="flex items-center px-2 text-gray-700">
                    <div className="w-6 h-px bg-white/10" />
                    <span className="text-sm ml-0.5">›</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            "ESP32",
            "Python",
            "MicroPython",
            "Ultrasonic Sensors",
            "Multiplexer",
            "React Native",
            "JavaScript",
            "SQLite",
          ].map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-400"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/andresfelta95/Point-Detector"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-lg transition-colors"
          >
            <Github size={14} /> Hardware — ESP32
          </a>
          <a
            href="https://github.com/andresfelta95/InteractiveDartBoard_MobileApp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-lg transition-colors"
          >
            <Github size={14} /> Mobile App — React Native
          </a>
        </div>
      </div>
    </section>
  );
}
