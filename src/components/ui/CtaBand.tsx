import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localePath, type Locale, type PageSegment } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";

interface CtaBandProps {
  locale: Locale;
  eyebrow?: string;
  title: string;
  text: string;
  buttonLabel: string;
  seg?: PageSegment;
  /** External href (e.g. WhatsApp). Overrides `seg` when provided. */
  href?: string;
  external?: boolean;
}

/** Cinematic burgundy call-to-action band, consistent with the signature section. */
export function CtaBand({
  locale,
  eyebrow,
  title,
  text,
  buttonLabel,
  seg = "contact",
  href,
  external,
}: CtaBandProps) {
  const target = href ?? localePath(locale, seg);
  return (
    <section className="relative overflow-hidden bg-brand-deep text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(80% 70% at 50% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(80% 70% at 50% 50%, #000 30%, transparent 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-1/3 start-1/2 h-[440px] w-[440px] -translate-x-1/2 rounded-full opacity-40 blur-3xl rtl:translate-x-1/2"
        style={{ background: "radial-gradient(circle, rgba(125,20,24,0.9), transparent 60%)" }}
        aria-hidden
      />
      <div className="container-x relative">
        <div className="flex flex-col items-center gap-8 py-20 text-center sm:py-24 lg:flex-row lg:justify-between lg:text-start lg:rtl:text-start">
          <div className="max-w-2xl">
            {eyebrow ? (
              <Reveal>
                <span className="flex items-center justify-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/55 lg:justify-start rtl:tracking-[0.06em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  {eyebrow}
                </span>
              </Reveal>
            ) : null}
            <Reveal delay={0.05}>
              <h2 className="signature-title mt-5 text-white">{title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-white/70">{text}</p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="shrink-0">
            <Link
              href={target}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-brand-deep transition-transform duration-300 hover:-translate-y-0.5"
            >
              {buttonLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
