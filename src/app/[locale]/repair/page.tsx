import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/config/site";
import { getPages } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";

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
  const p = getPages(locale).repair;
  return buildMetadata({ locale, seg: "repair", title: p.meta.title, description: p.meta.description });
}

export default async function RepairPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const p = getPages(locale).repair;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        titleLine1={p.titleLine1}
        titleLine2={p.titleLine2}
        intro={p.intro}
      />

      {/* process */}
      <section className="section-y border-b border-border bg-brand-wash">
        <div className="container-x">
          <SectionHeading eyebrow={p.processEyebrow} title={p.processTitle} intro={p.processIntro} />
          <ProcessTimeline steps={p.steps} />
        </div>
      </section>

      {/* expertise */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={p.expertiseEyebrow} title={p.expertiseTitle} intro={p.expertiseIntro} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {p.expertise.map((e, i) => (
              <Reveal
                key={e.title}
                delay={0.05 * i}
                className="card-lift group rounded-2xl border border-border bg-surface-soft p-7 hover:border-brand/40"
              >
                <div className="flex items-start gap-4">
                  <span className="text-lg font-bold tabular-nums text-brand-deep/25 transition-colors duration-300 group-hover:text-brand-deep/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.15rem] font-bold text-text">{e.title}</h3>
                    <p className="text-body mt-2 text-[0.92rem]">{e.text}</p>
                  </div>
                </div>
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
