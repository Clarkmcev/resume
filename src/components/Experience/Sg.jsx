import React from "react";
import motion1 from "../animation/animation";
import { motion } from "framer-motion";

function sg() {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={motion1}
        className="inner"
      >
        <div className="position">
          Software Engineer - Middle Office
          <span className="company ml-2">
            @Sociéte Générale Corporate and Investment Banking{" "}
          </span>
        </div>
        <div className="date">July 2021 - December 2022</div>
        <ul className="flex flex-col space-y-2">
          <li className="task">
            Development, automation and maintenance of automated trading
            processes (Python, SQL, VBA)
          </li>
          <li className="task">
            Coordination of instrument setup processes for financial products
            (ETFs, Funds, Stocks, Derivatives)
          </li>
          <li className="task">
            Analysis of corporate action (dividends payments, stock-splits,
            spin-offs, etc)
          </li>
          <li className="task">
            Support of trading teams with FBI queries and requests related to
            static databases.
          </li>
          <li className="task">Testing of new features/processes</li>
        </ul>
      </motion.div>
    </>
  );
}

export default sg;
