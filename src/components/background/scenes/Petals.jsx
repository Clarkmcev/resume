import React from "react";
import { Drift, Layer } from "../parts";

const layers = [
  { depth: 0.5, count: 20, size: [9, 13], duration: [16, 22], opacity: [0.25, 0.4] },
  { depth: 1, count: 16, size: [14, 20], duration: [10, 15], opacity: [0.35, 0.55] },
];

// Rosé: petals tumbling down and drifting left on a breeze
function Petals() {
  return layers.map(({ depth, ...petals }, i) => (
    <Layer key={depth} depth={depth} className="text-third" style={{ "--travel-x": "-180px" }}>
      <Drift seed={53 + i} shape="petal" ratio={0.7} sway={[10, 30]} spin={[4, 9]} {...petals} />
    </Layer>
  ));
}

export default Petals;
