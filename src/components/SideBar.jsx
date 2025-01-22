import React, { useEffect, useState } from "react";
import {
  BsGithub,
  BsLinkedin,
  BsTwitter,
  BsFacebook,
  BsInstagram,
} from "react-icons/bs";
import { SiCodewars } from "react-icons/si";
import { motion } from "framer-motion";

function SideBar() {
  const [animate, setAnimate] = useState(false);

  const boxVariant = {
    hidden: {
      position: "relative",
      opacity: 0,
      x: "-100vh",
    },
    visible: {
      opacity: 1,
      x: 10,
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 2000);
  }, []);

  return (
    <div className="flex space-x-8 h-full bg-first text-third">
      <div className="text-third flex flex-col h-full space-y-6 ml-10 mt-10">
        <motion.a
          variants={boxVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.8, bounce: 1 }}
          href="https://www.linkedin.com/in/clark-mcevoy-904378150/"
        >
          <BsLinkedin size={"32px"} className="link mx-auto" />
        </motion.a>
        <motion.a
          variants={boxVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.85, bounce: 0.25 }}
          href="https://github.com/Clarkmcev"
        >
          <BsGithub size={"32px"} className="link mx-auto" />
        </motion.a>
        <motion.a
          variants={boxVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.9, bounce: 0.25 }}
          href="https://twitter.com/clarkmcev"
        >
          <BsTwitter size={"32px"} className="link mx-auto" />
        </motion.a>
        <motion.a
          variants={boxVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.95, bounce: 0.25 }}
          href="https://www.facebook.com/clark.mcevoy.5/"
        >
          <BsFacebook size={"32px"} className="link mx-auto" />
        </motion.a>
        <motion.a
          variants={boxVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.0, bounce: 0.25 }}
          href="instagram"
        >
          <BsInstagram size={"32px"} className="link mx-auto" />
        </motion.a>
        <motion.a
          variants={boxVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.05, bounce: 0.25 }}
          href="https://www.codewars.com/users/ClarkMC"
        >
          <SiCodewars size={"32px"} className="link mx-auto" />
        </motion.a>
      </div>
      <vr
        className={`border border-third/20 duration-500 transition-animation ${
          animate ? "h-full" : "h-0"
        }`}
      />
    </div>
  );
}

export default SideBar;
