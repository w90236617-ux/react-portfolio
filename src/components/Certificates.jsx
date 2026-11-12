import { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import SplitText from "./SplitText";
import TiltCard from "./TiltCard";
import { getCardOrigin } from "../hooks/cardOrigin";
import "../styles/certificates.css";

gsap.registerPlugin(ScrollTrigger);

/* Files ke naam yahan likho (public folder wale).
   Spelling theek karni ho to pehle file rename karo, phir yahan badlo. */
const CERT_IMAGE = "/certifacte.png";
const CERT_PDF = "/certificate.pdf";

/* Naya certificate add karna ho to ek object aur daal do */
const certificates = [
  {
    id: 1,
    title: "Coding Night (Hackathon)",
    type: "Certificate of Participation",
    issuer: "Saylani IT Training Programme",
    date: "2026",
    duration: "12 Hours",
    credentialId: "SMIT/2026/HACKATHON/502944",
    desc: "Successfully participated in a 12-hour coding hackathon organized under the Education Department of Saylani Welfare International Trust.",
    image: CERT_IMAGE,
    pdf: CERT_PDF,
  },
];

/* ---------- Lightbox (certificate bada dekhne ke liye) ---------- */
const Lightbox = ({ cert, onClose }) => {
  const overlayRef = useRef(null);
  const boxRef = useRef(null);
  const closingRef = useRef(false);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }

    gsap
      .timeline({ onComplete: onClose })
      .to(boxRef.current, { scale: 0.92, y: 30, opacity: 0, duration: 0.3, ease: "power2.in" })
      .to(overlayRef.current, { opacity: 0, duration: 0.25 }, "<0.05");
  }, [onClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    boxRef.current?.querySelector(".lightbox-close")?.focus();

    let ctx;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ctx = gsap.context(() => {
        gsap.from(overlayRef.current, { opacity: 0, duration: 0.3 });
        gsap.from(boxRef.current, {
          scale: 0.8,
          y: 50,
          rotationX: -15,
          opacity: 0,
          transformPerspective: 1000,
          duration: 0.7,
          ease: "power3.out",
        });
      });
    }

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      ctx?.revert();
    };
  }, [close]);

  return createPortal(
    <div
      className="lightbox"
      ref={overlayRef}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="lightbox-box" ref={boxRef} role="dialog" aria-modal="true" aria-label={cert.title}>
        <button type="button" className="lightbox-close" onClick={close} aria-label="Close">
          ✕
        </button>
        <img src={cert.image} alt={cert.title} />
        <div className="lightbox-actions">
          <a href={cert.pdf} download className="btn btn-primary">
            Download PDF
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ---------- Page ---------- */
const Certificates = () => {
  const rootRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const closeLightbox = useCallback(() => setSelected(null), []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(rootRef.current);

      /* Header */
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(q(".certs-title [data-split]"), {
          yPercent: 110,
          rotationX: -80,
          transformOrigin: "50% 100%",
          transformPerspective: 800,
          opacity: 0,
          duration: 1,
          stagger: 0.05,
        })
        .from(q(".certs-subtitle"), { y: 20, opacity: 0, duration: 0.8 }, "-=0.5");

      /* Cards: position ke hisaab se direction */
      const items = q(".cert-item");
      const origins = items.map((item) => getCardOrigin(item));

      const fromVars = {
        left: { x: -120, rotationY: 25, opacity: 0 },
        right: { x: 120, rotationY: -25, opacity: 0 },
        center: { y: 80, scale: 0.88, rotationX: -15, opacity: 0 },
      };

      items.forEach((item, i) => {
        gsap
          .timeline({ scrollTrigger: { trigger: item, start: "top 88%", once: true } })
          .from(item, {
            ...fromVars[origins[i]],
            transformPerspective: 1000,
            duration: 1.1,
            ease: "power3.out",
            clearProps: "transform,opacity",
          })
          .fromTo(
            item.querySelector(".cert-image-clip"),
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power4.inOut", clearProps: "clipPath" },
            "-=0.7"
          )
          .from(
            item.querySelector(".cert-image-clip img"),
            { scale: 1.3, duration: 1.4, ease: "power3.out", clearProps: "transform" },
            "<"
          )
          .from(
            item.querySelectorAll(".cert-meta > *"),
            {
              y: 18,
              opacity: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              clearProps: "transform,opacity",
            },
            "-=0.8"
          );
      });
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => AOS.refreshHard(), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="certs" ref={rootRef}>
      <div className="certs-header">
        <h1 className="certs-title">
          <SplitText text="My" type="chars" />{" "}
          <span className="accent">
            <SplitText text="Certificates" type="chars" />
          </span>
        </h1>
        <p className="certs-subtitle">
          Courses, hackathons and programs that helped me grow as a developer.
        </p>
      </div>

      <div className="certs-grid">
        {certificates.map((cert) => (
          <div className="cert-item" key={cert.id}>
            <TiltCard className="cert-card" max={8} scale={1.03}>
              <button
                type="button"
                className="cert-image"
                data-tilt-z="30"
                onClick={() => setSelected(cert)}
                aria-label={`View ${cert.title} certificate`}
              >
                <span className="cert-image-clip">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </span>
                <span className="cert-image-hint">Click to enlarge</span>
              </button>

              <div className="cert-meta">
                <span className="cert-badge">{cert.type}</span>

                <h3 className="cert-title" data-tilt-z="40">
                  {cert.title}
                </h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-desc">{cert.desc}</p>

                <ul className="cert-details">
                  <li>
                    <small>Year</small>
                    <strong>{cert.date}</strong>
                  </li>
                  <li>
                    <small>Duration</small>
                    <strong>{cert.duration}</strong>
                  </li>
                </ul>

                <p className="cert-id">ID: {cert.credentialId}</p>

                <div className="cert-actions" data-tilt-z="25">
                  <button type="button" className="btn btn-primary" onClick={() => setSelected(cert)}>
                    View
                  </button>
                  <a href={cert.pdf} download className="btn btn-outline">
                    Download PDF
                  </a>
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>

      {/* AOS */}
      <p className="certs-note" data-aos="fade-up">
        More certificates coming soon as I keep learning.
      </p>

      {selected && <Lightbox cert={selected} onClose={closeLightbox} />}
    </section>
  );
};

export default Certificates;