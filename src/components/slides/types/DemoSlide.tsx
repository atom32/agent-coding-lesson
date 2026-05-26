"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/slide-animations";
import { AgentLoopSimulator } from "@/components/simulator/agent-loop-simulator";
import type { DemoSlide as DemoSlideType } from "@/types/slides";

interface DemoSlideProps {
  slide: DemoSlideType;
}

export function DemoSlide({ slide }: DemoSlideProps) {
  const getSimulatorComponent = () => {
    // For now, default to AgentLoopSimulator
    // In the future, this would support different simulator types
    return <AgentLoopSimulator version={slide.session} />;
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto"
    >
      <motion.div variants={staggerItem}>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
            <Play className="w-5 h-5" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            {slide.title}
          </h2>
        </div>
      </motion.div>

      {slide.description && (
        <motion.p
          variants={staggerItem}
          className="text-lg text-zinc-600 dark:text-zinc-400 mb-8"
        >
          {slide.description}
        </motion.p>
      )}

      <motion.div variants={staggerItem}>
        {getSimulatorComponent()}
      </motion.div>
    </motion.div>
  );
}
