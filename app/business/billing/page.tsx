import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getDaysRemaining, formatDate } from '@/lib/utils';
import { Clock, Users, Check, Shield, ArrowRight } from 'lucide-react';
import PaymentButton from '@/components/billing/PaymentButton';
import Link from 'next/link';

const BUSINESS_PLANS = [
  {
    id: 'business_starter' as const,
    name: 'Business Starter',
    price: '$49', annualPrice: '$39.20',
    limit: '10 users',
    features: ['EDR', 'Phishing simulation', 'Compliance dashboard', 'Breach alerts', 'Email & chat support'],
  },
  {
    id: 'business_pro' as const,
    name: 'Business Pro',
    price: '$199', annualPrice: '$159.20',
    limit: '50 users',
    features: ['Everything in Starter', 'AI SOC', 'Automated response', 'Zero-trust', 'Vulnerability scanning', '24/7 support'],
    highlight: true,
  },
  {
    id: 'business_enterprise' as const,
    name: 'Business Enterprise',
    price: '$499+', annualPrice: '$399.20+',
    limit: 'Unlimited users',
    features: ['Everything in Pro', 'Dedicated analyst', 'Custom integrations', 'API access', 'Air-gap option'],
    contactSales: true,
  },
];

export default async function BusinessBillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: business } = await supabase.from('businesses').select('id, company_name, plan').eq('admin_user_id', user.id).single();
  const { data: subscription } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).single();
  const { count: memberCount } = await supabase.from('business_members').select('*', { count: 'exact', head: true }).eq('business_id', business?.id ?? '');

  const daysLeft = getDaysRemaining(subscription?.trial_end_date ?? null);
  const isTrial = subscription?.status === 'trial';

  const PLAN_LIMITS: Record<string, number> = {
    business_starter: 10, business_pro: 50, business_enterprise: 9999,
  };
  const currentLimit = PLAN_LIMITS[subscription?.plan ?? ''] ?? 10;

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white">Billing & Subscription</h1>
        <p className="text-slate-400 text-sm mt-1">{business?.company_name}</p>
      </div>

      {/* Current plan */}
      <div className="card-glow rounded-xl p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-slate-400 text-xs mb-1">Current Plan</p>
            <h2 className="font-grotesk text-xl font-bold text-white capitalize">
              {subscription?.plan?.replace(/_/g, ' ') ?? 'Business Starter'}
            </h2>
          </div>
          <span className={`text-xs px-3 py-1.5 rounded-full border font-medium ${
            subscription?.status === 'active' ? 'badge-info' :
            isTrial ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' :
            'bg-slate-500/10 text-slate-400 border-slate-500/20'
          }`}>
            {subscription?.status ?? 'trial'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Team Members', value: `${memberCount ?? 0} / ${currentLimit === 9999 ? '∞' : currentLimit}` },
            { label: 'Billing Cycle', value: subscription?.billing_cycle ?? '—' },
            { label: 'Next Billing', value: subscription?.end_date ? formatDate(subscription.end_date) : '—' },
            { label: 'Moolre Ref', value: subscription?.moolre_payment_ref ?? 'Trial' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-slate-500 text-xs">{label}</p>
              <p className="text-slate-200 text-sm font-mono mt-0.5 truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* User count bar */}
        {currentLimit !== 9999 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Team members</span>
              <span>{memberCount ?? 0} / {currentLimit}</span>
            </div>
            <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, ((memberCount ?? 0) / currentLimit) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {isTrial && (
          <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-3 flex items-center gap-3">
            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <p className="text-amber-400 text-sm">
              {daysLeft > 0 ? `${daysLeft} days left in your free trial` : 'Trial expired — upgrade to continue.'}
            </p>
          </div>
        )}
      </div>

      {/* SLA policy */}
      <div className="card-glow rounded-xl p-4 flex items-start gap-3">
        <Shield className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-slate-400 text-xs leading-relaxed">
          <span className="text-white font-semibold">SLA Breach Compensation:</span> Up to 30% monthly fee credit per
          percentage point below guaranteed uptime — applied automatically on your next billing cycle.
        </p>
      </div>

      {/* Plan options */}
      <div>
        <h2 className="font-grotesk text-lg font-bold text-white mb-4">Change Plan</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {BUSINESS_PLANS.map((plan) => {
            const isCurrent = subscription?.plan === plan.id;
            return (
              <div key={plan.id} className={`card-glow rounded-xl p-5 flex flex-col relative ${plan.highlight ? 'border-blue-500/30' : ''}`}>
                {plan.highlight && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                    POPULAR
                  </div>
                )}
                <h3 className="font-grotesk font-bold text-white text-sm mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-xs mb-2">{plan.limit}</p>
                <p className="font-grotesk text-xl font-bold text-white mb-3">
                  {plan.price}<span className="text-slate-500 text-xs">/mo</span>
                </p>
                <ul className="space-y-1.5 flex-1 mb-4">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <Check className="w-3 h-3 text-blue-400 flex-shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                {isCurrent ? (
                  <div className="text-center py-2 text-blue-400 text-xs font-semibold">Current Plan</div>
                ) : plan.contactSales ? (
                  <a href="mailto:sales@shieldnet.ai" className="text-center py-2.5 border border-purple-400/30 hover:border-purple-400/60 text-purple-400 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1">
                    Contact Sales <ArrowRight className="w-3 h-3" />
                  </a>
                ) : (
                  <PaymentButton
                    plan={plan.id}
                    billingCycle="monthly"
                    label={`Switch to ${plan.name}`}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold ${plan.highlight ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'border border-[#1e293b] hover:border-blue-400/30 text-slate-300'}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
