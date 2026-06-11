'use client';

import { useState } from 'react';
import { Database, Plus, Edit2, Trash2, X, Loader2, CheckCircle } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  severity: string;
  type: string;
}

const SEVERITIES = ['critical', 'warning', 'info'] as const;
const TYPES = ['malware', 'ransomware', 'phishing', 'zero_day', 'breach', 'identity_theft', 'apt', 'infrastructure'] as const;

function ScenarioModal({
  scenario,
  onClose,
  onSave,
}: {
  scenario: Partial<Scenario> | null;
  onClose: () => void;
  onSave: (s: Scenario) => void;
}) {
  const [form, setForm] = useState({
    title: scenario?.title ?? '',
    description: scenario?.description ?? '',
    severity: scenario?.severity ?? 'warning',
    type: scenario?.type ?? 'phishing',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isEdit = !!scenario?.id;

  async function handleSave() {
    if (!form.title || !form.description) { setError('Title and description are required.'); return; }
    setLoading(true); setError('');
    try {
      const url = isEdit ? `/api/admin/scenarios/${scenario!.id}` : '/api/admin/scenarios';
      const method = isEdit ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Save failed');
      onSave(data);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally { setLoading(false); }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0d1426] border border-[#1e293b] rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e293b]">
          <h2 className="font-grotesk font-bold text-white text-sm">{isEdit ? 'Edit Scenario' : 'Add Scenario'}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-slate-400 text-xs mb-1.5">Title</label>
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="e.g. LockBit 3.0 Ransomware Execution" className="input-dark w-full px-3 py-2.5 rounded-xl text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 text-xs mb-1.5">Severity</label>
              <select value={form.severity} onChange={e => setForm(f => ({ ...f, severity: e.target.value }))} className="input-dark w-full px-3 py-2.5 rounded-xl text-sm appearance-none">
                {SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 text-xs mb-1.5">Type</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="input-dark w-full px-3 py-2.5 rounded-xl text-sm appearance-none">
                {TYPES.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-slate-400 text-xs mb-1.5">Description</label>
            <textarea rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Detailed threat scenario description..." className="input-dark w-full px-3 py-2.5 rounded-xl text-sm resize-none" />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
        </div>
        <div className="px-5 py-4 border-t border-[#1e293b] flex gap-3">
          <button onClick={onClose} className="flex-1 border border-[#1e293b] text-slate-400 py-2.5 rounded-xl text-sm">Cancel</button>
          <button onClick={handleSave} disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            {isEdit ? 'Save Changes' : 'Add Scenario'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ScenariosClient({ initialScenarios }: { initialScenarios: Scenario[] }) {
  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios);
  const [modal, setModal] = useState<Partial<Scenario> | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm('Delete this scenario?')) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/scenarios/${id}`, { method: 'DELETE' });
    if (res.ok) setScenarios(prev => prev.filter(s => s.id !== id));
    setDeleting(null);
  }

  function handleSave(saved: Scenario) {
    setScenarios(prev => {
      const idx = prev.findIndex(s => s.id === saved.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = saved; return next; }
      return [saved, ...prev];
    });
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-purple-400" /> Threat Scenarios
          </h1>
          <p className="text-slate-400 text-sm mt-1">{scenarios.length} scenarios in library</p>
        </div>
        <button onClick={() => setModal({})} className="flex items-center gap-2 bg-purple-400/10 hover:bg-purple-400/20 border border-purple-400/20 text-purple-400 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
          <Plus className="w-4 h-4" /> Add Scenario
        </button>
      </div>

      <div className="space-y-2">
        {scenarios.map(s => (
          <div key={s.id} className="card-glow rounded-xl px-4 py-3 flex items-start gap-3">
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium flex-shrink-0 mt-0.5 ${
              s.severity === 'critical' ? 'badge-critical' : s.severity === 'warning' ? 'badge-warning' : 'badge-info'
            }`}>{s.severity}</span>
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-sm font-medium">{s.title}</p>
              <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">{s.description}</p>
              <span className="text-xs mt-1 inline-block px-2 py-0.5 bg-[#1e293b] rounded text-slate-400 capitalize">{s.type?.replace('_', ' ')}</span>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => setModal(s)} className="text-xs text-slate-400 hover:text-white border border-[#1e293b] hover:border-[#334155] p-1.5 rounded-lg transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleDelete(s.id)} disabled={deleting === s.id} className="text-xs text-red-400 hover:text-red-300 border border-red-400/20 hover:border-red-400/40 p-1.5 rounded-lg transition-colors disabled:opacity-50">
                {deleting === s.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal !== null && (
        <ScenarioModal
          scenario={modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
