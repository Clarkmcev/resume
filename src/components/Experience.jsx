import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../animation/variants";
import experiences from "../data/experiences";
import SectionHeading from "./SectionHeading";

const activeStyle = { color: "#77ABB7", textDecoration: "none" };
const inactiveStyle = { textDecoration: "none" };

function Experience() {
  return (
    <section className="content">
      <SectionHeading number="02">Experience</SectionHeading>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="navbarxp"
      >
        {experiences.map(({ id, company }) => (
          <NavLink
            key={id}
            to={id}
            className="xpitem"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
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
