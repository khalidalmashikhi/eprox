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
  const p = getPages(locale).about;
  return buildMetadata({ locale, seg: "about", title: p.meta.title, description: p.meta.description });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const p = getPages(locale).about;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        titleLine1={p.titleLine1}
        titleLine2={p.titleLine2}
        intro={p.intro}
      />

      {/* quote moment */}
      <section className="border-b border-border bg-surface">
        <div className="container-x">
          <div className="mx-auto max-w-4xl py-16 text-center sm:py-20">
            <Reveal>
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-2xl font-bold text-brand-deep">
                &ldquo;
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-h3 mt-6 text-text">{p.quote}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-brand rtl:tracking-normal">
                {p.quoteAuthor}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* principle blocks — editorial list */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow={p.blocksEyebrow} title={p.blocksTitle} />
          <div className="mt-10 border-t border-border">
            {p.blocks.map((b, i) => (
              <Reveal
                key={b.label}
                delay={0.03 * i}
                as="div"
                className="group grid items-start gap-4 border-b border-border py-9 lg:grid-cols-[0.38fr_0.62fr] lg:gap-10"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-sm font-bold tabular-nums text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-faint rtl:tracking-normal rtl:text-[0.95rem]">
                    {b.label}
                  </span>
                </div>
                <div className="max-w-2xl">
                  <h3 className="text-h3 text-text transition-colors duration-300 group-hover:text-brand-deep">
                    {b.title}
                  </h3>
                  <p className="text-lead mt-3">{b.text}</p>
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
