'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Shield, Zap, Building2, Landmark, HelpCircle } from 'lucide-react';

type CtaType = 'primary' | 'secondary' | 'cyber' | 'warning';

type Plan = {
  id: string;
  name: string;
  icon: typeof Shield;
  monthly: number | null;
  annual: number | null;
  devices: string;
  features: string[];
  sla: { uptime: string; response: string; support: string };
  cta: string;
  href: string;
  colorVar: string;
  highlight?: boolean;
  free?: boolean;
  govTier?: boolean;
  ctaType: CtaType;
};

const plans: Plan[] = [
  {
    id: 'personal_free',
    name: 'Personal Free',
    icon: Shield,
    monthly: 0, annual: 0,
    devices: '1 device',
    features: [
      'Basic phishing link detection',
      'Monthly dark web email check',
      'In-app security score',
      'Community forum support',
    ],
    sla: { uptime: '99.5%', response: 'Best effort', support: 'Community forum' },
    cta: 'Get Started Free', href: '/signup',
    colorVar: '--text-muted', ctaType: 'secondary', free: true,
  },
  {
    id: 'personal_pro',
    name: 'Personal Pro',
    icon: Shield,
    monthly: 9.99, annual: 7.99,
    devices: 'Up to 5 devices',
    features: [
      'Full identity theft monitoring & alerts',
      'Real-time dark web credential alerts',
      'Encrypted personal data vault',
      'Secure password manager',
      'Family device protection (5 devices)',
      'In-app security score & recommendations',
    ],
    sla: { uptime: '99.9%', response: '< 4 hours', support: 'Priority email (48h)' },
    cta: 'Start Free Trial', href: '/signup?plan=personal_pro',
    colorVar: '--cyber', ctaType: 'cyber',
  },
  {
    id: 'business_starter',
    name: 'Business Starter',
    icon: Building2,
    monthly: 49, annual: 39.2,
    devices: 'Up to 10 users',
    features: [
      'Endpoint detection & response (EDR)',
      'Employee phishing simulation & training',
      'Compliance dashboard (GDPR, ISO 27001, SOC 2)',
      'Real-time breach alert feed',
      'Team management (invite / remove)',
      'Email & chat support',
    ],
    sla: { uptime: '99.9%', response: '< 2 hours', support: 'Email + Chat' },
    cta: 'Start Free Trial', href: '/signup?plan=business_starter',
    colorVar: '--primary', ctaType: 'secondary',
  },
  {
    id: 'business_pro',
    name: 'Business Pro',
    icon: Zap,
    monthly: 199, annual: 159.2,
    devices: 'Up to 50 users',
    highlight: true,
    features: [
      'Everything in Business Starter',
      'AI-powered SOC overview',
      'Automated threat response & playbooks',
      'Zero-trust access log & enforcement',
      'Vulnerability scanning',
      'Live alert feed via Supabase Realtime',
      '24/7 email & chat support',
    ],
    sla: { uptime: '99.95%', response: '< 1 hour', support: '24/7 Email & Chat' },
    cta: 'Start Free Trial', href: '/signup?plan=business_pro',
    colorVar: '--primary', ctaType: 'primary',
  },
  {
    id: 'business_enterprise',
    name: 'Business Enterprise',
    icon: Building2,
    monthly: 499, annual: 399.2,
    devices: 'Unlimited users',
    features: [
      'Everything in Business Pro',
      'Dedicated security analyst',
      'Custom integrations & API access',
      'Air-gap deployment option',
      'Custom onboarding & SLA',
      '24/7 dedicated support',
    ],
    sla: { uptime: '99.99%', response: '< 15 minutes', support: '24/7 Dedicated analyst' },
    cta: 'Contact Sales', href: 'mailto:sales@shieldnet.ai',
    colorVar: '--primary', ctaType: 'secondary',
  },
  {
    id: 'government',
    name: 'Government',
    icon: Landmark,
    monthly: null, annual: null,
    devices: 'Custom',
    features: [
      'On-premise & air-gapped deployment',
      'Nation-state & APT threat intelligence',
      'Critical infrastructure monitoring',
      'War-room command dashboard',
      'Classified data compartmentalization',
      'Inter-agency threat sharing',
      'Bulk emergency SMS broadcast',
      '24/7 dedicated government team',
    ],
    sla: { uptime: '99.999%', response: '< 5 minutes', support: '24/7 Dedicated team' },
    cta: 'Contact Government Sales', href: 'mailto:gov@shieldnet.ai',
    colorVar: '--warning', ctaType: 'warning', govTier: true,
  },
];

const faqs = [
  {
    q: 'How does the 14-day free trial work?',
    a: 'Every paid plan includes a 14-day free trial. No credit card is required to start. At the end of the trial, you will be prompted to subscribe via Moolre Mobile Money. If you do not subscribe, your account downgrades to Personal Free automatically.',
  },
  {
    q: 'How are payments collected?',
    a: 'All subscription payments are collected via Moolre Mobile Money. After selecting a plan, you will be prompted to authorize a Mobile Money debit on your registered phone number. Payment confirmation is instant.',
  },
  {
    q: 'Can I switch plans?',
    a: 'Yes. You can upgrade or downgrade at any time from your billing dashboard. Upgrades take effect immediately (prorated). Downgrades take effect at the end of the current billing period.',
  },
  {
    q: 'What happens if my SLA uptime guarantee is missed?',
    a: 'If ShieldNet AI falls below your guaranteed uptime, you receive automatic credit of up to 30% of your monthly fee per percentage point of downtime below the threshold. Credits are applied automatically to your next billing cycle — no need to file a claim.',
  },
  {
    q: 'What does the Personal Free tier include?',
    a: 'Personal Free gives you basic phishing link detection, a monthly dark web scan for your email address, and an in-app security score. It is free forever with no trial expiry. Upgrade to Personal Pro for real-time monitoring and full protection.',
  },
  {
    q: 'How is Government pricing determined?',
    a: 'Government contracts are custom-quoted based on agency size, deployment type (cloud, on-premise, air-gapped), and required SLA. Contact gov@shieldnet.ai or fill out the inquiry form on our Contact page.',
  },
];

function planCtaStyle(ctaType: CtaType): React.CSSProperties {
  if (ctaType === 'cyber') return { borderColor: 'color-mix(in srgb, var(--cyber) 30%, transparent)', color: 'var(--cyber)' };
  if (ctaType === 'warning') return { borderColor: 'color-mix(in srgb, var(--warning) 30%, transparent)', color: 'var(--warning)' };
  return {};
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <main className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header — left-aligned, no pill badge */}
        <div className="mb-12 max-w-2xl">
          <span className="label mb-4">Pricing</span>
          <h1 className="font-grotesk text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Simple, transparent pricing.
          </h1>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
            14-day free trial on all paid plans. No credit card required to start.
            All payments via Moolre Mobile Money.
          </p>

          {/* Billing toggle — tab style, not rounded-full pill */}
          <div className="inline-flex items-center border overflow-hidden"
            style={{ borderColor: 'var(--border)', borderRadius: 'var(--radius)' }}>
            <button
              onClick={() => setAnnual(false)}
              className="px-5 py-2 text-sm font-medium transition-colors"
              style={{
                background: !annual ? 'var(--primary)' : 'transparent',
                color: !annual ? 'var(--primary-text)' : 'var(--text-muted)',
              }}>
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="px-5 py-2 text-sm font-medium transition-colors flex items-center gap-2"
              style={{
                background: annual ? 'var(--primary)' : 'transparent',
                color: annual ? 'var(--primary-text)' : 'var(--text-muted)',
              }}>
              Annual
              <span className="text-[10px] font-bold px-1.5 py-0.5"
                style={{
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--success-subtle)',
                  color: 'var(--success-text)',
                }}>
                −20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = annual ? plan.annual : plan.monthly;
            const accentColor = `var(${plan.colorVar})`;
            return (
              <div
                key={plan.id}
                className="card flex flex-col relative p-7"
                style={plan.highlight ? { outline: '1.5px solid color-mix(in srgb, var(--primary) 30%, transparent)' } : {}}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest"
                    style={{ borderRadius: 'var(--radius-sm)', background: 'var(--primary)', color: 'var(--primary-text)' }}>
                    Most Popular
                  </div>
                )}

                {/* Plan identity */}
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="w-5 h-5" style={{ color: accentColor }} />
                  <span className="font-grotesk font-semibold text-sm" style={{ color: accentColor }}>{plan.name}</span>
                </div>

                {/* Price */}
                <div className="mb-2">
                  {plan.govTier ? (
                    <div className="font-grotesk text-3xl font-bold tabular-nums" style={{ color: 'var(--text)' }}>Custom</div>
                  ) : plan.free ? (
                    <div className="font-grotesk text-3xl font-bold" style={{ color: 'var(--text)' }}>Free</div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="font-grotesk text-3xl font-bold tabular-nums" style={{ color: 'var(--text)' }}>
                        ${price?.toFixed(2)}
                      </span>
                      <span className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>/mo</span>
                    </div>
                  )}
                </div>
                {annual && !plan.govTier && !plan.free && (
                  <p className="text-xs mb-2" style={{ color: 'var(--success)' }}>Billed annually</p>
                )}
                <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>{plan.devices}</p>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* SLA */}
                <div className="p-3 mb-5 space-y-1.5"
                  style={{ background: 'var(--bg-alt)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>SLA</p>
                  {[
                    ['Uptime', plan.sla.uptime],
                    ['Response', plan.sla.response],
                    ['Support', plan.sla.support],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={plan.href}
                  className={`w-full flex items-center justify-center gap-2 py-3 font-semibold text-sm transition-all ${plan.ctaType === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: 'var(--radius)', ...planCtaStyle(plan.ctaType) }}>
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </Link>

                {!plan.free && !plan.govTier && (
                  <p className="text-xs text-center mt-2" style={{ color: 'var(--text-muted)' }}>14-day free trial included</p>
                )}
              </div>
            );
          })}
        </div>

        {/* SLA Compensation Notice */}
        <div className="card p-5 mb-16 flex items-start gap-3 max-w-3xl">
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
            style={{
              borderRadius: 'var(--radius-sm)',
              background: 'var(--primary-subtle)',
              border: '1px solid color-mix(in srgb, var(--primary) 20%, transparent)',
            }}>
            <Shield className="w-4 h-4" style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>SLA Breach Compensation</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              If ShieldNet AI falls below your guaranteed uptime threshold, you automatically receive a service credit
              of up to <strong className="font-bold" style={{ color: 'var(--text-secondary)' }}>30% of your monthly fee per percentage point</strong> of
              downtime below the guarantee. Credits are applied to your next billing cycle — no claims required.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl">
          <h2 className="font-grotesk text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} />
                  <div>
                    <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{faq.q}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
