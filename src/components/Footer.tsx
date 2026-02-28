import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";
import logoMain from "@/assets/logo-main.png";

const Footer = () => {
  return (
    <footer className="bg-card scratchy-overlay border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={logoMain} alt="Together Sports" className="h-12 mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building stronger communities through the power of athletics. Every kid deserves a chance to play.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold uppercase mb-4 text-accent">Navigate</h4>
            <ul className="space-y-2">
              {["About", "Sports", "How We Teach", "Impact", "Blog"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold uppercase mb-4 text-accent">Get Involved</h4>
            <ul className="space-y-2">
              {["Volunteer", "Donate", "Partner", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Contact" ? "/contact" : "/get-involved"}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold uppercase mb-4 text-accent">Stay Connected</h4>
            <div className="flex gap-3 mb-6">
              {[Instagram, Twitter, Youtube, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-primary/20 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:rotate-3 hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} Together Sports. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
