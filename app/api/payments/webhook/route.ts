import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { verifyMoolreWebhookSignature } from '@/lib/moolre/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-moolre-signature') ?? '';

    if (!verifyMoolreWebhookSignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(body);
    const { reference, status, metadata } = payload;

    if (status !== 'completed') {
      return NextResponse.json({ received: true });
    }

    const supabase = await createServiceClient();

    // Activate subscription
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        moolre_payment_ref: reference,
        start_date: new Date().toISOString(),
        end_date: metadata?.billingCycle === 'annual'
          ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .eq('user_id', metadata?.userId)
      .eq('plan', metadata?.plan);

    if (error) {
      console.error('Subscription activation failed:', error);
      return NextResponse.json({ error: 'DB update failed' }, { status: 500 });
    }

    return NextResponse.json({ received: true, activated: true });
  } catch (err) {
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
