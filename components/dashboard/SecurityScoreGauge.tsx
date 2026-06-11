'use client';

import { useEffect, useState } from 'react';

interface Props {
  score: number;
  size?: number;
}

export default function SecurityScoreGauge({ score, size = 160 }: Props) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const target = Math.min(100, Math.max(0, score));
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current = Math.min(target, current + step);
      setDisplayed(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [score]);

  const radius = 54;
  const cx = size / 2;
  const cy = size * 0.62;
  const circumference = Math.PI * radius; // half-circle arc length

  // dashoffset: 0 = full arc (score 100), circumference = no arc (score 0)
  const dashOffset = circumference * (1 - displayed / 100);

  const color =
    displayed >= 80 ? '#10b981' :
    displayed >= 50 ? '#f59e0b' : '#ef4444';

  const label =
    displayed >= 80 ? 'Protected' :
    displayed >= 50 ? 'At Risk' : 'Critical';

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.7} viewBox={`0 0 ${size} ${size * 0.7}`}>
        {/* Track */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="#1e293b"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Score arc */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={`${dashOffset}`}
          style={{
            transition: 'stroke-dashoffset 0.05s linear, stroke 0.3s',
            filter: `drop-shadow(0 0 6px ${color}66)`,
          }}
        />
        {/* Score number */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fill="white"
          fontSize={size * 0.18}
          fontWeight="bold"
          fontFamily="var(--font-space-grotesk), sans-serif"
        >
          {displayed}
        </text>
        {/* /100 */}
        <text x={cx} y={cy + 12} textAnchor="middle" fill="#64748b" fontSize={size * 0.08}>
          / 100
        </text>
      </svg>
      <span className="text-xs font-semibold mt-1" style={{ color }}>
        {label}
      </span>
    </div>
  );
}
