import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DarkWebClient from './DarkWebClient';

export default async function DarkWebPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('users')
    .select('email')
    .eq('id', user.id)
    .single();

  return <DarkWebClient userEmail={profile?.email ?? user.email ?? ''} />;
}
