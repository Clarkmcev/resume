import React from 'react'
import { BsGithub, BsLinkedin, BsTwitter, BsFacebook, BsInstagram } from 'react-icons/bs';
import { SiCodewars } from 'react-icons/si';
import { motion } from "framer-motion";
import SideBarRow from './SideBarRow';

function SideBar() {
  const boxVariant = {
    hidden: {
      position: "relative",
      opacity: 0,
      x: "-100vh",
    },
    visible: {
      opacity: 1,
      x: 10,
    }
  }
    

  return (
      <div className="text-third flex flex-col h-full space-y-6 mt-10 bg-red-200" >
          <motion.a variants={boxVariant} initial="hidden" animate="visible" transition={{delay:1.80, bounce: 1}} href="https://www.linkedin.com/in/clark-mcevoy-904378150/"><BsLinkedin size={"32px"} className="link mx-auto"/></motion.a>
          <motion.a variants={boxVariant} initial="hidden" animate="visible" transition={{delay:1.85, bounce: 0.25 }} href="https://github.com/Clarkmcev"><BsGithub size={"32px"} className="link mx-auto"/></motion.a>
          <motion.a variants={boxVariant} initial="hidden" animate="visible" transition={{delay:1.90, bounce: 0.25}} href="https://twitter.com/clarkmcev"><BsTwitter size={"32px"} className="link mx-auto"/></motion.a>
          <motion.a variants={boxVariant} initial="hidden" animate="visible" transition={{delay:1.95, bounce: 0.25}} href="https://www.facebook.com/clark.mcevoy.5/"><BsFacebook size={"32px"} className="link mx-auto"/></motion.a>
          <motion.a variants={boxVariant} initial="hidden" animate="visible" transition={{delay:2.00, bounce: 0.25}} href="instagram"><BsInstagram size={"32px"} className="link mx-auto"/></motion.a>
          <motion.a variants={boxVariant} initial="hidden" animate="visible" transition={{delay:2.05, bounce: 0.25}} href="https://www.codewars.com/users/ClarkMC"><SiCodewars size={"32px"} className="link mx-auto"/></motion.a>
    </div>
  )
}

export default SideBar