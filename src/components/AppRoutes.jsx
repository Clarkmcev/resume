import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import Projects from "./Projects";
import Sg from "./Experience/Sg";
import Airbus from "./Experience/Airbus.jsx";
import GBS from "./Experience/GBS.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />}>
          <Route index element={<Sg />} />
          <Route path="/experience/sg" element={<Sg />} />
          <Route path="/experience/airbus" element={<Airbus />} />
          <Route path="/experience/gbs" element={<GBS />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
