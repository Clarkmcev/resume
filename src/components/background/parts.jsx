import React from "react";
import { range, seeded } from "./random";

// A full-size layer that follows the mouse; depth scales how strongly
// (see .bg-parallax in background.css)
export function Layer({ depth = 1, className = "", style, children }) {
  return (
    <div className={`bg-parallax ${className}`} style={{ "--depth": depth, ...style }}>
      {children}
    </div>
  );
}

// Particles that fall from the top or rise from the bottom while swaying.
// Negative delays start each one mid-flight so the scene is full immediately.
export function Drift({
  seed,
  count,
  direction = "down",
  shape,
  size,
  ratio = 1,
  duration,
  sway = [6, 18],
  opacity = [0.4, 0.8],
  spin = [4, 8],
}) {
  const rand = seeded(seed);
  return Array.from({ length: count }, (_, i) => {
    const dur = range(rand, duration);
    const px = range(rand, size);
    return (
      <span
        key={i}
        className={`bg-drift bg-drift-${direction}`}
        style={{
          left: `${range(rand, [-5, 105])}%`,
          "--dur": `${dur}s`,
          "--delay": `${-rand() * dur}s`,
        }}
      >
        <span
          className="bg-sway"
          style={{
            "--sway": `${range(rand, sway)}px`,
            "--sway-dur": `${range(rand, [3, 7])}s`,
          }}
        >
          <span
            className={shape}
            style={{
              width: px,
              height: px * ratio,
              opacity: range(rand, opacity),
              "--spin-dur": `${range(rand, spin)}s`,
            }}
          />
        </span>
      </span>
    );
  });
}
