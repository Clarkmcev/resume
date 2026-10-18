import { useEffect } from "react";
import { motion } from "framer-motion";

// Soft deceleration shared by the content entrances
const easeOut = [0.22, 1, 0.36, 1];

// How long the intro holds before handing over to the page (ms)
const DURATION = 1900;

const NAME = "Clark McEvoy";

// Full-screen splash shown on landing: the name types itself out over a
// filling progress bar, then the curtain lifts to reveal the page. Any click
// or key press skips straight to the page.
function Intro({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, DURATION);
    window.addEventListener("keydown", onDone);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onDone);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-first cursor-pointer"
      onClick={onDone}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <motion.div
        className="flex flex-col items-center"
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-3xl sm:text-5xl font-bold text-fifth whitespace-nowrap">
          {NAME.split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.4, ease: easeOut }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
          <motion.span
            className="inline-block text-third"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [0, 1.6, 1] }}
            transition={{ delay: 0.2 + NAME.length * 0.05, duration: 0.4 }}
          >
            .
          </motion.span>
        </div>
        <div className="mt-6 h-1 w-48 sm:w-64 overflow-hidden rounded-full bg-second">
          <motion.div
            className="h-full bg-third origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DURATION / 1000 - 0.2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Intro;
