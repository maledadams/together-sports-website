import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import tennisAction from "@/assets/tennis-action.jpg";
import basketballAction from "@/assets/basketball-action.jpg";
import footballAction from "@/assets/football-action.jpg";
import golfAction from "@/assets/golf-action.jpg";
import secondServe from "@/assets/second-serve.jpg";

const sportData: Record<string, { name: string; image: string; tagline: string; description: string; schedule: string[] }> = {
  tennis: {
    name: "Tennis",
    image: tennisAction,
    tagline: "Every serve is a fresh start.",
    description: "Our tennis program provides free coaching, equipment, and court time to youth aged 8-18. From beginners to competitive players, we build skills and confidence through structured lessons and match play.",
    schedule: ["Monday & Wednesday: 4:00–6:00 PM", "Saturday: 9:00 AM–12:00 PM", "Summer Intensive: June–August"],
  },
  basketball: {
    name: "Basketball",
    image: basketballAction,
    tagline: "The court is where leaders are made.",
    description: "Our basketball program teaches fundamentals, teamwork, and game strategy. Open to all skill levels, we focus on building confidence through competitive play and mentorship.",
    schedule: ["Tuesday & Thursday: 4:00–6:00 PM", "Saturday: 1:00–4:00 PM"],
  },
  football: {
    name: "Football",
    image: footballAction,
    tagline: "Every play counts. Every player matters.",
    description: "Our football program emphasizes discipline, teamwork, and sportsmanship. We provide equipment and coaching for flag and tackle football across multiple age groups.",
    schedule: ["Monday & Wednesday: 4:30–6:30 PM", "Saturday: 10:00 AM–1:00 PM"],
  },
  golf: {
    name: "Golf",
    image: golfAction,
    tagline: "The long game starts here.",
    description: "Our golf program introduces youth to the sport of patience and precision. With access to courses and professional instruction, we open doors that many thought were closed.",
    schedule: ["Wednesday: 3:30–5:30 PM", "Saturday: 8:00–11:00 AM"],
  },
};

type TennisSession = {
  id: string;
  name: string;
  locationName: string;
  coachName: string;
  levelLabel: string;
  nextSessionLabel: string;
  dateLabel: string;
  timeLabel: string;
  link: string;
};

const tennisDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const tennisSessionFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const tennisTimeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

const formatClockTime = (time24?: string) => {
  if (!time24) {
    return "TBA";
  }

  const [hours, minutes] = time24.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return tennisTimeFormatter.format(date);
};

const fetchUstaSessionsDirect = async (signal: AbortSignal): Promise<TennisSession[]> => {
  const filtersResponse = await fetch(
    "https://playtennis.usta.com/togethertennis/Coaching/GetSearchFilters?subCategory=GroupCoaching",
    { signal }
  );

  if (!filtersResponse.ok) {
    throw new Error("Unable to load tennis filters.");
  }

  const rawFilters = await filtersResponse.json();
  const filtersData = typeof rawFilters === "string" ? JSON.parse(rawFilters) : rawFilters;

  const searchResponse = await fetch(
    "https://prd-usta-kube.clubspark.pro/unified-search-api/api/Search/classic-coaching/Query",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        options: {
          size: 12,
          from: 0,
          sortKey: "date",
          // USTA/ClubSpark returns these two fields flipped in the filters payload.
          latitude: filtersData.longitude,
          longitude: filtersData.latitude,
        },
        filters: filtersData.filters.background,
      }),
      signal,
    }
  );

  if (!searchResponse.ok) {
    throw new Error("Unable to load tennis sessions.");
  }

  const searchData = await searchResponse.json();
  return (searchData.searchResults ?? []).map((result: any) => {
    const item = result.item;
    const nextSessionDate = new Date(item.nextDateTime);
    const coachName = [item.leader?.givenName, item.leader?.familyName].filter(Boolean).join(" ");
    const levels = (item.levels ?? []).map((level: { name: string }) => level.name).filter(Boolean);

    return {
      id: item.id,
      name: item.name,
      locationName: item.location?.name ?? "TBA",
      coachName: coachName || "TBA",
      levelLabel: levels.length > 0 ? levels.join(", ") : "All levels",
      nextSessionLabel: tennisSessionFormatter.format(nextSessionDate),
      dateLabel: tennisDateFormatter.format(nextSessionDate),
      timeLabel: `${tennisTimeFormatter.format(nextSessionDate)} - ${formatClockTime(item.endTime)}`,
      link: `https://playtennis.usta.com/togethertennis/Coaching/Session/${item.id}`,
    } satisfies TennisSession;
  });
};

const SportDetailPage = () => {
  const { sport } = useParams<{ sport: string }>();
  const data = sportData[sport || ""];
  const [tennisSessions, setTennisSessions] = useState<TennisSession[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [sessionsError, setSessionsError] = useState<string | null>(null);

  if (!data) {
    return (
      <div className="py-32 text-center">
        <h1 className="font-heading text-4xl font-black uppercase">Sport not found</h1>
        <Link to="/sports" className="text-accent mt-4 inline-block">← Back to Sports</Link>
      </div>
    );
  }

  const isTennis = sport === "tennis";

  useEffect(() => {
    if (!isTennis) {
      return;
    }

    const abortController = new AbortController();

    const loadTennisSessions = async () => {
      try {
        setSessionsLoading(true);
        setSessionsError(null);

        if (!import.meta.env.DEV) {
          try {
            const apiResponse = await fetch("/api/usta-sessions", {
              signal: abortController.signal,
            });

            if (!apiResponse.ok) {
              throw new Error("Unable to load tennis sessions.");
            }

            const apiSessions = await apiResponse.json();
            setTennisSessions(apiSessions);
            return;
          } catch {
            const fallbackSessions = await fetchUstaSessionsDirect(abortController.signal);
            setTennisSessions(fallbackSessions);
            return;
          }
        }

        const directSessions = await fetchUstaSessionsDirect(abortController.signal);
        setTennisSessions(directSessions);
      } catch (error) {
        if (!abortController.signal.aborted) {
          setSessionsError("Live USTA sessions are unavailable right now.");
        }
      } finally {
        if (!abortController.signal.aborted) {
          setSessionsLoading(false);
        }
      }
    };

    void loadTennisSessions();

    return () => {
      abortController.abort();
    };
  }, [isTennis]);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <img src={data.image} alt={data.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="font-body font-bold uppercase tracking-[0.3em] text-accent text-sm mb-3">Together Sports</p>
          <h1 className="font-heading text-6xl md:text-8xl font-black uppercase text-white">{data.name}</h1>
          <p className="text-xl text-white/70 mt-2">{data.tagline}</p>
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-heading text-4xl md:text-5xl font-black uppercase mb-6">
              About the <span className="brush-underline">Program</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{data.description}</p>
          </ScrollReveal>
        </div>
      </section>

      {isTennis && (
        <>
      {/* How Lessons Work */}
      <section className="py-16 md:py-24 bg-card scratchy-overlay">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-heading text-4xl md:text-5xl font-black uppercase mb-8">
              How Lessons <span className="text-accent">Work</span>
            </h2>
            <div className="aspect-video bg-background border border-border flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent text-2xl">▶</span>
                </div>
                <p className="text-muted-foreground">Video coming soon</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

          {/* Live Tennis Sessions */}
          <section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <h2 className="font-heading text-4xl md:text-5xl font-black uppercase mb-8">
                  Live <span className="brush-underline">USTA Sessions</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                  Discover our range of tennis programs designed for all skill levels, from beginner to advanced. Join
                  us for group sessions, fun community events, and the joy of learning tennis in a supportive
                  environment. Private lessons are also available, please contact us directly to arrange.
                </p>

                {sessionsLoading ? (
                  <div className="p-6 bg-card border border-border text-foreground font-body text-lg">
                    Loading live USTA sessions...
                  </div>
                ) : sessionsError ? (
                  <div className="space-y-4">
                    <div className="p-6 bg-card border border-border text-foreground font-body text-lg">
                      {sessionsError}
                    </div>
                    <a
                      href="https://playtennis.usta.com/togethertennis/Coaching"
                      className="inline-block px-8 py-4 bg-primary text-white font-heading font-bold uppercase tracking-wider hover:scale-105 transition-all duration-200"
                    >
                      View USTA Page
                    </a>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {tennisSessions.map((session) => (
                      <a
                        key={session.id}
                        href={session.link}
                        className="block border-2 border-border bg-card p-6 transition-colors duration-200 hover:border-accent"
                      >
                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                          <div>
                            <h3 className="font-heading text-3xl md:text-4xl font-black uppercase text-foreground mb-2">
                              {session.name}
                            </h3>
                            <p className="text-foreground text-lg md:text-xl">{session.nextSessionLabel}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-foreground">
                            <div>
                              <p className="font-body font-bold uppercase tracking-[0.16em] text-xs mb-1">Location</p>
                              <p className="text-lg">{session.locationName}</p>
                            </div>
                            <div>
                              <p className="font-body font-bold uppercase tracking-[0.16em] text-xs mb-1">Coach</p>
                              <p className="text-lg">{session.coachName}</p>
                            </div>
                            <div>
                              <p className="font-body font-bold uppercase tracking-[0.16em] text-xs mb-1">Level</p>
                              <p className="text-lg">{session.levelLabel}</p>
                            </div>
                            <div>
                              <p className="font-body font-bold uppercase tracking-[0.16em] text-xs mb-1">Next Session</p>
                              <p className="text-lg">{session.nextSessionLabel}</p>
                            </div>
                            <div>
                              <p className="font-body font-bold uppercase tracking-[0.16em] text-xs mb-1">Date</p>
                              <p className="text-lg">{session.dateLabel}</p>
                            </div>
                            <div>
                              <p className="font-body font-bold uppercase tracking-[0.16em] text-xs mb-1">Time</p>
                              <p className="text-lg">{session.timeLabel}</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </ScrollReveal>
            </div>
          </section>

        </>
      )}

      {/* Registration */}
      <section className="py-16 md:py-24 bg-card scratchy-overlay">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="scale">
            <h2 className="font-heading text-4xl md:text-5xl font-black uppercase mb-4">
              Ready to <span className="text-accent">{isTennis ? "Register?" : "Enter the Waitlist?"}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              {isTennis
                ? "Sign up through USTA or contact us directly to join the program."
                : "Join the waitlist and we will reach out as soon as space opens up for this sport."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {isTennis ? (
                <a href="#" className="inline-block px-8 py-4 bg-primary text-white font-heading font-bold uppercase tracking-wider hover:scale-105 transition-all duration-200">
                  USTA Registration →
                </a>
              ) : (
                <Link to="/contact" className="inline-block px-8 py-4 bg-primary text-white font-heading font-bold uppercase tracking-wider hover:scale-105 transition-all duration-200">
                  Join Waitlist →
                </Link>
              )}
              <Link to="/contact" className="inline-block px-8 py-4 bg-accent text-white font-heading font-bold uppercase tracking-wider hover:scale-105 transition-all duration-200">
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Second Serve (Tennis only) */}
      {isTennis && (
        <section className="py-20 md:py-28 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal direction="left">
                <div className="scrapbook-rotate-1">
                  <img src={secondServe} alt="Second Serve" className="w-full h-[400px] object-cover" />
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <p className="font-body font-bold uppercase tracking-[0.2em] text-accent text-sm mb-4">Partner Service + Initiative</p>
                <h2 className="font-heading text-5xl md:text-6xl font-black uppercase leading-[0.9] mb-6">
                  Second Serve
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Second Serve is a service from our partner Second Serve. Alongside that partnership, Together Tennis
                  is building its own Second Serve effort focused on collecting quality used tennis equipment that
                  people would otherwise throw away and donating it back into the community.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  The goal is simple: keep rackets, bags, balls, and gear in circulation so more kids can play with
                  what they need instead of being priced out of the sport.
                </p>
                <Link to="/get-involved" className="inline-block px-8 py-4 bg-accent text-white font-heading font-bold uppercase tracking-wider hover:scale-105 hover:rotate-1 transition-all duration-200">
                  Support Second Serve
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SportDetailPage;
