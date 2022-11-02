import React, { useState, useRef, useLayoutEffect } from 'react'
import { motion } from "framer-motion";
import { useEffect } from 'react';


function HomePage() {
  const boxVariant = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
    }
  }

    return (
      <>
        <div className="content">
            <motion.p className="text-third" variants={boxVariant} initial="hidden" animate="visible" transition={{delay:0.90}}>Greetings passenger, my name is</motion.p>
            <motion.div className="text-8xl font-bold"  variants={boxVariant} initial="hidden" animate="visible" transition={{delay:1.05}}>Clark McEvoy<span className="text-third">.</span></motion.div>
            <motion.div className="text-8xl font-light text-third" variants={boxVariant} initial="hidden" animate="visible" transition={{delay:1.20}}>Frontend Developer<span className="text-third"></span></motion.div>
            <div className="paragraph">
              <motion.div variants={boxVariant} initial="hidden" animate="visible" transition={{delay:1.45}}>I build solid and scalable products with great user experiences.</motion.div>
              <motion.div variants={boxVariant} initial="hidden" animate="visible" transition={{delay:1.60}}>Software engineer from Colmar, France.</motion.div>
            </div>
            <motion.div className="" variants={boxVariant} initial="hidden" animate="visible" transition={{delay:1.75}}>
            <a href="https://drive.google.com/file/d/1G9vvXh_cUNvC8njC5TYwYGCtC3LwAqg-/view?usp=sharing"><button className="button1">Resume</button></a>
            </motion.div>
        </div>
        </>
      )
}

export default HomePage