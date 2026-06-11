import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ScenariosClient from './ScenariosClient';

export default async function ScenariosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: scenarios } = await supabase
    .from('alerts')
    .select('*')
    .order('severity')
    .order('type');

  return <ScenariosClient initialScenarios={scenarios ?? []} />;
}
