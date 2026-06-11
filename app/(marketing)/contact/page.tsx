import { Mail, Clock, Building2, Landmark, Shield } from 'lucide-react';

const departments = [
  { dept: 'General Inquiries',    email: 'hello@shieldnet.ai',    response: '2 business days', icon: Mail },
  { dept: 'Sales & Partnerships', email: 'sales@shieldnet.ai',    response: '1 business day',  icon: Building2 },
  { dept: 'Technical Support',    email: 'support@shieldnet.ai',  response: 'Per SLA tier',    icon: Shield },
  { dept: 'Government Relations', email: 'gov@shieldnet.ai',      response: '1 business day',  icon: Landmark },
  { dept: 'Privacy & Data',       email: 'privacy@shieldnet.ai',  response: '5 business days', icon: Shield },
  { dept: 'Security Disclosures', email: 'security@shieldnet.ai', response: '24 hours',        icon: Shield },
  { dept: 'Legal',                email: 'legal@shieldnet.ai',    response: '5 business days', icon: Shield },
];

export default function ContactPage() {
  return (
    <main className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header — left-aligned, no pill badge */}
        <div className="mb-14 max-w-2xl">
          <span className="label mb-4" style={{ color: 'var(--text-muted)' }}>Contact</span>
          <h1 className="font-grotesk text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            We&apos;re here to help.
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Whether you&apos;re a business, government agency, or individual —
            our team is ready to assist.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* General Contact Form */}
          <div>
            <h2 className="font-grotesk text-xl font-bold mb-5" style={{ color: 'var(--text)' }}>
              General Inquiry
            </h2>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="input-base w-full px-4 py-3 text-sm"
                    style={{ borderRadius: 'var(--radius)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="input-base w-full px-4 py-3 text-sm"
                    style={{ borderRadius: 'var(--radius)' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="input-base w-full px-4 py-3 text-sm"
                  style={{ borderRadius: 'var(--radius)' }}
                />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us more..."
                  className="input-base w-full px-4 py-3 text-sm resize-none"
                  style={{ borderRadius: 'var(--radius)' }}
                />
              </div>
              <button type="submit" className="btn-primary w-full py-3 text-sm font-semibold"
                style={{ borderRadius: 'var(--radius)' }}>
                Send Message
              </button>
            </form>
          </div>

          {/* Government Inquiry Form */}
          <div>
            <h2 className="font-grotesk text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text)' }}>
              <Landmark className="w-5 h-5" style={{ color: 'var(--warning)' }} />
              Government Onboarding Inquiry
            </h2>
            <div className="mb-4 rounded-[var(--radius)] px-4 py-2.5 border"
              style={{ background: 'var(--warning-subtle)', borderColor: 'color-mix(in srgb, var(--warning) 20%, transparent)' }}>
              <p className="text-xs" style={{ color: 'var(--warning-text)' }}>
                For government agencies seeking ShieldNet Gov deployment. Our dedicated team
                will reach out within 1 business day.
              </p>
            </div>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Agency Name</label>
                  <input
                    type="text"
                    placeholder="Ministry of ..."
                    className="input-base w-full px-4 py-3 text-sm"
                    style={{ borderRadius: 'var(--radius)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Country</label>
                  <input
                    type="text"
                    placeholder="e.g. Ghana"
                    className="input-base w-full px-4 py-3 text-sm"
                    style={{ borderRadius: 'var(--radius)' }}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Contact Person</label>
                  <input
                    type="text"
                    placeholder="Full name & title"
                    className="input-base w-full px-4 py-3 text-sm"
                    style={{ borderRadius: 'var(--radius)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+233 ..."
                    className="input-base w-full px-4 py-3 text-sm"
                    style={{ borderRadius: 'var(--radius)' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Official Email</label>
                <input
                  type="email"
                  placeholder="contact@agency.gov.gh"
                  className="input-base w-full px-4 py-3 text-sm"
                  style={{ borderRadius: 'var(--radius)' }}
                />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>Requirements & Notes</label>
                <textarea
                  rows={3}
                  placeholder="Describe your security requirements, number of users, deployment preference..."
                  className="input-base w-full px-4 py-3 text-sm resize-none"
                  style={{ borderRadius: 'var(--radius)' }}
                />
              </div>
              <button type="submit"
                className="btn-secondary w-full py-3 text-sm font-semibold"
                style={{ borderRadius: 'var(--radius)', borderColor: 'color-mix(in srgb, var(--warning) 30%, transparent)', color: 'var(--warning)' }}>
                Submit Government Inquiry
              </button>
            </form>
          </div>
        </div>

        {/* Department Directory */}
        <div className="mt-16">
          <h2 className="font-grotesk text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            Department Directory
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.email} className="card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                      style={{
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--primary-subtle)',
                        border: '1px solid color-mix(in srgb, var(--primary) 20%, transparent)',
                      }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                    </div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{d.dept}</p>
                  </div>
                  <a href={`mailto:${d.email}`}
                    className="text-xs block mb-1 transition-opacity hover:opacity-70"
                    style={{ color: 'var(--primary)' }}>
                    {d.email}
                  </a>
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <Clock className="w-3 h-3" />
                    {d.response}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
