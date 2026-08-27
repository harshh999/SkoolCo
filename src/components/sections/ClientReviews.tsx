const TESTIMONIALS = [
  {
    quote:
      "The detailed information made it much easier to compare options and understand what would work for me.",
    name: "Oliver Grant",
  },
  {
    quote:
      "A very well-designed experience that made finding the right home simple. Everything was clear and easy to navigate.",
    name: "Emma Collins",
  },
  {
    quote:
      "The experience felt clean and thoughtfully designed. It helped me explore options and choose a home with confidence.",
    name: "Lucas Anderson",
  },
  {
    quote:
      "From browsing to shortlisting properties, everything felt intuitive. It helped me move forward with confidence.",
    name: "Sophia Turner",
  },
  {
    quote:
      "The way homes are presented made it easier to understand value and compare options without feeling overwhelmed.",
    name: "Noah Mitchell",
  },
];

export default function ClientReviews() {
  // Duplicate array for seamless infinite marquee loop
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="client-reviews"
      className="relative w-full bg-[#f7f7f5] pt-[32px] md:pt-[48px] pb-[80px] overflow-hidden select-none"
    >
      {/* Header Container */}
      <div
        className="mx-auto px-5 sm:px-8 mb-[60px] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-end"
        style={{
          width: "min(1240px, calc(100vw - 80px))",
        }}
      >
        {/* Left Column */}
        <div>
          <h2
            className="text-[#20242a] font-semibold tracking-[-0.035em] leading-[1.12] max-w-[540px]"
            style={{
              fontSize: "clamp(42px, 4.2vw, 62px)",
            }}
          >
            Trusted by the people we build for.
          </h2>
        </div>

        {/* Right Column */}
        <div className="md:justify-self-end pb-2">
          <p className="text-[#56616b] text-[18px] leading-[1.55] max-w-[430px]">
            Real words from the people and brands we've had the opportunity to work with.
          </p>
        </div>
      </div>

      {/* Testimonial Stage Container */}
      <div className="relative w-full h-[220px] md:h-[240px] overflow-hidden">
        {/* Left Soft Fade Overlay (z-30) */}
        <div
          className="absolute top-0 left-0 h-full w-[15%] z-[30] pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #f7f7f5 0%, rgba(247,247,245,0.95) 20%, rgba(247,247,245,0.75) 50%, rgba(247,247,245,0) 100%)",
          }}
        />

        {/* Right Soft Fade Overlay (z-30) */}
        <div
          className="absolute top-0 right-0 h-full w-[15%] z-[30] pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, #f7f7f5 0%, rgba(247,247,245,0.95) 20%, rgba(247,247,245,0.75) 50%, rgba(247,247,245,0) 100%)",
          }}
        />

        {/* Continuous Right-to-Left Marquee Carousel (z-5) */}
        <div className="absolute top-0 left-0 right-0 h-full z-[5]">
          <div className="reviews-marquee-track flex w-max items-stretch gap-6 h-full">
            {duplicatedTestimonials.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="w-[280px] sm:w-[320px] md:w-[350px] h-[220px] md:h-[240px] shrink-0 rounded-[18px] bg-white border border-black/[0.035] p-6 md:p-7 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.025)]"
                style={{ borderRadius: "18px" }}
              >
                {/* Top Quote Icon & Quote Text */}
                <div>
                  <span className="block text-[36px] leading-none text-[#b5bbc0] font-serif mb-[8px] select-none">
                    “
                  </span>
                  <p className="text-[#444c54] text-[14px] md:text-[15px] leading-[1.5] font-normal">
                    {item.quote}
                  </p>
                </div>

                {/* Divider and Client Name */}
                <div>
                  <div className="border-t border-black/[0.06] my-3" />
                  <h4 className="text-[#353c43] text-[16px] font-medium leading-tight">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
