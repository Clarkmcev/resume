import React from "react";
import { Layer } from "../parts";

const RAYS = Array.from({ length: 18 }, (_, i) => (i * 360) / 18);

// Solarized: a sun rising out of the corner with slowly turning rays
function Sun() {
  return (
    <Layer depth={0.6} className="sun-scene">
      <svg viewBox="-100 -100 200 200" className="sun">
        <defs>
          <radialGradient id="sun-glow">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="100" fill="url(#sun-glow)" className="sun-halo" />
        <g className="sun-rays">
          {RAYS.map((angle, i) => (
            <polygon
              key={angle}
              points={i % 2 ? "-3,-62 3,-62 0,-84" : "-4,-62 4,-62 0,-96"}
              transform={`rotate(${angle})`}
              fill="currentColor"
            />
          ))}
        </g>
        <circle r="48" fill="currentColor" className="sun-disk" />
      </svg>
    </Layer>
  );
}

export default Sun;
