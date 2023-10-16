import "./App.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <>
      <div className="max-h-screen overflow-hidden">
        <NavBar />
        <div className="grid grid-cols-10 gap-1">
          <div className="hidden md:inline-block md:col-span-1 w-full h-screen py-20">
            <div className="bg-first text-third h-full py-10">
              <SideBar />
            </div>
          </div>
          <div className="col-span-8 w-screen h-screen pb-20 md:py-20 rounded-2xl overflow-scroll max-h-screen">
            <AppRoutes/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
