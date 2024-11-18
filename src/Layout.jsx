import "./index.css";
import { Outlet } from "react-router-dom";
import DarkMode from "./components/DarkMode";
import DarkModeToggle from "./components/DarkModeToggle";
import Router from "./Router";
import Navbar from "./components/Navbar/Navbar";
import Alert from "./components/Alert";
import Footer from "./components/footer";

const Layout = () => {
  return (
    <div className="w-full h-full flex flex-col">
        <Alert />
      <div className="w-[100vw] h-[12.5vh]">
        <Navbar />
      </div>
      <div className="flex w-full h-full justify-center">
        <Outlet />
      </div>
      <div id="footer" className="w-[100vw] h-[12.5vh]">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
