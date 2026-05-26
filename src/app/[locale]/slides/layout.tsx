import { ReactNode } from "react";

interface SlidesLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function SlidesLayout({
  children,
  params,
}: SlidesLayoutProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {children}
    </div>
  );
}
