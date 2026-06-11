import { Key, Plus, Shield } from 'lucide-react';

export default function PasswordsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
          <Key className="w-6 h-6 text-amber-400" /> Password Manager
        </h1>
        <p className="text-slate-400 text-sm mt-1">Securely store and autofill your passwords</p>
      </div>

      <div className="card-glow rounded-xl p-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-amber-400/10 rounded-2xl border border-amber-400/20 flex items-center justify-center mb-4">
          <Key className="w-8 h-8 text-amber-400" />
        </div>
        <h2 className="font-grotesk text-lg font-bold text-white mb-2">No saved passwords yet</h2>
        <p className="text-slate-400 text-sm max-w-sm mb-6">
          Save passwords for all your accounts. ShieldNet AI encrypts everything with your master key — we can never see your passwords.
        </p>
        <button className="flex items-center gap-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
          <Plus className="w-4 h-4" /> Save a Password
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {['Weak', 'Reused', 'Compromised'].map((label) => (
          <div key={label} className="card-glow rounded-xl p-4 text-center">
            <Shield className="w-5 h-5 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 text-xs">{label}</p>
            <p className="text-white font-grotesk font-bold text-lg mt-1">0</p>
          </div>
        ))}
      </div>
    </div>
  );
}
