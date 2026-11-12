  import { useState, useRef, useLayoutEffect, useEffect } from "react";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import AOS from "aos";
  import SplitText from "./SplitText";
  import TiltCard from "./TiltCard";
  import useMagnetic from "../hooks/useMagnetic";
  import "../styles/contact.css";

  gsap.registerPlugin(ScrollTrigger);

  /* Formspree ka endpoint yahan paste karo */
  const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
  const MY_EMAIL = "wahababbasi752@gmail.com";

  /* ---------- Chhote SVG icons (koi library install nahi karni) ---------- */
  const Icon = ({ children }) => (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );

  const MailIcon = () => (
    <Icon>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </Icon>
  );

  const PhoneIcon = () => (
    <Icon>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Icon>
  );

  const PinIcon = () => (
    <Icon>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  );

  const GithubIcon = () => (
    <Icon>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </Icon>
  );

  const LinkedinIcon = () => (
    <Icon>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Icon>
  );

  const ChatIcon = () => (
    <Icon>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </Icon>
  );

  /* ---------- Data ---------- */
  const infoCards = [
    {
      label: "Email",
      value: MY_EMAIL,
      href: `mailto:${MY_EMAIL}`,
      icon: <MailIcon />,
    },
    {
      label: "Phone",
      value: "0300 3064631",
      href: "tel:+923003064631",
      icon: <PhoneIcon />,
    },
    {
      label: "Location",
      value: "Hyderabad, Pakistan",
      href: null,
      icon: <PinIcon />,
    },
  ];

  const socials = [
    {
      name: "GitHub",
      // apna asli GitHub username check kar lena
      href: "https://github.com/w90236617-ux",
      icon: <GithubIcon />,
    },
    {
      name: "LinkedIn",
      // apna LinkedIn link yahan lagao
      href: "https://linkedin.com/in/your-username",
      icon: <LinkedinIcon />,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/923003064631",
      icon: <ChatIcon />,
    },
  ];

  const Contact = () => {
    const rootRef = useRef(null);
    const statusRef = useRef(null);
    const [status, setStatus] = useState("idle"); // idle | sending | success | error

    // submit button aur social icons par magnetic effect
    useMagnetic(rootRef, 0.3);

    /* ---------- 1. Page animations ---------- */
    useLayoutEffect(() => {
      const q = gsap.utils.selector(rootRef.current);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          wide: "(min-width: 900px)",
        },
        (context) => {
          const { motion, wide } = context.conditions;
          if (!motion) return;

          /* Header entrance */
          gsap
            .timeline({ defaults: { ease: "power4.out" } })
            .from(q(".contact-title [data-split]"), {
              yPercent: 110,
              rotationX: -80,
              transformOrigin: "50% 100%",
              transformPerspective: 800,
              opacity: 0,
              duration: 1,
              stagger: 0.05,
            })
            .from(q(".contact-subtitle"), { y: 20, opacity: 0, duration: 0.8 }, "-=0.5");

          /* Background orb: floating + scroll parallax */
          gsap.to(q(".contact-orb"), {
            y: 24,
            x: -16,
            duration: 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          gsap.to(q(".contact-orb-wrap"), {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          /* Info cards: left se, 3D */
          gsap.from(q(".info-item"), {
            x: wide ? -110 : 0,
            y: wide ? 0 : 50,
            rotationY: wide ? 25 : 0,
            opacity: 0,
            transformPerspective: 1000,
            duration: 1,
            stagger: 0.14,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: q(".contact-info")[0], start: "top 85%", once: true },
          });

          /* Form: right se, phir fields ek ek karke */
          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: { trigger: q(".contact-form-card")[0], start: "top 85%", once: true },
            })
            .from(q(".contact-form-card"), {
              x: wide ? 110 : 0,
              y: wide ? 0 : 50,
              rotationY: wide ? -22 : 0,
              opacity: 0,
              transformPerspective: 1000,
              duration: 1.1,
              clearProps: "transform,opacity",
            })
            .from(
              q(".form-field"),
              { y: 24, opacity: 0, duration: 0.6, stagger: 0.1, clearProps: "transform,opacity" },
              "-=0.6"
            )
            .from(
              q(".form-submit-wrap"),
              { y: 24, opacity: 0, scale: 0.9, duration: 0.6, clearProps: "transform,opacity" },
              "-=0.3"
            );

          /* Social icons: pop-in stagger */
          gsap.from(q(".social-item"), {
            scale: 0.4,
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1.6)",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: q(".contact-socials")[0], start: "top 92%", once: true },
          });
        }
      );

      return () => mm.revert();
    }, []);

    /* ---------- 2. Status message pop-in ---------- */
    useEffect(() => {
      if (status !== "success" && status !== "error") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const ctx = gsap.context(() => {
        gsap.from(statusRef.current, {
          y: 14,
          scale: 0.94,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.5)",
        });
      });
      return () => ctx.revert();
    }, [status]);

    /* ---------- 3. AOS refresh (route badalne ke baad) ---------- */
    useEffect(() => {
      const t = setTimeout(() => AOS.refreshHard(), 150);
      return () => clearTimeout(t);
    }, []);

    /* ---------- 4. Form submit ---------- */
    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form));

      // honeypot: bots ye field bhar dete hain
      if (data._gotcha) return;

      // Formspree set nahi hai to mailto se kholo (testing ke liye)
      if (FORM_ENDPOINT.includes("YOUR_FORM_ID")) {
        const subject = encodeURIComponent(data.subject || "Portfolio message");
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
        );
        window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
        return;
      }

      try {
        setStatus("sending");

        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Request failed");

        setStatus("success");
        form.reset();
      } catch {
        setStatus("error");
      }
    };

    return (
      <section className="contact" ref={rootRef}>
        <div className="contact-orb-wrap" aria-hidden="true">
          <div className="contact-orb" />
        </div>

        <div className="contact-header">
          <h1 className="contact-title">
            <SplitText text="Get in" type="chars" />{" "}
            <span className="accent">
              <SplitText text="Touch" type="chars" />
            </span>
          </h1>
          <p className="contact-subtitle">
            Have a project, an internship opportunity or just want to say hi?
            Send me a message and I will get back to you soon.
          </p>
        </div>

        <div className="contact-layout">
          {/* ---------- Left: info ---------- */}
          <div className="contact-info">
            {infoCards.map((card) => (
              <div className="info-item" key={card.label}>
                <TiltCard className="info-card" max={8} scale={1.03}>
                  {card.href ? (
                    <a href={card.href} className="info-link">
                      <span className="info-icon" data-tilt-z="45">{card.icon}</span>
                      <span className="info-text" data-tilt-z="30">
                        <small>{card.label}</small>
                        <strong>{card.value}</strong>
                      </span>
                    </a>
                  ) : (
                    <div className="info-link">
                      <span className="info-icon" data-tilt-z="45">{card.icon}</span>
                      <span className="info-text" data-tilt-z="30">
                        <small>{card.label}</small>
                        <strong>{card.value}</strong>
                      </span>
                    </div>
                  )}
                </TiltCard>
              </div>
            ))}

            <div className="contact-socials">
              {socials.map((s) => (
                <div className="social-item" key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-link"
                    aria-label={s.name}
                    data-magnetic
                  >
                    {s.icon}
                  </a>
                </div>
              ))}
            </div>

            {/* AOS */}
            <div className="availability" data-aos="fade-up" data-aos-delay="200">
              <span className="availability-dot" aria-hidden="true" />
              Available for internships and freelance work
            </div>
          </div>

          {/* ---------- Right: form ---------- */}
          <div className="contact-form-card">
            <form onSubmit={handleSubmit} className="contact-form" noValidate={false}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Your name" required />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" placeholder="What is this about?" required />
              </div>

              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="6" placeholder="Write your message here..." required />
              </div>

              {/* honeypot (users ko nazar nahi aata) */}
              <input type="text" name="_gotcha" className="hp-field" tabIndex="-1" autoComplete="off" />

              <div className="form-submit-wrap">
                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={status === "sending"}
                  data-magnetic
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </div>

              <div aria-live="polite">
                {status === "success" && (
                  <p className="form-status success" ref={statusRef}>
                    Thank you! Your message has been sent.
                  </p>
                )}
                {status === "error" && (
                  <p className="form-status error" ref={statusRef}>
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  };

  export default Contact;