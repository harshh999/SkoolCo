import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectDetail } from "@/data/projects-data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface ProjectDetailPageProps {
  project: ProjectDetail;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  // Smooth scroll initialization with Lenis
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
  }, [project.slug]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground selection:bg-rect selection:text-white">
      {/* 1. Dynamic Floating Navbar with 'work' active */}
      <Navbar activeNav="work" />

      {/* Main Content Area in Normal Document Flow */}
      <main className="flex-1 relative z-[1] w-full pt-28 sm:pt-36 md:pt-40 pb-20">
        {/* ========================================================================= */}
        {/* 2. PROJECT HERO */}
        {/* ========================================================================= */}
        <section className="w-full px-5 sm:px-8 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
          {/* Breadcrumb & Counter Bar */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              to="/"
              hash="selected-work"
              className="inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-wider text-muted-foreground uppercase hover:text-foreground transition-colors duration-200 group"
            >
              <span className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              <span>All Selected Work</span>
            </Link>

            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.06] text-[12px] font-mono tracking-widest text-muted-foreground uppercase">
              <span className="w-2 h-2 rounded-full bg-[#4BB1AA] animate-pulse" />
              <span>{project.number}</span>
            </div>
          </div>

          {/* Project Header Text Block */}
          <div className="max-w-[1100px] mb-12 sm:mb-16">
            <div className="inline-block px-3.5 py-1 rounded-full bg-black/5 text-[12px] font-medium tracking-widest uppercase text-muted-foreground mb-4">
              {project.category}
            </div>

            <h1
              className="font-display font-semibold tracking-[-0.04em] text-foreground leading-[1.04] text-balance mb-6"
              style={{ fontSize: "clamp(40px, 6.5vw, 92px)" }}
            >
              {project.title}
            </h1>

            <p
              className="text-muted-foreground leading-relaxed font-sans max-w-[820px] text-balance"
              style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}
            >
              {project.tagline}
            </p>

            {/* Quick Metadata Chips */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-8 pt-6 border-t border-black/[0.08] text-[13px] sm:text-[14px]">
              <div>
                <span className="text-muted-foreground/70 block text-[11px] uppercase tracking-wider font-mono">
                  Client
                </span>
                <span className="font-medium text-foreground">{project.client}</span>
              </div>
              <div className="hidden sm:block w-px h-7 bg-black/[0.1]" />
              <div>
                <span className="text-muted-foreground/70 block text-[11px] uppercase tracking-wider font-mono">
                  Industry
                </span>
                <span className="font-medium text-foreground">{project.industry}</span>
              </div>
              <div className="hidden sm:block w-px h-7 bg-black/[0.1]" />
              <div>
                <span className="text-muted-foreground/70 block text-[11px] uppercase tracking-wider font-mono">
                  Year
                </span>
                <span className="font-medium text-foreground">{project.year}</span>
              </div>
              <div className="hidden sm:block w-px h-7 bg-black/[0.1]" />
              <div>
                <span className="text-muted-foreground/70 block text-[11px] uppercase tracking-wider font-mono">
                  Timeline
                </span>
                <span className="font-medium text-foreground">{project.duration}</span>
              </div>
            </div>
          </div>

          {/* Primary Hero Visual */}
          <div className="w-full aspect-[16/9] max-h-[720px] rounded-[20px] sm:rounded-[28px] md:rounded-[36px] overflow-hidden shadow-2xl bg-[#111111] border border-black/[0.06] relative group">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-60" />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. PROJECT OVERVIEW */}
        {/* ========================================================================= */}
        <section className="w-full px-5 sm:px-8 md:px-12 lg:px-16 max-w-[1440px] mx-auto mt-20 sm:mt-28 md:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Narrative Summary & Vision */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-widest text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-[#4BB1AA]" />
                <span>OVERVIEW</span>
              </div>

              <h2
                className="font-display font-medium text-foreground tracking-[-0.03em] leading-[1.12]"
                style={{ fontSize: "clamp(32px, 3.8vw, 56px)" }}
              >
                The Story &amp; Strategic Vision
              </h2>

              <p className="text-foreground/80 text-[17px] sm:text-[19px] leading-[1.65] font-sans">
                {project.overview.summary}
              </p>

              {/* Challenge Brief & Strategy Brief Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-[20px] bg-black/[0.03] border border-black/[0.05]">
                  <h4 className="text-[14px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    The Challenge
                  </h4>
                  <p className="text-[14px] leading-relaxed text-foreground/85">
                    {project.overview.challengeBrief}
                  </p>
                </div>

                <div className="p-6 rounded-[20px] bg-black/[0.03] border border-black/[0.05]">
                  <h4 className="text-[14px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Our Solution
                  </h4>
                  <p className="text-[14px] leading-relaxed text-foreground/85">
                    {project.overview.strategyBrief}
                  </p>
                </div>
              </div>

              {/* Agency Deliverables checklist */}
              <div className="pt-4">
                <h4 className="text-[14px] font-mono uppercase tracking-wider text-muted-foreground mb-4">
                  Agency Deliverables
                </h4>
                <ul className="space-y-3">
                  {project.deliverables.map((deliv, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[15px] text-foreground/90 font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#4BB1AA]/15 text-[#308b84] flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                        ✓
                      </span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Dark Premium Info Card */}
            <div className="lg:col-span-5 self-start">
              <div className="rounded-[28px] bg-[#14161B] text-white p-8 sm:p-10 border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 block mb-1">
                        Case Study Spec
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-white">
                        Project Information
                      </h3>
                    </div>
                    <span className="text-[12px] font-mono px-3 py-1 rounded-full bg-white/10 text-white/80">
                      {project.year}
                    </span>
                  </div>

                  <dl className="space-y-4 text-[14px]">
                    <div className="flex justify-between items-baseline py-2 border-b border-white/5">
                      <dt className="text-white/50">Client</dt>
                      <dd className="font-medium text-white text-right">{project.client}</dd>
                    </div>

                    <div className="flex justify-between items-baseline py-2 border-b border-white/5">
                      <dt className="text-white/50">Industry</dt>
                      <dd className="font-medium text-white text-right">{project.industry}</dd>
                    </div>

                    <div className="flex justify-between items-baseline py-2 border-b border-white/5">
                      <dt className="text-white/50">Duration</dt>
                      <dd className="font-medium text-white text-right">{project.duration}</dd>
                    </div>

                    <div className="py-2 border-b border-white/5">
                      <dt className="text-white/50 mb-2.5">Scope of Work</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {project.services.map((srv, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-full bg-white/10 text-[12px] text-white/90 font-medium"
                          >
                            {srv}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Card CTA Button */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <a
                    href="/#contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#f5f3ee] text-[#14161B] text-[13px] font-bold tracking-wider uppercase transition-all duration-300 hover:bg-white hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg"
                  >
                    <span>Start a Project</span>
                    <span className="text-[16px] leading-none">↗</span>
                  </a>
                  <p className="text-[11px] text-center text-white/40 mt-3 font-sans">
                    Have a similar challenge? Let's build something unforgettable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* ========================================================================= */}
        {/* 6. VISUAL SHOWCASE / GALLERY */}
        {/* ========================================================================= */}
        <section className="w-full px-5 sm:px-8 md:px-12 lg:px-16 max-w-[1440px] mx-auto mt-24 sm:mt-32">
          <div className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
            <span className="w-2 h-2 rounded-full bg-[#4BB1AA]" />
            <span>VISUAL ARCHIVE</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6 mb-12 sm:mb-16">
            <h2
              className="font-display font-medium text-foreground tracking-[-0.03em] leading-[1.12]"
              style={{ fontSize: "clamp(32px, 4vw, 58px)" }}
            >
              Visual Showcase
            </h2>
            <p className="text-muted-foreground text-[16px] max-w-[420px] leading-relaxed">
              Curated creative deliverables, brand identity collateral, and campaign assets.
            </p>
          </div>

          {/* Grid Layout for Gallery Assets */}
          <div className="grid grid-cols-12 gap-6 sm:gap-8">
            {project.gallery.map((item, idx) => (
              <div
                key={idx}
                className={`${item.span || "col-span-12"} group overflow-hidden rounded-[20px] sm:rounded-[28px] bg-[#111111] border border-black/[0.06] shadow-md`}
              >
                <div
                  className={`w-full ${item.aspect || "aspect-[16/9]"} overflow-hidden relative`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>



        {/* ========================================================================= */}
        {/* 8. NEXT PROJECT */}
        {/* ========================================================================= */}
        <section className="w-full px-5 sm:px-8 md:px-12 lg:px-16 max-w-[1440px] mx-auto mt-24 sm:mt-32">
          <div className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
            <span className="w-2 h-2 rounded-full bg-[#4BB1AA]" />
            <span>NEXT PROJECT</span>
          </div>

          <Link
            to="/work/$slug"
            params={{ slug: project.nextProject.slug }}
            className="group block relative w-full h-[320px] sm:h-[400px] md:h-[480px] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl bg-[#111111] border border-black/[0.08]"
          >
            {/* Background Image with Zoom on Hover */}
            <img
              src={project.nextProject.image}
              alt={project.nextProject.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              loading="lazy"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 transition-opacity duration-300 group-hover:opacity-90" />

            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
              <span className="text-[12px] font-mono tracking-widest text-white/70 uppercase mb-3">
                {project.nextProject.number} — Next Case Study
              </span>

              <h3
                className="font-display font-semibold tracking-tight text-white mb-3"
                style={{ fontSize: "clamp(32px, 5vw, 68px)" }}
              >
                {project.nextProject.title}
              </h3>

              <p className="text-white/80 text-[14px] sm:text-[16px] font-sans mb-8">
                {project.nextProject.category}
              </p>

              <div className="px-6 py-3.5 rounded-full bg-white text-[#111111] text-[12px] font-bold uppercase tracking-wider transition-all duration-300 group-hover:bg-[#4BB1AA] group-hover:text-white group-hover:scale-105">
                View Next Project ↗
              </div>
            </div>
          </Link>
        </section>
      </main>

      {/* 9. Website Footer (Participates in Normal Document Flow) */}
      <Footer />
    </div>
  );
}
