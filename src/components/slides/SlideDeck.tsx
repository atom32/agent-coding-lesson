"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";
import { useFullscreen } from "@/hooks/useFullscreen";
import { SlideProgress } from "./SlideProgress";
import { SlideNavigation } from "./SlideNavigation";
import { SlideContent } from "./SlideContent";
import type { SlideDeck as SlideDeckData, Slide, NextSlide as NextSlideType } from "@/types/slides";
import { TitleSlide } from "./types/TitleSlide";
import { ProblemSlide } from "./types/ProblemSlide";
import { SolutionSlide } from "./types/SolutionSlide";
import { CodeSlide } from "./types/CodeSlide";
import { DiagramSlide } from "./types/DiagramSlide";
import { DemoSlide } from "./types/DemoSlide";
import { SummarySlide } from "./types/SummarySlide";
import { NextSlide } from "./types/NextSlide";

interface SlideDeckProps {
  deckData: SlideDeckData;
}

export function SlideDeck({ deckData }: SlideDeckProps) {
  const [direction, setDirection] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const router = useRouter();

  const {
    currentIndex,
    goToNext,
    goToPrevious,
    goToFirst,
    goToLast,
    canGoNext,
    canGoPrevious,
    progress,
  } = useSlideNavigation({
    totalSlides: deckData.slides.length,
    loop: false,
  });

  const { isFullscreen, toggle, elementRef } = useFullscreen();

  const currentSlide = deckData.slides[currentIndex];
  const isNextSlide = currentSlide?.type === "next";
  const speakerNotes = currentSlide?.speakerNotes ?? [];
  const hasNotes = speakerNotes.length > 0;
  const notesTitle =
    deckData.locale === "zh"
      ? "演讲备注"
      : deckData.locale === "ja"
        ? "スピーカーノート"
        : "Speaker notes";
  const noNotesText =
    deckData.locale === "zh"
      ? "这一页没有备注。"
      : deckData.locale === "ja"
        ? "このスライドにはノートがありません。"
        : "No notes for this slide.";

  const handleNext = useCallback(() => {
    if (isNextSlide) {
      // Navigate to next session
      const nextSlide = currentSlide as NextSlideType;
      const pathParts = window.location.pathname.split('/');
      const locale = pathParts[1] || 'en';
      router.push(`/${locale}/slides/${nextSlide.nextSessionId}`);
    } else {
      setDirection(1);
      goToNext();
    }
  }, [isNextSlide, currentSlide, goToNext, router]);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    goToPrevious();
  }, [goToPrevious]);

  // Auto-hide controls in fullscreen after 3 seconds of inactivity
  useEffect(() => {
    if (!isFullscreen) {
      setShowControls(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    resetTimer();

    const handleMouseMove = () => resetTimer();
    const handleClick = () => resetTimer();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [isFullscreen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggle();
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setShowNotes((value) => (hasNotes ? !value : false));
      } else if ((e.key === "ArrowRight" || e.key === " ") && isNextSlide) {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle, isNextSlide, handleNext, hasNotes]);

  return (
    <div
      ref={elementRef}
      className={`relative w-full h-screen flex flex-col bg-white dark:bg-zinc-950 ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      {/* Progress Bar - Always visible */}
      <div className="flex-shrink-0 px-6 pt-4 pb-2">
        <SlideProgress
          current={currentIndex}
          total={deckData.slides.length}
          locale={deckData.locale}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <SlideContent direction={direction} isActive={true}>
          <div className="w-full h-full flex items-center justify-center px-6 py-8">
            <div className="max-w-5xl mx-auto w-full">
              {renderSlide(currentSlide)}
            </div>
          </div>
        </SlideContent>

        {showNotes && (
          <aside className="absolute right-4 top-4 z-20 max-h-[calc(100%-2rem)] w-[min(380px,calc(100%-2rem))] overflow-y-auto rounded-lg border border-zinc-200 bg-white/95 p-4 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {notesTitle}
            </div>
            {hasNotes ? (
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                {speakerNotes.map((note, index) => (
                  <li key={`${currentSlide.id}-note-${index}`} className="flex gap-2">
                    <span className="font-mono text-xs text-zinc-400">{index + 1}</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                {noNotesText}
              </p>
            )}
          </aside>
        )}
      </div>

      {/* Navigation Controls */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls || !isFullscreen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 px-6 py-4 border-t border-zinc-200 dark:border-zinc-800"
      >
        <SlideNavigation
          currentIndex={currentIndex}
          totalSlides={deckData.slides.length}
          locale={deckData.locale}
          canGoPrevious={canGoPrevious}
          canGoNext={isNextSlide || canGoNext} // Enable next button on next slide
          onPrevious={handlePrevious}
          onNext={handleNext}
          onFirst={goToFirst}
          onToggleNotes={() => setShowNotes((value) => (hasNotes ? !value : false))}
          onFullscreen={toggle}
          isFullscreen={isFullscreen}
          showNotes={showNotes}
          hasNotes={hasNotes}
        />
      </motion.div>
    </div>
  );
}

function renderSlide(slide: Slide) {
  switch (slide.type) {
    case "title":
      return <TitleSlide slide={slide} />;
    case "problem":
      return <ProblemSlide slide={slide} />;
    case "solution":
      return <SolutionSlide slide={slide} />;
    case "code":
      return <CodeSlide slide={slide} />;
    case "diagram":
      return <DiagramSlide slide={slide} />;
    case "demo":
      return <DemoSlide slide={slide} />;
    case "summary":
      return <SummarySlide slide={slide} />;
    case "next":
      return <NextSlide slide={slide} />;
    default:
      return (
        <div className="text-center text-zinc-500">
          Slide type "{(slide as any).type}" not yet implemented
        </div>
      );
  }
}
