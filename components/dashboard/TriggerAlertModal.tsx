'use client';

import { useState } from 'react';
import { X, Zap, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  severity: string;
  type: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Props {
  alert: Alert;
  users: User[];
  onClose: () => void;
}

export default function TriggerAlertModal({ alert, users, onClose }: Props) {
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id ?? '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ smsSent: boolean; smsRef?: string } | null>(null);
  const [error, setError] = useState('');

  async function handleTrigger() {
    if (!selectedUserId) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/alerts/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertId: alert.id, targetUserId: selectedUserId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Trigger failed');
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to trigger alert');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-grotesk font-bold text-foreground text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" /> Trigger Alert
          </h2>
          <button onClick={onClose} className="text-foreground-muted hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Alert preview */}
          <div className={`p-3 rounded-xl border ${
            alert.severity === 'critical' ? 'bg-red-400/5 border-red-400/20' :
            alert.severity === 'warning' ? 'bg-amber-400/5 border-amber-400/20' :
            'bg-blue-400/5 border-blue-400/20'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                alert.severity === 'critical' ? 'badge-critical' :
                alert.severity === 'warning' ? 'badge-warning' : 'badge-info'
              }`}>{alert.severity}</span>
              <span className="text-foreground-muted text-xs capitalize">{alert.type?.replace('_', ' ')}</span>
            </div>
            <p className="text-foreground-secondary text-sm">{alert.title}</p>
          </div>

          {alert.severity === 'critical' && (
            <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl px-3 py-2 text-amber-400 text-xs">
              ⚡ Critical severity — an emergency SMS will be sent to the user&apos;s registered phone via Moolre.
            </div>
          )}

          {/* User selector */}
          <div>
            <label className="block text-foreground-muted text-xs mb-1.5">Target User</label>
            <select
              value={selectedUserId}
              onChange={e => setSelectedUserId(e.target.value)}
              className="input-dark w-full px-3 py-2.5 rounded-xl text-sm appearance-none"
            >
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.email}) — {u.role}</option>
              ))}
            </select>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-xl p-3 space-y-0.5">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <CheckCircle className="w-4 h-4" /> Alert triggered successfully
              </div>
              {result.smsSent && (
                <p className="text-foreground-muted text-xs">SMS dispatched via Moolre{result.smsRef ? ` — Ref: ${result.smsRef}` : ''}</p>
              )}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border flex gap-3">
          <button onClick={onClose} className="flex-1 border border-border hover:border-border-strong text-foreground-muted py-2.5 rounded-xl text-sm transition-colors">
            {result ? 'Close' : 'Cancel'}
          </button>
          {!result && (
            <button
              onClick={handleTrigger}
              disabled={loading || !selectedUserId}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Triggering…</> : <><Zap className="w-4 h-4" /> Trigger Now</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
