"use client";

import React, { useEffect, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import styles from "./NavBar.module.css";

const MANNAT_URL = "https://mannatsingh.co";

interface NavBarProps {
  onLogoHoverChange?: (hovered: boolean) => void;
}

function NavBar({ onLogoHoverChange }: NavBarProps) {
  const [bubble, setBubble] = useState<{
    x: number;
    y: number;
    size: number;
  } | null>(null);
  const [bubbleExpanded, setBubbleExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handlePageShow = () => {
      setBubble(null);
      setBubbleExpanded(false);
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const handleMannatClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      bubble
    ) {
      window.location.assign(MANNAT_URL);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const radius = Math.ceil(
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      ),
    );

    setBubble({ x, y, size: radius * 2 });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setBubbleExpanded(true));
    });
  };

  const handleStudiesInteraction = (active: boolean) => {
    if (window.matchMedia("(max-width: 1200px)").matches) {
      onLogoHoverChange?.(false);
      return;
    }

    onLogoHoverChange?.(active);
  };

  const handlePeopleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(max-width: 1200px)").matches) {
      event.preventDefault();
    }
  };

  const handleBubbleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (event.propertyName !== "transform") return;

    flushSync(() => {
      setBubble(null);
      setBubbleExpanded(false);
    });

    window.location.assign(MANNAT_URL);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoGroup}>
        <a href="/" className={styles.logo}>
          misaal
        </a>
        <div className={styles.divider} />
        <a
          href={MANNAT_URL}
          className={styles.mannatLink}
          onClick={handleMannatClick}
        >
          mannat singh
        </a>
      </div>

      <div className={styles.navLinks}>
        <a
          href="/"
          onMouseEnter={() => handleStudiesInteraction(true)}
          onMouseLeave={() => handleStudiesInteraction(false)}
          onFocus={() => handleStudiesInteraction(true)}
          onBlur={() => handleStudiesInteraction(false)}
        >
          studies
        </a>
        <a
          href="/people"
          className={styles.peopleLink}
          onClick={handlePeopleClick}
        >
          people
          <div className={styles.peopleContent}>
            <ol>
              <li>
                <div className={styles.personName}>mannat singh</div>
                <div className={styles.personRole}>ARCHITECT/FOUNDER</div>
              </li>
              <li>
                <div className={styles.personName}>shikhar saikia</div>
                <div className={styles.personRole}>ASSOCIATE</div>
              </li>
              <li>
                <div className={styles.personName}>eknoor matharoo</div>
                <div className={styles.personRole}>ASSOCIATE</div>
              </li>
              <li>
                <div className={styles.personName}>divyanshu bali</div>
                <div className={styles.personRole}>ASSOCIATE</div>
              </li>
            </ol>
          </div>
        </a>
        <a href="/">about</a>
      </div>

      {mounted &&
        bubble &&
        createPortal(
          <div
            className={`${styles.bubble} ${bubbleExpanded ? styles.bubbleExpanded : ""}`}
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
            }}
            onTransitionEnd={handleBubbleTransitionEnd}
            aria-hidden
          />,
          document.body,
        )}
    </nav>
  );
}

export default NavBar;
