'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Government', href: '/#government' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-[var(--card)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-[var(--shadow-sm)]'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center border transition-colors"
              style={{ background: 'var(--primary-subtle)', borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)' }}>
              <Shield className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            </div>
            <span className="font-grotesk font-bold text-[var(--text)] text-lg tracking-tight">
              Shield<span style={{ color: 'var(--primary)' }}>Net AI</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href}
                className="text-sm font-medium transition-colors hover:text-[var(--text)]"
                style={{ color: 'var(--text-secondary)' }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login"
              className="text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:bg-[var(--bg-alt)]"
              style={{ color: 'var(--text-secondary)' }}>
              Sign In
            </Link>
            <Link href="/signup"
              className="btn-primary text-sm px-5 py-2 rounded-lg font-semibold">
              Get Started
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setOpen(!open)}
              className="p-2 rounded-lg hover:bg-[var(--bg-alt)] transition-colors"
              style={{ color: 'var(--text-secondary)' }}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-b px-4 py-4 space-y-1"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              className="block py-2.5 text-sm font-medium transition-colors hover:text-[var(--text)]"
              style={{ color: 'var(--text-secondary)' }}>
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-3 mt-2 border-t" style={{ borderColor: 'var(--border)' }}>
            <Link href="/login"
              className="btn-secondary flex-1 text-center py-2.5 text-sm rounded-lg">
              Sign In
            </Link>
            <Link href="/signup"
              className="btn-primary flex-1 text-center py-2.5 text-sm rounded-lg font-semibold">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
