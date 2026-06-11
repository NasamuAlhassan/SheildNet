import { CheckSquare, CheckCircle, AlertCircle, Download } from 'lucide-react';

const FRAMEWORKS = [
  {
    name: 'GDPR',
    full: 'General Data Protection Regulation',
    status: 'compliant',
    lastAudit: '2026-05-15',
    score: 94,
    controls: [
      { name: 'Data Processing Records', status: 'pass' },
      { name: 'Consent Management', status: 'pass' },
      { name: 'Data Subject Rights', status: 'pass' },
      { name: 'Breach Notification (72h)', status: 'pass' },
      { name: 'DPO Appointment', status: 'review' },
    ],
  },
  {
    name: 'ISO 27001',
    full: 'Information Security Management',
    status: 'compliant',
    lastAudit: '2026-04-20',
    score: 88,
    controls: [
      { name: 'Information Security Policy', status: 'pass' },
      { name: 'Asset Management', status: 'pass' },
      { name: 'Access Control', status: 'pass' },
      { name: 'Cryptography', status: 'pass' },
      { name: 'Physical Security', status: 'review' },
    ],
  },
  {
    name: 'SOC 2',
    full: 'Service Organization Control 2',
    status: 'review',
    lastAudit: '2026-03-10',
    score: 76,
    controls: [
      { name: 'Availability', status: 'pass' },
      { name: 'Confidentiality', status: 'pass' },
      { name: 'Processing Integrity', status: 'review' },
      { name: 'Security (CC6)', status: 'pass' },
      { name: 'Privacy (P1–P8)', status: 'review' },
    ],
  },
];

export default function CompliancePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-blue-400" /> Compliance Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">GDPR, ISO 27001, and SOC 2 compliance status</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {FRAMEWORKS.map((fw) => (
          <div key={fw.name} className="card-glow rounded-xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-grotesk font-bold text-white">{fw.name}</h2>
                <p className="text-slate-500 text-xs">{fw.full}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                fw.status === 'compliant' ? 'badge-info' : 'badge-warning'
              }`}>
                {fw.status}
              </span>
            </div>

            {/* Score */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">Compliance Score</span>
                <span className={fw.score >= 90 ? 'text-emerald-400' : fw.score >= 75 ? 'text-amber-400' : 'text-red-400'}>
                  {fw.score}%
                </span>
              </div>
              <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${fw.score >= 90 ? 'bg-emerald-500' : fw.score >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${fw.score}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <ul className="space-y-2 flex-1 mb-4">
              {fw.controls.map((c) => (
                <li key={c.name} className="flex items-center gap-2 text-xs">
                  {c.status === 'pass'
                    ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    : <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                  <span className={c.status === 'pass' ? 'text-slate-300' : 'text-amber-300'}>{c.name}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-3 border-t border-[#1e293b]">
              <span className="text-slate-500 text-xs">Last audit: {fw.lastAudit}</span>
              <button className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                <Download className="w-3 h-3" /> Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
