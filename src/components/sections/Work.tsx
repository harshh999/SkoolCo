import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/data/site-content";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
        gsap.from(card, {
          y: 70,
          opacity: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="px-5 py-28 sm:px-8 lg:px-14 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            className="max-w-[16ch] font-display font-extrabold leading-[0.95] tracking-[-0.04em] text-foreground"
            style={{ fontSize: "clamp(2.1rem, 5.4vw, 4.4rem)" }}
          >
            Selected work, made to be noticed.
          </h2>
          <p className="eyebrow">04 — Projects</p>
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-16 lg:grid-cols-12">
          {PROJECTS.map((p) => (
            <article key={p.client} data-project className={`group ${p.span}`}>
              <div
                className={`overflow-hidden rounded-[28px] bg-card ${p.ratio} shadow-sm border border-border/10`}
              >
                <img
                  src={p.img}
                  alt={`${p.client} — ${p.title}`}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.client}</p>
                </div>
                <span className="eyebrow shrink-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100">
                  {p.category}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
