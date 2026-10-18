import React, { useEffect, useRef } from "react";
import { range, seeded } from "./random";

const TAU = Math.PI * 2;

// Sideways offset of a plume at height v (0 bottom .. 1 top) and time t. The
// argument grows with height and shrinks with time, so the zigzags travel up
// the line instead of the line just sliding upward. A second, faster sine
// keeps the bends irregular.
function waveX(p, v, t, shift = 0) {
  const a = v * p.waves * TAU - t * p.speed + p.phase + shift;
  const zig = Math.sin(a) + 0.35 * Math.sin(a * 2.3 + p.phase * 1.7);
  const lean = Math.sin(t * 0.15 + p.phase) * 0.6 * v;
  return (zig * (0.15 + v) + lean) * p.amp;
}

function makePlumes(seed, plumes) {
  const rand = seeded(seed);
  return plumes.map((p) => ({
    ...p,
    waves: range(rand, p.waves ?? [1.6, 2.4]),
    speed: range(rand, p.speed ?? [1.4, 2.2]),
    phase: rand() * TAU,
    puffs: [],
    nextPuff: rand(),
  }));
}

// Canvas smoke: each plume is a few strands of a wavy ribbon plus soft puffs
// that ride the same wave, widen and fade as they climb. Colour is the
// canvas's currentColor, so it follows the theme like the CSS scenes.
//   plumes: [{ x: 0..1 across, amp: sideways px, reach: 0..1 of the height,
//              width: base line px, alpha: peak opacity }]
function Smoke({ seed = 1, plumes, className = "", blur = 4 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = makePlumes(seed, plumes);
    let w = 0;
    let h = 0;
    let color = "";
    let frame = null;
    let last = performance.now();
    let t = range(seeded(seed + 1), [0, 100]);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      color = getComputedStyle(canvas).color;
    };

    const drawStrand = (p, shift, width, alpha) => {
      const steps = 48;
      const reach = p.reach * h;
      let px = p.x * w + waveX(p, 0, t, shift);
      let py = h;
      for (let i = 1; i <= steps; i++) {
        const v = i / steps;
        const x = p.x * w + waveX(p, v, t, shift);
        const y = h - v * reach;
        // fade in just above the source, out toward the top
        const fade = Math.min(1, v / 0.12) * (1 - v) ** 1.6;
        ctx.globalAlpha = alpha * fade;
        ctx.lineWidth = width * (1 + v * 2.5);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
        px = x;
        py = y;
      }
    };

    const drawPuffs = (p, dt) => {
      p.nextPuff -= dt;
      if (p.nextPuff <= 0) {
        p.nextPuff = 0.35 + Math.random() * 0.5;
        p.puffs.push({ v: 0, jitter: (Math.random() - 0.5) * 0.8, rise: 0.09 + Math.random() * 0.05 });
      }
      p.puffs = p.puffs.filter((puff) => {
        puff.v += puff.rise * dt;
        if (puff.v >= 1) return false;
        const x = p.x * w + waveX(p, puff.v, t, puff.jitter);
        const y = h - puff.v * p.reach * h;
        const r = p.width * (1.5 + puff.v * 7);
        const fade = Math.min(1, puff.v / 0.1) * (1 - puff.v) ** 2;
        ctx.globalAlpha = p.alpha * 0.5 * fade;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        ctx.fill();
        return true;
      });
    };

    const render = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineCap = "round";
      ctx.filter = `blur(${blur}px)`;
      for (const p of state) {
        drawPuffs(p, dt);
        // a wide faint strand under two thinner, slightly out-of-phase ones
        drawStrand(p, 0, p.width * 2.2, p.alpha * 0.45);
        drawStrand(p, 0.5, p.width, p.alpha);
        drawStrand(p, -0.6, p.width * 0.7, p.alpha * 0.8);
      }
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    render(last);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [seed, plumes, blur]);

  return <canvas ref={ref} className={`smoke-canvas ${className}`} />;
}

export default Smoke;
