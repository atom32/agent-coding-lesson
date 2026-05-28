"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/slide-animations";
import type { SolutionSlide as SolutionSlideType } from "@/types/slides";

interface SolutionSlideProps {
  slide: SolutionSlideType;
}

export function SolutionSlide({ slide }: SolutionSlideProps) {
  const principlesLabel =
    slide.locale === "zh"
      ? "关键原则"
      : slide.locale === "ja"
        ? "重要原則"
        : "Key Principles";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      <motion.div
        variants={staggerItem}
        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6"
      >
        <Lightbulb className="w-6 h-6" />
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="text-4xl sm:text-5xl font-bold mb-8"
      >
        {slide.title}
      </motion.h2>

      <motion.div
        variants={staggerItem}
        className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 dark:border-green-600 p-6 rounded-r-lg mb-8"
      >
        <p className="text-xl sm:text-2xl text-zinc-800 dark:text-zinc-200 leading-relaxed">
          {slide.solution}
        </p>
      </motion.div>

      {slide.principles && slide.principles.length > 0 && (
        <motion.div variants={staggerItem}>
          <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-400 mb-4">
            {principlesLabel}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {slide.principles.map((principle, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-sm font-medium text-green-700 dark:text-green-400">
                  {index + 1}
                </span>
                <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {principle}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
