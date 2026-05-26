import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AdvancedDocRenderer } from "@/components/docs/advanced-doc-renderer";
import {
  ADVANCED_CHAPTERS,
  localizeChapter,
  type AdvancedChapterId,
} from "@/data/course-map";
import { getTranslations } from "@/lib/i18n-server";

const CHAPTERS = Object.values(ADVANCED_CHAPTERS);

export function generateStaticParams() {
  return CHAPTERS.map((chapter) => ({ chapter: chapter.path }));
}

export default async function AdvancedChapterPage({
  params,
}: {
  params: Promise<{ locale: string; chapter: string }>;
}) {
  const { locale, chapter } = await params;
  const t = getTranslations(locale, "advanced");
  const currentIndex = CHAPTERS.findIndex((item) => item.path === chapter);
  const current = CHAPTERS[currentIndex]
    ? localizeChapter(CHAPTERS[currentIndex], locale)
    : null;

  if (!current) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">{t("not_found")}</h1>
        <p className="mt-2 text-zinc-500">{chapter}</p>
      </div>
    );
  }

  const prev =
    currentIndex > 0 ? localizeChapter(CHAPTERS[currentIndex - 1], locale) : null;
  const next =
    currentIndex < CHAPTERS.length - 1
      ? localizeChapter(CHAPTERS[currentIndex + 1], locale)
      : null;

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-4">
      <header className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <Link
          href={`/${locale}/curriculum`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft size={15} />
          {t("course_map")}
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-zinc-100 px-2.5 py-1 font-mono text-sm font-semibold dark:bg-zinc-800">
            EP{current.id}
          </span>
          <h1 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">
            {current.title}
          </h1>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {current.focus}
        </p>
      </header>

      <AdvancedDocRenderer chapter={current.id as AdvancedChapterId} />

      <nav className="flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
        {prev ? (
          <Link
            href={`/${locale}/advanced/${prev.path}`}
            className="group flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            <span>EP{prev.id} {prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/${locale}/advanced/${next.path}`}
            className="group flex items-center gap-2 text-right text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
          >
            <span>EP{next.id} {next.title}</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
