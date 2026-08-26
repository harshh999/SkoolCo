import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "Focused on discovery, built for real attention. We design platforms that help brands explore culture, connect with people, and move forward with confidence.";

export default function BrandStatement() {
  const root = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll("[data-word]");
      if (!words || words.length === 0) return;

      gsap.fromTo(
        words,
        {
          filter: "blur(12px)",
          opacity: 0.28,
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          stagger: 0.2,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            end: "bottom 85%",
            scrub: 1,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="flex flex-col items-center justify-center w-full"
      style={{
        backgroundColor: "#f3f1e9",
        minHeight: "100vh",
        padding: "clamp(100px, 12vw, 180px) 48px",
      }}
    >
      <div className="mx-auto w-full max-w-[1000px] flex flex-col items-center text-center">
        <span
          className="text-xs uppercase tracking-[0.2em] font-medium mb-12 sm:mb-16 lg:mb-20"
          style={{ color: "#1d232b" }}
        >
          OUR BELIEF
        </span>
        <p
          ref={textRef}
          className="text-center font-sans font-normal leading-[1.28] tracking-[-0.035em]"
          style={{
            fontSize: "clamp(42px, 4.2vw, 64px)",
            color: "#1d232b",
          }}
        >
          {TEXT.split(" ").map((w, i) => {
            const cleanWord = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
            const isItalic = ["discovery", "attention", "culture", "people", "confidence"].includes(cleanWord);
            return (
              <span
                key={`${w}-${i}`}
                data-word
                className="inline-block"
                style={{
                  willChange: "filter, opacity",
                  fontStyle: isItalic ? "italic" : "normal",
                  fontWeight: isItalic ? "600" : "400",
                }}
              >
                {w}&nbsp;
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
