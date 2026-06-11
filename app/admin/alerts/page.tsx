import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminAlertsClient from './AdminAlertsClient';

export default async function AdminAlertsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [{ data: alerts }, { data: users }] = await Promise.all([
    supabase.from('alerts').select('*').order('severity').order('created_at', { ascending: false }),
    supabase.from('users').select('id, name, email, role').order('name'),
  ]);

  return <AdminAlertsClient alerts={alerts ?? []} users={users ?? []} />;
}
