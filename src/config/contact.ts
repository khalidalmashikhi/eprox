/**
 * EPROX contact details.
 *
 * Fill in the real values below. Any field left as an empty string ("")
 * is treated as "not provided" — the matching button / link is hidden
 * automatically, and the contact section still renders as an intentional,
 * balanced layout. No placeholder text is ever shown to visitors.
 *
 * - phone / whatsapp: digits only, international format WITHOUT the "+"
 *   e.g. "9665XXXXXXXX". Used to build tel: and wa.me links.
 * - email: a plain address, e.g. "hello@eprox.com".
 * - instagramUrl / mapsUrl: full https URLs.
 * - hoursAr / hoursEn: short working-hours line, e.g. "السبت - الخميس · 10ص - 10م".
 */
export interface ContactConfig {
  phone: string;
  whatsapp: string;
  email: string;
  instagramUrl: string;
  mapsUrl: string;
  addressAr: string;
  addressEn: string;
  hoursAr: string;
  hoursEn: string;
}

export const contactConfig: ContactConfig = {
  phone: "",
  whatsapp: "",
  email: "",
  instagramUrl: "",
  mapsUrl: "",
  addressAr: "",
  addressEn: "",
  hoursAr: "",
  hoursEn: "",
};

export const hasAnyContact = Object.values(contactConfig).some(
  (value) => value.trim() !== "",
);

/** Build a wa.me link, optionally with a prefilled message. */
export function whatsappLink(number: string, message?: string): string {
  const digits = number.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
