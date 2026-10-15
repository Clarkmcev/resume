import React from "react";
import { Drift, Layer } from "../parts";

// back to front: smaller, slower, fainter flakes further away
const layers = [
  { depth: 0.4, count: 34, size: [2.5, 3.5], duration: [20, 26], opacity: [0.3, 0.5] },
  { depth: 0.7, count: 24, size: [3.5, 5], duration: [14, 19], opacity: [0.4, 0.65] },
  { depth: 1, count: 16, size: [5, 7.5], duration: [9, 13], opacity: [0.55, 0.85] },
];

// Nord
function Snow() {
  return layers.map(({ depth, ...flakes }, i) => (
    <Layer key={depth} depth={depth} className="text-fifth" style={{ "--travel-x": "-30px" }}>
      <Drift seed={11 + i} shape="snowflake" sway={[8, 22]} {...flakes} />
    </Layer>
  ));
}

export default Snow;
