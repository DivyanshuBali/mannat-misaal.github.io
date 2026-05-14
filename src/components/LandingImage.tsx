"use client";

import { useRef, useState, useCallback } from "react";
import styles from "./LandingImage.module.css";

interface LandingImageProps {
  rippleOverlayClass: string;
}

export default function LandingImage({ rippleOverlayClass }: LandingImageProps) {
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
      document.body.style.background = "var(--color-navy)";
      overlay.style.transition = "none";
      overlay.classList.remove("expanding");
      overlay.style.clipPath = "circle(150vmax at 50% 50%)";
    };

    overlay.addEventListener("transitionend", onTransitionEnd, { once: true });
  }, [activated]);

  return (
    <>
      <div ref={overlayRef} className={rippleOverlayClass} />

      <div className={styles.landingImg} onMouseEnter={handleMouseEnter}>
        <img
          className={styles.black}
          src="/assets/landing-img-red.png"
          alt="Ranjit Singh gate axonometric view"
        />
        <img
          className={styles.white}
          src="/assets/landing-img-white.png"
          alt="Ranjit Singh gate axonometric view"
        />
      </div>
    </>
  );
}
