import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Instagram, Linkedin, Facebook } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { contactSchema, type ContactFormData } from "@/lib/validation/contact";
import { submitContactForm } from "@/lib/api/contact-action";
import { CONTACT_DETAILS } from "@/data/site-content";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_TYPES = [
  "Advertising Campaign",
  "Brand Identity",
  "Social Strategy",
  "Web/UI Design",
  "Wedding Stationery",
  "Something Else",
];

export default function ContactPage() {
  const root = useRef<HTMLElement>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      projectType: "",
      message: "",
      website: "",
    },
  });

  // Smooth scroll initialization with Lenis
  useEffect(() => {
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const instance = new Lenis({ duration: 1.1, smoothWheel: true });
        lenis = instance;
        (window as unknown as { __lenis?: unknown }).__lenis = instance;
        instance.on("scroll", ScrollTrigger.update);
        const loop = (time: number) => {
          instance.raf(time);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      });
    }

    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      delete (window as unknown as { __lenis?: unknown }).__lenis;
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-contact]", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.09,
        ease: "power4.out",
        delay: 0.1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await submitContactForm({ data });
      if (response.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(response.error || "An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setErrorMessage("Could not connect to the server. Please check your internet connection.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground selection:bg-rect selection:text-white" ref={root}>
      {/* Dynamic Floating Navbar */}
      <Navbar activeNav="contact" />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 bg-background shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)] w-full pt-28 sm:pt-36 md:pt-40 pb-20 rounded-b-[40px] md:rounded-b-[60px]">
        <section className="px-5 sm:px-8 lg:px-14 max-w-[1400px] mx-auto">
          <div className="grid gap-16 lg:grid-cols-[45fr_55fr] lg:gap-24">
            
            {/* Left Column: Direct Info */}
            <div className="flex flex-col h-full">
              <div className="mb-16">
                <div data-contact className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-widest text-muted-foreground mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#4BB1AA]" />
                  <span>START A CONVERSATION</span>
                </div>
                
                <h1
                  data-contact
                  className="font-display font-medium leading-[1.05] tracking-[-0.03em] text-foreground mb-8 text-balance"
                  style={{ fontSize: "clamp(48px, 6vw, 84px)" }}
                >
                  Let's build something people remember.
                </h1>
                
                <p data-contact className="text-xl sm:text-2xl text-muted-foreground leading-relaxed text-balance max-w-[480px]">
                  Tell us what you're building, where your brand is today, and where you want it to go.
                </p>
              </div>

              <div className="mt-auto space-y-12" data-contact>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-black/10 pt-10">
                  <div>
                    <h3 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-4 block">
                      Say Hello
                    </h3>
                    <a
                      href={CONTACT_DETAILS.emailLink}
                      className="text-[17px] font-medium hover:text-[#4BB1AA] transition-colors block mb-2"
                    >
                      {CONTACT_DETAILS.email}
                    </a>
                    <a
                      href={CONTACT_DETAILS.phoneLink}
                      className="text-[17px] font-medium hover:text-[#4BB1AA] transition-colors block"
                    >
                      {CONTACT_DETAILS.phone}
                    </a>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-4 block">
                      HQ
                    </h3>
                    <address className="not-italic text-[15px] leading-relaxed text-foreground/80">
                      {CONTACT_DETAILS.address}
                    </address>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-black/10">
                  <h3 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mr-4">
                    Socials
                  </h3>
                  {[
                    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/skoolcompany/" },
                    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/skoolcompany" },
                    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/skoolcompany/" }
                  ].map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 text-foreground/70 hover:bg-[#4BB1AA] hover:text-white hover:border-[#4BB1AA] transition-all duration-300"
                        aria-label={social.name}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div
              data-contact
              className="rounded-[32px] sm:rounded-[40px] border border-black/[0.06] bg-[#FAFAFA] p-6 sm:p-10 lg:p-12 shadow-xl"
            >
              {submitStatus === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-16 animate-fade-in h-full min-h-[400px]">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4BB1AA]/10 text-[#4BB1AA] text-4xl mb-8">
                    ✓
                  </div>
                  <h3 className="font-display text-3xl font-bold text-foreground mb-4">Inquiry Received</h3>
                  <p className="max-w-[36ch] text-muted-foreground text-base leading-relaxed">
                    Thanks — we'll be in touch soon.
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="mt-10 rounded-full border border-black/10 px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-foreground hover:text-background transition-all"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" type="text" {...register("website")} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className="space-y-3">
                      <label htmlFor="name" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Jane Doe"
                        className={`w-full border-b bg-transparent px-0 py-3 text-[15px] text-foreground transition-all placeholder:text-muted-foreground/40 focus:border-foreground focus:outline-none ${
                          errors.name ? "border-red-500" : "border-black/10"
                        }`}
                        {...register("name")}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="email" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="jane@company.com"
                        className={`w-full border-b bg-transparent px-0 py-3 text-[15px] text-foreground transition-all placeholder:text-muted-foreground/40 focus:border-foreground focus:outline-none ${
                          errors.email ? "border-red-500" : "border-black/10"
                        }`}
                        {...register("email")}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className="space-y-3">
                      <label htmlFor="company" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                        Company / Brand *
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Acme Corp"
                        className={`w-full border-b bg-transparent px-0 py-3 text-[15px] text-foreground transition-all placeholder:text-muted-foreground/40 focus:border-foreground focus:outline-none ${
                          errors.company ? "border-red-500" : "border-black/10"
                        }`}
                        {...register("company")}
                      />
                      {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company.message}</p>}
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="phone" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                        Phone Number <span className="opacity-50">(Optional)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 99999 99999"
                        className="w-full border-b border-black/10 bg-transparent px-0 py-3 text-[15px] text-foreground transition-all placeholder:text-muted-foreground/40 focus:border-foreground focus:outline-none"
                        {...register("phone")}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
                      Help With
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {PROJECT_TYPES.map((type) => (
                        <label key={type} className="cursor-pointer">
                          <input type="radio" value={type} className="peer sr-only" {...register("projectType")} />
                          <span className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-[14px] text-muted-foreground transition-all hover:border-black/30 peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background select-none">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label htmlFor="message" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
                      About Project *
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Tell us what you are building, timeline, and goals..."
                      className={`w-full border-b bg-transparent px-0 py-3 text-[15px] text-foreground transition-all placeholder:text-muted-foreground/40 focus:border-foreground focus:outline-none resize-none ${
                        errors.message ? "border-red-500" : "border-black/10"
                      }`}
                      {...register("message")}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-sm font-medium text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      {errorMessage}
                    </p>
                  )}

                  <div className="pt-6 border-t border-black/10">
                    <button
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className="group w-full inline-flex items-center justify-center gap-3 rounded-full bg-foreground px-8 py-5 text-[14px] font-bold tracking-wider text-background uppercase transition-all duration-300 hover:scale-[1.02] hover:bg-[#4BB1AA] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitStatus === "submitting" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
            
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
