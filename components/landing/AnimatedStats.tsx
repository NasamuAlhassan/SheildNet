'use client';

import { useEffect, useState, useRef } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
}

const stats: Stat[] = [
  { label: 'Threats Neutralized', value: 500, suffix: 'M+' },
  { label: 'Average Uptime', value: 99.99, suffix: '%', decimals: 2 },
  { label: 'Protected Organizations', value: 50, suffix: 'K+' },
  { label: 'Intel Update Interval', value: 60, suffix: 's' },
];

function Counter({ value, suffix, decimals = 0 }: Omit<Stat, 'label'>) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((value * eased).toFixed(decimals)));
            if (step >= steps) {
              setCount(value);
              clearInterval(timer);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function AnimatedStats() {
  return (
    <section className="relative py-14 border-y border-[#1e293b]">
      <div className="absolute inset-0 bg-[#0d1426]/60" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-grotesk text-3xl md:text-4xl font-bold text-gradient-cyber mb-1">
                <Counter {...stat} />
              </div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
