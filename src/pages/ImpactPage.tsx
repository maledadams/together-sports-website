import ScrollReveal from "@/components/ScrollReveal";
import communityImg from "@/assets/community.jpg";

const stats = [
  { number: "2,500+", label: "Youth Served" },
  { number: "15", label: "Communities" },
  { number: "98%", label: "Return Rate" },
  { number: "4", label: "Sports Programs" },
];

const stories = [
  {
    name: "Jaylen, 14",
    quote: "Together Sports gave me something to believe in. Now I'm team captain.",
    sport: "Basketball",
  },
  {
    name: "Maria, 16",
    quote: "I never thought I'd play tennis. Now I can't imagine my life without it.",
    sport: "Tennis",
  },
  {
    name: "David, 12",
    quote: "My coach is more than a coach. He's someone who listens.",
    sport: "Football",
  },
];

const ImpactPage = () => {
  return (
    <div className="overflow-hidden">
      <section className="relative py-24 md:py-32 bg-card scratchy-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="font-body font-bold uppercase tracking-[0.3em] text-accent text-sm mb-4">Our Reach</p>
            <h1 className="font-heading text-6xl md:text-8xl font-black uppercase leading-[0.85]">
              Impact <span className="text-stroke">Report</span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1} direction="scale">
                <div className={`text-center p-6 ${i % 2 === 1 ? "md:translate-y-6" : ""}`}>
                  <span className="font-heading text-5xl md:text-7xl font-black text-accent block">{s.number}</span>
                  <span className="font-body text-sm md:text-base uppercase tracking-wider text-muted-foreground mt-2 block">{s.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-20 md:py-28 bg-card scratchy-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-heading text-5xl md:text-7xl font-black uppercase mb-12">
              Their <span className="brush-underline">Stories</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story, i) => (
              <ScrollReveal key={story.name} delay={i * 0.15} direction={i === 0 ? "left" : i === 2 ? "right" : "up"}>
                <div className={`p-8 bg-background border border-border ${i === 1 ? "md:-translate-y-6" : ""}`}>
                  <p className="text-accent font-heading font-bold uppercase text-sm mb-4">{story.sport}</p>
                  <p className="text-foreground text-xl leading-relaxed mb-6 font-body italic">
                    "{story.quote}"
                  </p>
                  <p className="text-muted-foreground font-heading font-bold uppercase">— {story.name}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photo */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="scale">
            <div className="scrapbook-rotate-1">
              <img src={communityImg} alt="Our community" className="w-full h-[400px] md:h-[500px] object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default ImpactPage;
