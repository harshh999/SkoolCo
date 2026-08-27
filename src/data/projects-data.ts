export interface ProjectResult {
  metric: string;
  label: string;
  description?: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption?: string;
  span?: string;
  aspect?: string;
}

export interface NextProjectInfo {
  slug: string;
  title: string;
  number: string;
  category: string;
  image: string;
}

export interface ProjectDetail {
  slug: string;
  number: string;
  title: string;
  category: string;
  client: string;
  industry: string;
  year: string;
  duration: string;
  heroImage: string;
  tagline: string;
  overview: {
    summary: string;
    challengeBrief: string;
    strategyBrief: string;
    deliveryBrief: string;
  };
  challenge: string;
  strategy: string;
  execution: string;
  outcome: string;
  services: string[];
  scope: string[];
  deliverables: string[];
  results: ProjectResult[];
  testimonial?: ProjectTestimonial;
  gallery: ProjectGalleryItem[];
  nextProject: NextProjectInfo;
}

export const PROJECTS_DETAIL_DATA: Record<string, ProjectDetail> = {
  "project-one": {
    slug: "project-one",
    number: "01 / 05",
    title: "Aura Studio",
    category: "Brand Identity & Digital",
    client: "Aura Spatial Design",
    industry: "Luxury Architecture & Interiors",
    year: "2025",
    duration: "12 Weeks",
    heroImage: "/images/selected-work/project-1.jpg",
    tagline:
      "Elevating luxury spatial design through digital minimalism, architectural monographs, and tactile visual storytelling.",
    overview: {
      summary:
        "Aura is a high-end architectural lifestyle studio crafting timeless residences and boutique retail environments. They partnered with Skool Co. to reinvent their digital presence, reposition their luxury brand narrative, and craft an editorial digital flagship that matches their physical craftsmanship.",
      challengeBrief:
        "Aura had built an extraordinary offline reputation but suffered from an outdated, fragmented digital presence that failed to convey their minimalist design philosophy.",
      strategyBrief:
        "We developed a monolithic, editorial design system inspired by architectural monographs, prioritizing full-bleed visual scale and subdued typography.",
      deliveryBrief:
        "Delivered a comprehensive brand identity suite, custom headless digital showcase, editorial lookbooks, and high-converting marketing assets.",
    },
    challenge:
      "Aura had built a prestigious physical portfolio across Europe and North America, yet their digital channels were fragmented and failed to convey the visceral atmosphere of their physical spaces. Inbound client inquiries were frequently misaligned with their premium pricing tiers, and their portfolio failed to reflect their expansive architectural capabilities.",
    strategy:
      "We conceived an editorial-first brand architecture rooted in the concept of 'Monolithic Harmony'. By stripping away digital clutter and letting architectural forms command the viewport, we established Aura as an international design authority. Every typography choice, transition curve, and negative space was calculated to evoke quiet confidence and timeless luxury.",
    execution:
      "Our team directed the complete brand transformation: designing a bespoke typography lockup, producing high-fidelity 3D spatial renders, and engineering a lightning-fast digital experience with fluid spatial transitions. We also created physical brand collateral including clothbound project monographs and a modular digital presentation system for high-net-worth clientele.",
    outcome:
      "Following the launch, Aura experienced a 340% surge in qualified international architecture inquiries and secured three landmark institutional commissions within the first 60 days. The digital experience was featured across global design publications, establishing a new benchmark in architectural digital presence.",
    services: [
      "Brand Strategy",
      "Creative Direction",
      "Website Design",
      "Digital Experience",
      "Content Strategy",
      "3D Visual Direction",
    ],
    scope: [
      "Comprehensive Brand Identity & Guidelines",
      "Custom Editorial Web Experience",
      "3D Spatial Renders & Motion Assets",
      "Bespoke Monograph & Print Collateral",
      "Executive Pitch Deck & Sales Systems",
    ],
    deliverables: [
      "Complete Brand Identity Suite & Master Typography Guidelines",
      "Custom Headless Web Platform with Fluid Screen Choreography",
      "Curated Architectural Monograph & Print Collateral Suite",
      "High-Resolution Campaign Asset Library & Motion Design System",
    ],
    results: [
      {
        metric: "+340%",
        label: "Qualified Inquiries",
        description: "Increase in high-value inbound architectural proposals",
      },
      {
        metric: "4.8M+",
        label: "Editorial Impressions",
        description: "Organic reach across global design and lifestyle media",
      },
      {
        metric: "68%",
        label: "Dwell Time Increase",
        description: "Average session duration across digital case studies",
      },
      {
        metric: "12x",
        label: "Pipeline ROI",
        description: "Return on brand identity & web overhaul investment",
      },
    ],
    testimonial: {
      quote:
        "Skool Co. completely transformed how the global design world perceives our work. The attention to detail, editorial rigor, and technical execution was nothing short of world-class.",
      author: "Elena Vance",
      role: "Founder & Principal Architect",
      company: "Aura Studio",
    },
    gallery: [
      {
        src: "/images/selected-work/project-1.jpg",
        alt: "Aura Studio Hero Visual Architecture",
        caption: "Main architectural monograph cover visual and hero identity.",
        span: "col-span-12",
        aspect: "aspect-[16/9]",
      },
      {
        src: "/images/featured/form.jpg",
        alt: "Editorial Layout & Spatial Typography",
        caption: "Minimalist spatial composition with bespoke editorial layout.",
        span: "col-span-12 md:col-span-6",
        aspect: "aspect-[4/3]",
      },
      {
        src: "/images/services/strategy.jpg",
        alt: "Brand Collateral & Material Selection",
        caption: "Tactile material library and monograph layout system.",
        span: "col-span-12 md:col-span-6",
        aspect: "aspect-[4/3]",
      },
      {
        src: "/images/featured/nova.jpg",
        alt: "Digital Showcase & Mobile Interface",
        caption: "Full-width digital portfolio showcase with fluid responsiveness.",
        span: "col-span-12",
        aspect: "aspect-[21/9]",
      },
    ],
    nextProject: {
      slug: "project-two",
      title: "Project Two",
      number: "02 / 05",
      category: "Architecture & Interiors",
      image: "/images/selected-work/project-2.jpg",
    },
  },

  "project-two": {
    slug: "project-two",
    number: "02 / 05",
    title: "Project Two",
    category: "Architecture & Interiors",
    client: "Kanso Living Environments",
    industry: "Sustainable Real Estate & Architecture",
    year: "2025",
    duration: "16 Weeks",
    heroImage: "/images/selected-work/project-2.jpg",
    tagline:
      "Translating spatial serenity into a tactile brand universe and multi-sensory residential launch campaign.",
    overview: {
      summary:
        "Kanso Living is a forward-thinking architecture practice pioneering biophilic residential living. They engaged Skool Co. to lead end-to-end creative direction, brand identity, and a launch campaign for their flagship residential development.",
      challengeBrief:
        "Launching a landmark multi-unit development in an oversaturated market required cutting through standard luxury clichés with an authentic cultural narrative.",
      strategyBrief:
        "We built the 'Living With Space' concept—positioning every residence not as square footage, but as an immersive architectural sanctuary.",
      deliveryBrief:
        "Delivered a complete visual identity, cinematic documentary shorts, an interactive virtual residence portal, and bespoke print monographs.",
    },
    challenge:
      "Conventional real estate marketing relies on sterile renders and generic lifestyle tropes. Kanso needed to communicate the subtle, calming qualities of biophilic architecture—natural ventilation, diffused daylight, and organic rammed-earth textures—to attract discerning buyers looking for wellness-centered living.",
    strategy:
      "We engineered a cultural campaign titled 'Living With Space'. Rather than leading with floor plans, we led with sensory experiences: morning light studies, ambient soundscapes recorded on-site, and interviews with craftsmen. The digital portal allowed prospective residents to explore light patterns throughout the seasons.",
    execution:
      "Created a complete brand identity with custom logotype and earth-toned palette, produced 8 cinematic film shorts, designed an interactive residency portal with real-time reservation capabilities, and curated a limited clothbound publication distributed to private collectors.",
    outcome:
      "All residential units were 100% reserved within 45 days of launch—four months ahead of schedule. The campaign generated over 3.2 million targeted views with zero spend on conventional broker listing platforms.",
    services: [
      "Creative Direction",
      "Brand Identity",
      "Content Strategy",
      "Performance Marketing",
      "Social Media",
      "Film Production",
    ],
    scope: [
      "Campaign Concept & Art Direction",
      "Architectural Film & Documentary Shorts",
      "Interactive Virtual Residency Platform",
      "Limited Edition Print Monograph",
      "Paid Acquisition Funnel & Lead Nurturing",
    ],
    deliverables: [
      "Full Identity Guidelines & Architectural Tone of Voice",
      "8-Part Cinematic Video Series for Digital & Social",
      "Interactive Residency Selection Web Platform",
      "Custom Hardcover Monograph for VIP Inquiries",
    ],
    results: [
      {
        metric: "100%",
        label: "Units Reserved in 45 Days",
        description: "Entire development sold out 4 months ahead of schedule",
      },
      {
        metric: "3.2M+",
        label: "Targeted Video Views",
        description: "Organic and targeted impressions across documentary series",
      },
      {
        metric: "42%",
        label: "Lower Acquisition Cost",
        description: "Reduction in customer acquisition cost vs. traditional brokers",
      },
      {
        metric: "98/100",
        label: "Brand Resonance Score",
        description: "Positive sentiment and design feedback from buyers",
      },
    ],
    testimonial: {
      quote:
        "Skool Co. didn't just market our development; they captured the soul of our architectural philosophy and articulated it with breathtaking clarity.",
      author: "Marcus Chen",
      role: "Managing Director",
      company: "Kanso Living",
    },
    gallery: [
      {
        src: "/images/selected-work/project-2.jpg",
        alt: "Kanso Spatial Architecture",
        caption: "Hero architectural facade and biophilic material palette.",
        span: "col-span-12",
        aspect: "aspect-[16/9]",
      },
      {
        src: "/images/featured/atlas.jpg",
        alt: "Minimalist Interior Detailing",
        caption: "Diffused morning daylight and handcrafted woodwork.",
        span: "col-span-12 md:col-span-7",
        aspect: "aspect-[4/3]",
      },
      {
        src: "/images/services/digital.jpg",
        alt: "Interactive Digital Experience",
        caption: "Virtual residency exploration portal interface.",
        span: "col-span-12 md:col-span-5",
        aspect: "aspect-[4/3]",
      },
      {
        src: "/images/projects/project-work-03.webp",
        alt: "Custom Editorial Print Suite",
        caption: "Tactile print invitations and clothbound prospectus.",
        span: "col-span-12",
        aspect: "aspect-[21/9]",
      },
    ],
    nextProject: {
      slug: "project-three",
      title: "Project Three",
      number: "03 / 05",
      category: "Digital Experience",
      image: "/images/selected-work/project-3.jpg",
    },
  },

  "project-three": {
    slug: "project-three",
    number: "03 / 05",
    title: "Project Three",
    category: "Digital Experience",
    client: "Veloce Mobility & Fintech",
    industry: "Fintech & Urban Micro-Mobility",
    year: "2024",
    duration: "10 Weeks",
    heroImage: "/images/selected-work/project-3.jpg",
    tagline:
      "Harmonizing complex financial micro-transactions with fluid motion design and effortless mobile onboarding.",
    overview: {
      summary:
        "Veloce is a high-growth tech platform uniting electric micro-mobility networks with instant, frictionless contactless payments. They engaged Skool Co. to completely overhaul their digital application, web platform, and motion design ecosystem.",
      challengeBrief:
        "Veloce's existing product felt technical and intimidating, leading to high drop-off during onboarding and user activation.",
      strategyBrief:
        "We reimagined the user journey around 'Kinetic Fluidity'—engineering every interaction, gesture, and feedback state to feel instantaneous and rewarding.",
      deliveryBrief:
        "Delivered a comprehensive mobile and web design system with 200+ modular UI components, full dark-mode optimization, and motion choreography.",
    },
    challenge:
      "As Veloce expanded across 14 European metropolitan cities, user drop-off during payment verification and vehicle unlocking was impeding growth. The app lacked visual distinction and felt like an administrative utility rather than a delightful lifestyle tool.",
    strategy:
      "We defined a product design philosophy centered on 'Frictionless Rhythm'. By introducing haptic-aligned micro-animations, dynamic route previews, and a simplified one-tap unlock ritual, we turned a mundane transaction into an empowering, fluid physical-to-digital interaction.",
    execution:
      "Designed a cohesive design system comprising 200+ components in Figma, built interactive high-fidelity prototypes in React, created animated 3D vehicle assets, and designed an award-winning web showcase and performance marketing assets for app store acquisition.",
    outcome:
      "Onboarding completion skyrocketed by 210%, while checkout drop-off rates fell by nearly half. Veloce reached 1.2 million active monthly riders within 90 days of the update and maintained a 4.9-star rating.",
    services: [
      "Digital Experience",
      "UI Design",
      "Brand Strategy",
      "Creative Direction",
      "Paid Advertising",
      "Motion Design",
    ],
    scope: [
      "Mobile App UI/UX Architecture",
      "Design System & Component Library",
      "Kinetic Motion Design & Micro-Interactions",
      "Web Platform & App Store Creative Suite",
      "Performance Marketing Ad Kits",
    ],
    deliverables: [
      "Multi-Platform Design System with 200+ Reusable Components",
      "Interactive Native Motion Guidelines & Lottie Animation Suite",
      "High-Converting Web Product Showcase & Download Gateway",
      "Localized Multi-Language Ad Creative Toolkit",
    ],
    results: [
      {
        metric: "+210%",
        label: "Onboarding Completion",
        description: "Massive reduction in drop-off during initial registration",
      },
      {
        metric: "1.2M",
        label: "Active Monthly Users",
        description: "Scaled across 14 European markets within 90 days",
      },
      {
        metric: "4.9 ★",
        label: "App Store Rating",
        description: "Maintained across 15,000+ verified customer reviews",
      },
      {
        metric: "-48%",
        label: "Checkout Drop-Off",
        description: "Reduction in friction during payment verification",
      },
    ],
    testimonial: {
      quote:
        "The interface Skool Co. designed for Veloce made complex fintech mechanics feel as light and smooth as silk. Our riders love the experience.",
      author: "Siddharth Mehta",
      role: "Chief Product Officer",
      company: "Veloce Mobility",
    },
    gallery: [
      {
        src: "/images/selected-work/project-3.jpg",
        alt: "Veloce Digital Interface",
        caption: "Dynamic mobile UI dashboard and kinetic interaction system.",
        span: "col-span-12",
        aspect: "aspect-[16/9]",
      },
      {
        src: "/images/projects/project-work-04.webp",
        alt: "Product UI Dashboard Components",
        caption: "Component design system and real-time transit telemetry.",
        span: "col-span-12 md:col-span-6",
        aspect: "aspect-[4/3]",
      },
      {
        src: "/images/services/advertising.jpg",
        alt: "Performance Marketing Ads",
        caption: "Targeted digital advertising and viral motion collateral.",
        span: "col-span-12 md:col-span-6",
        aspect: "aspect-[4/3]",
      },
      {
        src: "/images/featured/orbit.jpg",
        alt: "Brand Motion & Campaign Imagery",
        caption: "High-contrast urban campaign visuals and lifestyle imagery.",
        span: "col-span-12",
        aspect: "aspect-[21/9]",
      },
    ],
    nextProject: {
      slug: "project-four",
      title: "Project Four",
      number: "04 / 05",
      category: "Creative Direction",
      image: "/images/selected-work/project-4.jpg",
    },
  },

  "project-four": {
    slug: "project-four",
    number: "04 / 05",
    title: "Project Four",
    category: "Creative Direction",
    client: "Maison Rue Atelier",
    industry: "Bespoke Luxury Stationery & Events",
    year: "2024",
    duration: "8 Weeks",
    heroImage: "/images/selected-work/project-4.jpg",
    tagline:
      "Crafting slow-crafted stationery and poetic visual storytelling for high-profile celebrations and luxury ateliers.",
    overview: {
      summary:
        "Maison Rue is a French-inspired artisanal design house crafting bespoke stationery suites for destination weddings and luxury galas. They partnered with Skool Co. for global creative direction, brand identity, and a digital boutique experience.",
      challengeBrief:
        "Communicating the rich tactile qualities of heavy deckled papers, custom wax seals, and letterpress foils in a purely digital e-commerce environment.",
      strategyBrief:
        "We created a sensory-first digital atelier featuring macro-photography, tactile lighting dynamics, and custom interactive customization tools.",
      deliveryBrief:
        "Delivered a complete visual identity, editorial lookbook direction, custom digital ordering system, and curated social media launch strategy.",
    },
    challenge:
      "Bespoke stationery is an inherently physical medium. Maison Rue needed an online experience that could convey the weight of 600gsm cotton paper, the glint of hand-pressed metallic foil, and the bespoke calligraphy craft to international event planners and high-profile clientele.",
    strategy:
      "We built the brand experience around 'Tactile Reverie'. Using macro video close-ups, subtle paper texture simulations, and an interactive suite builder, prospective clients can configure paper weights, ribbon ties, and monogram foil treatments in real-time.",
    execution:
      "Designed the complete identity system, directed photographic and film shoots in Paris and Provence, engineered a bespoke headless e-commerce store with an intuitive customization suite, and developed organic social editorial guidelines.",
    outcome:
      "Maison Rue's order books filled for 12 months in advance within weeks of launch. Average order value increased by 460%, and the brand was spotlighted across Vogue Weddings, Harper's Bazaar, and The Lane.",
    services: [
      "Creative Direction",
      "Brand Strategy",
      "Website Design",
      "Social Media",
      "Content Strategy",
      "Photography Direction",
    ],
    scope: [
      "Atelier Brand Identity & Typography",
      "Interactive Customization E-Commerce Platform",
      "Editorial Photography & Art Direction",
      "Social Storytelling & Influencer Gifting Suite",
      "Packaging & Physical Unboxing Experience",
    ],
    deliverables: [
      "Comprehensive Identity Manual & Custom Monogram Guidelines",
      "Custom E-Commerce Platform with Live Product Customizer",
      "High-Resolution Editorial Photo Library & Lookbook",
      "Physical Packaging Box System & Foil-Stamped Paper Specs",
    ],
    results: [
      {
        metric: "12 Mos",
        label: "Advance Booking",
        description: "Entire studio capacity booked within 30 days of launch",
      },
      {
        metric: "+460%",
        label: "Average Order Value",
        description: "Achieved via curated bespoke customization tiers",
      },
      {
        metric: "3.8x",
        label: "Social Engagement Rate",
        description: "Viral organic reach across Pinterest and Instagram Reels",
      },
      {
        metric: "3x",
        label: "Major Press Features",
        description: "Editorial coverage in Vogue Weddings & Harper's Bazaar",
      },
    ],
    testimonial: {
      quote:
        "Skool Co. gave Maison Rue an ethereal digital home. They translated our craft into an art form that deeply resonated with our global clientele.",
      author: "Camille Laurent",
      role: "Creative Director & Founder",
      company: "Maison Rue",
    },
    gallery: [
      {
        src: "/images/selected-work/project-4.jpg",
        alt: "Maison Rue Stationery Craft",
        caption: "Bespoke letterpress suite and hand-torn deckled edges.",
        span: "col-span-12",
        aspect: "aspect-[16/9]",
      },
      {
        src: "/images/projects/project-work-03.webp",
        alt: "Handcrafted Letterpress Details",
        caption: "Custom wax seals, botanical calligraphy, and foil stamping.",
        span: "col-span-12 md:col-span-6",
        aspect: "aspect-[4/3]",
      },
      {
        src: "/images/services/marketing.jpg",
        alt: "Editorial Brand Narrative",
        caption: "Art direction for editorial lookbook and destination showcases.",
        span: "col-span-12 md:col-span-6",
        aspect: "aspect-[4/3]",
      },
      {
        src: "/images/featured/form.jpg",
        alt: "Artisan Atelier Showcase",
        caption: "Sensory studio photography capturing artisanal paper craft.",
        span: "col-span-12",
        aspect: "aspect-[21/9]",
      },
    ],
    nextProject: {
      slug: "project-five",
      title: "Project Five",
      number: "05 / 05",
      category: "Creative Direction",
      image: "/images/selected-work/project-5.jpg",
    },
  },

  "project-five": {
    slug: "project-five",
    number: "05 / 05",
    title: "Project Five",
    category: "Creative Direction",
    client: "Suno Audio & Media",
    industry: "Music, Media & Gen-Z Culture",
    year: "2024",
    duration: "14 Weeks",
    heroImage: "/images/selected-work/project-5.jpg",
    tagline:
      "Building a scroll-stopping cultural narrative and viral social ecosystem that turned music listeners into brand evangelists.",
    overview: {
      summary:
        "Suno Media is an independent audio collective and creator platform celebrating underground music culture. They brought in Skool Co. to helm creative direction, brand identity, and a multi-channel launch campaign for their creator accelerator program.",
      challengeBrief:
        "Breaking through the noise in an oversaturated creator economy and establishing instant credibility with underground artists and tastemakers.",
      strategyBrief:
        "We designed an electric, high-contrast visual system anchored in bold typography, kinetic motion graphics, and raw street-style documentation.",
      deliveryBrief:
        "Crafted 60+ dynamic social assets, interactive digital audio visualizers, a limited-run merchandise line, and performance ad funnels.",
    },
    challenge:
      "Music tech marketing is notoriously repetitive and corporate. Suno needed a visual language that felt raw, authentic, and native to underground club culture, while still delivering scalable performance marketing metrics and clear partner acquisition funnels.",
    strategy:
      "We developed the 'Raw Frequency' campaign—embracing neon chromatic aberration, poster typography, strobe-speed motion cuts, and unfiltered behind-the-scenes artist footage. The campaign was built specifically to disrupt TikTok and Instagram algorithm feeds.",
    execution:
      "Designed the complete visual identity, animated 60+ social assets and 3D visualizers, designed a collectible capsule merchandise line, and deployed a hyper-targeted paid media strategy across Spotify, TikTok, and Meta.",
    outcome:
      "Over 18.4 million impressions in the first 30 days, generating 45,000+ creator submissions and exceeding partner acquisition goals by 350%. Suno's social following expanded by 320% in three months.",
    services: [
      "Creative Direction",
      "Social Media",
      "Brand Strategy",
      "Paid Advertising",
      "Content Strategy",
      "Motion Design",
    ],
    scope: [
      "Creator Campaign Direction & Art Direction",
      "Dynamic Motion Design & 3D Audio Visualizers",
      "60+ Social Creatives, Reels & Short-Form Video",
      "Capsule Merchandise Design & Physical Collateral",
      "Performance Paid Media Management",
    ],
    deliverables: [
      "Modular Social Media Design System & Motion Graphics Templates",
      "Interactive 3D Audio Web Visualizer Application",
      "60+ High-Performing Multi-Platform Video & Static Ad Sets",
      "Limited Edition Apparel & Merchandise Package",
    ],
    results: [
      {
        metric: "18.4M",
        label: "Campaign Impressions",
        description: "Viral reach achieved across TikTok and Reels in 30 days",
      },
      {
        metric: "45K+",
        label: "Creator Submissions",
        description: "Exceeded initial talent acquisition goals by 350%",
      },
      {
        metric: "5.4x",
        label: "ROAS on Paid Ads",
        description: "High-efficiency conversion across paid acquisition funnels",
      },
      {
        metric: "+320%",
        label: "Follower Growth",
        description: "Organic community expansion across social channels",
      },
    ],
    testimonial: {
      quote:
        "Skool Co. knows how to capture culture. They created a campaign that didn't feel like advertising—it felt like a movement that our community owned.",
      author: "Tariq Edwards",
      role: "Head of Marketing",
      company: "Suno Media",
    },
    gallery: [
      {
        src: "/images/selected-work/project-5.jpg",
        alt: "Suno Sound Hero Visual",
        caption: "High-contrast neon brand identity and campaign lockup.",
        span: "col-span-12",
        aspect: "aspect-[16/9]",
      },
      {
        src: "/images/projects/project-work-02.webp",
        alt: "Social Campaign Visual Grid",
        caption: "Scroll-stopping social media motion system and cover art.",
        span: "col-span-12 md:col-span-7",
        aspect: "aspect-[4/3]",
      },
      {
        src: "/images/services/advertising.jpg",
        alt: "Kinetic Motion Poster Ads",
        caption: "Street-level poster campaign and animated digital out-of-home ads.",
        span: "col-span-12 md:col-span-5",
        aspect: "aspect-[4/3]",
      },
      {
        src: "/images/featured/atlas.jpg",
        alt: "Physical Collateral & Merch",
        caption: "Collectible merchandise capsule and underground launch artifacts.",
        span: "col-span-12",
        aspect: "aspect-[21/9]",
      },
    ],
    nextProject: {
      slug: "project-one",
      title: "Project One",
      number: "01 / 05",
      category: "Brand Identity & Digital",
      image: "/images/selected-work/project-1.jpg",
    },
  },
};

// Map slug aliases (e.g. project-1 -> project-one)
const SLUG_ALIASES: Record<string, string> = {
  "project-1": "project-one",
  "project-2": "project-two",
  "project-3": "project-three",
  "project-4": "project-four",
  "project-5": "project-five",
};

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  const normalized = SLUG_ALIASES[slug.toLowerCase()] || slug.toLowerCase();
  return PROJECTS_DETAIL_DATA[normalized];
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(PROJECTS_DETAIL_DATA);
}
