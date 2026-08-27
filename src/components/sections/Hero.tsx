import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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
      className="relative flex min-h-svh items-center pl-6 sm:pl-10 lg:pl-[clamp(60px,7vw,130px)] pr-6 sm:pr-10 lg:pr-14"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] items-center gap-[clamp(40px,6vw,120px)]">
        {/* Headline Column */}
        <div className="w-full max-w-[860px] ml-4 md:ml-8 lg:ml-12">
          <h1 className="font-display leading-[0.95] tracking-[-0.03em] text-[#111111]">
            {/* Line 1 */}
            <span className="block overflow-visible m-0 p-0">
              <span
                data-anim="line"
                className="block overflow-visible m-0 p-0 lg:whitespace-nowrap font-medium text-[clamp(44px,9vw,56px)] md:text-[clamp(56px,8vw,72px)] lg:text-[clamp(68px,6vw,96px)]"
              >
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10">Crafting</span>
                  <svg
                    className="absolute pointer-events-none overflow-visible -rotate-3 z-0 opacity-95"
                    style={{
                      top: "-22px",
                      left: "-28px",
                      width: "calc(100% + 56px)",
                      height: "calc(100% + 44px)",
                    }}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 50 2 C 22 0, 2 15, 2 50 C 2 85, 25 98, 50 98 C 78 98, 98 82, 98 50 C 98 18, 75 4, 50 2 Z"
                      stroke="#4BB1AA"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>{" "}
                brands
              </span>
            </span>

            {/* Line 2 */}
            <span className="block overflow-visible m-0 p-0">
              <span
                data-anim="line"
                className="block overflow-visible m-0 p-0 lg:whitespace-nowrap font-medium text-[clamp(44px,9vw,56px)] md:text-[clamp(56px,8vw,72px)] lg:text-[clamp(68px,6vw,96px)]"
              >
                that matter
              </span>
            </span>

            {/* Line 3 */}
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

        {/* SVG Column Reservation */}
        <div className="relative hidden lg:flex items-center justify-center">
          {/* Space reserved for visual element */}
        </div>
      </div>
    </section>
  );
}
