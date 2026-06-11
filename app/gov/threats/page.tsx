import { Globe, AlertTriangle } from 'lucide-react';

const APT_FEED = [
  {
    actor: 'APT29 (Cozy Bear / SVR)',
    origin: 'Russia',
    tactics: 'Spear-phishing, WellMess malware, LOTL techniques, Tor C2',
    sectors: 'Government, Energy, Healthcare',
    confidence: 'HIGH',
    severity: 'critical',
    updated: '2026-06-11T06:00:00Z',
    cve: 'CVE-2024-21887',
  },
  {
    actor: 'APT41 (Winnti / BARIUM)',
    origin: 'China',
    tactics: 'DUSTPAN dropper, ShadowPad RAT, supply chain compromise',
    sectors: 'Finance, Healthcare, Technology',
    confidence: 'HIGH',
    severity: 'critical',
    updated: '2026-06-10T18:00:00Z',
    cve: 'CVE-2024-3400',
  },
  {
    actor: 'Lazarus Group',
    origin: 'North Korea (DPRK)',
    tactics: 'Malicious npm packages, developer targeting, crypto theft',
    sectors: 'Finance, Crypto, Government',
    confidence: 'MEDIUM',
    severity: 'warning',
    updated: '2026-06-10T12:00:00Z',
    cve: null,
  },
  {
    actor: 'Sandworm (GRU Unit 74455)',
    origin: 'Russia',
    tactics: 'ICS/SCADA targeting, Industroyer2, destructive wiper malware',
    sectors: 'Energy, Water, Critical Infrastructure',
    confidence: 'MEDIUM',
    severity: 'warning',
    updated: '2026-06-09T09:00:00Z',
    cve: 'CVE-2022-30190',
  },
];

export default function NationStatePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
          <Globe className="w-6 h-6 text-amber-400" /> Nation-State Threat Feed
        </h1>
        <p className="text-slate-400 text-sm mt-1">Advanced Persistent Threat intelligence — TLP:WHITE</p>
      </div>

      <div className="space-y-4">
        {APT_FEED.map((apt) => (
          <div key={apt.actor} className={`card-glow rounded-xl p-5 border-l-2 ${
            apt.severity === 'critical' ? 'border-l-red-500' : 'border-l-amber-500'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="font-grotesk font-bold text-white">{apt.actor}</h2>
                <p className="text-slate-500 text-xs mt-0.5">Origin: {apt.origin}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  apt.confidence === 'HIGH' ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' :
                  'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                }`}>{apt.confidence} confidence</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  apt.severity === 'critical' ? 'badge-critical' : 'badge-warning'
                }`}>{apt.severity}</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-slate-500 mb-1">Tactics / Techniques</p>
                <p className="text-slate-300">{apt.tactics}</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Targeted Sectors</p>
                <p className="text-slate-300">{apt.sectors}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#1e293b] text-xs">
              {apt.cve && (
                <span className="font-mono text-cyan-400 bg-cyan-400/5 border border-cyan-400/15 px-2 py-0.5 rounded">{apt.cve}</span>
              )}
              <span className="flex items-center gap-1 text-slate-500">
                <AlertTriangle className="w-3 h-3" /> Updated {new Date(apt.updated).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
