import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import contactLogo from "@/assets/SPORTSTOGETHERHANDLOGO.png";

const ContactPage = () => {
  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden bg-[#f6a15c]">
        <div className="absolute left-8 top-10 h-20 w-20 rounded-full bg-white/10" />
        <div className="absolute left-[22%] top-20 h-12 w-12 bg-white/10 scrapbook-rotate-2" />
        <div className="absolute right-12 top-12 h-16 w-16 rotate-45 bg-white/10" />
        <div className="absolute right-[24%] top-24 h-14 w-14 rounded-full bg-white/10" />
        <div className="absolute right-20 bottom-8 h-10 w-10 bg-white/10 scrapbook-rotate-3" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:pt-28 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-heading text-6xl md:text-[5.25rem] font-black uppercase leading-[0.95] mb-4 text-white">
              <span className="whitespace-nowrap">Contact </span>
              <span className="whitespace-nowrap">Us</span>
            </h1>
            <p className="text-white font-bold text-lg md:text-xl max-w-2xl mx-auto font-body">
              Questions, partnerships, volunteering, or support requests, reach out and we will point you in the right
              direction.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-stretch">
            <ScrollReveal direction="left">
              <div className="h-full flex flex-col">
                <h2 className="font-heading text-3xl font-black uppercase mb-8">
                  Send Us a <span className="text-[#f6a15c]">Message</span>
                </h2>
                <form className="space-y-4 flex-1" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="p-4 bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:border-[#f6a15c] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="p-4 bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:border-[#f6a15c] focus:outline-none"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-4 bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:border-[#f6a15c] focus:outline-none"
                  />
                  <select className="w-full p-4 bg-card border border-border text-foreground font-body focus:border-[#f6a15c] focus:outline-none">
                    <option>What's this about?</option>
                    <option>General Inquiry</option>
                    <option>Volunteer</option>
                    <option>Partnerships</option>
                    <option>Donations</option>
                    <option>Media</option>
                  </select>
                  <textarea
                    rows={5}
                    placeholder="Your message..."
                    className="w-full p-4 bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:border-[#f6a15c] focus:outline-none resize-none"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-[#f6a15c] text-white font-heading font-bold text-lg uppercase tracking-wider hover:scale-105 hover:rotate-1 transition-all duration-200"
                  >
                    Send It →
                  </button>
                </form>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="h-full min-h-[430px] flex items-center justify-center p-8 md:p-12">
                <img src={contactLogo} alt="Together Sports logo" className="w-full max-w-md h-auto object-contain" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
