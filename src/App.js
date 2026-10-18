import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import AppRoutes from "./components/AppRoutes";
import ThemeBackground from "./components/background/ThemeBackground";
import Intro from "./components/Intro";

// The intro plays once per browser session and never for reduced motion
const INTRO_KEY = "introPlayed";

function shouldPlayIntro() {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  try {
    return !sessionStorage.getItem(INTRO_KEY);
  } catch (e) {
    return true;
  }
}

function App() {
  const [showIntro, setShowIntro] = useState(shouldPlayIntro);
  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch (e) {}
    setShowIntro(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && <Intro key="intro" onDone={finishIntro} />}
      </AnimatePresence>
      {/* mounted once the intro lifts, so the page's own entrance
          animations play as it's revealed rather than hidden behind it */}
      {!showIntro && <Page />}
    </>
  );
}

function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <ThemeBackground />
      <NavBar />
      {/* pinned under the navbar, lined up with the column below, so only
          the page scrolls past it; clicks fall through except on the links */}
      <aside className="hidden md:block fixed inset-x-0 top-20 bottom-0 pointer-events-none">
        <div className="max-w-7xl h-full mx-auto">
          <div className="w-24 h-full">
            <SideBar />
          </div>
        </div>
      </aside>
      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        {/* keeps the page clear of the pinned sidebar */}
        <div className="hidden md:block w-24 shrink-0" />
        <main className="flex-1 min-w-0 px-6 sm:px-10 md:pl-6 md:pr-12 py-10 md:py-16">
          <AppRoutes />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
