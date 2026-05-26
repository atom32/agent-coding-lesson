"use client";

import Link from "next/link";
import { ArrowUpRight, FlaskConical, Map, Workflow } from "lucide-react";
import { useLocale, useTranslations } from "@/lib/i18n";
import {
  ADVANCED_CHAPTERS,
  getAdvancedChapterUrl,
  getCourseBridge,
  localizeBridge,
  localizeChapter,
} from "@/data/course-map";

interface AdvancedBridgeProps {
  version: string;
}

export function AdvancedBridge({ version }: AdvancedBridgeProps) {
  const locale = useLocale();
  const t = useTranslations("curriculum");
  const rawBridge = getCourseBridge(version);
  const bridge = rawBridge ? localizeBridge(rawBridge, locale) : null;

  if (!bridge) return null;

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {t("double_layer_lesson")}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              {t("bridge_title")}
            </h2>
          </div>
          <Link
            href={`/${locale}/curriculum`}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-zinc-200 px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <Map size={15} />
            {t("course_map")}
          </Link>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/70 dark:bg-blue-950/30">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900 dark:text-blue-100">
              <FlaskConical size={16} />
              {t("lab_question")}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-blue-950/80 dark:text-blue-100/80">
              {bridge.labQuestion}
            </p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/70 dark:bg-emerald-950/30">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900 dark:text-emerald-100">
              <Workflow size={16} />
              {t("production_question")}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-emerald-950/80 dark:text-emerald-100/80">
              {bridge.productionQuestion}
            </p>
          </div>
        </div>

        <div className="mt-5 border-t border-zinc-200 pt-5 dark:border-zinc-800">
          <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            {t("bridge_reading")}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {bridge.bridge}
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
          <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            {t("advanced_chapters")}
          </h3>
          <div className="mt-3 space-y-2">
            {bridge.chapters.map((chapterId) => {
              const chapter = localizeChapter(ADVANCED_CHAPTERS[chapterId], locale);
              return (
                <Link
                  key={chapter.id}
                  href={getAdvancedChapterUrl(locale, chapter)}
                  className="group flex items-start justify-between gap-3 rounded-md border border-zinc-200 bg-white p-3 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                >
                  <span>
                    <span className="font-mono text-xs text-zinc-400">
                      EP{chapter.id}
                    </span>
                    <span className="ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {chapter.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {chapter.focus}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="mt-0.5 shrink-0 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
          <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            {t("practice_upgrade")}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {bridge.practice}
          </p>
          <div className="mt-5 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {t("transfer_pattern")}
            </p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">
              {bridge.pattern}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
