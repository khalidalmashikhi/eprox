"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Step {
  title: string;
  description: string;
}

/**
 * Premium process timeline — vertical on mobile, horizontal rail on desktop.
 * Each numbered node fills with brand burgundy as it's revealed. Matches the
 * homepage repair timeline exactly, parameterized by step count.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const cols = steps.length <= 5 ? "lg:grid-cols-5" : "lg:grid-cols-6";
  return (
    <ol className={`relative mt-12 grid gap-y-8 ${cols} lg:gap-x-4 lg:gap-y-0`}>
      <span className="absolute inset-x-0 top-[22px] hidden h-px bg-border lg:block" aria-hidden />
      {steps.map((step, i) => (
        <TimelineStep key={step.title} step={step} index={i} last={i === steps.length - 1} />
      ))}
    </ol>
  );
}

function TimelineStep({ step, index, last }: { step: Step; index: number; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const active = reduce ? true : inView;

  return (
    <li ref={ref} className="relative flex gap-4 lg:flex-col lg:gap-0 lg:px-2">
      {!last ? (
        <span
          className="absolute top-11 h-[calc(100%+2rem)] w-px bg-border start-[22px] lg:hidden"
          aria-hidden
        />
      ) : null}

      <motion.span
        initial={false}
        animate={{
          backgroundColor: active ? "var(--brand-deep)" : "var(--background)",
          color: active ? "#ffffff" : "var(--brand-deep)",
          borderColor: active ? "var(--brand-deep)" : "var(--border)",
        }}
        transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold shadow-[var(--shadow-sm)]"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.05 }}
        className="pt-1.5 lg:mt-6 lg:pt-0"
      >
        <h3 className="text-[1.05rem] font-semibold leading-snug text-text">{step.title}</h3>
        <p className="text-body mt-2 text-[0.9rem] lg:pe-4">{step.description}</p>
      </motion.div>
    </li>
  );
}
