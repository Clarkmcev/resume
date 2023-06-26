import React from 'react'
import motion1 from '../animation/animation'
import { motion } from "framer-motion";


function Noveo() {
  return (
    <>
    <motion.div 
    initial="hidden"
    animate="visible"
    variants={motion1}
    className="inner">
      <div className="position">IT Business Engineer <span className="company">@ Noveo Group</span></div>
      <div className="date">Sept 2019 - August 2020</div>
      <ul>
        <li className="task"> Definition of a prospecting field (Key accounts, middle market, etc.)</li>
        <li className="task">Ensure a competitive and technological monitoring</li>
        <li className="task">Development and appropriation of sales arguments related to the technical marketing</li>
        <li className="task">Ensure the customer's commercial follow-up (progress points, invoicing, etc.)</li>
        <li className="task">Negotiate and close contractual conditions and optimize margin conditions (generated revenue) for the company</li>
      </ul>
    </motion.div>
    </>
  )
}

export default Noveo