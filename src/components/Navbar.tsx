import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import headerLogo from "@/assets/headerlogo.svg";

const navItems = [
  {
    label: "Home",
    path: "/",
    dropdown: [
      { label: "Tennis", path: "/sports/tennis", color: "#87cb4a" },
      { label: "Basketball", path: "/sports/basketball", color: "#f6a15c" },
      { label: "Football", path: "/sports/football", color: "#84a6ff" },
      { label: "Golf", path: "/sports/golf", color: "#ab9bfa" },
    ],
  },
  { label: "Team", path: "/team" },
  { label: "Experiences", path: "/experiences" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Partners", path: "/partners" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-primary/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={headerLogo}
              alt="Together Sports logo"
              className="relative -translate-y-0.5 h-8 w-auto shrink-0 md:h-10"
            />
            <span className="flex items-center font-heading text-2xl md:text-3xl font-black uppercase tracking-wider leading-none text-[#ffffff]">
              Together Sports
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-2 min-w-0">
            <div className="flex items-center gap-1 min-w-0">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.dropdown ? item.path : null)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className="px-3 py-2 text-sm font-[Montserrat] font-bold uppercase tracking-wider text-[#ffffff] transition-colors duration-200 hover:text-[#84a6ff]"
                  >
                    {item.label}
                  </Link>
                  <AnimatePresence>
                    {item.dropdown && openDropdown === item.path ? (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-0 top-full mt-7 hidden w-56 border-2 border-primary bg-white shadow-lg lg:block"
                      >
                        <div className="p-2 text-left">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className="block px-4 py-3 text-sm font-[Montserrat] font-bold uppercase tracking-wider transition-colors duration-200 hover:bg-primary/5"
                              style={{ color: subItem.color ?? "#4f74d6" }}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <Link
              to="/get-involved"
              className="ml-4 inline-flex shrink-0 items-center justify-center rounded-sm bg-[#ffffff] px-5 py-3 text-sm font-[Montserrat] font-bold uppercase tracking-wider text-primary transition-transform duration-200 hover:scale-105"
            >
              Get Involved
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#ffffff]"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary border-b border-primary/80 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-lg font-[Montserrat] font-bold uppercase tracking-wider text-[#ffffff] transition-colors hover:text-[#84a6ff]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/get-involved"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-lg font-[Montserrat] font-bold uppercase tracking-wider bg-[#ffffff] text-primary"
              >
                Get Involved
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
