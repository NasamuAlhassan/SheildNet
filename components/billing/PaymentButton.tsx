'use client';

import { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import type { SubscriptionPlan } from '@/types';

interface Props {
  plan: SubscriptionPlan;
  billingCycle: 'monthly' | 'annual';
  label?: string;
  className?: string;
}

type Step = 'idle' | 'loading' | 'pending' | 'success' | 'error';

export default function PaymentButton({ plan, billingCycle, label = 'Upgrade Now', className = '' }: Props) {
  const [step, setStep] = useState<Step>('idle');
  const [ref, setRef] = useState('');
  const [error, setError] = useState('');

  async function handlePay() {
    setStep('loading');
    setError('');

    try {
      const res = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, billingCycle }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Payment initiation failed');

      setRef(data.reference);
      setStep('pending');

      // Poll for activation (max 5 min)
      let attempts = 0;
      const poll = setInterval(async () => {
        attempts++;
        const status = await fetch('/api/subscriptions/status');
        const sub = await status.json();
        if (sub.status === 'active') {
          clearInterval(poll);
          setStep('success');
          setTimeout(() => window.location.reload(), 1500);
        }
        if (attempts > 60) {
          clearInterval(poll);
          setStep('pending'); // Keep showing pending - webhook may still arrive
        }
      }, 5000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStep('error');
    }
  }

  if (step === 'success') {
    return (
      <div className="flex items-center gap-2 text-emerald-400 text-sm">
        <CheckCircle className="w-4 h-4" /> Subscription activated!
      </div>
    );
  }

  if (step === 'pending') {
    return (
      <div className="space-y-2">
        <div className="bg-cyan-400/5 border border-cyan-400/20 rounded-xl p-4">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-1">
            <Phone className="w-4 h-4" /> Mobile Money Request Sent
          </div>
          <p className="text-slate-400 text-xs">
            A Mobile Money payment prompt has been sent to your registered phone number.
            Approve it to activate your subscription.
          </p>
          {ref && (
            <p className="text-slate-500 text-xs mt-1">Ref: <span className="font-mono text-slate-400">{ref}</span></p>
          )}
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Loader2 className="w-3 h-3 animate-spin" /> Waiting for payment confirmation...
        </div>
      </div>
    );
  }

  if (step === 'error') {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
        <button
          onClick={() => setStep('idle')}
          className="text-cyan-400 hover:text-cyan-300 text-xs underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handlePay}
      disabled={step === 'loading'}
      className={`flex items-center justify-center gap-2 font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {step === 'loading' ? (
        <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
      ) : (
        label
      )}
    </button>
  );
}
