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
