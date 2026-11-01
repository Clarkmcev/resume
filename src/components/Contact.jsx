import { motion } from "framer-motion";
import { fadeIn } from "../animation/variants";
import useAnimateOnce from "../hooks/useAnimateOnce";
import SectionHeading from "./SectionHeading";

function Contact() {
  const initial = useAnimateOnce("contact");

  return (
    <section className="content">
      <SectionHeading number="05">Contact</SectionHeading>
      <motion.p
        initial={initial}
        animate="visible"
        variants={fadeIn}
        className="paragraph max-w-2xl"
      >
        Want to know more? Don't hesitate to reach out.
      </motion.p>
      <a href="mailto:mcevoyclark@gmail.com" className="button1 inline-block">
        Contact me
      </a>
    </section>
  );
}

export default Contact;
