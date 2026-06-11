import { Lock, Plus, FileText } from 'lucide-react';

export default function VaultPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
          <Lock className="w-6 h-6 text-emerald-400" /> Encrypted Vault
        </h1>
        <p className="text-slate-400 text-sm mt-1">Securely store sensitive documents and data</p>
      </div>

      {/* Empty state */}
      <div className="card-glow rounded-xl p-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-emerald-400/10 rounded-2xl border border-emerald-400/20 flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="font-grotesk text-lg font-bold text-white mb-2">Your vault is empty</h2>
        <p className="text-slate-400 text-sm max-w-sm mb-6">
          Store sensitive documents, notes, and credentials in your AES-256 encrypted personal vault.
        </p>
        <button className="flex items-center gap-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
          <Plus className="w-4 h-4" /> Add Your First Item
        </button>
      </div>

      {/* Vault categories */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Documents', icon: FileText, count: 0 },
          { label: 'Notes', icon: FileText, count: 0 },
          { label: 'Credentials', icon: Lock, count: 0 },
        ].map(({ label, icon: Icon, count }) => (
          <div key={label} className="card-glow rounded-xl p-4 text-center">
            <Icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 text-xs">{label}</p>
            <p className="text-white font-grotesk font-bold text-lg mt-1">{count}</p>
          </div>
        ))}
      </div>

      <div className="card-glow rounded-xl p-4 border-amber-400/15">
        <p className="text-amber-400 text-xs">
          <span className="font-semibold">Coming in v2:</span> Full file upload, end-to-end encryption, and secure sharing. The vault UI is ready — backend storage launches with the full app.
        </p>
      </div>
    </div>
  );
}
