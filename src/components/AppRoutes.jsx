import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import ExperienceDetail from "./ExperienceDetail";
import Projects from "./Projects";
import experiences from "../data/experiences";

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="about" element={<About />} />
      <Route path="experience" element={<Experience />}>
        <Route
          index
          element={<Navigate to={experiences[0].id} replace />}
        />
        <Route path=":companyId" element={<ExperienceDetail />} />
      </Route>
      <Route path="projects" element={<Projects />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
