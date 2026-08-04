import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const DisplayIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="11" y="6" width="18" height="28" rx="3" />
    <line x1="11" y1="27" x2="29" y2="27" />
    <line x1="17" y1="9.5" x2="23" y2="9.5" />
  </svg>
);

export const BatteryIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="8" y="12" width="26" height="16" rx="3" />
    <line x1="34" y1="17" x2="37" y2="17" />
    <line x1="34" y1="23" x2="37" y2="23" />
    <line x1="14" y1="17" x2="14" y2="23" />
    <line x1="20" y1="17" x2="20" y2="23" />
    <line x1="26" y1="17" x2="26" y2="23" />
  </svg>
);

export const CameraIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="6" y="11" width="28" height="20" rx="4" />
    <circle cx="20" cy="21" r="6" />
    <circle cx="20" cy="21" r="2" />
    <path d="M14 11l2-3h8l2 3" />
  </svg>
);

export const ChargingIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 6l-8 15h6l-2 13 10-16h-6z" />
  </svg>
);

export const InternalIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="13" y="13" width="14" height="14" rx="2" />
    <path d="M20 6v4M20 30v4M6 20h4M30 20h4M9.5 9.5l3 3M27.5 27.5l3 3M30.5 9.5l-3 3M12.5 27.5l-3 3" />
  </svg>
);

export const ToolsIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M25 7a6 6 0 00-8 7l-9 9 3 3 9-9a6 6 0 007-8l-4 4-3-1-1-3z" />
    <path d="M22 22l7 7" />
  </svg>
);

export const ChipIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="12" y="12" width="16" height="16" rx="2" />
    <rect x="17" y="17" width="6" height="6" rx="1" />
    <path d="M15 12V8M20 12V8M25 12V8M15 28v4M20 28v4M25 28v4M12 15H8M12 20H8M12 25H8M28 15h4M28 20h4M28 25h4" />
  </svg>
);

export const BoardIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="7" y="7" width="26" height="26" rx="3" />
    <rect x="12" y="12" width="9" height="9" rx="1" />
    <path d="M24 13h5M24 17h4M13 25h12M25 25v3" />
    <circle cx="27" cy="24" r="1.4" />
    <circle cx="14" cy="27" r="1.4" />
  </svg>
);

export const FaceIdIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 14v-3a2 2 0 012-2h3M26 9h3a2 2 0 012 2v3M31 26v3a2 2 0 01-2 2h-3M14 31h-3a2 2 0 01-2-2v-3" />
    <path d="M16 17v2M24 17v2M20 17v4l-1.5 1.5M16 25s1.5 1.5 4 1.5 4-1.5 4-1.5" />
  </svg>
);

export const FlexIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8 12c6 0 4 8 10 8s4-8 10-8" />
    <path d="M8 20c6 0 4 8 10 8" />
    <rect x="6" y="9" width="5" height="7" rx="1" />
    <rect x="29" y="9" width="5" height="7" rx="1" />
  </svg>
);

export const SpeakerIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8 15v10h5l7 5V10l-7 5H8z" />
    <path d="M25 15a5 5 0 010 10M28 12a9 9 0 010 16" />
  </svg>
);

export const MicIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="15" y="6" width="10" height="18" rx="5" />
    <path d="M10 20a10 10 0 0020 0M20 30v4M15 34h10" />
  </svg>
);

export const ButtonIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="8" y="9" width="24" height="22" rx="4" />
    <circle cx="20" cy="20" r="6" />
    <circle cx="20" cy="20" r="1.5" fill="currentColor" />
  </svg>
);

export const HousingIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="12" y="5" width="16" height="30" rx="4" />
    <path d="M12 11h16M12 29h16" />
    <rect x="10" y="14" width="2" height="6" rx="1" />
  </svg>
);

export const categoryIcons: ComponentType<IconProps>[] = [
  DisplayIcon,
  BatteryIcon,
  CameraIcon,
  ChargingIcon,
  InternalIcon,
  ToolsIcon,
];

/** Ordered icons for the full spare-parts catalogue (13 categories). */
export const catalogueIcons: ComponentType<IconProps>[] = [
  DisplayIcon,
  BatteryIcon,
  CameraIcon,
  ChargingIcon,
  ChipIcon,
  BoardIcon,
  FaceIdIcon,
  FlexIcon,
  SpeakerIcon,
  MicIcon,
  ButtonIcon,
  HousingIcon,
  ToolsIcon,
];
