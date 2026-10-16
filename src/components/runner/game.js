import { SCENERY } from "./scenery";
import { EYES, LAMP, PLAYER, ROLES, THEME_OBSTACLES } from "./sprites";

// Everything below is in world pixels; the canvas scales them up.
export const WORLD = { width: 140, height: 76, ground: 70 };

const PLAYER_X = 10;
const PLAYER_WIDTH = PLAYER.front[0].length;
const IDLE_X = Math.round((WORLD.width - PLAYER_WIDTH) / 2);
// jump physics at the start speed; see pace()
const GRAVITY = 800;
const JUMP_VELOCITY = 200;
// releasing the jump early caps the rise, for short hops
const HOP_VELOCITY = 90;
const START_SPEED = 80;
const MAX_SPEED = 300;
// px/s gained every second: top speed after about half a minute
const ACCELERATION = 7.5;
const RESTART_DELAY = 0.5;
const PX_PER_POINT = 6;
// the intro when a run starts: crouch, hop and turn, then jog off
const INTRO = { crouch: 0.2, hop: 0.45, end: 0.8 };

// Easter egg: my race bib from unnamed.jpg. Reach it and a finish arch rolls
// in; cross it and the rest of the run happens at night, by headlamp only.
export const BIB = 1074;
const ARCH = { width: 40, height: 32, banner: 10 };
// clear the trail this many points before the arch shows up
const RUNWAY = 30;
// the celebration: slow to a stop, cheer, then pick the pace back up
const FINISH = { stop: 0.5, end: 2.8 };
const NIGHT_FALL = 1.5;
const CONFETTI_ROLES = ["third", "fourth", "fifth"];

const random = (min, max) => min + Math.random() * (max - min);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

// the small obstacle sent several times, side by side
const group = (frames, count) =>
  frames.map((rows) => rows.map((row) => Array(count).fill(row).join(".")));

// What can be thrown at the player in each theme. Harder obstacles join the
// mix as the score climbs.
function obstaclePool(theme, score) {
  const set = THEME_OBSTACLES[theme] ?? THEME_OBSTACLES.dark;
  const pool = [{ frames: set.small }, { frames: group(set.small, 2) }];
  if (set.flyer) pool.push(set.flyer);
  if (score > 25) pool.push({ frames: set.tall });
  if (score > 120) pool.push({ frames: group(set.small, 3) });
  // later on, the hard ones come up more often
  if (score > 250)
    pool.push({ frames: set.tall }, { frames: group(set.small, 3) });
  return pool;
}

// Time runs faster for the jump as the game speeds up: same height, but a
// shorter hang time, so jumps stay snappy and obstacles can come closer.
const pace = (game) => Math.sqrt(game.speed / START_SPEED);
const airTime = (game) => (2 * JUMP_VELOCITY) / GRAVITY / pace(game);

export function createGame(highScore = 0, theme = "dark", finisher = false) {
  return {
    theme, // picks the obstacle set, follows the site theme
    state: "idle", // idle | starting | running | finish | over
    time: 0,
    stateTime: 0,
    x: IDLE_X,
    y: 0, // height above the ground
    vy: 0,
    speed: START_SPEED,
    distance: 0,
    obstacles: [],
    nextSpawn: 0,
    score: 0,
    highScore,
    finisher, // crossed the finish arch at least once, ever
    arch: null, // x of the finish arch while it is on screen
    finished: false, // crossed it this run
    nightTime: 0, // seconds since night fell, 0 while it is day
    confetti: [],
    banner: null, // short message over the run, see announce()
  };
}

// Back to the idle screen with another theme's obstacles, keeping the best.
export function reset(game, theme) {
  Object.assign(game, createGame(game.highScore, theme, game.finisher));
}

function setState(game, state) {
  game.state = state;
  game.stateTime = 0;
}

function start(game) {
  Object.assign(game, {
    x: IDLE_X,
    y: 0,
    vy: 0,
    speed: START_SPEED,
    distance: 0,
    obstacles: [],
    nextSpawn: WORLD.width * 0.5,
    score: 0,
    arch: null,
    finished: false,
    nightTime: 0,
    confetti: [],
    banner: null,
  });
  setState(game, "starting");
}

// Flashes a message over the run for a couple of seconds.
export function announce(game, text) {
  game.banner = { text: text.toUpperCase(), until: game.time + 2.5 };
}

// Space / tap: starts, jumps, or restarts.
export function press(game) {
  if (game.state === "idle") start(game);
  else if (game.state === "over") {
    if (game.stateTime > RESTART_DELAY) start(game);
  } else if (game.state === "running" && game.y === 0) {
    game.vy = JUMP_VELOCITY * pace(game);
  }
}

export function release(game) {
  const hop = HOP_VELOCITY * pace(game);
  if (game.state === "running" && game.vy > hop) {
    game.vy = hop;
  }
}

function spawnObstacle(game) {
  const { frames, lift = 0 } = pick(obstaclePool(game.theme, game.score));
  game.obstacles.push({
    frames,
    lift,
    x: WORLD.width,
    width: frames[0][0].length,
    height: frames[0].length,
  });
  // leave room to land and jump again; the slack shrinks as you speed up
  const minGap = game.speed * airTime(game) * 1.1 + 26;
  const slack = Math.max(12, 70 - (game.speed - START_SPEED) * 0.35);
  game.nextSpawn = random(minGap, minGap + slack);
}

function hits(game, obstacle) {
  const bottom = WORLD.ground - game.y;
  const top = bottom - PLAYER.stand.length;
  const obstacleBottom = WORLD.ground - obstacle.lift;
  const obstacleTop = obstacleBottom - obstacle.height;
  return (
    game.x + 3 < obstacle.x + obstacle.width - 1 &&
    game.x + 8 > obstacle.x + 1 &&
    bottom - 1 > obstacleTop + 1 &&
    top + 1 < obstacleBottom - 1
  );
}

// Moves the world step pixels to the left.
function scroll(game, step) {
  game.distance += step;
  game.score = Math.floor(game.distance / PX_PER_POINT);
  game.obstacles.forEach((obstacle) => (obstacle.x -= step));
  game.obstacles = game.obstacles.filter((o) => o.x + o.width > 0);
  if (game.arch !== null) {
    game.arch -= step;
    if (game.arch + ARCH.width < 0) game.arch = null;
  }
}

function fall(game, dt) {
  game.vy -= GRAVITY * pace(game) ** 2 * dt;
  game.y = Math.max(0, game.y + game.vy * dt);
  if (game.y === 0) game.vy = Math.max(0, game.vy);
}

// Points until the arch, sent now, would reach the player.
const archLead = (game) =>
  (WORLD.width + ARCH.width / 2 - game.x - 5) / PX_PER_POINT;

function updateFinishLine(game) {
  if (game.finished) return;
  const lead = archLead(game);
  if (game.arch === null && game.score >= BIB - lead) game.arch = WORLD.width;
  // keep the trail clear on the way in
  if (game.score >= BIB - lead - RUNWAY) game.nextSpawn = Infinity;

  if (game.arch !== null && game.arch + ARCH.width / 2 <= game.x + 5) {
    game.finished = true;
    game.finisher = true;
    game.confetti = Array.from({ length: 40 }, () => ({
      x: game.x + 5 + random(-4, 4),
      y: WORLD.ground - 20,
      vx: random(-45, 45),
      vy: random(-100, -40),
      role: pick(CONFETTI_ROLES),
    }));
    setState(game, "finish");
  }
}

function updateConfetti(game, dt) {
  game.confetti.forEach((bit) => {
    bit.vy += 140 * dt;
    bit.x += bit.vx * dt;
    bit.y += bit.vy * dt;
  });
  game.confetti = game.confetti.filter((bit) => bit.y < WORLD.ground);
}

// Advances the game by dt seconds. Returns true when the run just ended.
export function update(game, dt) {
  game.time += dt;
  game.stateTime += dt;
  updateConfetti(game, dt);
  if (game.state === "starting" && game.stateTime >= INTRO.end) {
    setState(game, "running");
  }

  if (game.state === "finish") {
    const t = game.stateTime;
    // ease to a stop, cheer, then ease back up to the old pace
    const ease =
      t < FINISH.stop
        ? 1 - t / FINISH.stop
        : Math.max(0, (t - (FINISH.end - FINISH.stop)) / FINISH.stop);
    scroll(game, game.speed * ease * dt);
    fall(game, dt);
    if (t >= FINISH.end) {
      game.nightTime = 0.001;
      game.nextSpawn = WORLD.width * 0.6;
      setState(game, "running");
    }
    return false;
  }
  if (game.state !== "running") return false;

  // jog over from the middle to the running lane
  game.x = Math.max(PLAYER_X, game.x - 120 * dt);
  game.speed = Math.min(MAX_SPEED, game.speed + ACCELERATION * dt);
  if (game.nightTime) game.nightTime += dt;

  fall(game, dt);
  const step = game.speed * dt;
  scroll(game, step);
  updateFinishLine(game);
  if (game.state !== "running") return false;

  game.nextSpawn -= step;
  if (game.nextSpawn <= 0) spawnObstacle(game);

  if (game.obstacles.some((obstacle) => hits(game, obstacle))) {
    game.highScore = Math.max(game.highScore, game.score);
    setState(game, "over");
    return true;
  }
  return false;
}

// colors maps theme roles ("first" … "fifth") to their "R G B" channels
const fill = (colors, role, alpha = 1) => `rgb(${colors[role]} / ${alpha})`;

function drawPixels(ctx, rows, x, y, colors) {
  rows.forEach((row, dy) => {
    for (let dx = 0; dx < row.length; dx++) {
      const key = row[dx];
      if (key === ".") continue;
      ctx.fillStyle = fill(colors, ROLES[key]);
      ctx.fillRect(Math.round(x) + dx, Math.round(y) + dy, 1, 1);
    }
  });
}

const runFrame = (t) => PLAYER.run[Math.floor(t * 12) % PLAYER.run.length];

// Sprite, extra lift and which way it faces at this moment.
function playerPose(game, t) {
  const { state, stateTime } = game;
  if (state === "idle") return { rows: PLAYER.front, view: "front", lift: 0 };
  if (state === "starting") {
    if (stateTime < INTRO.crouch) {
      // knees bent: drop one leg row
      const rows = PLAYER.front.filter((_, i) => i !== 13);
      return { rows, view: "front", lift: 0 };
    }
    if (stateTime < INTRO.hop) {
      const p = (stateTime - INTRO.crouch) / (INTRO.hop - INTRO.crouch);
      const lift = Math.round(Math.sin(p * Math.PI) * 6);
      return { rows: PLAYER.jump, view: "side", lift };
    }
    return { rows: runFrame(t), view: "side", lift: 0 };
  }
  if (state === "finish") {
    const cheering =
      stateTime > FINISH.stop && stateTime < FINISH.end - FINISH.stop;
    if (cheering && game.y === 0) {
      const lift = Math.round(Math.abs(Math.sin(stateTime * 7)) * 4);
      return { rows: PLAYER.cheer, view: "front", lift };
    }
  }
  if (state === "over") return { rows: PLAYER.stand, view: "side", lift: 0 };
  if (game.y > 0) return { rows: PLAYER.jump, view: "side", lift: 0 };
  return { rows: runFrame(t), view: "side", lift: 0 };
}

const playerTop = (game, rows, lift) =>
  Math.round(WORLD.ground - game.y - lift - rows.length);

// Headlamp light cone, from the lamp down onto the trail ahead.
function beamPath(ctx, game) {
  const x = Math.round(game.x) + LAMP.x;
  const y = playerTop(game, PLAYER.stand, 0) + LAMP.y;
  ctx.moveTo(x, y);
  ctx.lineTo(WORLD.width, y - 8);
  ctx.lineTo(WORLD.width, WORLD.ground + 2);
  ctx.lineTo(x + 18, WORLD.ground + 2);
  ctx.closePath();
  return x;
}

// The headlamp only comes on for the night stage, after the finish arch.
function drawBeam(ctx, game, colors) {
  if (game.state !== "running" || !game.nightTime) return;
  ctx.beginPath();
  const x = beamPath(ctx, game);
  const beam = ctx.createLinearGradient(x, 0, WORLD.width, 0);
  beam.addColorStop(0, fill(colors, "fourth", 0.3));
  beam.addColorStop(1, fill(colors, "fourth", 0));
  ctx.fillStyle = beam;
  ctx.fill();
}

// After the finish: darkness everywhere but the headlamp beam.
function drawNight(ctx, game, colors) {
  if (!game.nightTime) return;
  const alpha = 0.94 * Math.min(1, game.nightTime / NIGHT_FALL);
  ctx.fillStyle = fill(colors, "first", alpha);
  ctx.beginPath();
  ctx.rect(0, 0, WORLD.width, WORLD.height);
  if (game.state === "running") beamPath(ctx, game);
  ctx.fill("evenodd");
  // a faint trail line to run on
  ctx.fillStyle = fill(colors, "fourth", 0.25);
  ctx.fillRect(0, WORLD.ground, WORLD.width, 1);
}

// how strongly the scenery shows: far layer, nearer layers, sky
const SCENERY_ALPHA = { far: 0.12, near: 0.22, sky: 0.16 };

function drawRuns(ctx, runs, x0, y0, colors, alpha) {
  runs.forEach(({ x, y, length, key }) => {
    ctx.fillStyle = fill(colors, key === "+" ? "fifth" : "third", alpha);
    ctx.fillRect(x0 + x, y0 + y, length, 1);
  });
}

// Faint parallax scenery for the theme, only while a run is on: it fades in
// with the start animation and stays behind the game over screen.
function drawScenery(ctx, game, colors) {
  if (game.state === "idle") return;
  const scene = SCENERY[game.theme] ?? SCENERY.dark;
  const fade =
    game.state === "starting" ? Math.min(1, game.stateTime / INTRO.end) : 1;

  if (scene.sky) {
    const { rows, x, y, runs } = scene.sky;
    drawRuns(
      ctx,
      runs,
      x,
      y - rows.length / 2,
      colors,
      SCENERY_ALPHA.sky * fade,
    );
  }
  scene.layers.forEach((layer, i) => {
    const alpha = (i === 0 ? SCENERY_ALPHA.far : SCENERY_ALPHA.near) * fade;
    const top = WORLD.ground - (layer.lift ?? 0) - layer.height;
    const offset = Math.round(game.distance * layer.speed) % layer.width;
    for (let x = -offset; x < WORLD.width; x += layer.width) {
      drawRuns(ctx, layer.runs, x, top, colors, alpha);
    }
  });
}

// a puff of dust kicked up by the hop at the start
function drawDust(ctx, game, colors) {
  if (game.state !== "starting" || game.stateTime < INTRO.crouch) return;
  const p = (game.stateTime - INTRO.crouch) / (INTRO.end - INTRO.crouch);
  if (p > 0.8) return;
  const spread = Math.round(2 + p * 8);
  const y = WORLD.ground - 1 - Math.round(p * 3);
  const left = Math.round(game.x) + 4 - spread;
  const right = Math.round(game.x) + 5 + spread;
  ctx.fillStyle = fill(colors, "fourth", 1 - p);
  ctx.fillRect(left, y, 1, 1);
  ctx.fillRect(left + 1, y + 1, 1, 1);
  ctx.fillRect(right, y, 1, 1);
  ctx.fillRect(right - 1, y + 1, 1, 1);
}

// Two posts and a banner with the bib number.
function drawArch(ctx, game, colors) {
  if (game.arch === null) return;
  const x = Math.round(game.arch);
  const top = WORLD.ground - ARCH.height;
  ctx.fillStyle = fill(colors, "third");
  ctx.fillRect(x, top, 2, ARCH.height);
  ctx.fillRect(x + ARCH.width - 2, top, 2, ARCH.height);
  ctx.fillRect(x, top, ARCH.width, ARCH.banner);
  // checkered finish strip under the banner
  ctx.fillStyle = fill(colors, "fifth");
  for (let i = 0; i < ARCH.width; i += 2) {
    ctx.fillRect(x + i, top + ARCH.banner + ((i / 2) % 2), 1, 1);
  }
  ctx.fillStyle = fill(colors, "first");
  ctx.textAlign = "center";
  ctx.fillText(String(BIB), x + ARCH.width / 2, top + 1);
}

function drawConfetti(ctx, game, colors) {
  game.confetti.forEach((bit, i) => {
    ctx.fillStyle = fill(colors, bit.role);
    // flutter: alternate between a flat and an upright piece
    const flat = Math.floor(game.time * 10 + i) % 2;
    ctx.fillRect(
      Math.round(bit.x),
      Math.round(bit.y),
      flat ? 2 : 1,
      flat ? 1 : 2,
    );
  });
}

function drawPlayer(ctx, game, colors, animate) {
  const t = animate ? game.time : 0;
  const { rows, view, lift } = playerPose(game, t);
  const x = Math.round(game.x);
  const y = playerTop(game, rows, lift);

  drawPixels(ctx, rows, x, y, colors);
  // blink every 4s; eyes stay shut after a crash
  if (game.state === "over" || t % 4 > 3.75) {
    ctx.fillStyle = fill(colors, ROLES.S);
    EYES[view].forEach(([ex, ey]) => ctx.fillRect(x + ex, y + ey, 1, 1));
  }
}

function drawGround(ctx, game, colors) {
  ctx.fillStyle = fill(colors, "fourth");
  ctx.fillRect(0, WORLD.ground, WORLD.width, 1);
  // pebbles scrolling with the run
  const offset = game.distance % 30;
  for (let i = 0; i < WORLD.width / 30 + 1; i++) {
    const x = Math.round(i * 30 - offset);
    ctx.fillRect(x + 5, WORLD.ground + 2, 2, 1);
    ctx.fillRect(x + 19, WORLD.ground + 4, 1, 1);
  }
}

function drawText(ctx, text, x, y, color, align = "center") {
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

const pad = (n) => String(n).padStart(5, "0");

export function draw(ctx, game, { colors, animate, touch }) {
  ctx.clearRect(0, 0, WORLD.width, WORLD.height);
  ctx.font = "8px pixel, monospace";
  ctx.textBaseline = "top";
  const text = fill(colors, "fifth");
  const muted = fill(colors, "fourth");

  drawScenery(ctx, game, colors);
  drawBeam(ctx, game, colors);
  drawGround(ctx, game, colors);
  drawArch(ctx, game, colors);
  game.obstacles.forEach((o) => {
    const frame = o.frames[Math.floor(game.time * 6) % o.frames.length];
    drawPixels(ctx, frame, o.x, WORLD.ground - o.lift - o.height, colors);
  });
  drawNight(ctx, game, colors);
  drawDust(ctx, game, colors);
  drawPlayer(ctx, game, colors, animate);
  drawConfetti(ctx, game, colors);

  const action = touch ? "TAP" : "SPACE";
  const center = WORLD.width / 2;
  // the finisher badge, earned once and kept
  if (game.finisher) drawText(ctx, `#${BIB}`, 3, 3, muted, "left");
  if (game.state === "idle") {
    drawText(ctx, `${action} TO JUMP`, center, 16, text);
  } else if (game.state !== "starting") {
    const high = game.highScore ? `HI ${pad(game.highScore)}  ` : "";
    drawText(ctx, high + pad(game.score), WORLD.width - 3, 3, text, "right");
  }
  if (game.state === "finish" && game.stateTime > FINISH.stop) {
    drawText(ctx, "FINISHER", center, 16, text);
    drawText(ctx, `BIB ${BIB}`, center, 28, muted);
  }
  if (game.banner && game.time < game.banner.until) {
    // blink for the first second to catch the eye
    const age = game.banner.until - game.time;
    if (age < 1.5 || Math.floor(game.time * 6) % 2) {
      drawText(ctx, game.banner.text, center, 40, text);
    }
  }
  if (game.state === "over") {
    drawText(ctx, "GAME OVER", center, 16, text);
    drawText(ctx, `${action} TO RETRY`, center, 28, muted);
  }
}
