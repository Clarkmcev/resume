import React from "react";
import {
  GiHangingSpider,
  GiLantern,
  GiPalmTree,
  GiRose,
  GiSpiderWeb,
  GiStreetLight,
  GiSunflower,
} from "react-icons/gi";
import { Drift } from "./parts";
import Smoke from "./Smoke";
import { range, seeded } from "./random";

// Small scenes for the empty strip left of the sidebar on wide screens (see
// .side-bg in background.css). Each one echoes its theme's corner scene.

// A wavy strand anchored at one end that sways around that end. `shapes` are
// drawn in the strand's own (stretched) coordinates; `children` sit on top,
// positioned in % of the strand, so icons keep their proportions.
function Strand({ d, viewBox, left, height, width, origin, dur, delay, shapes, children }) {
  return (
    <div
      className={`side-strand side-strand-${origin}`}
      style={{ left, height, width, "--dur": `${dur}s`, "--delay": `${delay}s` }}
    >
      <svg viewBox={viewBox} preserveAspectRatio="none">
        <path d={d} />
        {shapes}
      </svg>
      {children}
    </div>
  );
}

// Ocean: kelp swaying on the sea floor, bubbles rising past it
function Kelp() {
  const KELP = "M10 400 C -4 330, 24 280, 10 220 S -4 110, 10 40 S 14 8, 10 0";
  return (
    <div className="text-third">
      <Strand d={KELP} viewBox="0 0 20 400" left="20%" height="55%" width={20} origin="bottom" dur={6} delay={0} />
      <Strand d={KELP} viewBox="0 0 20 400" left="45%" height="38%" width={16} origin="bottom" dur={7.5} delay={-3} />
      <Strand d={KELP} viewBox="0 0 20 400" left="65%" height="48%" width={18} origin="bottom" dur={5.5} delay={-1.5} />
      <Drift seed={61} count={14} direction="up" shape="side-bubble" size={[4, 11]} duration={[9, 16]} sway={[4, 12]} opacity={[0.35, 0.7]} />
    </div>
  );
}

// Mist: a streetlamp glowing through drifting fog
function Lamp() {
  return (
    <div className="text-third">
      <span className="side-glow side-lamp-glow" />
      <GiStreetLight className="side-lamp" />
      {[
        { top: "45%", left: "-30%", size: 220, drift: 30, dur: 18 },
        { top: "70%", left: "10%", size: 260, drift: 40, dur: 24 },
      ].map(({ top, left, size, drift, dur }) => (
        <span
          key={top}
          className="fog-bank"
          style={{ top, left, width: size, height: size * 0.6, opacity: 0.12, "--drift": `${drift}px`, "--dur": `${dur}s`, "--delay": "0s" }}
        />
      ))}
    </div>
  );
}

// Nord: icicles along the top, now and then dripping
function Icicles() {
  const rand = seeded(67);
  const icicles = Array.from({ length: 9 }, (_, i) => ({
    x: i * 11 + range(rand, [1, 5]),
    w: range(rand, [4, 8]),
    h: range(rand, [30, 110]),
  }));
  return (
    <div className="text-fifth">
      <svg viewBox="0 0 100 120" preserveAspectRatio="none" className="side-icicles">
        <rect width="100" height="4" />
        {icicles.map(({ x, w, h }) => (
          <path key={x} d={`M${x} 2 L${x + w} 2 L${x + w / 2} ${h} Z`} />
        ))}
      </svg>
      {icicles
        .filter((_, i) => i % 3 === 1)
        .map(({ x, w, h }, i) => (
          <span
            key={x}
            className="side-drip"
            style={{ left: `${x + w / 2}%`, top: h * 1.1, "--dur": `${range(rand, [3, 5])}s`, "--delay": `${-i * 1.3}s` }}
          />
        ))}
      <Drift seed={71} count={10} shape="snowflake" size={[2.5, 5]} duration={[14, 22]} sway={[6, 16]} opacity={[0.3, 0.6]} />
    </div>
  );
}

// Dracula: a spider bobbing on its thread under a corner web
function Spider() {
  return (
    <div className="text-third">
      <GiSpiderWeb className="side-web" />
      <div className="side-spider">
        <span className="side-thread" />
        <GiHangingSpider className="side-spider-body" />
      </div>
    </div>
  );
}

const PIPE_STEAM = [{ x: 0.5, amp: 7, reach: 1, width: 3, alpha: 0.3, waves: [1.8, 2.2] }];

// Gruvbox: a steam pipe with a jittery pressure gauge, leaking at a joint
function Pipe() {
  return (
    <div className="text-fourth">
      <span className="side-pipe">
        {[18, 46, 78].map((top) => (
          <span key={top} className="side-pipe-joint" style={{ top: `${top}%` }} />
        ))}
      </span>
      <svg viewBox="-20 -20 40 40" className="side-gauge">
        <circle r="17" />
        <line x1="0" y1="0" x2="0" y2="-12" className="side-gauge-needle" />
      </svg>
      <Smoke seed={41} plumes={PIPE_STEAM} blur={3} className="side-steam" />
    </div>
  );
}

// Solarized: sunflowers turning gently in the breeze
function Sunflowers() {
  return (
    <div className="sun-scene">
      {[
        { left: "-5%", height: "34%", dur: 7, delay: 0 },
        { left: "45%", height: "24%", dur: 8.5, delay: -4 },
      ].map(({ left, height, dur, delay }) => (
        <GiSunflower
          key={left}
          className="side-sunflower"
          style={{ left, height, "--dur": `${dur}s`, "--delay": `${delay}s` }}
        />
      ))}
    </div>
  );
}

// Forest: vines hanging from above, with a few fireflies
function Vines() {
  const rand = seeded(73);
  const VINE = "M10 0 C 18 60, 2 120, 10 180 S 18 290, 10 360";
  const leaves = (n) =>
    Array.from({ length: n }, (_, i) => {
      const y = 40 + i * 50;
      const side = i % 2 ? 1 : -1;
      return <ellipse key={y} cx={10 + side * 6} cy={y} rx="6" ry="3" transform={`rotate(${side * 35} ${10 + side * 6} ${y})`} />;
    });
  return (
    <>
      <div className="text-third">
        <Strand d={VINE} viewBox="0 0 20 360" left="18%" height="60%" width={24} origin="top" dur={7} delay={0} shapes={leaves(6)} />
        <Strand d={VINE} viewBox="0 0 20 360" left="55%" height="40%" width={20} origin="top" dur={9} delay={-4} shapes={leaves(6)} />
      </div>
      {Array.from({ length: 7 }, (_, i) => (
        <span
          key={i}
          className="firefly"
          style={{
            left: `${range(rand, [10, 80])}%`,
            top: `${range(rand, [35, 90])}%`,
            "--size": `${range(rand, [3, 4.5])}px`,
            "--dx1": `${range(rand, [-30, 30])}px`,
            "--dy1": `${range(rand, [-40, 40])}px`,
            "--dx2": `${range(rand, [-30, 30])}px`,
            "--dy2": `${range(rand, [-40, 40])}px`,
            "--dur": `${range(rand, [12, 20])}s`,
            "--blink-dur": `${range(rand, [2, 5])}s`,
            "--delay": `${-rand() * 20}s`,
          }}
        >
          <span />
        </span>
      ))}
    </>
  );
}

// Rosé: a rose garland hanging from above, shedding petals
function Garland() {
  const STEM = "M10 0 C 18 60, 2 120, 10 180 S 18 290, 10 340";
  return (
    <div className="text-third">
      <Strand d={STEM} viewBox="0 0 20 360" left="30%" height="55%" width={20} origin="top" dur={8} delay={0}>
        {[20, 45, 70, 94].map((top, i) => (
          <GiRose
            key={top}
            className="side-rose"
            style={{ top: `${top}%`, left: i % 2 ? "70%" : "-30%" }}
          />
        ))}
      </Strand>
      <Drift seed={79} count={8} shape="petal" ratio={0.7} size={[8, 13]} duration={[12, 18]} sway={[8, 20]} opacity={[0.3, 0.5]} />
    </div>
  );
}

// Synthwave: a palm silhouette swaying under twinkling stars
function Palm() {
  const rand = seeded(83);
  return (
    <>
      <div className="text-fourth">
        {Array.from({ length: 14 }, (_, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${range(rand, [5, 95])}%`,
              top: `${range(rand, [5, 55])}%`,
              width: range(rand, [1.5, 2.5]),
              height: range(rand, [1.5, 2.5]),
              "--dur": `${range(rand, [2, 5])}s`,
              "--delay": `${-rand() * 5}s`,
            }}
          />
        ))}
      </div>
      <GiPalmTree className="side-palm text-third" />
    </>
  );
}

// Sepia: an old lantern swinging on its chain, dust floating in its light
function Lantern() {
  return (
    <div className="text-third">
      <div className="side-lantern">
        <span className="side-chain" />
        <span className="side-glow side-lantern-glow" />
        <GiLantern className="side-lantern-body" />
      </div>
      <Drift seed={89} count={12} direction="up" shape="dust" size={[2, 3.5]} duration={[18, 28]} sway={[10, 24]} opacity={[0.3, 0.6]} />
    </div>
  );
}

// Side scene for each theme id in src/themes.js
const sideScenes = {
  dark: Kelp,
  light: Lamp,
  nord: Icicles,
  dracula: Spider,
  gruvbox: Pipe,
  solarized: Sunflowers,
  forest: Vines,
  rose: Garland,
  synthwave: Palm,
  sepia: Lantern,
};

export default sideScenes;
