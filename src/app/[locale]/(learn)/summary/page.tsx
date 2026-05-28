"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileText,
  Layers3,
  Route,
} from "lucide-react";
import { COURSE_SUMMARIES, findGlossaryTerm, localizeText } from "@/data/course-guides";
import { getVersionMeta } from "@/lib/constants";
import { localizeBridge } from "@/data/course-map";
import { COURSE_BRIDGES } from "@/data/course-map";
import { useLocale, useTranslations } from "@/lib/i18n";
import { LayerBadge } from "@/components/ui/badge";

const PAGE_COPY = {
  en: {
    eyebrow: "Middle summary layer",
    title: "From lesson mechanics to production reading",
    intro:
      "Use this layer between the runnable lab and the advanced anatomy chapters. Each row gives the teaching focus, the minimal mechanism, the production bridge, and a checkpoint question.",
    how: "How to use it",
    howItems: [
      "Open this page before a session to anchor the mental model.",
      "Use the checkpoint as the discussion question before live-coding.",
      "Jump from each glossary term when students need vocabulary before the advanced reading.",
    ],
    focus: "Focus",
    model: "Mental model",
    lab: "Lab mechanism",
    production: "Production bridge",
    checkpoint: "Checkpoint",
    glossary: "Glossary",
    openLesson: "Open lesson",
    openSlides: "Slides",
  },
  zh: {
    eyebrow: "中间摘要层",
    title: "从实验机制过渡到生产系统阅读",
    intro:
      "这一层放在可运行实验课和高级系统解剖之间。每一行给出讲课重点、最小机制、生产映射和检查点问题，方便 keynote、讲解和课后复盘。",
    how: "怎么用",
    howItems: [
      "每节课开始前先打开这一页，锁定本节课的心智模型。",
      "用检查点问题作为 live-coding 前的讨论题。",
      "学生缺术语时，直接跳到对应 glossary，再回来读高级章节。",
    ],
    focus: "本节重点",
    model: "心智模型",
    lab: "实验机制",
    production: "生产映射",
    checkpoint: "检查点",
    glossary: "术语",
    openLesson: "打开课程",
    openSlides: "幻灯片",
  },
  ja: {
    eyebrow: "中間サマリーレイヤー",
    title: "ラボの仕組みから実システム読解へ",
    intro:
      "この層は runnable lab と advanced anatomy の間に置きます。各行は講義の焦点、最小メカニズム、本番システムへの橋渡し、確認質問を示します。",
    how: "使い方",
    howItems: [
      "セッション前に開き、メンタルモデルを固定する。",
      "チェックポイントを live-coding 前の議論に使う。",
      "語彙が足りない時は glossary に飛び、advanced reading に戻る。",
    ],
    focus: "焦点",
    model: "メンタルモデル",
    lab: "ラボの仕組み",
    production: "本番への橋渡し",
    checkpoint: "チェックポイント",
    glossary: "用語",
    openLesson: "レッスン",
    openSlides: "スライド",
  },
};

export default function SummaryPage() {
  const locale = useLocale();
  const copy = locale === "zh" ? PAGE_COPY.zh : locale === "ja" ? PAGE_COPY.ja : PAGE_COPY.en;
  const tSession = useTranslations("sessions");

  return (
    <div className="space-y-10 py-4">
      <header className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
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
            <Route size={17} />
            {copy.how}
          </div>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {copy.howItems.map((item, index) => (
              <li key={item} className="flex gap-2">
                <span className="font-mono text-xs text-zinc-400">{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </aside>
      </header>

      <section className="space-y-4">
        {COURSE_SUMMARIES.map((summary) => {
          const meta = getVersionMeta(summary.version, locale);
          const bridge = COURSE_BRIDGES.find((item) => item.version === summary.version);
          const localizedBridge = bridge ? localizeBridge(bridge, locale) : null;

          return (
            <article
              key={summary.version}
              className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <LayerBadge layer={meta.layer}>{summary.version}</LayerBadge>
                    <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                      {tSession(summary.version) || meta.title}
                    </h2>
                  </div>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {localizeText(summary.focus, locale)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/${locale}/${summary.version}`}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <BookOpenCheck size={15} />
                    {copy.openLesson}
                  </Link>
                  <Link
                    href={`/${locale}/slides/${summary.version}`}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <FileText size={15} />
                    {copy.openSlides}
                  </Link>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <SummaryBlock icon={<Layers3 size={16} />} label={copy.model}>
                  {localizeText(summary.mentalModel, locale)}
                </SummaryBlock>
                <SummaryBlock icon={<ArrowRight size={16} />} label={copy.lab}>
                  {localizeText(summary.labMechanism, locale)}
                </SummaryBlock>
                <SummaryBlock icon={<ArrowRight size={16} />} label={copy.production}>
                  {localizedBridge?.bridge || localizeText(summary.productionBridge, locale)}
                </SummaryBlock>
                <SummaryBlock icon={<CheckCircle2 size={16} />} label={copy.checkpoint}>
                  {localizeText(summary.checkpoint, locale)}
                </SummaryBlock>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {copy.glossary}
                </span>
                {summary.glossary.map((termId) => {
                  const term = findGlossaryTerm(termId);
                  if (!term) return null;
                  return (
                    <Link
                      key={termId}
                      href={`/${locale}/glossary#${termId}`}
                      className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      {term.term}
                    </Link>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function SummaryBlock({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/40">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
        {children}
      </p>
    </div>
  );
}
