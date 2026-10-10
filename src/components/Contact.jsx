import { motion } from "framer-motion";
import { fadeIn } from "../animation/variants";
import SectionHeading from "./SectionHeading";

function Contact() {
  return (
    <section className="content">
      <SectionHeading number="04">Contact</SectionHeading>
      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="paragraph contact"
      >
        Looking to kick off my career in software development, I'm aiming for a{" "}
        <span className="text-white">Frontend</span> or{" "}
        <span className="text-white">Fullstack</span> Developer position with a
        high focus on Frontend, to grow within a company and improve my skills.
        I'm therefore open for any opportunities that may come to me. Feel free
        to send me a mail, cheers!
      </motion.p>
      <a href="mailto:mcevoyclark@gmail.com" className="button1 inline-block">
        Contact me
      </a>
    </section>
  );
}

export default Contact;
