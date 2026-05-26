"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideNavigationProps {
  currentIndex: number;
  totalSlides: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onFirst?: () => void;
  onFullscreen?: () => void;
  isFullscreen?: boolean;
  className?: string;
}

export function SlideNavigation({
  currentIndex,
  totalSlides,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onFirst,
  onFullscreen,
  isFullscreen,
  className,
}: SlideNavigationProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {onFirst && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onFirst}
            disabled={currentIndex === 0}
            aria-label="Go to first slide"
            className="hidden sm:flex"
          >
            <Home className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={!canGoNext}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {onFullscreen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="hidden sm:flex"
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
}
