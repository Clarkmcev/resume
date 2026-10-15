import projects from "../data/projects";
import useAnimateOnce from "../hooks/useAnimateOnce";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

function Projects() {
  const initial = useAnimateOnce("projects");

  return (
    <section className="content">
      <SectionHeading number="04">My projects</SectionHeading>
      <div className="projects">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            initial={initial}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
