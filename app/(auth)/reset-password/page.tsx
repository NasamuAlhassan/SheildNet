'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (updateError) {
      setError(updateError.message);
    } else {
      setDone(true);
      setTimeout(() => router.push('/login'), 3000);
    }
  }

  if (done) {
    return (
      <div className="text-center">
        <div className="w-14 h-14 bg-emerald-400/10 rounded-2xl flex items-center justify-center border border-emerald-400/20 mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-emerald-400" />
        </div>
        <h1 className="font-grotesk text-2xl font-bold text-foreground mb-2">Password updated</h1>
        <p className="text-foreground-muted text-sm">Redirecting you to sign in...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-grotesk text-2xl font-bold text-foreground mb-1">Set new password</h1>
      <p className="text-foreground-muted text-sm mb-7">Choose a strong password for your account.</p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-foreground-muted text-xs mb-1.5">New password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="input-dark w-full px-4 py-3 rounded-xl text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground-secondary"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-foreground-muted text-xs mb-1.5">Confirm password</label>
          <input
            type={showPw ? 'text' : 'password'}
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat your password"
            className="input-dark w-full px-4 py-3 rounded-xl text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all text-sm"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>Update Password <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <p className="text-foreground-muted text-sm text-center mt-5">
        Remember it?{' '}
        <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
          Sign in
        </Link>
      </p>
    </>
  );
}
