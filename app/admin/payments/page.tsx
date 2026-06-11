import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CreditCard } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const PLAN_PRICES: Record<string, number> = {
  personal_free: 0, personal_pro: 9.99,
  business_starter: 49, business_pro: 199,
  business_enterprise: 499, government: 0,
};

export default async function PaymentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: subs } = await supabase
    .from('subscriptions')
    .select('*, user:users(name, email)')
    .eq('status', 'active')
    .not('moolre_payment_ref', 'is', null)
    .order('start_date', { ascending: false });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-grotesk text-2xl font-bold text-white flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-cyan-400" /> Payment Logs
        </h1>
        <p className="text-slate-400 text-sm mt-1">All Moolre Mobile Money transactions</p>
      </div>

      <div className="card-glow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e293b]">
                {['User', 'Plan', 'Cycle', 'Amount', 'Moolre Ref', 'Date'].map(h => (
                  <th key={h} className="text-left text-slate-500 text-xs font-normal px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {(!subs || subs.length === 0) ? (
                <tr><td colSpan={6} className="text-center py-12 text-slate-500 text-sm">No payments yet</td></tr>
              ) : (subs ?? []).map((s) => {
                const price = PLAN_PRICES[s.plan] ?? 0;
                const amount = s.billing_cycle === 'annual' ? price * 12 * 0.8 : price;
                return (
                  <tr key={s.id} className="hover:bg-[#0d1426]/40">
                    <td className="px-5 py-3">
                      <p className="text-slate-200 text-sm">{(s.user as { name?: string })?.name}</p>
                      <p className="text-slate-500 text-xs">{(s.user as { email?: string })?.email}</p>
                    </td>
                    <td className="px-5 py-3 text-slate-300 capitalize text-xs">{s.plan?.replace(/_/g, ' ')}</td>
                    <td className="px-5 py-3 text-slate-400 text-xs capitalize">{s.billing_cycle}</td>
                    <td className="px-5 py-3 text-white font-semibold">${amount.toFixed(2)}</td>
                    <td className="px-5 py-3 font-mono text-slate-500 text-xs max-w-[140px] truncate">{s.moolre_payment_ref}</td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{formatDate(s.start_date)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
