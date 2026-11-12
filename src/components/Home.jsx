import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import useMagnetic from "../hooks/useMagnetic";
import "../styles/home.css";
import About from "./About";


gsap.registerPlugin(ScrollTrigger);

const badges = ["HTML", "CSS", "JavaScript", "React", "Firebase"];

const Home = () => {
  const rootRef = useRef(null);

  useMagnetic(rootRef);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 992px) and (hover: hover) and (pointer: fine)",
      },
      (context) => {
        const { motion, desktop } = context.conditions;
        if (!motion) return;

        /* ---------- 1. Entrance timeline ---------- */
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(q(".home-hello"), { y: 20, opacity: 0, duration: 0.7 })
          .from(
            q(".home-name [data-split]"),
            {
              yPercent: 110,
              rotationX: -80,
              transformOrigin: "50% 100%",
              transformPerspective: 800,
              opacity: 0,
              duration: 1,
              stagger: 0.04,
            },
            "-=0.4"
          )
          .from(q(".home-role"), { y: 24, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(
            q(".home-desc [data-split]"),
            { yPercent: 100, opacity: 0, duration: 0.7, stagger: 0.015 },
            "-=0.5"
          )
          .from(
            q(".btn-wrap"),
            { y: 30, opacity: 0, scale: 0.9, duration: 0.7, stagger: 0.1 },
            "-=0.4"
          )
          .fromTo(
            q(".home-image"),
            {
              clipPath: "circle(0% at 50% 50%)",
              scale: 0.8,
              rotationY: -35,
              transformPerspective: 1000,
              opacity: 0,
            },
            {
              clipPath: "circle(75% at 50% 50%)",
              scale: 1,
              rotationY: 0,
              opacity: 1,
              duration: 1.4,
              clearProps: "clipPath",
            },
            0.2
          )
          .from(
            q(".home-glow"),
            { scale: 0.5, opacity: 0, duration: 1.6, ease: "power2.out" },
            0.2
          )
          .from(
            q(".floating-badge"),
            { scale: 0.6, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
            "-=0.8"
          );

        /* ---------- 2. Badges halka floating (loop) ---------- */
        q(".floating-badge").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? -14 : 14,
            duration: 2.2 + i * 0.35,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.2,
          });
        });

        /* ---------- 3. Scroll parallax ---------- */
        const scrollConfig = {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };

        gsap.to(q(".home-text"), {
          yPercent: -10,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: scrollConfig,
        });

        gsap.to(q(".home-image img"), {
          yPercent: 10,
          scale: 1.12,
          ease: "none",
          scrollTrigger: scrollConfig,
        });

        /* ---------- 4. Mouse layered parallax (sirf desktop) ---------- */
        let removeMouse;

        if (desktop) {
          const layers = q("[data-depth]").map((el) => ({
            depth: parseFloat(el.dataset.depth),
            xTo: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
            yTo: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
          }));

          const onMove = (e) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            layers.forEach(({ depth, xTo, yTo }) => {
              xTo(nx * depth * 60);
              yTo(ny * depth * 60);
            });
          };

          const onLeave = () =>
            layers.forEach(({ xTo, yTo }) => {
              xTo(0);
              yTo(0);
            });

          root.addEventListener("mousemove", onMove);
          root.addEventListener("mouseleave", onLeave);

          removeMouse = () => {
            root.removeEventListener("mousemove", onMove);
            root.removeEventListener("mouseleave", onLeave);
          };
        }

        return () => removeMouse?.();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="home" ref={rootRef}>
      <div className="home-text">
        <p className="home-hello">Hello, I'm</p>

        <h1 className="home-name">
          <SplitText text="Abdul" type="chars" />{" "}
          <span className="accent">
            <SplitText text="Wahab" type="chars" />
          </span>
        </h1>

        <h2 className="home-role">Frontend / Web Developer</h2>

        <p className="home-desc">
          <SplitText
            type="words"
            text="Frontend-focused web developer from Hyderabad, Pakistan. I build responsive and interactive web applications using HTML, CSS, JavaScript and Firebase. Currently learning React, Node.js and MongoDB to become a MERN stack developer."
          />
        </p>

        <div className="home-buttons">
          <div className="btn-wrap">
            <Link to="/projects" className="btn btn-primary" data-magnetic>
              View Projects
            </Link>
          </div>
          <div className="btn-wrap">
            <Link to="/contact" className="btn btn-outline" data-magnetic>
              Contact Me
            </Link>
          </div>
          <div className="btn-wrap">
            <a
              href="/wahab-CV.pdf"
              download="Abdul_Wahab_CV.pdf"
              className="btn btn-outline"
              data-magnetic
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
      

      <div className="home-visual">
        <div className="home-glow" data-depth="0.15" aria-hidden="true" />

        <div className="home-image" data-depth="0.35">
          {/* apni photo ka sahi naam likho (public folder me) */}
          <img src="/profile.webp" alt="Abdul Wahab" />
        </div>

        {badges.map((badge, i) => (
          <div
            key={badge}
            className={`badge-layer badge-${i + 1}`}
            data-depth={0.6 + (i % 3) * 0.25}
          >
            <span className="floating-badge">{badge}</span>
          </div>
        ))}
      </div>
    </section>
    
  );
  
};

export default Home;