"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/slide-animations";
import type { TitleSlide as TitleSlideType } from "@/types/slides";

interface TitleSlideProps {
  slide: TitleSlideType;
}

export function TitleSlide({ slide }: TitleSlideProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="text-center"
    >
      <motion.div variants={staggerItem} className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-2xl font-bold mb-4">
          {slide.sessionNumber}
        </div>
      </motion.div>

      <motion.h1
        variants={staggerItem}
        className="text-6xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
      >
        {slide.title}
      </motion.h1>

      <motion.p
        variants={staggerItem}
        className="text-2xl sm:text-3xl text-zinc-600 dark:text-zinc-400 mb-8"
      >
        {slide.subtitle}
      </motion.p>

      {slide.motto && (
        <motion.div
          variants={staggerItem}
          className="inline-block px-6 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg"
        >
          <p className="text-xl sm:text-2xl text-blue-600 dark:text-blue-400 italic font-serif">
            "{slide.motto}"
          </p>
        </motion.div>
      )}

      <motion.div
        variants={staggerItem}
        className="mt-12 text-sm text-zinc-500 dark:text-zinc-600"
      >
        Session {slide.sessionNumber} of {slide.totalSessions}
      </motion.div>
    </motion.div>
  );
}
