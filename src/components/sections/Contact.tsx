import { MessageCircle, Phone, Mail, Instagram, MapPin, Clock, ArrowRight, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/content";
import type { Locale } from "@/config/site";
import { contactConfig, whatsappLink } from "@/config/contact";
import { Reveal } from "@/components/ui/Reveal";

interface Channel {
  key: string;
  label: string;
  href: string | null;
  icon: LucideIcon;
  primary?: boolean;
  external?: boolean;
}

export function Contact({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.contact;
  const c = contactConfig;

  // Full channel roster — each keeps its icon/label even when not yet
  // configured, so the section reads as complete. Unconfigured ones render
  // as elegant "soon" tiles instead of dead links.
  const channels: Channel[] = [
    { key: "whatsapp", label: t.whatsapp, icon: MessageCircle, primary: true, external: true, href: c.whatsapp ? whatsappLink(c.whatsapp) : null },
    { key: "phone", label: t.phone, icon: Phone, href: c.phone ? `tel:${c.phone.replace(/\s/g, "")}` : null },
    { key: "email", label: t.email, icon: Mail, href: c.email ? `mailto:${c.email}` : null },
    { key: "instagram", label: t.instagram, icon: Instagram, external: true, href: c.instagramUrl || null },
    { key: "location", label: t.location, icon: MapPin, external: true, href: c.mapsUrl || null },
  ];

  const configured = channels.filter((ch) => ch.href);
  const anyConfigured = configured.length > 0;
  const address = locale === "ar" ? c.addressAr : c.addressEn;
  const hours = locale === "ar" ? c.hoursAr : c.hoursEn;

  return (
    <section id="contact" className="section-y border-t border-border bg-surface">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-md)] lg:grid-cols-[1.05fr_0.95fr]">
          {/* left — brand panel (always looks complete) */}
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

              <Reveal delay={0.15}>
                <dl className="mt-9 space-y-4 border-t border-white/15 pt-7">
                  <InfoRow icon={MapPin} label={t.addressLabel} value={address} soon={t.soon} />
                  <InfoRow icon={Clock} label={t.hoursLabel} value={hours} soon={t.soon} />
                </dl>
              </Reveal>
            </div>
          </div>

          {/* right — channels */}
          <div className="bg-background p-8 sm:p-11 lg:p-12">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-faint rtl:tracking-normal">
              {t.channelsTitle}
            </p>

            <Reveal delay={0.08}>
              {/* primary WhatsApp */}
              {(() => {
                const wa = channels[0];
                const cls =
                  "mt-5 flex w-full items-center justify-between rounded-2xl px-5 py-4 text-base font-semibold transition-all duration-300";
                const inner = (
                  <>
                    <span className="inline-flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                        <MessageCircle className="h-5 w-5" strokeWidth={1.9} />
                      </span>
                      {wa.label}
                    </span>
                    {wa.href ? (
                      <ArrowRight className="h-5 w-5 rtl:-scale-x-100" />
                    ) : (
                      <span className="rounded-full bg-white/15 px-2.5 py-1 text-[0.68rem] font-semibold">
                        {t.soon}
                      </span>
                    )}
                  </>
                );
                return wa.href ? (
                  <a href={wa.href} target="_blank" rel="noopener noreferrer" className={`${cls} bg-brand-deep text-white hover:bg-brand`}>
                    {inner}
                  </a>
                ) : (
                  <div className={`${cls} bg-brand-deep/90 text-white`} aria-disabled>
                    {inner}
                  </div>
                );
              })()}
            </Reveal>

            {/* secondary channel tiles */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              {channels.slice(1).map((ch, i) => (
                <Reveal key={ch.key} delay={0.1 + i * 0.05}>
                  <ChannelTile channel={ch} soon={t.soon} />
                </Reveal>
              ))}
            </div>

            <p className="mt-6 text-[0.82rem] text-muted">
              {anyConfigured ? t.responseNote : t.comingSoon}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  soon,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  soon: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-white/70" strokeWidth={1.7} />
      <div>
        <dt className="text-[0.74rem] font-semibold uppercase tracking-wide text-white/45 rtl:tracking-normal">
          {label}
        </dt>
        <dd className="text-[0.95rem] text-white/90">
          {value || <span className="text-white/45">{soon}</span>}
        </dd>
      </div>
    </div>
  );
}

function ChannelTile({ channel, soon }: { channel: Channel; soon: string }) {
  const Icon = channel.icon;
  const content = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand-deep transition-colors duration-300 group-hover:bg-brand-deep group-hover:text-white">
        <Icon className="h-[19px] w-[19px]" strokeWidth={1.7} />
      </span>
      <span className="text-[0.9rem] font-semibold text-text">{channel.label}</span>
      {!channel.href ? (
        <span className="ms-auto rounded-full border border-border px-2 py-0.5 text-[0.62rem] font-semibold text-faint">
          {soon}
        </span>
      ) : null}
    </>
  );
  const base =
    "group flex items-center gap-3 rounded-2xl border border-border bg-surface-soft p-4 transition-all duration-300";
  return channel.href ? (
    <a
      href={channel.href}
      {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} hover:-translate-y-0.5 hover:border-brand/30 hover:bg-background hover:shadow-[var(--shadow-sm)]`}
    >
      {content}
    </a>
  ) : (
    <div className={base} aria-disabled>
      {content}
    </div>
  );
}
