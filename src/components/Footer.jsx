import { useRef, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import SplitText from "./SplitText";
import useMagnetic from "../hooks/useMagnetic";
import "../styles/footer.css";

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/certificates", label: "Certificates" },
  { to: "/cv", label: "CV" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  { name: "GitHub", href: "https://github.com/w90236617-ux" },
  { name: "LinkedIn", href: "https://linkedin.com/in/your-username" }, // apna link lagao
  { name: "WhatsApp", href: "https://wa.me/923003064631" },
];

const Footer = () => {
  const { pathname } = useLocation();
  const rootRef = useRef(null);

  // buttons aur social links par magnetic
  useMagnetic(rootRef, 0.3);

  /* Footer har route par wahi rehta hai, lekin page ki height badalti hai.
     Is liye animation har route par dobara banate hain aur positions refresh karte hain. */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(rootRef.current);

      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
        })
        .from(q(".footer-eyebrow"), { y: 20, opacity: 0, duration: 0.7 })
        .from(
          q(".footer-cta-title [data-split]"),
          {
            yPercent: 110,
            rotationX: -70,
            transformOrigin: "50% 100%",
            transformPerspective: 800,
            opacity: 0,
            duration: 0.9,
            stagger: 0.06,
          },
          "-=0.4"
        )
        .from(q(".footer-cta-text"), { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(
          q(".footer-action"),
          { y: 24, opacity: 0, scale: 0.9, duration: 0.7, stagger: 0.1, clearProps: "transform,opacity" },
          "-=0.4"
        )
        .from(
          q(".footer-col"),
          { y: 40, opacity: 0, duration: 0.8, stagger: 0.12, clearProps: "transform,opacity" },
          "-=0.4"
        );

      // bara background text: scroll ke saath neeche se upar aata hai
      gsap.fromTo(
        q(".footer-bg-text"),
        { yPercent: 45, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });

    // page ka content/images load hone ke baad positions dobara naapo
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      AOS.refresh();
    }, 400);

    return () => {
      clearTimeout(t);
      mm.revert();
    };
  }, [pathname]);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="site-footer" ref={rootRef}>
      <div className="footer-bg-text" aria-hidden="true">
        WAHAB
      </div>

      <div className="footer-inner">
        {/* ---------- CTA ---------- */}
        <div className="footer-cta">
          <p className="footer-eyebrow">Have a project in mind?</p>

          <h2 className="footer-cta-title">
            <SplitText text="Let's build something" type="words" />{" "}
            <span className="accent">
              <SplitText text="great together" type="words" />
            </span>
          </h2>

          <p className="footer-cta-text">
            I am open to internships and freelance work. Send me a message and
            let's talk about your idea.
          </p>

          <div className="footer-cta-actions">
            <div className="footer-action">
              <Link to="/contact" className="footer-btn footer-btn-primary" data-magnetic>
                Start a Conversation
              </Link>
            </div>
            <div className="footer-action">
              <a
                href="mailto:wahababbasi752@gmail.com"
                className="footer-btn footer-btn-outline"
                data-magnetic
              >
                Email Me
              </a>
            </div>
          </div>
        </div>

        {/* ---------- Columns ---------- */}
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-brand">Abdul Wahab</h3>
            <p className="footer-about">
              Frontend / Web Developer from Hyderabad, Pakistan. Learning React,
              Node.js and MongoDB on the way to becoming a MERN stack developer.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li><a href="mailto:wahababbasi752@gmail.com">wahababbasi752@gmail.com</a></li>
              <li><a href="tel:+923003064631">0300 3064631</a></li>
              <li><span>Hyderabad, Pakistan</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Follow</h4>
            <ul className="footer-socials">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social-link"
                    data-magnetic
                  >
                    {s.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Bottom bar (AOS) ---------- */}
        <div className="footer-bottom" data-aos="fade-up">
          <p>© {new Date().getFullYear()} Abdul Wahab. All rights reserved.</p>
          <p className="footer-built">Built with React, GSAP and AOS</p>

          <button
            type="button"
            className="to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            data-magnetic
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;