import { Server, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const MOCK_ENDPOINTS = [
  { hostname: 'WORKSTATION-01', os: 'Windows 11 Pro', lastCheckIn: '2 min ago', health: 'healthy', processes: 187, events: 0 },
  { hostname: 'WORKSTATION-02', os: 'Windows 11 Pro', lastCheckIn: '5 min ago', health: 'healthy', processes: 143, events: 0 },
  { hostname: 'MACBOOK-CEO', os: 'macOS Sonoma 14.4', lastCheckIn: '1 min ago', health: 'healthy', processes: 212, events: 0 },
  { hostname: 'SERVER-PROD-01', os: 'Ubuntu 22.04 LTS', lastCheckIn: '30 sec ago', health: 'warning', processes: 98, events: 3 },
  { hostname: 'LAPTOP-SALES-01', os: 'Windows 10 Pro', lastCheckIn: '2 hours ago', health: 'offline', processes: 0, events: 0 },
];

export default function EDRPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
          <Server className="w-6 h-6 text-blue-400" /> Endpoint Detection & Response
        </h1>
        <p className="text-slate-400 text-sm mt-1">Real-time endpoint health across your organisation</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Healthy', value: MOCK_ENDPOINTS.filter(e => e.health === 'healthy').length, color: 'text-emerald-400' },
          { label: 'Warning', value: MOCK_ENDPOINTS.filter(e => e.health === 'warning').length, color: 'text-amber-400' },
          { label: 'Offline', value: MOCK_ENDPOINTS.filter(e => e.health === 'offline').length, color: 'text-slate-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card-glow rounded-xl p-4 text-center">
            <p className={`font-grotesk text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-slate-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Endpoints table */}
      <div className="card-glow rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1e293b]">
          <h2 className="font-grotesk font-semibold text-white text-sm">Monitored Endpoints</h2>
        </div>
        <div className="divide-y divide-[#1e293b]">
          {MOCK_ENDPOINTS.map((ep) => (
            <div key={ep.hostname} className="px-5 py-4 flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                ep.health === 'healthy' ? 'bg-emerald-400' :
                ep.health === 'warning' ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium font-mono">{ep.hostname}</p>
                <p className="text-slate-500 text-xs">{ep.os}</p>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" /> {ep.lastCheckIn}
              </div>
              <div className="hidden md:block text-xs text-slate-400">{ep.processes} processes</div>
              {ep.events > 0 ? (
                <span className="flex items-center gap-1 text-xs badge-warning px-2 py-0.5 rounded-full">
                  <AlertTriangle className="w-3 h-3" /> {ep.events} events
                </span>
              ) : (
                <span className="hidden sm:flex items-center gap-1 text-xs text-emerald-400">
                  <CheckCircle className="w-3 h-3" /> Clean
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
