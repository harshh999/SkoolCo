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
          opacity: 0.3,
          filter: "blur(9px)",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.8, // slight overlap
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.5,
            once: false,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="flex flex-col items-center justify-center w-full"
      style={{
        backgroundColor: "#FAF9F6",
        minHeight: "80vh",
        paddingTop: "clamp(100px, 12vw, 180px)",
        paddingBottom: "clamp(50px, 6vw, 90px)",
        paddingLeft: "48px",
        paddingRight: "48px",
      }}
    >
      <div className="mx-auto w-full max-w-[1000px] flex flex-col items-center">
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
            const isItalic = ["discovery", "attention", "culture", "people", "confidence"].includes(
              cleanWord,
            );
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
