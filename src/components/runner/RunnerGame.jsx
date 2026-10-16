import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recordScore, saveBestScore } from "../../store/runnerSlice";
import { unlockedBetween } from "../../themes";
import {
  WORLD,
  announce,
  createGame,
  draw,
  press,
  release,
  reset,
  update,
} from "./game";

const FINISHER_KEY = "runner-finisher";
const JUMP_KEYS = new Set(["Space", "ArrowUp", "KeyW"]);
// typing in these keeps Space to itself
const TEXT_FIELDS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

const load = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, String(value));
  } catch (e) {
    // storage unavailable, progress just won't stick
  }
};

const ROLE_NAMES = ["first", "second", "third", "fourth", "fifth"];

// "R G B" channels of each theme colour, keyed by role
const readColors = () => {
  const style = getComputedStyle(document.documentElement);
  return Object.fromEntries(
    ROLE_NAMES.map((role) => [
      role,
      style.getPropertyValue(`--color-${role}`).trim(),
    ]),
  );
};

// A tiny endless runner starring the pixel-art me: Space, ↑ or a tap jumps
// over the theme's obstacles, holding it jumps higher.
function RunnerGame({ className = "" }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const colorsRef = useRef(null);
  const theme = useSelector((state) => state.theme.mode);
  const best = useSelector((state) => state.runner.best);
  const dispatch = useDispatch();
  // best score the store knows about, compared against every frame
  const bestRef = useRef(best);

  if (!gameRef.current) {
    gameRef.current = createGame(best, theme, load(FINISHER_KEY) === "true");
  }

  // a new theme brings new obstacles, so start over from the idle screen;
  // the theme attribute is applied in an effect, so read colours a frame later
  useEffect(() => {
    reset(gameRef.current, theme);
    const id = requestAnimationFrame(() => {
      colorsRef.current = readColors();
    });
    return () => cancelAnimationFrame(id);
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const game = gameRef.current;
    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const touch = window.matchMedia?.("(pointer: coarse)").matches;
    let visible = true;
    let frame;
    let last;

    // render at a whole multiple of the world size so pixels stay square
    const resize = () => {
      const scale = Math.max(
        1,
        Math.round(
          (canvas.clientWidth * window.devicePixelRatio) / WORLD.width,
        ),
      );
      canvas.width = WORLD.width * scale;
      canvas.height = WORLD.height * scale;
    };

    const tick = (now) => {
      const dt = last === undefined ? 0 : Math.min((now - last) / 1000, 0.05);
      last = now;
      const wasFinisher = game.finisher;
      const ended = update(game, dt);
      if (game.finisher && !wasFinisher) save(FINISHER_KEY, true);

      // passing an unlock score counts straight away, mid-run, so the theme
      // picker opens up the theme without waiting for the crash
      const unlocked = unlockedBetween(bestRef.current, game.score);
      unlocked.forEach((t) => announce(game, `UNLOCKED ${t.label}`));
      if (unlocked.length || (ended && game.score > bestRef.current)) {
        bestRef.current = game.score;
        saveBestScore(game.score);
        dispatch(recordScore(game.score));
      }
      colorsRef.current ??= readColors();
      ctx.setTransform(
        canvas.width / WORLD.width,
        0,
        0,
        canvas.width / WORLD.width,
        0,
        0,
      );
      ctx.imageSmoothingEnabled = false;
      draw(ctx, game, {
        colors: colorsRef.current,
        animate: !reducedMotion,
        touch,
      });
      frame = visible ? requestAnimationFrame(tick) : undefined;
    };

    const onKeyDown = (event) => {
      if (!JUMP_KEYS.has(event.code) || !visible) return;
      if (TEXT_FIELDS.has(event.target.tagName)) return;
      if (event.target.isContentEditable) return;
      event.preventDefault();
      // a button or link still focused from a click (theme picker, nav)
      // would otherwise be activated by the Space keyup
      if (event.target !== document.body) event.target.blur?.();
      if (!event.repeat) press(game);
    };
    const onKeyUp = (event) => {
      if (JUMP_KEYS.has(event.code)) release(game);
    };

    // pause (without losing the run) while scrolled out of view
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && frame === undefined) {
        last = undefined;
        frame = requestAnimationFrame(tick);
      }
    });
    const resizer = new ResizeObserver(resize);

    observer.observe(canvas);
    resizer.observe(canvas);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    resize();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [dispatch]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full touch-manipulation select-none cursor-pointer ${className}`}
      style={{
        aspectRatio: `${WORLD.width} / ${WORLD.height}`,
        imageRendering: "pixelated",
      }}
      role="img"
      aria-label="Mini runner game starring a pixel-art Clark. Press space or tap to jump over the obstacles."
      onPointerDown={(event) => {
        event.preventDefault();
        press(gameRef.current);
      }}
      onPointerUp={() => release(gameRef.current)}
      onPointerLeave={() => release(gameRef.current)}
    />
  );
}

export default RunnerGame;
