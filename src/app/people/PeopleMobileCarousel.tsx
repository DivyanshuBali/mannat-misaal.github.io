"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import PersonCard from "./PersonCard";
import PersonInfo from "./PersonInfo";
import type { Person } from "./types";
import styles from "./PeopleMobile.module.css";

type PeopleMobileCarouselProps = {
  people: Person[];
};

function getDefaultActiveIndex(people: Person[]) {
  const fromData = people.findIndex((person) => person.defaultActive);
  if (fromData >= 0) return fromData;
  return Math.floor(people.length / 2);
}

export default function PeopleMobileCarousel({
  people,
}: PeopleMobileCarouselProps) {
  const defaultActiveIndex = useMemo(
    () => getDefaultActiveIndex(people),
    [people],
  );
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const snapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);

  const updateActiveIndex = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const viewportCenter = scroller.scrollLeft + scroller.clientWidth / 2;
    let nearest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    for (let index = 0; index < snapRefs.current.length; index++) {
      const item = snapRefs.current[index];
      if (!item) continue;

      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(itemCenter - viewportCenter);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = index;
      }
    }

    setActiveIndex(nearest);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    const item = snapRefs.current[index];
    if (!scroller || !item) return;

    const targetScrollLeft =
      item.offsetLeft + item.offsetWidth / 2 - scroller.clientWidth / 2;
    scroller.scrollLeft = targetScrollLeft;
  }, []);

  useLayoutEffect(() => {
    scrollToIndex(defaultActiveIndex);
    setActiveIndex(defaultActiveIndex);
  }, [defaultActiveIndex, scrollToIndex]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScrollEnd = () => updateActiveIndex();
    scroller.addEventListener("scrollend", onScrollEnd);
    updateActiveIndex();

    return () => scroller.removeEventListener("scrollend", onScrollEnd);
  }, [updateActiveIndex]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || event.pointerType === "touch") return;

    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartX.current = event.clientX;
    scrollStartLeft.current = scroller.scrollLeft;
    scroller.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollLeft =
      scrollStartLeft.current + (dragStartX.current - event.clientX);
    updateActiveIndex();
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    isDraggingRef.current = false;
    setIsDragging(false);
    scroller.releasePointerCapture(event.pointerId);
    updateActiveIndex();
  };

  const activePerson = people[activeIndex] ?? people[0];

  return (
    <div className={styles.mobileLayout}>
      <div
        ref={scrollerRef}
        className={`${styles.mobileScroller} ${isDragging ? styles.mobileScrollerDragging : ""}`}
        onScroll={updateActiveIndex}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="region"
        aria-roledescription="carousel"
        aria-label="People portraits"
      >
        <div className={styles.mobileTrack}>
          {people.map((person, index) => (
            <div
              key={person.name}
              ref={(element) => {
                snapRefs.current[index] = element;
              }}
              className={`${styles.mobileSnapItem} ${
                index === activeIndex
                  ? styles.mobileSnapItemActive
                  : styles.mobileSnapItemInactive
              }`}
            >
              <PersonCard person={person} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.mobileInfoFixed} aria-live="polite">
        <PersonInfo person={activePerson} />
      </div>
    </div>
  );
}
