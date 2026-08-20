/**
 * EPROX contact details — single source of truth.
 *
 * Any field left empty ("" or []) is treated as "not provided": the matching
 * link is hidden automatically, and the layout still reads as intentional.
 *
 * - phones: business numbers with confirmed roles. `number` is tel-ready
 *   (international, with "+"); `display` is the human-formatted string.
 * - whatsapp: digits only, WITHOUT the "+". Empty for now — no number has
 *   been assigned to WhatsApp yet.
 * - email: a plain address, e.g. "info@eprox.net".
 * - instagramUrl: full profile URL. instagramHandle drives the "@handle" label.
 * - mapsUrl / address / hours: left empty until confirmed.
 */
export interface Phone {
  /** tel-ready number, e.g. "+96895294000". */
  number: string;
  /** human-formatted display, e.g. "+968 9529 4000". */
  display: string;
  labelAr: string;
  labelEn: string;
}

export interface ContactConfig {
  phones: Phone[];
  whatsapp: string;
  email: string;
  instagramUrl: string;
  instagramHandle: string;
  mapsUrl: string;
  addressAr: string;
  addressEn: string;
  hoursAr: string;
  hoursEn: string;
}

export const contactConfig: ContactConfig = {
  phones: [
    { number: "+96895294000", display: "+968 9529 4000", labelAr: "المبيعات", labelEn: "Sales" },
    { number: "+96894470222", display: "+968 9447 0222", labelAr: "الصيانة", labelEn: "Service" },
  ],
  whatsapp: "",
  email: "info@eprox.net",
  instagramUrl: "https://www.instagram.com/eprox.om/",
  instagramHandle: "eprox.om",
  mapsUrl: "",
  addressAr: "",
  addressEn: "",
  hoursAr: "",
  hoursEn: "",
};

export const hasAnyContact =
  contactConfig.phones.length > 0 ||
  [contactConfig.whatsapp, contactConfig.email, contactConfig.instagramUrl].some(
    (value) => value.trim() !== "",
  );

/** tel: link from a number — keeps the leading "+", strips spaces/separators. */
export function telHref(number: string): string {
  return `tel:${number.replace(/[^\d+]/g, "")}`;
}

/** Localized role label for a phone. */
export function phoneLabel(phone: Phone, locale: "ar" | "en"): string {
  return locale === "ar" ? phone.labelAr : phone.labelEn;
}

/** Visible Instagram label, e.g. "@eprox.om" (empty when not configured). */
export const instagramDisplay = contactConfig.instagramHandle
  ? `@${contactConfig.instagramHandle}`
  : "";

/** Build a wa.me link, optionally with a prefilled message. */
export function whatsappLink(number: string, message?: string): string {
  const digits = number.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
