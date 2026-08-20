import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Instagram, Globe, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/content";
import { localePath, siteConfig, type Locale, type PageSegment } from "@/config/site";
import { contactConfig, instagramDisplay, telHref, phoneLabel } from "@/config/contact";
import { LanguageLink } from "@/components/navigation/LanguageLink";

const navKeys: { seg: PageSegment; key: keyof Dictionary["nav"] }[] = [
  { seg: "parts", key: "parts" },
  { seg: "repair", key: "repair" },
  { seg: "wholesale", key: "wholesale" },
  { seg: "about", key: "about" },
  { seg: "contact", key: "contact" },
];

const legalKeys: { seg: PageSegment; labelAr: string; labelEn: string }[] = [
  { seg: "privacy", labelAr: "سياسة الخصوصية", labelEn: "Privacy Policy" },
  { seg: "terms", labelAr: "الشروط والأحكام", labelEn: "Terms & Conditions" },
];

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const year = new Date().getFullYear();
  const c = contactConfig;

  const igLabel = locale === "ar" ? "إنستغرام EPROX" : "EPROX on Instagram";
  const contactLinks = [
    ...c.phones.map((p, i) => ({
      key: `ph${i}`,
      role: phoneLabel(p, locale),
      label: p.display,
      href: telHref(p.number),
      icon: Phone,
      external: false,
      ariaLabel: `${phoneLabel(p, locale)}: ${p.display}`,
    })),
    c.email && { key: "em", role: "", label: c.email, href: `mailto:${c.email}`, icon: Mail, external: false, ariaLabel: c.email },
    { key: "web", role: "", label: siteConfig.domain, href: siteConfig.url, icon: Globe, external: true, ariaLabel: siteConfig.domain },
    c.instagramUrl && { key: "ig", role: "", label: instagramDisplay, href: c.instagramUrl, icon: Instagram, external: true, ariaLabel: igLabel },
  ].filter(Boolean) as { key: string; role: string; label: string; href: string; icon: LucideIcon; external: boolean; ariaLabel: string }[];

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* subtle brand glow */}
      <div
        className="pointer-events-none absolute -top-24 start-1/4 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(125,20,24,0.55), transparent 65%)" }}
        aria-hidden
      />
      <div className="container-x relative">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr] lg:gap-10">
          {/* brand — the visual anchor */}
          <div className="max-w-sm">
            {/* Dedicated white "reverse" brand asset for dark backgrounds —
                a real derived logo file, not a CSS colour filter. */}
            <a href="#home" className="inline-flex" aria-label="EPROX — home">
              <Image
                src="/brand/eprox-logo-white.png"
                alt="EPROX"
                width={336}
                height={140}
                className="h-auto w-[142px] object-contain"
              />
            </a>
            <p className="mt-7 max-w-xs text-[1rem] font-medium leading-relaxed text-white/85">
              {dict.footer.descriptor}
            </p>
            <p className="mt-1.5 text-[0.82rem] tracking-wide text-white/45">{dict.footer.builtLine}</p>
          </div>

          {/* nav */}
          <nav aria-label="Footer">
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/40 rtl:tracking-normal">
              {dict.footer.navTitle}
            </h3>
            <ul className="mt-6 grid gap-3.5">
              {navKeys.map(({ seg, key }) => (
                <li key={seg}>
                  <Link
                    href={localePath(locale, seg)}
                    className="inline-block text-[0.92rem] text-white/70 transition-colors hover:text-white"
                  >
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact + language */}
          <div>
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/40 rtl:tracking-normal">
              {dict.footer.contactTitle}
            </h3>
            {contactLinks.length > 0 ? (
              <ul className="mt-6 grid gap-3.5">
                {contactLinks.map((l) => (
                  <li key={l.key}>
                    <a
                      href={l.href}
                      aria-label={l.ariaLabel}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group inline-flex items-start gap-2 text-white/70 transition-colors hover:text-white"
                    >
                      <l.icon className="mt-0.5 h-4 w-4 shrink-0 text-white/50" strokeWidth={1.7} />
                      <span className="leading-tight">
                        {l.role ? (
                          <span className="block text-[0.68rem] font-medium text-white/40">{l.role}</span>
                        ) : null}
                        <span dir="ltr" className="block text-[0.92rem]">{l.label}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <Link
                href={localePath(locale, "contact")}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-[0.9rem] font-medium text-white transition-colors hover:bg-white/15"
              >
                {dict.nav.contact}
              </Link>
            )}
            <div className="mt-7">
              <LanguageLink
                locale={locale}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
              />
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />
        <div className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-start">
          <p className="text-[0.82rem] text-white/45">
            {dict.footer.rights.replace("EPROX.", `EPROX ${year}.`)}
          </p>
          <div className="flex items-center gap-5">
            {legalKeys.map(({ seg, labelAr, labelEn }) => (
              <Link
                key={seg}
                href={localePath(locale, seg)}
                className="text-[0.82rem] text-white/45 transition-colors hover:text-white/80"
              >
                {locale === "ar" ? labelAr : labelEn}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
