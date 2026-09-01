// Structured site content data for Skool Company website.

export interface NavItem {
  id: string;
  label: string;
}

export interface Project {
  client: string;
  title: string;
  category: string;
  img: string; // URL path of the WebP asset in public folder
  span: string;
  ratio: string;
}

export interface Service {
  title: string;
  desc: string;
}

export interface Founder {
  name: string;
  role: string;
  note: string;
  image?: string; // Optional image path
}

export interface SocialLink {
  name: string;
  url: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
];

export const PROJECTS: Project[] = [
  {
    client: "Northbound",
    title: "A identity built to travel",
    category: "Branding",
    img: "/images/projects/project-work-01.webp",
    span: "lg:col-span-7",
    ratio: "aspect-[4/5]",
  },
  {
    client: "Suno Media",
    title: "Scroll-stopping social system",
    category: "Social Media",
    img: "/images/projects/project-work-02.webp",
    span: "lg:col-span-5 lg:mt-32",
    ratio: "aspect-[7/5]",
  },
  {
    client: "Maison Rue",
    title: "Stationery for a slow wedding",
    category: "Wedding Stationery",
    img: "/images/projects/project-work-03.webp",
    span: "lg:col-span-5",
    ratio: "aspect-[6/5]",
  },
  {
    client: "Verta",
    title: "Product interface, rebuilt",
    category: "UI Design",
    img: "/images/projects/project-work-04.webp",
    span: "lg:col-span-7 lg:mt-16",
    ratio: "aspect-[4/5]",
  },
];

export const SERVICES: Service[] = [
  { title: "Advertising", desc: "Campaigns and ideas designed to capture attention." },
  { title: "Branding", desc: "Distinct identities built for recognition and relevance." },
  { title: "Social Media", desc: "Content and campaigns designed for culture and conversation." },
  {
    title: "Wedding Stationery",
    desc: "Distinctive visual storytelling for meaningful celebrations.",
  },
  { title: "UI Design", desc: "Digital experiences that balance aesthetics and usability." },
];

export const CLIENT_BRANDS: string[] = [
  "NORTHBOUND",
  "Kalaa Studio",
  "ORBIT&CO",
  "Maison Rue",
  "PALLAV",
  "Field Notes",
  "VERTA",
  "Suno Media",
  "ATLAS WORKS",
  "Bhuj Bazaar",
  "LUMEN",
  "Chai Society",
];

export const FOUNDERS: Founder[] = [
  {
    name: "Harsh Thakkar",
    role: "Creative Director",
    note: "Leads ideas, art direction and the studio's visual point of view.",
  },
  {
    name: "Karan Vyas",
    role: "Strategy & Brand",
    note: "Shapes positioning, narrative and the way work meets culture.",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "Instagram", url: "https://www.instagram.com/skoolcompany/?hl=en" },
  { name: "Facebook", url: "https://www.facebook.com/skoolcompany/" },
  { name: "LinkedIn", url: "https://in.linkedin.com/company/skoolcompany" },
];

export const CONTACT_DETAILS = {
  phone: "+91 8904 05004",
  phoneLink: "tel:+91890405004",
  email: "hello@skool.company",
  emailLink: "mailto:hello@skool.company",
  locations: {
    ahmedabad: {
      label: "AHMEDABAD",
      address: "614, Shilp Epitome, Rajpath Rangoli Rd, Sindhubhavan Rd, Ahmedabad, Gujarat 380059",
    },
    bhuj: {
      label: "BHUJ",
      address: "Skool Co., Banker’s Colony, Opp. Bhaktidham Apartment, Bhuj, Gujarat 370001",
    },
  },
};
