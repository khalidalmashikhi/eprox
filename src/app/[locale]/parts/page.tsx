import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/config/site";
import { getPages } from "@/content/pages";
import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { catalogueIcons } from "@/components/visuals/CategoryIcons";

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
  const p = getPages(locale).parts;
  return buildMetadata({ locale, seg: "parts", title: p.meta.title, description: p.meta.description });
}

export default async function PartsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const p = getPages(locale).parts;
  const brands = getDictionary(locale).parts.brands;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        titleLine1={p.titleLine1}
        titleLine2={p.titleLine2}
        intro={p.intro}
      />

      {/* catalogue */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={p.catalogueEyebrow} title={p.catalogueTitle} />

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {p.categories.map((cat, i) => {
              const Icon = catalogueIcons[i] ?? catalogueIcons[0];
              return (
                <Reveal
                  key={cat.title}
                  delay={0.02 * (i % 3)}
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
            {/* fillers so trailing cells stay clean at each column count */}
            {Array.from({ length: (2 - (p.categories.length % 2)) % 2 }).map((_, i) => (
              <div key={`filler-sm-${i}`} className="hidden bg-background sm:block lg:hidden" aria-hidden />
            ))}
            {Array.from({ length: (3 - (p.categories.length % 3)) % 3 }).map((_, i) => (
              <div key={`filler-lg-${i}`} className="hidden bg-background lg:block" aria-hidden />
            ))}
          </div>

          {/* supported brands */}
          <div className="mt-14">
            <Reveal>
              <p className="text-center text-[0.8rem] font-medium uppercase tracking-[0.14em] text-faint rtl:tracking-normal">
                {getDictionary(locale).parts.brandsLabel}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
                {brands.map((brand) => (
                  <li
                    key={brand}
                    className="text-lg font-semibold tracking-tight text-text/70 transition-colors duration-300 hover:text-brand-deep sm:text-xl"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        locale={locale}
        eyebrow={p.cta.eyebrow}
        title={p.cta.title}
        text={p.cta.text}
        buttonLabel={p.cta.button}
        seg="contact"
      />
    </main>
  );
}
