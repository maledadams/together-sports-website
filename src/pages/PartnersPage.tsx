import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import partner1 from "@/assets/partner-1.png";
import partner2 from "@/assets/partner-2.png";
import partner3 from "@/assets/partner-3.png";
import partner4 from "@/assets/partner-4.png";
import partner5 from "@/assets/partner-5.png";
import partner6 from "@/assets/partner-6.png";

const partners = [
  { name: "SportGear Pro", logo: partner1 },
  { name: "FitKids Foundation", logo: partner2 },
  { name: "PlayFields", logo: partner3 },
  { name: "HydraPower", logo: partner4 },
  { name: "CityFirst Bank", logo: partner5 },
  { name: "ActiveWear Co", logo: partner6 },
];

const carouselItems = [...partners, ...partners];

const PartnersPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-primary">
        <div className="absolute inset-0 scratchy-overlay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <p className="font-body font-bold uppercase tracking-[0.3em] text-white/70 text-sm mb-4">Together We Go Further</p>
            <h1 className="font-heading text-6xl md:text-8xl font-black uppercase leading-[0.85] text-white">
              Our <span className="text-stroke-light">Partners</span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* INFINITE CAROUSEL */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <ScrollReveal>
            <div className="text-center">
              <p className="font-body font-bold uppercase tracking-[0.3em] text-accent text-sm mb-4">
                Trusted By
              </p>
              <h2 className="font-heading text-5xl md:text-7xl font-black uppercase text-foreground">
                Meet Our <span className="brush-underline">Partners</span>
              </h2>
            </div>
          </ScrollReveal>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center gap-16 md:gap-24 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {carouselItems.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex-shrink-0 w-40 h-28 md:w-52 md:h-36 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20 md:py-28 bg-card scratchy-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="font-body font-bold uppercase tracking-[0.3em] text-accent text-sm mb-4">
              Why Partner With Us
            </p>
            <h2 className="font-heading text-5xl md:text-7xl font-black uppercase mb-12">
              Make An <span className="text-stroke">Impact</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Community Reach",
                desc: "Your brand connects with hundreds of families across local sports programs, events, and social media.",
              },
              {
                title: "Shared Values",
                desc: "Align with a mission that champions teamwork, inclusivity, and youth development through sport.",
              },
              {
                title: "Real Visibility",
                desc: "Logo placement on gear, courts, fields, and digital channels — your support is seen and appreciated.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.15} direction="up">
                <div className={`p-8 md:p-10 bg-background border border-border hover:border-accent transition-colors duration-300 ${i === 1 ? "md:-translate-y-6" : ""}`}>
                  <h3 className="font-heading text-3xl font-black uppercase mb-3 text-accent">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <h2 className="font-heading text-4xl md:text-6xl font-black uppercase mb-6">
                Become A <span className="brush-underline">Partner</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Interested in partnering with Together Sports? We'd love to hear from you.
                Together we can create opportunities for youth to connect, grow, and thrive.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-accent text-white font-heading font-bold text-lg uppercase tracking-wider hover:scale-105 hover:rotate-1 transition-all duration-200"
              >
                Get in Touch →
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="p-8 md:p-10 bg-card border border-border scrapbook-rotate-2">
                <p className="font-body font-bold uppercase tracking-[0.3em] text-accent text-sm mb-4">What You Get</p>
                {[
                  "Logo on all program materials & gear",
                  "Featured on our website & social media",
                  "VIP access to events & tournaments",
                  "Quarterly impact reports",
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                    <span className="w-2 h-2 bg-accent rounded-full shrink-0" />
                    <span className="text-foreground font-body">{perk}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;
