import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

async function requireSuperadmin() {
  const supabase = await createServiceClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized', supabase: null };
  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
  if (profile?.role !== 'superadmin') return { error: 'Forbidden', supabase: null };
  return { error: null, supabase };
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, supabase } = await requireSuperadmin();
  if (error || !supabase) return NextResponse.json({ error }, { status: error === 'Unauthorized' ? 401 : 403 });

  const body = await req.json();
  const { title, description, severity, type } = body;

  const { data, error: dbErr } = await supabase
    .from('alerts')
    .update({ title, description, severity, type })
    .eq('id', params.id)
    .select()
    .single();

  if (dbErr) return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error, supabase } = await requireSuperadmin();
  if (error || !supabase) return NextResponse.json({ error }, { status: error === 'Unauthorized' ? 401 : 403 });

  const { error: dbErr } = await supabase.from('alerts').delete().eq('id', params.id);
  if (dbErr) return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  return NextResponse.json({ success: true });
}
