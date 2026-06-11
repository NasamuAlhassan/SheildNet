import { Mail, Clock, Building2, Landmark, Shield } from 'lucide-react';

const departments = [
  { dept: 'General Inquiries', email: 'hello@shieldnet.ai', response: '2 business days', icon: Mail },
  { dept: 'Sales & Partnerships', email: 'sales@shieldnet.ai', response: '1 business day', icon: Building2 },
  { dept: 'Technical Support', email: 'support@shieldnet.ai', response: 'Per SLA tier', icon: Shield },
  { dept: 'Government Relations', email: 'gov@shieldnet.ai', response: '1 business day', icon: Landmark },
  { dept: 'Privacy & Data', email: 'privacy@shieldnet.ai', response: '5 business days', icon: Shield },
  { dept: 'Security Disclosures', email: 'security@shieldnet.ai', response: '24 hours', icon: Shield },
  { dept: 'Legal', email: 'legal@shieldnet.ai', response: '5 business days', icon: Shield },
];

export default function ContactPage() {
  return (
    <main className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1e293b] text-slate-500 text-xs mb-4">
            Get in touch
          </div>
          <h1 className="font-grotesk text-4xl md:text-5xl font-bold text-white mb-4">
            We&apos;re Here to{' '}
            <span className="text-gradient-cyber">Help</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Whether you&apos;re a business, government agency, or individual — our team is ready to assist.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* General Contact Form */}
          <div>
            <h2 className="font-grotesk text-xl font-bold text-white mb-5">General Inquiry</h2>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1.5">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1.5">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us more..."
                  className="input-dark w-full px-4 py-3 rounded-xl text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#060910] font-semibold py-3 rounded-xl transition-all text-sm"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Government Inquiry Form */}
          <div>
            <h2 className="font-grotesk text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-amber-400" />
              Government Onboarding Inquiry
            </h2>
            <div className="card-glow rounded-xl p-1 mb-1">
              <div className="bg-amber-400/5 border border-amber-400/15 rounded-xl px-4 py-2.5 mb-4">
                <p className="text-amber-400 text-xs">
                  For government agencies seeking ShieldNet Gov deployment. Our dedicated team will reach out within 1 business day.
                </p>
              </div>
            </div>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5">Agency Name</label>
                  <input
                    type="text"
                    placeholder="Ministry of ..."
                    className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5">Country</label>
                  <input
                    type="text"
                    placeholder="e.g. Ghana"
                    className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5">Contact Person</label>
                  <input
                    type="text"
                    placeholder="Full name & title"
                    className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+233 ..."
                    className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1.5">Official Email</label>
                <input
                  type="email"
                  placeholder="contact@agency.gov.gh"
                  className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs mb-1.5">Requirements & Notes</label>
                <textarea
                  rows={3}
                  placeholder="Describe your security requirements, number of users, deployment preference..."
                  className="input-dark w-full px-4 py-3 rounded-xl text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-amber-400/30 hover:border-amber-400/60 text-amber-400 hover:text-amber-300 font-semibold py-3 rounded-xl transition-all text-sm"
              >
                Submit Government Inquiry
              </button>
            </form>
          </div>
        </div>

        {/* Department Directory */}
        <div className="mt-16">
          <h2 className="font-grotesk text-xl font-bold text-white mb-6 text-center">
            Department Directory
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.email} className="card-glow rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <p className="text-slate-300 text-xs font-semibold">{d.dept}</p>
                  </div>
                  <a
                    href={`mailto:${d.email}`}
                    className="text-cyan-400 hover:text-cyan-300 text-xs transition-colors block mb-1"
                  >
                    {d.email}
                  </a>
                  <div className="flex items-center gap-1 text-slate-600 text-xs">
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
