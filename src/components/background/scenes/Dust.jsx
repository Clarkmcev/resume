import React from "react";
import { Drift, Layer } from "../parts";

// Sepia: dust motes floating up through a slanted beam of light
function Dust() {
  return (
    <>
      <Layer depth={0.3} className="text-third">
        <span className="light-beam" />
        <span className="light-beam light-beam-2" />
      </Layer>
      <Layer depth={0.6} className="text-third" style={{ "--travel-x": "40px" }}>
        <Drift seed={61} count={24} direction="up" shape="dust" size={[1.5, 2.5]} duration={[28, 40]} sway={[10, 30]} opacity={[0.3, 0.55]} />
      </Layer>
      <Layer depth={1} className="text-third" style={{ "--travel-x": "60px" }}>
        <Drift seed={67} count={14} direction="up" shape="dust" size={[2.5, 4]} duration={[20, 30]} sway={[15, 40]} opacity={[0.4, 0.7]} />
      </Layer>
    </>
  );
}

export default Dust;
