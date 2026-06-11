'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { formatDateTime } from '@/lib/utils';
import { Shield, CheckCircle, X } from 'lucide-react';

interface AlertRow {
  id: string;
  status: string;
  sms_sent: boolean;
  created_at: string;
  alert: {
    id: string;
    title: string;
    severity: string;
    type: string;
    description: string;
  } | null;
}

interface Props {
  userId: string;
  initialAlerts: AlertRow[];
  showDescription?: boolean;
}

export default function LiveAlertFeed({ userId, initialAlerts, showDescription = false }: Props) {
  const [alerts, setAlerts] = useState<AlertRow[]>(initialAlerts);
  const [flashId, setFlashId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`live-feed-${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'user_alerts',
        filter: `user_id=eq.${userId}`,
      }, async (payload) => {
        const { data } = await supabase
          .from('user_alerts')
          .select('*, alert:alerts(*)')
          .eq('id', payload.new.id)
          .single();
        if (data) {
          setAlerts(prev => [data as AlertRow, ...prev.slice(0, 49)]);
          setFlashId(data.id);
          setTimeout(() => setFlashId(null), 3000);
        }
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'user_alerts',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        setAlerts(prev => prev.map(a =>
          a.id === payload.new.id ? { ...a, status: payload.new.status } : a
        ));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  async function updateStatus(alertId: string, status: 'resolved' | 'dismissed') {
    const supabase = createClient();
    await supabase.from('user_alerts').update({ status }).eq('id', alertId);
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status } : a));
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-12">
        <Shield className="w-10 h-10 mx-auto mb-3 text-slate-700" />
        <p className="text-slate-500 text-sm">No alerts — you&apos;re clean</p>
        <p className="text-slate-600 text-xs mt-1">New alerts appear here in real-time</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#1e293b]">
      {alerts.map((ua) => (
        <div
          key={ua.id}
          className={`p-4 flex items-start gap-3 transition-all duration-500 ${
            flashId === ua.id ? 'bg-cyan-400/5 border-l-2 border-l-cyan-400' : ''
          }`}
        >
          {/* Severity badge */}
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0 mt-0.5 whitespace-nowrap ${
            ua.alert?.severity === 'critical' ? 'badge-critical' :
            ua.alert?.severity === 'warning' ? 'badge-warning' : 'badge-info'
          }`}>
            {ua.alert?.severity}
          </span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-slate-100 text-sm font-medium leading-snug">{ua.alert?.title}</p>
            {showDescription && (
              <p className="text-slate-500 text-xs mt-1 line-clamp-2">{ua.alert?.description}</p>
            )}
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
              <span className="capitalize bg-[#1e293b] px-1.5 py-0.5 rounded">
                {ua.alert?.type?.replace('_', ' ')}
              </span>
              {ua.sms_sent && <span className="text-emerald-400">SMS sent</span>}
              <span>{formatDateTime(ua.created_at)}</span>
            </div>
          </div>

          {/* Actions */}
          {ua.status === 'active' ? (
            <div className="flex gap-1.5 flex-shrink-0">
              <button
                onClick={() => updateStatus(ua.id, 'resolved')}
                title="Resolve"
                className="flex items-center gap-1 text-xs text-emerald-400 border border-emerald-400/20 hover:border-emerald-400/50 hover:bg-emerald-400/5 px-2 py-1 rounded-lg transition-all"
              >
                <CheckCircle className="w-3 h-3" /> Resolve
              </button>
              <button
                onClick={() => updateStatus(ua.id, 'dismissed')}
                title="Dismiss"
                className="text-xs text-slate-500 border border-[#1e293b] hover:border-[#334155] hover:text-slate-300 px-2 py-1 rounded-lg transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <span className={`text-xs flex-shrink-0 px-2 py-0.5 rounded-full ${
              ua.status === 'resolved' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-slate-700 text-slate-400'
            }`}>
              {ua.status}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
