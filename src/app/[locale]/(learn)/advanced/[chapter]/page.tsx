import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, FileText } from "lucide-react";
import { AdvancedDocRenderer } from "@/components/docs/advanced-doc-renderer";
import {
  ADVANCED_CHAPTER_LIST,
  localizeChapter,
  type AdvancedChapterId,
} from "@/data/course-map";
import {
  PROMPT_REFERENCE_SOURCE,
  PROMPT_REFERENCES,
  getPromptReferenceUrl,
} from "@/data/prompt-references";
import { getTranslations } from "@/lib/i18n-server";

const CHAPTERS = ADVANCED_CHAPTER_LIST;

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
  const promptReference = PROMPT_REFERENCES[current.id as AdvancedChapterId];

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

      {promptReference && (
        <section className="rounded-lg border border-violet-200 bg-violet-50 p-5 dark:border-violet-900/60 dark:bg-violet-950/20">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-500 dark:text-violet-300">
                {locale === "zh" ? "Prompt 补充材料" : "Prompt reference"}
              </p>
              <h2 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                {promptReference.angle}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                {promptReference.note}
              </p>
            </div>
            <a
              href={PROMPT_REFERENCE_SOURCE.repo}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-md border border-violet-200 bg-white/70 px-3 text-sm font-medium text-violet-700 transition-colors hover:bg-white dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-200 dark:hover:bg-violet-900/40"
            >
              <ExternalLink size={14} />
              {locale === "zh" ? "来源仓库" : "Source repo"}
            </a>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-violet-700/80 dark:text-violet-200/70">
            {locale === "zh"
              ? "这些条目是从 Claude Code npm 包抽取出的第三方 prompt reference，适合课堂对照阅读，不当作官方文档。"
              : PROMPT_REFERENCE_SOURCE.caveat}
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {promptReference.prompts.map((item) => (
              <a
                key={item.filename}
                href={getPromptReferenceUrl(item.filename)}
                target="_blank"
                rel="noopener"
                className="group rounded-md border border-violet-200 bg-white p-3 transition-colors hover:border-violet-300 hover:bg-violet-50 dark:border-violet-900/80 dark:bg-zinc-950/50 dark:hover:border-violet-700 dark:hover:bg-violet-950/30"
              >
                <div className="flex items-start gap-2">
                  <FileText size={15} className="mt-0.5 shrink-0 text-violet-500" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate text-sm font-semibold text-zinc-950 group-hover:underline dark:text-zinc-50">
                        {item.title}
                      </h3>
                      <ExternalLink size={12} className="shrink-0 text-zinc-400" />
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-zinc-400">
                      {item.filename}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs font-medium text-violet-700 dark:text-violet-300">
                  {item.role}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {item.reason}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

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
