import { Github, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 border-t border-line">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-muted mb-4">
          <span className="text-term">$</span> ./contact.sh
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-txt mb-4 tracking-tight">
          let&apos;s connect
          <span className="cursor" aria-hidden />
        </h2>
        <p className="text-muted mb-10 max-w-md mx-auto text-sm">
          open to opportunities, collaborations, and interesting projects.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <a
            href="mailto:andresfelta95@gmail.com"
            className="flex items-center gap-2 bg-panel border border-line hover:border-term hover:text-term text-muted px-5 py-2.5 transition-colors"
          >
            <Mail size={16} /> andresfelta95@gmail.com
          </a>
          <a
            href="https://github.com/andresfelta95"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-panel border border-line hover:border-term hover:text-term text-muted px-5 py-2.5 transition-colors"
          >
            <Github size={16} /> andresfelta95
          </a>
        </div>
        <p className="text-muted text-xs mt-16">
          <span className="text-term"># </span>
          hosted on paisbru.com · self-hosted · docker + cloudflare tunnel
        </p>
      </div>
    </section>
  );
}
