"use client";

import { useEffect, useRef, useState } from "react";

export type ProjectCardProps = {
  href?: string;
  title: string;
  tags: string[];
  description: string;
  imageSrc: string;
  imageClass: string;
  videoSrc?: string;
};

export function ProjectCard({ href, title, tags, description, imageSrc, imageClass, videoSrc }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
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

  const onMouseEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    void v.play().catch(() => undefined);
    if (v.readyState >= 3) {
      setVideoReady(true);
    } else {
      const onCanPlay = () => {
        setVideoReady(true);
        v.removeEventListener("canplay", onCanPlay);
      };
      v.addEventListener("canplay", onCanPlay, { once: true });
    }
  };

  const onMouseLeave = () => {
    const v = videoRef.current;
    setVideoReady(false);
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  const className = `project-card fade-in ${visible ? "visible" : ""} ${videoReady ? "video-ready" : ""}`;

  const inner = (
    <div className="project-inner">
      <div className={`project-visual ${videoSrc ? "" : "project-visual--no-video"}`}>
        <div
          className={`project-img ${imageClass}`}
          style={{ backgroundImage: `url('${imageSrc}')`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        {videoSrc ? (
          <video
            ref={videoRef}
            className="project-hover-video"
            src={videoSrc}
            muted
            loop
            playsInline
            preload="none"
          />
        ) : null}
      </div>
      <div className="project-bottom">
        <div className="project-info">
          <div className="project-name-row">
            <h3 className="project-name">{title}</h3>
            <div className="project-name-tags">
              {tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <p className="project-desc">{description}</p>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        ref={cardRef}
        href={href}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {inner}
      </a>
    );
  }

  return (
    <a
      ref={cardRef}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {inner}
    </a>
  );
}
