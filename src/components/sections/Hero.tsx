import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const ellipseRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        // Heading lines entrance
        gsap.from("[data-anim='line']", {
          y: 40,
          opacity: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "power4.out",
        });

        // Ellipse draw — getTotalLength() returns actual rendered perimeter
        // so dasharray is always correct regardless of SVG scaling.
        if (ellipseRef.current) {
          const len = ellipseRef.current.getTotalLength();
          gsap.set(ellipseRef.current, {
            strokeDasharray: len,
            strokeDashoffset: len,
          });
          gsap.to(ellipseRef.current, {
            strokeDashoffset: 0,
            duration: 1.5,
            delay: 0.3,
            ease: "power2.inOut",
          });
        }
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-svh items-center pl-6 sm:pl-10 lg:pl-[clamp(60px,7vw,130px)] pr-6 sm:pr-10 lg:pr-14"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] items-center gap-[clamp(40px,6vw,120px)]">
        {/* Headline Column */}
        <div className="w-full max-w-[860px] ml-4 md:ml-8 lg:ml-12">
          <h1 className="font-display leading-[0.95] tracking-[-0.03em] text-[#111111]">

            {/* ── Line 1: "Crafting brands" ── */}
            <span className="block overflow-visible m-0 p-0">
              <span
                data-anim="line"
                className="block overflow-visible m-0 p-0 lg:whitespace-nowrap font-medium text-[clamp(44px,9vw,56px)] md:text-[clamp(56px,8vw,72px)] lg:text-[clamp(68px,6vw,96px)]"
              >
                {/*
                  ┌─ Crafting wrapper ──────────────────────────────────────────┐
                  │  position: relative + display: inline-block                 │
                  │  overflow: visible so the absolute SVG escapes without clip │
                  └────────────────────────────────────────────────────────────┘
                */}
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    overflow: "visible",
                  }}
                >
                  {/* Text sits on z-index 1, above the annotation */}
                  <span style={{ position: "relative", zIndex: 1 }}>Crafting</span>

                  {/*
                    ┌─ SVG overlay ───────────────────────────────────────────────────┐
                    │  Absolutely positioned, extending 25 px outside on every side.  │
                    │  width / height written as calc() so it adapts to any font size. │
                    │  overflow="visible" on the SVG guarantees the stroke cap         │
                    │  is never clipped by the SVG's own bounding box.                │
                    │                                                                  │
                    │  NO viewBox / preserveAspectRatio — the ellipse uses %          │
                    │  units so it scales with the SVG's own pixel dimensions.        │
                    │  vectorEffect="non-scaling-stroke" keeps stroke-width at 3 px   │
                    │  regardless of how the SVG is scaled.                           │
                    └────────────────────────────────────────────────────────────────┘
                  */}
                  <svg
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "-25px",
                      left: "-25px",
                      width: "calc(100% + 50px)",
                      height: "calc(100% + 50px)",
                      zIndex: 0,
                      pointerEvents: "none",
                      overflow: "visible",
                      transform: "rotate(-2deg)",
                    }}
                    overflow="visible"
                  >
                    <ellipse
                      ref={ellipseRef}
                      cx="50%"
                      cy="50%"
                      rx="48%"
                      ry="42%"
                      fill="none"
                      stroke="#6FA9AA"
                      strokeWidth="3"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>
                {" "}brands
              </span>
            </span>

            {/* ── Line 2 ── */}
            <span className="block overflow-visible m-0 p-0">
              <span
                data-anim="line"
                className="block overflow-visible m-0 p-0 lg:whitespace-nowrap font-medium text-[clamp(44px,9vw,56px)] md:text-[clamp(56px,8vw,72px)] lg:text-[clamp(68px,6vw,96px)]"
              >
                that matter
              </span>
            </span>

            {/* ── Line 3 ── */}
            <span className="block overflow-visible m-0 p-0">
              <span
                data-anim="line"
                className="block overflow-visible m-0 p-0 lg:whitespace-nowrap font-medium text-[clamp(44px,9vw,56px)] md:text-[clamp(56px,8vw,72px)] lg:text-[clamp(68px,6vw,96px)]"
              >
                beyond marketing.
              </span>
            </span>
          </h1>
        </div>

        {/* Right column — reserved for visual element */}
        <div className="relative hidden lg:flex items-center justify-center" />
      </div>
    </section>
  );
}
