import { forwardRef, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STRIP_ITEMS = ["TRAILERS", "SHORT FILMS", "ANIMATIONS", "SOCIAL GRAPHICS", "COMMERCIALS"];

function MarqueeSequence() {
  return (
    <div className="flex items-center shrink-0">
      {STRIP_ITEMS.map((item, index) => (
        <span key={index} className="flex items-center shrink-0">
          <span className="font-display font-medium text-[#4A4A4A] tracking-[-0.03em] text-[clamp(28px,3vw,54px)] uppercase whitespace-nowrap">
            {item}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#4BB1AA] shrink-0 mx-6 sm:mx-8 md:mx-12" />
        </span>
      ))}
    </div>
  );
}

export default function CinematicTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!videoWrapperRef.current || !containerRef.current || !videoRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Video card wrapper expansion animation
      tl.fromTo(
        videoWrapperRef.current,
        {
          width: "27vw",
          maxWidth: "490px",
          borderRadius: "28px",
          scale: 1,
        },
        {
          width: "78vw",
          maxWidth: "1440px",
          borderRadius: "28px",
          scale: 1,
          ease: "power1.out",
          duration: 0.7,
        },
        0,
      );

      // Inner video progressive zoom animation
      tl.fromTo(
        videoRef.current,
        {
          scale: 1.08,
        },
        {
          scale: 1.35,
          ease: "none", // linear interpolation
          duration: 0.7,
        },
        0,
      );

      // Pad the timeline to 1.0 so the wrapper and video stay at final state for the remaining 30% of scroll
      tl.to({}, { duration: 0.3 }, 0.7);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="cinematic-transition"
      className="relative z-10 w-full bg-background pt-16 md:pt-24 pb-0 m-0 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Animated Horizontal Typography Strip (z-1) - Centered absolute behind the video */}
      <div className="absolute inset-x-0 w-full h-[100px] md:h-[130px] border-t border-b border-border/80 flex items-center overflow-hidden z-[1] select-none pointer-events-none top-1/2 -translate-y-1/2">
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

      {/* Centered Expanding Video Card Container (z-2) */}
      <div
        ref={videoWrapperRef}
        className="relative z-[2] aspect-video overflow-hidden shadow-2xl bg-[#111111] will-change-[width,height,transform,border-radius]"
        style={{
          width: "27vw",
          maxWidth: "490px",
          aspectRatio: "16 / 9",
          height: "auto",
          borderRadius: "28px",
          transformOrigin: "center center",
          boxShadow: "0 28px 70px -15px rgba(0,0,0,0.35)",
        }}
      >
        <video
          ref={videoRef}
          src="/breather.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover block rounded-[inherit] will-change-transform"
        />
      </div>
    </section>
  );
}
