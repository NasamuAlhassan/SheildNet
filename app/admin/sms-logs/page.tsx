import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { MessageSquare, CheckCircle, XCircle, Loader } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default async function SMSLogsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: logs } = await supabase
    .from('sms_logs')
    .select('*, user:users(name, email)')
    .order('sent_at', { ascending: false })
    .limit(100);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-emerald-400" /> Emergency SMS Logs
        </h1>
        <p className="text-foreground-muted text-sm mt-1">All Moolre SMS dispatches — {logs?.length ?? 0} total</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {(['sent', 'delivered', 'failed'] as const).map((s) => (
          <div key={s} className="card-glow rounded-xl p-4 text-center">
            <p className={`font-grotesk text-2xl font-bold ${
              s === 'delivered' ? 'text-emerald-400' : s === 'failed' ? 'text-red-400' : 'text-blue-400'
            }`}>{logs?.filter(l => l.status === s).length ?? 0}</p>
            <p className="text-foreground-muted text-xs mt-1 capitalize">{s}</p>
          </div>
        ))}
      </div>

      <div className="card-glow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                {['Recipient', 'Phone', 'Message', 'Moolre Ref', 'Status', 'Sent At'].map(h => (
                  <th key={h} className="text-left text-foreground-muted font-normal px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(!logs || logs.length === 0) ? (
                <tr><td colSpan={6} className="text-center py-10 text-foreground-muted">No SMS dispatches yet</td></tr>
              ) : logs.map((log) => (
                <tr key={log.id} className="hover:bg-background/40">
                  <td className="px-4 py-3">
                    <p className="text-foreground-secondary">{(log.user as { name?: string })?.name ?? '—'}</p>
                    <p className="text-foreground-muted">{(log.user as { email?: string })?.email}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-foreground-secondary">{log.phone}</td>
                  <td className="px-4 py-3 text-foreground-muted max-w-[200px] truncate">{log.message}</td>
                  <td className="px-4 py-3 font-mono text-foreground-muted max-w-[120px] truncate">{log.moolre_ref ?? '—'}</td>
                  <td className="px-4 py-3">
                    {log.status === 'delivered' && <span className="flex items-center gap-1 text-emerald-400"><CheckCircle className="w-3 h-3" /> delivered</span>}
                    {log.status === 'sent' && <span className="flex items-center gap-1 text-blue-400"><Loader className="w-3 h-3" /> sent</span>}
                    {log.status === 'failed' && <span className="flex items-center gap-1 text-red-400"><XCircle className="w-3 h-3" /> failed</span>}
                    {log.status === 'pending' && <span className="text-foreground-muted">pending</span>}
                  </td>
                  <td className="px-4 py-3 text-foreground-muted whitespace-nowrap">{formatDateTime(log.sent_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
