import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "start",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start";

  return (
    <div
      className={`flex flex-col ${alignment} ${
        align === "center" ? "max-w-2xl" : "max-w-3xl"
      } ${className}`}
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-brand/50" aria-hidden />
          <span className="text-eyebrow">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-h2 mt-5 text-text">{title}</h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.1}>
          <p className="text-lead mt-5">{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
