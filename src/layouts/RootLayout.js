import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="bg-[#EFF1F3] min-h-screen">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
