"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/slide-animations";
import type { SummarySlide as SummarySlideType } from "@/types/slides";

interface SummarySlideProps {
  slide: SummarySlideType;
}

export function SummarySlide({ slide }: SummarySlideProps) {
  const upNextLabel =
    slide.locale === "zh"
      ? "下一节"
      : slide.locale === "ja"
        ? "次へ"
        : "Up Next";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      <motion.div variants={staggerItem}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="text-4xl sm:text-5xl font-bold mb-8"
      >
        {slide.title}
      </motion.h2>

      <motion.div
        variants={staggerItem}
        className="space-y-4 mb-8"
      >
        {slide.takeaways.map((takeaway, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {takeaway}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {slide.nextSession && (
        <motion.div
          variants={staggerItem}
          className="flex items-center gap-3 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900"
        >
          <ArrowRight className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
              {upNextLabel}
            </p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {slide.nextSession}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
