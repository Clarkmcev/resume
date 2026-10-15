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
    <section className="flex flex-col justify-center min-h-[60vh]">
      <FadeIn as="p" delay={0.9} className="text-third">
        Greetings passenger, my name is
      </FadeIn>
      <FadeIn
        delay={1.05}
        className="text-5xl sm:text-7xl lg:text-8xl font-bold text-fifth mt-2"
      >
        Clark McEvoy<span className="text-third">.</span>
      </FadeIn>
      <FadeIn
        delay={1.2}
        className="text-4xl sm:text-6xl lg:text-7xl font-light text-third mt-2"
      >
        Full Stack Developer
      </FadeIn>
      <div className="paragraph max-w-xl">
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
