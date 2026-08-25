import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/data/site-content";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger between 80px and 120px (100px is the sweet spot)
      setScrolled(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Dynamic active state monitoring via IntersectionObserver
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean,
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="glass fixed z-50 flex items-center gap-4 py-2 select-none pointer-events-auto"
      style={{
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: scrolled ? "min(92vw, 1200px)" : "min(760px, calc(100vw - 32px))",
        borderRadius: scrolled ? "26px" : "999px",
        paddingLeft: scrolled ? "26px" : "14px",
        paddingRight: scrolled ? "14px" : "8px",
        transition:
          "width 500ms cubic-bezier(0.22, 1, 0.36, 1), border-radius 500ms cubic-bezier(0.22, 1, 0.36, 1), padding 500ms cubic-bezier(0.22, 1, 0.36, 1), background 500ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 500ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <button
        onClick={() => scrollToId("home")}
        className="flex shrink-0 items-center gap-2 pr-2 text-left hover:opacity-80 transition-opacity focus:outline-none"
        aria-label="Skool Company, back to top"
      >
        <img src="/skool-logo.svg" alt="Skool Co. Logo" className="h-7 w-7 object-contain" />
        <span className="font-display text-[15px] font-extrabold tracking-tight text-foreground">
          skool<span className="text-muted-foreground">.company</span>
        </span>
      </button>

      <nav className="mx-auto hidden items-center gap-1 md:flex">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToId(item.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none ${
              active === item.id
                ? "bg-foreground/5 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={() => scrollToId("contact")}
        className="ml-auto hidden shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none md:inline-flex"
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
        className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background focus:outline-none focus:ring-2 focus:ring-ring md:hidden"
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

      {mobileOpen && (
        <div className="glass absolute left-0 right-0 top-[70px] mx-auto w-full animate-fade-in rounded-3xl p-4 md:hidden">
          <nav className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setMobileOpen(false);
                  scrollToId(item.id);
                }}
                className="rounded-2xl px-4 py-3 text-left font-display text-lg font-semibold text-foreground hover:bg-foreground/5 transition-all focus:outline-none"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                scrollToId("contact");
              }}
              className="mt-2 rounded-2xl bg-foreground px-4 py-3 text-center text-sm font-semibold text-background hover:opacity-90 active:scale-[0.99] transition-all focus:outline-none"
            >
              say hello !
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
