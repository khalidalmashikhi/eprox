import type { Dictionary } from "@/content";
import { Reveal } from "@/components/ui/Reveal";

export function About({ dict }: { dict: Dictionary }) {
  const t = dict.about;

  return (
    <section id="about" className="section-y">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* text */}
          <div className="max-w-2xl">
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
              <p className="text-lead mt-6 text-text/80">{t.body}</p>
            </Reveal>

            <dl className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {t.points.map((p, i) => (
                <Reveal key={p.label} delay={0.15 + i * 0.07} className="bg-background p-6">
                  <dt className="text-sm font-semibold text-brand-deep">{p.label}</dt>
                  <dd className="text-body mt-2 text-[0.9rem]">{p.text}</dd>
                </Reveal>
              ))}
            </dl>
          </div>

          {/* precision inspection visual */}
          <Reveal delay={0.1} className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-3xl border border-border bg-surface-soft">
              <div className="tech-grid absolute inset-0 opacity-60" />
              <PrecisionSVG />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PrecisionSVG() {
  return (
    <svg
      viewBox="0 0 440 440"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Precision alignment and inspection illustration"
    >
      {/* concentric alignment target */}
      <g fill="none" stroke="rgba(15,15,15,0.12)">
        <circle cx="220" cy="220" r="150" />
        <circle cx="220" cy="220" r="108" />
        <circle cx="220" cy="220" r="66" />
      </g>
      {/* rotating dashed ring */}
      <circle
        cx="220"
        cy="220"
        r="150"
        fill="none"
        stroke="var(--brand)"
        strokeOpacity="0.5"
        strokeWidth="1.4"
        strokeDasharray="3 12"
        style={{ transformOrigin: "220px 220px", animation: "spin-slow 40s linear infinite" }}
      />
      {/* crosshair */}
      <g stroke="rgba(15,15,15,0.35)" strokeWidth="1">
        <path d="M220 40 V400" />
        <path d="M40 220 H400" />
      </g>
      {/* measurement ticks */}
      <g stroke="rgba(15,15,15,0.3)" strokeWidth="1">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const r1 = 150;
          const r2 = i % 6 === 0 ? 136 : 143;
          const x1 = 220 + Math.cos(a) * r1;
          const y1 = 220 + Math.sin(a) * r1;
          const x2 = 220 + Math.cos(a) * r2;
          const y2 = 220 + Math.sin(a) * r2;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      {/* center component */}
      <rect x="188" y="188" width="64" height="64" rx="10" fill="#141414" />
      <rect x="200" y="200" width="40" height="40" rx="5" fill="#242424" />
      <circle cx="220" cy="220" r="9" fill="var(--brand)" />
      {/* corner alignment marks */}
      <g stroke="var(--brand-deep)" strokeWidth="1.5">
        <path d="M70 70 h16 M70 70 v16" />
        <path d="M370 70 h-16 M370 70 v16" />
        <path d="M70 370 h16 M70 370 v-16" />
        <path d="M370 370 h-16 M370 370 v-16" />
      </g>
      {/* labels */}
      <text x="230" y="180" fontSize="10" fill="var(--brand)" fontFamily="var(--font-latin)">
        0.00mm
      </text>
      <text x="76" y="60" fontSize="9" fill="#9a9a9a" fontFamily="var(--font-latin)">
        INSPECT
      </text>
    </svg>
  );
}
