import React from 'react'
import motion1 from '../animation/animation'
import { motion } from "framer-motion";


function Actemium() {
  return (
    <>
    <motion.div 
    initial="hidden"
    animate="visible"
    variants={motion1}
    className="inner">
      <div className="position">Creative Intern <span className="company">@ Actemium</span></div>
      <div className="date">April 2016 - August 2016</div>
      <ul>
        <li className="task">Developed a marketing video for an internal tool</li>
        <li className="task">Participated in some development of new features of their website</li>
      </ul>
    </motion.div>
    </>
  )
}

export default Actemium