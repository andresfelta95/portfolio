import PixelSprite from "./PixelSprite";
import type { Sprite } from "@/lib/sprites";

/* Small shared primitives. Everything here is a server component. */

/**
 * A module on the board: hairline frame, cyan corner brackets, and an optional
 * command line as its header — the visual unit the whole page is built from.
 */
export function Panel({
  cmd,
  meta,
  children,
  className = "",
  accent = "#22d3ee",
}: {
  cmd?: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <div className={`relative border border-line bg-panel/80 ${className}`}>
      <span
        aria-hidden
        className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l"
        style={{ borderColor: accent }}
      />
      <span
        aria-hidden
        className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r"
        style={{ borderColor: accent }}
      />
      {cmd && (
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2 text-xs text-muted">
          <span className="truncate">
            <span style={{ color: accent }}>$</span> {cmd}
          </span>
          {meta}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * Section header: the shell command that "produced" the section, the heading in
 * bitmap type, and a sprite that gives the section a face.
 */
export function SectionHeading({
  cmd,
  title,
  sprite,
  accent = "#22d3ee",
  children,
}: {
  cmd: string;
  title: string;
  sprite?: Sprite;
  accent?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <p className="text-xs sm:text-sm text-muted mb-3">
        <span style={{ color: accent }}>$</span> {cmd}
      </p>
      <div className="flex items-center gap-3 sm:gap-4">
        {sprite && (
          <PixelSprite sprite={sprite} className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 pixel-bob" />
        )}
        <h2 className="font-pixel text-base sm:text-xl text-txt neon-cyan leading-tight">{title}</h2>
      </div>
      {children && (
        <p className="text-muted text-sm mt-4 max-w-2xl leading-relaxed">{children}</p>
      )}
    </div>
  );
}

/** Ruled break between sections: a bus line with a run of pixel blocks on it. */
export function PixelDivider({ accent = "#22d3ee" }: { accent?: string }) {
  const blocks = [3, 2, 4, 1, 2, 3, 1, 5, 2, 1];
  return (
    <div aria-hidden className="relative h-px bg-line">
      <div className="absolute left-1/2 -translate-x-1/2 -top-1 flex items-end gap-1">
        {blocks.map((b, i) => (
          <span
            key={i}
            className="w-1"
            style={{
              height: `${b}px`,
              backgroundColor: accent,
              opacity: 0.25 + (b / 5) * 0.55,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Power LED. `pulse` marks something that is genuinely live. */
export function Led({ color = "#4ade80", pulse = true }: { color?: string; pulse?: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-block w-2 h-2 shrink-0 ${pulse ? "led" : ""}`}
      style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
    />
  );
}

/** A tech chip. Reads as a labelled component on the board. */
export function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="text-[10px] sm:text-xs px-1.5 py-0.5 border text-muted"
      style={color ? { color, borderColor: `${color}55` } : { borderColor: "#1b2740" }}
    >
      {children}
    </span>
  );
}
