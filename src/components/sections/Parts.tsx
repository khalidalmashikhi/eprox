import { Info, MessageCircle, ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content";
import { localePath, type Locale } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { categoryIcons } from "@/components/visuals/CategoryIcons";
import { contactConfig, hasAnyContact, whatsappLink } from "@/config/contact";

export function Parts({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.parts;

  // Wire the availability CTA to the contact config:
  // WhatsApp (prefilled) → any other contact (contact page) → hidden.
  const availabilityHref = contactConfig.whatsapp
    ? whatsappLink(contactConfig.whatsapp, t.inquiryMessage)
    : hasAnyContact
      ? localePath(locale, "contact")
      : null;
  const availabilityExternal = Boolean(contactConfig.whatsapp);

  return (
    <section id="parts" className="section-y">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.heading} intro={t.intro} />

        {/* categories */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {t.categories.map((cat, i) => {
            const Icon = categoryIcons[i];
            return (
              <Reveal
                key={cat.title}
                delay={0.03 * i}
                className="group relative bg-background p-8 transition-colors duration-300 hover:bg-surface-soft"
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand-deep transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right"
                  aria-hidden
                />
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand-deep shadow-[var(--shadow-sm)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand-deep group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="text-[1.4rem] font-bold tabular-nums text-border">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-text">{cat.title}</h3>
                <p className="text-body mt-2 text-[0.9rem]">{cat.description}</p>
              </Reveal>
            );
          })}
        </div>

        {/* supported brands — typographic only */}
        <div className="mt-12">
          <Reveal>
            <p className="text-center text-[0.8rem] font-medium uppercase tracking-[0.14em] text-faint rtl:tracking-normal">
              {t.brandsLabel}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
              {t.brands.map((brand) => (
                <li
                  key={brand}
                  className="text-lg font-semibold tracking-tight text-text/70 transition-colors duration-300 hover:text-brand-deep sm:text-xl"
                >
                  {brand}
                </li>
              ))}
            </ul>
          </Reveal>

          {availabilityHref ? (
            <Reveal delay={0.12}>
              <div className="mt-11 flex justify-center">
                <a
                  href={availabilityHref}
                  {...(availabilityExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="btn btn-primary"
                >
                  {contactConfig.whatsapp ? (
                    <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.7} />
                  ) : null}
                  {t.checkAvailability}
                  {!contactConfig.whatsapp ? (
                    <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                  ) : null}
                </a>
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={0.16}>
            <p className="mt-8 flex items-center justify-center gap-2 text-center text-[0.82rem] text-muted">
              <Info className="h-4 w-4 shrink-0" strokeWidth={1.6} />
              {t.availabilityNote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
