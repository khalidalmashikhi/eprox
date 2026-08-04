import type { Locale } from "@/config/site";
import type { PagesDict } from "./types";
import { pagesAr } from "./ar";
import { pagesEn } from "./en";

const pages: Record<Locale, PagesDict> = { ar: pagesAr, en: pagesEn };

export function getPages(locale: Locale): PagesDict {
  return pages[locale];
}

export type * from "./types";
