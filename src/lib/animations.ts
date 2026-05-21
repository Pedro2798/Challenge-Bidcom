import type { Variants, Transition } from "framer-motion";

export const springy: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 22,
  mass: 0.6,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: springy },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 20 },
  },
};

export const staggerGrid: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const cardHover: Variants = {
  rest: { y: 0, rotate: 0, scale: 1 },
  hover: {
    y: -8,
    rotate: -0.8,
    scale: 1.015,
    transition: { type: "spring", stiffness: 320, damping: 18 },
  },
};
