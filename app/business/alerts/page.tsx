import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { formatDateTime } from '@/lib/utils';
import { Bell, Shield, Zap } from 'lucide-react';

export default async function BusinessAlertsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: business } = await supabase.from('businesses').select('id').eq('admin_user_id', user.id).single();
  const { data: members } = await supabase.from('business_members').select('user_id').eq('business_id', business?.id ?? '');
  const memberIds = [user.id, ...(members?.map((m) => m.user_id) ?? [])];

  const { data: alerts } = await supabase
    .from('user_alerts')
    .select('*, alert:alerts(*), user:users(name, email)')
    .in('user_id', memberIds)
    .order('created_at', { ascending: false })
    .limit(50);

  // Fetch all seeded alerts for triggering
  const { data: allAlerts } = await supabase.from('alerts').select('id, title, severity, type').order('severity');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-400" /> Business Alert Feed
          </h1>
          <p className="text-slate-400 text-sm mt-1">All alerts across your team</p>
        </div>
      </div>

      {/* Trigger alert panel */}
      <div className="card-glow rounded-xl p-5">
        <h2 className="font-grotesk font-semibold text-white text-sm mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" /> Trigger Alert (Admin)
        </h2>
        <p className="text-slate-500 text-xs mb-4">Select a threat scenario and trigger it for a team member. Critical alerts auto-send SMS.</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {(allAlerts ?? []).slice(0, 6).map((a) => (
            <div key={a.id} className={`p-3 rounded-xl border cursor-pointer hover:border-blue-400/40 transition-all text-xs ${
              a.severity === 'critical' ? 'border-red-400/20 bg-red-400/5' :
              a.severity === 'warning' ? 'border-amber-400/20 bg-amber-400/5' :
              'border-[#1e293b] bg-[#0d1426]/40'
            }`}>
              <span className={`font-semibold ${
                a.severity === 'critical' ? 'text-red-400' :
                a.severity === 'warning' ? 'text-amber-400' : 'text-blue-400'
              }`}>{a.severity?.toUpperCase()}</span>
              <p className="text-slate-300 mt-0.5 line-clamp-1">{a.title}</p>
            </div>
          ))}
        </div>
        <p className="text-slate-600 text-xs mt-3">Full trigger UI available in admin panel → Alert Management</p>
      </div>

      {/* Alert feed */}
      <div className="card-glow rounded-xl overflow-hidden">
        {(!alerts || alerts.length === 0) ? (
          <div className="text-center py-16 text-slate-500">
            <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No alerts for your team yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1e293b]">
            {alerts.map((ua) => (
              <div key={ua.id} className="p-4 flex items-start gap-4 hover:bg-[#0d1426]/40 transition-colors">
                <span className={`text-xs px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5 font-medium ${
                  ua.alert?.severity === 'critical' ? 'badge-critical' :
                  ua.alert?.severity === 'warning' ? 'badge-warning' : 'badge-info'
                }`}>{ua.alert?.severity}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-100 text-sm font-medium">{ua.alert?.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{(ua as { user?: { name?: string } }).user?.name ?? 'Team member'} &bull; {formatDateTime(ua.created_at)}</p>
                </div>
                <span className={`text-xs flex-shrink-0 px-2 py-0.5 rounded-full ${
                  ua.status === 'active' ? 'text-red-400 bg-red-400/10' : 'text-emerald-400 bg-emerald-400/10'
                }`}>{ua.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
