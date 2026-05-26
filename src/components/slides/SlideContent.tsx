"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import {
  slideVariants,
  ANIMATION_CONFIG,
  prefersReducedMotion,
} from "@/lib/slide-animations";

interface SlideContentProps {
  children: ReactNode;
  direction: number;
  isActive: boolean;
}

export function SlideContent({
  children,
  direction,
  isActive,
}: SlideContentProps) {
  const shouldAnimate = !prefersReducedMotion();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence
        initial={false}
        custom={direction}
        mode="wait"
      >
        {isActive && (
          <motion.div
            key="slide"
            custom={direction}
            variants={shouldAnimate ? slideVariants : undefined}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              shouldAnimate
                ? {
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: ANIMATION_CONFIG.duration },
                    scale: { duration: ANIMATION_CONFIG.duration },
                  }
                : { duration: 0 }
            }
            className="absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
