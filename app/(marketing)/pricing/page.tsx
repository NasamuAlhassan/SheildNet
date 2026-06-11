'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Shield, Zap, Building2, Landmark, HelpCircle } from 'lucide-react';

const plans = [
  {
    id: 'personal_free',
    name: 'Personal Free',
    icon: Shield,
    monthly: 0,
    annual: 0,
    devices: '1 device',
    features: [
      'Basic phishing link detection',
      'Monthly dark web email check',
      'In-app security score',
      'Community forum support',
    ],
    sla: { uptime: '99.5%', response: 'Best effort', support: 'Community forum' },
    cta: 'Get Started Free',
    href: '/signup',
    color: 'text-slate-400',
    border: '',
    ctaStyle: 'border border-[#1e293b] hover:border-cyan-400/30 text-slate-300 hover:text-white',
    free: true,
  },
  {
    id: 'personal_pro',
    name: 'Personal Pro',
    icon: Shield,
    monthly: 9.99,
    annual: 7.99,
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
    cta: 'Start Free Trial',
    href: '/signup?plan=personal_pro',
    color: 'text-cyan-400',
    border: '',
    ctaStyle: 'border border-cyan-400/30 hover:border-cyan-400/60 text-cyan-400 hover:text-white',
    free: false,
  },
  {
    id: 'business_starter',
    name: 'Business Starter',
    icon: Building2,
    monthly: 49,
    annual: 39.2,
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
    cta: 'Start Free Trial',
    href: '/signup?plan=business_starter',
    color: 'text-blue-400',
    border: '',
    ctaStyle: 'border border-blue-400/30 hover:border-blue-400/60 text-blue-400 hover:text-white',
    free: false,
  },
  {
    id: 'business_pro',
    name: 'Business Pro',
    icon: Zap,
    monthly: 199,
    annual: 159.2,
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
    cta: 'Start Free Trial',
    href: '/signup?plan=business_pro',
    color: 'text-blue-400',
    border: 'border-blue-500/40',
    ctaStyle: 'bg-blue-600 hover:bg-blue-500 text-white',
    free: false,
  },
  {
    id: 'business_enterprise',
    name: 'Business Enterprise',
    icon: Building2,
    monthly: 499,
    annual: 399.2,
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
    cta: 'Contact Sales',
    href: 'mailto:sales@shieldnet.ai',
    color: 'text-purple-400',
    border: '',
    ctaStyle: 'border border-purple-400/30 hover:border-purple-400/60 text-purple-400 hover:text-white',
    free: false,
  },
  {
    id: 'government',
    name: 'Government',
    icon: Landmark,
    monthly: null,
    annual: null,
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
    cta: 'Contact Government Sales',
    href: 'mailto:gov@shieldnet.ai',
    color: 'text-amber-400',
    border: 'border-amber-400/20',
    ctaStyle: 'border border-amber-400/30 hover:border-amber-400/60 text-amber-400 hover:text-white',
    free: false,
    govTier: true,
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

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <main className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1e293b] text-slate-500 text-xs mb-4">
            Simple, transparent pricing
          </div>
          <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-white mb-4">
            Plans for{' '}
            <span className="text-gradient-cyber">Every Scale</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            14-day free trial on all paid plans. No credit card required to start.
            All payments via Moolre Mobile Money.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full border border-[#1e293b] bg-[#0d1426]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                !annual ? 'bg-[#1e293b] text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                annual ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Annual
              <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-md">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = annual ? plan.annual : plan.monthly;
            return (
              <div
                key={plan.id}
                className={`card-glow rounded-2xl p-7 flex flex-col relative ${
                  plan.highlight ? 'border-blue-500/40 shadow-[0_0_50px_rgba(59,130,246,0.15)]' : plan.border
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className={`flex items-center gap-2 mb-4 ${plan.color}`}>
                  <Icon className="w-5 h-5" />
                  <span className="font-grotesk font-semibold text-sm">{plan.name}</span>
                </div>

                {/* Price */}
                <div className="mb-2">
                  {plan.govTier ? (
                    <div className="font-grotesk text-3xl font-bold text-white">Custom</div>
                  ) : plan.free ? (
                    <div className="font-grotesk text-3xl font-bold text-white">Free</div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="font-grotesk text-3xl font-bold text-white">
                        ${price?.toFixed(2)}
                      </span>
                      <span className="text-slate-500 text-sm mb-1">/mo</span>
                    </div>
                  )}
                </div>
                {annual && !plan.govTier && !plan.free && (
                  <p className="text-emerald-400 text-xs mb-2">Billed annually</p>
                )}
                <p className="text-slate-500 text-xs mb-5">{plan.devices}</p>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.color}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* SLA */}
                <div className="bg-[#060910]/60 rounded-xl p-3 mb-5 space-y-1.5">
                  <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide">SLA</p>
                  {[
                    ['Uptime', plan.sla.uptime],
                    ['Response', plan.sla.response],
                    ['Support', plan.sla.support],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-slate-500">{k}</span>
                      <span className="text-slate-300">{v}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={plan.href}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${plan.ctaStyle}`}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </Link>

                {!plan.free && !plan.govTier && (
                  <p className="text-slate-600 text-xs text-center mt-2">14-day free trial included</p>
                )}
              </div>
            );
          })}
        </div>

        {/* SLA Compensation Notice */}
        <div className="card-glow rounded-xl p-5 mb-16 flex items-start gap-3 max-w-3xl mx-auto">
          <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-1">SLA Breach Compensation</p>
            <p className="text-slate-400 text-xs leading-relaxed">
              If ShieldNet AI falls below your guaranteed uptime threshold, you automatically receive a service credit
              of up to <strong className="text-white">30% of your monthly fee per percentage point</strong> of
              downtime below the guarantee. Credits are applied to your next billing cycle — no claims required.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-grotesk text-2xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card-glow rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-semibold mb-2">{faq.q}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
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
