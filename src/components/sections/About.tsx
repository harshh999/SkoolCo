import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FOUNDERS } from "@/data/site-content";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-about]", {
        y: 44,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="px-5 py-28 sm:px-8 lg:px-14 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <p data-about className="eyebrow">
          06 — About
        </p>
        <h2
          data-about
          className="mt-8 max-w-[15ch] font-display font-extrabold leading-[0.92] tracking-[-0.04em] text-foreground"
          style={{ fontSize: "clamp(2.3rem, 6.4vw, 5.2rem)" }}
        >
          Small team. Big ideas. No boring stuff.
        </h2>
        <p data-about className="mt-10 max-w-[620px] text-lg leading-relaxed text-muted-foreground">
          Skool Company is an independent creative company working across ideas, design, branding
          and culture. We stay small on purpose — so the people who make the work are the people you
          talk to.
        </p>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:max-w-[900px]">
          {FOUNDERS.map((f, i) => (
            <article
              key={i}
              data-about
              className="group rounded-[28px] border border-border bg-card/60 p-6 transition-all duration-300 hover:border-foreground/20 hover:shadow-lg"
            >
              {/* Premium abstract card header graphics */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-secondary flex items-center justify-center">
                <svg
                  className="absolute inset-0 w-full h-full opacity-60 mix-blend-overlay"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--tri)" />
                      <stop offset="100%" stopColor="var(--circ)" />
                    </linearGradient>
                  </defs>
                  <rect width="100" height="100" fill={`url(#grad-${i})`} />
                </svg>
                <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                  {i === 0 ? (
                    // Harsh - Creative Director geometric identity
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <polygon
                        points="30,8 52,48 8,48"
                        stroke="var(--foreground)"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <circle cx="30" cy="32" r="8" fill="var(--rect)" />
                    </svg>
                  ) : (
                    // Karan - Strategy & Brand geometric identity
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <rect
                        x="12"
                        y="12"
                        width="36"
                        height="36"
                        rx="8"
                        stroke="var(--foreground)"
                        strokeWidth="3"
                        fill="none"
                      />
                      <circle
                        cx="30"
                        cy="30"
                        r="10"
                        stroke="var(--tri)"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-foreground">{f.name}</h3>
              <p className="eyebrow mt-1">{f.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
