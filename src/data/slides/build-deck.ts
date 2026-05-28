import docsData from "@/data/generated/docs.json";
import versionsData from "@/data/generated/versions.json";
import { COURSE_SUMMARIES, localizeText } from "@/data/course-guides";
import { VERSION_ORDER, getVersionMeta } from "@/lib/constants";
import type { SlideDeck, CodeSlide } from "@/types/slides";

type Locale = "en" | "zh" | "ja";

const COPY: Record<
  Locale,
  {
    problem: string;
    solution: string;
    flow: string;
    flowDesc: (title: string) => string;
    demo: string;
    demoDesc: (title: string) => string;
    summary: string;
    next: string;
    core: string;
    implementation: string;
    nextBuildsOn: (title: string) => string;
  }
> = {
  en: {
    problem: "The Problem",
    solution: "The Solution",
    flow: "Execution Flow",
    flowDesc: (title) => `Flow diagram showing ${title}.`,
    demo: "See It In Action",
    demoDesc: (title) => `Interactive demo of ${title}.`,
    summary: "Key Takeaways",
    next: "Coming Up Next",
    core: "Core mechanism",
    implementation: "Implementation",
    nextBuildsOn: (title) => `Building on ${title}`,
  },
  zh: {
    problem: "问题",
    solution: "解决方案",
    flow: "执行流程",
    flowDesc: (title) => `${title} 的执行流程图。`,
    demo: "现场演示",
    demoDesc: (title) => `${title} 的交互式演示。`,
    summary: "关键收获",
    next: "下一节预告",
    core: "核心机制",
    implementation: "实现",
    nextBuildsOn: (title) => `承接 ${title}`,
  },
  ja: {
    problem: "問題",
    solution: "解決策",
    flow: "実行フロー",
    flowDesc: (title) => `${title} の実行フロー図。`,
    demo: "動かして見る",
    demoDesc: (title) => `${title} のインタラクティブデモ。`,
    summary: "重要ポイント",
    next: "次のセッション",
    core: "中核メカニズム",
    implementation: "実装",
    nextBuildsOn: (title) => `${title} を土台にする`,
  },
};

const SECTION_ALIASES = {
  problem: ["problem", "问题", "問題"],
  solution: ["solution", "解决方案", "解決策"],
  how: ["how it works", "工作原理", "仕組み"],
  changed: ["what changed", "变更内容", "変更点"],
};

export function buildSlideDeck(session: string, locale: string): SlideDeck | null {
  if (!VERSION_ORDER.includes(session as any)) return null;

  const normalizedLocale = normalizeLocale(locale);
  const copy = COPY[normalizedLocale];
  const meta = getVersionMeta(session, normalizedLocale);
  const versionData = (versionsData as any).versions.find(
    (version: { id: string }) => version.id === session
  );
  const doc = findDoc(session, normalizedLocale);

  if (!meta || !versionData || !doc) return null;

  const docTitle = cleanDocTitle(doc.title, session, normalizedLocale);
  const title =
    normalizedLocale === "zh" && !containsCjk(docTitle)
      ? meta.title
      : docTitle || meta.title;
  const separator = normalizedLocale === "en" ? ": " : "：";
  const problemSection = getSection(doc.content, SECTION_ALIASES.problem);
  const solutionSection = getSection(doc.content, SECTION_ALIASES.solution);
  const howSection = getSection(doc.content, SECTION_ALIASES.how);
  const changedSection = getSection(doc.content, SECTION_ALIASES.changed);
  const summaryGuide = COURSE_SUMMARIES.find((item) => item.version === session);

  const problemText =
    firstPresentationText(problemSection, normalizedLocale) ||
    meta.keyInsight;
  const solutionText =
    firstPresentationText(solutionSection, normalizedLocale) ||
    `${copy.core}: ${meta.coreAddition}`;
  const context = sectionBullets(problemSection, normalizedLocale, 3);
  const principles = uniqueNonEmpty([
    meta.keyInsight,
    `${copy.core}${separator}${meta.coreAddition}`,
    firstPresentationText(howSection || changedSection, normalizedLocale, 180),
  ]).slice(0, 3);

  const sessionNum = Number.parseInt(session.slice(1), 10);
  const nextSessionNum = sessionNum + 1;
  const nextSession =
    nextSessionNum <= VERSION_ORDER.length
      ? `s${String(nextSessionNum).padStart(2, "0")}`
      : null;
  const nextMeta = nextSession ? getVersionMeta(nextSession, normalizedLocale) : null;
  const nextDoc = nextSession ? findDoc(nextSession, normalizedLocale) : null;
  const nextDocTitle = nextDoc
    ? cleanDocTitle(nextDoc.title, nextSession!, normalizedLocale)
    : "";
  const nextTitle =
    nextMeta && normalizedLocale === "zh" && !containsCjk(nextDocTitle)
      ? nextMeta.title
      : nextDocTitle || nextMeta?.title;

  const slides: SlideDeck["slides"] = [
    {
      id: `${session}-01`,
      type: "title",
      session,
      locale: normalizedLocale,
      title,
      subtitle: meta.subtitle,
      motto: meta.keyInsight,
      sessionNumber: sessionNum,
      totalSessions: VERSION_ORDER.length,
      speakerNotes: buildSpeakerNotes(normalizedLocale, "title", {
        title,
        meta,
        summaryGuide,
      }),
    },
    {
      id: `${session}-02`,
      type: "problem",
      session,
      locale: normalizedLocale,
      title: `${copy.problem}${separator}${title}`,
      problem: problemText,
      context,
      speakerNotes: buildSpeakerNotes(normalizedLocale, "problem", {
        title,
        problemText,
        meta,
        summaryGuide,
      }),
    },
    {
      id: `${session}-03`,
      type: "solution",
      session,
      locale: normalizedLocale,
      title: `${copy.solution}${separator}${meta.coreAddition}`,
      solution: solutionText,
      principles,
      speakerNotes: buildSpeakerNotes(normalizedLocale, "solution", {
        title,
        meta,
        summaryGuide,
        principles,
      }),
    },
  ];

  const codeSlide = buildCodeSlide(
    versionData,
    session,
    normalizedLocale,
    `${copy.implementation}: ${primaryFunctionName(versionData) || versionData.filename}`,
    `${primaryFunctionName(versionData) || versionData.filename}: ${meta.coreAddition}`,
    buildSpeakerNotes(normalizedLocale, "code", {
      title,
      meta,
      summaryGuide,
      functionName: primaryFunctionName(versionData) || versionData.filename,
    })
  );
  if (codeSlide) slides.push(codeSlide);

  slides.push(
    {
      id: `${session}-${String(slides.length + 1).padStart(2, "0")}`,
      type: "diagram",
      session,
      locale: normalizedLocale,
      title: copy.flow,
      description: copy.flowDesc(title),
      flowId: session,
      speakerNotes: buildSpeakerNotes(normalizedLocale, "diagram", {
        title,
        meta,
        summaryGuide,
      }),
    },
    {
      id: `${session}-${String(slides.length + 2).padStart(2, "0")}`,
      type: "demo",
      session,
      locale: normalizedLocale,
      title: copy.demo,
      description: copy.demoDesc(title),
      simulatorType: "agent-loop",
      scenarioId: session,
      speakerNotes: buildSpeakerNotes(normalizedLocale, "demo", {
        title,
        meta,
        summaryGuide,
      }),
    },
    {
      id: `${session}-${String(slides.length + 3).padStart(2, "0")}`,
      type: "summary",
      session,
      locale: normalizedLocale,
      title: copy.summary,
      takeaways: uniqueNonEmpty([
        meta.keyInsight,
        `${copy.core}${separator}${meta.coreAddition}`,
        firstPresentationText(changedSection, normalizedLocale, 180),
      ]).slice(0, 4),
      speakerNotes: buildSpeakerNotes(normalizedLocale, "summary", {
        title,
        meta,
        summaryGuide,
      }),
    }
  );

  if (nextSession && nextMeta && nextTitle) {
    slides.push({
      id: `${session}-${String(slides.length + 1).padStart(2, "0")}`,
      type: "next",
      session,
      locale: normalizedLocale,
      title: copy.next,
      nextSessionTitle: nextTitle,
      nextSessionId: nextSession,
      preview: uniqueNonEmpty([
        nextMeta.coreAddition,
        nextMeta.keyInsight,
        copy.nextBuildsOn(title),
      ]).slice(0, 3),
      speakerNotes: buildSpeakerNotes(normalizedLocale, "next", {
        title,
        nextTitle,
        meta: nextMeta,
        summaryGuide,
      }),
    });
  }

  return {
    session,
    locale: normalizedLocale,
    slides,
    metadata: {
      title,
      subtitle: meta.subtitle,
      duration: 15,
      difficulty:
        sessionNum <= 4
          ? "beginner"
          : sessionNum <= 8
            ? "intermediate"
            : "advanced",
      dependencies: meta.prevVersion ? [meta.prevVersion] : [],
    },
  };
}

function normalizeLocale(locale: string): Locale {
  if (locale === "zh" || locale === "ja") return locale;
  return "en";
}

function findDoc(version: string, locale: Locale) {
  const docs = docsData as {
    version: string;
    locale: string;
    title: string;
    content: string;
  }[];
  return (
    docs.find((doc) => doc.version === version && doc.locale === locale) ??
    docs.find((doc) => doc.version === version && doc.locale === "en")
  );
}

function cleanDocTitle(title: string, session: string, locale: Locale): string {
  const withoutSession = title.replace(new RegExp(`^${session}:\\s*`, "i"), "").trim();
  const localized = withoutSession.match(/\(([^)]+)\)\s*$/)?.[1]?.trim();
  if (locale === "zh" && localized) return localized;
  return withoutSession.replace(/\s*\([^)]+\)\s*$/, "").trim();
}

function containsCjk(value: string): boolean {
  return /[\u3400-\u9fff]/.test(value);
}

function getSection(content: string, aliases: string[]): string {
  const lines = content.split(/\r?\n/);
  let collecting = false;
  const collected: string[] = [];

  for (const line of lines) {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      const normalized = normalizeHeading(heading[1]);
      if (collecting) break;
      collecting = aliases.some((alias) => normalized === normalizeHeading(alias));
      continue;
    }

    if (collecting) collected.push(line);
  }

  return collected.join("\n").trim();
}

function normalizeHeading(value: string): string {
  return value
    .replace(/[：:]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function firstPresentationText(
  markdown: string,
  locale: Locale,
  maxLength = 230
): string {
  const blocks = toPresentationBlocks(markdown);
  const best =
    blocks.find((block) => !looksLikeTable(block) && block.length >= 18) ??
    blocks[0] ??
    "";
  return limitText(best, locale, maxLength);
}

function sectionBullets(markdown: string, locale: Locale, limit: number): string[] {
  const blocks = toPresentationBlocks(markdown);
  return uniqueNonEmpty(blocks)
    .filter((block) => block.length > 12)
    .slice(1, limit + 1)
    .map((block) => limitText(block, locale, 150));
}

function toPresentationBlocks(markdown: string): string[] {
  const withoutCode = markdown
    .replace(/```[\s\S]*?```/g, "\n\n")
    .replace(/~~~[\s\S]*?~~~/g, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\r/g, "");

  return withoutCode
    .split(/\n\s*\n/)
    .flatMap((block) =>
      block.split(/\n(?=\s*(?:[-*]|\d+\.|[一二三四五六七八九十]+[、.])\s+)/)
    )
    .map(cleanInlineMarkdown)
    .filter(Boolean)
    .filter((block) => !looksLikeTable(block));
}

function cleanInlineMarkdown(value: string): string {
  return value
    .split("\n")
    .map((line) =>
      line
        .replace(/^\s*(?:[-*]|\d+\.|[一二三四五六七八九十]+[、.])\s+/, "")
        .trim()
    )
    .filter(Boolean)
    .join(" ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function looksLikeTable(value: string): boolean {
  return /^\|.*\|$/.test(value) || /\|[-: ]+\|/.test(value);
}

function limitText(value: string, locale: Locale, maxLength: number): string {
  const text = normalizePresentationPunctuation(value.trim(), locale);
  if (text.length <= maxLength) return text;

  const boundary = text.slice(0, maxLength).search(/[。！？.!?](?!.*[。！？.!?])/);
  if (boundary > maxLength * 0.45) return text.slice(0, boundary + 1);

  const suffix = locale === "en" ? "..." : "...";
  return `${text.slice(0, maxLength - suffix.length).trim()}${suffix}`;
}

function normalizePresentationPunctuation(value: string, locale: Locale): string {
  if (locale === "en") return value;
  return value
    .replace(/,/g, "，")
    .replace(/:/g, "：")
    .replace(/\s+--\s+/g, "；")
    .replace(/([，：；。！？])\s+/g, "$1")
    .replace(/\s+([，：；。！？])/g, "$1");
}

function uniqueNonEmpty(values: Array<string | undefined>): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    const normalized = value?.trim();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(normalized);
  }
  return result;
}

function buildSpeakerNotes(
  locale: Locale,
  slideType: "title" | "problem" | "solution" | "code" | "diagram" | "demo" | "summary" | "next",
  context: {
    title?: string;
    nextTitle?: string;
    problemText?: string;
    principles?: string[];
    functionName?: string;
    meta: {
      title: string;
      subtitle: string;
      coreAddition: string;
      keyInsight: string;
    };
    summaryGuide?: (typeof COURSE_SUMMARIES)[number];
  }
): string[] {
  const focus = context.summaryGuide
    ? localizeText(context.summaryGuide.focus, locale)
    : context.meta.keyInsight;
  const mentalModel = context.summaryGuide
    ? localizeText(context.summaryGuide.mentalModel, locale)
    : context.meta.keyInsight;
  const checkpoint = context.summaryGuide
    ? localizeText(context.summaryGuide.checkpoint, locale)
    : context.meta.keyInsight;

  if (locale === "zh") {
    const zhNotes: Record<typeof slideType, string[]> = {
      title: [
        `开场先把本节课定位成一个 harness 机制：${focus}`,
        `提醒听众不要只看代码行数，要看它新增了哪个运行时责任：${context.meta.coreAddition}`,
      ],
      problem: [
        `用一个具体失败场景引出问题：没有这个机制时，Agent 会在哪一步失控、卡住或污染上下文。`,
        context.problemText
          ? `这里不要逐字读 slide，改用自己的话复述：${context.problemText}`
          : `把问题落回本节心智模型：${mentalModel}`,
      ],
      solution: [
        `讲清楚解决方案不是“更聪明的 prompt”，而是把责任放进 harness：${context.meta.coreAddition}`,
        `可以点名本页原则里最重要的一条：${context.principles?.[0] || context.meta.keyInsight}`,
      ],
      code: [
        `先让听众找入口函数 ${context.functionName || "agent_loop"}，再沿着数据流读，不要从第一行读到最后一行。`,
        `强调这段代码展示的是机制骨架；生产系统会在它周围加策略、权限、日志和恢复。`,
      ],
      diagram: [
        `把图当成一次运行轨迹来讲：先指出状态在哪里，再指出控制权如何流动。`,
        `讲完后回到一句话：${mentalModel}`,
      ],
      demo: [
        `演示时故意放慢 tool_use 到 tool_result 的回合，让听众看到 harness 参与了每一步。`,
        `如果现场时间紧，只演示最能暴露边界条件的一次输入。`,
      ],
      summary: [
        `收束到本节 checkpoint：${checkpoint}`,
        `把本节机制和下一层生产复杂度连接起来，避免停留在玩具实现的满足感里。`,
      ],
      next: [
        `把下一节说成自然延伸：本节解决了 ${context.title || context.meta.title}，下一节进入 ${context.nextTitle || context.meta.title}。`,
        `提醒学生课后先复盘 summary layer，再进入高级阅读。`,
      ],
    };
    return zhNotes[slideType];
  }

  const enNotes: Record<typeof slideType, string[]> = {
    title: [
      `Frame this session as one harness responsibility: ${focus}`,
      `Point out the new runtime mechanism before showing code: ${context.meta.coreAddition}`,
    ],
    problem: [
      "Use a concrete failure mode: what breaks when the harness does not own this responsibility?",
      context.problemText || `Return to the mental model: ${mentalModel}`,
    ],
    solution: [
      `Make clear that the solution is runtime design, not a smarter prompt: ${context.meta.coreAddition}`,
      `Anchor the slide on: ${context.principles?.[0] || context.meta.keyInsight}`,
    ],
    code: [
      `Start at ${context.functionName || "agent_loop"} and trace data flow instead of reading top-to-bottom.`,
      "Name what production systems add around this skeleton: policy, permissions, logs, and recovery.",
    ],
    diagram: [
      "Read the diagram as one execution trace: where does state live and where does control move?",
      `Close the diagram with the mental model: ${mentalModel}`,
    ],
    demo: [
      "Slow down the handoff from tool_use to tool_result so the harness work is visible.",
      "If time is short, demo the input that exposes the boundary condition.",
    ],
    summary: [
      `End on the checkpoint question: ${checkpoint}`,
      "Connect the toy mechanism to the production pressure it prepares students to read.",
    ],
    next: [
      `Position the next session as the natural continuation from ${context.title || context.meta.title} to ${context.nextTitle || context.meta.title}.`,
      "Ask students to revisit the summary layer before opening the advanced reading.",
    ],
  };

  return enNotes[slideType];
}

function primaryFunctionName(versionData: any): string | null {
  return (
    versionData.functions?.find((fn: { name: string }) => fn.name === "agent_loop")
      ?.name ??
    versionData.functions?.find((fn: { name: string }) => fn.name.startsWith("run_"))
      ?.name ??
    versionData.functions?.[0]?.name ??
    null
  );
}

function buildCodeSlide(
  versionData: any,
  session: string,
  locale: Locale,
  title: string,
  annotation: string,
  speakerNotes: string[]
): CodeSlide | null {
  const name = primaryFunctionName(versionData);
  if (!name || !versionData.source) return null;

  const lines = String(versionData.source).split(/\r?\n/);
  const startIndex = lines.findIndex((line) =>
    new RegExp(`^def\\s+${name}\\s*\\(`).test(line)
  );
  if (startIndex < 0) return null;

  const startLine = startIndex + 1;
  const endLine = Math.min(findPythonBlockEnd(lines, startIndex), startLine + 20);

  return {
    id: `${session}-04`,
    type: "code",
    session,
    locale,
    title,
    code: {
      filename: versionData.filename,
      language: "python",
      startLine,
      endLine,
      snippet: lines.slice(startLine - 1, endLine).join("\n"),
      annotations: [
        {
          line: startLine,
          text: annotation,
          type: "explain",
        },
      ],
    },
    speakerNotes,
  };
}

function findPythonBlockEnd(lines: string[], startIndex: number): number {
  const indent = lines[startIndex].search(/\S/);
  for (let index = startIndex + 1; index < lines.length; index++) {
    const line = lines[index];
    if (!line.trim()) continue;
    const currentIndent = line.search(/\S/);
    if (currentIndent <= indent) return index;
  }
  return lines.length;
}
