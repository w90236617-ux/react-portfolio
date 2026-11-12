import { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import SplitText from "./SplitText";
import TiltCard from "./TiltCard";
import { getCardOrigin } from "../hooks/cardOrigin";
import "../styles/about.css";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Web Design", "DOM"],
  },
  {
    category: "Backend / Database",
    items: ["Firebase Authentication", "Firebase Realtime Database"],
  },
  {
    category: "Currently Learning",
    items: ["React.js", "Node.js", "Next.js", "MongoDB", "MERN Stack"],
  },
];

const About = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const q = gsap.utils.selector(rootRef.current);
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 768px)",
      },
      (context) => {
        const { motion, wide } = context.conditions;
        if (!motion) return;

        /* ---------- 1. Title (scroll, once) ---------- */
        gsap.from(q(".about-title [data-split]"), {
          yPercent: 110,
          rotationX: -70,
          transformOrigin: "50% 100%",
          transformPerspective: 800,
          opacity: 0,
          duration: 0.9,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: { trigger: q(".about-title")[0], start: "top 88%", once: true },
        });

        /* ---------- 2. Intro: photo left se, text right se ---------- */
        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: q(".about-intro")[0], start: "top 80%", once: true },
        });

        intro
          .fromTo(
            q(".about-image"),
            {
              clipPath: "inset(0% 100% 0% 0%)",
              x: wide ? -80 : 0,
              y: wide ? 0 : 40,
              opacity: 0,
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              x: 0,
              y: 0,
              opacity: 1,
              duration: 1.3,
              ease: "power4.out",
              clearProps: "clipPath,transform,opacity",
            }
          )
          .from(
            q(".about-text h2, .about-text p"),
            {
              x: wide ? 70 : 0,
              y: wide ? 0 : 30,
              opacity: 0,
              duration: 0.9,
              stagger: 0.12,
            },
            "-=0.9"
          )
          .from(
            q(".about-info li"),
            { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 },
            "-=0.5"
          );

        // photo ke andar parallax (scroll ke saath)
        gsap.fromTo(
          q(".about-image img"),
          { yPercent: -7, scale: 1.15 },
          {
            yPercent: 7,
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: q(".about-image")[0],
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        /* ---------- 3. Skill cards: position ke hisaab se direction ---------- */
        q(".skill-item").forEach((card) => {
          const origin = getCardOrigin(card);

          const fromVars = {
            left: { x: -120, rotationY: 28, opacity: 0 },
            right: { x: 120, rotationY: -28, opacity: 0 },
            center: { y: 80, scale: 0.88, rotationX: -18, opacity: 0 },
          }[origin];

          gsap
            .timeline({
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            })
            .from(card, {
              ...fromVars,
              transformPerspective: 1000,
              duration: 1.1,
              ease: "power3.out",
              clearProps: "transform,opacity",
            })
            .from(
              card.querySelectorAll(".skill-tag"),
              {
                y: 14,
                opacity: 0,
                scale: 0.85,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
              },
              "-=0.6"
            );
        });

        return undefined;
      }
    );

    return () => mm.revert();
  }, []);

  // AOS wale elements route change ke baad dobara detect hon
  useEffect(() => {
    const t = setTimeout(() => AOS.refreshHard(), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="about" ref={rootRef}>
      <h1 className="about-title">
        <SplitText text="About" type="chars" />{" "}
        <span className="accent">
          <SplitText text="Me" type="chars" />
        </span>
      </h1>

      {/* Intro */}
      <div className="about-intro">
        <div className="about-image">
          <TiltCard className="about-image-card" max={8} scale={1.02}>
            <img
              src="/profile.webp"
              alt="Abdul Wahab"
              onLoad={() => ScrollTrigger.refresh()}
            />
          </TiltCard>
        </div>

        <div className="about-text">
          <h2>Frontend / Web Developer</h2>
          <p>
            Frontend-focused web developer with hands-on experience creating
            responsive and interactive web applications using HTML, CSS,
            JavaScript and Firebase. I started learning web development in 2025
            and enjoy building practical projects with clean interfaces and
            useful functionality.
          </p>
          <p>
            I am currently expanding my skills in React, Node.js, Next.js and
            MongoDB with a long-term goal of becoming a MERN stack developer.
          </p>

          <ul className="about-info">
            <li><strong>Location:</strong> Hyderabad, Pakistan</li>
            <li><strong>Email:</strong> wahababbasi752@gmail.com</li>
            <li><strong>Phone:</strong> 03003064631</li>
            <li><strong>Languages:</strong> English, Urdu</li>
          </ul>
        </div>
      </div>

      {/* Skills */}
      <div className="about-skills">
        <h2 data-aos="fade-up">Technical Skills</h2>

        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-item" key={skill.category}>
              <TiltCard className="skill-card" max={9} scale={1.03}>
                <h3 data-tilt-z="40">{skill.category}</h3>
                <div className="skill-tags" data-tilt-z="25">
                  {skill.items.map((item) => (
                    <span className="skill-tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      {/* Education + Goal (AOS) */}
      <div className="about-extra">
        <div className="about-box" data-aos="fade-right">
          <h2>Education</h2>
          <h3>Intermediate</h3>
          <p>Currently Studying</p>
          <p>Expected completion of full stack development: Mid of 2027</p>
        </div>

        <div className="about-box" data-aos="fade-left" data-aos-delay="150">
          <h2>Career Goal</h2>
          <p>
            Seeking a web development internship where I can contribute to real
            projects, strengthen my frontend skills, and grow toward a
            professional MERN stack development career.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;