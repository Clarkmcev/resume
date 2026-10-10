import projects from "../data/projects";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

function Projects() {
  return (
    <section className="content mb-40 pr-20">
      <SectionHeading number="03">My projects</SectionHeading>
      <div className="projects">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
