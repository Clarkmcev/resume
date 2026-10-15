import React from "react";
import { GiPineTree } from "react-icons/gi";
import { Layer } from "../parts";
import { range, seeded } from "../random";

function Trees({ seed, count, size, opacity }) {
  const rand = seeded(seed);
  return Array.from({ length: count }, (_, i) => (
    <GiPineTree
      key={i}
      className="pine"
      style={{
        left: `${(i / count) * 100 + range(rand, [-3, 3])}%`,
        height: `${range(rand, size)}%`,
        width: "auto",
        opacity,
      }}
    />
  ));
}

// Forest: fireflies wandering and blinking over rows of pines
function Fireflies() {
  const rand = seeded(41);
  return (
    <>
      <Layer depth={0.35} className="text-third">
        <Trees seed={43} count={14} size={[30, 45]} opacity={0.08} />
      </Layer>
      <Layer depth={0.7} className="text-third">
        <Trees seed={47} count={9} size={[42, 62]} opacity={0.13} />
      </Layer>
      <Layer depth={1}>
        {Array.from({ length: 26 }, (_, i) => (
          <span
            key={i}
            className="firefly"
            style={{
              left: `${range(rand, [5, 98])}%`,
              top: `${range(rand, [10, 85])}%`,
              "--size": `${range(rand, [3, 5])}px`,
              "--dx1": `${range(rand, [-60, 60])}px`,
              "--dy1": `${range(rand, [-40, 40])}px`,
              "--dx2": `${range(rand, [-60, 60])}px`,
              "--dy2": `${range(rand, [-40, 40])}px`,
              "--dur": `${range(rand, [12, 22])}s`,
              "--blink-dur": `${range(rand, [2, 5])}s`,
              "--delay": `${-rand() * 20}s`,
            }}
          >
            <span />
          </span>
        ))}
      </Layer>
    </>
  );
}

export default Fireflies;
