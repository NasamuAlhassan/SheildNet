import { Lock, FolderLock, Shield } from 'lucide-react';

const FOLDERS = [
  { name: 'UNCLASSIFIED', count: 12, color: 'text-slate-400', bg: 'bg-slate-400/10 border-slate-400/20' },
  { name: 'CONFIDENTIAL', count: 5, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
  { name: 'SECRET', count: 2, color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
];

export default function ClassifiedPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
          <Lock className="w-6 h-6 text-red-400" /> Classified Data Compartmentalization
        </h1>
        <p className="text-slate-400 text-sm mt-1">Gov Admin access only — role-gated compartments</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {FOLDERS.map((f) => (
          <div key={f.name} className={`card-glow rounded-xl p-6 border ${f.bg} flex flex-col items-center text-center gap-3 cursor-pointer hover:opacity-80 transition-opacity`}>
            <FolderLock className={`w-8 h-8 ${f.color}`} />
            <div>
              <p className={`font-grotesk font-bold text-sm ${f.color}`}>{f.name}</p>
              <p className="text-slate-500 text-xs mt-0.5">{f.count} documents</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card-glow rounded-xl p-5 flex items-start gap-3 border-amber-400/15">
        <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-slate-400 text-xs leading-relaxed">
          <span className="text-white font-semibold">Classification Note:</span> All documents stored in this
          compartment are encrypted at rest with AES-256. Access is logged and audited. SECRET folders require
          additional authentication step in the full deployment.
        </p>
      </div>
    </div>
  );
}
