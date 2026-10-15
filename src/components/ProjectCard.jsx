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
      {/* the ::after overlay stretches this link over the whole card */}
      <a
        href={url}
        className="block after:absolute after:inset-0 after:rounded-2xl after:content-['']"
      >
        <div className="text-fourth text-xl group-hover:text-fifth">{name}</div>
        <div className="text-third text-base">[{shortDescription}]</div>
      </a>
      <p className="text-sm my-4 flex-1">{longDescription}</p>
      <div className="flex flex-wrap gap-x-3 text-third text-sm">
        {stack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div className="logos">
        <a href={repo} aria-label={`${name} source code`} className="relative z-10">
          <BsGithub className="link" />
        </a>
        <a href={url} aria-label={`${name} live site`} className="relative z-10">
          <FaExternalLinkAlt className="link" />
        </a>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
