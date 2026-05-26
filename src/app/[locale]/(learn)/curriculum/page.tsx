"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, FlaskConical } from "lucide-react";
import { useLocale, useTranslations } from "@/lib/i18n";
import { getVersionMeta } from "@/lib/constants";
import {
  ADVANCED_CHAPTERS,
  COURSE_BRIDGES,
  getAdvancedChapterUrl,
  localizeBridge,
  localizeChapter,
} from "@/data/course-map";
import { LayerBadge } from "@/components/ui/badge";

export default function CurriculumPage() {
  const locale = useLocale();
  const t = useTranslations("curriculum");
  const tSession = useTranslations("sessions");

  return (
    <div className="space-y-10 py-4">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {t("architecture_label")}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          {t("title")}
        </h1>
        <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-300">
          {t("subtitle")}
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5 dark:border-blue-900/70 dark:bg-blue-950/30">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-900 dark:text-blue-100">
            <FlaskConical size={17} />
            {t("lab_layer_title")}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-blue-950/80 dark:text-blue-100/80">
            {t("lab_layer_desc")}
          </p>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900/70 dark:bg-emerald-950/30">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900 dark:text-emerald-100">
            <BookOpen size={17} />
            {t("production_layer_title")}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-emerald-950/80 dark:text-emerald-100/80">
            {t("production_layer_desc")}
          </p>
        </div>
      </section>

      <section className="space-y-3">
        {COURSE_BRIDGES.map((rawBridge) => {
          const bridge = localizeBridge(rawBridge, locale);
          const meta = getVersionMeta(bridge.version, locale);
          return (
            <div
              key={bridge.version}
              className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="grid gap-4 lg:grid-cols-[220px_1fr_260px]">
                <Link
                  href={`/${locale}/${bridge.version}`}
                  className="group rounded-md border border-zinc-200 bg-zinc-50 p-3 transition-colors hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-950"
                >
                  <div className="flex items-center gap-2">
                    <LayerBadge layer={meta.layer}>{bridge.version}</LayerBadge>
                    <span className="text-sm font-semibold text-zinc-950 group-hover:underline dark:text-zinc-50">
                      {tSession(bridge.version) || meta.title}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {bridge.labQuestion}
                  </p>
                </Link>

                <div className="flex items-start gap-3">
                  <ArrowRight
                    size={18}
                    className="mt-1 hidden shrink-0 text-zinc-300 lg:block"
                  />
                  <div>
                    <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                      {bridge.productionQuestion}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {bridge.bridge}
                    </p>
                    <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {t("practice")}: {bridge.practice}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {bridge.chapters.map((chapterId) => {
                    const chapter = localizeChapter(ADVANCED_CHAPTERS[chapterId], locale);
                    return (
                      <Link
                        key={chapter.id}
                        href={getAdvancedChapterUrl(locale, chapter)}
                        className="group flex items-center justify-between gap-3 rounded-md border border-zinc-200 px-3 py-2 text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60"
                      >
                        <span className="min-w-0">
                          <span className="font-mono text-xs text-zinc-400">
                            EP{chapter.id}
                          </span>
                          <span className="ml-2 text-zinc-700 dark:text-zinc-200">
                            {chapter.title}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="shrink-0 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
