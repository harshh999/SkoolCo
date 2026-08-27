import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { getInstagramPosts, type InstagramPost } from "@/lib/api/instagram-feed";

gsap.registerPlugin(ScrollTrigger);

export default function InstagramFeed() {
  const root = useRef<HTMLElement>(null);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getInstagramPosts()
      .then((res) => {
        if (mounted && res?.posts) {
          setPosts(res.posts.slice(0, 5));
        }
      })
      .catch((err) => {
        console.error("Failed to load Instagram posts:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // GSAP Staggered Scroll Reveal Animation
  useEffect(() => {
    if (loading || posts.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-insta-card]", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [loading, posts]);

  return (
    <section
      ref={root}
      id="instagram-feed"
      className="relative w-full bg-[#f7f7f5] pt-[100px] pb-[80px] select-none overflow-hidden"
    >
      {/* Centered Editorial Header */}
      <div className="text-center mb-[50px] px-5 sm:px-8">
        <h2 className="text-[#20242a] font-semibold tracking-[-0.03em] text-[32px] sm:text-[40px] md:text-[48px] leading-[1.15]">
          Behind the work.
        </h2>
        <p className="text-[#56616b] text-[16px] md:text-[18px] leading-[1.5] max-w-[460px] mx-auto mt-4">
          A closer look at what we're creating, exploring and putting into the world.
        </p>
        <a
          href="https://www.instagram.com/skoolcompany/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[14px] font-medium text-[#4BB1AA] hover:opacity-85 transition-opacity duration-200 mt-5"
        >
          <span>@skoolcompany</span>
          <span className="text-[12px]">↗</span>
        </a>
      </div>

      {/* Horizontal Image Gallery */}
      <div className="w-full overflow-x-auto scrollbar-none px-5 md:px-[20px] scroll-smooth">
        <div className="flex gap-[14px] min-w-max pb-4">
          {loading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={`insta-skeleton-${idx}`}
                  className="aspect-[9/10] shrink-0 rounded-[14px] sm:rounded-[16px] lg:rounded-[18px] bg-black/[0.04] animate-pulse w-[60vw] sm:w-[calc((100vw-40px-42px)/3)] lg:w-[calc((100vw-40px-70px)/5)]"
                />
              ))
            : posts.map((post) => {
                const imageUrl = post.thumbnail_url || post.media_url;
                return (
                  <div
                    key={post.id}
                    data-insta-card
                    onClick={() => window.open(post.permalink, "_blank", "noopener,noreferrer")}
                    className="group relative aspect-[9/10] shrink-0 rounded-[14px] sm:rounded-[16px] lg:rounded-[18px] overflow-hidden bg-[#e9e9e6] cursor-pointer border border-black/[0.025] w-[60vw] sm:w-[calc((100vw-40px-42px)/3)] lg:w-[calc((100vw-40px-70px)/5)]"
                  >
                    {/* Media Image */}
                    <img
                      src={imageUrl}
                      alt={post.caption || "Skool Company Instagram Post"}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-400 ease-out group-hover:scale-103"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none">
                      {/* Top-Right Arrow Indicator */}
                      <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
