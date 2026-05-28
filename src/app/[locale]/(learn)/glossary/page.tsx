"use client";

import Link from "next/link";
import { BookMarked, Hash, Search } from "lucide-react";
import { GLOSSARY_TERMS, localizeText } from "@/data/course-guides";
import { getVersionMeta } from "@/lib/constants";
import { useLocale, useTranslations } from "@/lib/i18n";
import { LayerBadge } from "@/components/ui/badge";

const PAGE_COPY = {
  en: {
    eyebrow: "Glossary",
    title: "Agent harness vocabulary",
    intro:
      "A compact reference for the terms that appear across the lab lessons, speaker notes, and production anatomy chapters.",
    termCount: "terms",
    definition: "Definition",
    why: "Why it matters",
    appearsIn: "Appears in",
    summary: "Use with summary layer",
  },
  zh: {
    eyebrow: "术语表",
    title: "Agent Harness 词汇表",
    intro:
      "这里收拢实验课、speaker notes 和真实系统解剖里反复出现的基础术语。讲课时先把词讲准，后面的高级章节会顺很多。",
    termCount: "个术语",
    definition: "定义",
    why: "为什么重要",
    appearsIn: "出现课程",
    summary: "配合中间摘要层使用",
  },
  ja: {
    eyebrow: "Glossary",
    title: "Agent harness vocabulary",
    intro:
      "ラボ、speaker notes、production anatomy で繰り返し出る用語をまとめた参照ページです。",
    termCount: "terms",
    definition: "定義",
    why: "重要性",
    appearsIn: "関連セッション",
    summary: "summary layer と併用",
  },
};

export default function GlossaryPage() {
  const locale = useLocale();
  const copy = locale === "zh" ? PAGE_COPY.zh : locale === "ja" ? PAGE_COPY.ja : PAGE_COPY.en;
  const tSession = useTranslations("sessions");
  const sortedTerms = [...GLOSSARY_TERMS].sort((a, b) =>
    a.term.localeCompare(b.term)
  );

  return (
    <div className="space-y-10 py-4">
      <header className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {copy.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {copy.title}
          </h1>
          <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-300">
            {copy.intro}
          </p>
        </div>
        <aside className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            <Search size={17} />
            {GLOSSARY_TERMS.length} {copy.termCount}
          </div>
          <Link
            href={`/${locale}/summary`}
            className="mt-4 inline-flex min-h-[40px] items-center gap-2 rounded-md border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-white dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <BookMarked size={15} />
            {copy.summary}
          </Link>
        </aside>
      </header>

      <nav className="flex flex-wrap gap-2">
        {sortedTerms.map((term) => (
          <a
            key={term.id}
            href={`#${term.id}`}
            className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {term.term}
          </a>
        ))}
      </nav>

      <section className="grid gap-4 xl:grid-cols-2">
        {sortedTerms.map((term) => (
          <article
            key={term.id}
            id={term.id}
            className="scroll-mt-24 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Hash size={16} className="shrink-0 text-zinc-400" />
                  <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    {term.term}
                  </h2>
                </div>
                {term.aliases && term.aliases.length > 0 && (
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {term.aliases.join(" / ")}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <GlossaryBlock label={copy.definition}>
                {localizeText(term.definition, locale)}
              </GlossaryBlock>
              <GlossaryBlock label={copy.why}>
                {localizeText(term.whyItMatters, locale)}
              </GlossaryBlock>
            </div>

            <div className="mt-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {copy.appearsIn}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {term.sessions.map((session) => {
                  const meta = getVersionMeta(session, locale);
                  return (
                    <Link
                      key={session}
                      href={`/${locale}/${session}`}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-medium transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                      <LayerBadge layer={meta.layer}>{session}</LayerBadge>
                      <span className="text-zinc-600 dark:text-zinc-300">
                        {tSession(session) || meta.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function GlossaryBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        {label}
      </div>
      <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
        {children}
      </p>
    </section>
  );
}
