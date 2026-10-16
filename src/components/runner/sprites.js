// Pixel art of me on a night trail run (from unnamed.jpg), kept deliberately
// simple: cap with a headlamp, mustache, tee under a running vest, shorts.
//
// One character per pixel, "." is empty. Every other key is a colour role
// resolved against the current theme palette, so everything re-skins with
// the theme.
export const ROLES = {
  K: "fifth", // cap, vest, shorts, shoes: the strongest contrast
  S: "third", // skin
  L: "fourth", // tee, headlamp
  A: "third", // obstacle body
};

// Facing the viewer, for the idle screen.
const FRONT = [
  "..KKKKKK..",
  ".KKKLLKKK.",
  "..SSSSSS..",
  "..SKSSKS..",
  "..SKKKKS..",
  "...SSSS...",
  ".LLLLLLLL.",
  "SLKKLLKKLS",
  "SLKKLLKKLS",
  "S.LLLLLL.S",
  "..KKKKKK..",
  "..KKKKKK..",
  "..SS..SS..",
  "..SS..SS..",
  "..SS..SS..",
  "..SS..SS..",
  ".KKK..KKK.",
];

// Side on, facing right. Legs and the near arm change per frame.
const SIDE = [
  "....KKKK..",
  "..KKKKKKL.",
  "....SSSSS.",
  "....SSSKSS",
  "....SSSSK.",
  ".....SSS..",
  "....LLLL..",
  "....LKKK..",
  "....LKKK..",
  "....LLLL..",
  "....KKKK..",
  "....KKKK..",
];

const LEGS = {
  stand: [".....S.S..", ".....S.S..", ".....S.S..", ".....S.S..", "....KK.KK."],
  stride: [
    "....S..S..",
    "...SS...S.",
    "..SS....SS",
    ".SS......S",
    "KK.......K",
  ],
  pass: ["....SSS...", "....S.SS..", "....S..S..", "...SS..K..", "...KK....."],
  tuck: ["....SSSS..", "...SS..SS.", "...KK..KK.", "..........", ".........."],
};

// near arm pixels [x, y], drawn over the torso
const ARMS = {
  back: [
    [3, 7],
    [3, 8],
    [2, 9],
  ],
  side: [
    [6, 7],
    [6, 8],
    [7, 9],
  ],
  forward: [
    [7, 7],
    [8, 8],
    [9, 7],
  ],
};

function side(legs, arm) {
  const rows = [...SIDE, ...LEGS[legs]].map((row) => [...row]);
  ARMS[arm].forEach(([x, y]) => (rows[y][x] = "S"));
  return rows.map((row) => row.join(""));
}

// Facing the viewer with both arms up, for crossing the finish line.
function cheer() {
  const rows = FRONT.map((row) => [...row]);
  [7, 8, 9].forEach((y) => (rows[y][0] = rows[y][9] = "."));
  [2, 3, 4, 5].forEach((y) => (rows[y][0] = rows[y][9] = "S"));
  return rows.map((row) => row.join(""));
}

export const PLAYER = {
  front: FRONT,
  cheer: cheer(),
  stand: side("stand", "side"),
  run: [
    side("stride", "back"),
    side("pass", "side"),
    side("stride", "forward"),
    side("pass", "side"),
  ],
  jump: side("tuck", "forward"),
};

// Headlamp position on the side view, where the beam starts.
export const LAMP = { x: 9, y: 1 };

// Eye pixels to close while blinking, per view.
export const EYES = {
  front: [
    [3, 3],
    [6, 3],
  ],
  side: [[7, 3]],
};

// Obstacles per theme, after its background scene. `small` is also sent as a
// pair, `tall` shows up once you have warmed up, and a `flyer` hovers `lift`
// pixels above the ground. Several frames animate in a loop.
export const THEME_OBSTACLES = {
  // Ocean: rolling waves
  dark: {
    small: [
      ["....LLL.", "..LLAAAL", ".LAAA..L", "LAAAA...", "AAAAAA..", "AAAAAAAA"],
      ["...LLL..", ".LLAAAL.", "LAAAA.L.", "AAAAA...", "AAAAAAA.", "AAAAAAAA"],
    ],
    tall: [
      [
        "......LLLL.",
        "....LLAAAAL",
        "...LAAAA..L",
        "..LAAAA....",
        "..AAAAA....",
        ".LAAAAA....",
        ".AAAAAAA...",
        "LAAAAAAAA..",
        "AAAAAAAAAA.",
        "AAAAAAAAAAA",
      ],
      [
        ".....LLLL..",
        "...LLAAAAL.",
        "..LAAAA..L.",
        "..AAAAA....",
        ".LAAAAA....",
        ".AAAAAA....",
        ".AAAAAAA...",
        "LAAAAAAAA..",
        "AAAAAAAAAA.",
        "AAAAAAAAAAA",
      ],
    ],
  },
  // Mist: rocks and an old street lamp
  light: {
    small: [["..AAAA..", ".AAAAAA.", "AALAAAAA", "AAAAALAA", "AAAAAAAA"]],
    tall: [
      [
        ".AAAA.",
        "AALLAA",
        "AALLAA",
        ".AAAA.",
        "..AA..",
        "..AA..",
        "..AA..",
        "..AA..",
        "..AA..",
        "..AA..",
        ".AAAA.",
      ],
    ],
  },
  // Nord: snowballs and a snowman
  nord: {
    small: [["..LLL..", ".LLLLL.", "LLLLLLL", "LLLLLLA", ".LLLAA."]],
    tall: [
      [
        "..KKK..",
        ".KKKKK.",
        "..LLL..",
        ".LKLKL.",
        ".LLAAL.",
        "..LLL..",
        ".LLKLL.",
        "LLLLLLL",
        "LLLKLLL",
        "LLLLLLL",
        ".LLLLL.",
      ],
    ],
  },
  // Dracula: tombstones, a coffin and bats
  dracula: {
    small: [
      [".AAAA.", "AAAAAA", "AALLAA", "ALLLLA", "AALLAA", "AAAAAA", "AAAAAA"],
    ],
    tall: [
      [
        "..AAAA..",
        ".AAAAAA.",
        "AAALLAAA",
        "ALLLLLLA",
        "AAALLAAA",
        "AAALLAAA",
        ".AAAAAA.",
        ".AAAAAA.",
        "..AAAA..",
        "..AAAA..",
      ],
    ],
    flyer: {
      lift: 6,
      frames: [
        ["A..AA..A", "AAAAAAAA", ".AALLAA.", "...AA..."],
        ["...AA...", ".AAAAAA.", "AAALLAAA", "A..AA..A"],
      ],
    },
  },
  // Gruvbox: steaming coffee and a pot
  gruvbox: {
    small: [
      [
        "..L.L..",
        ".L.L...",
        "AAAAAA.",
        "ALLLLAA",
        "AAAAA.A",
        "AAAAAAA",
        ".AAAA..",
      ],
      [
        ".L.L...",
        "..L.L..",
        "AAAAAA.",
        "ALLLLAA",
        "AAAAA.A",
        "AAAAAAA",
        ".AAAA..",
      ],
    ],
    tall: [
      [
        "...AA....",
        "..AAAA...",
        ".AAAAAA..",
        "AAAAAAAAA",
        "AALLLLA.A",
        "AAAAAAA.A",
        "AAAAAAAAA",
        "AAAAAAA..",
        "AAAAAAA..",
        ".AAAAA...",
      ],
    ],
  },
  // Solarized: cacti under the desert sun
  solarized: {
    small: [
      ["..A...", "..A..A", "A.A..A", "A.AAAA", "AAA...", "..A...", "..A..."],
    ],
    tall: [
      [
        "...AA...",
        "...AA...",
        "A..AA..A",
        "A..AA..A",
        "AA.AA.AA",
        ".AAAAAA.",
        "...AA...",
        "...AA...",
        "...AA...",
        "...AA...",
        "...AA...",
      ],
    ],
  },
  // Forest: mushrooms and pines
  forest: {
    small: [[".AAAA.", "AALAAA", "AAAALA", "..LL..", "..LL..", ".LLLL."]],
    tall: [
      [
        "...A...",
        "..AAA..",
        ".AAAAA.",
        "..AAA..",
        ".AAAAA.",
        "AAAAAAA",
        ".AAAAA.",
        "AAAAAAA",
        "...L...",
        "...L...",
      ],
    ],
  },
  // Rosé: roses and a rose bush
  rose: {
    small: [[".AAA.", "AALAA", "AAAAA", ".AAA.", "..L..", "LLL..", "..L.."]],
    tall: [
      [
        "..AAA....",
        ".AALAA.AA",
        ".AAAAAAAA",
        "..AAALLA.",
        "AA.L.L...",
        "AAA.LL.AA",
        ".A.LL.AAA",
        "...L..LA.",
        "..LLLLL..",
        "..LLLLL..",
      ],
    ],
  },
  // Synthwave: neon pyramids and palms
  synthwave: {
    small: [
      ["....AA....", "...ALLA...", "..ALLLLA..", ".ALLLLLLA.", "AAAAAAAAAA"],
    ],
    tall: [
      [
        "AAA..AAA",
        "A.AAAA.A",
        "..AAAA..",
        ".A.LL.A.",
        "....L...",
        "....L...",
        "...L....",
        "...L....",
        "...L....",
        "....L...",
        "...LLL..",
      ],
    ],
  },
  // Sepia: tumbleweeds rolling through the dust, and a stack of books
  sepia: {
    small: [
      [".AAAA.", "A.AA.A", "AA..AA", "A.AA.A", ".AAAA."],
      [".AAAA.", "AA..AA", "A.AA.A", "AA..AA", ".AAAA."],
    ],
    tall: [
      [
        ".AAAAAA.",
        ".LLLLLL.",
        "AAAAAAA.",
        "LLLLLLL.",
        ".AAAAAAA",
        ".LLLLLLL",
        "AAAAAAA.",
        "LLLLLLL.",
        "AAAAAAAA",
      ],
    ],
  },
};
