import Link from 'next/link';
import {
  ArrowRight, Check, Users, Building2, Landmark,
  Brain, Zap, Search, Lock, Globe, CheckSquare, Eye,
  Plug, Activity, ShieldCheck,
} from 'lucide-react';
import AnimatedStats from '@/components/landing/AnimatedStats';

/* ─── Hero ─────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 40% 40%, color-mix(in srgb, var(--primary) 6%, transparent) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-center gap-16">

          {/* Headline */}
          <div className="flex-1 max-w-3xl">
            <span className="label-accent mb-5">AI-Powered Cybersecurity Platform</span>
            <h1 className="font-grotesk text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[0.97] tracking-tight mb-7">
              <span style={{ color: 'var(--text)' }}>Cybersecurity</span>
              <br />
              <span style={{ color: 'var(--text)' }}>for</span>
              <br />
              <span className="text-gradient">Everyone.</span>
            </h1>
            <p className="text-xl max-w-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Enterprise-grade AI protection for individuals, businesses, and governments —
              learning from every attack to defend you better.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/signup" className="btn-primary px-8 py-3.5 text-base font-bold">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="btn-secondary px-8 py-3.5 text-base">
                View Plans
              </Link>
            </div>
            <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
              14-day free trial · No credit card required
            </p>
          </div>

          {/* Tier links */}
          <div className="hidden md:flex flex-col gap-2 w-56 flex-shrink-0">
            {([
              { icon: Users, label: 'Personal', desc: 'Individuals & families', colorVar: '--cyber' as const, href: '/signup' },
              { icon: Building2, label: 'Business', desc: 'Teams & enterprises', colorVar: '--primary' as const, href: '/signup' },
              { icon: Landmark, label: 'Government', desc: 'Agencies & defense', colorVar: '--warning' as const, href: '/contact' },
            ]).map(({ icon: Icon, label, desc, colorVar, href }) => (
              <Link key={label} href={href} className="card p-4 flex items-center gap-3 group">
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: `color-mix(in srgb, var(${colorVar}) 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, var(${colorVar}) 20%, transparent)`,
                  }}>
                  <Icon className="w-4 h-4" style={{ color: `var(${colorVar})` }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{label}</p>
                  <p className="text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity flex-shrink-0"
                  style={{ color: 'var(--text-muted)' }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Platform Tiers ─────────────────────────────────────── */
const TIERS = [
  {
    id: 'personal', Icon: Users, colorVar: '--cyber',
    label: 'For Individuals', name: 'ShieldNet Personal', tagline: 'Identity & Device Protection',
    features: [
      'Identity theft monitoring & real-time alerts',
      'Phishing link & scam SMS detection',
      'Dark web credential monitoring',
      'Encrypted personal data vault',
      'Secure password manager',
      'Family protection (up to 5 devices)',
      'In-app security score',
    ],
    price: 'Free — $9.99 / mo', cta: 'Start Free', href: '/signup', highlight: false,
  },
  {
    id: 'business', Icon: Building2, colorVar: '--primary',
    label: 'For Teams', name: 'ShieldNet Business', tagline: 'SOC, EDR & Compliance',
    features: [
      'AI-powered Security Operations Center',
      'Endpoint detection & response (EDR)',
      'Zero-trust network access (ZTNA)',
      'Real-time breach alerts & playbooks',
      'GDPR, ISO 27001, SOC 2 dashboards',
      'Employee phishing simulation',
      '24/7 support portal',
    ],
    price: '$49 — $499+ / mo', cta: 'Start Free Trial', href: '/signup', highlight: true,
  },
  {
    id: 'government', Icon: Landmark, colorVar: '--warning',
    label: 'For Agencies', name: 'ShieldNet Gov', tagline: 'Nation-State Defense',
    features: [
      'Air-gapped & on-premise deployment',
      'Nation-state & APT intelligence',
      'Critical infrastructure monitoring',
      'Incident war-room dashboard',
      'Classified data compartmentalization',
      'Inter-agency threat sharing',
      '24/7 dedicated gov team',
    ],
    price: 'Custom quote', cta: 'Contact Sales', href: '/contact', highlight: false,
  },
] as const;

function TiersSection() {
  return (
    <section id="features" className="py-24 px-4" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="label mb-3">Platform</span>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text)' }}>
            Three tiers.<br />One platform.
          </h2>
          <p className="mt-4 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            From personal devices to national infrastructure —
            ShieldNet AI scales to every security requirement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((tier) => {
            const accentColor = `var(${tier.colorVar})`;
            const { Icon } = tier;
            return (
              <div key={tier.id} className="card flex flex-col relative p-8"
                style={tier.highlight ? { outline: `1.5px solid color-mix(in srgb, var(--primary) 30%, transparent)` } : {}}>
                {tier.highlight && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest"
                    style={{ borderRadius: 'var(--radius-sm)', background: 'var(--primary)', color: 'var(--primary-text)' }}>
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{
                      borderRadius: 'var(--radius-sm)',
                      background: `color-mix(in srgb, ${accentColor} 12%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${accentColor} 22%, transparent)`,
                    }}>
                    <Icon className="w-4 h-4" style={{ color: accentColor }} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}>{tier.label}</span>
                </div>

                <h3 className="font-grotesk text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>{tier.name}</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{tier.tagline}</p>

                <ul className="space-y-2.5 flex-1 mb-8">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="pt-5 border-t mt-auto" style={{ borderColor: 'var(--border)' }}>
                  <p className="text-xs mb-3 tabular-nums" style={{ color: 'var(--text-muted)' }}>{tier.price}</p>
                  <Link href={tier.href}
                    className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all ${tier.highlight ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ borderRadius: 'var(--radius)' }}>
                    {tier.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Core Capabilities ──────────────────────────────────── */
const CAPABILITIES = [
  { Icon: Brain,       name: 'AI Threat Detection',      colorVar: '--cyber',    desc: 'Real-time ML identification of malware, ransomware, phishing, and zero-day threats.' },
  { Icon: Zap,         name: 'Automated Response',        colorVar: '--primary',  desc: 'AI-driven containment cutting response time from hours to minutes.' },
  { Icon: Search,      name: 'Vulnerability Assessment',  colorVar: '--warning',  desc: 'Continuous scanning of networks, endpoints, and cloud infrastructure.' },
  { Icon: Lock,        name: 'Zero-Trust Access',         colorVar: '--success',  desc: 'Identity and access management — only verified users reach protected systems.' },
  { Icon: Globe,       name: 'Threat Intelligence Feed',  colorVar: '--cyber',    desc: 'Live global intel updated every 60 seconds across the ShieldNet network.' },
  { Icon: CheckSquare, name: 'Compliance Automation',     colorVar: '--primary',  desc: 'Automated reporting for GDPR, ISO 27001, SOC 2, NDPR, and more.' },
  { Icon: Eye,         name: 'Dark Web Monitoring',       colorVar: '--danger',   desc: 'Continuous surveillance for leaked credentials and threat actors.' },
];

function CapabilitiesSection() {
  return (
    <section className="py-24 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[280px_1fr] gap-16 items-start">

          {/* Sticky header */}
          <div className="md:sticky md:top-24">
            <span className="label mb-3">Capabilities</span>
            <h2 className="font-grotesk text-3xl md:text-4xl font-bold mb-4 leading-tight"
              style={{ color: 'var(--text)' }}>
              Everything you<br />need to stay<br />protected.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Seven intelligence layers, continuously learning from 500M+ threat signals worldwide.
            </p>
          </div>

          {/* Divider list */}
          <div className="divide-y divide-border">
            {CAPABILITIES.map(({ Icon, name, colorVar, desc }) => (
              <div key={name} className="flex items-start gap-5 py-5">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: `color-mix(in srgb, var(${colorVar}) 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, var(${colorVar}) 18%, transparent)`,
                  }}>
                  <Icon className="w-5 h-5" style={{ color: `var(${colorVar})` }} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────── */
const STEPS = [
  { step: '01', Icon: Plug,        title: 'Deploy',  colorVar: '--cyber',   desc: 'Connect ShieldNet AI in minutes. Supports cloud, on-premise, and hybrid environments.' },
  { step: '02', Icon: Activity,    title: 'Detect',  colorVar: '--primary', desc: 'AI monitors every signal — endpoints, network, cloud, and live dark web feeds, 24/7.' },
  { step: '03', Icon: ShieldCheck, title: 'Respond', colorVar: '--success', desc: 'Threats contained automatically in seconds with guided playbooks and real-time alerts.' },
];

function HowItWorksSection() {
  return (
    <section className="py-24 px-4" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="label mb-3">Process</span>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text)' }}>
            Up and running<br />in minutes.
          </h2>
          <p className="mt-4 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            No security team required. ShieldNet AI protects from the moment you connect.
          </p>
        </div>

        {/* Grid with border-lines via gap-px technique */}
        <div className="grid md:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
          {STEPS.map(({ step, Icon, title, desc, colorVar }) => (
            <div key={title} className="flex flex-col gap-4 p-8" style={{ background: 'var(--bg-alt)' }}>
              <div className="flex items-start justify-between">
                <span className="font-grotesk text-5xl font-bold leading-none tabular-nums select-none"
                  style={{ color: 'var(--border-strong)' }}>
                  {step}
                </span>
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: `color-mix(in srgb, var(${colorVar}) 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, var(${colorVar}) 20%, transparent)`,
                  }}>
                  <Icon className="w-5 h-5" style={{ color: `var(${colorVar})` }} />
                </div>
              </div>
              <div>
                <h3 className="font-grotesk text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Compliance ─────────────────────────────────────────── */
const COMPLIANCE = [
  { name: 'GDPR',      full: 'General Data Protection Regulation', region: 'European Union' },
  { name: 'ISO 27001', full: 'Information Security Management',    region: 'International' },
  { name: 'SOC 2',     full: 'Service Organization Control 2',     region: 'United States' },
  { name: 'NDPR',      full: 'Nigeria Data Protection Regulation', region: 'Nigeria' },
];

function ComplianceSection() {
  return (
    <section className="py-20 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-20">
          <div className="md:w-52 flex-shrink-0">
            <span className="label mb-3">Compliance</span>
            <h2 className="font-grotesk text-2xl font-bold leading-tight" style={{ color: 'var(--text)' }}>
              Built for global<br />compliance.
            </h2>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Automated audit trails for every major regulatory framework.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
            {COMPLIANCE.map((c) => (
              <div key={c.name} className="border-l-2 pl-4" style={{ borderColor: 'var(--primary)' }}>
                <p className="font-grotesk font-bold text-lg" style={{ color: 'var(--text)' }}>{c.name}</p>
                <p className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--text-muted)' }}>{c.full}</p>
                <p className="text-xs mt-2 flex items-center gap-1" style={{ color: 'var(--success)' }}>
                  <Check className="w-3 h-3" /> {c.region}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section id="cta" className="py-28 px-4 relative overflow-hidden" style={{ background: 'var(--bg-alt)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 20% 50%, color-mix(in srgb, var(--primary) 6%, transparent) 0%, transparent 70%)' }} />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left: headline + CTAs */}
          <div>
            <span className="label mb-5">14-day free trial included</span>
            <h2 className="font-grotesk text-4xl md:text-5xl font-bold mb-5 leading-tight"
              style={{ color: 'var(--text)' }}>
              Start protecting<br />
              <span className="text-gradient">what matters most.</span>
            </h2>
            <p className="text-lg mb-8 max-w-md leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Join thousands of individuals, businesses, and government agencies
              already protected by ShieldNet AI.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/signup" className="btn-primary px-10 py-4 text-base font-bold">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-secondary px-10 py-4 text-base">
                Talk to Sales
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 mt-6 text-xs" style={{ color: 'var(--text-muted)' }}>
              {['No credit card required', 'Cancel anytime', 'SOC 2 compliant'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="w-3 h-3" style={{ color: 'var(--success)' }} />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: metrics grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '500M+', label: 'Threat signals monitored daily' },
              { value: '< 60s', label: 'Average threat response time' },
              { value: '99.9%', label: 'Platform uptime SLA' },
              { value: '50+',   label: 'Countries protected' },
            ].map(({ value, label }) => (
              <div key={label} className="card p-5">
                <p className="font-grotesk text-3xl font-bold mb-1 tabular-nums"
                  style={{ color: 'var(--text)' }}>{value}</p>
                <p className="text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <AnimatedStats />
      <TiersSection />
      <CapabilitiesSection />
      <HowItWorksSection />
      <ComplianceSection />
      <CTASection />
    </main>
  );
}
