import React from 'react'
import motion1 from '../animation/animation'
import { motion } from "framer-motion";


function sg() {
  return (
    <>
    <motion.div 
    initial="hidden"
    animate="visible"
    variants={motion1}
    className="inner">
      <div className="position">IT Trading Analyst <span className="company">@ Sociéte Générale</span></div>
      <div className="date">July 2021 - June 2022</div>
      <ul>
        <li className="task">Coordination of instrument setup processes for financial products (ETFs, Funds, Stocks, Derivatives)</li>
        <li className="task">Improvement, automation and managing of processes (Python, Sql)</li>
        <li className="task">Analysis of corporate action (dividends payments, stock-splits, spin-offs, etc)</li>
        <li className="task">Support of trading teams with FBI queries and requests related to static databases</li>
        <li className="task">Testing of new features/processes</li>
      </ul>
    </motion.div>
    </>
  )
}

export default sg