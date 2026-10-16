import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import scenes from "./scenes";
import sideScenes from "./SideScene";
import "./background.css";

// Animated scene in the bottom-right corner that matches the active theme
function ThemeBackground() {
  const ref = useRef(null);
  const gridRef = useRef(null);
  const mode = useSelector((state) => state.theme.mode);
  const hidden = useSelector((state) => state.theme.pickerActive);
  const Scene = scenes[mode] ?? scenes.dark;
  const SideScene = sideScenes[mode] ?? sideScenes.dark;

  // Feed the pointer position to CSS variables: --bg-x (-1..1 across the
  // screen) and --bg-lift (0..1, closeness to the corner), plus the raw
  // position for the pointer grid. Writes go straight to the elements so
  // React never re-renders.
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    let frame = null;
    const handleMove = (e) => {
      // touch and pen drags would make the scene jump around while scrolling
      if (e.pointerType !== "mouse" || frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const { innerWidth: w, innerHeight: h } = window;
        const x = (e.clientX / w) * 2 - 1;
        const distance = Math.hypot(w - e.clientX, h - e.clientY);
        const lift = Math.max(0, 1 - distance / (Math.hypot(w, h) * 0.7));
        ref.current?.style.setProperty("--bg-x", x.toFixed(3));
        ref.current?.style.setProperty("--bg-lift", lift.toFixed(3));
        gridRef.current?.style.setProperty("--px", `${e.clientX}px`);
        gridRef.current?.style.setProperty("--py", `${e.clientY}px`);
        gridRef.current?.classList.add("pointer-grid-on");
      });
    };
    const handleLeave = () => {
      ref.current?.style.setProperty("--bg-x", "0");
      ref.current?.style.setProperty("--bg-lift", "0");
      gridRef.current?.classList.remove("pointer-grid-on");
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* full-page pattern, visible only in a glow around the pointer */}
      <div
        ref={gridRef}
        aria-hidden="true"
        className={`pointer-grid pointer-grid-${scenes[mode] ? mode : "dark"} ${
          hidden ? "theme-bg-hidden" : ""
        }`}
      />
      {/* the spare strip left of the sidebar on wide screens */}
      <div
        aria-hidden="true"
        className={`side-bg ${hidden ? "theme-bg-hidden" : ""}`}
      >
        <div key={mode} className="theme-bg-scene">
          <SideScene />
        </div>
      </div>
      <div
        ref={ref}
        aria-hidden="true"
        className={`theme-bg ${hidden ? "theme-bg-hidden" : ""}`}
      >
        {/* keyed so switching themes fades the new scene in */}
        <div key={mode} className="theme-bg-scene">
          <Scene />
        </div>
      </div>
    </>
  );
}

export default ThemeBackground;
