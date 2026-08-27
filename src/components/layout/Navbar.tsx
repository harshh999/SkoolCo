import { useEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { NAV_ITEMS } from "@/data/site-content";

interface NavbarProps {
  activeNav?: string;
}

export default function Navbar({ activeNav }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState({ select: (s) => s.location.pathname });
  const isAboutPage = routerState === "/about";
  const defaultActive = activeNav || (isAboutPage ? "about" : "home");
  const [active, setActive] = useState(defaultActive);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navZIndex, setNavZIndex] = useState(50);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeNav) {
      setActive(activeNav);
    } else if (isAboutPage) {
      setActive("about");
    }
  }, [activeNav, isAboutPage]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 100);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const scrollDelta = scrollY - lastScrollY;
          const movementThreshold = 4;

          const proj1 = document.getElementById("selected-project-1");
          const orbit = document.getElementById("featured-project-4");

          if (proj1 && orbit) {
            const rect1 = proj1.getBoundingClientRect();
            const rectOrbit = orbit.getBoundingClientRect();

            const navbarBottom = 80;
            const navbarTop = 20;

            const isInsideProjects = rect1.top <= navbarBottom && rectOrbit.bottom >= navbarTop;

            if (isInsideProjects) {
              if (scrollDelta > movementThreshold) {
                // Intentional scrolling down inside project region: stay behind project content
                setNavZIndex(50);
                lastScrollY = scrollY;
              } else if (scrollDelta < -movementThreshold) {
                // Intentional scrolling up inside project region: immediately pop to foreground
                setNavZIndex(1000);
                lastScrollY = scrollY;
              }
            } else {
              // Outside project region (before Project One or after Orbit): normal layer
              setNavZIndex(50);
              lastScrollY = scrollY;
            }
          } else {
            setNavZIndex(50);
            lastScrollY = scrollY;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activeNav || isAboutPage) return;

    // Dynamic active state monitoring via IntersectionObserver
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id === "work" ? "selected-work" : item.id),
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            const mappedId = entry.target.id === "selected-work" ? "work" : entry.target.id;
            setActive(mappedId);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [activeNav, isAboutPage]);

  const handleNavClick = (id: string) => {
    if (id === "about") {
      if (routerState !== "/about") {
        navigate({ to: "/about" });
      } else {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (id === "home") {
      if (routerState !== "/") {
        navigate({ to: "/" });
      } else {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // For work, services
    const targetId = id === "work" ? "selected-work" : id;
    if (routerState !== "/") {
      navigate({ to: "/", hash: targetId });
    } else {
      const el = document.getElementById(targetId) || document.getElementById(id);
      if (el) {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element) => void } }).__lenis;
        if (lenis) lenis.scrollTo(el);
        else el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate({ to: "/", hash: targetId });
      }
    }
  };

  const handleContactClick = () => {
    if (routerState !== "/contact") {
      navigate({ to: "/contact" });
    } else {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const baseTransition =
    "width 500ms cubic-bezier(0.22, 1, 0.36, 1), border-radius 500ms cubic-bezier(0.22, 1, 0.36, 1), padding 500ms cubic-bezier(0.22, 1, 0.36, 1), background 500ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 500ms cubic-bezier(0.22, 1, 0.36, 1)";

  const transformStyle = "translateX(-50%) translateY(0)";

  return (
    <div
      className="fixed flex items-center justify-between py-2 select-none"
      style={{
        zIndex: navZIndex,
        pointerEvents: "auto",
        opacity: 1,
        top: "20px",
        left: "50%",
        transform: transformStyle,
        width: scrolled ? "min(92vw, 1200px)" : "min(760px, calc(100vw - 32px))",
        borderRadius: scrolled ? "26px" : "999px",
        paddingLeft: scrolled ? "26px" : "14px",
        paddingRight: scrolled ? "14px" : "8px",
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
        transition: baseTransition,
      }}
    >
      {/* Left Zone: Logo */}
      <div className="flex shrink-0 items-center">
        <button
          onClick={() => handleNavClick("home")}
          className="flex shrink-0 items-center gap-2 pr-2 text-left hover:opacity-80 transition-opacity focus:outline-none cursor-pointer"
          aria-label="Skool Company, back to top"
        >
          <img src="/SkoolCo-Logo.png" alt="Skool Co. Logo" className="h-14 w-14 object-contain" />
        </button>
      </div>

      {/* Middle Zone: Navigation */}
      <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none cursor-pointer ${
              active === item.id
                ? "bg-foreground/5 text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right Zone: CTA & Mobile Menu Toggle */}
      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={handleContactClick}
          className="hidden shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none md:inline-flex group cursor-pointer"
        >
          say hello !
          <span
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          >
            ↗
          </span>
        </button>

        <button
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background focus:outline-none focus:ring-2 focus:ring-ring md:hidden cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="flex flex-col gap-1">
            <span
              className={`block h-px w-4 bg-current transition-transform duration-300 ${
                mobileOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-4 bg-current transition-transform duration-300 ${
                mobileOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div className="glass absolute left-0 right-0 top-[70px] mx-auto w-full animate-fade-in rounded-3xl p-4 md:hidden">
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setMobileOpen(false);
                  handleNavClick(item.id);
                }}
                className={`rounded-2xl px-4 py-3 text-left font-display text-lg transition-all focus:outline-none cursor-pointer ${
                  active === item.id
                    ? "bg-foreground/10 text-foreground font-bold"
                    : "text-foreground hover:bg-foreground/5 font-semibold"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                handleContactClick();
              }}
              className="mt-2 rounded-2xl bg-foreground px-4 py-3 text-center text-sm font-semibold text-background hover:opacity-90 active:scale-[0.99] transition-all focus:outline-none cursor-pointer"
            >
              say hello !
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

