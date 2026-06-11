'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { ROLE_DASHBOARD } from '@/lib/utils';
import type { UserRole } from '@/types';

const ACCOUNT_TYPES = [
  { value: 'individual',    label: 'Individual', desc: 'Personal protection' },
  { value: 'business_admin',label: 'Business',   desc: 'Team & company security' },
  { value: 'gov_admin',     label: 'Government', desc: 'Agency-grade defense' },
] as const;

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'individual' as UserRole, companyName: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setLoading(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({ email: form.email, password: form.password });
    if (signUpError || !data.user) { setError(signUpError?.message ?? 'Failed to create account.'); setLoading(false); return; }
    await supabase.from('users').insert({ id: data.user.id, email: form.email, name: form.name, phone: form.phone, role: form.role });
    await supabase.from('subscriptions').insert({ user_id: data.user.id, plan: form.role === 'individual' ? 'personal_free' : form.role === 'business_admin' ? 'business_starter' : 'government', status: 'trial', billing_cycle: 'monthly' });
    if (form.role === 'business_admin' && form.companyName) {
      await supabase.from('businesses').insert({ admin_user_id: data.user.id, company_name: form.companyName, size: 'small', plan: 'business_starter' });
    }
    router.push(ROLE_DASHBOARD[form.role] || '/dashboard');
    router.refresh();
  }

  return (
    <>
      <h1 className="font-grotesk text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>Create your account</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Start your 14-day free trial. No credit card required.</p>

      {error && (
        <div className="px-4 py-3 rounded-xl mb-5 text-sm border"
          style={{ background: 'var(--danger-subtle)', color: 'var(--danger)', borderColor: 'color-mix(in srgb, var(--danger) 20%, transparent)' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Account type */}
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Account type</label>
          <div className="grid grid-cols-3 gap-2">
            {ACCOUNT_TYPES.map(type => (
              <button key={type.value} type="button" onClick={() => update('role', type.value)}
                className="p-3 rounded-xl border text-left transition-all"
                style={form.role === type.value
                  ? { background: 'var(--primary-subtle)', borderColor: 'color-mix(in srgb, var(--primary) 40%, transparent)', color: 'var(--primary)' }
                  : { background: 'var(--card-alt)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                <p className="text-xs font-semibold">{type.label}</p>
                <p className="text-xs opacity-70 mt-0.5">{type.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {[
          { label: 'Full name', field: 'name', type: 'text', placeholder: 'Your full name' },
          { label: 'Email address', field: 'email', type: 'email', placeholder: 'you@example.com' },
        ].map(({ label, field, type, placeholder }) => (
          <div key={field}>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>{label}</label>
            <input type={type} required value={(form as Record<string, string>)[field]}
              onChange={e => update(field, e.target.value)} placeholder={placeholder}
              className="input-base w-full px-4 py-3 rounded-xl text-sm" />
          </div>
        ))}

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Phone number <span style={{ color: 'var(--text-muted)' }}>(used for emergency SMS alerts)</span>
          </label>
          <input type="tel" required value={form.phone} onChange={e => update('phone', e.target.value)}
            placeholder="+233 ..." className="input-base w-full px-4 py-3 rounded-xl text-sm" />
        </div>

        {(form.role === 'business_admin' || form.role === 'gov_admin') && (
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              {form.role === 'gov_admin' ? 'Agency name' : 'Company name'}
            </label>
            <input type="text" value={form.companyName} onChange={e => update('companyName', e.target.value)}
              placeholder={form.role === 'gov_admin' ? 'Ministry of ...' : 'Your company name'}
              className="input-base w-full px-4 py-3 rounded-xl text-sm" />
          </div>
        )}

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Password</label>
          <div className="relative">
            <input type={showPw ? 'text' : 'password'} required minLength={8} value={form.password}
              onChange={e => update('password', e.target.value)} placeholder="Min. 8 characters"
              className="input-base w-full px-4 py-3 rounded-xl text-sm pr-10" />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="btn-primary w-full py-3 rounded-xl text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
        </button>

        <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
          By signing up you agree to our{' '}
          <Link href="/terms" className="transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>Terms</Link>{' '}
          and{' '}
          <Link href="/privacy" className="transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</Link>.
        </p>
      </form>

      <p className="text-sm text-center mt-5" style={{ color: 'var(--text-secondary)' }}>
        Already have an account?{' '}
        <Link href="/login" className="font-semibold transition-colors hover:opacity-80" style={{ color: 'var(--primary)' }}>Sign in</Link>
      </p>
    </>
  );
}
