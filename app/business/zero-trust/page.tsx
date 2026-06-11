import { Lock, CheckCircle, XCircle } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

const MOCK_LOG = [
  { ts: '2026-06-11T09:42:00Z', user: 'Kwame Asante', resource: '/api/reports/financial', device: 'WORKSTATION-01', location: 'Accra, GH', allowed: true },
  { ts: '2026-06-11T09:38:00Z', user: 'Ama Boateng', resource: '/admin/settings', device: 'MACBOOK-CEO', location: 'Kumasi, GH', allowed: false },
  { ts: '2026-06-11T09:30:00Z', user: 'Kofi Mensah', resource: '/api/customers', device: 'WORKSTATION-02', location: 'Accra, GH', allowed: true },
  { ts: '2026-06-11T09:15:00Z', user: 'Abena Owusu', resource: '/api/payroll', device: 'Unknown Device', location: 'Lagos, NG', allowed: false },
  { ts: '2026-06-11T08:50:00Z', user: 'Kwame Asante', resource: '/dashboard', device: 'WORKSTATION-01', location: 'Accra, GH', allowed: true },
];

export default function ZeroTrustPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-foreground flex items-center gap-2">
          <Lock className="w-6 h-6 text-emerald-400" /> Zero Trust Access Log
        </h1>
        <p className="text-foreground-muted text-sm mt-1">Every access attempt — verified before granted</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Allowed', value: MOCK_LOG.filter(l => l.allowed).length, color: 'text-emerald-400' },
          { label: 'Denied', value: MOCK_LOG.filter(l => !l.allowed).length, color: 'text-red-400' },
          { label: 'Today Total', value: MOCK_LOG.length, color: 'text-blue-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card-glow rounded-xl p-4 text-center">
            <p className={`font-grotesk text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-foreground-muted text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="card-glow rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h2 className="font-grotesk font-semibold text-foreground text-sm">Access Log</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                {['Time', 'User', 'Resource', 'Device', 'Location', 'Decision'].map(h => (
                  <th key={h} className="text-left text-foreground-muted font-normal px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_LOG.map((entry, i) => (
                <tr key={i} className="hover:bg-background/40">
                  <td className="px-4 py-3 text-foreground-muted whitespace-nowrap">{formatDateTime(entry.ts)}</td>
                  <td className="px-4 py-3 text-foreground-secondary">{entry.user}</td>
                  <td className="px-4 py-3 font-mono text-foreground-secondary">{entry.resource}</td>
                  <td className="px-4 py-3 text-foreground-muted">{entry.device}</td>
                  <td className="px-4 py-3 text-foreground-muted">{entry.location}</td>
                  <td className="px-4 py-3">
                    {entry.allowed
                      ? <span className="flex items-center gap-1 text-emerald-400"><CheckCircle className="w-3 h-3" /> Allowed</span>
                      : <span className="flex items-center gap-1 text-red-400"><XCircle className="w-3 h-3" /> Denied</span>}
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
