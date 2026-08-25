import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "Focused on discovery, built for real attention. We create social-first experiences that help brands explore culture, connect with people, and move forward with confidence.";

export default function BrandStatement() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-word]", {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          end: "bottom 65%",
          scrub: 0.8,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="px-5 py-32 sm:px-8 lg:px-14 lg:py-48 bg-background/30">
      <div className="mx-auto max-w-[1100px]">
        <p className="eyebrow mb-10 text-center">Our belief</p>
        <p
          className="text-center font-display font-semibold leading-[1.15] tracking-[-0.03em] text-foreground"
          style={{ fontSize: "clamp(1.6rem, 3.6vw, 3.2rem)" }}
        >
          {TEXT.split(" ").map((w, i) => (
            <span key={`${w}-${i}`} data-word className="inline-block opacity-15">
              {w}&nbsp;
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
