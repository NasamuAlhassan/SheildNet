import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Bell } from 'lucide-react';
import LiveAlertFeed from '@/components/dashboard/LiveAlertFeed';

export default async function PersonalAlertsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: alerts } = await supabase
    .from('user_alerts')
    .select('*, alert:alerts(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-foreground flex items-center gap-2">
          <Bell className="w-6 h-6 text-cyan-400" /> Alert History
        </h1>
        <p className="text-foreground-muted text-sm mt-1">
          All security alerts • updates in real-time
        </p>
      </div>

      <div className="card-glow rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-foreground text-sm font-semibold font-grotesk">
            {alerts?.length ?? 0} total alerts
          </span>
        </div>
        <LiveAlertFeed
          userId={user.id}
          initialAlerts={alerts ?? []}
          showDescription
        />
      </div>
    </div>
  );
}
