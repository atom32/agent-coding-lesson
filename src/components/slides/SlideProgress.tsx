"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlideProgressProps {
  current: number;
  total: number;
  locale?: string;
  className?: string;
}

export function SlideProgress({
  current,
  total,
  locale = "en",
  className,
}: SlideProgressProps) {
  const progress = ((current + 1) / total) * 100;
  const label =
    locale === "zh"
      ? `第 ${current + 1} / ${total} 页`
      : locale === "ja"
        ? `スライド ${current + 1} / ${total}`
        : `Slide ${current + 1} of ${total}`;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mb-2">
        <span>{label}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500 dark:bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
