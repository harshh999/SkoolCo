import { CLIENT_BRANDS } from "@/data/site-content";

function getBrandMark(name: string) {
  switch (name.toLowerCase()) {
    case "northbound":
      return <span className="font-sans font-bold tracking-[0.2em] text-2xl uppercase">Northbound</span>;
    case "kalaa studio":
      return <span className="font-serif italic font-medium text-2xl tracking-normal">Kalaa Studio</span>;
    case "orbit&co":
      return <span className="font-sans font-extrabold tracking-tight text-3xl uppercase font-display">Orbit&Co</span>;
    case "maison rue":
      return <span className="font-serif tracking-[0.15em] text-2xl font-light">Maison Rue</span>;
    case "pallav":
      return <span className="font-mono tracking-[0.25em] text-xl uppercase font-bold">Pallav</span>;
    case "field notes":
      return <span className="font-serif font-extrabold text-2xl tracking-tight">Field Notes</span>;
    case "verta":
      return <span className="font-sans font-black tracking-[0.08em] text-2xl uppercase font-display">Verta</span>;
    case "suno media":
      return <span className="font-sans font-semibold text-2xl lowercase tracking-tighter">suno media</span>;
    case "atlas works":
      return <span className="font-sans font-light tracking-[0.3em] text-lg uppercase font-display">Atlas Works</span>;
    case "bhuj bazaar":
      return <span className="font-serif font-bold italic text-2xl tracking-wide">Bhuj Bazaar</span>;
    case "lumen":
      return <span className="font-mono tracking-[0.18em] font-semibold text-2xl uppercase">Lumen</span>;
    case "chai society":
      return <span className="font-serif italic font-normal text-2xl tracking-widest">Chai Society</span>;
    default:
      return <span className="font-display font-bold text-xl uppercase">{name}</span>;
  }
}

export default function ClientsMarquee() {
  const row = [...CLIENT_BRANDS, ...CLIENT_BRANDS];

  return (
    <section className="w-full overflow-hidden py-24 sm:py-32 lg:py-40 bg-background/40">
      <div className="mx-auto mb-16 flex flex-col items-center justify-center text-center px-5 sm:px-8">
        <h2
          className="font-display font-normal italic leading-none text-foreground"
          style={{ fontSize: "clamp(56px, 5.6vw, 72px)" }}
        >
          Partnered with
        </h2>
      </div>
      <div className="group relative w-full overflow-hidden py-4">
        <div className="marquee-track flex w-max items-center gap-16 sm:gap-24 group-hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center justify-center shrink-0 h-[70px] select-none text-foreground/45 hover:text-foreground transition-colors duration-300 cursor-pointer"
            >
              {getBrandMark(name)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
