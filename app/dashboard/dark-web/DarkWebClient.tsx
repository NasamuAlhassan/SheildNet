'use client';

import { useState } from 'react';
import { Eye, Search, Clock, ShieldAlert, CheckCircle, Loader2 } from 'lucide-react';

const MOCK_HISTORY = [
  { date: '2026-06-10', result: 'clean' as const, mentions: 0 },
  { date: '2026-05-10', result: 'clean' as const, mentions: 0 },
  { date: '2026-04-10', result: 'found' as const, mentions: 2 },
];

export default function DarkWebClient({ userEmail }: { userEmail: string }) {
  const [scanning, setScanning] = useState(false);
  const [lastResult, setLastResult] = useState<'clean' | 'found' | null>(null);
  const [history, setHistory] = useState(MOCK_HISTORY);

  function handleScan() {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const result: 'clean' | 'found' = 'clean';
      setLastResult(result);
      const today = new Date().toISOString().split('T')[0];
      setHistory(prev => [{ date: today, result, mentions: 0 }, ...prev]);
    }, 3000);
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
          <Eye className="w-6 h-6 text-purple-400" /> Dark Web Monitoring
        </h1>
        <p className="text-slate-400 text-sm mt-1">Surveillance of dark web markets for your credentials</p>
      </div>

      {/* Scan panel */}
      <div className="card-glow rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-slate-400 text-xs">Monitored Email</p>
            <p className="text-white text-sm font-mono mt-0.5">{userEmail}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs">Last Scan</p>
            <p className="text-slate-300 text-sm mt-0.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Jun 10, 2026
            </p>
          </div>
        </div>

        {lastResult === 'clean' && (
          <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-xl p-3 flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <p className="text-emerald-400 text-sm">No mentions found on the dark web. You&apos;re safe.</p>
          </div>
        )}
        {lastResult === 'found' && (
          <div className="bg-red-400/5 border border-red-400/20 rounded-xl p-3 flex items-center gap-2 mb-4">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <p className="text-red-400 text-sm">Your credentials were found in a breach database. Change your password immediately.</p>
          </div>
        )}

        <button onClick={handleScan} disabled={scanning}
          className="flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-60">
          {scanning ? <><Loader2 className="w-4 h-4 animate-spin" /> Scanning…</> : <><Search className="w-4 h-4" /> Scan Now</>}
        </button>
        <p className="text-slate-600 text-xs mt-2">Personal Free: 1 scan/month • Personal Pro: real-time monitoring</p>
      </div>

      {/* History */}
      <div className="card-glow rounded-xl p-5">
        <h2 className="font-grotesk font-semibold text-white text-sm mb-4">Scan History</h2>
        <div className="divide-y divide-[#1e293b]">
          {history.map((h, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                {h.result === 'clean' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <ShieldAlert className="w-4 h-4 text-red-400" />}
                <span className="text-slate-300 text-sm">{h.date}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${h.result === 'clean' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'}`}>
                {h.result === 'clean' ? 'Clean' : `${h.mentions} mention(s)`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
