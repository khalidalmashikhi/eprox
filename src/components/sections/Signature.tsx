import type { Dictionary } from "@/content";
import { Reveal } from "@/components/ui/Reveal";

export function Signature({ dict }: { dict: Dictionary }) {
  const t = dict.signature;

  return (
    <section
      aria-label="signature"
      className="relative overflow-hidden bg-brand-deep text-white"
    >
      {/* fine technical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 100%)",
        }}
        aria-hidden
      />
      {/* depth glow */}
      <div
        className="pointer-events-none absolute -bottom-1/3 start-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-40 blur-3xl rtl:translate-x-1/2"
        style={{ background: "radial-gradient(circle, rgba(125,20,24,0.9), transparent 60%)" }}
        aria-hidden
      />

      {/* floating fine components */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="animate-float-y absolute left-[10%] top-[24%] h-3 w-3 rounded-[3px] border border-white/25" />
        <span
          className="animate-float-y absolute right-[14%] top-[30%] h-2 w-2 rounded-full bg-white/30"
          style={{ animationDelay: "1.2s" }}
        />
        <span
          className="animate-float-y absolute left-[18%] bottom-[22%] h-2.5 w-2.5 rounded-[2px] border border-white/20"
          style={{ animationDelay: "0.6s" }}
        />
        <span
          className="animate-float-y absolute right-[22%] bottom-[28%] h-1.5 w-1.5 rounded-full bg-white/40"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container-x relative">
        <div className="flex flex-col items-center py-20 text-center sm:py-28 lg:py-32">
          <Reveal>
            <span className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-white/55 rtl:tracking-[0.08em]">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              EPROX
            </span>
          </Reveal>
          <h2 className="signature-title mt-8 max-w-4xl text-white">
            <Reveal as="span" className="block">
              {t.line1}
            </Reveal>
            <Reveal as="span" delay={0.1} className="block text-white/70">
              {t.line2}
            </Reveal>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-10 text-[0.85rem] font-medium tracking-wide text-white/55">
              {t.caption}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
