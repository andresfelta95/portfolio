import { Github, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-4">
          Contact
        </p>
        <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s connect</h2>
        <p className="text-gray-400 mb-10 max-w-md mx-auto">
          Open to opportunities, collaborations, and interesting projects.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:andresfelta95@gmail.com"
            className="flex items-center gap-2 bg-[#0f1419] border border-white/5 hover:border-[#00d4ff]/30 hover:text-[#00d4ff] text-gray-300 px-6 py-3 rounded-xl transition-colors"
          >
            <Mail size={16} /> andresfelta95@gmail.com
          </a>
          <a
            href="https://github.com/andresfelta95"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0f1419] border border-white/5 hover:border-[#00d4ff]/30 hover:text-[#00d4ff] text-gray-300 px-6 py-3 rounded-xl transition-colors"
          >
            <Github size={16} /> andresfelta95
          </a>
        </div>
        <p className="text-gray-400 text-xs font-mono mt-16">
          Hosted on paisbru.com · Self-hosted · Docker + Cloudflare Tunnel
        </p>
      </div>
    </section>
  );
}
