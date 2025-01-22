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
          <div className="hidden md:inline-block md:col-span-2 w-full h-screen py-20">
            <SideBar />
          </div>
          <div className="col-span-8 w-screen h-screen md:py-4 overflow-scroll max-h-screen mx-10 md:mx-0">
            <AppRoutes />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
