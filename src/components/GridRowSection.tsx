"use client";

import { useEffect, useRef, useState } from "react";
import { buildRowCells, getLayout, type CellSpec, type GridLayout } from "@/lib/grid-data";
import { GridCell } from "./GridCell";

export function GridRowSection() {
  const [layout, setLayout] = useState<GridLayout | null>(null);
  const [cells, setCells] = useState<CellSpec[]>([]);
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const compute = () => {
      const next = getLayout(window.innerWidth);
      setLayout((prev) => {
        if (!prev || prev.cols !== next.cols) {
          setCells(buildRowCells(next));
          return next;
        }
        return prev;
      });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    if (!wrapRef.current) return;
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
    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  if (!layout) {
    return (
      <section className="grid-row-section">
        <div className="grid-wrap fade-in" ref={wrapRef}>
          <div className="grid grid--row" id="grid2"></div>
        </div>
      </section>
    );
  }

  const center = Math.floor(layout.cols / 2);

  return (
    <section className="grid-row-section">
      <div className={`grid-wrap fade-in ${visible ? "visible" : ""}`} ref={wrapRef}>
        <div className="grid grid--row" id="grid2">
          {cells.map((cell) => (
            <GridCell key={cell.index} cell={cell} startsOpen={cell.index === center} />
          ))}
        </div>
        <div className="grid-col-ext grid-col-ext--top">
          <div className="grid-col-ext-cell"></div>
          <div className="grid-col-ext-cell"></div>
          <div className="grid-col-ext-char">
            <img className="grid-col-ext-img" src="/images/extra-buttom1.png" alt="" />
            <div className="grid-col-ext-bubble">
              Have any advice? Find me on{" "}
              <a
                href="https://www.linkedin.com/in/yiqi-yao-michael/"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "inherit",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  textDecoration: "underline",
                }}
              >
                Linkedin
              </a>
              !
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
