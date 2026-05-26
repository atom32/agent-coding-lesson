import { notFound } from "next/navigation";
import { SlideDeck } from "@/components/slides/SlideDeck";
import { VERSION_META, VERSION_ORDER } from "@/lib/constants";
import type { SlideDeck as SlideDeckData } from "@/types/slides";

interface SlidesPageProps {
  params: Promise<{
    locale: string;
    session: string;
  }>;
}

async function getSlideData(session: string, locale: string): Promise<SlideDeckData | null> {
  try {
    const data = await import(
      `@/data/slides/auto-generated/${session}.json`
    );
    return data.default as SlideDeckData;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const locales = ["en", "zh", "ja"];

  return locales.flatMap((locale) =>
    VERSION_ORDER.map((session) => ({
      locale,
      session,
    }))
  );
}

export default async function SlidesPage({
  params,
}: SlidesPageProps) {
  const { session, locale } = await params;

  // Validate session exists
  if (!VERSION_ORDER.includes(session as any)) {
    notFound();
  }

  const deckData = await getSlideData(session, locale);

  if (!deckData) {
    notFound();
  }

  return <SlideDeck deckData={deckData} />;
}

export async function generateMetadata({ params }: SlidesPageProps) {
  const { session, locale } = await params;
  const meta = VERSION_META[session];

  return {
    title: `${meta.title} - Slides`,
    description: meta.subtitle,
  };
}
