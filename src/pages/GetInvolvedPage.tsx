import ScrollReveal from "@/components/ScrollReveal";

const getInvolvedItems = [
  {
    title: "Donate",
    desc: "Fund equipment, coaching, transportation, and programs that open the door for more young athletes to play.",
    cta: "Give Now",
    icon: "💛",
    href: "/contact",
    external: false,
  },
  {
    title: "Volunteer",
    desc: "Coach, mentor, support sessions, or help organize community events that make every program run stronger.",
    cta: "Sign Up",
    icon: "🤝",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSes2__aGaa25i1By5o-fc_pBHDxSnjnaBDJGzHsDOaKR_FKDw/viewform?usp=publish-editor",
    external: true,
  },
  {
    title: "Partner",
    desc: "Bring your school, organization, or business into the mission and help expand access through collaboration.",
    cta: "Learn More",
    icon: "🏢",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSePxWPnfSmEIF77mppapcF8fMcIhBC4uhE1c5EVux0dAK6pmA/viewform?usp=header",
    external: true,
  },
];

const GetInvolvedPage = () => {
  return (
    <div className="overflow-hidden">
      <section className="min-h-[calc(100vh+4rem)] md:min-h-[calc(100vh+6rem)] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-stretch">
            {getInvolvedItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.15} direction="up">
                <div
                  className={`h-full min-h-[420px] md:min-h-[520px] p-10 md:p-12 bg-card border border-border hover:border-accent transition-all duration-300 flex flex-col ${
                    i === 1 ? "md:-translate-y-8" : ""
                  }`}
                >
                  <span className="mb-6 block text-5xl md:text-6xl">{item.icon}</span>
                  <h3 className="mb-4 font-heading text-4xl md:text-5xl font-black uppercase leading-[0.95]">
                    {item.title}
                  </h3>
                  <p className="mb-8 flex-1 text-xl md:text-2xl leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="inline-block self-start px-8 py-4 bg-accent text-white font-heading font-bold uppercase tracking-wider text-base md:text-lg hover:scale-105 hover:rotate-1 transition-all duration-200"
                  >
                    {item.cta} →
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolvedPage;
