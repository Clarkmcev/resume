import React from 'react'
import { motion } from "framer-motion";

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };

function Introduction() {
  return (
    <div className="">
    <motion.svg
    className="bg-third intro"
      width="500"
      height="500"
      viewBox="500 500"
      initial="hidden"
      animate="visible"
    >
      <motion.line
        x1="250"
        y1="370"
        x2="360"
        y2="230"
        stroke="#ff0055"
        custom={3.5}
        variants={draw}
      />
        <motion.line
        x1="450"
        y1="370"
        x2="450"
        y2="230"
        stroke="#ff0055"
        custom={3.5}
        variants={draw}
      />
      </motion.svg>
    </div>
  )
}

export default Introduction