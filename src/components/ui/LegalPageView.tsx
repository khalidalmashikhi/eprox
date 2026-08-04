import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localePath, type Locale } from "@/config/site";
import type { LegalPage } from "@/content/pages/types";
import { Reveal } from "@/components/ui/Reveal";

export function LegalPageView({ content, locale }: { content: LegalPage; locale: Locale }) {
  return (
    <main>
      <section className="relative overflow-hidden pt-[calc(var(--nav-h)+3rem)]">
        <div className="tech-grid pointer-events-none absolute inset-x-0 top-0 h-full opacity-30" aria-hidden />
        <div className="container-x relative pb-20 sm:pb-28">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-brand/50" aria-hidden />
                <span className="text-eyebrow">{content.eyebrow}</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-h2 mt-5">{content.title}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lead mt-6">{content.intro}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-body mt-6 text-[0.92rem]">{content.note}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href={localePath(locale, "contact")} className="btn btn-primary mt-8">
                {locale === "ar" ? "تواصل معنا" : "Contact us"}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
