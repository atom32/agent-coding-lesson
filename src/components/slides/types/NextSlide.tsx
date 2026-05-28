"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/slide-animations";
import type { NextSlide as NextSlideType } from "@/types/slides";
import { getVersionMeta } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface NextSlideProps {
  slide: NextSlideType;
}

export function NextSlide({ slide }: NextSlideProps) {
  const router = useRouter();
  const nextVersionMeta = getVersionMeta(slide.nextSessionId, slide.locale);
  const labels =
    slide.locale === "zh"
      ? {
          nextSession: "下一节",
          comingUp: "将会看到",
          continueTo: "继续到",
          pressHint: "也可以按",
          pressAction: "继续",
        }
      : slide.locale === "ja"
        ? {
            nextSession: "次のセッション",
            comingUp: "次に学ぶこと",
            continueTo: "続ける",
            pressHint: "または",
            pressAction: "で続行",
          }
        : {
            nextSession: "Next Session",
            comingUp: "Coming Up",
            continueTo: "Continue to",
            pressHint: "or press",
            pressAction: "to continue",
          };

  const goToNextSession = () => {
    // Get current locale from URL
    const pathParts = window.location.pathname.split('/');
    const locale = pathParts[1] || 'en';
    router.push(`/${locale}/slides/${slide.nextSessionId}`);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto text-center"
    >
      <motion.div variants={staggerItem}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-6">
          <Sparkles className="w-6 h-6" />
        </div>
      </motion.div>

      <motion.h2
        variants={staggerItem}
        className="text-4xl sm:text-5xl font-bold mb-4"
      >
        {slide.title}
      </motion.h2>

      <motion.div
        variants={staggerItem}
        className="mb-12 cursor-pointer hover:scale-105 transition-transform"
        onClick={goToNextSession}
      >
        <div className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-950/30 dark:to-blue-950/30 rounded-xl border border-purple-200 dark:border-purple-900">
          <ArrowRight className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <div className="text-left">
            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">
              {labels.nextSession}
            </p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {slide.nextSessionTitle}
            </p>
            {nextVersionMeta && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                {nextVersionMeta.subtitle}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {slide.preview.length > 0 && (
        <motion.div variants={staggerItem}>
          <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-400 mb-6">
            {labels.comingUp}
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {slide.preview.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-bold mb-2 mx-auto">
                  {index + 1}
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 text-center">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        variants={staggerItem}
        className="mt-12"
      >
        <button
          onClick={goToNextSession}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
        >
          {labels.continueTo} {slide.nextSessionTitle}
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-zinc-500 dark:text-zinc-500 mt-4">
          {labels.pressHint} <kbd className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded text-xs">→</kbd> {labels.pressAction}
        </p>
      </motion.div>
    </motion.div>
  );
}
