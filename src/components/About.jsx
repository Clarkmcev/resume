import React from 'react';
import { Link } from 'react-router-dom'
import profileImg from '../img/photo_clark.JPG'
import profileImg2 from '../img/png-clark.png'
import profileImg3 from '../img/clark1.png'
import { motion } from "framer-motion";
import motion1 from './animation/animation'


function About() {
  return (
    <div className="content">
      <h1><span className="number">01.</span>About me</h1>
      <motion.div 
      initial="hidden"
      animate="visible"
      variants={motion1}
      className="flex items-center space-x-5">
        <div className="max-w-7xl">
          <div className="paragraph">
            Hi there, I'm Clark, I'm a Frontend Developer excited about building and creating amazing digital products.
            I recently discovered a burning passion for web development through my former job at <a className="ref" href="https://particuliers.societegenerale.fr/" target="_blank" rel="noreferrer">Societe Generale</a> as an IT Trading Support.
          </div>
          <div className="paragraph">
            Aiming to pursue my career in Frontend development, 
            I therefore decided to pursue a Fullstack web development Bootcamp at <a className="ref" href="https://www.ironhack.com/en/remote?utm_campaign=RMTEU_France_Global_Search_Brand_EN&utm_source=google&utm_medium=cpc&utm_content=search-brand&utm_term=ironhack&gclid=CjwKCAjwtKmaBhBMEiwAyINuwAzKigo9qBI1uQweteYkRax-lhJXtgbsZfseZxbx8vT6QfjdyO00YxoCrV0QAvD_BwE" target="_blank" rel="noreferrer">Ironhack</a> to train up on the fanciest web technologies used in the current tech industry.
            As of now, my main goal si to break into the game as a Frontend developer, grow with a company and build a career on the long run.
          </div>

        </div>
        <img src={profileImg3} className="hidden md:inline-block h-80 rounded-lg profileImg cursor-pointer border-8 border-second bg-third  hover:bg-fourth transition-all duration-500 hover:-translate-y-2" alt="profile_picture"/>
        {/* <div>
          <div className="paragraph">
            The technologies I've been working with recently:
          </div>
            <ul className="stack">
              <div className="mr-40">
                <li>JavaScript</li>
                <li>Python</li>
                <li>Node</li>
              </div>
              <div>
                <li>Next</li>
                <li>React</li>
                <li>Tailwind CSS</li>
              </div>
            </ul>
            </div> */}
      </motion.div>
    </div>
  )
}

export default About