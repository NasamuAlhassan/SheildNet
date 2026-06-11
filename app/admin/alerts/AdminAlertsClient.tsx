'use client';

import { useState } from 'react';
import { Bell, Zap, Radio } from 'lucide-react';
import TriggerAlertModal from '@/components/dashboard/TriggerAlertModal';

interface Alert { id: string; title: string; severity: string; type: string; description: string; }
interface User { id: string; name: string; email: string; role: string; }

export default function AdminAlertsClient({ alerts, users }: { alerts: Alert[]; users: User[] }) {
  const [triggerAlert, setTriggerAlert] = useState<Alert | null>(null);
  const [broadcastAlert, setBroadcastAlert] = useState<Alert | null>(null);
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastResult, setBroadcastResult] = useState<string | null>(null);

  async function handleBroadcast(alert: Alert) {
    setBroadcasting(true);
    setBroadcastResult(null);
    try {
      const res = await fetch('/api/alerts/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertId: alert.id, targetTier: 'all' }),
      });
      const data = await res.json();
      setBroadcastResult(`Sent: ${data.sent}, Failed: ${data.failed}`);
    } catch {
      setBroadcastResult('Broadcast failed');
    } finally {
      setBroadcasting(false);
      setBroadcastAlert(null);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-purple-400" /> Alert Management
        </h1>
        <p className="text-slate-400 text-sm mt-1">Trigger alerts to users or broadcast to entire tiers</p>
      </div>

      {broadcastResult && (
        <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-xl px-4 py-3 text-emerald-400 text-sm">
          Broadcast complete — {broadcastResult}
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        {(['critical', 'warning', 'info'] as const).map(sev => (
          <div key={sev} className="card-glow rounded-xl p-4 text-center">
            <p className={`font-grotesk text-2xl font-bold ${sev === 'critical' ? 'text-red-400' : sev === 'warning' ? 'text-amber-400' : 'text-blue-400'}`}>
              {alerts.filter(a => a.severity === sev).length}
            </p>
            <p className="text-slate-500 text-xs mt-1 capitalize">{sev} scenarios</p>
          </div>
        ))}
      </div>

      <div className="card-glow rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1e293b]">
          <h2 className="font-grotesk font-semibold text-white text-sm">Threat Scenarios ({alerts.length})</h2>
        </div>
        <div className="divide-y divide-[#1e293b]">
          {alerts.map(a => (
            <div key={a.id} className="px-4 py-3 flex items-start gap-3">
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0 mt-0.5 ${
                a.severity === 'critical' ? 'badge-critical' : a.severity === 'warning' ? 'badge-warning' : 'badge-info'
              }`}>{a.severity}</span>
              <div className="flex-1 min-w-0">
                <p className="text-slate-200 text-sm">{a.title}</p>
                <p className="text-slate-500 text-xs capitalize mt-0.5">{a.type?.replace('_', ' ')}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setTriggerAlert(a)}
                  className="flex items-center gap-1 text-xs bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 text-amber-400 px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  <Zap className="w-3 h-3" /> Trigger
                </button>
                <button
                  onClick={() => { setBroadcastAlert(a); handleBroadcast(a); }}
                  disabled={broadcasting}
                  className="flex items-center gap-1 text-xs bg-purple-400/10 hover:bg-purple-400/20 border border-purple-400/20 text-purple-400 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Radio className="w-3 h-3" /> Broadcast
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {triggerAlert && (
        <TriggerAlertModal
          alert={triggerAlert}
          users={users}
          onClose={() => setTriggerAlert(null)}
        />
      )}
    </div>
  );
}
