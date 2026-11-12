import { useRef, useEffect } from "react";
import gsap from "gsap";

const TiltCard = ({ children, className = "", max = 10, scale = 1.03 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduce) return;

    const glare = el.querySelector(".tilt-glare");
    const layers = el.querySelectorAll("[data-tilt-z]");

    gsap.set(el, { transformPerspective: 900, transformStyle: "preserve-3d" });

    const rotX = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
    const rotY = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
    const scl = gsap.quickTo(el, "scale", { duration: 0.5, ease: "power3.out" });

    const onEnter = () => {
      scl(scale);
      if (glare) gsap.to(glare, { opacity: 1, duration: 0.4 });
      layers.forEach((l) =>
        gsap.to(l, { z: Number(l.dataset.tiltZ), duration: 0.5, ease: "power3.out" })
      );
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;

      rotY(px * max * 2);
      rotX(-py * max * 2);

      el.style.setProperty("--glare-x", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--glare-y", `${(py + 0.5) * 100}%`);
    };

    const onLeave = () => {
      rotX(0);
      rotY(0);
      scl(1);
      if (glare) gsap.to(glare, { opacity: 0, duration: 0.4 });
      layers.forEach((l) => gsap.to(l, { z: 0, duration: 0.5, ease: "power3.out" }));
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf([el, glare, ...layers]);
      gsap.set(el, { clearProps: "transform" });
    };
  }, [max, scale]);

  return (
    <div ref={ref} className={`tilt-card ${className}`}>
      <span className="tilt-glare" aria-hidden="true" />
      {children}
    </div>
  );
};

export default TiltCard;