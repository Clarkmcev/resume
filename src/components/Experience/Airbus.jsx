import React from "react";
import motion1 from "../animation/animation";
import { motion } from "framer-motion";

function Airbus() {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={motion1}
        className="inner"
      >
        <div className="position">
          Full Stack Developer <span className="company">@Airbus</span>
        </div>
        <div className="date">Jan 2023 - Sept 2023</div>
        <ul className="flex flex-col space-y-2">
          <li className="task">
            Contributed to the development of an AI-Driven costing tool for
            aircraft parts, optimizing cost analysis and forecasting for parts
            in active use.
          </li>
          <li className="task">
            Developed features and solutions to improve the web application.
          </li>
          <li className="task">
            Legacy code handover, design modernization and deployment onto
            Airbus Infrastructure.
          </li>
          <li className="task">
            Worked as a productive and positive team member to design, code,
            test, report, and debug operations.
          </li>
        </ul>
      </motion.div>
    </>
  );
}

export default Airbus;
