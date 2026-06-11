import { Activity, Users, MousePointer, CheckCircle, Play } from 'lucide-react';

const MOCK_RESULTS = [
  { name: 'Kwame Asante', email: 'k.asante@company.com', clicked: false, reported: true, completed: true },
  { name: 'Ama Boateng', email: 'a.boateng@company.com', clicked: true, reported: false, completed: true },
  { name: 'Kofi Mensah', email: 'k.mensah@company.com', clicked: false, reported: false, completed: true },
  { name: 'Abena Owusu', email: 'a.owusu@company.com', clicked: true, reported: false, completed: false },
];

export default function PhishingSimPage() {
  const clickRate = Math.round((MOCK_RESULTS.filter(r => r.clicked).length / MOCK_RESULTS.length) * 100);
  const completionRate = Math.round((MOCK_RESULTS.filter(r => r.completed).length / MOCK_RESULTS.length) * 100);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-400" /> Phishing Simulation
        </h1>
        <p className="text-slate-400 text-sm mt-1">Employee phishing awareness training campaigns</p>
      </div>

      {/* Last campaign summary */}
      <div className="card-glow rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-grotesk font-bold text-white">Q2 2026 — Microsoft 365 Phishing Sim</h2>
            <p className="text-slate-500 text-xs mt-0.5">Launched June 1, 2026 &bull; {MOCK_RESULTS.length} participants</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">Completed</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Click Rate', value: `${clickRate}%`, icon: MousePointer, color: clickRate > 30 ? 'text-red-400' : 'text-amber-400' },
            { label: 'Completion', value: `${completionRate}%`, icon: CheckCircle, color: 'text-emerald-400' },
            { label: 'Reported', value: `${MOCK_RESULTS.filter(r => r.reported).length}`, icon: Users, color: 'text-blue-400' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="text-center">
              <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
              <p className={`font-grotesk font-bold text-xl ${color}`}>{value}</p>
              <p className="text-slate-500 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Employee results */}
      <div className="card-glow rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1e293b] flex items-center justify-between">
          <h2 className="font-grotesk font-semibold text-white text-sm">Employee Results</h2>
          <button className="flex items-center gap-2 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all">
            <Play className="w-3 h-3" /> Launch New Simulation
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1e293b]">
              {['Employee', 'Clicked Link', 'Reported Phish', 'Training Done'].map((h) => (
                <th key={h} className="text-left text-slate-500 text-xs font-normal px-5 py-2.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b]">
            {MOCK_RESULTS.map((r) => (
              <tr key={r.email}>
                <td className="px-5 py-3">
                  <p className="text-slate-200 text-sm">{r.name}</p>
                  <p className="text-slate-500 text-xs">{r.email}</p>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium ${r.clicked ? 'text-red-400' : 'text-emerald-400'}`}>
                    {r.clicked ? 'Yes ⚠' : 'No ✓'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs ${r.reported ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {r.reported ? 'Yes ✓' : 'No'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs ${r.completed ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {r.completed ? 'Complete' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
