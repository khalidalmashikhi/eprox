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

      {/* Who We Are — the company today */}
      <section className="section-y">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading eyebrow={p.storyEyebrow} title={p.storyTitle} />
            </div>
            <div className="max-w-2xl space-y-5">
              {p.storyParagraphs.map((para, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="text-lead text-text/85">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section-y border-y border-border bg-surface">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading eyebrow={p.missionEyebrow} title={p.missionTitle} />
            </div>
            <div className="max-w-2xl space-y-5">
              {p.missionParagraphs.map((para, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="text-lead text-text/85">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision — future ambition, given stronger presence */}
      <section className="relative overflow-hidden bg-brand-deep text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(90% 80% at 50% 30%, #000 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(90% 80% at 50% 30%, #000 30%, transparent 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-1/3 start-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-3xl rtl:translate-x-1/2"
          style={{ background: "radial-gradient(circle, rgba(125,20,24,0.9), transparent 60%)" }}
          aria-hidden
        />
        <div className="container-x relative section-y">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-white/60 rtl:tracking-[0.06em]">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                {p.visionEyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="signature-title mt-6 text-white">{p.visionTitle}</h2>
            </Reveal>
          </div>
          <div className="mt-10 grid max-w-4xl gap-6 md:grid-cols-1">
            {p.visionParagraphs.map((para, i) => (
              <Reveal key={i} delay={0.1 + i * 0.06}>
                <p className="border-s-2 border-white/25 ps-6 text-[1.1rem] leading-relaxed text-white/80">
                  {para}
                </p>
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
