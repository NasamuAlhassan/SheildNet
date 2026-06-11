import Link from 'next/link';
import {
  ArrowRight, Check, ChevronDown, Users, Building2, Landmark,
  Brain, Zap, Search, Lock, Globe, CheckSquare, Eye,
  Plug, Activity, ShieldCheck, Shield,
} from 'lucide-react';
import ThreatRadar from '@/components/landing/ThreatRadar';
import AnimatedStats from '@/components/landing/AnimatedStats';

/* ─── Hero ───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 dot-grid">
      {/* Radial fade over the dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, var(--bg) 20%, transparent 80%)' }} />

      <ThreatRadar />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 py-28">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-8 tracking-wide uppercase"
          style={{ background: 'var(--primary-subtle)', borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)', color: 'var(--primary)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
          AI‑Powered · Real‑Time · 24 / 7 Global Protection
        </div>

        {/* Headline */}
        <h1 className="font-grotesk text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
          <span style={{ color: 'var(--text)' }}>Cybersecurity</span>
          <br />
          <span className="text-gradient">for Everyone.</span>
        </h1>

        {/* Sub */}
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}>
          Enterprise-grade AI protection for individuals, businesses, and governments.
          ShieldNet AI learns continuously from every attack to defend you better.
        </p>

        {/* Tier pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {[
            { icon: Users, label: 'Personal', colorVar: '--cyber' },
            { icon: Building2, label: 'Business', colorVar: '--primary' },
            { icon: Landmark, label: 'Government', colorVar: '--warning' },
          ].map(({ icon: Icon, label, colorVar }) => (
            <span key={label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
              style={{
                background: `color-mix(in srgb, var(${colorVar}) 8%, transparent)`,
                borderColor: `color-mix(in srgb, var(${colorVar}) 20%, transparent)`,
                color: `var(${colorVar})`,
              }}>
              <Icon className="w-3.5 h-3.5" />
              {label}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/signup"
            className="btn-primary px-8 py-3.5 rounded-xl text-base font-bold shadow-[var(--shadow-glow)] hover:shadow-[0_0_0_6px_color-mix(in_srgb,var(--primary)_15%,transparent)]">
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/pricing"
            className="btn-secondary px-8 py-3.5 rounded-xl text-base font-medium">
            View Plans
          </Link>
        </div>

        <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
          14-day free trial · No credit card required
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: 'var(--text-muted)' }}>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}

/* ─── Platform Tiers ─────────────────────────────────── */
const TIERS = [
  {
    id: 'personal', Icon: Users, colorVar: '--cyber',
    badge: 'For Individuals', name: 'ShieldNet Personal', tagline: 'Identity & Device Protection',
    features: ['Identity theft monitoring & real-time alerts', 'Phishing link & scam SMS detection',
      'Dark web credential monitoring', 'Encrypted personal data vault',
      'Secure password manager', 'Family protection (up to 5 devices)', 'In-app security score'],
    price: 'Free — $9.99 / mo', cta: 'Start Free', href: '/signup', highlight: false,
  },
  {
    id: 'business', Icon: Building2, colorVar: '--primary',
    badge: 'For Teams', name: 'ShieldNet Business', tagline: 'SOC, EDR & Compliance',
    features: ['AI-powered Security Operations Center', 'Endpoint detection & response (EDR)',
      'Zero-trust network access (ZTNA)', 'Real-time breach alerts & playbooks',
      'GDPR, ISO 27001, SOC 2 dashboards', 'Employee phishing simulation', '24/7 support portal'],
    price: '$49 — $499+ / mo', cta: 'Start Free Trial', href: '/signup', highlight: true,
  },
  {
    id: 'government', Icon: Landmark, colorVar: '--warning',
    badge: 'For Agencies', name: 'ShieldNet Gov', tagline: 'Nation-State Defense',
    features: ['Air-gapped & on-premise deployment', 'Nation-state & APT intelligence',
      'Critical infrastructure monitoring', 'Incident war-room dashboard',
      'Classified data compartmentalization', 'Inter-agency threat sharing', '24/7 dedicated gov team'],
    price: 'Custom quote', cta: 'Contact Sales', href: '/contact', highlight: false,
  },
] as const;

function TiersSection() {
  return (
    <section id="features" className="py-24 px-4" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge badge-primary mb-4">Three tiers. One platform.</span>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Protection for{' '}
            <span className="text-gradient">Every Level</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            From personal devices to national infrastructure — ShieldNet AI scales to every security requirement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((tier) => {
            const { Icon } = tier;
            const accentColor = `var(${tier.colorVar})`;
            return (
              <div key={tier.id} className="card-glass flex flex-col relative p-8"
                style={tier.highlight ? { boxShadow: `0 0 0 2px color-mix(in srgb, var(--primary) 35%, transparent), var(--shadow-lg)` } : {}}>
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge font-bold tracking-wide text-[11px] uppercase"
                    style={{ background: 'var(--primary)', color: 'var(--primary-text)', border: 'none', padding: '4px 12px' }}>
                    Most Popular
                  </div>
                )}

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-5 w-fit"
                  style={{ background: `color-mix(in srgb, ${accentColor} 10%, transparent)`, borderColor: `color-mix(in srgb, ${accentColor} 22%, transparent)`, color: accentColor }}>
                  <Icon className="w-3.5 h-3.5" />
                  {tier.badge}
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
                  <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{tier.price}</p>
                  <Link href={tier.href}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${tier.highlight ? 'btn-primary' : 'btn-secondary'}`}>
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

/* ─── Core Capabilities ──────────────────────────────── */
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
        <div className="text-center mb-16">
          <span className="badge badge-primary mb-4">Core Capabilities</span>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Everything You Need to{' '}
            <span className="text-gradient">Stay Protected</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Seven intelligence layers, continuously learning from 500M+ threat signals worldwide.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CAPABILITIES.map(({ Icon, name, colorVar, desc }) => (
            <div key={name} className="card p-6 flex flex-col gap-4 group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all group-hover:scale-110 duration-200"
                style={{
                  background: `color-mix(in srgb, var(${colorVar}) 10%, transparent)`,
                  borderColor: `color-mix(in srgb, var(${colorVar}) 20%, transparent)`,
                }}>
                <Icon className="w-5 h-5" style={{ color: `var(${colorVar})` }} />
              </div>
              <div>
                <h3 className="font-grotesk font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>{name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────── */
const STEPS = [
  { step: '01', Icon: Plug,        title: 'Deploy',  color: '--cyber',   desc: 'Connect ShieldNet AI in minutes. Supports cloud, on-premise, and hybrid environments.' },
  { step: '02', Icon: Activity,    title: 'Detect',  color: '--primary', desc: 'AI monitors every signal — endpoints, network, cloud, and live dark web feeds, 24/7.' },
  { step: '03', Icon: ShieldCheck, title: 'Respond', color: '--success', desc: 'Threats contained automatically in seconds with guided playbooks and real-time alerts.' },
];

function HowItWorksSection() {
  return (
    <section className="py-24 px-4" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge badge-primary mb-4">How It Works</span>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Up and Running{' '}
            <span className="text-gradient">in Minutes</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            No security team required. ShieldNet AI protects from the moment you connect.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px"
            style={{ background: 'linear-gradient(to right, var(--cyber), var(--primary), var(--success))' }} />

          {STEPS.map(({ step, Icon, title, desc, color }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl border flex items-center justify-center transition-all hover:scale-105 duration-200"
                  style={{ background: `color-mix(in srgb, var(${color}) 10%, transparent)`, borderColor: `color-mix(in srgb, var(${color}) 25%, transparent)` }}>
                  <Icon className="w-7 h-7" style={{ color: `var(${color})` }} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  {step}
                </div>
              </div>
              <h3 className="font-grotesk text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>{title}</h3>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Compliance ─────────────────────────────────────── */
const COMPLIANCE = [
  { name: 'GDPR',     full: 'General Data Protection Regulation', region: 'European Union' },
  { name: 'ISO 27001',full: 'Information Security Management',    region: 'International' },
  { name: 'SOC 2',    full: 'Service Organization Control 2',     region: 'United States' },
  { name: 'NDPR',     full: 'Nigeria Data Protection Regulation', region: 'Nigeria' },
];

function ComplianceSection() {
  return (
    <section className="py-20 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-grotesk text-3xl font-bold mb-3" style={{ color: 'var(--text)' }}>
            Built for <span className="text-gradient">Global Compliance</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Automated audit trails for every major regulatory framework.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COMPLIANCE.map((c) => (
            <div key={c.name} className="card p-5 flex flex-col items-center text-center gap-3 group hover:shadow-[var(--shadow-glow-sm)]">
              <div className="w-11 h-11 rounded-full flex items-center justify-center border transition-all group-hover:scale-110 duration-200"
                style={{ background: 'var(--primary-subtle)', borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)' }}>
                <Shield className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <p className="font-grotesk font-bold text-sm" style={{ color: 'var(--text)' }}>{c.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{c.full}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{c.region}</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--success)' }}>
                <Check className="w-3 h-3" /> Covered
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────── */
function CTASection() {
  return (
    <section id="government" className="py-28 px-4 relative overflow-hidden" style={{ background: 'var(--bg-alt)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, color-mix(in srgb, var(--primary) 8%, transparent) 0%, transparent 70%)' }} />
      <div className="relative max-w-3xl mx-auto text-center">
        <span className="badge badge-primary mb-6 text-xs">14-day free trial included</span>
        <h2 className="font-grotesk text-4xl md:text-6xl font-bold mb-5 leading-tight" style={{ color: 'var(--text)' }}>
          Start Protecting
          <br />
          <span className="text-gradient">What Matters Most</span>
        </h2>
        <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Join thousands of individuals, businesses, and government agencies already protected by ShieldNet AI.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/signup"
            className="btn-primary px-10 py-4 rounded-xl text-base font-bold">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/contact"
            className="btn-secondary px-10 py-4 rounded-xl text-base font-medium">
            Talk to Sales
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6 mt-8 text-xs" style={{ color: 'var(--text-muted)' }}>
          {['No credit card required', 'Cancel anytime', 'SOC 2 compliant'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <Check className="w-3 h-3" style={{ color: 'var(--success)' }} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────── */
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
