import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Users, Bell, MessageSquare, CreditCard } from 'lucide-react';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [{ count: userCount }, { count: alertCount }, { count: smsCount }] = await Promise.all([
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase.from('user_alerts').select('*', { count: 'exact', head: true }),
    supabase.from('sms_logs').select('*', { count: 'exact', head: true }),
  ]);

  const { data: recentUsers } = await supabase
    .from('users')
    .select('name, email, role, created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white">Admin Panel</h1>
        <p className="text-slate-400 text-sm mt-1">Platform-wide management & monitoring</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: String(userCount ?? 0), icon: Users, color: 'text-cyan-400' },
          { label: 'Alert Instances', value: String(alertCount ?? 0), icon: Bell, color: 'text-red-400' },
          { label: 'SMS Sent', value: String(smsCount ?? 0), icon: MessageSquare, color: 'text-emerald-400' },
          { label: 'Payments', value: '—', icon: CreditCard, color: 'text-purple-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card-glow rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-slate-400 text-xs">{label}</span>
            </div>
            <div className={`font-grotesk text-2xl font-bold ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Recent users */}
      <div className="card-glow rounded-xl p-5">
        <h2 className="font-grotesk font-semibold text-white text-sm mb-4">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e293b]">
                {['Name', 'Email', 'Role', 'Joined'].map((h) => (
                  <th key={h} className="text-left text-slate-500 text-xs font-normal pb-2 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {(recentUsers ?? []).map((u) => (
                <tr key={u.email}>
                  <td className="py-2.5 pr-4 text-slate-200">{u.name}</td>
                  <td className="py-2.5 pr-4 text-slate-400">{u.email}</td>
                  <td className="py-2.5 pr-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#1e293b] text-slate-300">{u.role}</span>
                  </td>
                  <td className="py-2.5 text-slate-500 text-xs">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
