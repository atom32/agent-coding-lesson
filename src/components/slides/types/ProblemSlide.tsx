"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/slide-animations";
import type { ProblemSlide as ProblemSlideType } from "@/types/slides";

interface ProblemSlideProps {
  slide: ProblemSlideType;
}

export function ProblemSlide({ slide }: ProblemSlideProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      <motion.div
        variants={staggerItem}
        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mb-6"
      >
        <AlertTriangle className="w-6 h-6" />
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="text-4xl sm:text-5xl font-bold mb-8"
      >
        {slide.title}
      </motion.h2>

      <motion.div
        variants={staggerItem}
        className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-600 p-6 rounded-r-lg mb-8"
      >
        <p className="text-xl sm:text-2xl text-zinc-800 dark:text-zinc-200 leading-relaxed">
          {slide.problem}
        </p>
      </motion.div>

      {slide.context && slide.context.length > 0 && (
        <motion.div variants={staggerItem}>
          <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-400 mb-4">
            Context
          </h3>
          <ul className="space-y-3">
            {slide.context.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {index + 1}
                </span>
                <span className="text-lg leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}
