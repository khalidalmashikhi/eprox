import type { MetadataRoute } from "next";
import { locales, pageSegments, localePath, siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const segments: ("" | (typeof pageSegments)[number])[] = ["", ...pageSegments];

  return locales.flatMap((locale) =>
    segments.map((seg) => ({
      url: `${siteConfig.url}${localePath(locale, seg || undefined)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: seg === "" ? (locale === "ar" ? 1 : 0.9) : 0.7,
      alternates: {
        languages: {
          ar: `${siteConfig.url}${localePath("ar", seg || undefined)}`,
          en: `${siteConfig.url}${localePath("en", seg || undefined)}`,
        },
      },
    })),
  );
}
