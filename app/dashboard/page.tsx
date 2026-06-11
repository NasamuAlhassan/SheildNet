import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getDaysRemaining } from '@/lib/utils';
import { AlertTriangle, Eye, Monitor, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import LiveAlertFeed from '@/components/dashboard/LiveAlertFeed';
import SecurityScoreGauge from '@/components/dashboard/SecurityScoreGauge';

export default async function PersonalDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [{ data: profile }, { data: subscription }, { data: recentAlerts }] = await Promise.all([
    supabase.from('users').select('name').eq('id', user.id).single(),
    supabase.from('subscriptions').select('*').eq('user_id', user.id).single(),
    supabase.from('user_alerts')
      .select('*, alert:alerts(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10),
  ]);

  const daysLeft = getDaysRemaining(subscription?.trial_end_date ?? null);
  const activeAlerts = recentAlerts?.filter(a => a.status === 'active') ?? [];
  const criticalCount = activeAlerts.filter(a => a.alert?.severity === 'critical').length;
  const warningCount = activeAlerts.filter(a => a.alert?.severity === 'warning').length;
  const infoCount = activeAlerts.filter(a => a.alert?.severity === 'info').length;
  const score = Math.max(10, 100 - criticalCount * 20 - warningCount * 8 - infoCount * 3);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-grotesk text-2xl font-bold text-foreground">
            Welcome back, {profile?.name?.split(' ')[0]}
          </h1>
          <p className="text-foreground-muted text-sm mt-0.5">Your personal security overview</p>
        </div>
        {subscription?.status === 'trial' && daysLeft > 0 && (
          <div className="hidden sm:flex items-center gap-2 bg-amber-400/5 border border-amber-400/20 px-4 py-2 rounded-xl">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm">{daysLeft} days left in trial</span>
            <Link href="/dashboard/billing" className="text-xs bg-amber-400 text-amber-950 font-bold px-2.5 py-1 rounded-lg ml-1">
              Upgrade
            </Link>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Security score */}
        <div className="card-glow rounded-xl p-6 flex flex-col items-center justify-center">
          <p className="text-foreground-muted text-xs mb-3 font-medium uppercase tracking-wide">Security Score</p>
          <SecurityScoreGauge score={score} size={160} />
          <p className="text-foreground-muted text-xs mt-3 text-center max-w-[160px]">
            {criticalCount > 0
              ? `${criticalCount} critical alert${criticalCount > 1 ? 's' : ''} require attention`
              : 'No active threats detected'}
          </p>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4 content-start">
          {[
            {
              label: 'Active Threats',
              value: String(activeAlerts.length),
              sub: `${criticalCount} critical`,
              icon: AlertTriangle,
              color: activeAlerts.length > 0 ? 'text-red-400' : 'text-emerald-400',
              href: '/dashboard/alerts',
            },
            {
              label: 'Dark Web Scans',
              value: '1',
              sub: 'per month (free)',
              icon: Eye,
              color: 'text-purple-400',
              href: '/dashboard/dark-web',
            },
            {
              label: 'Devices',
              value: '1',
              sub: 'of 5 protected',
              icon: Monitor,
              color: 'text-blue-400',
              href: '/dashboard/devices',
            },
            {
              label: 'Plan',
              value: subscription?.plan?.replace('personal_', 'Pro ').replace('_', ' ') ?? 'Free',
              sub: subscription?.status === 'trial' ? `${daysLeft}d trial left` : subscription?.status ?? 'active',
              icon: Clock,
              color: 'text-cyan-400',
              href: '/dashboard/billing',
            },
          ].map(({ label, value, sub, icon: Icon, color, href }) => (
            <Link key={label} href={href} className="card-glow rounded-xl p-4 hover:border-border-strong transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-foreground-muted text-xs">{label}</span>
              </div>
              <p className={`font-grotesk text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-foreground-muted text-xs mt-0.5">{sub}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Live alert feed */}
      <div className="card-glow rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <h2 className="font-grotesk font-semibold text-foreground text-sm">Live Alert Feed</h2>
          </div>
          <Link href="/dashboard/alerts" className="text-xs text-foreground-muted hover:text-cyan-400 flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <LiveAlertFeed
          userId={user.id}
          initialAlerts={recentAlerts ?? []}
        />
      </div>
    </div>
  );
}
