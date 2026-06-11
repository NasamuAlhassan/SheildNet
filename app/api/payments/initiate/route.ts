import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { initiateMoolrePayment } from '@/lib/moolre/client';
import type { SubscriptionPlan } from '@/types';

const PLAN_AMOUNTS: Record<SubscriptionPlan, number> = {
  personal_free: 0,
  personal_pro: 9.99,
  business_starter: 49,
  business_pro: 199,
  business_enterprise: 499,
  government: 0,
};

export async function POST(req: NextRequest) {
  try {
    const { plan, billingCycle } = await req.json() as { plan: SubscriptionPlan; billingCycle: 'monthly' | 'annual' };

    const supabase = await createServiceClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('phone').eq('id', user.id).single();
    if (!profile?.phone) return NextResponse.json({ error: 'Phone number required for Mobile Money payment' }, { status: 400 });

    let amount = PLAN_AMOUNTS[plan] ?? 0;
    if (billingCycle === 'annual') amount = amount * 12 * 0.8;

    const result = await initiateMoolrePayment({
      amount,
      currency: 'USD',
      phone: profile.phone,
      reference: `SNET-${user.id.slice(0, 8)}-${Date.now()}`,
      description: `ShieldNet AI — ${plan} (${billingCycle})`,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`,
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 });
  }
}
