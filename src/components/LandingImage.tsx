"use client";

import { useRef, useState, useCallback } from "react";

export default function LandingImage() {
  const [activated, setActivated] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (activated) return;
    setActivated(true);

    const overlay = overlayRef.current;
    if (!overlay) return;

    overlay.classList.add("expanding");
    document.body.classList.add("dark");

    const onTransitionEnd = () => {
      document.body.style.background = "#253b76";
      overlay.style.transition = "none";
      overlay.classList.remove("expanding");
      overlay.style.clipPath = "circle(150vmax at 50% 50%)";
    };

    overlay.addEventListener("transitionend", onTransitionEnd, { once: true });
  }, [activated]);

  return (
    <>
      <div ref={overlayRef} className="ripple-overlay" />

      <main>
        <div className="landing-img" onMouseEnter={handleMouseEnter}>
          <img
            className="landing-img__black"
            src="/assets/landing-img-red.png"
            alt="Ranjit Singh gate axonometric view"
          />
          <img
            className="landing-img__white"
            src="/assets/landing-img-white.png"
            alt="Ranjit Singh gate axonometric view"
          />
        </div>
      </main>
    </>
  );
}
