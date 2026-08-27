import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: "What services does Skool Company offer?",
    answer:
      "We work across branding, design, social media, advertising and creative direction to help brands build a distinct and meaningful presence.",
  },
  {
    question: "Do you work with businesses outside India?",
    answer:
      "Yes. We collaborate with businesses and teams regardless of location and can manage projects remotely.",
  },
  {
    question: "How do I start a project with Skool Company?",
    answer:
      "Simply get in touch with us and tell us about your idea, business or project. We will discuss your requirements and determine the best way to work together.",
  },
  {
    question: "Do you take on projects of all sizes?",
    answer:
      "We evaluate every project individually and take on work where we believe we can create meaningful value.",
  },
  {
    question: "Can you help with both strategy and design?",
    answer:
      "Yes. Depending on the project, we can work from early-stage strategy and positioning through to visual identity, design and execution.",
  },
];

export default function FAQSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-faq-left]", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from("[data-faq-item]", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="faq"
      className="relative w-full bg-[#f7f7f5] pt-[80px] pb-[120px] px-5 sm:px-8"
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8"
        style={{ width: "min(1240px, calc(100vw - 80px))" }}
      >
        {/* Left Column (Content) */}
        <div data-faq-left className="lg:col-span-5 flex flex-col pt-2">
          <div className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.08em] text-[#59636d] uppercase mb-[24px]">
            <span className="w-2 h-2 rounded-full bg-[#4BB1AA]" />
            <span>SECTION 05</span>
          </div>
          <h2
            className="text-[#20242a] font-semibold tracking-[-0.035em] leading-[1.12] mb-[20px]"
            style={{ fontSize: "clamp(42px, 4.2vw, 62px)" }}
          >
            Questions
          </h2>
          <p className="text-[#56616b] text-[18px] leading-[1.55] max-w-[400px]">
            Everything you may wish to know before beginning your journey with us.
          </p>
        </div>

        {/* Right Column (Accordion) */}
        <div className="lg:col-span-7">
          <Accordion type="single" collapsible className="w-full border-t border-black/[0.06]">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                data-faq-item
                className="border-b border-black/[0.06]"
              >
                <AccordionTrigger className="hover:no-underline py-6 md:py-8 group text-left">
                  <span className="text-[#20242a] text-[18px] sm:text-[21px] font-medium tracking-[-0.01em] group-hover:text-[#4BB1AA] transition-colors duration-300 pr-6">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[#56616b] text-[16px] sm:text-[17px] leading-[1.65] pb-6 md:pb-8 pr-4 sm:pr-12">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
