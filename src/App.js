import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Sg from "./components/Experience/Sg";
import Noveo from "./components/Experience/Noveo.jsx";
import Tilia from "./components/Experience/Tilia";
import Actemium from "./components/Experience/Actemium";
import Footer from "./components/Footer";
import { motion } from "framer-motion";

function App() {
  const boxFooter = {
    hidden: {
      y: "100vh",
    },
    visible: {
      y: 0,
      transition: {
        delay: 1,
        delayChildren: 0.2,
        bounce: 0.4,
      },
    },
  };

  return (
    <>
      <div className="App relative">
        <NavBar />
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
              window.location.href = "https://www.ironhack.com/";
              return null;
            }}
          />
        </Routes>
      </div>
      <motion.div
        variants={boxFooter}
        animate="visible"
        initial="hidden"
        className="bg-first text-third w-fit fixed bottom-0 text-center"
      >
        <Footer />
      </motion.div>
    </>
  );
}

export default App;
