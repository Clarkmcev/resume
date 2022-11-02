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
import SideBar from "./components/SideBar";
import ContactBar from "./components/ContactBar";

function App() {
  return (
    <>
      <div className="max-h-screen overflow-hidden">
        <NavBar />

        <div className="grid grid-cols-10 gap-1">
          <div className="w-full h-screen col-span-1 p-20 rounded-2xl">
            <div className="bg-first text-third h-full py-10">
              <SideBar />
            </div>
          </div>
          <div className="col-span-8 w-full h-screen0 p-20 rounded-2xl overflow-scroll max-h-screen ">
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
          {/* <div className="col-span-1 w-full h-screen p-20 rounded-2xl ">
            <ContactBar />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default App;
