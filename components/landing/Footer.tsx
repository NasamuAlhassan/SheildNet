import Link from 'next/link';
import { Shield } from 'lucide-react';

const contacts = [
  { dept: 'General Inquiries', email: 'hello@shieldnet.ai', response: '2 business days' },
  { dept: 'Sales & Partnerships', email: 'sales@shieldnet.ai', response: '1 business day' },
  { dept: 'Technical Support', email: 'support@shieldnet.ai', response: 'Per SLA tier' },
  { dept: 'Government Relations', email: 'gov@shieldnet.ai', response: '1 business day' },
  { dept: 'Privacy & Data', email: 'privacy@shieldnet.ai', response: '5 business days' },
  { dept: 'Security Disclosures', email: 'security@shieldnet.ai', response: '24 hours' },
  { dept: 'Legal', email: 'legal@shieldnet.ai', response: '5 business days' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1e293b] bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-cyan-400/10 rounded-lg flex items-center justify-center border border-cyan-400/20">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-grotesk font-bold text-white text-lg">
                ShieldNet <span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              World-class cybersecurity for every tier of society. AI-powered protection that never sleeps.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-grotesk font-semibold text-white text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {['ShieldNet Personal', 'ShieldNet Business', 'ShieldNet Gov', 'Pricing'].map((item) => (
                <li key={item}>
                  <Link href="/pricing" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-grotesk font-semibold text-white text-sm mb-4">Capabilities</h4>
            <ul className="space-y-2.5">
              {[
                'AI Threat Detection',
                'Automated Response',
                'Zero-Trust Access',
                'Compliance Automation',
                'Dark Web Monitoring',
              ].map((item) => (
                <li key={item}>
                  <span className="text-slate-500 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-grotesk font-semibold text-white text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5">
              {contacts.slice(0, 5).map((c) => (
                <li key={c.email}>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-slate-500 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {c.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* All contact departments */}
        <div className="border-t border-[#1e293b] pt-8 mb-8">
          <h4 className="font-grotesk font-semibold text-white text-sm mb-4">All Departments</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {contacts.map((c) => (
              <div key={c.email} className="flex flex-col gap-0.5">
                <span className="text-slate-500 text-xs">{c.dept}</span>
                <a href={`mailto:${c.email}`} className="text-slate-400 hover:text-cyan-400 text-xs transition-colors">
                  {c.email}
                </a>
                <span className="text-slate-600 text-xs">Response: {c.response}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1e293b] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © 2026 ShieldNet AI Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
