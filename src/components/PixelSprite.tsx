import type { Sprite } from "@/lib/sprites";

interface Props {
  sprite: Sprite;
  /** Accessible name. Omit for purely decorative art. */
  label?: string;
  className?: string;
}

/**
 * Renders a character-grid sprite as SVG.
 *
 * Runs of identical pixels collapse into one <rect>, which keeps a 16×16
 * sprite down to a few dozen nodes instead of 256, and `crispEdges` stops the
 * renderer antialiasing the pixel boundaries at large scales. Sizing is the
 * caller's job (`className="w-8 h-8"`) — the viewBox does the rest.
 */
export default function PixelSprite({ sprite, label, className }: Props) {
  const rects: React.ReactNode[] = [];

  sprite.rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let run = 1;
      while (x + run < row.length && row[x + run] === ch) run++;
      if (ch !== ".") {
        rects.push(
          <rect key={`${y}-${x}`} x={x} y={y} width={run} height={1} fill={sprite.palette[ch]} />
        );
      }
      x += run;
    }
  });

  return (
    <svg
      viewBox={`0 0 ${sprite.w} ${sprite.h}`}
      className={className}
      shapeRendering="crispEdges"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {rects}
    </svg>
  );
}
