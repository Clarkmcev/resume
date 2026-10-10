import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { fade, slideInLeft } from "../animation/variants";
import { navLinks } from "../data/navigation";

// Matches Tailwind's `sm` breakpoint, where the desktop menu takes over.
const DESKTOP_QUERY = "(min-width: 640px)";

const activeStyle = { color: "#ffffff", textDecoration: "none" };
const inactiveStyle = { textDecoration: "none" };
const linkStyle = ({ isActive }) => (isActive ? activeStyle : inactiveStyle);

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = (event) => {
      if (event.matches) setIsMenuOpen(false);
    };
    mediaQuery.addEventListener("change", closeOnDesktop);
    return () => mediaQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <nav className="container">
        <motion.div
          className="font-pixel text-3xl text-fifth px-20"
          variants={fade}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
        >
          <Link to="/">MC</Link>
        </motion.div>

        <button
          type="button"
          className={isMenuOpen ? "text-third" : "text-second"}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <GiHamburgerMenu
            size="50px"
            className="text-second m-10 items-center hover:text-third cursor-pointer sm:hidden focus:bg-third"
          />
        </button>

        <div className="hidden sm:inline-block my-10 text-third items-center">
          {navLinks.map(({ to, label }, i) => (
            <motion.span
              key={to}
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 * (i + 1) }}
            >
              <span className="number">{String(i + 1).padStart(2, "0")}.</span>
              <NavLink
                className="linkNavbar p-3 rounded-lg text-lg"
                to={to}
                style={linkStyle}
              >
                {label}
              </NavLink>
            </motion.span>
          ))}
        </div>
      </nav>

      {isMenuOpen && (
        <div className="flex flex-col space-y-2 absolute bg-first right-0">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              onClick={closeMenu}
              className="link hover:bg-second p-3 rounded-lg"
              to={to}
              style={linkStyle}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default NavBar;
