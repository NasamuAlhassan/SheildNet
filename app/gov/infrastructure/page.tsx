import { Zap, Droplets, Building2, CheckCircle, AlertTriangle, Activity } from 'lucide-react';

const PANELS = [
  {
    name: 'Power Grid',
    icon: Zap,
    status: 'Normal',
    color: 'emerald',
    lastCheck: '30 seconds ago',
    alerts: 0,
    telemetry: [92, 88, 95, 91, 94, 89, 93, 96, 90, 94],
  },
  {
    name: 'Water Systems',
    icon: Droplets,
    status: 'Normal',
    color: 'emerald',
    lastCheck: '1 minute ago',
    alerts: 0,
    telemetry: [70, 72, 68, 74, 71, 73, 69, 75, 72, 70],
  },
  {
    name: 'Financial Systems',
    icon: Building2,
    status: 'Degraded',
    color: 'amber',
    lastCheck: '2 minutes ago',
    alerts: 1,
    telemetry: [85, 80, 75, 60, 55, 58, 62, 65, 68, 70],
  },
];

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 100}`).join(' ');
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-12">
      <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function InfrastructurePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-foreground flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-400" /> Critical Infrastructure Monitoring
        </h1>
        <p className="text-foreground-muted text-sm mt-1">Power Grid, Water Systems, Financial Systems</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {PANELS.map((panel) => {
          const Icon = panel.icon;
          const isNormal = panel.status === 'Normal';
          const chartColor = isNormal ? '#10b981' : '#f59e0b';
          return (
            <div key={panel.name} className={`card-glow rounded-xl p-5 ${!isNormal ? 'border-amber-400/30' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                    isNormal ? 'bg-emerald-400/10 border-emerald-400/20' : 'bg-amber-400/10 border-amber-400/20'
                  }`}>
                    <Icon className={`w-5 h-5 ${isNormal ? 'text-emerald-400' : 'text-amber-400'}`} />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-semibold">{panel.name}</p>
                    <p className="text-foreground-muted text-xs">{panel.lastCheck}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {isNormal
                    ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                    : <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />}
                  <span className={`text-xs font-semibold ${isNormal ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {panel.status}
                  </span>
                </div>
              </div>

              <MiniChart data={panel.telemetry} color={chartColor} />

              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-foreground-muted flex items-center gap-1"><Activity className="w-3 h-3" /> Telemetry</span>
                {panel.alerts > 0 ? (
                  <span className="badge-warning px-2 py-0.5 rounded-full">{panel.alerts} alert</span>
                ) : (
                  <span className="text-emerald-400">No alerts</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
