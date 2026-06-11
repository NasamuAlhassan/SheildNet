'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { ROLE_DASHBOARD } from '@/lib/utils';
import type { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) { setError(authError.message); setLoading(false); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
    const role = profile?.role as UserRole | undefined;
    router.push(role ? ROLE_DASHBOARD[role] : '/dashboard');
    router.refresh();
  }

  return (
    <>
      <h1 className="font-grotesk text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>Welcome back</h1>
      <p className="text-sm mb-7" style={{ color: 'var(--text-secondary)' }}>Sign in to your ShieldNet AI account</p>

      {error && (
        <div className="px-4 py-3 rounded-xl mb-5 text-sm border"
          style={{ background: 'var(--danger-subtle)', color: 'var(--danger)', borderColor: 'color-mix(in srgb, var(--danger) 20%, transparent)' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs mb-1.5 font-medium" style={{ color: 'var(--text-secondary)' }}>Email address</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input-base w-full px-4 py-3 rounded-xl text-sm" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Password</label>
            <Link href="/forgot-password" className="text-xs font-medium transition-colors hover:opacity-80" style={{ color: 'var(--primary)' }}>
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input type={showPw ? 'text' : 'password'} required value={password}
              onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              className="input-base w-full px-4 py-3 rounded-xl text-sm pr-10" />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: 'var(--text-muted)' }}>
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="btn-primary w-full py-3 rounded-xl text-sm font-bold mt-1 disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>

      <p className="text-sm text-center mt-6" style={{ color: 'var(--text-secondary)' }}>
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-semibold transition-colors hover:opacity-80" style={{ color: 'var(--primary)' }}>Sign up</Link>
      </p>
    </>
  );
}
