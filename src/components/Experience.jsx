import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../animation/variants";
import useAnimateOnce from "../hooks/useAnimateOnce";
import experiences from "../data/experiences";
import SectionHeading from "./SectionHeading";

function Experience() {
  const initial = useAnimateOnce("experience");

  return (
    <section className="content">
      <SectionHeading number="03">Experience</SectionHeading>
      <motion.nav
        initial={initial}
        animate="visible"
        variants={fadeIn}
        className="navbarxp"
      >
        {experiences.map(({ id, company }) => (
          <NavLink
            key={id}
            to={id}
            className={({ isActive }) =>
              `xpitem ${isActive ? "xpitem-active" : ""}`
            }
          >
            {company}
          </NavLink>
        ))}
      </motion.nav>
      <Outlet />
    </section>
  );
}

export default Experience;
