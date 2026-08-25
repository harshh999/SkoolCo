import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedVisual() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(media.current, {
        width: "100vw",
        height: "100svh",
        borderRadius: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=90%",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex h-svh items-center justify-center overflow-hidden">
      <div
        ref={media}
        className="relative overflow-hidden rounded-[40px] shadow-[var(--shadow-soft)]"
        style={{ width: "min(1280px, calc(100vw - 6rem))", height: "min(70svh, 640px)" }}
      >
        <img
          src="/images/hero/hero-featured.webp"
          alt="Skool Company featured creative composition"
          width={1920}
          height={1080}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
