"use client";

import { useEffect, useRef, useState } from "react";
import type { CellSpec } from "@/lib/grid-data";
import { imgPath } from "@/lib/grid-data";

type GridCellProps = {
  cell: CellSpec;
  startsOpen?: boolean;
};

export function GridCell({ cell, startsOpen = false }: GridCellProps) {
  const [open, setOpen] = useState(startsOpen);
  const [closing, setClosing] = useState(false);
  const [bubbleHidden, setBubbleHidden] = useState(false);
  const closingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideBubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When the cell starts open, schedule the auto-hide of the bubble (matches site behavior)
  useEffect(() => {
    if (startsOpen) {
      hideBubbleTimer.current = setTimeout(() => setBubbleHidden(true), 3000);
    }
    return () => {
      if (closingTimer.current) clearTimeout(closingTimer.current);
      if (hideBubbleTimer.current) clearTimeout(hideBubbleTimer.current);
    };
  }, [startsOpen]);

  if (!cell.isBlack) {
    return (
      <div className="cell">
        <span className="cell-num">{cell.index + 1}</span>
      </div>
    );
  }

  const handleClick = () => {
    if (open) {
      setOpen(false);
      setClosing(true);
      if (closingTimer.current) clearTimeout(closingTimer.current);
      closingTimer.current = setTimeout(() => setClosing(false), 500);
      if (hideBubbleTimer.current) clearTimeout(hideBubbleTimer.current);
      setBubbleHidden(false);
    } else {
      setClosing(false);
      setOpen(true);
      setBubbleHidden(false);
      if (hideBubbleTimer.current) clearTimeout(hideBubbleTimer.current);
      hideBubbleTimer.current = setTimeout(() => setBubbleHidden(true), 3000);
    }
  };

  const cls = ["cell", "black", open ? "open" : "", closing ? "closing" : "", bubbleHidden ? "bubble-hidden" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} onClick={handleClick}>
      <span className="cell-num">{cell.index + 1}</span>
      <div className="cell-fill"></div>
      <div className="cell-img">
        {cell.charKey ? <img src={imgPath(cell.charKey)} alt="" /> : null}
      </div>
      <div className="bubble">{cell.message}</div>
    </div>
  );
}
