import Link from 'next/link';
import { Shield } from 'lucide-react';

const CONTACTS = [
  { dept: 'General Inquiries',   email: 'hello@shieldnet.ai',   response: '2 business days' },
  { dept: 'Sales & Partnerships',email: 'sales@shieldnet.ai',   response: '1 business day' },
  { dept: 'Technical Support',   email: 'support@shieldnet.ai', response: 'Per SLA tier' },
  { dept: 'Government Relations',email: 'gov@shieldnet.ai',     response: '1 business day' },
  { dept: 'Privacy & Data',      email: 'privacy@shieldnet.ai', response: '5 business days' },
  { dept: 'Security Disclosures',email: 'security@shieldnet.ai',response: '24 hours' },
  { dept: 'Legal',               email: 'legal@shieldnet.ai',   response: '5 business days' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--card)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center border"
                style={{ background: 'var(--primary-subtle)', borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)' }}>
                <Shield className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              </div>
              <span className="font-grotesk font-bold text-lg" style={{ color: 'var(--text)' }}>
                Shield<span style={{ color: 'var(--primary)' }}>Net AI</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              World-class cybersecurity for every tier of society. AI-powered protection that never sleeps.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-grotesk font-semibold text-sm mb-4" style={{ color: 'var(--text)' }}>Platform</h4>
            <ul className="space-y-2.5">
              {['ShieldNet Personal', 'ShieldNet Business', 'ShieldNet Gov', 'Pricing'].map(item => (
                <li key={item}>
                  <Link href="/pricing" className="text-sm hover:text-[var(--text)] transition-colors" style={{ color: 'var(--text-muted)' }}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-grotesk font-semibold text-sm mb-4" style={{ color: 'var(--text)' }}>Capabilities</h4>
            <ul className="space-y-2.5">
              {['AI Threat Detection', 'Automated Response', 'Zero-Trust Access', 'Compliance Automation', 'Dark Web Monitoring'].map(item => (
                <li key={item}><span className="text-sm" style={{ color: 'var(--text-muted)' }}>{item}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-grotesk font-semibold text-sm mb-4" style={{ color: 'var(--text)' }}>Contact</h4>
            <ul className="space-y-2.5">
              {CONTACTS.slice(0, 5).map(c => (
                <li key={c.email}>
                  <a href={`mailto:${c.email}`} className="text-sm transition-colors hover:text-[var(--primary)]"
                    style={{ color: 'var(--text-muted)' }}>{c.email}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* All departments */}
        <div className="pt-8 mb-8" style={{ borderTop: '1px solid var(--border)' }}>
          <h4 className="font-grotesk font-semibold text-sm mb-4" style={{ color: 'var(--text)' }}>All Departments</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CONTACTS.map(c => (
              <div key={c.email}>
                <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{c.dept}</p>
                <a href={`mailto:${c.email}`} className="text-xs transition-colors hover:text-[var(--primary)]"
                  style={{ color: 'var(--text-secondary)' }}>{c.email}</a>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Response: {c.response}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2026 ShieldNet AI Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((label, i) => (
              <Link key={label} href={i === 2 ? '/contact' : `/${label.toLowerCase().replace(' ', '-')}`}
                className="text-xs transition-colors hover:text-[var(--text)]" style={{ color: 'var(--text-muted)' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
