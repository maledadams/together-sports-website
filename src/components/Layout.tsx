import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      {import.meta.env.DEV ? (
        <Link
          to="/admin"
          className="fixed bottom-5 right-5 z-50 px-4 py-3 bg-[#020367] text-white font-heading font-bold uppercase tracking-wider text-sm shadow-lg hover:scale-105 transition-transform"
        >
          Edit Mode
        </Link>
      ) : null}
      <Footer />
    </div>
  );
};

export default Layout;
