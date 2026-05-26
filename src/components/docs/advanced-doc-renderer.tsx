"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "@/lib/i18n";
import advancedDocsData from "@/data/generated/advanced-docs.json";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

interface AdvancedDocRendererProps {
  chapter: string;
}

function renderMarkdown(md: string): string {
  const result = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight, { detect: false, ignoreMissing: true })
    .use(rehypeStringify)
    .processSync(md);
  return String(result);
}

function postProcessHtml(html: string): string {
  html = html.replace(
    /<pre><code class="hljs language-(\w+)">/g,
    '<pre class="code-block" data-language="$1"><code class="hljs language-$1">'
  );
  html = html.replace(
    /<pre><code(?! class="hljs)([^>]*)>/g,
    '<pre class="ascii-diagram"><code$1>'
  );
  html = html.replace(/<blockquote>/, '<blockquote class="hero-callout">');

  html = html.replace(/src="(?:\.\.\/)+(?:assets|docs\/assets)\//g, 'src="/advanced-assets/');
  html = html.replace(/src="\/assets\//g, 'src="/advanced-assets/');
  html = html.replace(/href="\.\/(\d{2}-[^"#]+?)(?:\.md)?(#.*?)?"/g, 'href="$1$2"');
  html = html.replace(/href="\.\.\/assets\//g, 'href="/advanced-assets/');
  html = html.replace(/<p>\s*🌐[\s\S]*?<\/p>\n?/g, "");
  html = html.replace(/<p>\s*📖[\s\S]*?<\/p>\n?/g, "");

  return html;
}

export function AdvancedDocRenderer({ chapter }: AdvancedDocRendererProps) {
  const locale = useLocale();
  const t = useTranslations("advanced");
  const normalizedLocale = locale === "zh" ? "zh" : "en";

  const doc = useMemo(() => {
    const docs = advancedDocsData as {
      chapter: string;
      locale: string;
      title: string;
      content: string;
    }[];
    return (
      docs.find((item) => item.chapter === chapter && item.locale === normalizedLocale) ??
      docs.find((item) => item.chapter === chapter && item.locale === "en")
    );
  }, [chapter, normalizedLocale]);

  const html = useMemo(() => {
    if (!doc) return "";
    return postProcessHtml(renderMarkdown(doc.content));
  }, [doc]);

  if (!doc) {
    return (
      <div className="rounded-lg border border-zinc-200 p-6 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        {t("not_found")}
      </div>
    );
  }

  return (
    <article className="py-4">
      <div className="prose-custom" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
