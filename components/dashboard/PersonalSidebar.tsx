'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, LayoutDashboard, Bell, Eye, Lock, Key, Monitor, CreditCard, LogOut, Menu, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/dashboard',          label: 'Overview',   icon: LayoutDashboard, exact: true },
  { href: '/dashboard/alerts',   label: 'Alerts',     icon: Bell, badge: true },
  { href: '/dashboard/dark-web', label: 'Dark Web',   icon: Eye },
  { href: '/dashboard/vault',    label: 'Vault',      icon: Lock },
  { href: '/dashboard/passwords',label: 'Passwords',  icon: Key },
  { href: '/dashboard/devices',  label: 'Devices',    icon: Monitor },
  { href: '/dashboard/billing',  label: 'Billing',    icon: CreditCard },
];

interface Props { userId: string; userName: string; userEmail: string; }

export default function PersonalSidebar({ userId, userName, userEmail }: Props) {
  const pathname = usePathname();
  const [alertCount, setAlertCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('user_alerts').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('status', 'active').then(({ count }) => setAlertCount(count ?? 0));
    const ch = supabase.channel(`pb-${userId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'user_alerts', filter: `user_id=eq.${userId}` }, () => setAlertCount(p => p + 1))
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'user_alerts', filter: `user_id=eq.${userId}` }, pl => { if (pl.new.status !== 'active' && pl.old?.status === 'active') setAlertCount(p => Math.max(0, p - 1)); })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [userId]);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex-1 py-4 px-3 space-y-0.5">
      {NAV.map(({ href, label, icon: Icon, badge, exact }) => {
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');
        return (
          <Link key={href} href={href} onClick={onClick}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium"
            style={active
              ? { background: 'var(--primary-subtle)', color: 'var(--primary)' }
              : { color: 'var(--text-secondary)' }}
            onMouseEnter={e => { if (!active) { (e.target as HTMLElement).closest('a')!.style.background = 'var(--bg-alt)'; (e.target as HTMLElement).closest('a')!.style.color = 'var(--text)'; } }}
            onMouseLeave={e => { if (!active) { (e.target as HTMLElement).closest('a')!.style.background = ''; (e.target as HTMLElement).closest('a')!.style.color = 'var(--text-secondary)'; } }}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
            {badge && alertCount > 0 && (
              <span className="ml-auto text-[10px] rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-bold leading-tight"
                style={{ background: 'var(--danger)', color: '#fff' }}>
                {alertCount > 99 ? '99+' : alertCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  const SidebarInner = ({ onNavClick }: { onNavClick?: () => void }) => (
    <>
      <div className="flex items-center gap-2.5 px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center border" style={{ background: 'var(--primary-subtle)', borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)' }}>
          <Shield className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
        </div>
        <span className="font-grotesk font-bold text-sm" style={{ color: 'var(--text)' }}>Shield<span style={{ color: 'var(--primary)' }}>Net AI</span></span>
      </div>
      <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <span className="badge badge-primary text-xs">Personal</span>
      </div>
      <NavLinks onClick={onNavClick} />
      <div className="px-5 py-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center font-semibold text-xs"
            style={{ background: 'var(--primary-subtle)', color: 'var(--primary)' }}>
            {userName?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: 'var(--text)' }}>{userName}</p>
            <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{userEmail}</p>
          </div>
        </div>
        <form action="/api/auth/signout" method="POST">
          <button type="submit" className="flex items-center gap-2 text-xs transition-colors hover:text-[var(--danger)]" style={{ color: 'var(--text-muted)' }}>
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0" style={{ background: 'var(--card)', borderRight: '1px solid var(--border)' }}>
        <SidebarInner />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 backdrop-blur-md" style={{ background: 'color-mix(in srgb, var(--card) 95%, transparent)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center border" style={{ background: 'var(--primary-subtle)', borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)' }}>
            <Shield className="w-3 h-3" style={{ color: 'var(--primary)' }} />
          </div>
          <span className="font-grotesk font-bold text-sm" style={{ color: 'var(--text)' }}>Shield<span style={{ color: 'var(--primary)' }}>Net AI</span></span>
        </div>
        <div className="flex items-center gap-2">
          {alertCount > 0 && <span className="text-[10px] rounded-full px-1.5 py-0.5 font-bold" style={{ background: 'var(--danger)', color: '#fff' }}>{alertCount}</span>}
          <button onClick={() => setMobileOpen(true)} className="p-1" style={{ color: 'var(--text-secondary)' }}><Menu className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 flex flex-col overflow-y-auto" style={{ background: 'var(--card)', borderRight: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center border" style={{ background: 'var(--primary-subtle)', borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)' }}>
                  <Shield className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                </div>
                <span className="font-grotesk font-bold text-sm" style={{ color: 'var(--text)' }}>Shield<span style={{ color: 'var(--primary)' }}>Net AI</span></span>
              </div>
              <button onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-secondary)' }}><X className="w-4 h-4" /></button>
            </div>
            <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <span className="badge badge-primary text-xs">Personal</span>
            </div>
            <NavLinks onClick={() => setMobileOpen(false)} />
            <div className="px-5 py-4" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center font-semibold text-xs" style={{ background: 'var(--primary-subtle)', color: 'var(--primary)' }}>{userName?.[0]?.toUpperCase() ?? 'U'}</div>
                <div className="min-w-0"><p className="text-xs font-semibold truncate" style={{ color: 'var(--text)' }}>{userName}</p><p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{userEmail}</p></div>
              </div>
              <form action="/api/auth/signout" method="POST">
                <button type="submit" className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}><LogOut className="w-3.5 h-3.5" /> Sign out</button>
              </form>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
