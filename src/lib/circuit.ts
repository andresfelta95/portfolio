/**
 * PCB trace geometry.
 *
 * Everything here is pure and seeded, so the server and the client generate
 * byte-identical paths and React never reports a hydration mismatch. Routing
 * follows the two rules real board layout follows: segments are axis-aligned,
 * and corners are cut at 45° rather than turned square.
 */

export interface Pt {
  x: number;
  y: number;
}

export interface Trace {
  /** SVG path data. */
  d: string;
  /** Measured length, so a travelling dash can cross it exactly once. */
  len: number;
  /** Corners worth marking with a via. */
  vias: Pt[];
}

/** mulberry32 — small, fast, good enough for layout jitter. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const dist = (a: Pt, b: Pt) => Math.hypot(b.x - a.x, b.y - a.y);

/**
 * Turns an orthogonal corner list into a path whose corners are chamfered at
 * 45°, and measures it. The chamfer is clipped to half of each adjoining
 * segment so short segments degrade gracefully instead of overshooting.
 */
function chamfer(corners: Pt[], cut: number): { d: string; len: number } {
  const pts: Pt[] = [corners[0]];

  for (let i = 1; i < corners.length - 1; i++) {
    const prev = corners[i - 1];
    const here = corners[i];
    const next = corners[i + 1];
    const inLen = dist(prev, here);
    const outLen = dist(here, next);
    // A zero-length segment means two corners coincide — there is no angle to
    // cut, so keep the corner as-is rather than dividing by zero.
    const c = inLen === 0 || outLen === 0 ? 0 : Math.min(cut, inLen / 2, outLen / 2);
    if (c <= 0.5) {
      pts.push(here);
      continue;
    }
    pts.push({
      x: here.x - ((here.x - prev.x) / inLen) * c,
      y: here.y - ((here.y - prev.y) / inLen) * c,
    });
    pts.push({
      x: here.x + ((next.x - here.x) / outLen) * c,
      y: here.y + ((next.y - here.y) / outLen) * c,
    });
  }
  pts.push(corners[corners.length - 1]);

  let len = 0;
  for (let i = 1; i < pts.length; i++) len += dist(pts[i - 1], pts[i]);

  const d =
    `M ${pts[0].x} ${pts[0].y} ` +
    pts
      .slice(1)
      .map((p) => `L ${p.x} ${p.y}`)
      .join(" ");

  return { d, len };
}

/**
 * A field of traces routed left to right across the canvas — the background
 * texture. Traces start off the left edge and run past the right one so no
 * path visibly begins or ends inside the frame.
 */
export function traceField(opts: {
  seed: number;
  count: number;
  w: number;
  h: number;
  grid?: number;
}): Trace[] {
  const { seed, count, w, h } = opts;
  const grid = opts.grid ?? 16;
  const rand = rng(seed);
  const snap = (v: number) => Math.round(v / grid) * grid;
  const traces: Trace[] = [];

  for (let i = 0; i < count; i++) {
    // Spread the starting rows over the full height, then jitter.
    const startY = snap(((i + 0.5) / count) * h + (rand() - 0.5) * grid * 4);
    const corners: Pt[] = [{ x: -grid * 2, y: startY }];
    let { x, y } = corners[0];
    let horizontal = true;

    for (let step = 0; step < 16 && x < w + grid * 2; step++) {
      if (horizontal) {
        x = snap(x + grid * (2 + Math.floor(rand() * 6)));
      } else {
        const dir = rand() < 0.5 ? -1 : 1;
        y = snap(y + dir * grid * (1 + Math.floor(rand() * 4)));
        y = Math.max(grid, Math.min(h - grid, y));
      }
      corners.push({ x, y });
      horizontal = !horizontal;
    }
    // Always leave through the right edge.
    corners.push({ x: w + grid * 3, y });

    const { d, len } = chamfer(corners, grid);
    const vias = corners.filter((_, idx) => idx > 0 && idx % 3 === 0 && idx < corners.length - 1);
    traces.push({ d, len, vias });
  }

  return traces;
}

/**
 * Traces running from the edges of a square canvas into a single point — the
 * hero's board, where every layer of the stack terminates at one chip.
 */
export function traceConverge(opts: {
  seed: number;
  count: number;
  size: number;
  /** Half-width of the chip pad the traces stop at. */
  pad: number;
  grid?: number;
}): Trace[] {
  const { seed, count, size, pad } = opts;
  const grid = opts.grid ?? 12;
  const rand = rng(seed);
  const snap = (v: number) => Math.round(v / grid) * grid;
  const c = size / 2;
  const traces: Trace[] = [];

  for (let i = 0; i < count; i++) {
    const side = i % 4;
    // Offset each trace off the centre lines so none of them overlap, and keep
    // it clear of the centre itself — a trace entering dead-on has no corner.
    let spread = snap((0.18 + rand() * 0.6) * size);
    if (Math.abs(spread - c) < grid) spread = c - grid * 2;
    const dogleg = snap(pad + grid * (2 + Math.floor(rand() * 5)));
    let corners: Pt[];

    switch (side) {
      case 0: // from the left
        corners = [
          { x: -grid, y: spread },
          { x: c - dogleg, y: spread },
          { x: c - dogleg, y: c },
          { x: c - pad, y: c },
        ];
        break;
      case 1: // from the right
        corners = [
          { x: size + grid, y: spread },
          { x: c + dogleg, y: spread },
          { x: c + dogleg, y: c },
          { x: c + pad, y: c },
        ];
        break;
      case 2: // from the top
        corners = [
          { x: spread, y: -grid },
          { x: spread, y: c - dogleg },
          { x: c, y: c - dogleg },
          { x: c, y: c - pad },
        ];
        break;
      default: // from the bottom
        corners = [
          { x: spread, y: size + grid },
          { x: spread, y: c + dogleg },
          { x: c, y: c + dogleg },
          { x: c, y: c + pad },
        ];
        break;
    }

    const { d, len } = chamfer(corners, grid);
    traces.push({ d, len, vias: [corners[1]] });
  }

  return traces;
}
