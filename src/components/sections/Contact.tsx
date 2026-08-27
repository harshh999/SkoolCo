import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-contact]", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
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
    <section ref={root} id="contact" className="px-5 py-28 sm:px-8 lg:px-14 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[45fr_55fr] lg:gap-24">
          {/* Left Column: Direct Info */}
          <div>
            <h2
              data-contact
              className="font-display font-extrabold leading-[0.92] tracking-[-0.04em] text-foreground"
              style={{ fontSize: "clamp(2.2rem, 6vw, 4.6rem)" }}
            >
              How about we take a next step?
            </h2>
            <p data-contact className="mt-6 text-lg text-muted-foreground">
              This could be the start of something special. Fill out the form or reach out directly.
            </p>

            <div className="mt-16 space-y-10 border-t border-border pt-10" data-contact>
              <div>
                <p className="eyebrow">Get in touch</p>
                <a
                  href={CONTACT_DETAILS.phoneLink}
                  className="mt-3 block font-display text-xl font-bold text-foreground sm:text-2xl hover:text-primary transition-all"
                >
                  {CONTACT_DETAILS.phone}
                </a>
                <a
                  href={CONTACT_DETAILS.emailLink}
                  className="mt-2 block text-muted-foreground underline underline-offset-4 hover:text-foreground transition-all"
                >
                  {CONTACT_DETAILS.email}
                </a>
              </div>
              <div>
                <p className="eyebrow">Let's discuss ideas</p>
                <address className="mt-3 max-w-[36ch] not-italic leading-relaxed text-muted-foreground">
                  {CONTACT_DETAILS.address}
                </address>
              </div>
            </div>
          </div>

          {/* Right Column: Validation Contact Form */}
          <div
            data-contact
            className="rounded-[32px] border border-border bg-card/40 p-6 sm:p-10 shadow-[var(--shadow-soft)]"
          >
            {submitStatus === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rect/10 text-rect text-3xl mb-6">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">Message Sent!</h3>
                <p className="mt-3 max-w-[32ch] text-muted-foreground text-sm leading-relaxed">
                  Thanks — we'll be in touch soon.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-8 rounded-full border border-border px-6 py-2.5 text-xs font-semibold text-foreground hover:bg-foreground hover:text-background transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    {...register("website")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Jane Doe"
                      className={`w-full rounded-2xl border bg-background/50 px-4 py-3.5 text-sm text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none focus:ring-1 focus:ring-ring ${
                        errors.name ? "border-destructive focus:ring-destructive" : "border-border"
                      }`}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs font-medium text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="jane@company.com"
                      className={`w-full rounded-2xl border bg-background/50 px-4 py-3.5 text-sm text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none focus:ring-1 focus:ring-ring ${
                        errors.email ? "border-destructive focus:ring-destructive" : "border-border"
                      }`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs font-medium text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="company"
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Company / Brand *
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Acme Corp"
                      className={`w-full rounded-2xl border bg-background/50 px-4 py-3.5 text-sm text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none focus:ring-1 focus:ring-ring ${
                        errors.company
                          ? "border-destructive focus:ring-destructive"
                          : "border-border"
                      }`}
                      {...register("company")}
                    />
                    {errors.company && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Phone Number <span className="opacity-50">(Optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 99999 99999"
                      className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3.5 text-sm text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      {...register("phone")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Project Type <span className="opacity-50">(Optional)</span>
                  </span>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {PROJECT_TYPES.map((type) => (
                      <label key={type} className="cursor-pointer text-xs">
                        <input
                          type="radio"
                          value={type}
                          className="peer sr-only"
                          {...register("projectType")}
                        />
                        <span className="inline-block rounded-full border border-border bg-background/30 px-4 py-2 text-muted-foreground transition-all hover:bg-foreground/5 peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Project details *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us what you are building, timeline, and goals..."
                    className={`w-full rounded-2xl border bg-background/50 px-4 py-3.5 text-sm text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none ${
                      errors.message ? "border-destructive focus:ring-destructive" : "border-border"
                    }`}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-xs font-medium text-destructive">{errors.message.message}</p>
                  )}
                </div>

                {submitStatus === "error" && (
                  <p className="text-xs font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-6 py-4 text-sm font-bold text-background transition-all duration-300 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === "submitting" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <span aria-hidden>↗</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
