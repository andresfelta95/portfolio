/**
 * Hand-drawn pixel art, stored as character grids.
 *
 * Every sprite is authored on a 16×16 grid — the size an NES-era icon would
 * have been — and rendered to SVG rects by <PixelSprite>, so it stays crisp at
 * any scale and ships as markup rather than as a PNG. `.` is transparent;
 * every other character indexes into the sprite's own palette.
 *
 * Rows must all be the same length as `w`. `assertSprites()` at the bottom
 * checks that in development so a mis-typed row fails loudly instead of
 * silently drawing a hole.
 */
export interface Sprite {
  w: number;
  h: number;
  palette: Record<string, string>;
  rows: string[];
}

/** QFP microcontroller — gold pins, cyan die. The hardware layer. */
const chip: Sprite = {
  w: 16,
  h: 16,
  palette: {
    d: "#0d2033", // package edge
    b: "#1e3a52", // package
    g: "#f5b942", // pins
    c: "#22d3ee", // die
    m: "#ff2d95", // orientation dot
  },
  rows: [
    "....g.g..g.g....",
    "....g.g..g.g....",
    "....g.g..g.g....",
    "...dddddddddd...",
    "gggdmbbbbbbbdggg",
    "...dbccccccbd...",
    "gggdbccccccbdggg",
    "...dbccccccbd...",
    "...dbccccccbd...",
    "gggdbccccccbdggg",
    "...dbccccccbd...",
    "gggdbbbbbbbbdggg",
    "...dddddddddd...",
    "....g.g..g.g....",
    "....g.g..g.g....",
    "....g.g..g.g....",
  ],
};

/** Handset with a live screen. The mobile layer. */
const phone: Sprite = {
  w: 16,
  h: 16,
  palette: {
    f: "#c084fc", // frame
    s: "#170e2e", // screen
    c: "#22d3ee", // header bar
    l: "#a78bfa", // content lines
    w: "#f5f3ff", // speaker / button
  },
  rows: [
    "....ffffffff....",
    "....fffwwfff....",
    "....fssssssf....",
    "....fsccccsf....",
    "....fssssssf....",
    "....fsllllsf....",
    "....fsllllsf....",
    "....fssssssf....",
    "....fsccccsf....",
    "....fssssssf....",
    "....fsllllsf....",
    "....fssssssf....",
    "....fssssssf....",
    "....ffffffff....",
    "....fffwwfff....",
    "....ffffffff....",
  ],
};

/** Browser chrome over a wall of text. The web layer. */
const browser: Sprite = {
  w: 16,
  h: 16,
  palette: {
    f: "#1e40af", // chrome
    b: "#38bdf8", // title bar
    w: "#dbe6f4", // window dots + copy
    s: "#080f1e", // viewport
    c: "#22d3ee", // headings
  },
  rows: [
    "................",
    "ffffffffffffffff",
    "fbwbwbwbbbbbbbbf",
    "ffffffffffffffff",
    "fssssssssssssssf",
    "fcccccccccsssssf",
    "fssssssssssssssf",
    "fwwwwwwwwwwssssf",
    "fwwwwwwwsssssssf",
    "fssssssssssssssf",
    "fcccccccccccsssf",
    "fwwwwwwwwwwwwssf",
    "fssssssssssssssf",
    "fssssssssssssssf",
    "ffffffffffffffff",
    "................",
  ],
};

/** Four-unit rack, one green and one amber LED per unit. The infra layer. */
const server: Sprite = {
  w: 16,
  h: 16,
  palette: {
    e: "#1b5e3a", // chassis
    d: "#0a1f14", // face
    s: "#123524", // vents
    g: "#4ade80", // power LED
    a: "#fbbf24", // activity LED
  },
  rows: [
    "................",
    "..eeeeeeeeeeee..",
    "..egadssssssde..",
    "..eddssssssdde..",
    "..eeeeeeeeeeee..",
    "..egadssssssde..",
    "..eddssssssdde..",
    "..eeeeeeeeeeee..",
    "..egadssssssde..",
    "..eddssssssdde..",
    "..eeeeeeeeeeee..",
    "..egadssssssde..",
    "..eddssssssdde..",
    "..eeeeeeeeeeee..",
    "..e..........e..",
    "................",
  ],
};

/** CRT on a stand, mid-session. The desktop layer. */
const monitor: Sprite = {
  w: 16,
  h: 16,
  palette: {
    e: "#fbbf24", // bezel
    s: "#080f1e", // glass
    c: "#22d3ee", // prompt
    w: "#dbe6f4", // output
  },
  rows: [
    ".eeeeeeeeeeeeee.",
    ".esssssssssssse.",
    ".eccccccsssssse.",
    ".esssssssssssse.",
    ".ewwwwwwwwsssse.",
    ".ewwwwsssssssse.",
    ".esssssssssssse.",
    ".ecccccccccssse.",
    ".ewwwwwwsssssse.",
    ".esssssssssssse.",
    ".esssssssssssse.",
    ".eeeeeeeeeeeeee.",
    "......eeee......",
    "......eeee......",
    "....eeeeeeee....",
    "................",
  ],
};

/** D-pad, two face buttons, select/start. The game layer. */
const gamepad: Sprite = {
  w: 16,
  h: 16,
  palette: {
    e: "#9d174d", // shell edge
    b: "#ff2d95", // shell
    w: "#fce7f3", // d-pad
    c: "#22d3ee", // buttons
    d: "#4c0519", // select / start
  },
  rows: [
    "................",
    "................",
    ".eeeeeeeeeeeeee.",
    ".ebbbbbbbbbbbbe.",
    ".ebbbbbbbbbbbbe.",
    ".ebbwbbbbbbbbbe.",
    ".ebwwwbbbbcbcbe.",
    ".ebbwbbbbbbbbbe.",
    ".ebbbbbbbbbbbbe.",
    ".ebbbbddddbbbbe.",
    ".ebbbbbbbbbbbbe.",
    ".ebbbbbbbbbbbbe.",
    ".ebbbbbbbbbbbbe.",
    ".eeeeeeeeeeeeee.",
    "................",
    "................",
  ],
};

/** Square wave on a scope. Marks the live-telemetry section. */
const wave: Sprite = {
  w: 16,
  h: 16,
  palette: { g: "#4ade80" },
  rows: [
    "................",
    "................",
    "................",
    "..gggg....gggg..",
    "..g..g....g..g..",
    "..g..g....g..g..",
    "..g..g....g..g..",
    "..g..g....g..g..",
    "..g..g....g..g..",
    "..g..g....g..g..",
    "..g..g....g..g..",
    "ggg..gggggg..ggg",
    "................",
    "................",
    "................",
    "................",
  ],
};

/** Sealed envelope. Marks the contact section. */
const mail: Sprite = {
  w: 16,
  h: 16,
  palette: {
    c: "#22d3ee", // edge
    d: "#0d2033", // paper
    l: "#38bdf8", // flap crease
  },
  rows: [
    "................",
    "................",
    "................",
    "..cccccccccccc..",
    "..cllddddddllc..",
    "..cdllddddlldc..",
    "..cddllddllddc..",
    "..cdddlllldddc..",
    "..cddddddddddc..",
    "..cddddddddddc..",
    "..cddddddddddc..",
    "..cddddddddddc..",
    "..cccccccccccc..",
    "................",
    "................",
    "................",
  ],
};

/** Stacked discs. Marks anything database-shaped. */
const stack: Sprite = {
  w: 16,
  h: 16,
  palette: {
    e: "#22d3ee",
    d: "#0d2033",
    g: "#4ade80",
  },
  rows: [
    "................",
    "...eeeeeeeeee...",
    "..edddddddddde..",
    "..eddggddddgde..",
    "..edddddddddde..",
    "...eeeeeeeeee...",
    "..edddddddddde..",
    "..eddggddddgde..",
    "..edddddddddde..",
    "...eeeeeeeeee...",
    "..edddddddddde..",
    "..eddggddddgde..",
    "..edddddddddde..",
    "...eeeeeeeeee...",
    "................",
    "................",
  ],
};

/** Concentric target. Stands in for the physical dartboard. */
const target: Sprite = {
  w: 16,
  h: 16,
  palette: {
    w: "#f1e4c3", // cream board
    d: "#14100c", // black beds
    r: "#dc2626", // red beds
    g: "#16a34a", // outer bull
  },
  rows: [
    "................",
    ".wwwwwwwwwwwwww.",
    ".wddddddddddddw.",
    ".wdwwwwwwwwwwdw.",
    ".wdwrrrrrrrrwdw.",
    ".wdwrddddddrwdw.",
    ".wdwrdwwwwdrwdw.",
    ".wdwrdwggwdrwdw.",
    ".wdwrdwggwdrwdw.",
    ".wdwrdwwwwdrwdw.",
    ".wdwrddddddrwdw.",
    ".wdwrrrrrrrrwdw.",
    ".wdwwwwwwwwwwdw.",
    ".wddddddddddddw.",
    ".wwwwwwwwwwwwww.",
    "................",
  ],
};

export const SPRITES = {
  chip,
  target,
  phone,
  browser,
  server,
  monitor,
  gamepad,
  wave,
  mail,
  stack,
} satisfies Record<string, Sprite>;

export type SpriteName = keyof typeof SPRITES;

/** Which sprite stands in for each project category. */
export const CATEGORY_SPRITE = {
  hardware: "chip",
  mobile: "phone",
  web: "browser",
  infra: "server",
  desktop: "monitor",
  game: "gamepad",
} as const satisfies Record<string, SpriteName>;

/* Development-only shape check: a row of the wrong length would otherwise
   just draw a short line and look like a design choice. */
if (process.env.NODE_ENV !== "production") {
  for (const [name, sprite] of Object.entries(SPRITES)) {
    if (sprite.rows.length !== sprite.h) {
      throw new Error(`sprite "${name}": ${sprite.rows.length} rows, expected ${sprite.h}`);
    }
    sprite.rows.forEach((row, y) => {
      if (row.length !== sprite.w) {
        throw new Error(`sprite "${name}" row ${y}: ${row.length} px, expected ${sprite.w}`);
      }
      for (const ch of row) {
        if (ch !== "." && !(ch in sprite.palette)) {
          throw new Error(`sprite "${name}" row ${y}: "${ch}" is not in the palette`);
        }
      }
    });
  }
}
