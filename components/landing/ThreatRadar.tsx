'use client';

export default function ThreatRadar() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] pointer-events-none select-none">
      {/* Concentric rings */}
      {[120, 200, 280, 360, 440, 520, 600].map((size, i) => (
        <div
          key={size}
          className="absolute rounded-full border border-cyan-400/[0.07] animate-radar-pulse"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Cross-hair lines */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-400/[0.04] -translate-y-px" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-400/[0.04] -translate-x-px" />

      {/* Sweep trail (conic gradient) */}
      <div
        className="absolute inset-0 rounded-full animate-radar-scan"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 300deg, rgba(34,211,238,0.06) 360deg)',
        }}
      />

      {/* Sweep line */}
      <div className="absolute inset-0 animate-radar-scan" style={{ transformOrigin: '50% 50%' }}>
        <div
          className="absolute top-1/2 left-1/2 h-[1px]"
          style={{
            width: '50%',
            background: 'linear-gradient(to right, rgba(34,211,238,0.7) 0%, transparent 100%)',
            transformOrigin: 'left center',
          }}
        />
      </div>

      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
        <div className="absolute inset-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping-slow opacity-60" />
      </div>

      {/* Blip dots — simulated threats */}
      <div className="absolute" style={{ top: '32%', left: '63%' }}>
        <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
        <div className="absolute inset-0 w-1.5 h-1.5 bg-red-400/40 rounded-full animate-ping" style={{ animationDuration: '1.5s' }} />
      </div>
      <div className="absolute" style={{ top: '66%', left: '38%' }}>
        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
      </div>
      <div className="absolute" style={{ top: '26%', left: '44%' }}>
        <div className="w-1 h-1 bg-cyan-400 rounded-full" />
      </div>
      <div className="absolute" style={{ top: '72%', left: '61%' }}>
        <div className="w-1 h-1 bg-emerald-400 rounded-full" />
      </div>
      <div className="absolute" style={{ top: '45%', left: '21%' }}>
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.03) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
