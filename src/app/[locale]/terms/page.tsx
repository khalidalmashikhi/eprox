import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/config/site";
import { getPages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { LegalPageView } from "@/components/ui/LegalPageView";

function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const p = getPages(locale).terms;
  return buildMetadata({ locale, seg: "terms", title: p.meta.title, description: p.meta.description });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPageView content={getPages(locale).terms} locale={locale} />;
}
