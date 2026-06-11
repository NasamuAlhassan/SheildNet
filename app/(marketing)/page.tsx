import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Users,
  Building2,
  Landmark,
  Brain,
  Zap,
  Search,
  Lock,
  Globe,
  CheckSquare,
  Eye,
  Plug,
  Activity,
  ShieldCheck,
  Shield,
} from 'lucide-react';
import ThreatRadar from '@/components/landing/ThreatRadar';
import AnimatedStats from '@/components/landing/AnimatedStats';

// ─── Hero ──────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-[#060910]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(34,211,238,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Animated radar */}
      <ThreatRadar />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 py-24">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/5 text-cyan-400 text-xs font-medium mb-8">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
          AI-Powered &bull; Real-Time &bull; 24/7 Global Protection
        </div>

        {/* Headline */}
        <h1 className="font-grotesk text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
          <span className="text-white">Cybersecurity</span>
          <br />
          <span className="text-gradient-cyber">for Everyone.</span>
        </h1>

        {/* Sub-heading */}
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Enterprise-grade AI protection for individuals, businesses, and governments.
          ShieldNet AI learns continuously from every attack — so you&apos;re always a step ahead.
        </p>

        {/* Tier pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {[
            { icon: Users, label: 'Personal', color: 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5' },
            { icon: Building2, label: 'Business', color: 'text-blue-400 border-blue-400/20 bg-blue-400/5' },
            { icon: Landmark, label: 'Government', color: 'text-amber-400 border-amber-400/20 bg-amber-400/5' },
          ].map(({ icon: Icon, label, color }) => (
            <span
              key={label}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${color}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#060910] font-bold px-8 py-3.5 rounded-xl transition-all duration-200 text-base shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_45px_rgba(34,211,238,0.5)]"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 border border-[#1e293b] hover:border-cyan-400/30 text-slate-300 hover:text-white px-8 py-3.5 rounded-xl transition-all duration-200 text-base"
          >
            View Plans
          </Link>
        </div>

        <p className="text-slate-600 text-sm mt-4">14-day free trial &bull; No credit card required</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 animate-bounce">
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}

// ─── Platform Tiers ────────────────────────────────────────────────────────
const tiers = [
  {
    id: 'personal',
    Icon: Users,
    badge: 'For Individuals',
    badgeColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    name: 'ShieldNet Personal',
    tagline: 'Identity & Device Protection',
    features: [
      'Identity theft monitoring & real-time alerts',
      'Phishing link & scam SMS detection',
      'Dark web credential monitoring',
      'Encrypted personal data vault',
      'Secure password manager',
      'Family protection (up to 5 devices)',
      'In-app security score & recommendations',
    ],
    price: 'Free — $9.99 / mo',
    cta: 'Start Free',
    ctaHref: '/signup',
    highlight: false,
    checkColor: 'text-cyan-400',
  },
  {
    id: 'business',
    Icon: Building2,
    badge: 'For Teams',
    badgeColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    name: 'ShieldNet Business',
    tagline: 'SOC, EDR & Compliance',
    features: [
      'AI-powered Security Operations Center (SOC)',
      'Endpoint detection & response (EDR)',
      'Zero-trust network access (ZTNA)',
      'Real-time breach alerts & automated playbooks',
      'GDPR, ISO 27001, SOC 2 compliance dashboards',
      'Employee phishing simulation & training',
      '24/7 dedicated support portal',
    ],
    price: '$49 — $499+ / mo',
    cta: 'Start Free Trial',
    ctaHref: '/signup',
    highlight: true,
    checkColor: 'text-blue-400',
  },
  {
    id: 'government',
    Icon: Landmark,
    badge: 'For Agencies',
    badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    name: 'ShieldNet Gov',
    tagline: 'Nation-State Defense',
    features: [
      'Air-gapped and on-premise deployment',
      'Nation-state & APT threat intelligence',
      'Critical infrastructure monitoring',
      'Incident war-room command dashboard',
      'Classified data compartmentalization',
      'Inter-agency threat sharing protocols',
      '24/7 dedicated government SLA team',
    ],
    price: 'Custom quote',
    cta: 'Contact Sales',
    ctaHref: '/contact',
    highlight: false,
    checkColor: 'text-amber-400',
  },
] as const;

function TiersSection() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1e293b] text-slate-500 text-xs mb-4">
            Three tiers. One platform.
          </div>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-white mb-4">
            Protection for{' '}
            <span className="text-gradient-cyber">Every Level</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            From personal devices to national infrastructure — ShieldNet AI scales to every security requirement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const { Icon } = tier;
            return (
              <div
                key={tier.id}
                className={`card-glow rounded-2xl p-8 relative flex flex-col ${
                  tier.highlight
                    ? 'border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.12)]'
                    : ''
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full tracking-wide">
                    MOST POPULAR
                  </div>
                )}

                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-5 w-fit ${tier.badgeColor}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tier.badge}
                </div>

                <h3 className="font-grotesk text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-slate-500 text-sm mb-6">{tier.tagline}</p>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.checkColor}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[#1e293b] pt-5 mt-auto">
                  <p className="text-slate-500 text-xs mb-3">{tier.price}</p>
                  <Link
                    href={tier.ctaHref}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      tier.highlight
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_25px_rgba(59,130,246,0.3)]'
                        : 'border border-[#1e293b] hover:border-cyan-400/30 text-slate-300 hover:text-white'
                    }`}
                  >
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

// ─── Core Capabilities ─────────────────────────────────────────────────────
const capabilities = [
  {
    Icon: Brain,
    name: 'AI Threat Detection',
    desc: 'Real-time identification of malware, ransomware, phishing, and zero-day threats using continuously learning ML models.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10 border-cyan-400/15',
  },
  {
    Icon: Zap,
    name: 'Automated Response',
    desc: 'AI-driven containment and remediation cutting response time from hours to minutes with zero manual intervention.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10 border-blue-400/15',
  },
  {
    Icon: Search,
    name: 'Vulnerability Assessment',
    desc: 'Continuous scanning of networks, endpoints, and cloud infrastructure to surface vulnerabilities before attackers exploit them.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10 border-purple-400/15',
  },
  {
    Icon: Lock,
    name: 'Zero-Trust Access',
    desc: 'Identity and access management ensuring only verified users and trusted devices interact with protected systems.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10 border-emerald-400/15',
  },
  {
    Icon: Globe,
    name: 'Threat Intelligence Feed',
    desc: 'Live global threat intelligence updated every 60 seconds, shared across the entire ShieldNet AI network.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10 border-amber-400/15',
  },
  {
    Icon: CheckSquare,
    name: 'Compliance Automation',
    desc: 'Automated reporting and audit trails for GDPR, ISO 27001, SOC 2, NDPR, and all major regulatory frameworks.',
    color: 'text-pink-400',
    bg: 'bg-pink-400/10 border-pink-400/15',
  },
  {
    Icon: Eye,
    name: 'Dark Web Monitoring',
    desc: 'Continuous surveillance of dark web markets and forums for leaked credentials, company data, and threat actors.',
    color: 'text-red-400',
    bg: 'bg-red-400/10 border-red-400/15',
  },
];

function CapabilitiesSection() {
  return (
    <section className="py-24 px-4 bg-[#0d1426]/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1e293b] text-slate-500 text-xs mb-4">
            Core Capabilities
          </div>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to{' '}
            <span className="text-gradient-cyber">Stay Protected</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Seven intelligence layers working in concert, continuously learning from 500M+ threat signals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {capabilities.map(({ Icon, name, desc, color, bg }, i) => (
            <div key={i} className="card-glow rounded-xl p-6 flex flex-col gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <h3 className="font-grotesk font-semibold text-white text-sm mb-1.5">{name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ──────────────────────────────────────────────────────────
const steps = [
  {
    step: '01',
    Icon: Plug,
    title: 'Deploy',
    desc: 'Connect ShieldNet AI to your infrastructure in minutes via guided setup. Supports cloud, on-premise, and hybrid environments.',
    color: 'text-cyan-400',
    border: 'border-cyan-400/20',
    bg: 'bg-cyan-400/10',
  },
  {
    step: '02',
    Icon: Activity,
    title: 'Detect',
    desc: 'Our AI engine monitors every signal continuously — endpoints, network traffic, cloud activity, and live dark web feeds.',
    color: 'text-blue-400',
    border: 'border-blue-400/20',
    bg: 'bg-blue-400/10',
  },
  {
    step: '03',
    Icon: ShieldCheck,
    title: 'Respond',
    desc: 'Threats are contained automatically in seconds. You receive real-time alerts and guided playbooks for immediate action.',
    color: 'text-emerald-400',
    border: 'border-emerald-400/20',
    bg: 'bg-emerald-400/10',
  },
];

function HowItWorksSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1e293b] text-slate-500 text-xs mb-4">
            How It Works
          </div>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-white mb-4">
            Up and Running{' '}
            <span className="text-gradient-cyber">in Minutes</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            No complex setup. No security team required. ShieldNet AI protects from the moment you connect.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[calc(33%+2rem)] right-[calc(33%+2rem)] h-px bg-gradient-to-r from-cyan-400/30 via-blue-400/30 to-emerald-400/30" />

          {steps.map(({ step, Icon, title, desc, color, border, bg }, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-0 ${bg} ${border}`}
                >
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#060910] border border-[#1e293b] rounded-full flex items-center justify-center">
                  <span className="text-slate-500 text-[9px] font-bold">{step}</span>
                </div>
              </div>
              <h3 className="font-grotesk text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Compliance ────────────────────────────────────────────────────────────
const compliance = [
  { name: 'GDPR', full: 'General Data Protection Regulation', region: 'European Union' },
  { name: 'ISO 27001', full: 'Information Security Management', region: 'International' },
  { name: 'SOC 2', full: 'Service Organization Control 2', region: 'United States' },
  { name: 'NDPR', full: 'Nigeria Data Protection Regulation', region: 'Nigeria' },
];

function ComplianceSection() {
  return (
    <section className="py-20 px-4 bg-[#0d1426]/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-grotesk text-3xl font-bold text-white mb-3">
            Built for{' '}
            <span className="text-gradient-cyber">Global Compliance</span>
          </h2>
          <p className="text-slate-400">
            ShieldNet AI automates audit trails for every major regulatory framework.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {compliance.map((c) => (
            <div
              key={c.name}
              className="card-glow rounded-xl p-5 flex flex-col items-center text-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="font-grotesk font-bold text-white text-sm">{c.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">{c.full}</p>
                <p className="text-slate-600 text-xs mt-0.5">{c.region}</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs">
                <Check className="w-3 h-3" />
                Covered
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="government" className="py-28 px-4 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(34,211,238,0.07) 0%, transparent 70%)',
        }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/5 text-cyan-400 text-xs font-medium mb-6">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
          14-day free trial included
        </div>
        <h2 className="font-grotesk text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
          Start Protecting
          <br />
          <span className="text-gradient-cyber">What Matters Most</span>
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          Join thousands of individuals, businesses, and government agencies already protected by ShieldNet AI.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#060910] font-bold px-10 py-4 rounded-xl transition-all duration-200 text-base shadow-[0_0_40px_rgba(34,211,238,0.35)] hover:shadow-[0_0_55px_rgba(34,211,238,0.55)]"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-[#1e293b] hover:border-cyan-400/30 text-slate-300 hover:text-white px-10 py-4 rounded-xl transition-all duration-200 text-base"
          >
            Talk to Sales
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6 mt-8 text-slate-600 text-xs">
          {['No credit card required', 'Cancel anytime', 'SOC 2 compliant'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-500" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
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
