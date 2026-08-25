import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HEADLINE_LINES = ["Making brands louder,", "smarter and impossible", "to miss."];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-anim='line']", {
        y: 40,
        opacity: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-svh items-center px-5 sm:px-8 lg:px-14"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="w-full lg:max-w-[58%]">
          <h1 className="font-display font-extrabold leading-[0.94] tracking-[-0.04em] text-foreground">
            {HEADLINE_LINES.map((line, idx) => (
              <span key={idx} className="block overflow-hidden py-1">
                <span
                  data-anim="line"
                  className="block"
                  style={{ fontSize: "clamp(2.5rem, 6.5vw, 6.8rem)" }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}
