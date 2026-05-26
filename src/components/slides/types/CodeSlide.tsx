"use client";

import { motion } from "framer-motion";
import { FileCode, ChevronRight } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/slide-animations";
import type { CodeSlide as CodeSlideType } from "@/types/slides";

interface CodeSlideProps {
  slide: CodeSlideType;
}

export function CodeSlide({ slide }: CodeSlideProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto"
    >
      <motion.div variants={staggerItem}>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          {slide.title}
        </h2>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-lg"
      >
        {/* File header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-700">
          <FileCode className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
            {slide.code.filename}
          </span>
          {slide.code.startLine && slide.code.endLine && (
            <span className="text-xs text-zinc-500 dark:text-zinc-500 ml-auto">
              Lines {slide.code.startLine}-{slide.code.endLine}
            </span>
          )}
        </div>

        {/* Code content */}
        <div className="bg-zinc-950 p-6 overflow-x-auto">
          <pre className="text-sm sm:text-base">
            <code
              className="font-mono text-zinc-100"
              dangerouslySetInnerHTML={{
                __html: formatCodeWithLineNumbers(slide.code.snippet)
              }}
            />
          </pre>
        </div>

        {/* Annotations */}
        {slide.code.annotations && slide.code.annotations.length > 0 && (
          <div className="bg-zinc-50 dark:bg-zinc-900 p-4 border-t border-zinc-300 dark:border-zinc-700">
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-400 mb-3">
              Annotations
            </h4>
            <div className="space-y-2">
              {slide.code.annotations.map((annotation, index) => (
                <div
                  key={index}
                  className={`
                    flex items-start gap-2 text-sm p-2 rounded
                    ${
                      annotation.type === "warn"
                        ? "bg-amber-100 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300"
                        : annotation.type === "highlight"
                        ? "bg-blue-100 dark:bg-blue-950/30 text-blue-900 dark:text-blue-300"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300"
                    }
                  `}
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-mono text-xs opacity-70">
                      Line {annotation.line}:
                    </span>
                    <span className="ml-2">{annotation.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function formatCodeWithLineNumbers(code: string): string {
  const lines = code.split("\n");
  const maxLineDigits = lines.length.toString().length;

  return lines
    .map((line, index) => {
      const lineNum = index + 1;
      const lineNumStr = lineNum.toString().padStart(maxLineDigits, " ");
      return `<span class="text-zinc-600 select-none mr-4">${lineNumStr}</span>${escapeHtml(line)}`;
    })
    .join("\n");
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
