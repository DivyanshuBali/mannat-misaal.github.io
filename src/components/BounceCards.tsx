"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  STUDIES_HIGHLIGHT_EVENT,
  STUDIES_HIGHLIGHT_PARAM,
} from "./StudiesNavLink";
import styles from "./BounceCards.module.css";

interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  /**
   * The slug of the study to link to
   */
  slugs: string[];
}

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  transformStyles = [
    "rotate(10deg) translate(-170px)",
    "rotate(5deg) translate(-85px)",
    "rotate(-3deg)",
    "rotate(-10deg) translate(85px)",
    "rotate(2deg) translate(170px)",
  ],
  enableHover = false,
  slugs,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [highlighted, setHighlighted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const triggerHighlight = useCallback(() => {
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }

    setHighlighted(true);
    highlightTimeoutRef.current = setTimeout(() => {
      setHighlighted(false);
      highlightTimeoutRef.current = null;
    }, 1000);
  }, []);

  useEffect(() => {
    const handleHighlightEvent = () => {
      triggerHighlight();
    };

    window.addEventListener(STUDIES_HIGHLIGHT_EVENT, handleHighlightEvent);
    return () => {
      window.removeEventListener(STUDIES_HIGHLIGHT_EVENT, handleHighlightEvent);
    };
  }, [triggerHighlight]);

  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("highlight") !== STUDIES_HIGHLIGHT_PARAM) {
      return;
    }

    triggerHighlight();
    router.replace("/", { scroll: false });
  }, [searchParams, router, triggerHighlight]);

  const getPushedTransform = (
    baseTransform: string,
    offsetX: number,
  ): string => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === "none"
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);
    const isFirst = hoveredIdx === 0;
    const isLast = hoveredIdx === images.length - 1;
    const isSandwiched = !isFirst && !isLast;

    images.forEach((_, i) => {
      const selector = q(`.card-${i}`);
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || "none";

      if (i === hoveredIdx) {
        gsap.to(selector, {
          transform: `${baseTransform} translateY(-10px)`,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (isSandwiched) {
        const offsetX = i < hoveredIdx ? -40 : 40;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);
        gsap.to(selector, {
          transform: pushedTransform,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (isLast && i < hoveredIdx) {
        const pushedTransform = getPushedTransform(baseTransform, 0);
        gsap.to(selector, {
          transform: pushedTransform,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      const selector = q(`.card-${i}`);
      gsap.killTweensOf(selector);
      const baseTransform = transformStyles[i] || "none";
      gsap.to(selector, {
        transform: baseTransform,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      className={`${styles.bounceCardsContainer} ${className}`}
      ref={containerRef}
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {images.map((src, idx) => (
        <Link
          key={idx}
          href={`/study/${slugs[idx]}`}
          className={`${styles.card} ${highlighted ? styles.cardHighlighted : ""} card card-${idx}`}
          style={{
            transform: transformStyles[idx] ?? "none",
            zIndex: images.length - idx,
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <Image
            className={styles.image}
            src={src}
            alt={`card-${idx}`}
            width={150}
            height={125}
          />
        </Link>
      ))}
    </div>
  );
}
