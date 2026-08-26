import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STRIP_ITEMS = [
  "TRAILERS",
  "SHORT FILMS",
  "ANIMATIONS",
  "SOCIAL GRAPHICS",
  "COMMERCIALS",
];

const ROTATING_WORDS = [
  "pitched",
  "scrapped",
  "debated",
  "approved",
  "overthought",
  "brewed",
];

function RotatingHeadline() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Timing schedule for the 10-second cycle:
    // pitched (1400ms) -> scrapped (1400ms) -> debated (1400ms) ->
    // approved (1400ms) -> overthought (1400ms) -> brewed (stays static 3000ms until 10s) -> loop resets to pitched
    const stepDelays = [1400, 1400, 1400, 1400, 1400, 3000];
    let step = 0;
    let timerId: ReturnType<typeof setTimeout>;
    let animEndTimerId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const delay = stepDelays[step];
      timerId = setTimeout(() => {
        const next = (step + 1) % ROTATING_WORDS.length;
        setPrevIdx(step);
        setCurrentIdx(next);
        setIsAnimating(true);
        step = next;

        animEndTimerId = setTimeout(() => {
          setIsAnimating(false);
          setPrevIdx(null);
        }, 460);

        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      clearTimeout(timerId);
      clearTimeout(animEndTimerId);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 md:px-8 text-center select-none">
      <h2
        className="font-display font-medium text-white tracking-[-0.03em] leading-none inline-flex flex-wrap items-center justify-center"
        style={{
          fontSize: "clamp(30px, 4.2vw, 84px)",
          textShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
        }}
      >
        <span>Great ideas</span>
        <span className="inline-grid grid-cols-1 grid-rows-1 overflow-hidden h-[1.2em] relative align-bottom mx-2 sm:mx-3 md:mx-4">
          {prevIdx !== null && (
            <span
              key={`prev-${prevIdx}`}
              className="col-start-1 row-start-1 text-white animate-word-out whitespace-nowrap will-change-[transform,opacity]"
            >
              {ROTATING_WORDS[prevIdx]}
            </span>
          )}
          <span
            key={`curr-${currentIdx}`}
            className={`col-start-1 row-start-1 text-white whitespace-nowrap will-change-[transform,opacity] ${
              isAnimating ? "animate-word-in" : ""
            }`}
          >
            {ROTATING_WORDS[currentIdx]}
          </span>
        </span>
        <span>daily.</span>
      </h2>
    </div>
  );
}

function MarqueeSequence() {
  return (
    <div className="flex items-center shrink-0">
      {STRIP_ITEMS.map((item, index) => (
        <span key={index} className="flex items-center shrink-0">
          <span className="font-display font-medium text-foreground tracking-[-0.03em] text-[clamp(28px,3vw,54px)] uppercase whitespace-nowrap">
            {item}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-rect shrink-0 mx-6 sm:mx-8 md:mx-12" />
        </span>
      ))}
    </div>
  );
}

export default function CinematicTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!pinRef.current || !videoWrapperRef.current || !containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        videoWrapperRef.current,
        {
          width: "min(42vw, 720px)",
          minWidth: "600px",
          aspectRatio: "16 / 9",
          height: "auto",
          borderRadius: "28px",
          scale: 1,
          opacity: 1,
        },
        {
          width: "calc(100vw - 80px)",
          minWidth: "calc(100vw - 80px)",
          maxWidth: "none",
          aspectRatio: "16 / 9",
          borderRadius: "28px",
          ease: "power2.out",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="cinematic-transition"
      className="relative z-10 w-full bg-background h-[200vh] -mt-1 overflow-hidden"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Horizontal Typography Strip (z-1) */}
        <div className="absolute inset-x-0 w-full h-[100px] md:h-[130px] border-t border-b border-border/80 flex items-center overflow-hidden z-[1] select-none pointer-events-none">
          <div className="marquee-left-track flex w-max items-center">
            <div className="flex items-center shrink-0">
              <MarqueeSequence />
              <MarqueeSequence />
              <MarqueeSequence />
              <MarqueeSequence />
            </div>
            <div className="flex items-center shrink-0">
              <MarqueeSequence />
              <MarqueeSequence />
              <MarqueeSequence />
              <MarqueeSequence />
            </div>
          </div>
        </div>

        {/* Centered Expanding Video Container (z-2) */}
        <div
          ref={videoWrapperRef}
          className="relative z-[2] aspect-video overflow-hidden shadow-2xl bg-[#111111] will-change-[width,border-radius]"
          style={{
            width: "min(42vw, 720px)",
            minWidth: "600px",
            aspectRatio: "16 / 9",
            height: "auto",
            borderRadius: "28px",
            boxShadow: "0 28px 70px -15px rgba(0,0,0,0.28)",
          }}
        >
          {/* Subtle Dark Contrast Overlay */}
          <div className="absolute inset-0 bg-black/[0.18] pointer-events-none z-[5]" />

          {/* Animated Rotating Text Overlay */}
          <RotatingHeadline />

          <video
            src="/breather.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
