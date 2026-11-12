import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { NavLink, Link, useLocation } from "react-router";
import gsap from "gsap";
import useMagnetic from "../hooks/useMagnetic";
import "../styles/header.css";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/certificates", label: "Certificates" },
  { to: "/cv", label: "CV" },
  { to: "/contact", label: "Contact" },
];

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Header = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const headerRef = useRef(null);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const progressRef = useRef(null);
  const menuRef = useRef(null);
  const mountedRef = useRef(false);

  // logo aur "Hire Me" par magnetic
  useMagnetic(headerRef, 0.3);

  /* ---------- 1. Entrance + scroll behaviour ---------- */
  useLayoutEffect(() => {
    const header = headerRef.current;
    const reduce = prefersReduced();

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from(".header-brand, .nav-item, .header-actions", {
          y: -24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.07,
          delay: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }
    }, header);

    const setProgress = gsap.quickSetter(progressRef.current, "scaleX");
    let lastY = window.scrollY;
    let hidden = false;

    const showHeader = () => {
      if (!hidden) return;
      hidden = false;
      gsap.to(header, { yPercent: 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
    };

    const hideHeader = () => {
      if (hidden) return;
      hidden = true;
      gsap.to(header, { yPercent: -100, duration: 0.45, ease: "power3.inOut", overwrite: "auto" });
    };

    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      setProgress(max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0);
      header.classList.toggle("is-scrolled", y > 20);

      if (reduce) return;

      const delta = y - lastY;
      if (Math.abs(delta) > 6) {
        if (delta > 0 && y > 200) hideHeader();
        else if (delta < 0) showHeader();
        lastY = y;
      }
      if (y <= 200) showHeader();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // keyboard se Tab karne par header wapas aa jaye
    header.addEventListener("focusin", showHeader);

    return () => {
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", showHeader);
      ctx.revert();
    };
  }, []);

  /* ---------- 2. Sliding indicator (route badalne par) ---------- */
  useLayoutEffect(() => {
    const nav = navRef.current;
    const ind = indicatorRef.current;

    const getActive = () => nav.querySelector(".nav-link.active");

    const place = (el) => {
      if (!el) {
        gsap.to(ind, { opacity: 0, duration: 0.3, overwrite: "auto" });
        return;
      }
      const vars = { x: el.offsetLeft, width: el.offsetWidth, opacity: 1 };

      if (mountedRef.current && !prefersReduced()) {
        gsap.to(ind, { ...vars, duration: 0.55, ease: "power3.out", overwrite: "auto" });
      } else {
        gsap.killTweensOf(ind);
        gsap.set(ind, vars);
      }
    };

    place(getActive());
    mountedRef.current = true;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const items = nav.querySelectorAll(".nav-link");
    const onEnter = (e) => place(e.currentTarget);
    const onLeave = () => place(getActive());

    if (canHover) {
      items.forEach((l) => l.addEventListener("mouseenter", onEnter));
      nav.addEventListener("mouseleave", onLeave);
    }

    return () => {
      items.forEach((l) => l.removeEventListener("mouseenter", onEnter));
      nav.removeEventListener("mouseleave", onLeave);
    };
  }, [pathname]);

  /* ---------- 3. Font load / resize par indicator ki position theek karo ---------- */
  useEffect(() => {
    const nav = navRef.current;
    const ind = indicatorRef.current;
    let first = true;

    const ro = new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      const el = nav.querySelector(".nav-link.active");
      if (!el) return;
      gsap.killTweensOf(ind);
      gsap.set(ind, { x: el.offsetLeft, width: el.offsetWidth });
    });

    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  /* ---------- 4. Mobile menu ---------- */
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    // desktop size par aate hi menu band
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);

    let ctx;
    if (!prefersReduced()) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".mobile-item, .mobile-footer",
          { y: 50, rotationX: -35, opacity: 0, transformPerspective: 800 },
          {
            y: 0,
            rotationX: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            delay: 0.25,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }, menuRef);
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
      ctx?.revert();
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="site-header" ref={headerRef}>
        <div className="header-inner">
          <div className="header-brand">
            <Link to="/" className="logo" onClick={closeMenu} data-magnetic>
              <span className="logo-mark">AW</span>
              <span className="logo-text">Abdul Wahab</span>
            </Link>
          </div>

          <nav className="header-nav" ref={navRef} aria-label="Main navigation">
            <ul className="nav-list">
              {links.map((link) => (
                <li className="nav-item" key={link.to}>
                  <NavLink to={link.to} end={link.to === "/"} className="nav-link">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
          </nav>

          <div className="header-actions">
            <ThemeToggle/>
            <Link to="/contact" className="header-cta" data-magnetic>
              Hire Me
            </Link>

            <button
              type="button"
              className={`menu-toggle ${open ? "is-open" : ""}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="menu-toggle-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        <span className="scroll-progress" ref={progressRef} aria-hidden="true" />
      </header>

      {/* Header ke BAHAR hai, warna header ka transform position: fixed ko tod deta hai */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile navigation">
          <ul className="mobile-list">
            {links.map((link, i) => (
              <li className="mobile-item" key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className="mobile-link"
                  onClick={closeMenu}
                >
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-footer">
          <a href="mailto:wahababbasi752@gmail.com">wahababbasi752@gmail.com</a>
          <a href="tel:+923003064631">0300 3064631</a>
        </div>
      </div>
    </>
  );
};

export default Header;