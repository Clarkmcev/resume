import { motion } from "framer-motion";
import { fadeIn } from "../animation/variants";
import SectionHeading from "./SectionHeading";

const technologies = [
  ["TypeScript", "Golang", "Python"],
  ["TailwindCSS", "PostgreSQL", "HTML/CSS"],
  ["AWS", "Linux", "React/Next/Vite"],
];

function About() {
  return (
    <section className="content">
      <SectionHeading number="01">About me</SectionHeading>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex items-center space-x-10"
      >
        <div className="max-w-xl flex-1 flex flex-col space-y-4">
          <p className="pt-10">
            Hi there, I'm Clark, I'm a Software Engineer excited about building
            and creating amazing digital products. I am a dedicated Full Stack
            developer with over 3 years of experience in designing and
            implementing scalable cloud platforms.
          </p>
          <p>
            With a strong focus on building user-friendly interfaces and smooth
            user experiences, I combine creativity and technical expertise to
            deliver robust and efficient solutions.
          </p>
          <div>
            <p className="pb-2">
              The technologies I've been recently working with:
            </p>
            <div className="px-5 flex space-x-10">
              {technologies.map((column) => (
                <ul key={column[0]}>
                  {column.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
