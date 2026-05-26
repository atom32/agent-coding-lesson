"use client";

import { Variants } from "framer-motion";

/**
 * Animation variants for slide transitions
 */

export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
  }),
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Animation configuration
 */
export const ANIMATION_CONFIG = {
  duration: 0.3,
  ease: "easeInOut" as const,
};

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get animation props respecting user preferences
 */
export function getAnimationProps(baseProps: any) {
  if (prefersReducedMotion()) {
    return {
      ...baseProps,
      transition: { duration: 0 },
    };
  }
  return baseProps;
}
