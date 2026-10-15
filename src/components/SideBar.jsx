import { motion } from "framer-motion";
import { socials } from "../data/socials";

function SideBar() {
  return (
    <div className="sticky top-20 flex flex-col items-center h-full max-h-[calc(100vh-5rem)] pt-16 pb-6 text-third">
      <div className="flex flex-col items-center space-y-6">
        {socials.map(({ label, href, Icon }, i) => (
          <motion.a
            key={label}
            href={href}
            aria-label={label}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 + i * 0.05 }}
            className="group relative flex rounded-md outline-none focus-visible:ring-2 focus-visible:ring-third"
          >
            <Icon size="26px" className="link" />
            {/* aria-hidden: the link's aria-label already announces the name */}
            <span
              aria-hidden="true"
              className="sidebar-tooltip whitespace-nowrap rounded-md border border-third/30 bg-second px-2.5 py-1 text-sm text-fifth shadow-lg"
            >
              {label}
            </span>
          </motion.a>
        ))}
      </div>
      <motion.div
        className="w-px flex-1 mt-6 bg-third/30"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: 0 }}
        transition={{ delay: 2.1, duration: 0.5 }}
      />
    </div>
  );
}

export default SideBar;
