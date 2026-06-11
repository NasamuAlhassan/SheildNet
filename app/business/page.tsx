import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AlertTriangle, Info, Zap, Shield, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import LiveAlertFeed from '@/components/dashboard/LiveAlertFeed';

export default async function BusinessDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: business } = await supabase
    .from('businesses')
    .select('id, company_name, plan')
    .eq('admin_user_id', user.id)
    .single();

  const { count: memberCount } = await supabase
    .from('business_members')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business?.id ?? '');

  // Fetch all team member IDs for scoped alert counts
  const { data: members } = await supabase
    .from('business_members')
    .select('user_id')
    .eq('business_id', business?.id ?? '');
  const teamIds = [user.id, ...(members?.map(m => m.user_id) ?? [])];

  // Fetch recent alerts for the team
  const { data: teamAlerts } = await supabase
    .from('user_alerts')
    .select('*, alert:alerts(*)')
    .in('user_id', teamIds)
    .order('created_at', { ascending: false })
    .limit(15);

  const criticalCount = teamAlerts?.filter(a => a.status === 'active' && a.alert?.severity === 'critical').length ?? 0;
  const warningCount = teamAlerts?.filter(a => a.status === 'active' && a.alert?.severity === 'warning').length ?? 0;
  const infoCount = teamAlerts?.filter(a => a.status === 'active' && a.alert?.severity === 'info').length ?? 0;

  // Alert type breakdown
  const typeBreakdown: Record<string, number> = teamAlerts?.reduce<Record<string, number>>((acc, ua) => {
    const t = ua.alert?.type ?? 'unknown';
    acc[t] = (acc[t] ?? 0) + 1;
    return acc;
  }, {}) ?? {};

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white">
          {business?.company_name ?? 'Business'} — SOC Overview
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">AI Security Operations Center</p>
      </div>

      {/* Severity cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Critical', count: criticalCount, icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20', href: '/business/alerts' },
          { label: 'Warning', count: warningCount, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20', href: '/business/alerts' },
          { label: 'Info', count: infoCount, icon: Info, color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20', href: '/business/alerts' },
        ].map(({ label, count, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href} className={`card-glow rounded-xl p-5 border ${bg} hover:opacity-90 transition-opacity`}>
            <div className="flex items-center gap-2 mb-3">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-slate-400 text-xs">{label}</span>
            </div>
            <div className={`font-grotesk text-4xl font-bold ${color}`}>{count}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live alert feed */}
        <div className="lg:col-span-2 card-glow rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#1e293b] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <h2 className="font-grotesk font-semibold text-white text-sm">Live Alert Feed</h2>
            </div>
            <Link href="/business/alerts" className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <LiveAlertFeed
            userId={user.id}
            initialAlerts={teamAlerts?.slice(0, 8) ?? []}
          />
        </div>

        {/* Sidebar stats */}
        <div className="space-y-4">
          {/* SOC stats */}
          {[
            { label: 'Team Members', value: String((memberCount ?? 0) + 1), icon: Shield },
            { label: 'Endpoints', value: '5', icon: Activity },
            { label: 'Total Alerts (30d)', value: String(teamAlerts?.length ?? 0), icon: AlertTriangle },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="card-glow rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-400/10 rounded-xl border border-blue-400/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs">{label}</p>
                <p className="font-grotesk font-bold text-white text-lg">{value}</p>
              </div>
            </div>
          ))}

          {/* Alert type breakdown */}
          <div className="card-glow rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-3 font-medium uppercase tracking-wide">By Type</p>
            <div className="space-y-2">
              {Object.entries(typeBreakdown).slice(0, 5).map(([type, count]) => {
                const max = Math.max(...Object.values(typeBreakdown));
                return (
                  <div key={type}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400 capitalize">{type.replace('_', ' ')}</span>
                      <span className="text-slate-300">{count}</span>
                    </div>
                    <div className="h-1 bg-[#1e293b] rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(count / max) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
              {Object.keys(typeBreakdown).length === 0 && (
                <p className="text-slate-600 text-xs">No alerts yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
