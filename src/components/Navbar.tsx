export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#080c10]/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-pixel text-[#00d4ff] text-lg tracking-wider">
          andresfelta95<span className="animate-pulse text-[#00d4ff]/70">_</span>
        </span>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href="#live" className="hover:text-white transition-colors hidden sm:block">
            Live
          </a>
          <a href="#projects" className="hover:text-white transition-colors hidden sm:block">
            Projects
          </a>
          <a href="#contact" className="hover:text-white transition-colors hidden sm:block">
            Contact
          </a>
          <a
            href="https://github.com/andresfelta95"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/10 hover:border-[#00d4ff]/50 hover:text-[#00d4ff] px-3 py-1.5 rounded-md transition-colors"
          >
            GitHub →
          </a>
        </div>
      </div>
    </nav>
  );
}
