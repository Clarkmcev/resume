// Faint parallax scenery behind the game, one set per theme after its
// background scene. Built from small pixel generators so every tile wraps
// seamlessly: "#" is the scenery colour, "+" a brighter highlight (snow caps,
// lit windows, flowers), "." is empty.
//
// A theme has `layers`, drawn far to near and bottom-aligned to the ground
// (`lift` raises one), scrolling at `speed` times the run speed, and an
// optional fixed `sky` sprite.

const TAU = Math.PI * 2;

// a tile whose column x is filled up to height(x) pixels from the bottom
function columns(width, height, heightAt, highlightAt = () => false) {
  return Array.from({ length: height }, (_, y) => {
    const level = height - y; // 1 at the bottom row
    let row = "";
    for (let x = 0; x < width; x++) {
      const h = heightAt(x);
      if (level > h) row += ".";
      else row += highlightAt(x, level, h) ? "+" : "#";
    }
    return row;
  });
}

const hills = (period, base, amp, phase = 0) =>
  columns(period, base + amp, (x) =>
    Math.round(base + amp * Math.sin((TAU * x) / period + phase)),
  );

// one mountain per tile, optionally snow-capped
const peaks = (width, height, snow = false) =>
  columns(
    width,
    height,
    (x) => Math.max(2, Math.round(height - Math.abs(x - width / 2) * 0.9)),
    (x, level) => snow && level > height - 4,
  );

// flat-topped desert buttes
const mesas = (width, height) =>
  columns(width, height, (x) => {
    if (x < 6) return 3;
    if (x < 9) return height - (9 - x) * 2;
    if (x < 22) return height;
    if (x < 25) return height - (x - 21) * 2;
    if (x < 34) return 4;
    if (x < 36) return 9;
    if (x < 42) return 10;
    return 3;
  });

// small deterministic random, so towns look the same on every visit
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

// rooftops of a town, with a few lit windows
function skyline(width, height, seed) {
  const rand = seeded(seed);
  const tops = [];
  while (tops.length < width) {
    const w = 4 + Math.floor(rand() * 5);
    const h = 5 + Math.floor(rand() * (height - 5));
    for (let i = 0; i < w && tops.length < width; i++) {
      tops.push(i === w - 1 ? Math.min(h, 3) : h);
    }
  }
  return columns(
    width,
    height,
    (x) => tops[x],
    (x, level, h) =>
      level < h - 1 && x % 3 === 1 && level % 3 === 0 && rand() > 0.6,
  );
}

// a sprite on the left of a tile `width` wide, the rest left empty
const spaced = (rows, width) => rows.map((row) => row.padEnd(width, "."));

// sprites stood side by side, bottom-aligned, into one tile
function scatter(width, ...placed) {
  const height = Math.max(...placed.map(([rows]) => rows.length));
  const grid = Array.from({ length: height }, () => Array(width).fill("."));
  placed.forEach(([rows, x0]) => {
    const top = height - rows.length;
    rows.forEach((row, y) =>
      [...row].forEach((key, x) => {
        if (key !== ".") grid[top + y][(x0 + x) % width] = key;
      }),
    );
  });
  return grid.map((row) => row.join(""));
}

const PINE = [
  "..#..",
  ".###.",
  "..#..",
  ".###.",
  "#####",
  "..#..",
  ".###.",
  "#####",
  "..#..",
];
const BIG_PINE = [
  "...#...",
  "..###..",
  ".#####.",
  "...#...",
  "..###..",
  ".#####.",
  "#######",
  "...#...",
  ".#####.",
  "#######",
  "...#...",
  "...#...",
];
const DEAD_TREE = [
  "#..#..#",
  ".#.#.#.",
  "..###..",
  "...#..#",
  "#..#.#.",
  ".#.##..",
  "..##...",
  "...#...",
  "...#...",
  "..###..",
];
const PALM = [
  ".###.###.",
  "#...#...#",
  "...###...",
  "..#.#.#..",
  ".....#...",
  "....#....",
  "....#....",
  "....#....",
  "...#.....",
  "...#.....",
  "...#.....",
  "..###....",
];
const CASTLE = [
  ".......#.#............",
  ".......###............",
  ".......###.....#.#....",
  ".#.#...#+#.....###....",
  ".###...###.....###....",
  ".###.#.#.#.#.#.#+#....",
  ".#+#.#########.###....",
  ".###.####+####.###....",
  "######################",
];
const FENCE = ["#.....", "######", "#.....", "######", "#....."];
const ROSE_HEDGE = [
  "..+.......+..",
  ".###..+..###.",
  "#####.##.####",
  "#############",
];

const DISC = [
  "..#####..",
  ".#######.",
  "#########",
  "#########",
  "#########",
  ".#######.",
  "..#####..",
];
const MOON = [
  "..###..",
  ".##+##.",
  "####+##",
  "###+###",
  "#######",
  ".#####.",
  "..###..",
];
// retro sun with the stripes through its lower half
const SYNTH_SUN = [
  "....#####....",
  "..#########..",
  ".###########.",
  "#############",
  ".............",
  "#############",
  ".............",
  ".###########.",
  ".............",
  "...#######...",
];
// streaks of mist drifting over the trail
const FOG = [
  "######........###########..........#####.....",
  ".............................................",
  "......########..........#######..............",
];

export const SCENERY = {
  // Ocean: swells on the horizon, choppy water closer in
  dark: {
    sky: { rows: MOON, x: 108, y: 14 },
    layers: [
      { rows: hills(60, 6, 2), speed: 0.1 },
      { rows: hills(24, 3, 2, 1), speed: 0.35 },
    ],
  },
  // Mist: soft hills under drifting fog
  light: {
    layers: [
      { rows: hills(80, 10, 5), speed: 0.12 },
      { rows: FOG, speed: 0.3, lift: 16 },
    ],
  },
  // Nord: snow-capped mountains and drifts
  nord: {
    layers: [
      { rows: peaks(44, 24, true), speed: 0.1 },
      { rows: hills(36, 4, 2), speed: 0.35 },
    ],
  },
  // Dracula: a castle under the moon, dead trees in the graveyard
  dracula: {
    sky: { rows: MOON, x: 100, y: 10 },
    layers: [
      { rows: spaced(CASTLE, 90), speed: 0.1 },
      {
        rows: scatter(70, [DEAD_TREE, 0], [FENCE, 20], [FENCE, 26]),
        speed: 0.35,
      },
    ],
  },
  // Gruvbox: a sleepy café town on low hills
  gruvbox: {
    layers: [
      { rows: skyline(70, 18, 7), speed: 0.12 },
      { rows: hills(50, 3, 2), speed: 0.35 },
    ],
  },
  // Solarized: the desert sun over mesas and dunes
  solarized: {
    sky: { rows: DISC, x: 104, y: 12 },
    layers: [
      { rows: spaced(mesas(44, 16), 70), speed: 0.1 },
      { rows: hills(40, 3, 2), speed: 0.35 },
    ],
  },
  // Forest: a far treeline and a few big pines close by
  forest: {
    layers: [
      { rows: scatter(18, [PINE, 0], [PINE, 6], [PINE, 12]), speed: 0.12 },
      { rows: spaced(BIG_PINE, 46), speed: 0.4 },
    ],
  },
  // Rosé: rolling hills and a hedge of roses
  rose: {
    layers: [
      { rows: hills(70, 8, 4), speed: 0.12 },
      { rows: spaced(ROSE_HEDGE, 30), speed: 0.35 },
    ],
  },
  // Synthwave: striped sun, mountains and palms
  synthwave: {
    sky: { rows: SYNTH_SUN, x: 64, y: 22 },
    layers: [
      { rows: peaks(36, 18), speed: 0.1 },
      { rows: spaced(PALM, 52), speed: 0.4 },
    ],
  },
  // Sepia: an old frontier town and fence posts in the dust
  sepia: {
    layers: [
      { rows: skyline(64, 14, 3), speed: 0.12 },
      { rows: spaced(FENCE, 18), speed: 0.4 },
    ],
  },
};

// Precomputed horizontal runs per tile, so drawing is a handful of rects.
function runs(rows) {
  const out = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const key = row[x];
      let end = x;
      while (end < row.length && row[end] === key) end++;
      if (key !== ".") out.push({ x, y, length: end - x, key });
      x = end;
    }
  });
  return out;
}

Object.values(SCENERY).forEach((scene) => {
  scene.layers.forEach((layer) => {
    layer.width = layer.rows[0].length;
    layer.height = layer.rows.length;
    layer.runs = runs(layer.rows);
  });
  if (scene.sky) scene.sky.runs = runs(scene.sky.rows);
});
