import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, Mail, Instagram, MapPin, Clock, Globe, ArrowUpRight, type LucideIcon } from "lucide-react";
import { locales, siteConfig, type Locale } from "@/config/site";
import { getPages } from "@/content/pages";
import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { contactConfig, instagramDisplay, telHref, phoneLabel } from "@/config/contact";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { InquiryForm } from "@/components/contact/InquiryForm";

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
  const p = getPages(locale).contact;
  return buildMetadata({ locale, seg: "contact", title: p.meta.title, description: p.meta.description });
}

interface Channel {
  key: string;
  title: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external: boolean;
  ariaLabel: string;
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const p = getPages(locale).contact;
  const c = contactConfig;
  const cd = getDictionary(locale).contact;

  const emailLabel = locale === "ar" ? "البريد الإلكتروني" : "Email";
  const websiteLabel = locale === "ar" ? "الموقع الإلكتروني" : "Website";

  const channels = [
    ...c.phones.map((phone, i) => ({
      key: `ph${i}`,
      title: phoneLabel(phone, locale),
      value: phone.display,
      href: telHref(phone.number),
      icon: Phone,
      external: false,
      ariaLabel: `${phoneLabel(phone, locale)}: ${phone.display}`,
    })),
    c.email && { key: "em", title: emailLabel, value: c.email, href: `mailto:${c.email}`, icon: Mail, external: false, ariaLabel: c.email },
    { key: "web", title: websiteLabel, value: siteConfig.domain, href: siteConfig.url, icon: Globe, external: true, ariaLabel: `${websiteLabel}: ${siteConfig.domain}` },
    c.instagramUrl && { key: "ig", title: "Instagram", value: instagramDisplay, href: c.instagramUrl, icon: Instagram, external: true, ariaLabel: `Instagram ${instagramDisplay}` },
  ].filter(Boolean) as Channel[];

  const address = locale === "ar" ? c.addressAr : c.addressEn;
  const hours = locale === "ar" ? c.hoursAr : c.hoursEn;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        titleLine1={p.titleLine1}
        titleLine2={p.titleLine2}
        intro={p.intro}
      />

      <section className="section-y">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            {/* form */}
            <Reveal className="rounded-3xl border border-border bg-background p-7 shadow-[var(--shadow-sm)] sm:p-9">
              <h2 className="text-h3 text-text">{p.formTitle}</h2>
              <p className="text-body mt-2 text-[0.95rem]">{p.formIntro}</p>
              <div className="mt-7">
                <InquiryForm
                  fields={p.fields}
                  notes={{ whatsapp: p.formNoteWhatsapp, email: p.formNoteEmail, none: p.formNoteNone }}
                />
              </div>
            </Reveal>

            {/* details */}
            <div className="flex flex-col gap-4">
              <Reveal delay={0.08} className="rounded-3xl border border-border bg-surface-soft p-7 sm:p-8">
                <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-faint rtl:tracking-normal">
                  {p.detailsTitle}
                </h2>

                {channels.length > 0 ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {channels.map((ch) => (
                      <a
                        key={ch.key}
                        href={ch.href}
                        aria-label={ch.ariaLabel}
                        {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-3 rounded-2xl border border-border bg-background p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[var(--shadow-sm)]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-deep transition-colors duration-300 group-hover:bg-brand-deep group-hover:text-white">
                          <ch.icon className="h-[19px] w-[19px]" strokeWidth={1.7} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.72rem] font-medium text-faint">{ch.title}</span>
                          <span dir="ltr" className="block truncate text-[0.92rem] font-semibold text-text">
                            {ch.value}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-body mt-4 text-[0.92rem]">{cd.comingSoon}</p>
                )}

                {address || hours ? (
                  <dl className="mt-6 space-y-4 border-t border-border pt-6">
                    {address ? (
                      <Detail icon={MapPin} label={cd.addressLabel}>
                        <span className="text-[0.95rem] text-text">{address}</span>
                      </Detail>
                    ) : null}
                    {hours ? (
                      <Detail icon={Clock} label={p.hoursTitle}>
                        <span className="text-[0.95rem] text-text">{hours}</span>
                      </Detail>
                    ) : null}
                  </dl>
                ) : null}
              </Reveal>

              {/* map — only when a location is configured */}
              {c.mapsUrl ? (
                <Reveal delay={0.14} className="overflow-hidden rounded-3xl border border-border">
                  <div className="relative flex min-h-[220px] items-end bg-surface-2 p-7">
                    <div className="tech-grid absolute inset-0 opacity-60" aria-hidden />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-70"
                      style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(84,10,9,0.08), transparent 70%)" }}
                      aria-hidden
                    />
                    <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-deep text-white shadow-[var(--shadow-md)]">
                      <MapPin className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <a
                      href={c.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center gap-2 rounded-full bg-background px-4 py-2.5 text-[0.9rem] font-semibold text-text shadow-[var(--shadow-sm)] transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      {p.mapButton}
                      <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                    </a>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Detail({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-deep" strokeWidth={1.7} />
      <div>
        <dt className="text-[0.74rem] font-semibold uppercase tracking-wide text-faint rtl:tracking-normal">{label}</dt>
        <dd className="mt-0.5">{children}</dd>
      </div>
    </div>
  );
}
