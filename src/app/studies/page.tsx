"use client";

import { useRef, useState } from "react";
import NavBar from "../components/NavBar";
import styles from "./page.module.css";

type Stamp = {
  id: number;
  label: string;
  x: number;
  y: number;
  rotation: number;
};

const INITIAL_STAMPS: Stamp[] = [
  { id: 1, label: "study 01", x: 9, y: 20, rotation: -8 },
  { id: 2, label: "study 02", x: 43, y: 14, rotation: 5 },
  { id: 3, label: "study 03", x: 70, y: 29, rotation: -4 },
  { id: 4, label: "study 04", x: 18, y: 56, rotation: 7 },
  { id: 5, label: "study 05", x: 54, y: 48, rotation: -6 },
  { id: 6, label: "study 06", x: 72, y: 67, rotation: 9 },
];

type DragState = {
  id: number;
  pointerId: number;
  offsetX: number;
  offsetY: number;
};

export default function StudiesPage() {
  const [stamps, setStamps] = useState(INITIAL_STAMPS);
  const [activeStamp, setActiveStamp] = useState<number | null>(null);
  const canvasRef = useRef<HTMLElement>(null);
  const dragRef = useRef<DragState | null>(null);

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    id: number,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();

    dragRef.current = {
      id,
      pointerId: event.pointerId,
      offsetX:
        event.clientX - canvasRect.left - event.currentTarget.offsetLeft,
      offsetY: event.clientY - canvasRect.top - event.currentTarget.offsetTop,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setActiveStamp(id);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const canvas = canvasRef.current;

    if (!drag || drag.pointerId !== event.pointerId || !canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    const maxX = Math.max(0, canvasRect.width - event.currentTarget.offsetWidth);
    const maxY = Math.max(
      0,
      canvasRect.height - event.currentTarget.offsetHeight,
    );
    const x = Math.min(
      maxX,
      Math.max(0, event.clientX - canvasRect.left - drag.offsetX),
    );
    const y = Math.min(
      maxY,
      Math.max(0, event.clientY - canvasRect.top - drag.offsetY),
    );

    setStamps((current) =>
      current.map((stamp) =>
        stamp.id === drag.id
          ? {
              ...stamp,
              x: (x / canvasRect.width) * 100,
              y: (y / canvasRect.height) * 100,
            }
          : stamp,
      ),
    );
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setActiveStamp(null);
  };

  return (
    <main className={styles.page}>
      <section
        ref={canvasRef}
        className={styles.canvas}
        aria-label="Draggable studies"
      >
        {stamps.map((stamp) => (
          <div
            key={stamp.id}
            className={`${styles.stamp} ${
              activeStamp === stamp.id ? styles.dragging : ""
            }`}
            style={{
              left: `${stamp.x}%`,
              top: `${stamp.y}%`,
              rotate: `${stamp.rotation}deg`,
            }}
            onPointerDown={(event) => handlePointerDown(event, stamp.id)}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            {stamp.label}
          </div>
        ))}
      </section>

      <section className={styles.navContainer}>
        <NavBar />
      </section>
    </main>
  );
}
