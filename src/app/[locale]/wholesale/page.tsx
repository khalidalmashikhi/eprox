import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/config/site";
import { getPages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";

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
  const p = getPages(locale).wholesale;
  return buildMetadata({ locale, seg: "wholesale", title: p.meta.title, description: p.meta.description });
}

export default async function WholesalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const p = getPages(locale).wholesale;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        titleLine1={p.titleLine1}
        titleLine2={p.titleLine2}
        intro={p.intro}
      />

      {/* benefits */}
      <section className="section-y bg-surface-2 border-b border-border">
        <div className="container-x">
          <SectionHeading eyebrow={p.benefitsEyebrow} title={p.benefitsTitle} intro={p.benefitsIntro} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.benefits.map((b, i) => (
              <Reveal
                key={b.title}
                delay={0.05 * (i % 3)}
                className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-7 hover:border-brand/40"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-deep transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
                <span className="text-[2.5rem] font-bold leading-none tabular-nums text-brand-deep/15 transition-colors duration-300 group-hover:text-brand-deep/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[1.2rem] font-bold leading-snug text-text">{b.title}</h3>
                <p className="text-body mt-2.5 text-[0.92rem]">{b.text}</p>
              </Reveal>
            ))}
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
