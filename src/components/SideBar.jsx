import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideInLeft } from "../animation/variants";
import { socials } from "../data/socials";

const iconVariants = {
  ...slideInLeft,
  visible: { ...slideInLeft.visible, x: 10 },
};

function SideBar() {
  const [showDivider, setShowDivider] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowDivider(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <aside className="flex space-x-8 h-full bg-first text-third">
      <div className="text-third flex flex-col h-full space-y-6 ml-10 mt-10">
        {socials.map(({ label, href, Icon }, i) => (
          <motion.a
            key={label}
            href={href}
            aria-label={label}
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 + i * 0.05, bounce: 0.25 }}
          >
            <Icon size="32px" className="link mx-auto" />
          </motion.a>
        ))}
      </div>
      <div
        className={`border border-third/20 duration-500 transition-all ${
          showDivider ? "h-full" : "h-0"
        }`}
      />
    </aside>
  );
}

export default SideBar;
