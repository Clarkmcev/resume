import React from 'react'
import projects from './data/projects'
import { BsGithub } from 'react-icons/bs';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from "framer-motion";

function Work() {
  const boxVariant = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
    }
  }

  return (
    <div className="content">
      <h1><span className="number">03.</span>My projects</h1>
      <div className="projects">
        {projects.map((project,i) => {
          return (<motion.div 
          initial="hidden"
          animate="visible"
          transition={{duration:0.1, delay: 0.10*i}}
          variants={boxVariant}
          className="card">
            <a href={project.url}>
            <div className="text-white mt-5 mx-5 font-bold">{project.name}</div>
            <div className="mx-5 text-fourth">[{project.shortDescription}]</div>
            <div className="m-5 font-thin">{project.longDescription}</div>
            <div className="m-5">
            {project.stack.map((tech) => {
              return (<span className=" text-third text-sm tech leading-10">{tech}  </span>)
            })}
            </div>
              <div className="logos">
                <a href={project.repo}><BsGithub className="link"/></a>
                <a href={project.url}><FaExternalLinkAlt className="link"/></a>
              </div>
              </a>
            </motion.div>)
        })}
        
      </div>
    </div>
  )
}

export default Work