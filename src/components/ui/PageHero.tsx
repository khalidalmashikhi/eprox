import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface PageHeroProps {
  eyebrow: string;
  titleLine1: string;
  titleLine2?: string;
  intro: string;
  children?: ReactNode;
  /** Optional visual rendered on the end side (desktop only). */
  visual?: ReactNode;
}

/**
 * Consistent editorial hero for inner pages — same tokens, backdrop, and
 * motion as the homepage hero, minus the exploded-device composition.
 */
export function PageHero({
  eyebrow,
  titleLine1,
  titleLine2,
  intro,
  children,
  visual,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-[calc(var(--nav-h)+2rem)]">
      {/* brand backdrop */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] opacity-70"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 4%, rgba(84,10,9,0.09), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="tech-grid pointer-events-none absolute inset-x-0 top-0 h-full opacity-40" aria-hidden />

      <div className="container-x relative">
        <div
          className={`grid items-center gap-12 pb-14 pt-6 lg:pb-20 lg:pt-10 ${
            visual ? "lg:grid-cols-[1.05fr_0.95fr]" : ""
          }`}
        >
          <div className="max-w-3xl">
            <Reveal>
              <div className="tag-pill">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                <span className="text-[0.8rem] font-medium text-muted">{eyebrow}</span>
              </div>
            </Reveal>

            <h1 className="text-page-title mt-7">
              <Reveal as="span" className="block">
                {titleLine1}
              </Reveal>
              {titleLine2 ? (
                <Reveal as="span" delay={0.08} className="block text-brand-deep">
                  {titleLine2}
                </Reveal>
              ) : null}
            </h1>

            <Reveal delay={0.16}>
              <p className="text-lead mt-7 max-w-2xl">{intro}</p>
            </Reveal>

            {children ? <Reveal delay={0.24}>{children}</Reveal> : null}
          </div>

          {visual ? <Reveal delay={0.2}>{visual}</Reveal> : null}
        </div>
      </div>
    </section>
  );
}
