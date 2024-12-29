import React from "react";
import motion1 from "../animation/animation";
import { motion } from "framer-motion";

function GBS() {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={motion1}
        className="inner"
      >
        <div className="position">
          Full Stack Developer
          <span className="company ml-2">@German Bionic Systems</span>
        </div>
        <div className="date">Oct 2023 - Present</div>
        <ul className="flex flex-col space-y-2">
          <li className="task">
            German Bionic Systems cloud platform developer.
          </li>
          <li className="task">
            New features development and continuous maintenance/improvements of
            the platform.
          </li>
          <li className="task">
            Framework's migration to modernize the platform's infrastructure.
          </li>
        </ul>
      </motion.div>
    </>
  );
}

export default GBS;
