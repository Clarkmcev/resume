import React from "react";
import { Layer } from "../parts";

// Two identical wave periods drawn as one path (separate copies leave a
// visible seam where they meet); the drift animation shifts it by one period
const WAVE_PATH =
  "M0 60 C 240 20, 480 20, 720 60 C 960 100, 1200 100, 1440 60 " +
  "C 1680 20, 1920 20, 2160 60 C 2400 100, 2640 100, 2880 60 V 120 H 0 Z";

// back to front
const layers = [
  { depth: 0.4, height: "65%", opacity: 0.05, duration: "45s" },
  { depth: 0.7, height: "50%", opacity: 0.07, duration: "32s", reverse: true },
  { depth: 1, height: "35%", opacity: 0.1, duration: "22s" },
];

// Ocean
function Waves() {
  return layers.map(({ depth, height, opacity, duration, reverse }) => (
    <Layer
      key={depth}
      depth={depth}
      className="waves text-third"
      style={{ "--base-opacity": opacity }}
    >
      <div
        className="wave-strip"
        style={{
          height,
          animationDuration: duration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none">
          <path d={WAVE_PATH} fill="currentColor" />
        </svg>
      </div>
    </Layer>
  ));
}

export default Waves;
