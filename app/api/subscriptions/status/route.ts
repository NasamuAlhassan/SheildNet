import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getDaysRemaining } from '@/lib/utils';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error || !subscription) {
    return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
  }

  return NextResponse.json({
    ...subscription,
    trialDaysRemaining: getDaysRemaining(subscription.trial_end_date),
  });
}
