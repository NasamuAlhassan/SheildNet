import { Share2, Shield, AlertTriangle, Info } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const BULLETINS = [
  {
    id: '1',
    from: 'CERT-GH',
    title: 'Advisory: Targeted Phishing Campaign Against Government Email Systems',
    classification: 'UNCLASSIFIED',
    date: '2026-06-10',
    severity: 'warning',
    summary: 'CERT-GH has observed a coordinated spear-phishing campaign targeting .gov.gh email addresses. Emails impersonate Ministry of Finance procurement officials requesting urgent document approvals.',
  },
  {
    id: '2',
    from: 'NSA Advisory',
    title: 'Russian SVR Targeting Cloud Services — CSA AA22-134A Update',
    classification: 'UNCLASSIFIED',
    date: '2026-06-09',
    severity: 'critical',
    summary: 'Updated guidance on mitigating Russian SVR (APT29) attacks targeting cloud service providers. Agencies should review MFA enforcement and audit service account permissions immediately.',
  },
  {
    id: '3',
    from: 'Interpol',
    title: 'Operation HAECHI-V: Cybercrime Financial Network Disruption',
    classification: 'CONFIDENTIAL',
    date: '2026-06-08',
    severity: 'info',
    summary: 'INTERPOL Operation HAECHI-V has disrupted a cybercrime network responsible for over $300M in business email compromise losses across West Africa. 4 suspects arrested in Ghana.',
  },
];

export default function InterAgencySharingPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
            <Share2 className="w-6 h-6 text-amber-400" /> Inter-Agency Threat Sharing
          </h1>
          <p className="text-slate-400 text-sm mt-1">Classified intelligence bulletins from partner agencies</p>
        </div>
        <button className="flex items-center gap-2 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 text-amber-400 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
          <Share2 className="w-4 h-4" /> Post Bulletin
        </button>
      </div>

      <div className="space-y-4">
        {BULLETINS.map((b) => (
          <div key={b.id} className="card-glow rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-[#1e293b] text-slate-400 font-mono">{b.from}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                  b.classification === 'CONFIDENTIAL' ? 'bg-red-400/10 text-red-400 border-red-400/20' :
                  'bg-slate-400/10 text-slate-400 border-slate-400/20'
                }`}>
                  {b.classification}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${
                  b.severity === 'critical' ? 'badge-critical px-2 py-0.5 rounded-full' :
                  b.severity === 'warning' ? 'badge-warning px-2 py-0.5 rounded-full' :
                  'badge-info px-2 py-0.5 rounded-full'
                }`}>{b.severity}</span>
              </div>
            </div>
            <h2 className="text-white text-sm font-semibold mb-2">{b.title}</h2>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">{b.summary}</p>
            <p className="text-slate-600 text-xs">{formatDate(b.date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
