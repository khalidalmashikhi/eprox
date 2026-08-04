import { PackageCheck, Wrench, ScanLine, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/content";
import { Reveal } from "@/components/ui/Reveal";

const icons = [PackageCheck, Wrench, ScanLine, ShieldCheck];

export function TrustStrip({ dict }: { dict: Dictionary }) {
  return (
    <section aria-label="trust" className="border-y border-border bg-surface">
      <div className="container-x">
        <ul className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x rtl:md:divide-x-reverse">
          {dict.trust.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.06}
                className="group flex items-center gap-3 px-2 py-6 md:justify-center md:px-6 md:py-8"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-deep text-white shadow-[var(--shadow-sm)] transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon className="h-[19px] w-[19px]" strokeWidth={1.7} />
                </span>
                <span className="text-[0.92rem] font-semibold leading-tight text-text">
                  {item.title}
                </span>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
