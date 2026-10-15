import React from "react";
import { GiBat } from "react-icons/gi";
import { Layer } from "../parts";
import { range, seeded } from "../random";

// Dracula: a moon and twinkling stars with bats flapping across
function Bats() {
  const rand = seeded(23);
  return (
    <>
      <Layer depth={0.3} className="text-fifth">
        {Array.from({ length: 34 }, (_, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${range(rand, [0, 100])}%`,
              top: `${range(rand, [5, 75])}%`,
              width: range(rand, [1.5, 3]),
              height: range(rand, [1.5, 3]),
              "--dur": `${range(rand, [2, 5])}s`,
              "--delay": `${-rand() * 5}s`,
            }}
          />
        ))}
        <span className="moon" />
      </Layer>
      <Layer depth={1} className="text-third">
        {Array.from({ length: 6 }, (_, i) => {
          const dur = range(rand, [14, 24]);
          return (
            <span
              key={i}
              className="bat-flight"
              style={{
                top: `${range(rand, [15, 70])}%`,
                opacity: range(rand, [0.3, 0.55]),
                "--dur": `${dur}s`,
                "--delay": `${-rand() * dur}s`,
              }}
            >
              <span className="bat-bob" style={{ "--bob-dur": `${range(rand, [1.6, 2.8])}s` }}>
                <GiBat
                  className="bat-wings"
                  size={range(rand, [22, 42])}
                  style={{ "--flap-dur": `${range(rand, [0.22, 0.34])}s` }}
                />
              </span>
            </span>
          );
        })}
      </Layer>
    </>
  );
}

export default Bats;
