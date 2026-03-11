import basketballAction from "@/assets/basketball-action.jpg";
import communityImg from "@/assets/community.jpg";
import contactCommunity from "@/assets/contact-community.jpg";
import footballAction from "@/assets/football-action.jpg";
import golfAction from "@/assets/golf-action.jpg";
import heroImage from "@/assets/hero-sports.jpg";
import image0903 from "@/assets/IMG_0903.jpg";
import image3782 from "@/assets/IMG_3782.jpg";
import mentorshipImg from "@/assets/mentorship.jpg";
import partner1 from "@/assets/partner-1.png";
import partner2 from "@/assets/partner-2.png";
import partner3 from "@/assets/partner-3.png";
import partner4 from "@/assets/partner-4.webp";
import secondServe from "@/assets/second-serve.jpg";
import tennisAction from "@/assets/tennis-action.jpg";

export type MediaLibraryItem = {
  id: string;
  label: string;
  src: string;
};

export const mediaLibrary: MediaLibraryItem[] = [
  { id: "hero-sports", label: "Hero Sports", src: heroImage },
  { id: "img-0903", label: "IMG 0903", src: image0903 },
  { id: "img-3782", label: "IMG 3782", src: image3782 },
  { id: "mentorship", label: "Mentorship", src: mentorshipImg },
  { id: "community", label: "Community", src: communityImg },
  { id: "contact-community", label: "Contact Community", src: contactCommunity },
  { id: "second-serve", label: "Second Serve", src: secondServe },
  { id: "tennis-action", label: "Tennis Action", src: tennisAction },
  { id: "basketball-action", label: "Basketball Action", src: basketballAction },
  { id: "football-action", label: "Football Action", src: footballAction },
  { id: "golf-action", label: "Golf Action", src: golfAction },
  { id: "partner-1", label: "Partner 1", src: partner1 },
  { id: "partner-2", label: "Partner 2", src: partner2 },
  { id: "partner-3", label: "Partner 3", src: partner3 },
  { id: "partner-4", label: "Partner 4", src: partner4 },
];
