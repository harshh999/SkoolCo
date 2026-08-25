import { CLIENT_BRANDS } from "@/data/site-content";

export default function ClientsMarquee() {
  const row = [...CLIENT_BRANDS, ...CLIENT_BRANDS];
  return (
    <section className="overflow-hidden border-y border-border py-20 lg:py-28 bg-background/40">
      <div className="mx-auto mb-14 max-w-[1100px] px-5 sm:px-8">
        <h2
          className="max-w-[18ch] font-display font-bold leading-[1.05] text-foreground"
          style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.9rem)" }}
        >
          Trusted by brands with something to say.
        </h2>
      </div>
      <div className="group relative w-full overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-16 group-hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-xl font-bold uppercase tracking-[-0.02em] text-foreground/45 transition-colors duration-300 hover:text-foreground sm:text-2xl cursor-pointer"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
