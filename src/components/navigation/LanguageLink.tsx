"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { Languages } from "lucide-react";
import type { Locale } from "@/config/site";

/**
 * Switches between /ar and /en, preserving the current section hash so the
 * visitor stays where they were after the language change.
 */
export function LanguageLink({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const other: Locale = locale === "ar" ? "en" : "ar";
  const label = other === "ar" ? "العربية" : "English";

  const onClick = useCallback(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const base = pathname.replace(/^\/(ar|en)/, `/${other}`);
    router.push(`${base}${hash}`);
  }, [pathname, other, router]);

  return (
    <button type="button" onClick={onClick} className={className} aria-label={label}>
      <Languages className="h-4 w-4" strokeWidth={1.7} />
      {label}
    </button>
  );
}
