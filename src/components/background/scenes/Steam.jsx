import React from "react";
import { GiCoffeeCup } from "react-icons/gi";
import { Layer } from "../parts";
import { range, seeded } from "../random";

const WISP_PATH = "M30 200 C 5 160, 55 130, 30 95 S 5 30, 30 0";

function Wisps({ seed, count, left, height, width, opacity, bottom = "-10%" }) {
  const rand = seeded(seed);
  return Array.from({ length: count }, (_, i) => {
    const dur = range(rand, [6, 10]);
    return (
      <svg
        key={i}
        viewBox="0 0 60 200"
        className="steam-wisp"
        style={{
          left: `${range(rand, left)}%`,
          bottom,
          height: `${range(rand, height)}%`,
          width: `${width}%`,
          "--peak": range(rand, opacity),
          "--dur": `${dur}s`,
          "--delay": `${-rand() * dur}s`,
        }}
      >
        <path d={WISP_PATH} />
      </svg>
    );
  });
}

// Gruvbox: steam curling up from a coffee cup, plus faint wisps further out
function Steam() {
  return (
    <>
      <Layer depth={0.4} className="text-fourth">
        <Wisps seed={31} count={5} left={[25, 70]} height={[55, 80]} width={9} opacity={[0.08, 0.14]} />
      </Layer>
      <Layer depth={1} className="text-fourth">
        <Wisps seed={37} count={4} left={[82, 89]} height={[38, 52]} width={5} opacity={[0.2, 0.32]} bottom="28%" />
        <GiCoffeeCup className="coffee-cup" />
      </Layer>
    </>
  );
}

export default Steam;
