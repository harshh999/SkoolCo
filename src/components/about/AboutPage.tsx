import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "@tanstack/react-router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FOUNDERS } from "@/data/site-content";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const instance = new Lenis({ duration: 1.1, smoothWheel: true });
        lenis = instance;
        (window as unknown as { __lenis?: unknown }).__lenis = instance;
        instance.on("scroll", ScrollTrigger.update);
        const loop = (time: number) => {
          instance.raf(time);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      });
    }

    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      delete (window as unknown as { __lenis?: unknown }).__lenis;
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero text subtle fade & rise reveal
      gsap.fromTo(
        ".about-hero-elem",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.14,
          ease: "power3.out",
          delay: 0.15,
        },
      );

      // 2. Office section image reveal
      gsap.fromTo(
        ".office-img-wrap",
        { scale: 0.96, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".office-section",
            start: "top 80%",
            end: "top 30%",
            scrub: 0.5,
          },
        },
      );

      // 3. Story section paragraphs
      gsap.fromTo(
        ".story-block",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-section",
            start: "top 75%",
          },
        },
      );

      // 4. Founders section photo reveal
      gsap.fromTo(
        ".founders-img-wrap",
        { scale: 0.97, opacity: 0.9 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".founders-section",
            start: "top 80%",
            end: "top 35%",
            scrub: 0.5,
          },
        },
      );

      // 5. Beliefs sequential text reveals
      const beliefItems = gsap.utils.toArray<HTMLElement>(".belief-item");
      beliefItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // 6. Closing CTA reveal
      gsap.fromTo(
        ".cta-elem",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 82%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    navigate({ to: "/contact" });
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-background text-foreground">
      {/* 1. Global Floating Navbar */}
      <Navbar activeNav="about" />

      {/* Main Content Sheet with shadow to reveal sticky footer underneath */}
      <main className="main-content-sheet relative z-10 w-full pt-32 sm:pt-40 md:pt-48 pb-24 sm:pb-32">
        {/* ========================================================================= */}
        {/* 1. EDITORIAL HERO (about_hero) */}
        {/* ========================================================================= */}
        <section className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1400px] mx-auto mb-20 sm:mb-28 md:mb-36">
          <div className="max-w-[1100px]">
            <h1
              className="about-hero-elem font-display font-medium text-foreground tracking-[-0.04em] leading-[0.98] text-balance mb-8 sm:mb-12"
              style={{ fontSize: "clamp(46px, 7.8vw, 110px)" }}
            >
              We make ideas matter.
            </h1>

            <p
              className="about-hero-elem text-foreground/75 font-sans font-normal leading-[1.45] max-w-[760px] text-balance"
              style={{ fontSize: "clamp(20px, 2.3vw, 32px)" }}
            >
              Skool Co. is a creative company built around curiosity, strategy and ideas that leave a mark.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FEATURED EDITORIAL IMAGE: OFFICE (office) */}
        {/* ========================================================================= */}
        <section className="office-section w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1400px] mx-auto mb-24 sm:mb-36 md:mb-44">
          <div className="w-full office-img-wrap overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[44px] bg-[#1a1a1a] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-black/[0.05] relative group">
            <div className="aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] w-full overflow-hidden">
              <img
                src="/images/about/office.jpg"
                alt="Skool Co. Studio Workspace"
                className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                loading="eager"
              />
            </div>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col md:flex-row md:items-baseline justify-between gap-4 max-w-[1400px] mx-auto px-2">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-foreground">
              Where the ideas happen.
            </h2>
            <p className="text-muted-foreground text-[15px] sm:text-[17px] font-sans max-w-[540px] leading-relaxed">
              A space for conversations, experiments, deadlines, good ideas and occasionally questionable ones.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. EDITORIAL STORY (story) */}
        {/* ========================================================================= */}
        <section className="story-section w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1400px] mx-auto mb-28 sm:mb-40 md:mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 story-block">
              <h2
                className="font-display font-medium text-foreground tracking-[-0.03em] leading-[1.08] sticky top-32"
                style={{ fontSize: "clamp(34px, 4.4vw, 64px)" }}
              >
                It started with curiosity.
              </h2>
            </div>

            <div className="lg:col-span-7 story-block space-y-8 max-w-[680px]">
              <p
                className="text-foreground/90 font-sans leading-[1.6] font-normal text-balance"
                style={{ fontSize: "clamp(19px, 1.8vw, 25px)" }}
              >
                We started Skool Co. because we noticed something felt missing in the way creative work was being made. Agencies had become bloated with endless layers, formulaic decks, and bloated processes that separated the thinkers from the makers.
              </p>

              <div className="space-y-6 text-muted-foreground text-[16px] sm:text-[18px] leading-[1.75]">
                <p>
                  We wanted to do things differently. To build a lean, independent studio where high-level brand strategy and obsessive visual craft live in the very same room. Where ideas aren't watered down through layers of bureaucracy before they ever see the light of day.
                </p>
                <p>
                  From our studio bases in Bhuj and Ahmedabad, we work with ambitious founders and forward-thinking brands across the country. We don't believe in generic templates or vanity metrics. We believe in work that stops the scroll, sparks honest conversation, and earns a permanent place in culture.
                </p>
                <p>
                  We stay intentionally focused and close to the work. Because when you care deeply about what you make, the people who create the work should be the people you talk to.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. FEATURED FOUNDERS SECTION (founders) */}
        {/* ========================================================================= */}
        <section className="founders-section w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1400px] mx-auto mb-28 sm:mb-40 md:mb-48">
          <div className="mb-10 sm:mb-14 max-w-[900px]">
            <h2
              className="font-display font-medium text-foreground tracking-[-0.03em] leading-[1.08]"
              style={{ fontSize: "clamp(32px, 4.5vw, 64px)" }}
            >
              The people behind Skool Co.
            </h2>
          </div>

          {/* Shared Editorial Photograph */}
          <div className="w-full founders-img-wrap overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[44px] bg-[#1a1a1a] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.14)] border border-black/[0.05] relative group">
            <div className="aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] w-full overflow-hidden">
              <img
                src="/images/about/founders.jpg"
                alt="Harsh Thakkar and Karan Vyas - Founders of Skool Co."
                className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Understated Founders Info Strip */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 pt-6 border-t border-foreground/10 max-w-[1400px] mx-auto px-2">
            {FOUNDERS.map((founder, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                  {founder.name}
                </span>
                <span className="text-[13px] sm:text-[14px] font-mono tracking-wider uppercase text-[#308b84] font-medium mt-1">
                  {founder.role}
                </span>
                <p className="text-muted-foreground text-[14px] sm:text-[15px] leading-relaxed mt-2.5 max-w-[420px]">
                  {founder.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. EDITORIAL MANIFESTO / BELIEFS (beliefs) */}
        {/* ========================================================================= */}
        <section className="beliefs-section w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1400px] mx-auto mb-24 sm:mb-36 md:mb-44">
          <div className="mb-14 sm:mb-20 max-w-[1000px]">
            <h2
              className="font-display font-medium text-foreground tracking-[-0.04em] leading-[1.02] text-balance"
              style={{ fontSize: "clamp(34px, 5.2vw, 76px)" }}
            >
              Good work starts with giving a damn.
            </h2>
          </div>

          {/* Typography-Led Editorial Manifesto Items */}
          <div className="divide-y divide-foreground/10 border-y border-foreground/10">
            {[
              {
                num: "01",
                title: "Stay curious.",
                description: "Good ideas usually start with better questions.",
                detail: "We never take the brief at face value. We dig underneath assumptions, explore unexpected tangents, and keep looking until we uncover the honest truth worth talking about.",
              },
              {
                num: "02",
                title: "Sweat the details.",
                description: "Because the small things are rarely small.",
                detail: "From the cadence of a micro-copy headline to the subtle tactile weight of paper stock, excellence lives in the millimeter nuances that most people never notice consciously, but immediately feel.",
              },
              {
                num: "03",
                title: "Make it matter.",
                description: "Creative work should do more than just look good.",
                detail: "Design is not decorative styling; it is an active cultural force. We build identities and campaigns designed to resonate, create loyalty, and drive meaningful business outcomes.",
              },
            ].map((belief, idx) => (
              <div
                key={idx}
                className="belief-item py-10 sm:py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline"
              >
                <div className="lg:col-span-2 font-mono text-[13px] sm:text-[14px] text-muted-foreground/80 tracking-widest uppercase">
                  [{belief.num}]
                </div>

                <div className="lg:col-span-5">
                  <h3
                    className="font-display font-semibold text-foreground tracking-[-0.02em] leading-tight"
                    style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
                  >
                    {belief.title}
                  </h3>
                  <p className="text-foreground/80 text-[17px] sm:text-[20px] font-medium mt-2 leading-snug">
                    {belief.description}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-muted-foreground text-[15px] sm:text-[17px] leading-relaxed font-sans">
                    {belief.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. CLOSING CTA (about_cta) */}
        {/* ========================================================================= */}
        <section className="cta-section w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1400px] mx-auto pt-8 pb-12 sm:pb-20">
          <div className="p-8 sm:p-14 md:p-20 rounded-[28px] sm:rounded-[40px] md:rounded-[52px] bg-foreground text-background relative overflow-hidden flex flex-col items-center text-center">
            {/* Background ambient gradient glow */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#4BB1AA]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#f77f00]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-[850px] mx-auto flex flex-col items-center">
              <h2
                className="cta-elem font-display font-medium text-background tracking-[-0.03em] leading-[1.08] text-balance mb-8 sm:mb-12"
                style={{ fontSize: "clamp(34px, 5.5vw, 78px)" }}
              >
                Think we could make something good together?
              </h2>

              <div className="cta-elem">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-3 px-9 sm:px-12 py-4 sm:py-5 rounded-full bg-[#f5f3ee] text-[#111111] text-[15px] sm:text-[17px] font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-[#6FB7BA] hover:text-[#111111] hover:scale-105 active:scale-95 shadow-2xl cursor-pointer group"
                >
                  <span>Let's talk</span>
                  <span className="text-[20px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Global Sticky Parallax Footer */}
      <Footer />
    </div>
  );
}
