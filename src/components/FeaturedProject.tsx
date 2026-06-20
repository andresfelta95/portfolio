import { Github } from "lucide-react";

const arch = [
  { label: "Dartboard", sub: "physical board", color: "#f97316" },
  { label: "ESP32", sub: "ultrasonic + mux", color: "#f97316" },
  { label: "Python Bridge", sub: "serial → db", color: "#eab308" },
  { label: "Database", sub: "dart positions", color: "#3b82f6" },
  { label: "React Native", sub: "live scores", color: "#a855f7" },
];

export default function FeaturedProject() {
  return (
    <section className="py-20 px-6 border-t border-line bg-panel/40">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-muted mb-3">
          <span className="text-term">$</span> cat featured/README.md
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-txt mb-3 tracking-tight">
          Interactive Dartboard System
        </h2>
        <p className="text-muted max-w-2xl mb-10 leading-relaxed text-sm">
          End-to-end system connecting physical hardware to a mobile app. Darts are
          detected by ultrasonic sensors on an ESP32 with a multiplexer, scores are
          processed by a Python bridge, stored in a database, and displayed live on a
          React Native app.
        </p>

        {/* Architecture pipeline */}
        <div className="border border-line bg-bg mb-8 overflow-x-auto">
          <div className="border-b border-line px-4 py-2 text-xs text-muted">
            <span className="text-term">$</span> ./pipeline --trace
          </div>
          <div className="flex items-center gap-0 min-w-max p-6">
            {arch.map((step, i) => (
              <div key={i} className="flex items-center">
                <div
                  className="border px-4 py-3 text-center min-w-[140px]"
                  style={{ borderColor: `${step.color}55`, backgroundColor: `${step.color}0d` }}
                >
                  <p className="text-sm font-semibold" style={{ color: step.color }}>
                    {step.label}
                  </p>
                  <p className="text-xs text-muted mt-1">{step.sub}</p>
                </div>
                {i < arch.length - 1 && (
                  <div className="flex items-center px-2 text-muted">
                    <span className="text-term">──▶</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            "ESP32", "Python", "MicroPython", "Ultrasonic Sensors",
            "Multiplexer", "React Native", "JavaScript", "SQLite",
          ].map((t) => (
            <span key={t} className="text-xs px-2 py-1 border border-line text-muted">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href="https://github.com/andresfelta95/Point-Detector"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted border border-line px-4 py-2 hover:border-term hover:text-term transition-colors"
          >
            <Github size={14} /> hardware — esp32
          </a>
          <a
            href="https://github.com/andresfelta95/InteractiveDartBoard_MobileApp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted border border-line px-4 py-2 hover:border-term hover:text-term transition-colors"
          >
            <Github size={14} /> mobile app — react native
          </a>
        </div>
      </div>
    </section>
  );
}
