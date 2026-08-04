import Link from "next/link";
import { ArrowRight, ArrowDown, Check, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/content";
import { localePath, type Locale } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.hero;
  const chips = t.microline.split("·").map((s) => s.trim());

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-[calc(var(--nav-h)+1.5rem)]"
    >
      {/* layered brand backdrop */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[62%] opacity-70"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 8%, rgba(84,10,9,0.10), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="tech-grid pointer-events-none absolute inset-x-0 top-0 h-[70%] opacity-40" aria-hidden />

      <div className="container-x relative">
        <div className="grid items-center gap-10 pb-12 pt-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:pb-16 lg:pt-8">
          {/* copy */}
          <div className="max-w-2xl">
            <Reveal>
              <div className="tag-pill">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                <span className="text-[0.8rem] font-medium text-muted">{t.eyebrow}</span>
              </div>
            </Reveal>

            <h1 className="text-display mt-7">
              <Reveal as="span" className="block">
                {t.titleLine1}
              </Reveal>
              <Reveal as="span" delay={0.08} className="block text-brand-deep">
                {t.titleLine2}
              </Reveal>
            </h1>

            <Reveal delay={0.16}>
              <p className="text-lead mt-6 max-w-xl">{t.description}</p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={localePath(locale, "parts")} className="btn btn-primary group/btn">
                  {t.primaryCta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:-scale-x-100 rtl:group-hover/btn:-translate-x-1" />
                </Link>
                <Link href={localePath(locale, "contact")} className="btn btn-secondary">
                  {t.secondaryCta}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                {chips.map((chip) => (
                  <li key={chip} className="flex items-center gap-2 text-[0.85rem] font-medium text-text/70">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {chip}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* visual — exploded assembly floating on the background */}
          <Reveal delay={0.15} className="relative">
            <div className="relative mx-auto w-full max-w-[600px]">
              {/* corner technical label */}
              <div className="absolute start-2 top-2 z-30 hidden items-center gap-2 rounded-full border border-border bg-white/80 px-3 py-1.5 text-[0.68rem] font-semibold tracking-wide text-muted backdrop-blur-sm sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                EPROX · ASSEMBLY
              </div>

              <HeroVisual labels={t.partLabels} />

              {/* floating quality card */}
              <div className="absolute bottom-[2%] end-0 z-30 flex items-center gap-3 rounded-2xl border border-border bg-white/95 px-4 py-3 shadow-[var(--shadow-md)] backdrop-blur-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-deep text-white">
                  <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className="leading-tight">
                  <p className="text-[0.82rem] font-semibold text-text">{chips[0]}</p>
                  <p className="text-[0.72rem] text-faint">{chips[1] ?? ""}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="container-x hidden pb-7 sm:block">
        <a
          href="#services"
          className="group inline-flex items-center gap-2 text-[0.78rem] font-medium text-faint transition-colors hover:text-text"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors group-hover:border-text">
            <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
          {t.scroll}
        </a>
      </div>
    </section>
  );
}
