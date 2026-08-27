import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedCardProps {
  id: string;
  brandName: string;
  image: string;
  className?: string;
}

function FeaturedCard({ id, brandName, image, className }: FeaturedCardProps) {
  return (
    <div
      id={id}
      className={`relative z-30 overflow-visible rounded-[18px] md:rounded-[24px] bg-[#111111] group ${className}`}
    >
      {/* Image Container with rounded borders */}
      <div className="absolute inset-0 overflow-hidden rounded-[18px] md:rounded-[24px] bg-[#111111]">
        <img
          src={image}
          alt={brandName}
          className="w-full h-full object-cover object-center transition-transform duration-[600ms] ease-[cubic-bezier(0.22, 1, 0.36, 1)] group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 pointer-events-none" />
      </div>

      {/* Brand Label Wrapper - Full height flex container with justify-end */}
      <div className="relative w-full h-full pointer-events-none flex flex-col justify-end p-[16px] md:p-[32px] md:pl-[40px] md:pb-[32px] min-h-inherit">
        <span
          className="sticky bottom-[20px] md:bottom-[32px] self-start text-[28px] sm:text-[36px] md:text-[42px] font-medium tracking-[0.01em] text-white z-10 uppercase select-none pointer-events-auto"
          style={{
            textShadow: "0 2px 12px rgba(0,0,0,0.25)",
          }}
        >
          {brandName}
        </span>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const cards = [
    {
      id: "featured-project-1",
      brandName: "NOVA",
      image: "/images/featured/nova.jpg",
      className: "col-span-1 md:col-span-2 w-full aspect-[16/9]",
    },
    {
      id: "featured-project-2",
      brandName: "FORM",
      image: "/images/featured/form.jpg",
      className: "col-span-1 w-full h-[70vh] md:h-[85vh]",
    },
    {
      id: "featured-project-3",
      brandName: "ATLAS",
      image: "/images/featured/atlas.jpg",
      className: "col-span-1 w-full h-[70vh] md:h-[85vh]",
    },
    {
      id: "featured-project-4",
      brandName: "ORBIT",
      image: "/images/featured/orbit.jpg",
      className: "col-span-1 md:col-span-2 w-full aspect-[16/9]",
    },
  ];

  return (
    <section
      id="featured-projects"
      className="relative z-[100] w-full bg-background px-4 md:px-8 lg:px-12 pt-0 lg:pt-2 pb-0 md:pb-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px]">
        {cards.map((card) => (
          <FeaturedCard
            key={card.id}
            id={card.id}
            brandName={card.brandName}
            image={card.image}
            className={card.className}
          />
        ))}
      </div>
    </section>
  );
}
