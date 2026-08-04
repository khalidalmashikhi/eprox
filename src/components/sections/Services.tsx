import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content";
import { localePath, type Locale, type PageSegment } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServicePartsSVG, ServiceRepairSVG, ServiceSupplySVG } from "@/components/visuals/ServiceVisuals";

const visuals: ComponentType<{ dark?: boolean }>[] = [
  ServicePartsSVG,
  ServiceRepairSVG,
  ServiceSupplySVG,
];

// Distinct visual identity per panel.
const themes = [
  {
    panel: "bg-background",
    visualBg: "bg-surface",
    dark: false,
  },
  {
    panel: "bg-background",
    visualBg: "bg-brand-wash",
    dark: false,
  },
  {
    panel: "bg-brand-deep text-white",
    visualBg: "bg-[#42060a]",
    dark: true,
  },
];

export function Services({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.services;

  return (
    <section id="services" className="section-y border-y border-border bg-surface-2">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.heading} intro={t.intro} />

        <div className="mt-11 flex flex-col gap-5">
          {t.items.map((item, i) => {
            const Visual = visuals[i];
            const reversed = i % 2 === 1;
            const theme = themes[i];
            return (
              <Reveal key={item.index} delay={0.04 * i}>
                <article
                  id={item.anchor}
                  className={`card-lift group grid scroll-mt-28 items-stretch gap-0 overflow-hidden rounded-3xl border shadow-[var(--shadow-sm)] lg:grid-cols-2 ${
                    theme.dark ? "border-transparent" : "border-border"
                  } ${theme.panel}`}
                >
                  {/* text */}
                  <div
                    className={`flex flex-col justify-center p-8 sm:p-10 lg:p-14 ${
                      reversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`text-lg font-semibold tabular-nums ${
                          theme.dark ? "text-white/80" : "text-brand"
                        }`}
                      >
                        {item.index}
                      </span>
                      <span className={`h-px flex-1 ${theme.dark ? "bg-white/20" : "bg-border"}`} />
                    </div>
                    <h3 className="text-h3 mt-5">{item.title}</h3>
                    <p
                      className={`mt-4 max-w-md text-[1.02rem] leading-relaxed ${
                        theme.dark ? "text-white/75" : "text-muted"
                      }`}
                    >
                      {item.description}
                    </p>
                    <div className="mt-8">
                      <Link
                        href={localePath(locale, item.cta.href as PageSegment)}
                        className={`group/cta inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.95rem] font-semibold transition-all duration-300 ${
                          theme.dark
                            ? "bg-white text-brand-deep hover:bg-white/90"
                            : "bg-brand-deep text-white hover:bg-brand"
                        }`}
                      >
                        {item.cta.label}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1 rtl:-scale-x-100 rtl:group-hover/cta:-translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* visual */}
                  <div
                    className={`relative flex min-h-[240px] items-center justify-center overflow-hidden p-8 sm:min-h-[300px] ${
                      theme.visualBg
                    } ${reversed ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <div
                      className={`tech-grid absolute inset-0 ${theme.dark ? "opacity-[0.12]" : "opacity-50"}`}
                    />
                    <div className="relative transition-transform duration-500 group-hover:scale-[1.04]">
                      <Visual dark={theme.dark} />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
