import { useEffect } from "react";
import gsap from "gsap";

const useMagnetic = (containerRef, strength = 0.35) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduce) return;

    const items = container.querySelectorAll("[data-magnetic]");
    const cleanups = [];

    items.forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        gsap.killTweensOf(el);
        gsap.set(el, { x: 0, y: 0 });
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [containerRef, strength]);
};

export default useMagnetic;