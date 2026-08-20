export const siteConfig = {
  name: "EPROX",
  domain: "eprox.net",
  // Canonical production URL (Netlify). Single source of truth for
  // metadataBase, canonical/hreflang, Open Graph, sitemap and robots.
  url: "https://eprox.net",
  descriptorAr: "للحلول الفنية والتقنية",
  descriptorEn: "Technical & Technology Solutions",
  brandColor: "#540A09",
} as const;

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

/** Section anchors — shared across nav, footer and language switching. */
export const sectionIds = [
  "home",
  "services",
  "parts",
  "repair",
  "wholesale",
  "why",
  "about",
  "contact",
] as const;

/** The sections shown as primary navigation entries, in reading order. */
export const navSectionIds = [
  "home",
  "parts",
  "repair",
  "wholesale",
  "about",
] as const;

export type SectionId = (typeof sectionIds)[number];

/** Real page routes (segment relative to the locale root). */
export const pageSegments = [
  "parts",
  "repair",
  "wholesale",
  "about",
  "contact",
  "privacy",
  "terms",
] as const;
export type PageSegment = (typeof pageSegments)[number];

/** Primary navigation entries → real routes. Empty seg = home. */
export const navRoutes: { seg: "" | PageSegment; key: keyof NavDict }[] = [
  { seg: "", key: "home" },
  { seg: "parts", key: "parts" },
  { seg: "repair", key: "repair" },
  { seg: "wholesale", key: "wholesale" },
  { seg: "about", key: "about" },
];

type NavDict = {
  home: string;
  parts: string;
  repair: string;
  wholesale: string;
  about: string;
  contact: string;
};

/** Build a locale-prefixed path for a route segment ("" → locale home). */
export function localePath(locale: Locale, seg: "" | PageSegment = ""): string {
  return seg ? `/${locale}/${seg}` : `/${locale}`;
}
