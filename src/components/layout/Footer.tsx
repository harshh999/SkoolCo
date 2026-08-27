import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Instagram, Linkedin, Facebook } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rightDotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (footerRef.current) {
        // Subtle secondary parallax settling on the large logo as the sheet uncovers it
        if (logoRef.current) {
          gsap.fromTo(
            logoRef.current,
            { y: 30, opacity: 0.7 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
              },
            },
          );
        }

        // Subtle secondary motion on contact info row
        if (infoRef.current) {
          gsap.fromTo(
            infoRef.current,
            { y: 15, opacity: 0.75 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
              },
            },
          );
        }

        // Animate the decorative vector line drawing from left to right
        if (pathRef.current && rightDotRef.current) {
          let pathLength = pathRef.current.getTotalLength();
          if (!pathLength || pathLength === 0) {
            pathLength = 1200;
          }

          gsap.set(pathRef.current, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });

          gsap.set(rightDotRef.current, {
            scale: 0,
            transformOrigin: "center center",
            opacity: 0,
          });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 75%", // Trigger when top of footer is 75% from viewport top (approx 25% visible)
                once: true,
              },
            })
            .to(pathRef.current, {
              strokeDashoffset: 0,
              duration: 2.2,
              ease: "power2.inOut",
              delay: 0.3, // 300ms delay after footer is visible
            })
            .to(rightDotRef.current, {
              scale: 1,
              opacity: 0.6,
              duration: 0.3,
              ease: "back.out(1.7)",
            });
        }
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const toTop = () => {
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (t: number | string) => void };
      }
    ).__lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative z-[1] w-full bg-[#222222] text-white select-none pt-16 sm:pt-20 pb-10 sm:pb-12 mt-0 overflow-hidden min-h-[60vh] flex flex-col justify-between rounded-t-[40px] md:rounded-t-[60px]"
    >
      <div className="mx-auto px-6 sm:px-12 md:px-16 w-full max-w-[1400px] flex-1 flex flex-col justify-between h-full">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-medium leading-[1.05] max-w-[450px]">
            This could be the start to something special.
          </h2>
          <a
            href="mailto:hello@skool.company"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-md border border-[#6FB7BA] text-[#6FB7BA] hover:bg-[#6FB7BA] hover:text-[#222222] transition-colors duration-300 text-sm font-medium uppercase tracking-wider"
          >
            Write to us
          </a>
        </div>

        {/* Middle Section */}
        <div
          ref={infoRef}
          className="relative grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-8 pb-10"
        >
          {/* Decorative SVG line - desktop/tablet S-Curve overlay */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 200"
              preserveAspectRatio="none"
              fill="none"
            >
              <circle cx="10" cy="170" r="3" fill="#FFFFFF" opacity="0.6" />
              <path
                ref={pathRef}
                d="M 10 170 L 680 170 C 760 170, 780 20, 860 20 L 990 20"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                opacity="0.6"
              />
              <circle ref={rightDotRef} cx="990" cy="20" r="3" fill="#FFFFFF" opacity="0.6" />
            </svg>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 flex flex-col">
            <h3 className="text-white/40 uppercase tracking-[0.2em] text-[11px] font-semibold mb-5">
              Get in touch
            </h3>
            <a
              href="tel:+91890405004"
              className="text-[17px] font-medium hover:text-[#6FB7BA] transition-colors mb-1.5"
            >
              +91 8904 05004 / 6498
            </a>
            <a
              href="mailto:hello@skool.company"
              className="text-[17px] font-medium hover:text-[#6FB7BA] transition-colors"
            >
              hello@skool.company
            </a>
          </div>

          {/* Locations */}
          <div className="md:col-span-6 flex flex-col">
            <h3 className="text-white/40 uppercase tracking-[0.2em] text-[11px] font-semibold mb-5">
              Our locations
            </h3>
            <div className="flex flex-col sm:flex-row gap-10">
              <div className="flex-1">
                <h4 className="text-[15px] font-medium mb-2.5">Ahmedabad</h4>
                <address className="not-italic text-[14px] text-white/70 leading-relaxed max-w-[260px]">
                  614, Shilp Epitome, Rajpath Rangoli Rd, Sindhubhavan Rd, Ahmedabad, Gujarat 380059
                </address>
              </div>
              <div className="flex-1">
                <h4 className="text-[15px] font-medium mb-2.5">Bhuj</h4>
                <address className="not-italic text-[14px] text-white/70 leading-relaxed max-w-[260px]">
                  Skool Co., Banker’s Colony, Opp. Bhaktidham Apartment, Bhuj, Gujarat 370001
                </address>
              </div>
            </div>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 flex flex-col md:items-end md:pt-[90px]">
            <div className="flex flex-col items-center gap-6 w-full md:w-auto">
              <div className="flex flex-row flex-nowrap gap-3 md:justify-end md:items-center">
                {[
                  {
                    name: "Instagram",
                    icon: Instagram,
                    href: "https://www.instagram.com/skoolcompany/",
                  },
                  {
                    name: "LinkedIn",
                    icon: Linkedin,
                    href: "https://www.linkedin.com/company/skoolcompany",
                  },
                  {
                    name: "Facebook",
                    icon: Facebook,
                    href: "https://www.facebook.com/skoolcompany/",
                  },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#6FB7BA]/60 text-white/90 hover:bg-[#6FB7BA] hover:text-[#222222] hover:border-[#6FB7BA] transition-all duration-300"
                    >
                      <Icon className="w-5.5 h-5.5" />
                    </a>
                  );
                })}
              </div>

              <button
                onClick={toTop}
                className="flex items-center gap-2 text-[14px] text-white/60 hover:text-white transition-colors group"
              >
                Psst! Free ride to top{" "}
                <span className="group-hover:-translate-y-1 transition-transform">↑</span>
              </button>
            </div>
          </div>
        </div>

        {/* Vector Line - Mobile version */}
        <div className="w-full py-6 block md:hidden">
          <svg
            className="w-full h-[10px] overflow-visible"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            fill="none"
          >
            <circle cx="2" cy="5" r="1.5" fill="#FFFFFF" opacity="0.6" />
            <line
              x1="2"
              y1="5"
              x2="98"
              y2="5"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              opacity="0.6"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="98" cy="5" r="1.5" fill="#FFFFFF" opacity="0.6" />
          </svg>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-4 pb-2">
          {/* Logo */}
          <div ref={logoRef} className="flex flex-col gap-4">
            <img
              src="/images/SkoolCo-Logo-Linear.png"
              alt="Skool Company"
              className="h-[72px] md:h-[104px] lg:h-[124px] w-auto object-contain origin-left"
              style={{ filter: "brightness(0) invert(0.7)" }}
            />
          </div>

          {/* Copyright */}
          <div className="text-white/40 text-[13px]">© 2026, Designed with ♡ by Skool Company</div>
        </div>
      </div>
    </footer>
  );
}
