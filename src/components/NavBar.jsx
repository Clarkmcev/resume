import React, { useLayoutEffect, useRef } from 'react'
import { NavLink,  Outlet } from 'react-router-dom'
import { motion } from "framer-motion";
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useEffect } from 'react';


function NavBar() {
  const [showNavBar, setShowNavBar] = useState(false)
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  let activeStyle = {
    color: "#ffffff",
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
      y: 0
    }
  }

  const boxLogo= {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    }
  }

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, [width])

  useEffect(() => {
    function handleResize() {
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight, showNavBar)
      setWidth(window.innerWidth)

      if (window.innerWidth > 640) {
        setShowNavBar(false)
      }
    
}
    window.addEventListener('resize', handleResize)
  },[])

  return (
    <>
        <div ref={ref} className="container">
            <motion.div className="font-pixel text-3xl text-fifth px-20 cursor-pointer" variants={boxLogo} initial="hidden" animate="visible" transition={{delay:0.15}}>
              <div>MC</div>
            </motion.div>

            <button className={showNavBar ? 'text-third' : 'text-second'} onClick={()=>setShowNavBar(!showNavBar)}>
                <GiHamburgerMenu size="50px" className="text-second m-10 items-center hover:text-third cursor-pointer sm:hidden focus:bg-third" />
            </button>
            <div className="hidden sm:inline-block my-10 text-third items-center">
                <motion.span variants={boxVariant} initial="hidden" animate="visible" transition={{delay:0.15}}><span className="font-pixel text-sm text-fifth">01.</span><NavLink className="linkNavbar p-3 rounded-lg text-lg" to="home" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>Home</NavLink></motion.span>
                <motion.span variants={boxVariant} initial="hidden" animate="visible" transition={{delay:0.30}}><span className="font-pixel text-sm text-fifth">02.</span><NavLink className="linkNavbar p-3 rounded-lg text-lg" to="about" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>About</NavLink></motion.span>
                <motion.span variants={boxVariant} initial="hidden" animate="visible" transition={{delay:0.45}}><span className="font-pixel text-sm text-fifth">03.</span><NavLink className="linkNavbar p-3 rounded-lg text-lg" to="experience" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>Experience</NavLink></motion.span>
                <motion.span variants={boxVariant} initial="hidden" animate="visible" transition={{delay:0.60}}><span className="font-pixel text-sm text-fifth">04.</span><NavLink className="linkNavbar p-3 rounded-lg text-lg" to="projects" style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: 'none' }
            }>Projects</NavLink></motion.span>
            </div>
        </div>
        {showNavBar &&
            <div className="flex justify-between absolute bg-first right-0" >
              <div></div>
              <div className="flex flex-col space-y-2">
                <NavLink onClick={()=>setShowNavBar(!showNavBar)} className="link hover:bg-second p-3 rounded-lg" to="home" style={({ isActive }) =>
                isActive ? activeStyle : { textDecoration: 'none' }
              }>Home</NavLink>
                <NavLink onClick={()=>setShowNavBar(!showNavBar)} className="link hover:bg-second p-3 rounded-lg" to="about" style={({ isActive }) =>
                isActive ? activeStyle : { textDecoration: 'none' }
              }>About</NavLink>
              <NavLink onClick={()=>setShowNavBar(!showNavBar)} className="link hover:bg-second p-3 rounded-lg" to="experience" style={({ isActive }) =>
                isActive ? activeStyle : { textDecoration: 'none' }
              }>Experience</NavLink>
              <NavLink onClick={()=>setShowNavBar(!showNavBar)} className="link hover:bg-second p-3 rounded-lg" to="contact" style={({ isActive }) =>
                isActive ? activeStyle : { textDecoration: 'none' }
              }>Contact</NavLink>
              </div>
            </div>}

    <Outlet/>
    </>
  )
}

export default NavBar