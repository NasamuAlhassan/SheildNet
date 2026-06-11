import { BarChart3, CheckCircle, Clock, Shield } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

const INCIDENTS = [
  { id: 'INC-001', title: 'DDoS on government portal', opened: '2026-05-20T08:00:00Z', resolved: '2026-05-20T08:03:00Z', responseTime: '3 min', severity: 'critical' },
  { id: 'INC-002', title: 'Phishing campaign detected', opened: '2026-05-15T14:00:00Z', resolved: '2026-05-15T14:04:00Z', responseTime: '4 min', severity: 'warning' },
  { id: 'INC-003', title: 'VPN authentication anomaly', opened: '2026-05-10T09:00:00Z', resolved: '2026-05-10T09:02:00Z', responseTime: '2 min', severity: 'warning' },
];

export default function SLAPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-amber-400" /> SLA Status
        </h1>
        <p className="text-slate-400 text-sm mt-1">Government tier service level agreement</p>
      </div>

      {/* SLA metrics */}
      <div className="grid sm:grid-cols-3 gap-5">
        {[
          { label: 'Guaranteed Uptime', value: '99.999%', actual: '99.999%', icon: Shield, color: 'text-emerald-400' },
          { label: 'Incident Response', value: '< 5 min', actual: 'Avg 3 min', icon: Clock, color: 'text-emerald-400' },
          { label: 'This Month Uptime', value: '100%', actual: '0 incidents', icon: CheckCircle, color: 'text-emerald-400' },
        ].map(({ label, value, actual, icon: Icon, color }) => (
          <div key={label} className="card-glow rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Icon className={`w-4 h-4 ${color}`} />
              <p className="text-slate-400 text-xs">{label}</p>
            </div>
            <p className={`font-grotesk text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-slate-500 text-xs mt-1">{actual}</p>
          </div>
        ))}
      </div>

      {/* Uptime bar */}
      <div className="card-glow rounded-xl p-5">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Monthly Uptime</span>
          <span className="text-emerald-400 font-semibold">100.000%</span>
        </div>
        <div className="h-2 bg-[#1e293b] rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
        </div>
        <div className="flex justify-between text-xs text-slate-600 mt-1">
          <span>Guaranteed: 99.999%</span>
          <span>SLA breach threshold: &lt; 99.999%</span>
        </div>
      </div>

      {/* Incident log */}
      <div className="card-glow rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1e293b]">
          <h2 className="font-grotesk font-semibold text-white text-sm">Last 30 Incidents</h2>
        </div>
        <div className="divide-y divide-[#1e293b]">
          {INCIDENTS.map((inc) => (
            <div key={inc.id} className="px-5 py-3 flex items-center gap-4">
              <span className={`text-xs px-2 py-0.5 rounded-full border font-mono flex-shrink-0 ${
                inc.severity === 'critical' ? 'badge-critical' : 'badge-warning'
              }`}>{inc.id}</span>
              <div className="flex-1 min-w-0">
                <p className="text-slate-200 text-sm truncate">{inc.title}</p>
                <p className="text-slate-500 text-xs">{formatDateTime(inc.opened)}</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs flex-shrink-0">
                <CheckCircle className="w-3 h-3" /> {inc.responseTime}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
