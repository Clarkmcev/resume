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
          className="card group">
            <a href={project.url}>
            <div className="text-fourth mt-5 mx-5 text-xl group-hover:text-white">{project.name}</div>
            <div className="mx-5 text-third text-base">[{project.shortDescription}]</div>
            <div className="m-5 text-sm h-10">{project.longDescription}</div>
            <div className="m-5">
              <div className="flex space-x-3">
            {project.stack.map((tech) => {
              return (
                <div className="text-third text-sm leading-10">{tech}</div>)
            })}
              </div>
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