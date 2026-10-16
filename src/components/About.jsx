import { MotionConfig, motion } from "framer-motion";
import { pop, rise, stagger } from "../animation/variants";
import useAnimateOnce from "../hooks/useAnimateOnce";
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
  const initial = useAnimateOnce("about");

  // reducedMotion="user" keeps the fades but drops the movement for people
  // who ask for less motion
  return (
    <MotionConfig reducedMotion="user">
      <section className="content">
        <SectionHeading number="02">About me</SectionHeading>
        {/* paragraphs rise in one by one, then the technologies cascade in */}
        <motion.div
          initial={initial}
          animate="visible"
          variants={stagger(0.12, 0.15)}
          className="max-w-2xl flex flex-col space-y-4"
        >
          <motion.p variants={rise} className="pt-10">
            Hi there, I'm Clark, I'm a Software Engineer excited about building
            and creating amazing digital products. I am a dedicated Full Stack
            developer with over 3 years of experience in designing and
            implementing scalable cloud platforms.
          </motion.p>
          <motion.p variants={rise}>
            With a strong focus on building user-friendly interfaces and smooth
            user experiences, I combine creativity and technical expertise to
            deliver robust and efficient solutions.
          </motion.p>
          <motion.div variants={rise}>
            <p className="pb-3">
              The technologies I've been recently working with:
            </p>
            <motion.ul
              variants={stagger(0.05, 0.1)}
              className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 pl-5"
            >
              {technologies.map((tech) => (
                <motion.li key={tech} variants={pop} className="tech">
                  {tech}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}

export default About;
