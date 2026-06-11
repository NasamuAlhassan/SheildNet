import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(34,211,238,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-9 h-9 bg-cyan-400/10 rounded-xl flex items-center justify-center border border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors">
          <Shield className="w-5 h-5 text-cyan-400" />
        </div>
        <span className="font-grotesk font-bold text-white text-xl">
          ShieldNet <span className="text-cyan-400">AI</span>
        </span>
      </Link>

      {/* Card */}
      <div className="relative w-full max-w-md card-glow rounded-2xl p-8">
        {children}
      </div>
    </div>
  );
}
