import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedVisual from "@/components/sections/FeaturedVisual";
import BrandStatement from "@/components/sections/BrandStatement";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import SelectedWork from "@/components/sections/SelectedWork";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Services from "@/components/sections/Services";
import CinematicTransition from "@/components/sections/CinematicTransition";
import ClientReviews from "@/components/sections/ClientReviews";
import InstagramFeed from "@/components/sections/InstagramFeed";
import MerchSection from "@/components/sections/MerchSection";
import FAQSection from "@/components/sections/FAQSection";

const TITLE = "Skool Company — Independent Creative Company";
const DESC =
  "Skool Company is an independent creative company crafting viral social campaigns, distinct brand identities and interactive storytelling made to stop the scroll.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
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

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      delete (window as unknown as { __lenis?: unknown }).__lenis;
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen">
      <Navbar />
      <div className="main-content-sheet">
        <Hero />
        <FeaturedVisual />
        <BrandStatement />
        <ClientsMarquee />
        <SelectedWork />
        <FeaturedProjects />
        <Services />
        <CinematicTransition />
        <ClientReviews />
        <InstagramFeed />
        <MerchSection />
        <FAQSection />
      </div>
      <Footer />
    </main>
  );
}
