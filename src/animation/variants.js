export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideInLeft = {
  hidden: { position: "relative", opacity: 0, x: "-100vh" },
  visible: { opacity: 1, x: 0 },
};

// Soft deceleration shared by the content entrances
const easeOut = [0.22, 1, 0.36, 1];

// Parent that reveals its children (which use the variants below) one after
// another. Children inherit `hidden`/`visible` from it, so the parent's
// `initial={false}` on a repeat visit renders them all in place.
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const rise = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export const slideRight = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOut } },
};

export const pop = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: easeOut },
  },
};
