"use client";

import { useState, useCallback, useEffect } from "react";

export interface SlideNavigationOptions {
  totalSlides: number;
  loop?: boolean;
  onSlideChange?: (index: number) => void;
}

export function useSlideNavigation({
  totalSlides,
  loop = false,
  onSlideChange,
}: SlideNavigationOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
      setCurrentIndex(clampedIndex);
      onSlideChange?.(clampedIndex);
    },
    [totalSlides, onSlideChange]
  );

  const goToNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    } else if (loop) {
      goToSlide(0);
    }
  }, [currentIndex, totalSlides, goToSlide, loop]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else if (loop) {
      goToSlide(totalSlides - 1);
    }
  }, [currentIndex, totalSlides, goToSlide, loop]);

  const goToFirst = useCallback(() => {
    goToSlide(0);
  }, [goToSlide]);

  const goToLast = useCallback(() => {
    goToSlide(totalSlides - 1);
  }, [goToSlide, totalSlides]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ": // Space
          e.preventDefault();
          goToNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "Home":
          e.preventDefault();
          goToFirst();
          break;
        case "End":
          e.preventDefault();
          goToLast();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious, goToFirst, goToLast]);

  return {
    currentIndex,
    goToSlide,
    goToNext,
    goToPrevious,
    goToFirst,
    goToLast,
    canGoNext: currentIndex < totalSlides - 1,
    canGoPrevious: currentIndex > 0,
    progress: ((currentIndex + 1) / totalSlides) * 100,
  };
}
