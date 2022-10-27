import React, { useLayoutEffect } from 'react'
import { NavLink,  Outlet } from 'react-router-dom'
import { motion } from "framer-motion";


function NavBar() {
  let activeStyle = {
    color: "#77ABB7",
    textDecoration: 'none'
  };

  const boxVariant = {
    hidden: {
      position: "relative",
      opacity: 0,
      x: "-100vh",
    },
    visible: {
      opacity: 1,
    }
  }

  return (
    <>
        <div className="container">
            <div className="logo">
            </div>
            <div className="menu">
                <motion.span variants={boxVariant} initial="hidden" animate="visible" transition={{delay:0.15}}><NavLink className="link" to="home" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>Home</NavLink></motion.span>
                <motion.span variants={boxVariant} initial="hidden" animate="visible" transition={{delay:0.30}}><NavLink className="link" to="about" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>About</NavLink></motion.span>
                <motion.span variants={boxVariant} initial="hidden" animate="visible" transition={{delay:0.45}}><NavLink className="link" to="experience" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>Experience</NavLink></motion.span>
                <motion.span variants={boxVariant} initial="hidden" animate="visible" transition={{delay:0.60}}><NavLink className="link" to="projects" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>Projects</NavLink></motion.span>
                <motion.span variants={boxVariant} initial="hidden" animate="visible" transition={{delay:75}}><NavLink className="link" to="contact" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>Contact</NavLink></motion.span>
            </div>
        </div>
    <Outlet/>
    </>
  )
}

export default NavBar