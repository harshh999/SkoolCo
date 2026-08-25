import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/data/site-content";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-service]", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="services" className="px-5 py-28 sm:px-8 lg:px-14 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            className="max-w-[16ch] font-display font-extrabold leading-[0.95] tracking-[-0.04em] text-foreground"
            style={{ fontSize: "clamp(2.1rem, 5.4vw, 4.4rem)" }}
          >
            Ideas that move across every screen.
          </h2>
          <p className="eyebrow">05 — Services</p>
        </div>

        <div className="mt-16 border-t border-border">
          {SERVICES.map((s, i) => (
            <button
              key={s.title}
              data-service
              onClick={() => setOpenIdx(i)}
              onMouseEnter={() => setOpenIdx(i)}
              className="group block w-full border-b border-border py-7 text-left focus:outline-none"
              aria-expanded={openIdx === i}
            >
              <div className="flex items-center gap-6">
                <span className="eyebrow w-10 shrink-0">0{i + 1}</span>
                <span
                  className={`font-display font-bold leading-none tracking-[-0.03em] transition-all duration-500 ${
                    openIdx === i ? "translate-x-2 text-foreground" : "text-foreground/55"
                  }`}
                  style={{ fontSize: "clamp(1.5rem, 3.6vw, 3rem)" }}
                >
                  {s.title}
                </span>
                <span
                  className={`ml-auto text-2xl transition-transform duration-500 ${
                    openIdx === i ? "rotate-45 text-rect" : "text-muted-foreground"
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </div>
              <div
                className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                style={{
                  gridTemplateRows: openIdx === i ? "1fr" : "0fr",
                  opacity: openIdx === i ? 1 : 0,
                }}
              >
                <p className="overflow-hidden pl-16 pt-3 text-base text-muted-foreground sm:max-w-[52ch]">
                  {s.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
