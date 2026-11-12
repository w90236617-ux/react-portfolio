import { useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import SplitText from "./SplitText";
import ProjectCard from "./ProjectCard";
import useMagnetic from "../hooks/useMagnetic";
import { getCardOrigin } from "../hooks/cardOrigin";
import { projects, categories } from "../data/Projects";
import "../styles/projects.css";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [active, setActive] = useState(categories[0].id);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const filtered = projects.filter((p) => p.category === active);

  // filter buttons par magnetic effect
  useMagnetic(headerRef, 0.25);

  /* ---------- 1. Header entrance (sirf ek bar) ---------- */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(headerRef.current);

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(q(".projects-title [data-split]"), {
          yPercent: 110,
          rotationX: -80,
          transformOrigin: "50% 100%",
          transformPerspective: 800,
          opacity: 0,
          duration: 1,
          stagger: 0.05,
        })
        .from(q(".projects-subtitle"), { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(
          q(".filter-btn"),
          { y: 20, opacity: 0, scale: 0.9, duration: 0.6, stagger: 0.1 },
          "-=0.5"
        );
    });

    return () => mm.revert();
  }, []);

  /* ---------- 2. Cards entrance (har filter badalne par) ---------- */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray(".project-item", gridRef.current);

      // pehle sab ki position naap lo, phir animation lagao
      const origins = items.map((item) => getCardOrigin(item));

      const fromVars = {
        left: { x: -120, rotationY: 25, opacity: 0 },
        right: { x: 120, rotationY: -25, opacity: 0 },
        center: { y: 80, scale: 0.88, rotationX: -15, opacity: 0 },
      };

      items.forEach((item, i) => {
        gsap.from(item, {
          ...fromVars[origins[i]],
          transformPerspective: 1000,
          duration: 1.1,
          delay: (i % 3) * 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: item, start: "top 90%", once: true },
        });
      });
    });

    // cards kam/zyada hone se page ki height badalti hai
    ScrollTrigger.refresh();
    AOS.refresh();

    return () => mm.revert();
  }, [active]);

  return (
    <section className="projects">
      <div className="projects-header" ref={headerRef}>
        <h1 className="projects-title">
          <SplitText text="My" type="chars" />{" "}
          <span className="accent">
            <SplitText text="Projects" type="chars" />
          </span>
        </h1>

        <p className="projects-subtitle">
          Things I have built while learning and growing as a developer.
        </p>

        <div className="filter-bar">
          {categories.map((cat) => {
            const count = projects.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                className={`filter-btn ${active === cat.id ? "active" : ""}`}
                aria-pressed={active === cat.id}
                onClick={() => setActive(cat.id)}
                data-magnetic
              >
                {cat.label}
                <span className="filter-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* key={active}: category badalte hi cards dobara mount hote hain,
          is se entrance animation har bar chalti hai */}
      <div className="projects-grid" key={active} ref={gridRef}>
        {filtered.map((project, index) => (
          <ProjectCard key={project.id} {...project} index={index} />
        ))}
      </div>

      {/* AOS: simple scroll reveal */}
      <div className="projects-cta" data-aos="fade-up">
        <p>Want to build something together?</p>
        <Link to="/contact" className="btn btn-primary">
          Let's Talk
        </Link>
      </div>
    </section>
  );
};

export default Projects;