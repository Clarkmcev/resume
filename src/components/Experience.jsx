import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import motion1 from "./animation/animation";

function Experience() {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    setSelectedTab(0);
  }, []);

  let activeStyle = {
    color: "#77ABB7",
    textDecoration: "none",
  };

  return (
    <>
      <div className="content">
        <h1>
          <span className="number mr-4">02.</span>Experience
        </h1>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={motion1}
          className="navbarxp"
        >
          <NavLink
            className="xpitem"
            onClick={() => {
              setSelectedTab(0);
            }}
            to="sg"
            style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: "none" }
            }
          >
            Société Générale
          </NavLink>
          <NavLink
            className="xpitem"
            onClick={() => {
              setSelectedTab(300);
            }}
            to="airbus"
            style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: "none" }
            }
          >
            Airbus
          </NavLink>
          <NavLink
            className="xpitem"
            onClick={() => {
              setSelectedTab(180);
            }}
            to="gbs"
            style={({ isActive }) =>
              isActive ? activeStyle : { textDecoration: "none" }
            }
          >
            German Bionic Systems
          </NavLink>
        </motion.div>
        <motion.div
          animate={{ x: selectedTab, scaleX: 1 }}
          className="underline"
          layoutId="underline"
        />
        <motion.div initial="hidden" animate="visible" variants={motion1}>
          <Outlet />
        </motion.div>
      </div>
    </>
  );
}

export default Experience;
