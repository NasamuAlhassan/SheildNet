'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { ROLE_DASHBOARD } from '@/lib/utils';
import type { UserRole } from '@/types';

const accountTypes = [
  { value: 'individual', label: 'Individual', desc: 'Personal protection' },
  { value: 'business_admin', label: 'Business', desc: 'Team & company security' },
  { value: 'gov_admin', label: 'Government', desc: 'Agency-grade defense' },
] as const;

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'individual' as UserRole,
    companyName: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message ?? 'Failed to create account.');
      setLoading(false);
      return;
    }

    // Insert user profile
    const { error: profileError } = await supabase.from('users').insert({
      id: data.user.id,
      email: form.email,
      name: form.name,
      phone: form.phone,
      role: form.role,
    });

    if (profileError) {
      setError('Account created but profile setup failed. Please contact support.');
      setLoading(false);
      return;
    }

    // Create 14-day trial subscription
    await supabase.from('subscriptions').insert({
      user_id: data.user.id,
      plan: form.role === 'individual' ? 'personal_free' : form.role === 'business_admin' ? 'business_starter' : 'government',
      status: 'trial',
      billing_cycle: 'monthly',
    });

    // Create business record if needed
    if (form.role === 'business_admin' && form.companyName) {
      await supabase.from('businesses').insert({
        admin_user_id: data.user.id,
        company_name: form.companyName,
        size: 'small',
        plan: 'business_starter',
      });
    }

    const dest = ROLE_DASHBOARD[form.role] || '/dashboard';
    router.push(dest);
    router.refresh();
  }

  return (
    <>
      <h1 className="font-grotesk text-2xl font-bold text-white mb-1">Create your account</h1>
      <p className="text-slate-400 text-sm mb-6">Start your 14-day free trial. No credit card required.</p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Account type */}
        <div>
          <label className="block text-slate-400 text-xs mb-2">Account type</label>
          <div className="grid grid-cols-3 gap-2">
            {accountTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => update('role', type.value)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  form.role === type.value
                    ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-400'
                    : 'border-[#1e293b] text-slate-400 hover:border-[#334155]'
                }`}
              >
                <p className="text-xs font-semibold">{type.label}</p>
                <p className="text-xs opacity-70 mt-0.5">{type.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-slate-400 text-xs mb-1.5">Full name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Your full name"
            className="input-dark w-full px-4 py-3 rounded-xl text-sm"
          />
        </div>

        <div>
          <label className="block text-slate-400 text-xs mb-1.5">Email address</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@example.com"
            className="input-dark w-full px-4 py-3 rounded-xl text-sm"
          />
        </div>

        <div>
          <label className="block text-slate-400 text-xs mb-1.5">
            Phone number <span className="text-slate-600">(used for emergency SMS alerts)</span>
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+233 ..."
            className="input-dark w-full px-4 py-3 rounded-xl text-sm"
          />
        </div>

        {(form.role === 'business_admin' || form.role === 'gov_admin') && (
          <div>
            <label className="block text-slate-400 text-xs mb-1.5">
              {form.role === 'gov_admin' ? 'Agency name' : 'Company name'}
            </label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => update('companyName', e.target.value)}
              placeholder={form.role === 'gov_admin' ? 'Ministry of ...' : 'Your company name'}
              className="input-dark w-full px-4 py-3 rounded-xl text-sm"
            />
          </div>
        )}

        <div>
          <label className="block text-slate-400 text-xs mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              required
              minLength={8}
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              placeholder="Min. 8 characters"
              className="input-dark w-full px-4 py-3 rounded-xl text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-[#060910] font-bold py-3 rounded-xl transition-all text-sm mt-1"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>Create Account <ArrowRight className="w-4 h-4" /></>
          )}
        </button>

        <p className="text-slate-600 text-xs text-center">
          By signing up you agree to our{' '}
          <Link href="/terms" className="text-slate-400 hover:text-white">Terms of Service</Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-slate-400 hover:text-white">Privacy Policy</Link>.
        </p>
      </form>

      <p className="text-slate-500 text-sm text-center mt-5">
        Already have an account?{' '}
        <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
          Sign in
        </Link>
      </p>
    </>
  );
}
