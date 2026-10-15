import React from "react";
import { Layer } from "../parts";

// Gaps that widen toward the bottom of the sun, retro-poster style
const SUN_BANDS = [
  [-100, 10],
  [16, 26],
  [33, 41],
  [49, 55],
  [64, 68],
  [78, 80],
];

// Synthwave: a striped sun setting behind a neon grid rolling toward you
function Synthwave() {
  return (
    <>
      <Layer depth={0.3}>
        <svg viewBox="-100 -100 200 200" className="retro-sun">
          <defs>
            <linearGradient id="retro-sun-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffd36e" />
              <stop offset="100%" stopColor="#f062c0" />
            </linearGradient>
            <clipPath id="retro-sun-bands">
              {SUN_BANDS.map(([y1, y2]) => (
                <rect key={y1} x="-100" y={y1} width="200" height={y2 - y1} />
              ))}
            </clipPath>
          </defs>
          <circle r="80" fill="url(#retro-sun-fill)" clipPath="url(#retro-sun-bands)" />
        </svg>
      </Layer>
      <Layer depth={1} className="text-third">
        <div className="retro-grid">
          <div className="retro-grid-plane" />
        </div>
      </Layer>
    </>
  );
}

export default Synthwave;
