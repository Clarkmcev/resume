import React from 'react'
import motion1 from './animation/animation'
import { motion } from "framer-motion";
import Text from './Text';


function Contact() {
  return (
    <div className="content">
      <h1><span className="number">04.</span>Contact</h1>
        <motion.div 
        initial="hidden"
        animate="visible"
        variants={motion1}
        className="paragraph contact">
          Looking to kick off my career in software development, I'm aiming for a <span className="text-white">Frontend</span> or <span className="text-white">Fullstack</span> Developer position with a high focus on Frontend, to grow within a company and improve my skills.
          I'm therefore open for any opportunities that may come to me. Feel free to send me a mail, cheers!
        </motion.div>
        <div className="text-center">
        <a href="mailto:mcevoyclark@gmail.com"><button className="button1 text-center float-left">Contact me</button></a>
        </div>
    </div>
  )
}

export default Contact