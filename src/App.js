import "./App.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <aside className="hidden md:block w-24 shrink-0">
          <SideBar />
        </aside>
        <main className="flex-1 min-w-0 px-6 sm:px-10 md:pl-6 md:pr-12 py-10 md:py-16">
          <AppRoutes />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
