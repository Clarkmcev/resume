import React from "react";

import { motion } from "framer-motion";
import motion1 from "./animation/animation";

function About() {
  return (
    <div className="content">
      <h1>
        <span className="number mr-4">01.</span>About me
      </h1>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={motion1}
        className="flex items-center space-x-10"
      >
        <div className="max-w-xl flex-1 flex flex-col space-y-4">
          <div className="pt-10">
            Hi there, I'm Clark, I'm a Software Engineer excited about building
            and creating amazing digital products. I am a dedicated Full Stack
            developer with over 3 years of experience in designing and
            implementing scalable cloud platforms.
          </div>
          <div>
            With a strong focus on building user-friendly interfaces and smooth
            user experiences, I combine creativity and technical expertise to
            deliver robust and efficient solutions.
          </div>
          <ul>
            <div className="pb-2">
              The technologies I've been recently working with:
            </div>
            <div className="px-5 flex space-x-10">
              <div>
                <li>TypeScript</li>
                <li>Golang</li>
                <li>Python</li>
              </div>
              <div>
                <li>TailwindCSS</li>
                <li>PostgreSQL</li>
                <li>HTML/CSS</li>
              </div>
              <div>
                <li>AWS</li>
                <li>Linux</li>
                <li>React/Next/Vite</li>
              </div>
            </div>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default About;
