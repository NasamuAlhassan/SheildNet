import Link from 'next/link';
import { Shield } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative dot-grid"
      style={{ background: 'var(--bg)' }}>
      {/* Radial fade over dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 30%, var(--bg) 30%, transparent 80%)' }} />

      {/* Theme toggle top-right */}
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Logo */}
      <Link href="/" className="relative flex items-center gap-2.5 mb-8 group z-10">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center border transition-colors"
          style={{ background: 'var(--primary-subtle)', borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)' }}>
          <Shield className="w-5 h-5" style={{ color: 'var(--primary)' }} />
        </div>
        <span className="font-grotesk font-bold text-xl" style={{ color: 'var(--text)' }}>
          Shield<span style={{ color: 'var(--primary)' }}>Net AI</span>
        </span>
      </Link>

      {/* Card */}
      <div className="relative w-full max-w-md card p-8 shadow-[var(--shadow-xl)] z-10">
        {children}
      </div>
    </div>
  );
}
