import { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import SplitText from "./SplitText";
import TiltCard from "./TiltCard";
import useMagnetic from "../hooks/useMagnetic";
import "../styles/cv.css";

gsap.registerPlugin(ScrollTrigger);

/* public folder me jo naam hai wahi likho */
const CV_PDF = "/wahab-CV.pdf"; // pehle /cv.pdf tha, wo file exist nahi karti
const CV_IMAGE = "/cv.png";

const highlights = [
  { label: "Role", value: "Frontend / Web Developer" },
  { label: "Location", value: "Hyderabad, Pakistan" },
  { label: "Focus", value: "HTML, CSS, JavaScript, Firebase" },
  { label: "Learning", value: "React, Node.js, MongoDB" },
  { label: "Education", value: "Intermediate (Currently Studying)" },
  { label: "Goal", value: "Web development internship" },
];

const CV = () => {
  const rootRef = useRef(null);

  useMagnetic(rootRef, 0.3);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 900px)",
      },
      (context) => {
        const { motion, wide } = context.conditions;
        if (!motion) return;

        const q = gsap.utils.selector(rootRef.current);

        /* Header */
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(q(".cv-title [data-split]"), {
            yPercent: 110,
            rotationX: -80,
            transformOrigin: "50% 100%",
            transformPerspective: 800,
            opacity: 0,
            duration: 1,
            stagger: 0.05,
          })
          .from(q(".cv-subtitle"), { y: 20, opacity: 0, duration: 0.8 }, "-=0.5");

        /* Preview: paper jaisa 3D reveal */
        gsap.fromTo(
          q(".cv-preview"),
          {
            clipPath: "inset(100% 0% 0% 0%)",
            y: 80,
            rotationX: 20,
            opacity: 0,
            transformPerspective: 1200,
            transformOrigin: "50% 100%",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            rotationX: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power4.out",
            clearProps: "clipPath,transform,opacity",
            scrollTrigger: { trigger: q(".cv-layout")[0], start: "top 85%", once: true },
          }
        );

        /* Right panel: right se stagger */
        gsap.from(q(".cv-panel-item"), {
          x: wide ? 90 : 0,
          y: wide ? 0 : 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: q(".cv-layout")[0], start: "top 80%", once: true },
        });
      }
    );

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => AOS.refreshHard(), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="cv" ref={rootRef}>
      <div className="cv-header">
        <h1 className="cv-title">
          <SplitText text="My" type="chars" />{" "}
          <span className="accent">
            <SplitText text="CV" type="chars" />
          </span>
        </h1>
        <p className="cv-subtitle">
          Preview my resume below or download the PDF to read it offline.
        </p>
      </div>

      <div className="cv-layout">
        {/* Left: preview */}
        <div className="cv-preview">
          <TiltCard className="cv-card" max={5} scale={1.02}>
            <a
              href={CV_PDF}
              target="_blank"
              rel="noreferrer"
              className="cv-preview-link"
              aria-label="Open CV as PDF"
            >
              <img
                src={CV_IMAGE}
                alt="Abdul Wahab CV"
                onLoad={() => ScrollTrigger.refresh()}
              />
              <span className="cv-preview-hint" data-tilt-z="40">
                Open PDF ↗
              </span>
            </a>
          </TiltCard>
        </div>

        {/* Right: panel */}
        <aside className="cv-panel">
          <div className="cv-panel-item">
            <h2 className="cv-panel-title">Abdul Wahab</h2>
            <p className="cv-panel-role">Frontend / Web Developer</p>
          </div>

          <div className="cv-panel-item cv-buttons">
            <div className="btn-wrap">
              <a
                href={CV_PDF}
                download="Abdul_Wahab_CV.pdf"
                className="btn btn-primary"
                data-magnetic
              >
                Download CV
              </a>
            </div>
            <div className="btn-wrap">
              <a
                href={CV_PDF}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
                data-magnetic
              >
                Open in New Tab
              </a>
            </div>
          </div>

          {/* Highlights: AOS */}
          <div className="cv-highlights">
            {highlights.map((item, i) => (
              <div
                className="cv-highlight"
                key={item.label}
                data-aos="fade-up"
                data-aos-delay={(i % 2) * 120}
              >
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CV;