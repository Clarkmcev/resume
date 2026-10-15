import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { fade } from "../animation/variants";
import { navLinks, sectionNumber } from "../data/navigation";
import { socials } from "../data/socials";
import ThemePicker from "./ThemePicker";

// Matches Tailwind's `sm` breakpoint, where the desktop menu takes over.
const DESKTOP_QUERY = "(min-width: 640px)";

const linkClass = ({ isActive }) =>
  `linkNavbar px-3 py-2 rounded-lg ${isActive ? "text-fifth" : ""}`;

const mobileLinkClass = ({ isActive }) =>
  `flex items-center gap-3 p-3 rounded-lg hover:bg-second ${
    isActive ? "text-fifth bg-second" : "text-fourth"
  }`;

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu on navigation and when growing to the desktop layout
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = (event) => {
      if (event.matches) setIsMenuOpen(false);
    };
    mediaQuery.addEventListener("change", closeOnDesktop);
    return () => mediaQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-first/90 backdrop-blur border-b border-second">
      {/* right padding leaves room for the theme picker pinned to the edge */}
      <nav className="flex items-center justify-between max-w-7xl mx-auto h-20 pl-6 pr-20 sm:pl-10 sm:pr-24 2xl:pr-10">
        <motion.div
          className="font-pixel text-3xl text-fifth"
          variants={fade}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
        >
          <Link to="/">MC</Link>
        </motion.div>

        <div className="hidden sm:flex items-center gap-1 text-third">
          {navLinks.map(({ to, label }, i) => (
            <motion.span
              key={to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * (i + 1) }}
              className="flex items-baseline"
            >
              <span className="number">{sectionNumber(i)}.</span>
              <NavLink className={linkClass} to={to}>
                {label}
              </NavLink>
            </motion.span>
          ))}
        </div>

        <div className="flex items-center sm:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="p-3 rounded-lg text-fourth hover:text-fifth hover:bg-second"
          >
            {isMenuOpen ? <IoClose size="24px" /> : <GiHamburgerMenu size="24px" />}
          </button>
        </div>
      </nav>

      <div className="absolute inset-y-0 right-3 sm:right-5 h-20 flex items-center">
        <ThemePicker />
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden overflow-hidden border-t border-second bg-first"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map(({ to, label }, i) => (
                <NavLink key={to} to={to} className={mobileLinkClass}>
                  <span className="number">{sectionNumber(i)}.</span>
                  {label}
                </NavLink>
              ))}
              <div className="flex gap-5 px-3 pt-4 mt-2 border-t border-second text-third">
                {socials.map(({ label, href, Icon }) => (
                  <a key={label} href={href} aria-label={label} className="link">
                    <Icon size="22px" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default NavBar;
