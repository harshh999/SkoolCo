import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MERCH_ITEMS = [
  {
    id: "merch-1",
    alt: "Skool Heavyweight Graphic Tee",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "merch-2",
    alt: "Skool Minimal Canvas Tote Bag",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "merch-3",
    alt: "Skool Embroidered Pullover Hoodie",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "merch-4",
    alt: "Skool Studio Cap",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "merch-5",
    alt: "Skool Ceramic Coffee Mug",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "merch-6",
    alt: "Skool Editorial White Tee",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
  },
];

export default function MerchSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-merch-card]", {
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
  }, []);

  return (
    <section
      ref={root}
      id="merch"
      className="relative w-full bg-[#f7f7f5] pt-[90px] pb-[110px] select-none"
    >
      <div className="mx-auto max-w-[980px] px-4 sm:px-6 md:px-0">
        {/* Section Heading */}
        <div className="text-center mb-[45px] px-5 sm:px-8">
          <h2 className="text-[#20242a] font-semibold tracking-[-0.03em] text-[32px] sm:text-[40px] md:text-[48px] leading-[1.15]">
            Things we've made.
          </h2>
          <p className="text-[#56616b] text-[16px] md:text-[18px] leading-[1.5] max-w-[460px] mx-auto mt-4">
            Merch, objects and little things made for everyday spaces.
          </p>
        </div>

        {/* 3-Column by 2-Row Editorial Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-[14px]">
          {MERCH_ITEMS.map((item) => (
            <div
              key={item.id}
              data-merch-card
              className="group relative aspect-square w-full rounded-[14px] sm:rounded-[16px] lg:rounded-[18px] overflow-hidden bg-transparent cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-103"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
