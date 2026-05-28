import { notFound } from "next/navigation";
import { SlideDeck } from "@/components/slides/SlideDeck";
import { VERSION_ORDER, getVersionMeta } from "@/lib/constants";
import { buildSlideDeck } from "@/data/slides/build-deck";

interface SlidesPageProps {
  params: Promise<{
    locale: string;
    session: string;
  }>;
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

  const deckData = buildSlideDeck(session, locale);

  if (!deckData) {
    notFound();
  }

  return <SlideDeck deckData={deckData} />;
}

export async function generateMetadata({ params }: SlidesPageProps) {
  const { session, locale } = await params;
  const meta = getVersionMeta(session, locale);
  const deckData = buildSlideDeck(session, locale);

  return {
    title: `${deckData?.metadata.title ?? meta.title} - Slides`,
    description: meta.subtitle,
  };
}
