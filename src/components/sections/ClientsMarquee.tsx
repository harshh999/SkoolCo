const BRANDS = [
  "NORTHBOUND",
  "Atelier No. 9",
  "FORM&CO",
  "Maison Rue",
  "STUDIO LUME",
  "Field Notes",
  "VERA",
  "sunomedia",
  "ATLAS WORKS",
  "Common Ground",
  "NORTH",
  "ARC Studio",
];

function getBrandMark(name: string) {
  switch (name.toLowerCase()) {
    case "northbound":
      return (
        <span className="font-sans font-bold tracking-[0.25em] text-[clamp(18px,2.2vw,28px)] uppercase">
          Northbound
        </span>
      );
    case "atelier no. 9":
      return (
        <span className="font-serif italic font-medium text-[clamp(18px,2.2vw,28px)] tracking-normal">
          Atelier No. 9
        </span>
      );
    case "form&co":
      return (
        <span className="font-sans font-extrabold tracking-tight text-[clamp(20px,2.4vw,32px)] uppercase font-display">
          FORM&CO
        </span>
      );
    case "maison rue":
      return (
        <span className="font-serif tracking-[0.18em] text-[clamp(18px,2.2vw,28px)] font-light">
          Maison Rue
        </span>
      );
    case "studio lume":
      return (
        <span className="font-mono tracking-[0.22em] text-[clamp(16px,2vw,24px)] uppercase font-bold">
          STUDIO LUME
        </span>
      );
    case "field notes":
      return (
        <span className="font-serif font-extrabold text-[clamp(18px,2.2vw,28px)] tracking-tight">
          Field Notes
        </span>
      );
    case "vera":
      return (
        <span className="font-sans font-black tracking-[0.1em] text-[clamp(20px,2.4vw,32px)] uppercase font-display">
          VERA
        </span>
      );
    case "sunomedia":
      return (
        <span className="font-sans font-semibold text-[clamp(18px,2.2vw,28px)] lowercase tracking-tighter">
          sunomedia
        </span>
      );
    case "atlas works":
      return (
        <span className="font-sans font-light tracking-[0.28em] text-[clamp(15px,1.8vw,22px)] uppercase font-display">
          Atlas Works
        </span>
      );
    case "common ground":
      return (
        <span className="font-serif font-bold italic text-[clamp(18px,2.2vw,28px)] tracking-wide">
          Common Ground
        </span>
      );
    case "north":
      return (
        <span className="font-mono tracking-[0.2em] font-semibold text-[clamp(20px,2.4vw,32px)] uppercase">
          NORTH
        </span>
      );
    case "arc studio":
      return (
        <span className="font-serif italic font-normal text-[clamp(18px,2.2vw,28px)] tracking-widest">
          ARC Studio
        </span>
      );
    default:
      return <span className="font-display font-bold text-xl uppercase">{name}</span>;
  }
}

export default function ClientsMarquee() {
  const row = [...BRANDS, ...BRANDS];

  return (
    <section className="w-full overflow-hidden pt-[80px] pb-[100px] bg-[#FAF9F6]">
      {/* Transition Line */}
      <div className="flex justify-center mb-[28px]">
        <div
          style={{
            width: "60px",
            height: "1px",
            backgroundColor: "#4BB1AA",
            opacity: 0.65,
          }}
        />
      </div>

      <div className="mx-auto mb-[65px] flex flex-col items-center justify-center text-center px-5 sm:px-8">
        <h2
          className="font-display font-normal italic leading-none"
          style={{
            fontSize: "clamp(32px, 3vw, 48px)",
            color: "#222222",
          }}
        >
          Partnered with
        </h2>
      </div>

      <div className="group relative w-full overflow-hidden py-4">
        <div className="marquee-track flex w-max items-center gap-[70px] sm:gap-[90px] group-hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center justify-center shrink-0 select-none text-[#6F7376] transition-opacity duration-300 cursor-pointer opacity-65 hover:opacity-100"
            >
              {getBrandMark(name)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
