"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Maximize2,
  Minimize2,
  StickyNote,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideNavigationProps {
  currentIndex: number;
  totalSlides: number;
  locale?: string;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onFirst?: () => void;
  onToggleNotes?: () => void;
  onFullscreen?: () => void;
  isFullscreen?: boolean;
  showNotes?: boolean;
  hasNotes?: boolean;
  className?: string;
}

export function SlideNavigation({
  currentIndex,
  totalSlides,
  locale = "en",
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onFirst,
  onToggleNotes,
  onFullscreen,
  isFullscreen,
  showNotes,
  hasNotes,
  className,
}: SlideNavigationProps) {
  const labels =
    locale === "zh"
      ? {
          first: "回到第一页",
          previous: "上一页",
          next: "下一页",
          notes: "显示或隐藏演讲备注",
          enterFullscreen: "进入全屏",
          exitFullscreen: "退出全屏",
        }
      : locale === "ja"
        ? {
            first: "最初のスライドへ",
            previous: "前のスライド",
            next: "次のスライド",
            notes: "スピーカーノートを表示または非表示",
            enterFullscreen: "全画面にする",
            exitFullscreen: "全画面を終了",
          }
        : {
            first: "Go to first slide",
            previous: "Previous slide",
            next: "Next slide",
            notes: "Show or hide speaker notes",
            enterFullscreen: "Enter fullscreen",
            exitFullscreen: "Exit fullscreen",
          };

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
            aria-label={labels.first}
            title={labels.first}
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
          aria-label={labels.previous}
          title={labels.previous}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={!canGoNext}
          aria-label={labels.next}
          title={labels.next}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {onToggleNotes && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleNotes}
            disabled={!hasNotes}
            aria-label={labels.notes}
            aria-pressed={showNotes}
            title={labels.notes}
            className={cn(
              "hidden sm:flex",
              showNotes && "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50"
            )}
          >
            <StickyNote className="h-4 w-4" />
          </Button>
        )}

        {onFullscreen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onFullscreen}
            aria-label={isFullscreen ? labels.exitFullscreen : labels.enterFullscreen}
            title={isFullscreen ? labels.exitFullscreen : labels.enterFullscreen}
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
    </div>
  );
}
