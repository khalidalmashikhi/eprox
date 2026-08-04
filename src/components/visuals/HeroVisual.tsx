"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

interface HeroVisualProps {
  labels: string[];
}

type LayerId =
  | "display"
  | "frame"
  | "camera"
  | "board"
  | "battery"
  | "charging"
  | "speaker";

/**
 * Premium exploded-smartphone assembly, built entirely from layered SVG +
 * CSS gradients (no photos, no raster). Seven layers float independently,
 * respond to a subtle pointer parallax, and lift + glow when their hotspot
 * card is hovered. All motion collapses for reduced-motion users.
 */
export function HeroVisual({ labels }: HeroVisualProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<LayerId | null>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 55, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 55, damping: 18, mass: 0.6 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
    setActive(null);
  }

  // Parallax factor per layer (front layers travel more).
  const f = (n: number) => (reduce ? 0 : n);
  const pDisplay = { x: useTransform(sx, (v) => v * f(30)), y: useTransform(sy, (v) => v * f(30)) };
  const pFrame = { x: useTransform(sx, (v) => v * f(22)), y: useTransform(sy, (v) => v * f(22)) };
  const pCamera = { x: useTransform(sx, (v) => v * f(34)), y: useTransform(sy, (v) => v * f(34)) };
  const pBoard = { x: useTransform(sx, (v) => v * f(14)), y: useTransform(sy, (v) => v * f(14)) };
  const pBattery = { x: useTransform(sx, (v) => v * f(8)), y: useTransform(sy, (v) => v * f(8)) };
  const pCharging = { x: useTransform(sx, (v) => v * f(4)), y: useTransform(sy, (v) => v * f(4)) };
  const pSpeaker = { x: useTransform(sx, (v) => v * f(4)), y: useTransform(sy, (v) => v * f(4)) };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto aspect-square w-full max-w-[680px] select-none"
    >
      {/* soft technical radial background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 52% 42%, rgba(84,10,9,0.09), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="tech-grid pointer-events-none absolute inset-[6%] opacity-45 sm:opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-[14%] rounded-full opacity-[0.13]"
        style={{
          background:
            "conic-gradient(from 200deg, transparent 0deg, var(--brand) 60deg, transparent 170deg)",
          animation: reduce ? "none" : "spin-slow 32s linear infinite",
        }}
        aria-hidden
      />

      {/* exploded stack */}
      <div className="absolute inset-0" style={{ perspective: "1500px" }} aria-hidden>
        <div
          className="absolute inset-0 scale-[0.56] sm:scale-[0.7] md:scale-[0.8] lg:scale-[0.92]"
          style={{ transform: "rotateX(56deg) rotateZ(-36deg)", transformStyle: "preserve-3d" }}
        >
          <Layer id="battery" z={-200} p={pBattery} active={active} reduce={reduce} delay={0.1}>
            <BatteryPlate active={active === "battery"} />
          </Layer>
          <Layer id="charging" z={-120} p={pCharging} active={active} reduce={reduce} delay={0.15} offset={[104, 232]}>
            <ChargingModule active={active === "charging"} />
          </Layer>
          <Layer id="speaker" z={-120} p={pSpeaker} active={active} reduce={reduce} delay={0.2} offset={[-108, 236]}>
            <SpeakerModule active={active === "speaker"} />
          </Layer>
          <Layer id="board" z={-30} p={pBoard} active={active} reduce={reduce} delay={0.28}>
            <BoardPlate active={active === "board"} />
          </Layer>
          <Layer id="frame" z={120} p={pFrame} active={active} reduce={reduce} delay={0.36}>
            <FramePlate active={active === "frame"} />
          </Layer>
          <Layer id="camera" z={230} p={pCamera} active={active} reduce={reduce} delay={0.42} offset={[110, -236]}>
            <CameraModule active={active === "camera"} />
          </Layer>
          <Layer id="display" z={300} p={pDisplay} active={active} reduce={reduce} delay={0.48}>
            <DisplayPlate active={active === "display"} />
          </Layer>
        </div>
      </div>

      {/* interactive hotspot cards — the three key components */}
      <Hotspot
        className="left-[1%] top-[21%]"
        side="start"
        label={labels[0]}
        code="01"
        onHover={() => setActive("display")}
        onLeave={() => setActive(null)}
        reduce={reduce}
        delay={0.7}
      />
      <Hotspot
        className="right-[0%] top-[39%]"
        side="end"
        label={labels[2]}
        code="02"
        onHover={() => setActive("camera")}
        onLeave={() => setActive(null)}
        reduce={reduce}
        delay={0.84}
      />
      <Hotspot
        className="left-[3%] bottom-[23%]"
        side="start"
        label={labels[1]}
        code="03"
        onHover={() => setActive("battery")}
        onLeave={() => setActive(null)}
        reduce={reduce}
        delay={0.98}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Layer wrapper — z separation + parallax + float + hover lift/glow
 * ------------------------------------------------------------------ */
function Layer({
  id,
  z,
  p,
  active,
  reduce,
  delay,
  offset = [0, 0],
  children,
}: {
  id: LayerId;
  z: number;
  p: { x: MotionValue<number>; y: MotionValue<number> };
  active: LayerId | null;
  reduce: boolean | null;
  delay: number;
  offset?: [number, number];
  children: React.ReactNode;
}) {
  const isActive = active === id;
  const dimmed = active !== null && !isActive;
  const lift = isActive ? z + 60 : z;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ x: p.x, y: p.y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0.2 : 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        style={{
          transform: `translate3d(${offset[0]}px, ${offset[1]}px, ${lift}px)`,
          transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className={reduce ? "" : "animate-float-y"} style={{ animationDelay: `${delay}s` }}>
          <div
            style={{
              transition: "filter 0.4s ease, opacity 0.4s ease",
              opacity: dimmed ? 0.55 : 1,
              filter: isActive
                ? "drop-shadow(0 0 22px rgba(84,10,9,0.45)) drop-shadow(0 30px 40px rgba(60,8,8,0.3))"
                : "none",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * SVG plates — 236 x 476 phone format for the big layers
 * ------------------------------------------------------------------ */
const W = 236;
const H = 476;

function PlateSvg({
  children,
  w = W,
  h = H,
  shadow = "0 30px 40px rgba(60,8,8,0.24)",
}: {
  children: React.ReactNode;
  w?: number;
  h?: number;
  shadow?: string;
}) {
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ filter: `drop-shadow(${shadow})` }}>
      {children}
    </svg>
  );
}

function DisplayPlate({ active }: { active: boolean }) {
  return (
    <PlateSvg>
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#f4f4f2" stopOpacity="0.4" />
          <stop offset="1" stopColor="#e9e9e6" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width={W - 12} height={H - 12} rx="34" fill="url(#glass)" stroke="rgba(15,15,15,0.22)" strokeWidth="1.6" />
      <rect x="16" y="16" width={W - 32} height={H - 32} rx="26" fill="#ffffff" fillOpacity="0.14" stroke="rgba(15,15,15,0.08)" />
      {/* reflection sheen */}
      <path d={`M16 44 L${W - 16} 16 L${W - 16} 96 L16 156 Z`} fill="url(#sheen)" opacity={active ? 1 : 0.8} />
      {/* speaker + camera dot */}
      <rect x={W / 2 - 20} y="26" width="40" height="7" rx="3.5" fill="rgba(15,15,15,0.18)" />
      <circle cx={W / 2 + 34} cy="30" r="4" fill="rgba(15,15,15,0.2)" />
      {/* brand accent line */}
      <rect x="30" y="330" width={W - 60} height="2" fill="var(--brand)" opacity="0.55" />
      <text x="30" y="356" fontSize="11" fontFamily="var(--font-latin)" fill="var(--brand)" letterSpacing="1.5">DISPLAY</text>
      <text x="30" y="374" fontSize="8" fontFamily="var(--font-latin)" fill="#a6a6a6">OLED · GLASS</text>
    </PlateSvg>
  );
}

function FramePlate({ active }: { active: boolean }) {
  return (
    <PlateSvg>
      <defs>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d8d8d4" />
          <stop offset="0.5" stopColor="#f3f3f0" />
          <stop offset="1" stopColor="#cfcfca" />
        </linearGradient>
      </defs>
      {/* midframe = metallic ring, transparent centre so internals show through */}
      <rect x="6" y="6" width={W - 12} height={H - 12} rx="34" fill="none" stroke="url(#metal)" strokeWidth="15" />
      <rect x="6" y="6" width={W - 12} height={H - 12} rx="34" fill="none" stroke="rgba(15,15,15,0.22)" strokeWidth="1.2" />
      <rect x="15" y="15" width={W - 30} height={H - 30} rx="27" fill="none" stroke="rgba(15,15,15,0.14)" strokeWidth="1" />
      {/* side buttons */}
      <rect x="1" y="150" width="6" height="46" rx="3" fill="#c4c4bf" />
      <rect x="1" y="210" width="6" height="30" rx="3" fill="#c4c4bf" />
      <rect x={W - 7} y="170" width="6" height="60" rx="3" fill="#c4c4bf" />
      <text x="30" y="250" fontSize="10" fontFamily="var(--font-latin)" fill={active ? "var(--brand)" : "#9a9a9a"} letterSpacing="1.5">FRAME</text>
      <text x="30" y="266" fontSize="8" fontFamily="var(--font-latin)" fill="#b0b0b0">ALUMINUM</text>
    </PlateSvg>
  );
}

function BoardPlate({ active }: { active: boolean }) {
  return (
    <PlateSvg>
      <rect x="6" y="6" width={W - 12} height={H - 12} rx="30" fill="#f0eeea" stroke="rgba(84,10,9,0.18)" strokeWidth="1.3" />
      {/* traces */}
      <g stroke={active ? "var(--brand)" : "rgba(84,10,9,0.32)"} strokeWidth="1.3" fill="none">
        <path d="M44 70 H160 V130 H126" />
        <path d="M44 100 H96 V172" />
        <path d="M192 78 V214 H140" />
        <path d="M44 236 H182" />
        <path d="M64 280 V386 H160" />
        <path d="M150 320 H196" />
      </g>
      {/* nodes */}
      <g fill="var(--brand)">
        {[[44, 70], [160, 130], [96, 172], [192, 214], [160, 386], [196, 320]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" />
        ))}
      </g>
      {/* chips */}
      <rect x="74" y="192" width="58" height="58" rx="7" fill="#1a1a1a" />
      <rect x="85" y="203" width="36" height="36" rx="4" fill="#2c2c2c" />
      <rect x="128" y="286" width="44" height="28" rx="4" fill="#1a1a1a" />
      {/* gold pads */}
      <g fill="#c9a24b">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={44 + i * 10} y="410" width="6" height="18" rx="1" />
        ))}
      </g>
      <text x="30" y="60" fontSize="10" fontFamily="var(--font-latin)" fill="var(--brand-deep)" letterSpacing="1.5">MAINBOARD</text>
    </PlateSvg>
  );
}

function BatteryPlate({ active }: { active: boolean }) {
  return (
    <PlateSvg shadow="0 34px 44px rgba(20,20,20,0.34)">
      <defs>
        <linearGradient id="cell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#242424" />
          <stop offset="1" stopColor="#0e0e0e" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width={W - 12} height={H - 12} rx="30" fill="url(#cell)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.3" />
      <rect x="32" y="70" width={W - 64} height={H - 150} rx="16" fill="none" stroke={active ? "var(--brand-strong)" : "rgba(255,255,255,0.22)"} strokeWidth="1.5" />
      <g stroke="rgba(255,255,255,0.14)" strokeWidth="1">
        <path d="M32 160 H204" /><path d="M32 250 H204" /><path d="M32 340 H204" />
      </g>
      {/* terminal */}
      <rect x={W / 2 - 20} y="52" width="40" height="16" rx="4" fill="var(--brand)" />
      <text x={W / 2} y="250" fontSize="12" fontFamily="var(--font-latin)" fill="rgba(255,255,255,0.75)" textAnchor="middle" letterSpacing="3">CELL</text>
      <text x="34" y="404" fontSize="9" fontFamily="var(--font-latin)" fill="rgba(255,255,255,0.4)">Li-ion</text>
    </PlateSvg>
  );
}

function CameraModule({ active }: { active: boolean }) {
  return (
    <PlateSvg w={150} h={150} shadow="0 24px 30px rgba(20,20,20,0.4)">
      <defs>
        <radialGradient id="lens" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#3a3a3a" />
          <stop offset="0.6" stopColor="#111" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
      </defs>
      <rect x="8" y="8" width="134" height="134" rx="30" fill="#141414" stroke="rgba(255,255,255,0.12)" strokeWidth="1.4" />
      <circle cx="52" cy="52" r="26" fill="url(#lens)" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
      <circle cx="52" cy="52" r="11" fill="#050505" />
      <circle cx="46" cy="46" r="4" fill={active ? "var(--brand)" : "rgba(120,30,34,0.9)"} />
      <circle cx="100" cy="52" r="22" fill="url(#lens)" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
      <circle cx="94" cy="46" r="3.5" fill="rgba(255,255,255,0.35)" />
      <circle cx="70" cy="102" r="20" fill="url(#lens)" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
      <circle cx="112" cy="104" r="7" fill="#0a0a0a" stroke="rgba(255,255,255,0.12)" />
    </PlateSvg>
  );
}

function ChargingModule({ active }: { active: boolean }) {
  return (
    <PlateSvg w={190} h={96} shadow="0 20px 26px rgba(60,8,8,0.24)">
      <rect x="6" y="6" width="178" height="84" rx="16" fill="#f0eeea" stroke="rgba(84,10,9,0.2)" strokeWidth="1.3" />
      {/* USB-C */}
      <rect x="14" y="38" width="30" height="20" rx="8" fill="#1a1a1a" />
      <rect x="20" y="45" width="18" height="6" rx="3" fill="#3a3a3a" />
      <g stroke={active ? "var(--brand)" : "rgba(84,10,9,0.3)"} strokeWidth="1.2" fill="none">
        <path d="M54 48 H120" /><path d="M70 30 V66" />
      </g>
      <rect x="120" y="30" width="34" height="36" rx="5" fill="#1a1a1a" />
      <circle cx="168" cy="34" r="3" fill="var(--brand)" />
      <text x="14" y="82" fontSize="7.5" fontFamily="var(--font-latin)" fill="#9a9a9a">CHARGING BOARD</text>
    </PlateSvg>
  );
}

function SpeakerModule({ active }: { active: boolean }) {
  return (
    <PlateSvg w={190} h={80} shadow="0 20px 26px rgba(20,20,20,0.3)">
      <rect x="6" y="6" width="178" height="68" rx="16" fill="#1b1b1b" stroke="rgba(255,255,255,0.1)" strokeWidth="1.3" />
      <g fill={active ? "var(--brand)" : "rgba(255,255,255,0.35)"}>
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 3 }).map((__, c) => (
            <circle key={`${r}-${c}`} cx={26 + r * 20} cy={26 + c * 14} r="2.4" />
          )),
        )}
      </g>
      <rect x="150" y="24" width="26" height="32" rx="5" fill="#2a2a2a" />
      <text x="150" y="70" fontSize="7" fontFamily="var(--font-latin)" fill="rgba(255,255,255,0.4)">SPEAKER</text>
    </PlateSvg>
  );
}

/* ------------------------------------------------------------------ *
 * Hotspot card
 * ------------------------------------------------------------------ */
function Hotspot({
  className,
  side,
  label,
  code,
  onHover,
  onLeave,
  reduce,
  delay,
}: {
  className: string;
  side: "start" | "end";
  label: string;
  code: string;
  onHover: () => void;
  onLeave: () => void;
  reduce: boolean | null;
  delay: number;
}) {
  return (
    <motion.button
      type="button"
      tabIndex={-1}
      aria-hidden
      onPointerEnter={onHover}
      onPointerLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className={`group absolute z-30 flex items-center gap-2.5 ${className}`}
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.55, delay }}
    >
      {side === "end" ? <Connector /> : null}
      <span className="flex items-center gap-2 rounded-2xl border border-[var(--border-strong)] bg-white/95 px-3 py-2 shadow-[var(--shadow-md)] backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand/40 group-hover:shadow-[var(--shadow-lg)]">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-soft text-[10px] font-bold text-brand-deep transition-colors duration-300 group-hover:bg-brand-deep group-hover:text-white">
          {code}
        </span>
        <span className="text-[12px] font-semibold text-text">{label}</span>
      </span>
      {side === "start" ? <Connector /> : null}
    </motion.button>
  );
}

function Connector() {
  return (
    <span className="flex items-center" aria-hidden>
      <span className="h-px w-6 bg-[var(--border-strong)] transition-colors duration-300 group-hover:bg-brand sm:w-9" />
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--border-strong)] transition-colors duration-300 group-hover:bg-brand" />
    </span>
  );
}
