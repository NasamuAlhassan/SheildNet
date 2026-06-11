'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Users, Bell, MessageSquare, CreditCard, Database, LogOut, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/admin', label: 'Users', icon: Users, exact: true },
  { href: '/admin/alerts', label: 'Alert Management', icon: Bell },
  { href: '/admin/sms-logs', label: 'SMS Logs', icon: MessageSquare },
  { href: '/admin/payments', label: 'Payment Logs', icon: CreditCard },
  { href: '/admin/scenarios', label: 'Threat Scenarios', icon: Database },
];

interface Props { userName: string; userEmail: string; }

export default function AdminSidebar({ userName, userEmail }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex-1 py-4 px-3 space-y-0.5">
      {NAV.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');
        return (
          <Link key={href} href={href} onClick={onClick} className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm',
            active ? 'bg-purple-400/10 text-purple-400 border border-purple-400/10' : 'text-slate-400 hover:text-white hover:bg-[#1e293b]/60'
          )}>
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  const UserFooter = () => (
    <div className="px-5 py-4 border-t border-[#1e293b]">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 bg-purple-400/20 rounded-full flex items-center justify-center text-purple-400 font-semibold text-xs">{userName?.[0]?.toUpperCase() ?? 'A'}</div>
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

  return (
    <>
      <aside className="hidden lg:flex flex-col w-60 border-r border-[#1e293b] bg-[#0a0f1e] flex-shrink-0">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#1e293b]">
          <div className="w-7 h-7 bg-purple-400/10 rounded-lg flex items-center justify-center border border-purple-400/20"><Shield className="w-3.5 h-3.5 text-purple-400" /></div>
          <span className="font-grotesk font-bold text-white text-sm">ShieldNet <span className="text-purple-400">Admin</span></span>
        </div>
        <div className="px-5 py-3 border-b border-[#1e293b]">
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-400/10 text-purple-400 border border-purple-400/20">Superadmin</span>
        </div>
        <NavLinks />
        <UserFooter />
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 bg-[#0a0f1e]/95 backdrop-blur-md border-b border-[#1e293b]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-purple-400/10 rounded-lg flex items-center justify-center border border-purple-400/20"><Shield className="w-3 h-3 text-purple-400" /></div>
          <span className="font-grotesk font-bold text-white text-sm">ShieldNet <span className="text-purple-400">Admin</span></span>
        </div>
        <button onClick={() => setMobileOpen(true)} className="text-slate-400 hover:text-white p-1"><Menu className="w-5 h-5" /></button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 flex flex-col bg-[#0a0f1e] border-r border-[#1e293b] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e293b]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-purple-400/10 rounded-lg flex items-center justify-center border border-purple-400/20"><Shield className="w-3.5 h-3.5 text-purple-400" /></div>
                <span className="font-grotesk font-bold text-white text-sm">ShieldNet <span className="text-purple-400">Admin</span></span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-5 py-3 border-b border-[#1e293b]">
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple-400/10 text-purple-400 border border-purple-400/20">Superadmin</span>
            </div>
            <NavLinks onClick={() => setMobileOpen(false)} />
            <UserFooter />
          </aside>
        </div>
      )}
    </>
  );
}
