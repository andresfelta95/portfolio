export default function Navbar() {
  const links = [
    { href: "#live", label: "live" },
    { href: "#projects", label: "projects" },
    { href: "#contact", label: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-bg/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between text-sm">
        <span className="text-txt">
          <span className="text-term">andres</span>
          <span className="text-muted">@paisbru</span>
          <span className="text-muted">:~$</span>
        </span>
        <div className="flex items-center gap-5 text-muted">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden sm:inline hover:text-term transition-colors"
            >
              <span className="text-term/50">cd </span>
              {l.label}/
            </a>
          ))}
          <a
            href="https://github.com/andresfelta95"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line px-3 py-1.5 text-txt hover:border-term hover:text-term transition-colors"
          >
            git remote →
          </a>
        </div>
      </div>
    </nav>
  );
}
