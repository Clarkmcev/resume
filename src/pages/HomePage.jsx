import { motion } from "framer-motion";
import { fade } from "../animation/variants";

const RESUME_URL =
  "https://drive.google.com/file/d/1G20hnKyH7MK09WknB2_moXempDnvvgoO/view?usp=sharing";

function FadeIn({ as = "div", delay, className, children }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={fade}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

function HomePage() {
  return (
    <section className="max-w-7xl p-10 mb-20">
      <FadeIn as="p" delay={0.9} className="text-third">
        Greetings passenger, my name is
      </FadeIn>
      <FadeIn delay={1.05} className="text-5xl sm:text-8xl font-bold">
        Clark McEvoy<span className="text-third">.</span>
      </FadeIn>
      <FadeIn
        delay={1.2}
        className="text-6xl lg:text-8xl font-light text-third"
      >
        Full Stack Developer
      </FadeIn>
      <div className="paragraph">
        <FadeIn delay={1.45}>
          I build solid and scalable products with great user experiences.
        </FadeIn>
        <FadeIn delay={1.6}>Software Engineer from Augsburg, Germany.</FadeIn>
      </div>
      <FadeIn delay={1.75}>
        <a href={RESUME_URL} className="button1 inline-block">
          Resume
        </a>
      </FadeIn>
    </section>
  );
}

export default HomePage;
