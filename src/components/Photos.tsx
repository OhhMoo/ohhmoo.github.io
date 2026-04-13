"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@/hooks/useScrollAnimation";
import { useColumnWidth } from "@/contexts/ColumnWidthContext";
import { photos, type Photo } from "@/data/photos";

function Lightbox({ photo, onClose, onPrev, onNext, hasPrev, hasNext }: {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "rgba(10,10,10,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{
            position: "fixed",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ‹
        </button>
      )}

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          maxWidth: "90vw",
          maxHeight: "90vh",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: "6px",
            boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
          }}
        />
        {(photo.caption || photo.year) && (
          <div style={{ textAlign: "center" }}>
            {photo.caption && (
              <p style={{
                color: "#e0dbd4",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                margin: 0,
              }}>
                {photo.caption}
              </p>
            )}
            {photo.year && (
              <p style={{
                color: "#7a7770",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                margin: "4px 0 0",
              }}>
                {photo.year}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{
            position: "fixed",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ›
        </button>
      )}

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          color: "#fff",
          fontSize: "18px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ×
      </button>
    </div>
  );
}

export function Photos() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const { columnWidth } = useColumnWidth();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const hasDragged = useRef(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!stripRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    scrollStartX.current = stripRef.current.scrollLeft;
    stripRef.current.style.cursor = "grabbing";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !stripRef.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) hasDragged.current = true;
    stripRef.current.scrollLeft = scrollStartX.current - dx;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (stripRef.current) stripRef.current.style.cursor = "grab";
  }, []);

  useGSAP((gsap) => {
    if (!sectionRef.current) return;
    sectionRef.current.querySelectorAll(".fade-in").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 98%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const goNext = useCallback(() => setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i)), []);

  return (
    <section
      id="photos"
      ref={sectionRef}
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "72px 48px",
      }}
    >
      <div style={{ maxWidth: `${columnWidth}px`, transition: "max-width 0.1s ease" }}>
        {/* Heading */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "36px",
              backgroundColor: "#1a56db",
              borderRadius: "2px",
              flexShrink: 0,
              marginTop: "4px",
            }}
          />
          <h2
            className="fade-in"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "32px",
              lineHeight: "40px",
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            Photos
          </h2>
        </div>

        {photos.length === 0 ? (
          <p
            className="fade-in"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              color: "#9a9a9a",
            }}
          >
            No photos yet — add some to <code style={{ fontFamily: "var(--font-mono)", fontSize: "13px", backgroundColor: "#f2efe9", padding: "1px 5px", borderRadius: "3px" }}>public/images/photos/</code> and update <code style={{ fontFamily: "var(--font-mono)", fontSize: "13px", backgroundColor: "#f2efe9", padding: "1px 5px", borderRadius: "3px" }}>src/data/photos.ts</code>.
          </p>
        ) : (
          <div
            ref={stripRef}
            className="fade-in photo-strip"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              cursor: "grab",
              paddingBottom: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                width: "max-content",
                paddingBottom: "4px",
              }}
            >
              {photos.map((photo, i) => (
                <button
                  key={photo.src}
                  onClick={() => { if (!hasDragged.current) openLightbox(i); }}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    display: "block",
                    flexShrink: 0,
                    width: "260px",
                    height: "260px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid #e2ddd6",
                    backgroundColor: "#f2efe9",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "64px",
          height: "1px",
          backgroundColor: "#e2ddd6",
          maxWidth: `${columnWidth}px`,
          transition: "max-width 0.1s ease",
        }}
      />

      {lightboxIndex !== null && (
        <Lightbox
          photo={photos[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < photos.length - 1}
        />
      )}
    </section>
  );
}
