import type { Dictionary } from "@/content";
import { Reveal } from "@/components/ui/Reveal";

export function Why({ dict }: { dict: Dictionary }) {
  const t = dict.why;

  return (
    <section id="why" className="section-y">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* statement */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-brand/50" aria-hidden />
                <span className="text-eyebrow">{t.eyebrow}</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-h2 mt-5">{t.heading}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lead mt-6 max-w-sm border-s-2 border-brand/40 ps-5 text-text/80">
                {t.statement}
              </p>
            </Reveal>
          </div>

          {/* benefits */}
          <div>
            {/* three primary, emphasized */}
            <div className="grid gap-4 sm:grid-cols-3">
              {t.primary.map((b, i) => (
                <Reveal
                  key={b.title}
                  delay={i * 0.08}
                  className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-soft p-6 hover:border-brand/40"
                >
                  {/* top accent bar */}
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-deep transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
                  <span className="text-[2.75rem] font-bold leading-none tabular-nums text-brand-deep/15 transition-colors duration-300 group-hover:text-brand-deep/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-[1.2rem] font-bold leading-snug text-text">
                    {b.title}
                  </h3>
                  <p className="text-body mt-2.5 text-[0.9rem]">{b.text}</p>
                </Reveal>
              ))}
            </div>

            {/* supporting points */}
            <ul className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {t.supporting.map((b) => (
                <Reveal
                  as="li"
                  key={b.title}
                  className="bg-background p-5 transition-colors duration-300 hover:bg-surface-soft"
                >
                  <h4 className="flex items-center gap-2 text-[0.98rem] font-semibold text-text">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                    {b.title}
                  </h4>
                  <p className="text-body mt-1.5 text-[0.84rem] ps-3.5">{b.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
