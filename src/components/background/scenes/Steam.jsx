import React from "react";
import { Layer } from "../parts";
import Smoke from "../Smoke";

// far plumes: wide, faint and slow; near ones: brighter, tighter zigzags
const FAR = [
  { x: 0.22, amp: 34, reach: 0.95, width: 7, alpha: 0.09, speed: [1, 1.4] },
  { x: 0.45, amp: 40, reach: 1, width: 8, alpha: 0.1, speed: [1, 1.4] },
  { x: 0.66, amp: 30, reach: 0.9, width: 7, alpha: 0.08, speed: [1, 1.4] },
];
const NEAR = [
  { x: 0.78, amp: 26, reach: 0.75, width: 5, alpha: 0.26, waves: [2.4, 3] },
  { x: 0.9, amp: 22, reach: 0.65, width: 4, alpha: 0.22, waves: [2.4, 3] },
];

// Gruvbox: plumes of smoke zigzagging up from below, drawn on canvas
function Steam() {
  return (
    <>
      <Layer depth={0.4} className="text-fourth">
        <Smoke seed={31} plumes={FAR} blur={6} />
      </Layer>
      <Layer depth={1} className="text-fourth">
        <Smoke seed={37} plumes={NEAR} />
      </Layer>
    </>
  );
}

export default Steam;
