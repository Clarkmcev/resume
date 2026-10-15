import { motion } from "framer-motion";
import { fadeIn } from "../animation/variants";
import SectionHeading from "./SectionHeading";

// listed row by row to fill a 2- or 3-column grid
const technologies = [
  "TypeScript",
  "TailwindCSS",
  "AWS",
  "Golang",
  "PostgreSQL",
  "Linux",
  "Python",
  "HTML/CSS",
  "React/Next/Vite",
];

function About() {
  return (
    <section className="content">
      <SectionHeading number="02">About me</SectionHeading>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-2xl"
      >
        <div className="flex flex-col space-y-4">
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
            <p className="pb-3">
              The technologies I've been recently working with:
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 pl-5">
              {technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
