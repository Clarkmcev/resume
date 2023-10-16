import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import Projects from "./Projects";
import Sg from "./Experience/Sg";
import Noveo from "./Experience/Noveo.jsx";
import Tilia from "./Experience/Tilia";
import Actemium from "./Experience/Actemium";

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
          <Route path="/experience/noveo" element={<Noveo />} />
          <Route path="/experience/tilia" element={<Tilia />} />
          <Route path="/experience/actemium" element={<Actemium />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route
        path="/about/ironhack"
        component={() => {
          window.location.href = 'https://www.ironhack.com/';
          return null;
        }}
      />
    </Routes>
  );
}

export default AppRoutes;
