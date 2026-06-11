'use client';

export default function ThreatRadar() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none select-none opacity-60 dark:opacity-100">
      {/* Rings */}
      {[110, 190, 270, 350, 430, 510].map((size, i) => (
        <div
          key={size}
          className="absolute rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid color-mix(in srgb, var(--primary) 15%, transparent)',
            animation: `radar-pulse 3s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}

      {/* Crosshairs */}
      <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-px"
        style={{ background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }} />
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-px"
        style={{ background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }} />

      {/* Sweep trail */}
      <div className="absolute inset-0 rounded-full" style={{
        animation: 'radar-scan 5s linear infinite',
        background: 'conic-gradient(from 0deg, transparent 310deg, color-mix(in srgb, var(--primary) 8%, transparent) 360deg)',
      }} />

      {/* Sweep line */}
      <div className="absolute inset-0" style={{ animation: 'radar-scan 5s linear infinite', transformOrigin: '50% 50%' }}>
        <div className="absolute top-1/2 left-1/2 h-[1px]"
          style={{
            width: '50%',
            background: 'linear-gradient(to right, var(--primary) 0%, transparent 100%)',
            opacity: 0.7,
          }} />
      </div>

      {/* Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--primary)' }} />
        <div className="absolute inset-0 w-2.5 h-2.5 rounded-full animate-ping-slow opacity-50"
          style={{ background: 'var(--primary)' }} />
      </div>

      {/* Threat blips */}
      {[
        { top: '31%', left: '63%', color: 'var(--danger)', ping: true },
        { top: '67%', left: '37%', color: 'var(--warning)', ping: false },
        { top: '25%', left: '44%', color: 'var(--cyber)', ping: false },
        { top: '72%', left: '62%', color: 'var(--success)', ping: false },
        { top: '45%', left: '20%', color: 'var(--danger)', ping: true, delay: '0.7s' },
      ].map((blip, i) => (
        <div key={i} className="absolute" style={{ top: blip.top, left: blip.left }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: blip.color }} />
          {blip.ping && (
            <div className="absolute inset-0 w-1.5 h-1.5 rounded-full animate-ping opacity-60"
              style={{ background: blip.color, animationDelay: blip.delay ?? '0s' }} />
          )}
        </div>
      ))}

      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full" style={{
        background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 4%, transparent) 0%, transparent 65%)',
      }} />
    </div>
  );
}
