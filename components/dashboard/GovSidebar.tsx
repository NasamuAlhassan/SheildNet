'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Radio, Globe, Zap, Share2, Lock, MessageSquare, BarChart3, LogOut, Menu, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const NAV = [
  { href: '/gov',                label: 'War Room',            icon: Radio,         exact: true, badge: true },
  { href: '/gov/threats',        label: 'Nation-State Threats',icon: Globe },
  { href: '/gov/infrastructure', label: 'Infrastructure',      icon: Zap },
  { href: '/gov/sharing',        label: 'Inter-Agency Sharing',icon: Share2 },
  { href: '/gov/classified',     label: 'Classified Data',     icon: Lock },
  { href: '/gov/sms-broadcast',  label: 'Emergency SMS',       icon: MessageSquare },
  { href: '/gov/sla',            label: 'SLA Status',          icon: BarChart3 },
];

export default function GovSidebar({ userId, userName }: { userId: string; userName: string }) {
  const pathname = usePathname();
  const [alertCount, setAlertCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('user_alerts').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('status', 'active').then(({ count }) => setAlertCount(count ?? 0));
    const ch = supabase.channel(`gb-${userId}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'user_alerts', filter: `user_id=eq.${userId}` }, () => setAlertCount(p => p + 1)).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [userId]);

  const warningColor = 'var(--warning)';

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex-1 py-4 px-3 space-y-0.5">
      {NAV.map(({ href, label, icon: Icon, badge, exact }) => {
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');
        return (
          <Link key={href} href={href} onClick={onClick}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium"
            style={active ? { background: `color-mix(in srgb, ${warningColor} 10%, transparent)`, color: warningColor } : { color: 'var(--text-secondary)' }}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
            {badge && alertCount > 0 && <span className="ml-auto text-[10px] rounded-full px-1.5 py-0.5 font-bold" style={{ background: 'var(--danger)', color: '#fff' }}>{alertCount}</span>}
          </Link>
        );
      })}
    </nav>
  );

  const Footer = () => (
    <div className="px-5 py-4" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-full flex items-center justify-center font-semibold text-xs" style={{ background: `color-mix(in srgb, ${warningColor} 15%, transparent)`, color: warningColor }}>{userName?.[0]?.toUpperCase() ?? 'G'}</div>
        <div><p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{userName}</p><p className="text-xs" style={{ color: 'var(--text-muted)' }}>Gov Admin</p></div>
      </div>
      <form action="/api/auth/signout" method="POST">
        <button type="submit" className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}><LogOut className="w-3.5 h-3.5" /> Sign out</button>
      </form>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0" style={{ background: 'var(--card)', borderRight: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2.5 px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center border" style={{ background: `color-mix(in srgb, ${warningColor} 10%, transparent)`, borderColor: `color-mix(in srgb, ${warningColor} 25%, transparent)` }}><Shield className="w-3.5 h-3.5" style={{ color: warningColor }} /></div>
          <span className="font-grotesk font-bold text-sm" style={{ color: 'var(--text)' }}>Shield<span style={{ color: warningColor }}>Net Gov</span></span>
        </div>
        <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="badge text-xs" style={{ background: `color-mix(in srgb, ${warningColor} 10%, transparent)`, color: warningColor, borderColor: `color-mix(in srgb, ${warningColor} 22%, transparent)` }}>Government</span>
        </div>
        <NavLinks />
        <Footer />
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 backdrop-blur-md" style={{ background: 'color-mix(in srgb, var(--card) 95%, transparent)', borderBottom: '1px solid var(--border)' }}>
        <span className="font-grotesk font-bold text-sm" style={{ color: 'var(--text)' }}>Shield<span style={{ color: warningColor }}>Net Gov</span></span>
        <div className="flex items-center gap-2">
          {alertCount > 0 && <span className="text-[10px] rounded-full px-1.5 py-0.5 font-bold" style={{ background: 'var(--danger)', color: '#fff' }}>{alertCount}</span>}
          <button onClick={() => setMobileOpen(true)} style={{ color: 'var(--text-secondary)' }}><Menu className="w-5 h-5" /></button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 flex flex-col overflow-y-auto" style={{ background: 'var(--card)', borderRight: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <span className="font-grotesk font-bold text-sm" style={{ color: 'var(--text)' }}>Shield<span style={{ color: warningColor }}>Net Gov</span></span>
              <button onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-secondary)' }}><X className="w-4 h-4" /></button>
            </div>
            <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <span className="badge text-xs" style={{ background: `color-mix(in srgb, ${warningColor} 10%, transparent)`, color: warningColor, borderColor: `color-mix(in srgb, ${warningColor} 22%, transparent)` }}>Government</span>
            </div>
            <NavLinks onClick={() => setMobileOpen(false)} />
            <Footer />
          </aside>
        </div>
      )}
    </>
  );
}
