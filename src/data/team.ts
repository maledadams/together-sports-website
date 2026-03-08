import heroImage from "@/assets/hero-sports.jpg";
import image0903 from "@/assets/IMG_0903.jpg";
import image3782 from "@/assets/IMG_3782.jpg";
import mentorshipImg from "@/assets/mentorship.jpg";

export type TeamPerson = {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
};

export type TeamSection = {
  id: string;
  title: string;
  color: string;
  people: TeamPerson[];
};

const teamSections: TeamSection[] = [
  {
    id: "founder",
    title: "Founder",
    color: "#4f74d6",
    people: [
      {
        id: "founder-1",
        name: "Founder Name",
        role: "Founder & Executive Director",
        image: heroImage,
        alt: "Founder placeholder",
      },
    ],
  },
  {
    id: "staff",
    title: "Staff",
    color: "#87cb4a",
    people: [
      {
        id: "staff-1",
        name: "Staff Name",
        role: "Program Manager",
        image: mentorshipImg,
        alt: "Staff placeholder",
      },
      {
        id: "staff-2",
        name: "Staff Name",
        role: "Operations Coordinator",
        image: heroImage,
        alt: "Staff placeholder",
      },
      {
        id: "staff-3",
        name: "Staff Name",
        role: "Community Support",
        image: image3782,
        alt: "Staff placeholder",
      },
    ],
  },
  {
    id: "coaches",
    title: "Coaches",
    color: "#f6a15c",
    people: [
      {
        id: "coach-1",
        name: "Coach Name",
        role: "Head Coach",
        image: image0903,
        alt: "Coach placeholder",
      },
      {
        id: "coach-2",
        name: "Coach Name",
        role: "Assistant Coach",
        image: mentorshipImg,
        alt: "Coach placeholder",
      },
      {
        id: "coach-3",
        name: "Coach Name",
        role: "Youth Development Coach",
        image: heroImage,
        alt: "Coach placeholder",
      },
    ],
  },
];

export default teamSections;
