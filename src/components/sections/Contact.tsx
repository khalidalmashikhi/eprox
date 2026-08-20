import { Phone, Mail, Instagram, Globe, MapPin, Clock, ArrowRight, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/content";
import { siteConfig, type Locale } from "@/config/site";
import { contactConfig, instagramDisplay, telHref, phoneLabel } from "@/config/contact";
import { Reveal } from "@/components/ui/Reveal";

interface Channel {
  key: string;
  title: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  ariaLabel?: string;
}

export function Contact({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.contact;
  const c = contactConfig;
  const emailLabel = locale === "ar" ? "البريد الإلكتروني" : "Email";
  const websiteLabel = locale === "ar" ? "الموقع الإلكتروني" : "Website";

  // Config-driven channels — only what is actually available is shown.
  const channels: Channel[] = [
    ...c.phones.map((p, i) => ({
      key: `ph${i}`,
      title: phoneLabel(p, locale),
      value: p.display,
      href: telHref(p.number),
      icon: Phone,
      ariaLabel: `${phoneLabel(p, locale)}: ${p.display}`,
    })),
    ...(c.email
      ? [{ key: "em", title: emailLabel, value: c.email, href: `mailto:${c.email}`, icon: Mail, ariaLabel: `${emailLabel}: ${c.email}` }]
      : []),
    { key: "web", title: websiteLabel, value: siteConfig.domain, href: siteConfig.url, icon: Globe, external: true, ariaLabel: `${websiteLabel}: ${siteConfig.domain}` },
    ...(c.instagramUrl
      ? [{ key: "ig", title: "Instagram", value: instagramDisplay, href: c.instagramUrl, icon: Instagram, external: true, ariaLabel: `Instagram ${instagramDisplay}` }]
      : []),
  ];

  const primary = channels[0];
  const secondary = channels.slice(1);
  const address = locale === "ar" ? c.addressAr : c.addressEn;
  const hours = locale === "ar" ? c.hoursAr : c.hoursEn;

  return (
    <section id="contact" className="section-y border-t border-border bg-surface">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-md)] lg:grid-cols-[1.05fr_0.95fr]">
          {/* left — brand panel */}
          <div className="relative overflow-hidden bg-brand-deep p-8 text-white sm:p-11 lg:p-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(120% 90% at 80% 0%, #000, transparent 75%)",
                WebkitMaskImage: "radial-gradient(120% 90% at 80% 0%, #000, transparent 75%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <Reveal>
                <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/60 rtl:tracking-[0.06em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  {t.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-[clamp(1.7rem,3vw,2.6rem)] font-bold leading-tight">
                  {t.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-white/75">
                  {t.description}
                </p>
              </Reveal>

              {address || hours ? (
                <Reveal delay={0.15}>
                  <dl className="mt-9 space-y-4 border-t border-white/15 pt-7">
                    {address ? <InfoRow icon={MapPin} label={t.addressLabel} value={address} /> : null}
                    {hours ? <InfoRow icon={Clock} label={t.hoursLabel} value={hours} /> : null}
                  </dl>
                </Reveal>
              ) : null}
            </div>
          </div>

          {/* right — channels */}
          <div className="bg-background p-8 sm:p-11 lg:p-12">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-faint rtl:tracking-normal">
              {t.channelsTitle}
            </p>

            {primary ? (
              <Reveal delay={0.08}>
                <a
                  href={primary.href}
                  aria-label={primary.ariaLabel}
                  {...(primary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-5 flex w-full items-center justify-between rounded-2xl bg-brand-deep px-5 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-brand"
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <primary.icon className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[0.72rem] font-medium text-white/60">{primary.title}</span>
                      <span dir="ltr" className="block">{primary.value}</span>
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 rtl:-scale-x-100" />
                </a>
              </Reveal>
            ) : null}

            {secondary.length > 0 ? (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {secondary.map((ch, i) => (
                  <Reveal key={ch.key} delay={0.1 + i * 0.05}>
                    <ChannelTile channel={ch} />
                  </Reveal>
                ))}
              </div>
            ) : null}

            <p className="mt-6 text-[0.82rem] text-muted">{t.responseNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-white/70" strokeWidth={1.7} />
      <div>
        <dt className="text-[0.74rem] font-semibold uppercase tracking-wide text-white/45 rtl:tracking-normal">
          {label}
        </dt>
        <dd className="text-[0.95rem] text-white/90">{value}</dd>
      </div>
    </div>
  );
}

function ChannelTile({ channel }: { channel: Channel }) {
  const Icon = channel.icon;
  return (
    <a
      href={channel.href}
      aria-label={channel.ariaLabel}
      {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-3 rounded-2xl border border-border bg-surface-soft p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-background hover:shadow-[var(--shadow-sm)]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-deep transition-colors duration-300 group-hover:bg-brand-deep group-hover:text-white">
        <Icon className="h-[19px] w-[19px]" strokeWidth={1.7} />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[0.68rem] font-medium text-faint">{channel.title}</span>
        <span dir="ltr" className="block truncate text-[0.9rem] font-semibold text-text">{channel.value}</span>
      </span>
    </a>
  );
}
