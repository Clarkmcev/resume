import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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

// matches the links' px-3 so the line spans the label, not the padding
const LINK_PADDING = 12;

const mobileLinkClass = ({ isActive }) =>
  `flex items-center gap-3 p-3 rounded-lg hover:bg-second ${
    isActive ? "text-fifth bg-second" : "text-fourth"
  }`;

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const activeIndex = navLinks.findIndex(
    ({ to }) => pathname.startsWith(to) || (to === "/home" && pathname === "/")
  );

  // Sliding line under the desktop links: follows the hovered/focused link,
  // otherwise rests under the current section
  const linksRef = useRef(null);
  const linkRefs = useRef([]);
  const [hovered, setHovered] = useState(null);
  const [positions, setPositions] = useState([]);
  const target = positions[hovered ?? activeIndex];

  // Horizontal positions relative to the links container; the links'
  // entrance and hover animations only move them vertically
  const measure = useCallback(() => {
    const container = linksRef.current?.getBoundingClientRect();
    if (!container) return;
    setPositions(
      linkRefs.current.map((el) => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left - container.left + LINK_PADDING,
          width: rect.width - LINK_PADDING * 2,
        };
      })
    );
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    // label widths change once the web fonts load
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Jingle the active number whenever the section changes (and when the
  // current one is clicked again). Bumping the key remounts the number span,
  // which restarts its CSS animation. Comparing with the previous section
  // skips the first load.
  const [jingle, setJingle] = useState({ index: -1, key: 0 });
  const playJingle = (index) =>
    setJingle((prev) => ({ index, key: prev.key + 1 }));
  const previousIndex = useRef(activeIndex);
  useEffect(() => {
    if (activeIndex === previousIndex.current) return;
    previousIndex.current = activeIndex;
    if (activeIndex !== -1) playJingle(activeIndex);
  }, [activeIndex]);

  const numberClass = (i) =>
    `number ${i === activeIndex ? "number-active" : ""} ${
      i === jingle.index ? "jingle" : ""
    }`;
  const numberKey = (i) => (i === jingle.index ? `jingle-${jingle.key}` : "number");

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

        <div
          ref={linksRef}
          className="relative hidden sm:flex items-center gap-1 text-third"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map(({ to, label }, i) => (
            <motion.span
              key={to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * (i + 1) }}
              className="flex items-baseline"
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
            >
              <span key={numberKey(i)} className={numberClass(i)}>
                {sectionNumber(i)}.
              </span>
              <NavLink
                ref={(el) => (linkRefs.current[i] = el)}
                className={linkClass}
                to={to}
                onClick={() => i === activeIndex && playJingle(i)}
              >
                {label}
              </NavLink>
            </motion.span>
          ))}
          {target && (
            <motion.span
              aria-hidden="true"
              className="nav-indicator absolute bottom-0 left-0 h-0.5 rounded-full bg-third pointer-events-none"
              initial={{ opacity: 0, x: target.x, width: target.width }}
              animate={{ opacity: 1, x: target.x, width: target.width }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 32,
                opacity: { delay: 0.9, duration: 0.4 },
              }}
            />
          )}
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
                  <span className={`number ${i === activeIndex ? "number-active" : ""}`}>
                    {sectionNumber(i)}.
                  </span>
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
