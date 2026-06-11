'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });

    setLoading(false);
    if (resetError) {
      setError(resetError.message);
    } else {
      setSent(true);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-14 h-14 bg-emerald-400/10 rounded-2xl flex items-center justify-center border border-emerald-400/20 mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-emerald-400" />
        </div>
        <h1 className="font-grotesk text-2xl font-bold text-foreground mb-2">Check your inbox</h1>
        <p className="text-foreground-muted text-sm mb-6">
          We&apos;ve sent a password reset link to <strong className="font-bold">{email}</strong>.
          The link expires in 1 hour.
        </p>
        <Link href="/login" className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center justify-center gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-grotesk text-2xl font-bold text-foreground mb-1">Reset your password</h1>
      <p className="text-foreground-muted text-sm mb-7">
        Enter your email and we&apos;ll send you a secure reset link.
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-foreground-muted text-xs mb-1.5">Email address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input-dark w-full px-4 py-3 rounded-xl text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all text-sm"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
        </button>
      </form>

      <Link href="/login" className="text-foreground-muted hover:text-foreground-secondary text-sm flex items-center justify-center gap-1.5 mt-5">
        <ArrowLeft className="w-4 h-4" /> Back to sign in
      </Link>
    </>
  );
}
