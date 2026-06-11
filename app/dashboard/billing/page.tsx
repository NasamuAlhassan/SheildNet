import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getDaysRemaining, formatDate } from '@/lib/utils';
import { Clock, Shield, Check, ArrowRight } from 'lucide-react';
import PaymentButton from '@/components/billing/PaymentButton';
import Link from 'next/link';

const UPGRADE_PLANS = [
  {
    id: 'personal_pro' as const,
    name: 'Personal Pro',
    price: '$9.99',
    annualPrice: '$7.99',
    devices: '5 devices',
    features: ['Full identity monitoring', 'Real-time dark web alerts', 'Encrypted vault', 'Password manager', 'Family protection'],
  },
];

export default async function PersonalBillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const daysLeft = getDaysRemaining(subscription?.trial_end_date ?? null);
  const isTrial = subscription?.status === 'trial';
  const isPro = subscription?.plan === 'personal_pro' && subscription?.status === 'active';

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-foreground">Billing & Subscription</h1>
        <p className="text-foreground-muted text-sm mt-1">Manage your ShieldNet AI plan</p>
      </div>

      {/* Current plan card */}
      <div className="card-glow rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-foreground-muted text-xs mb-1">Current Plan</p>
            <h2 className="font-grotesk text-xl font-bold text-foreground capitalize">
              {subscription?.plan?.replace('_', ' ') ?? 'Personal Free'}
            </h2>
          </div>
          <span className={`text-xs px-3 py-1.5 rounded-full border font-medium ${
            subscription?.status === 'active' ? 'badge-info' :
            subscription?.status === 'trial' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' :
            'bg-slate-500/10 text-foreground-muted border-slate-500/20'
          }`}>
            {subscription?.status ?? 'free'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
          {[
            { label: 'Billing Cycle', value: subscription?.billing_cycle ?? '—' },
            { label: 'Start Date', value: subscription?.start_date ? formatDate(subscription.start_date) : '—' },
            { label: 'Payment Ref', value: subscription?.moolre_payment_ref ?? 'Trial' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-foreground-muted text-xs">{label}</p>
              <p className="text-foreground-secondary text-sm font-mono mt-0.5 truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* Trial countdown */}
        {isTrial && (
          <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-3 flex items-center gap-3">
            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-amber-400 text-sm font-semibold">
                {daysLeft > 0 ? `${daysLeft} days left in your free trial` : 'Your trial has expired'}
              </p>
              <p className="text-foreground-muted text-xs">
                Upgrade before {subscription?.trial_end_date ? formatDate(subscription.trial_end_date) : '—'} to keep full access.
              </p>
            </div>
          </div>
        )}

        {isPro && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <Check className="w-4 h-4" />
            You have full Personal Pro access. Next billing:{' '}
            {subscription?.end_date ? formatDate(subscription.end_date) : '—'}
          </div>
        )}
      </div>

      {/* SLA Compensation Policy */}
      <div className="card-glow rounded-xl p-4 flex items-start gap-3">
        <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <p className="text-foreground-muted text-xs leading-relaxed">
          <span className="text-foreground font-semibold">SLA Breach Compensation:</span> If ShieldNet AI falls below
          your guaranteed uptime, you automatically receive a credit of up to{' '}
          <span className="text-foreground">30% of your monthly fee per percentage point</span> below the threshold.
          Applied to your next billing cycle automatically.
        </p>
      </div>

      {/* Upgrade section */}
      {!isPro && (
        <div>
          <h2 className="font-grotesk text-lg font-bold text-foreground mb-4">Upgrade to Personal Pro</h2>
          {UPGRADE_PLANS.map((plan) => (
            <div key={plan.id} className="card-glow rounded-xl p-6 border-cyan-400/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-grotesk font-bold text-foreground">{plan.name}</h3>
                  <p className="text-foreground-muted text-sm">{plan.devices}</p>
                </div>
                <div className="text-right">
                  <p className="font-grotesk text-2xl font-bold text-foreground">{plan.price}<span className="text-foreground-muted text-sm">/mo</span></p>
                  <p className="text-emerald-400 text-xs">or {plan.annualPrice}/mo billed annually</p>
                </div>
              </div>

              <ul className="space-y-2 mb-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground-secondary">
                    <Check className="w-3.5 h-3.5 text-cyan-400" /> {f}
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                <PaymentButton
                  plan={plan.id}
                  billingCycle="monthly"
                  label="Pay Monthly via MoMo"
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-white py-3 rounded-xl text-sm"
                />
                <PaymentButton
                  plan={plan.id}
                  billingCycle="annual"
                  label={`Pay Annually (${plan.annualPrice}/mo)`}
                  className="flex-1 border border-cyan-400/30 hover:border-cyan-400/60 text-cyan-400 py-3 rounded-xl text-sm"
                />
              </div>
              <p className="text-foreground-muted text-xs text-center mt-2">
                Payment via Moolre Mobile Money — no card required
              </p>
            </div>
          ))}
        </div>
      )}

      {/* View all plans */}
      <Link href="/pricing" className="flex items-center gap-2 text-foreground-muted hover:text-foreground text-sm transition-colors">
        View all plans <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
