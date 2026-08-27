import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_DATA = [
  {
    number: "01 / 05",
    name: "Project One",
    slug: "project-one",
    category: "Brand Identity & Digital",
    image: "/images/selected-work/project-1.jpg",
  },
  {
    number: "02 / 05",
    name: "Project Two",
    slug: "project-two",
    category: "Architecture & Interiors",
    image: "/images/selected-work/project-2.jpg",
  },
  {
    number: "03 / 05",
    name: "Project Three",
    slug: "project-three",
    category: "Digital Experience",
    image: "/images/selected-work/project-3.jpg",
  },
  {
    number: "04 / 05",
    name: "Project Four",
    slug: "project-four",
    category: "Creative Direction",
    image: "/images/selected-work/project-4.jpg",
  },
  {
    number: "05 / 05",
    name: "Project Five",
    slug: "project-five",
    category: "Creative Direction",
    image: "/images/selected-work/project-5.jpg",
  },
];

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
      panels.forEach((panel, i) => {
        const nextPanel = panels[i + 1];
        if (nextPanel) {
          gsap.to(panel, {
            scale: 0.94,
            ease: "none",
            scrollTrigger: {
              trigger: nextPanel,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="selected-work" className="w-full bg-background">
      {/* 2-Column Intro Section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 justify-between items-end border-t border-border px-6 pt-[70px] pb-[50px] md:px-[8vw] md:pt-[80px] md:pb-[60px] lg:px-[12vw] lg:pt-[120px] lg:pb-[80px]">
        <div>
          <h2
            className="font-display font-medium leading-[1.05] tracking-[-0.04em] text-foreground"
            style={{ fontSize: "clamp(42px, 5vw, 82px)", maxWidth: "650px" }}
          >
            Ideas brought to life.
          </h2>
        </div>
        <div className="md:justify-self-end">
          <p
            className="text-muted-foreground leading-relaxed text-left md:text-right max-w-[420px]"
            style={{ fontSize: "clamp(16px, 1.2vw, 20px)", opacity: 0.75 }}
          >
            A selection of digital experiences, identities and campaigns created to help ambitious brands stand apart.
          </p>
        </div>
      </div>

      {/* Stacked Panels Container - Project Mask Region Start (z-[100]) */}
      <div
        ref={containerRef}
        id="selected-work-container"
        className="relative z-[100] w-full flex flex-col items-center pb-0 bg-background"
      >
        {PROJECTS_DATA.map((proj, idx) => (
          <div
            key={idx}
            id={`selected-project-${idx + 1}`}
            className="project-panel sticky top-0 w-full h-[80vh] md:h-[90vh] lg:h-screen min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden origin-center px-4 pb-4 md:px-6 md:pb-6"
            style={{
              zIndex: 100 + idx * 2,
            }}
          >
            {/* The actual card layout that has rounded corners */}
            <div className="relative w-full h-full rounded-[16px] md:rounded-[24px] overflow-hidden shadow-2xl bg-[#111111]">
              {/* Image */}
              <img
                src={proj.image}
                alt={proj.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.35) 100%)",
                }}
              />
              {/* Content Card */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div
                  className="w-full max-w-[320px] sm:max-w-[560px] text-center rounded-[20px] border border-white/12 p-8 sm:px-12 sm:py-10 flex flex-col items-center justify-center"
                  style={{
                    background: "rgba(20,20,20,0.45)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                  }}
                >
                  <span className="text-[12px] font-mono tracking-[0.14em] text-white/70 uppercase">
                    {proj.number}
                  </span>
                  <h3
                    className="text-white font-medium tracking-[-0.04em] mt-4 leading-tight"
                    style={{ fontSize: "clamp(30px, 4vw, 64px)" }}
                  >
                    {proj.name}
                  </h3>
                  <p className="text-[15px] text-white/72 mt-3 font-sans">{proj.category}</p>
                  <Link
                    to="/work/$slug"
                    params={{ slug: proj.slug }}
                    className="mt-7 px-[22px] py-[14px] bg-[#f5f3ee] text-[#161616] text-[12px] font-bold rounded-full transition-all duration-300 hover:scale-105 hover:bg-white active:scale-95 uppercase tracking-wider font-sans cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    <span>VIEW PROJECT</span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
