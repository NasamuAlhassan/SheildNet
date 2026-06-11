'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Users, Bell, MessageSquare, CreditCard, Database, LogOut, Menu, X } from 'lucide-react';

const NAV = [
  { href: '/admin',           label: 'Users',            icon: Users, exact: true },
  { href: '/admin/alerts',    label: 'Alert Management', icon: Bell },
  { href: '/admin/sms-logs',  label: 'SMS Logs',         icon: MessageSquare },
  { href: '/admin/payments',  label: 'Payment Logs',     icon: CreditCard },
  { href: '/admin/scenarios', label: 'Threat Scenarios', icon: Database },
];

export default function AdminSidebar({ userName, userEmail }: { userName: string; userEmail: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const purpleColor = 'var(--primary)';

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex-1 py-4 px-3 space-y-0.5">
      {NAV.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');
        return (
          <Link key={href} href={href} onClick={onClick}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium"
            style={active ? { background: 'var(--primary-subtle)', color: purpleColor } : { color: 'var(--text-secondary)' }}>
            <Icon className="w-4 h-4 flex-shrink-0" />{label}
          </Link>
        );
      })}
    </nav>
  );

  const Footer = () => (
    <div className="px-5 py-4" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-full flex items-center justify-center font-semibold text-xs" style={{ background: 'var(--primary-subtle)', color: purpleColor }}>{userName?.[0]?.toUpperCase() ?? 'A'}</div>
        <div className="min-w-0"><p className="text-xs font-semibold truncate" style={{ color: 'var(--text)' }}>{userName}</p><p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{userEmail}</p></div>
      </div>
      <form action="/api/auth/signout" method="POST">
        <button type="submit" className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}><LogOut className="w-3.5 h-3.5" /> Sign out</button>
      </form>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0" style={{ background: 'var(--card)', borderRight: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2.5 px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center border" style={{ background: 'var(--primary-subtle)', borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)' }}><Shield className="w-3.5 h-3.5" style={{ color: purpleColor }} /></div>
          <span className="font-grotesk font-bold text-sm" style={{ color: 'var(--text)' }}>Shield<span style={{ color: purpleColor }}>Net Admin</span></span>
        </div>
        <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="badge badge-primary text-xs">Superadmin</span>
        </div>
        <NavLinks />
        <Footer />
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 backdrop-blur-md" style={{ background: 'color-mix(in srgb, var(--card) 95%, transparent)', borderBottom: '1px solid var(--border)' }}>
        <span className="font-grotesk font-bold text-sm" style={{ color: 'var(--text)' }}>Shield<span style={{ color: purpleColor }}>Net Admin</span></span>
        <button onClick={() => setMobileOpen(true)} style={{ color: 'var(--text-secondary)' }}><Menu className="w-5 h-5" /></button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 flex flex-col overflow-y-auto" style={{ background: 'var(--card)', borderRight: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <span className="font-grotesk font-bold text-sm" style={{ color: 'var(--text)' }}>Shield<span style={{ color: purpleColor }}>Net Admin</span></span>
              <button onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-secondary)' }}><X className="w-4 h-4" /></button>
            </div>
            <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <span className="badge badge-primary text-xs">Superadmin</span>
            </div>
            <NavLinks onClick={() => setMobileOpen(false)} />
            <Footer />
          </aside>
        </div>
      )}
    </>
  );
}
