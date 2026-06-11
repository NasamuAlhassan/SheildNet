'use client';

import { useState } from 'react';
import { Monitor, Smartphone, Laptop, Plus, CheckCircle, AlertCircle } from 'lucide-react';

const MOCK_DEVICES = [
  { id: '1', name: 'My PC', os: 'Windows 11', lastSeen: '2 minutes ago', status: 'protected' as const },
];

export default function DevicesPage() {
  const [devices] = useState(MOCK_DEVICES);

  const DeviceIcon = ({ os }: { os: string }) => {
    if (os.toLowerCase().includes('iphone') || os.toLowerCase().includes('android')) return <Smartphone className="w-5 h-5" />;
    if (os.toLowerCase().includes('mac') || os.toLowerCase().includes('laptop')) return <Laptop className="w-5 h-5" />;
    return <Monitor className="w-5 h-5" />;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
            <Monitor className="w-6 h-6 text-blue-400" /> My Devices
          </h1>
          <p className="text-slate-400 text-sm mt-1">{devices.length} / 5 devices protected</p>
        </div>
        <button className="flex items-center gap-2 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
          <Plus className="w-4 h-4" /> Add Device
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((d) => (
          <div key={d.id} className="card-glow rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-400/10 rounded-xl border border-blue-400/20 flex items-center justify-center text-blue-400">
                <DeviceIcon os={d.os} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{d.name}</p>
                <p className="text-slate-500 text-xs">{d.os}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Last seen</span>
                <span className="text-slate-300">{d.lastSeen}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-3 h-3" /> {d.status}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Empty slots */}
        {Array.from({ length: 5 - devices.length }).map((_, i) => (
          <div key={`empty-${i}`} className="card-glow rounded-xl p-5 border-dashed flex flex-col items-center justify-center gap-2 min-h-[130px] opacity-40">
            <AlertCircle className="w-5 h-5 text-slate-500" />
            <p className="text-slate-500 text-xs">Device slot available</p>
          </div>
        ))}
      </div>
    </div>
  );
}
