/**
 * Three distinct, locally-drawn SVG illustrations — one per service.
 * Server components (no client JS). Motion is CSS-only where present.
 */

const frame = "relative z-10 h-auto w-full max-w-[320px]";

interface VisualProps {
  dark?: boolean;
}

export function ServicePartsSVG() {
  return (
    <svg viewBox="0 0 320 240" className={frame} role="img" aria-label="Spare parts modules">
      {/* display */}
      <g>
        <rect x="18" y="30" width="86" height="180" rx="14" fill="#fff" stroke="rgba(15,15,15,0.14)" />
        <rect x="28" y="42" width="66" height="150" rx="8" fill="#f2f2f0" />
        <rect x="28" y="150" width="66" height="2" fill="var(--brand)" opacity="0.5" />
        <text x="34" y="205" fontSize="8" fill="#9a9a9a" fontFamily="var(--font-latin)">DISPLAY</text>
      </g>
      {/* battery */}
      <g>
        <rect x="120" y="60" width="70" height="120" rx="10" fill="var(--brand-soft)" stroke="rgba(84,10,9,0.25)" />
        <rect x="146" y="50" width="18" height="12" rx="3" fill="var(--brand)" />
        <g stroke="rgba(84,10,9,0.25)"><path d="M120 100 H190" /><path d="M120 140 H190" /></g>
      </g>
      {/* camera + chip cluster */}
      <g>
        <rect x="206" y="30" width="96" height="96" rx="16" fill="#141414" />
        <circle cx="232" cy="58" r="12" fill="#0c0c0c" stroke="rgba(255,255,255,0.18)" />
        <circle cx="232" cy="58" r="5" fill="var(--brand)" />
        <circle cx="266" cy="58" r="10" fill="#0c0c0c" stroke="rgba(255,255,255,0.14)" />
        <circle cx="248" cy="92" r="9" fill="#0c0c0c" stroke="rgba(255,255,255,0.14)" />
      </g>
      <g>
        <rect x="206" y="140" width="96" height="70" rx="12" fill="#fff" stroke="rgba(15,15,15,0.14)" />
        <rect x="222" y="158" width="30" height="30" rx="5" fill="#1a1a1a" />
        <g stroke="rgba(84,10,9,0.3)" fill="none"><path d="M258 160 h30 M258 175 h22 M258 190 h30" /></g>
      </g>
    </svg>
  );
}

export function ServiceRepairSVG() {
  return (
    <svg viewBox="0 0 320 240" className={frame} role="img" aria-label="Diagnostics and repair">
      {/* diagnostic panel */}
      <rect x="20" y="30" width="280" height="180" rx="16" fill="#fff" stroke="rgba(15,15,15,0.14)" />
      <line x1="20" y1="66" x2="300" y2="66" stroke="rgba(15,15,15,0.1)" />
      <circle cx="40" cy="48" r="4" fill="var(--brand)" />
      <text x="54" y="52" fontSize="10" fill="#141414" fontFamily="var(--font-latin)" fontWeight="600">DIAGNOSTICS</text>
      {/* waveform */}
      <polyline
        points="36,150 66,150 82,110 98,178 118,132 140,150 300,150"
        fill="none"
        stroke="var(--brand)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <g transform="translate(150,150)">
        <line x1="0" y1="-60" x2="0" y2="60" stroke="rgba(15,15,15,0.08)" />
      </g>
      {/* readout bars */}
      <g>
        <rect x="176" y="92" width="108" height="8" rx="4" fill="#eee" />
        <rect x="176" y="92" width="80" height="8" rx="4" fill="var(--brand)" />
        <rect x="176" y="112" width="108" height="8" rx="4" fill="#eee" />
        <rect x="176" y="112" width="54" height="8" rx="4" fill="var(--brand-deep)" />
      </g>
      <text x="36" y="196" fontSize="8" fill="#9a9a9a" fontFamily="var(--font-latin)">SIGNAL · OK</text>
    </svg>
  );
}

export function ServiceSupplySVG({ dark = false }: VisualProps) {
  const line = dark ? "rgba(255,255,255,0.35)" : "rgba(84,10,9,0.25)";
  const nodeFill = dark ? "rgba(255,255,255,0.06)" : "#fff";
  const nodeStroke = dark ? "rgba(255,255,255,0.35)" : "rgba(15,15,15,0.16)";
  const accent = dark ? "rgba(255,255,255,0.45)" : "var(--brand-soft)";
  const hubFill = dark ? "#ffffff" : "var(--brand-deep)";
  const hubText = dark ? "#540a09" : "#ffffff";
  const ring = dark ? "rgba(255,255,255,0.4)" : "var(--brand)";
  return (
    <svg viewBox="0 0 320 240" className={frame} role="img" aria-label="Wholesale supply network">
      {/* central hub */}
      <circle cx="160" cy="120" r="30" fill={hubFill} />
      <text x="160" y="124" fontSize="10" fill={hubText} textAnchor="middle" fontFamily="var(--font-latin)" letterSpacing="1">HUB</text>
      {/* nodes */}
      {[
        [50, 46],
        [270, 46],
        [40, 190],
        [280, 190],
        [160, 30],
        [160, 210],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1="160" y1="120" x2={x} y2={y} stroke={line} strokeWidth="1.2" />
          <rect x={x - 16} y={y - 12} width="32" height="24" rx="5" fill={nodeFill} stroke={nodeStroke} />
          <rect x={x - 16} y={y - 12} width="32" height="7" rx="2" fill={accent} />
        </g>
      ))}
      <circle cx="160" cy="120" r="46" fill="none" stroke={ring} strokeOpacity={dark ? 0.5 : 0.3} strokeDasharray="2 8" />
    </svg>
  );
}
