import React, { useState, useRef, useLayoutEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { motion } from "framer-motion";
import motion1 from './animation/animation'


function Experience() {
  const [selectedTab, setSelectedTab] = useState(0)

    let activeStyle = {
      color: "#77ABB7",
      textDecoration: 'none',
    };

  return (
    <>
      <div className="content">
        <h1><span className="number">02.</span>Experience</h1>
        <motion.div 
        initial="hidden"
        animate="visible"
        variants={motion1}
        className="navbarxp">
          <NavLink className="xpitem" onClick={()=>{setSelectedTab(0)}} to="sg" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>Société Générale</NavLink>
          <NavLink className="xpitem" onClick={()=>{setSelectedTab(180)}} to="noveo" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>Noveo Group</NavLink>
          <NavLink className="xpitem" onClick={()=>{setSelectedTab(300)}} to="tilia" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>Tilia</NavLink>
          <NavLink className="xpitem" onClick={()=>{setSelectedTab(390)}} to="actemium" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>Actemium</NavLink>
        </motion.div>
        <motion.div animate={{x:selectedTab, scaleX: 1}}className="underline" layoutId="underline" />
        <motion.div
        initial="hidden"
        animate="visible"
        variants={motion1}>
        <Outlet/>
      </motion.div>
      </div>
    </>
  )
}

export default Experience