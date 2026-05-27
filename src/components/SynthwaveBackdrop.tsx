/**
 * Vaporwave / synthwave backdrop — pure CSS + inline SVG, no raster.
 *
 * Layered (back → front):
 *  1. Vertical sky gradient (deep indigo → purple → magenta horizon)
 *  2. Radial neon sun with banded "retro" cutouts
 *  3. Scattered stars
 *  4. Distant cyberpunk city silhouette (SVG polygon)
 *  5. Horizon glow line
 *  6. CSS-transformed perspective grid that recedes into the vanishing point
 *
 * The whole thing is `pointer-events-none` and sits behind page content.
 * Sized to cover the hero section (100vh) with optional fade-out at bottom
 * via gradient mask so it blends into the page's #080c10 base.
 */
export default function SynthwaveBackdrop() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0420 0%, #1a0848 30%, #45116a 55%, #9b1568 75%, #ff2b8f 92%, #ff5fb5 100%)",
        maskImage:
          "linear-gradient(180deg, #000 0%, #000 70%, rgba(0,0,0,0.5) 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, #000 0%, #000 70%, rgba(0,0,0,0.5) 90%, transparent 100%)",
      }}
    >
      {/* Stars */}
      <Stars />

      {/* Sun — banded radial; the "bars" are CSS gradient stripes overlaid */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: "33%", width: "min(540px, 60vw)", aspectRatio: "1/1" }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #ffd66b 0%, #ff8a3c 30%, #ff2b8f 60%, rgba(255,43,143,0) 75%)",
            filter: "blur(0.5px)",
          }}
        />
        {/* Horizontal retro bands cutting the sun */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(180deg, transparent 0, transparent 38px, #0a0420 38px, #0a0420 46px)",
            maskImage:
              "radial-gradient(circle at 50% 50%, #000 0%, #000 70%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, #000 0%, #000 70%, transparent 75%)",
            opacity: 0.7,
          }}
        />
        {/* Outer glow halo */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              "0 0 120px 40px rgba(255, 43, 143, 0.4), 0 0 240px 80px rgba(255, 95, 181, 0.18)",
          }}
        />
      </div>

      {/* Cyberpunk city silhouette, sitting just above the horizon */}
      <svg
        className="absolute left-0 right-0"
        style={{ bottom: "30%", width: "100%", height: "120px" }}
        viewBox="0 0 1600 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="cityFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0420" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0a0420" />
          </linearGradient>
          <linearGradient id="cityEdge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 120 V 80 H 40 V 60 H 70 V 70 H 95 V 40 H 120 V 55 H 145 V 30 H 175 V 50 H 210 V 70 H 240 V 45 H 275 V 65 H 310 V 35 H 340 V 25 H 365 V 50 H 395 V 70 H 430 V 50 H 460 V 35 H 495 V 55 H 530 V 70 H 565 V 40 H 600 V 20 H 630 V 50 H 660 V 65 H 695 V 38 H 730 V 25 H 765 V 50 H 800 V 70 H 835 V 45 H 870 V 60 H 905 V 30 H 935 V 50 H 970 V 70 H 1005 V 35 H 1040 V 55 H 1075 V 25 H 1110 V 50 H 1145 V 70 H 1180 V 40 H 1215 V 55 H 1255 V 32 H 1290 V 50 H 1325 V 70 H 1360 V 45 H 1395 V 60 H 1430 V 30 H 1465 V 50 H 1505 V 65 H 1540 V 40 H 1575 V 55 H 1600 V 120 Z"
          fill="url(#cityFill)"
          stroke="url(#cityEdge)"
          strokeWidth="1.5"
        />
        {/* Window lights — sparse dots at random heights */}
        {[
          [80, 75], [125, 60], [180, 40], [225, 80], [320, 50], [380, 35],
          [445, 55], [515, 45], [590, 30], [665, 55], [735, 35], [820, 78],
          [890, 50], [955, 40], [1025, 60], [1095, 50], [1170, 50], [1240, 45],
          [1310, 55], [1380, 50], [1455, 40], [1520, 45], [1585, 60],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="2" height="2" fill="#00f0ff" opacity="0.7" />
        ))}
      </svg>

      {/* Horizon neon glow line — separates city/sky from grid floor */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: "30%",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, #ff2b8f 20%, #ffd66b 50%, #ff2b8f 80%, transparent 100%)",
          boxShadow:
            "0 0 16px #ff2b8f, 0 0 4px #ffd66b",
        }}
      />

      {/* Perspective grid floor — CSS transformed, animated subtle scroll */}
      <div
        className="absolute left-0 right-0 bottom-0 overflow-hidden"
        style={{
          height: "30%",
          perspective: "600px",
          perspectiveOrigin: "50% 0%",
        }}
      >
        <div
          className="absolute inset-0 origin-top synthwave-grid"
          style={{
            transform: "rotateX(64deg) translateZ(0)",
            backgroundImage:
              "linear-gradient(#00f0ff66 1px, transparent 1px), linear-gradient(90deg, #00f0ff66 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0",
            // Mask so the grid fades into the horizon
            maskImage:
              "linear-gradient(0deg, #000 0%, #000 60%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(0deg, #000 0%, #000 60%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}

function Stars() {
  // 36 deterministic "star" dots in the upper portion. Avoiding Math.random()
  // at render time so server and client produce identical markup.
  const STARS: { x: number; y: number; size: number; opacity: number }[] = [
    { x: 4, y: 7, size: 1, opacity: 0.7 },
    { x: 11, y: 14, size: 2, opacity: 0.9 },
    { x: 18, y: 5, size: 1, opacity: 0.6 },
    { x: 23, y: 22, size: 1, opacity: 0.8 },
    { x: 28, y: 9, size: 2, opacity: 0.7 },
    { x: 33, y: 18, size: 1, opacity: 0.5 },
    { x: 38, y: 4, size: 2, opacity: 0.9 },
    { x: 42, y: 25, size: 1, opacity: 0.6 },
    { x: 47, y: 11, size: 1, opacity: 0.7 },
    { x: 51, y: 28, size: 1, opacity: 0.4 },
    { x: 55, y: 6, size: 2, opacity: 0.8 },
    { x: 60, y: 19, size: 1, opacity: 0.6 },
    { x: 64, y: 12, size: 1, opacity: 0.7 },
    { x: 69, y: 24, size: 1, opacity: 0.5 },
    { x: 73, y: 3, size: 2, opacity: 0.9 },
    { x: 78, y: 16, size: 1, opacity: 0.6 },
    { x: 82, y: 8, size: 1, opacity: 0.7 },
    { x: 87, y: 21, size: 2, opacity: 0.8 },
    { x: 92, y: 13, size: 1, opacity: 0.5 },
    { x: 96, y: 26, size: 1, opacity: 0.6 },
    { x: 7, y: 30, size: 1, opacity: 0.5 },
    { x: 14, y: 36, size: 1, opacity: 0.6 },
    { x: 20, y: 33, size: 1, opacity: 0.4 },
    { x: 26, y: 40, size: 2, opacity: 0.7 },
    { x: 35, y: 32, size: 1, opacity: 0.5 },
    { x: 44, y: 38, size: 1, opacity: 0.6 },
    { x: 49, y: 34, size: 1, opacity: 0.4 },
    { x: 56, y: 41, size: 1, opacity: 0.5 },
    { x: 62, y: 31, size: 1, opacity: 0.6 },
    { x: 68, y: 39, size: 1, opacity: 0.4 },
    { x: 75, y: 35, size: 1, opacity: 0.5 },
    { x: 81, y: 32, size: 1, opacity: 0.6 },
    { x: 88, y: 40, size: 1, opacity: 0.5 },
    { x: 94, y: 33, size: 1, opacity: 0.4 },
    { x: 2, y: 18, size: 1, opacity: 0.6 },
    { x: 99, y: 11, size: 1, opacity: 0.5 },
  ];
  return (
    <>
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: "#ffffff",
            opacity: s.opacity,
            boxShadow: s.size === 2 ? "0 0 4px #ffffff" : undefined,
          }}
        />
      ))}
    </>
  );
}
