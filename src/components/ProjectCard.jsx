import { motion } from "framer-motion";
import { BsGithub } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { fade } from "../animation/variants";

function ProjectCard({ project, index }) {
  const { name, shortDescription, longDescription, stack, url, repo } =
    project;

  return (
    <motion.article
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.1, delay: 0.1 * index }}
      variants={fade}
      className="card group"
    >
      <a href={url}>
        <div className="text-fourth mt-5 mx-5 text-xl group-hover:text-white">
          {name}
        </div>
        <div className="mx-5 text-third text-base">[{shortDescription}]</div>
        <p className="m-5 text-sm h-10">{longDescription}</p>
        <div className="m-5 flex space-x-3">
          {stack.map((tech) => (
            <span key={tech} className="text-third text-sm leading-10">
              {tech}
            </span>
          ))}
        </div>
      </a>
      <div className="logos">
        <a href={repo} aria-label={`${name} source code`}>
          <BsGithub className="link" />
        </a>
        <a href={url} aria-label={`${name} live site`}>
          <FaExternalLinkAlt className="link" />
        </a>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
