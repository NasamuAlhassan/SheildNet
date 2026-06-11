import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(req: NextRequest) {
  try {
    const { userAlertId, status } = await req.json() as { userAlertId: string; status: 'resolved' | 'dismissed' };

    if (!['resolved', 'dismissed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Only allow updating own alerts (or service role for admin)
    const { error } = await supabase
      .from('user_alerts')
      .update({ status })
      .eq('id', userAlertId)
      .eq('user_id', user.id);

    if (error) return NextResponse.json({ error: 'Update failed' }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
