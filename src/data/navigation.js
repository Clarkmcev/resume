export const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

// "01", "02", ... shown before each link and in the matching page heading
export const sectionNumber = (index) => String(index + 1).padStart(2, "0");
