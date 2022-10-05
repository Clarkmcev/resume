import React from 'react'
import { motion } from "framer-motion";

function Text() {
    const line1 = "Hi there, my name is Clark."
    const line2 = "I love playing music and sing in the rain."

    const sentence = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                staggerChildren: 0.08,
            }
        }
    }

    const letter = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0
            }
        }
    }

  return (
    <div className="terminal">
    <motion.div variants={sentence} initial="hidden" animate="visible">
    <div>
        {line1.split("").map((char,i) => {
            return (<motion.span key={char + "-" + i} variants={letter}>{char}</motion.span>)
        })}
    </div>
    </motion.div>
    </div>
  )
}

export default Text