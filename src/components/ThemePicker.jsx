import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { BsLockFill } from "react-icons/bs";
import themes, { isUnlocked } from "../themes";
import { applyTheme, setPickerActive, setTheme } from "../store/themeSlice";

const TOOLTIP_ID = "theme-lock-tooltip";
const TOOLTIP_WIDTH = 224;

// Where the tooltip goes: left of the menu, or under the option when there
// is no room on the left (phones).
function tooltipPosition(el) {
  const rect = el.getBoundingClientRect();
  if (rect.left > TOOLTIP_WIDTH + 24) {
    return {
      placement: "left",
      top: rect.top + rect.height / 2,
      left: rect.left - TOOLTIP_WIDTH - 12,
    };
  }
  return {
    placement: "below",
    top: rect.bottom + 8,
    left: Math.max(8, rect.right - TOOLTIP_WIDTH),
  };
}

// Explains how to unlock a theme, with progress towards it.
function LockTooltip({ theme, best, position }) {
  const progress = Math.min(1, best / theme.unlockAt);
  return createPortal(
    <div
      id={TOOLTIP_ID}
      role="tooltip"
      style={{
        top: position.top,
        left: position.left,
        width: TOOLTIP_WIDTH,
        transform: position.placement === "left" ? "translateY(-50%)" : "none",
      }}
      className="fixed z-[60] pointer-events-none rounded-lg border border-third/30 bg-second px-3 py-2.5 text-sm text-fourth shadow-xl"
    >
      <p className="flex items-center gap-2 font-semibold text-fifth">
        <BsLockFill aria-hidden="true" className="text-third" />
        {theme.label} is locked
      </p>
      <p className="mt-1">
        {theme.unlockHint ??
          `Score ${theme.unlockAt} points in the runner game on the home page.`}
      </p>
      <div
        className="mt-2 h-1.5 rounded-full bg-first overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-third"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <p className="mt-1 text-xs">
        Your best: {best} / {theme.unlockAt}
      </p>
    </div>,
    document.body,
  );
}

function ThemePicker({ className = "" }) {
  const mode = useSelector((state) => state.theme.mode);
  const best = useSelector((state) => state.runner.best);
  // locked theme whose tooltip is showing: { id, ...tooltipPosition }
  const [tip, setTip] = useState(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const optionRefs = useRef([]);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  // Track hover with pointerover on the document rather than mouseleave: when
  // an option is picked the menu unmounts under the pointer and no leave event
  // fires, which left the background hidden
  useEffect(() => {
    const handleOver = (e) =>
      setHovered(Boolean(rootRef.current?.contains(e.target)));
    document.addEventListener("pointerover", handleOver);
    return () => document.removeEventListener("pointerover", handleOver);
  }, []);

  const active = open || hovered;
  useEffect(() => {
    dispatch(setPickerActive(active));
  }, [active, dispatch]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Focus the active option when the menu opens
  useEffect(() => {
    if (open) {
      const index = themes.findIndex((theme) => theme.id === mode);
      optionRefs.current[index]?.focus();
    }
  }, [open, mode]);

  // the tooltip belongs to the open menu
  useEffect(() => {
    if (!open) setTip(null);
  }, [open]);

  const showTip = (theme, el) =>
    setTip({ id: theme.id, ...tooltipPosition(el) });
  const hideTip = () => setTip(null);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const select = (id) => {
    dispatch(setTheme(id));
    close();
  };

  const handleKeyDown = (e) => {
    const index = optionRefs.current.indexOf(document.activeElement);
    const move = (to) => {
      e.preventDefault();
      optionRefs.current[(to + themes.length) % themes.length]?.focus();
    };
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") move(index + 1);
    else if (e.key === "ArrowUp") move(index - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(themes.length - 1);
    else if (e.key === "Tab") setOpen(false);
  };

  const current = themes.find((theme) => theme.id === mode) ?? themes[0];
  const CurrentIcon = current.Icon;

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Theme: ${current.label}. Change theme`}
        title="Change theme"
        className="flex items-center gap-2 p-3 rounded-lg text-third hover:text-fifth transition-colors duration-150"
      >
        <CurrentIcon size="20px" aria-hidden="true" />
        <span className="hidden lg:inline text-sm">{current.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Theme"
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{ originX: 1, originY: 0 }}
            className="absolute right-0 top-full mt-2 w-56 max-h-[70vh] overflow-y-auto p-2 rounded-xl bg-first border border-second shadow-xl z-50"
          >
            {themes.map((theme, i) => {
              const selected = theme.id === mode;
              const locked = !isUnlocked(theme, best);
              const { Icon } = theme;
              // locked: still focusable so the tooltip can be read, and a
              // click or tap shows it instead of picking the theme
              const lockProps = locked && {
                "aria-disabled": true,
                "aria-describedby":
                  tip?.id === theme.id ? TOOLTIP_ID : undefined,
                onMouseEnter: (e) => showTip(theme, e.currentTarget),
                onMouseLeave: hideTip,
                onFocus: (e) => showTip(theme, e.currentTarget),
                onBlur: hideTip,
                // show only: a tap fires mouseenter first, toggling would
                // hide it again straight away
                onClick: (e) => showTip(theme, e.currentTarget),
              };
              return (
                <li key={theme.id} className="theme-option">
                  <button
                    ref={(el) => (optionRefs.current[i] = el)}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => select(theme.id)}
                    {...lockProps}
                    className={`group relative w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-third ${
                      locked
                        ? "text-fourth/40 cursor-not-allowed focus-visible:bg-second/30"
                        : selected
                          ? "bg-second text-fifth font-semibold"
                          : "text-fourth hover:bg-second/50 focus-visible:bg-second/50"
                    }`}
                  >
                    {selected && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 inset-y-2 w-1 rounded-full bg-third"
                      />
                    )}
                    <Icon
                      size="20px"
                      aria-hidden="true"
                      className={`shrink-0 transition-all duration-150 ${
                        locked
                          ? "text-third/40 grayscale"
                          : `group-hover:text-fifth group-hover:scale-110 group-focus-visible:text-fifth ${
                              selected ? "text-fifth scale-110" : "text-third"
                            }`
                      }`}
                    />
                    <span className="flex-1">{theme.label}</span>
                    {locked && (
                      <>
                        <BsLockFill
                          size="12px"
                          aria-hidden="true"
                          className="shrink-0 text-fourth/50"
                        />
                        <span className="sr-only">
                          , locked until {theme.unlockAt} points
                        </span>
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
      {tip && (
        <LockTooltip
          theme={themes.find((theme) => theme.id === tip.id)}
          best={best}
          position={tip}
        />
      )}
    </div>
  );
}

export default ThemePicker;
