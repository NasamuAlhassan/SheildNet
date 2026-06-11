import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { sendMoolreSMS } from '@/lib/moolre/client';
import { buildSMSMessage } from '@/lib/utils';
import type { UserRole } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { alertId, targetTier, customMessage } = await req.json() as {
      alertId?: string;
      targetTier: UserRole | 'all';
      customMessage?: string;
    };

    const supabase = await createServiceClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { data: caller } = await supabase.from('users').select('role').eq('id', user.id).single();
    if (!['superadmin', 'gov_admin'].includes(caller?.role ?? '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Resolve target users
    let query = supabase.from('users').select('id, phone, role');
    if (targetTier !== 'all') {
      query = query.eq('role', targetTier);
    }
    const { data: targets } = await query;
    if (!targets?.length) return NextResponse.json({ sent: 0, failed: 0 });

    let alert: { title: string; severity: string } | null = null;
    if (alertId) {
      const { data } = await supabase.from('alerts').select('title, severity').eq('id', alertId).single();
      alert = data;
    }

    const message = customMessage ?? (alert ? buildSMSMessage(alert.title) : '[ShieldNet AI] Emergency broadcast from your security team.');
    const phones = targets.map((t) => t.phone).filter(Boolean) as string[];

    if (!phones.length) return NextResponse.json({ sent: 0, failed: targets.length, reason: 'No phone numbers registered' });

    const smsResult = await sendMoolreSMS({ to: phones, message });

    // Log each dispatch
    await Promise.all(
      targets.map((t) =>
        supabase.from('sms_logs').insert({
          user_id: t.id,
          alert_id: alertId ?? null,
          phone: t.phone,
          message,
          moolre_ref: smsResult.reference,
          status: smsResult.success ? 'sent' : 'failed',
        })
      )
    );

    // Create user alert records for alertId broadcasts
    if (alertId) {
      await Promise.all(
        targets.map((t) =>
          supabase.from('user_alerts').insert({
            user_id: t.id,
            alert_id: alertId,
            status: 'active',
            sms_sent: smsResult.success,
          })
        )
      );
    }

    return NextResponse.json({ sent: smsResult.delivered, failed: smsResult.failed, reference: smsResult.reference });
  } catch (err) {
    return NextResponse.json({ error: 'Broadcast failed' }, { status: 500 });
  }
}
