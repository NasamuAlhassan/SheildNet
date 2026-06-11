'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, LayoutDashboard, Bell, Eye, Lock, Key, Monitor, CreditCard, LogOut, Menu, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/alerts', label: 'Alerts', icon: Bell, badge: true },
  { href: '/dashboard/dark-web', label: 'Dark Web', icon: Eye },
  { href: '/dashboard/vault', label: 'Vault', icon: Lock },
  { href: '/dashboard/passwords', label: 'Passwords', icon: Key },
  { href: '/dashboard/devices', label: 'Devices', icon: Monitor },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
];

interface Props { userId: string; userName: string; userEmail: string; }

export default function PersonalSidebar({ userId, userName, userEmail }: Props) {
  const pathname = usePathname();
  const [alertCount, setAlertCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('user_alerts').select('*', { count: 'exact', head: true })
      .eq('user_id', userId).eq('status', 'active')
      .then(({ count }) => setAlertCount(count ?? 0));

    const ch = supabase.channel(`pb-${userId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'user_alerts', filter: `user_id=eq.${userId}` }, () => setAlertCount(p => p + 1))
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'user_alerts', filter: `user_id=eq.${userId}` },
        (pl) => { if (pl.new.status !== 'active' && pl.old?.status === 'active') setAlertCount(p => Math.max(0, p - 1)); })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [userId]);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex-1 py-4 px-3 space-y-0.5">
      {NAV.map(({ href, label, icon: Icon, badge, exact }) => {
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');
        return (
          <Link key={href} href={href} onClick={onClick} className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm',
            active ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/10' : 'text-slate-400 hover:text-white hover:bg-[#1e293b]/60'
          )}>
            <Icon className="w-4 h-4" />
            {label}
            {badge && alertCount > 0 && (
              <span className="ml-auto text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-bold">{alertCount > 99 ? '99+' : alertCount}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  const UserFooter = () => (
    <div className="px-5 py-4 border-t border-[#1e293b]">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 bg-cyan-400/20 rounded-full flex items-center justify-center text-cyan-400 font-semibold text-xs">{userName?.[0]?.toUpperCase() ?? 'U'}</div>
        <div className="min-w-0">
          <p className="text-white text-xs font-semibold truncate">{userName}</p>
          <p className="text-slate-500 text-xs truncate">{userEmail}</p>
        </div>
      </div>
      <form action="/api/auth/signout" method="POST">
        <button type="submit" className="flex items-center gap-2 text-slate-500 hover:text-red-400 text-xs transition-colors"><LogOut className="w-3.5 h-3.5" /> Sign out</button>
      </form>
    </div>
  );

  const LogoBar = () => (
    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#1e293b]">
      <div className="w-7 h-7 bg-cyan-400/10 rounded-lg flex items-center justify-center border border-cyan-400/20"><Shield className="w-3.5 h-3.5 text-cyan-400" /></div>
      <span className="font-grotesk font-bold text-white text-sm">ShieldNet <span className="text-cyan-400">AI</span></span>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-[#1e293b] bg-[#0a0f1e] flex-shrink-0">
        <LogoBar />
        <div className="px-5 py-3 border-b border-[#1e293b]">
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">Personal</span>
        </div>
        <NavLinks />
        <UserFooter />
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 bg-[#0a0f1e]/95 backdrop-blur-md border-b border-[#1e293b]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-cyan-400/10 rounded-lg flex items-center justify-center border border-cyan-400/20"><Shield className="w-3 h-3 text-cyan-400" /></div>
          <span className="font-grotesk font-bold text-white text-sm">ShieldNet <span className="text-cyan-400">AI</span></span>
        </div>
        <div className="flex items-center gap-2">
          {alertCount > 0 && <span className="text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5 font-bold">{alertCount}</span>}
          <button onClick={() => setMobileOpen(true)} className="text-slate-400 hover:text-white p-1"><Menu className="w-5 h-5" /></button>
        </div>
      </div>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 flex flex-col bg-[#0a0f1e] border-r border-[#1e293b] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e293b]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-cyan-400/10 rounded-lg flex items-center justify-center border border-cyan-400/20"><Shield className="w-3.5 h-3.5 text-cyan-400" /></div>
                <span className="font-grotesk font-bold text-white text-sm">ShieldNet <span className="text-cyan-400">AI</span></span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-5 py-3 border-b border-[#1e293b]">
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">Personal</span>
            </div>
            <NavLinks onClick={() => setMobileOpen(false)} />
            <UserFooter />
          </aside>
        </div>
      )}
    </>
  );
}
