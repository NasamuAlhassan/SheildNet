import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import GovSidebar from '@/components/dashboard/GovSidebar';

export default async function GovLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('users')
    .select('name, role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'gov_admin') redirect('/dashboard');

  return (
    <div className="flex h-screen bg-[#060910]">
      <GovSidebar userId={user.id} userName={profile?.name ?? ''} />
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">{children}</main>
    </div>
  );
}
