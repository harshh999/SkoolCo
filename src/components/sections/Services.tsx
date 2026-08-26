import { useState } from "react";

interface ServiceItem {
  id: number;
  number: string;
  label: string;
  title: string;
  image: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    number: "1",
    label: "Strategy & Identity",
    title: "Brand Strategy & Identity Design",
    image: "/images/services/strategy.jpg",
  },
  {
    id: 2,
    number: "2",
    label: "Advertising",
    title: "Advertising & Production",
    image: "/images/services/advertising.jpg",
  },
  {
    id: 3,
    number: "3",
    label: "Digital Design",
    title: "UI & Website Design",
    image: "/images/services/digital.jpg",
  },
  {
    id: 4,
    number: "4",
    label: "Visualisation",
    title: "CGI & Walkthroughs",
    image: "/images/services/cgi.jpg",
  },
  {
    id: 5,
    number: "5",
    label: "Marketing",
    title: "Social Media Marketing",
    image: "/images/services/marketing.jpg",
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section
      id="services"
      className="relative z-10 w-full bg-background px-6 md:px-[8vw] lg:px-[12vw] pt-12 md:pt-20 pb-20 md:pb-32"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 md:mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-rect shrink-0 animate-pulse" />
            <span className="text-[12px] font-medium tracking-[0.14em] text-muted-foreground uppercase font-sans">
              OUR SERVICES
            </span>
          </div>
          <h2
            className="font-display font-medium leading-[1.02] tracking-[-0.04em] text-foreground"
            style={{ fontSize: "clamp(36px, 4.5vw, 68px)" }}
          >
            Ideas that move across every screen.
          </h2>
        </div>
      </div>

      {/* Accordion Container (Horizontal on Desktop, Vertical on Mobile) */}
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-5 h-auto md:h-[580px] lg:h-[650px] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
        {SERVICES_DATA.map((service) => {
          const isActive = activeId === service.id;

          return (
            <div
              key={service.id}
              onClick={() => setActiveId(service.id)}
              className={`group cursor-pointer rounded-[24px] overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between ${
                isActive
                  ? "bg-[#0b0d10] text-white md:flex-[3.5] p-6 sm:p-8 lg:p-10 shadow-2xl"
                  : "bg-[#efefed] hover:bg-[#e6e6e3] text-[#20252b] md:flex-1 p-6 md:p-7"
              }`}
            >
              {/* Top Row: Number Only */}
              <div className="w-full flex items-start justify-end gap-4">
                <span
                  className={`font-display leading-none font-medium select-none ${
                    isActive
                      ? "text-[#FFFFFF] text-[clamp(54px,5.5vw,100px)]"
                      : "text-[#4BB1AA] text-[clamp(44px,4vw,80px)]"
                  }`}
                  style={{
                    transition: "color 300ms ease-in-out, font-size 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {service.number}
                </span>
              </div>

              {/* Middle Content: Title */}
              <div className={`my-4 md:my-0 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}>
                <h3
                  className={`font-display font-medium leading-[1.1] tracking-[-0.03em] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? "text-white text-[clamp(26px,2.8vw,48px)] max-w-full md:max-w-[70%] lg:max-w-[60%]"
                      : "text-[#20252b] text-[18px] md:text-[20px] font-semibold line-clamp-2 md:line-clamp-3"
                  }`}
                >
                  {service.title}
                </h3>
              </div>

              {/* Bottom Image Container (Active Only) */}
              <div
                className={`w-full overflow-hidden rounded-[16px] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? "h-[200px] sm:h-[240px] md:h-[260px] lg:h-[320px] opacity-100 mt-6 scale-100"
                    : "h-0 opacity-0 mt-0 scale-95 pointer-events-none"
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

