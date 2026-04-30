"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ArrowRightIcon } from "./icons";

const PROJECTS = [
  {
    href: "#",
    title: "Brix.AI Talent Search",
    tags: ["B2B SaaS", "AI Agent", "UX"],
    description: "End-to-end design of an AI agent recruiting system that raised $10M",
    imageSrc: "/images/projects-hero/brix.jpg",
    imageClass: "img-brix",
    videoSrc: "/videos/brix-hero-video1.mp4",
  },
  {
    href: "#",
    title: "OpusClip App",
    tags: ["Mobile", "AI", "B2C"],
    description: "Mobile MVP design for an AI video product, achieving 26% day-7 retention",
    imageSrc: "/images/projects-hero/opus-1.jpg",
    imageClass: "img-opus",
    videoSrc: "/videos/opus-hero-video1.mp4",
  },
  {
    href: "#",
    title: "uilabs · Design & Build",
    tags: ["Prototypes", "Code", "Animation"],
    description: "A collection of interactive experiments where I design and build ideas.",
    imageSrc: "/images/projects-hero/uilabs-2.jpg",
    imageClass: "img-opus",
    videoSrc: "/videos/uilabs-video1.mp4",
  },
  {
    title: "MokaHR Job Posting",
    tags: ["B2B", "AI Agent"],
    description: "Job posting workflow redesign for MokaHR—streamlining recruitment for HR teams",
    imageSrc: "/images/projects-hero/moka.jpg",
    imageClass: "img-opus",
  },
];

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-in ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function WorkSection() {
  return (
    <section className="work" id="work">
      <FadeIn className="section-header">
        <span className="section-header-label">PROJECTS</span>
      </FadeIn>

      <div className="projects">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>

      <FadeIn className="section-header">
        <a href="#" className="section-header-label">
          SEE MORE WORK
          <ArrowRightIcon />
        </a>
      </FadeIn>
    </section>
  );
}
