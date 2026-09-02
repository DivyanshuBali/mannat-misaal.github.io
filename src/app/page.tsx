"use client";

import { useRef, useState } from "react";
import BounceCards from "./components/BounceCards";
import NavBar from "./components/NavBar";
import styles from "./page.module.css";

export default function Home() {
  const [logoHovered, setLogoHovered] = useState(false);
  const [heroHovered, setHeroHovered] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardsVisible = logoHovered || heroHovered;

  const handleLogoHoverChange = (hovered: boolean) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (hovered) {
      setLogoHovered(true);
      return;
    }

    // Brief grace so the cursor can reach the cards across the gap
    hideTimeoutRef.current = setTimeout(() => {
      setLogoHovered(false);
      hideTimeoutRef.current = null;
    }, 400);
  };

  return (
    <main className={styles.main}>
      <section
        className={`${styles.hero} ${cardsVisible ? styles.heroVisible : ""}`}
        onMouseEnter={() => setHeroHovered(true)}
        onMouseLeave={() => setHeroHovered(false)}
      >
        <BounceCards />
      </section>
      <section className={styles.navContainer}>
        <NavBar onLogoHoverChange={handleLogoHoverChange} />
      </section>
    </main>
  );
}
