import { SOCIAL_LINKS } from "@/data/site-content";

export default function Footer() {
  const toTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number | string) => void } })
      .__lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border px-5 py-14 sm:px-8 lg:px-14 bg-background/50">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
        <p className="text-sm font-medium tracking-wide text-muted-foreground">
          Advertising <span className="opacity-40">|</span> Branding{" "}
          <span className="opacity-40">|</span> Social Media <span className="opacity-40">|</span>{" "}
          Wedding Stationery <span className="opacity-40">|</span> UI Design
        </p>

        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-semibold text-foreground underline-offset-4 hover:underline hover:text-primary transition-all"
              >
                {social.name}
              </a>
            ))}
          </div>
          <button
            onClick={toTop}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-foreground hover:text-background active:scale-95"
            aria-label="Scroll back to top"
          >
            Psst! Free ride to top ↑
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Skool Company. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Designed with ♡ by Skool Company</p>
        </div>
      </div>
    </footer>
  );
}
