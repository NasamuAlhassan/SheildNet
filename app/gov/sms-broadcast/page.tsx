'use client';

import { useState } from 'react';
import { MessageSquare, Send, Users, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';

const MAX_CHARS = 160;
const TARGETS = [
  { value: 'gov_admin', label: 'All Staff', desc: 'All registered agency personnel' },
  { value: 'individual', label: 'All Citizens (Personal tier)', desc: 'Individual ShieldNet subscribers' },
  { value: 'all', label: 'All Agencies', desc: 'Every registered user' },
] as const;

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function SMSBroadcastPage() {
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState<typeof TARGETS[number]['value']>('gov_admin');
  const [status, setStatus] = useState<SendStatus>('idle');
  const [result, setResult] = useState<{ sent: number; failed: number; reference: string } | null>(null);
  const [error, setError] = useState('');

  const remaining = MAX_CHARS - message.length;

  async function handleBroadcast() {
    if (!message.trim()) return;
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/alerts/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetTier: target, customMessage: message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Broadcast failed');
      setResult(data);
      setStatus('sent');
      setMessage('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send broadcast');
      setStatus('error');
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-amber-400" /> Emergency SMS Broadcast
        </h1>
        <p className="text-slate-400 text-sm mt-1">Send emergency alerts via Moolre to all registered personnel</p>
      </div>

      {status === 'sent' && result && (
        <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-xl p-4">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
            <CheckCircle className="w-4 h-4" /> Broadcast sent successfully
          </div>
          <div className="text-xs text-slate-400 space-y-0.5">
            <p>Delivered: <span className="text-emerald-400 font-semibold">{result.sent}</span></p>
            <p>Failed: <span className="text-red-400">{result.failed}</span></p>
            <p className="font-mono">Moolre Ref: {result.reference}</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-400/5 border border-red-400/20 rounded-xl p-3 flex items-center gap-2 text-red-400 text-sm">
          <AlertTriangle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Target selector */}
      <div>
        <label className="block text-slate-400 text-xs mb-2">Target Recipients</label>
        <div className="space-y-2">
          {TARGETS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTarget(t.value)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                target === t.value
                  ? 'border-amber-400/40 bg-amber-400/5 text-amber-400'
                  : 'border-[#1e293b] text-slate-400 hover:border-[#334155]'
              }`}
            >
              <Users className="w-4 h-4 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">{t.label}</p>
                <p className="text-xs opacity-70">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Message compose */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-slate-400 text-xs">Message</label>
          <span className={`text-xs ${remaining < 20 ? 'text-red-400' : 'text-slate-500'}`}>
            {remaining} chars remaining
          </span>
        </div>
        <textarea
          rows={4}
          maxLength={MAX_CHARS}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="[ShieldNet AI] EMERGENCY: ..."
          className="input-dark w-full px-4 py-3 rounded-xl text-sm resize-none"
        />
        <p className="text-slate-600 text-xs mt-1">
          Messages over 160 characters will be split into multiple SMS segments.
        </p>
      </div>

      {/* Send */}
      <button
        onClick={handleBroadcast}
        disabled={!message.trim() || status === 'sending'}
        className="w-full flex items-center justify-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-amber-400 font-semibold py-3.5 rounded-xl text-sm transition-all"
      >
        {status === 'sending'
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending via Moolre…</>
          : <><Send className="w-4 h-4" /> Send Emergency Broadcast</>}
      </button>

      {/* Delivery log link */}
      <p className="text-slate-500 text-xs text-center">
        View full SMS delivery log in{' '}
        <a href="/admin/sms-logs" className="text-cyan-400 hover:text-cyan-300 transition-colors">Admin → SMS Logs</a>
      </p>
    </div>
  );
}
