'use client';

import { useEffect, useState, useRef } from 'react';

const STATS = [
  { label: 'Threats Neutralized', value: 500, suffix: 'M+' },
  { label: 'Average Uptime',       value: 99.99, suffix: '%', decimals: 2 },
  { label: 'Protected Organizations', value: 50, suffix: 'K+' },
  { label: 'Intel Update Interval',   value: 60, suffix: 's' },
];

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let step = 0;
        const steps = 60;
        const timer = setInterval(() => {
          step++;
          const eased = 1 - Math.pow(1 - step / steps, 3);
          setCount(parseFloat((value * eased).toFixed(decimals)));
          if (step >= steps) { setCount(value); clearInterval(timer); }
        }, 1800 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, decimals]);

  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}</span>;
}

export default function AnimatedStats() {
  return (
    <section className="relative py-14 section-divider" style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-grotesk text-3xl md:text-4xl font-bold text-gradient mb-1">
                <Counter {...stat} />
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
