import ScrollReveal from "@/components/ScrollReveal";
import mentorshipImg from "@/assets/mentorship.jpg";
import communityImg from "@/assets/community.jpg";

const pillars = [
  {
    title: "Skill Building",
    desc: "Structured drills and progressive training that meet every athlete where they are.",
    color: "text-primary",
  },
  {
    title: "Discipline & Leadership",
    desc: "We teach more than sports. We teach responsibility, focus, and how to lead.",
    color: "text-accent",
  },
  {
    title: "Mentorship",
    desc: "Every athlete is paired with a mentor who guides them on and off the field.",
    color: "text-brand-green",
  },
  {
    title: "Community",
    desc: "Families, coaches, and athletes — we're a team beyond the scoreboard.",
    color: "text-brand-purple",
  },
];

const HowWeTeachPage = () => {
  return (
    <div className="overflow-hidden">
      <section className="relative py-24 md:py-32 bg-card scratchy-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="font-body font-bold uppercase tracking-[0.3em] text-accent text-sm mb-4">Our Approach</p>
            <h1 className="font-heading text-6xl md:text-8xl font-black uppercase leading-[0.85]">
              How We <span className="text-stroke">Teach</span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`p-8 md:p-10 bg-card border border-border hover:border-accent transition-all duration-300 ${i === 1 ? "md:translate-y-6" : i === 2 ? "md:-translate-y-6" : ""}`}>
                  <span className={`font-heading text-6xl md:text-7xl font-black ${p.color} opacity-20`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-3xl font-black uppercase mt-2 mb-3">{p.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video + Image section */}
      <section className="py-20 md:py-28 bg-card scratchy-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <ScrollReveal direction="left">
              <div className="aspect-video bg-background border border-border flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent text-3xl">▶</span>
                  </div>
                  <p className="text-muted-foreground font-body">Watch how we develop leaders</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="scrapbook-rotate-2">
                <img src={mentorshipImg} alt="Mentorship" className="w-full h-[350px] object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="scrapbook-rotate-3">
                <img src={communityImg} alt="Community" className="w-full h-[400px] object-cover" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <h2 className="font-heading text-5xl md:text-6xl font-black uppercase leading-[0.9] mb-6">
                It Takes a <span className="brush-underline">Village</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our coaches aren't just instructors — they're role models. Our families aren't just supporters — 
                they're the backbone. Together, we build something bigger than sport.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowWeTeachPage;
