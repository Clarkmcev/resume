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
      className="flex items-center space-x-10">
        <div className="max-w-xl flex-1">
          <div className="pt-10">
            Hi there, I'm Clark, I'm a Frontend Developer excited about building and creating amazing digital products.
            I recently discovered a burning passion for web development through my former job at <a className="ref" href="https://particuliers.societegenerale.fr/">Societe Generale</a> as an IT Trading Support.
          </div>
          <div className="pt-5">
            Aiming to pursue my career in Frontend development, 
            I therefore decided to pursue a Fullstack web development Bootcamp at <a className="ref" href="https://www.ironhack.com/en/remote?utm_campaign=RMTEU_France_Global_Search_Brand_EN&utm_source=google&utm_medium=cpc&utm_content=search-brand&utm_term=ironhack&gclid=CjwKCAjwtKmaBhBMEiwAyINuwAzKigo9qBI1uQweteYkRax-lhJXtgbsZfseZxbx8vT6QfjdyO00YxoCrV0QAvD_BwE" target="_blank" rel="noreferrer">Ironhack</a> to train up on the fanciest web technologies used in the current tech industry.
            As of now, my main goal si to break into the game as a Frontend developer, grow with a company and build a career on the long run.
          </div>
          <ul>
              <div className="py-5">
                The technologies I've been recently working with:
              </div>
              <div className="px-5 flex space-x-10">
                <div>
                  <li>JavaScript</li>
                  <li>Node</li>
                  <li>React</li>
                </div>
                <div>
                  <li>TailwindCSS</li>
                  <li>Typescript</li>
                  <li>HTML/CSS</li>
                </div>
                <div>
                  <li>Python</li>
                  <li>SQL</li>
                  <li>Next</li>
                </div>
              </div>
            </ul>
        </div>
        <div className="flex items-center bg-second rounded-lg ">
          <img src={profileImg3} className="hidden lg:inline-block h-96 rounded-lg profileImg cursor-pointer border-8 border-second bg-third  hover:bg-fourth transition-all duration-500" alt="profile_picture"/>
        </div>

      </motion.div>
    </div>
  )
}

export default About