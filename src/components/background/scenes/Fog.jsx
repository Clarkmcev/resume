import React from "react";
import { Layer } from "../parts";
import { range, seeded } from "../random";

// Mist: soft blurred banks of fog drifting back and forth
function Fog() {
  const rand = seeded(7);
  return [0.4, 0.7, 1].map((depth) => (
    <Layer key={depth} depth={depth} className="text-third">
      {Array.from({ length: 4 }, (_, i) => {
        const width = range(rand, [35, 60]);
        return (
          <span
            key={i}
            className="fog-bank"
            style={{
              left: `${range(rand, [-10, 85])}%`,
              bottom: `${range(rand, [-15, 35]) * (1.2 - depth)}%`,
              width: `${width}%`,
              height: `${width * range(rand, [0.45, 0.7])}%`,
              opacity: range(rand, [0.1, 0.2]),
              "--drift": `${range(rand, [4, 10])}%`,
              "--dur": `${range(rand, [16, 30])}s`,
              "--delay": `${-rand() * 30}s`,
            }}
          />
        );
      })}
    </Layer>
  ));
}

export default Fog;
