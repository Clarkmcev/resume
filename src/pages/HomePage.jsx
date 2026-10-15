import { motion } from "framer-motion";
import { fade } from "../animation/variants";
import useAnimateOnce from "../hooks/useAnimateOnce";

const RESUME_URL = `${process.env.PUBLIC_URL}/ClarkMcEvoy_resume.pdf`;

function FadeIn({ as = "div", delay, initial, className, children }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={fade}
      initial={initial}
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

function HomePage() {
  const initial = useAnimateOnce("home");

  return (
    <section className="flex flex-col justify-center min-h-[60vh]">
      <FadeIn initial={initial} as="p" delay={0.9} className="text-third">
        Greetings passenger, my name is
      </FadeIn>
      <FadeIn initial={initial}
        delay={1.05}
        className="text-5xl sm:text-7xl lg:text-8xl font-bold text-fifth mt-2"
      >
        Clark McEvoy<span className="text-third">.</span>
      </FadeIn>
      <FadeIn initial={initial}
        delay={1.2}
        className="text-4xl sm:text-6xl lg:text-7xl font-light text-third mt-2"
      >
        Full Stack Developer
      </FadeIn>
      <div className="paragraph max-w-xl">
        <FadeIn initial={initial} delay={1.45}>
          I build solid and scalable products with great user experiences.
        </FadeIn>
        <FadeIn initial={initial} delay={1.6}>Software Engineer from Augsburg, Germany.</FadeIn>
      </div>
      <FadeIn initial={initial} delay={1.75}>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="button1 inline-block"
        >
          Resume
        </a>
      </FadeIn>
    </section>
  );
}

export default HomePage;
