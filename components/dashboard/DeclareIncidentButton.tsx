'use client';

import { useState } from 'react';
import { AlertTriangle, Loader2, CheckCircle, X } from 'lucide-react';

export default function DeclareIncidentButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function handleDeclare() {
    setLoading(true);
    try {
      const res = await fetch('/api/alerts/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetTier: 'gov_admin',
          customMessage: message || '[ShieldNet AI] INCIDENT DECLARED: Your agency is under a security incident. Report to your supervisor immediately and await further instructions.',
        }),
      });
      const data = await res.json();
      setResult(`Incident broadcast sent to ${data.sent} staff member(s).`);
    } catch {
      setResult('Failed to broadcast. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-xl text-sm font-semibold transition-colors"
      >
        <AlertTriangle className="w-4 h-4" /> Declare Incident
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-red-500/30 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-grotesk font-bold text-red-400 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Declare Security Incident
              </h2>
              <button onClick={() => { setOpen(false); setResult(null); }} className="text-foreground-muted hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              {result ? (
                <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-xl p-4 flex items-center gap-2 text-emerald-400 text-sm">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" /> {result}
                </div>
              ) : (
                <>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3 text-red-400 text-xs">
                    This will immediately broadcast an emergency SMS to all registered agency staff via Moolre and escalate the current security posture.
                  </div>
                  <div>
                    <label className="block text-foreground-muted text-xs mb-1.5">Custom Message (optional)</label>
                    <textarea
                      rows={3}
                      maxLength={160}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Leave blank to use the default incident message..."
                      className="input-dark w-full px-3 py-2.5 rounded-xl text-sm resize-none"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="px-5 py-4 border-t border-border flex gap-3">
              <button onClick={() => { setOpen(false); setResult(null); }} className="flex-1 border border-border text-foreground-muted py-2.5 rounded-xl text-sm">
                {result ? 'Close' : 'Cancel'}
              </button>
              {!result && (
                <button onClick={handleDeclare} disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 transition-all">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Broadcasting…</> : <><AlertTriangle className="w-4 h-4" /> Confirm & Broadcast</>}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
