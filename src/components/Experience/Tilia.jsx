import React from 'react'
import motion1 from '../animation/animation'
import { motion } from "framer-motion";


function tilia() {
  return (
    <>
    <motion.div 
    initial="hidden"
    animate="visible"
    variants={motion1}
    className="inner">
      <div className="position">Project Manager Assistant <span className="company">@ Tilia</span></div>
      <div className="date">March 2018 - August 2018</div>
      <ul>
        <li className="task">Monitoring and evaluation of energy needs in a german city</li>
        <li className="task">Monitored the delivery of the new website of the company</li>
        <li className="task">Community energy transition strategies and action plans</li>
      </ul>
    </motion.div>
    </>
  )
}

export default tilia