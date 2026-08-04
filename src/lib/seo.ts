import type { Metadata } from "next";
import { siteConfig, localePath, type Locale, type PageSegment } from "@/config/site";

/**
 * Build consistent, localized page metadata: canonical, hreflang alternates,
 * Open Graph and Twitter cards. `metadataBase` and icons are inherited from
 * the locale layout.
 */
export function buildMetadata({
  locale,
  seg,
  title,
  description,
}: {
  locale: Locale;
  seg?: PageSegment;
  title: string;
  description: string;
}): Metadata {
  const path = localePath(locale, seg);
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ar: localePath("ar", seg),
        en: localePath("en", seg),
        "x-default": localePath("ar", seg),
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      title,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
