import React, { useState, useRef, useLayoutEffect } from 'react'
import { motion } from "framer-motion";
import { useEffect } from 'react';


function HomePage() {
  const [isShowed, setIsShowed] = useState(false)

  const boxVariant = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
        staggerChildren: 0.8,
        delayChildren:0.2
      }
    }
  }

  const childrenVariant = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
    }
  }

    return (
      <>
        <motion.div variants={boxVariant} animate="visible" initial="hidden" className="content">
            <motion.p className="text-third" variant={childrenVariant}>Greetings passenger, my name is</motion.p>
            <motion.div className="text-8xl font-bold" variant={childrenVariant}>Clark McEvoy<span className="text-third">.</span></motion.div>
            <div className="text-8xl font-light text-third">Frontend Developer<span className="text-third"></span></div>
            <div className="paragraph">
              <div>I build solid and scalable products with great user experiences.</div>
              <div>Software engineer from Colmar, France.</div>
            </div>
            <div className="">
            <a href="https://drive.google.com/file/d/1G9vvXh_cUNvC8njC5TYwYGCtC3LwAqg-/view?usp=sharing"><button className="button1">Resume</button></a>
            </div>
        </motion.div>
        </>
      )
}

export default HomePage