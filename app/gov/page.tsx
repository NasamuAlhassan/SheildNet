import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Radio, Activity, Shield } from 'lucide-react';
import DeclareIncidentButton from '@/components/dashboard/DeclareIncidentButton';
import LiveAlertFeed from '@/components/dashboard/LiveAlertFeed';

export default async function GovWarRoomPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: recentAlerts } = await supabase
    .from('user_alerts')
    .select('*, alert:alerts(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);

  const activeCount = recentAlerts?.filter(a => a.status === 'active').length ?? 0;
  const criticalCount = recentAlerts?.filter(a => a.status === 'active' && a.alert?.severity === 'critical').length ?? 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
            <Radio className="w-6 h-6 text-amber-400 animate-pulse" />
            Incident War Room
          </h1>
          <p className="text-slate-400 text-sm mt-1">Nation-state threat defense command center</p>
        </div>
        <DeclareIncidentButton />
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Incidents', value: String(activeCount), color: activeCount > 0 ? 'text-red-400' : 'text-emerald-400' },
          { label: 'Critical Alerts', value: String(criticalCount), color: criticalCount > 0 ? 'text-red-400' : 'text-emerald-400' },
          { label: 'APT Threat Level', value: 'ELEVATED', color: 'text-amber-400' },
          { label: 'Intel Feed', value: 'LIVE', color: 'text-cyan-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card-glow rounded-xl p-4">
            <p className="text-slate-500 text-xs mb-2">{label}</p>
            <p className={`font-grotesk font-bold text-lg ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Live threat feed */}
        <div className="card-glow rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#1e293b] flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <h2 className="font-grotesk font-semibold text-white text-sm">Live Threat Feed</h2>
          </div>
          <LiveAlertFeed userId={user.id} initialAlerts={recentAlerts ?? []} />
        </div>

        {/* APT intelligence */}
        <div className="card-glow rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#1e293b]">
            <h2 className="font-grotesk font-semibold text-white text-sm">APT Activity</h2>
          </div>
          <div className="divide-y divide-[#1e293b]">
            {[
              { actor: 'APT29 (Cozy Bear)', level: 'CRITICAL', sector: 'Government', time: '14 min ago' },
              { actor: 'Lazarus Group', level: 'HIGH', sector: 'Finance', time: '1h ago' },
              { actor: 'Sandworm', level: 'ELEVATED', sector: 'Infrastructure', time: '3h ago' },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="text-slate-200 text-sm">{t.actor}</p>
                    <p className="text-slate-500 text-xs">{t.sector}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${t.level === 'CRITICAL' ? 'badge-critical' : 'badge-warning'}`}>{t.level}</span>
                  <span className="text-slate-600 text-xs">{t.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infrastructure grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { name: 'Power Grid', status: 'Normal', color: 'text-emerald-400' },
          { name: 'Water Systems', status: 'Normal', color: 'text-emerald-400' },
          { name: 'Financial Systems', status: 'Normal', color: 'text-emerald-400' },
        ].map(({ name, status, color }) => (
          <div key={name} className="card-glow rounded-xl p-4 text-center">
            <Shield className={`w-6 h-6 mx-auto mb-2 ${color}`} />
            <p className="text-white text-sm font-semibold">{name}</p>
            <p className={`text-xs mt-1 ${color}`}>{status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
