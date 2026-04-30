"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LinkedInIcon, GitHubIcon, XIcon, EmailIcon } from "./icons";

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName !== "A") return;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 52;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH, behavior: "smooth" });
    };
    document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener("click", onClick));
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((a) => a.removeEventListener("click", onClick));
    };
  }, []);

  return (
    <nav className={`nav ${hidden ? "nav--hidden" : ""} ${menuOpen ? "menu-open" : ""}`} id="nav">
      <Link href="/" className="nav-logo">
        GEORGIA LYU
        <br />
        <span style={{ color: "var(--text-2)" }}>DESIGN ENGINEER</span>
      </Link>

      <div className="nav-center">
        <a href="#work" onClick={() => setMenuOpen(false)}>
          Work
        </a>
        <a href="#" onClick={() => setMenuOpen(false)}>
          Art
        </a>
        <a href="#" onClick={() => setMenuOpen(false)}>
          About
        </a>
      </div>

      <div className="nav-icons">
        <a href="https://www.linkedin.com/in/georgia-lyu-899349270/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
        <a href="https://github.com/georgialyu05" target="_blank" rel="noreferrer" aria-label="GitHub">
          <GitHubIcon />
        </a>
        <a href="https://x.com/Georgiaze0101" target="_blank" rel="noreferrer" aria-label="X">
          <XIcon />
        </a>
        <a href="mailto:georgialyu05@gmail.com" aria-label="Email">
          <EmailIcon />
        </a>
      </div>

      <button
        className="nav-menu-btn"
        id="menuBtn"
        aria-label="Menu"
        onClick={() => setMenuOpen((v) => !v)}
        type="button"
      >
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
