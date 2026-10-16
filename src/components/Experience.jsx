import { NavLink, Outlet } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import { slideRight, stagger } from "../animation/variants";
import useAnimateOnce from "../hooks/useAnimateOnce";
import experiences from "../data/experiences";
import SectionHeading from "./SectionHeading";

const MotionNavLink = motion(NavLink);

function Experience() {
  const initial = useAnimateOnce("experience");

  // reducedMotion="user" keeps the fades but drops the movement (including
  // the sliding tab highlight) for people who ask for less motion
  return (
    <MotionConfig reducedMotion="user">
      <section className="content">
        <SectionHeading number="03">Experience</SectionHeading>
        <motion.nav
          initial={initial}
          animate="visible"
          variants={stagger(0.06, 0.15)}
          className="navbarxp"
        >
          {experiences.map(({ id, company }) => (
            <MotionNavLink
              key={id}
              to={id}
              variants={slideRight}
              className={({ isActive }) =>
                `xpitem ${isActive ? "xpitem-active" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  {/* one shared highlight that glides to the selected company */}
                  {isActive && (
                    <motion.span
                      layoutId="xpitem-highlight"
                      className="xpitem-highlight"
                      transition={{ type: "spring", stiffness: 500, damping: 38 }}
                    />
                  )}
                  {company}
                </>
              )}
            </MotionNavLink>
          ))}
        </motion.nav>
        <Outlet />
      </section>
    </MotionConfig>
  );
}

export default Experience;
