import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { useEditableContent } from "@/lib/editable-content";

const AboutPage = () => {
  const { teamSections } = useEditableContent();

  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden bg-[#87cb4a]">
        <div className="absolute left-4 top-8 h-12 w-12 rounded-full bg-white/10 sm:left-10 sm:top-10 sm:h-20 sm:w-20" />
        <div className="absolute left-[18%] top-24 hidden h-12 w-12 rotate-45 bg-white/10 sm:block" />
        <div className="absolute right-4 top-10 h-10 w-10 bg-white/10 scrapbook-rotate-2 sm:right-12 sm:top-12 sm:h-16 sm:w-16" />
        <div className="absolute left-10 bottom-8 h-8 w-8 bg-white/10 scrapbook-rotate-3 sm:left-16 sm:h-10 sm:w-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:pt-28 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-heading text-5xl sm:text-6xl md:text-[5.25rem] font-black uppercase leading-[0.95] mb-4 text-white">
              <span className="sm:whitespace-nowrap">Meet The </span>
              <span className="sm:whitespace-nowrap">Team</span>
            </h1>
            <p className="text-white font-bold text-lg md:text-xl max-w-2xl mx-auto font-body">
              The people behind Together Sports are coaches, mentors, athletes, and community builders creating spaces where young people can grow through sport.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#87cb4a] py-12 md:py-16">
        <div className="absolute left-4 top-14 h-14 w-14 rounded-full bg-white/10 sm:h-20 sm:w-20" />
        <div className="absolute left-10 top-1/3 hidden h-12 w-12 rotate-45 bg-white/10 sm:block" />
        <div className="absolute left-6 bottom-28 hidden h-16 w-16 bg-white/10 scrapbook-rotate-2 sm:block" />
        <div className="absolute left-[22%] top-8 h-8 w-8 rounded-full bg-white/10 sm:h-10 sm:w-10" />
        <div className="absolute right-4 top-16 h-12 w-12 rotate-45 bg-white/10 sm:h-16 sm:w-16" />
        <div className="absolute right-10 top-[30%] hidden h-14 w-14 bg-white/10 scrapbook-rotate-2 sm:block" />
        <div className="absolute right-6 bottom-24 hidden h-20 w-20 rounded-full bg-white/10 sm:block" />
        <div className="absolute right-[22%] top-10 hidden h-10 w-10 bg-white/10 scrapbook-rotate-3 sm:block" />
        <div className="absolute left-1/2 top-6 h-6 w-6 -translate-x-1/2 rounded-full bg-white/10 sm:h-8 sm:w-8" />
        <div className="absolute left-1/2 bottom-6 hidden h-12 w-12 -translate-x-1/2 rotate-45 bg-white/10 sm:block" />

        <div className="relative z-10 max-w-[92rem] mx-auto px-3 sm:px-4 lg:px-5">
          <div className="bg-white px-6 py-10 md:px-10 md:py-12">
            <div className="space-y-16 md:space-y-20">
              {teamSections.map((section, sectionIndex) => (
                <div key={section.title}>
                  <ScrollReveal>
                    <div className="mb-8 md:mb-10 text-center">
                      <p className="font-body font-bold uppercase tracking-[0.3em] text-sm mb-3" style={{ color: section.color }}>
                        Together Sports
                      </p>
                      <h3 className="font-heading text-4xl md:text-6xl font-black uppercase">{section.title}</h3>
                    </div>
                  </ScrollReveal>

                  <div
                    className={
                      section.title === "Founder"
                        ? "max-w-md md:max-w-lg mx-auto"
                        : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-7"
                    }
                  >
                    {section.people.map((person, personIndex) => (
                      <ScrollReveal
                        key={`${section.title}-${person.name}-${personIndex}`}
                        delay={(sectionIndex * 0.05) + (personIndex * 0.1)}
                        direction={personIndex % 2 === 0 ? "left" : "right"}
                      >
                        <div className="bg-white border border-border overflow-hidden">
                          <img
                            src={person.image}
                            alt={person.alt}
                            className={`w-full object-cover ${
                              section.title === "Founder" ? "h-[320px] md:h-[400px]" : "h-[320px] md:h-[310px]"
                            }`}
                          />
                          <div className={section.title === "Founder" ? "p-7 md:p-9" : "p-7 md:p-7"}>
                            <p className="font-body font-bold uppercase tracking-[0.22em] text-sm mb-3" style={{ color: section.color }}>
                              {person.role}
                            </p>
                            <h4
                              className={`font-heading font-black uppercase ${
                                section.title === "Founder" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
                              }`}
                            >
                              {person.name}
                            </h4>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <ScrollReveal>
              <div className="mt-14 md:mt-16 text-center">
                <Link
                  to="/contact"
                  className="inline-block px-8 py-4 bg-primary text-white font-heading font-bold text-lg uppercase tracking-wider hover:scale-105 hover:rotate-1 transition-all duration-200"
                >
                  Get in Touch
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
