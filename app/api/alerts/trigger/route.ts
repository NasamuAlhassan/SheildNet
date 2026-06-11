import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { sendMoolreSMS } from '@/lib/moolre/client';
import { buildSMSMessage } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { alertId, targetUserId } = await req.json();
    const supabase = await createServiceClient();

    // Verify caller is admin or service
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { data: caller } = await supabase.from('users').select('role').eq('id', user.id).single();
    if (!['superadmin', 'business_admin', 'gov_admin'].includes(caller?.role ?? '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get alert details
    const { data: alert } = await supabase.from('alerts').select('*').eq('id', alertId).single();
    if (!alert) return NextResponse.json({ error: 'Alert not found' }, { status: 404 });

    // Get target user
    const { data: target } = await supabase.from('users').select('id, phone').eq('id', targetUserId).single();
    if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Create user alert record
    const { data: userAlert } = await supabase.from('user_alerts').insert({
      user_id: target.id,
      alert_id: alertId,
      status: 'active',
      sms_sent: false,
    }).select().single();

    // Send SMS for critical alerts
    let smsRef: string | null = null;
    if (alert.severity === 'critical' && target.phone) {
      const message = buildSMSMessage(alert.title);
      const smsResult = await sendMoolreSMS({ to: target.phone, message });

      smsRef = smsResult.reference;

      // Log SMS dispatch
      await supabase.from('sms_logs').insert({
        user_id: target.id,
        alert_id: alertId,
        phone: target.phone,
        message,
        moolre_ref: smsRef,
        status: smsResult.success ? 'sent' : 'failed',
      });

      // Update user_alert with SMS status
      await supabase.from('user_alerts').update({
        sms_sent: smsResult.success,
        sms_delivered: false,
      }).eq('id', userAlert?.id);
    }

    return NextResponse.json({ success: true, userAlertId: userAlert?.id, smsSent: !!smsRef, smsRef });
  } catch (err) {
    return NextResponse.json({ error: 'Alert trigger failed' }, { status: 500 });
  }
}
