import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import PersonalSidebar from '@/components/dashboard/PersonalSidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('users')
    .select('name, email')
    .eq('id', user.id)
    .single();

  return (
    <div className="flex h-screen bg-[#060910]">
      <PersonalSidebar
        userId={user.id}
        userName={profile?.name ?? ''}
        userEmail={profile?.email ?? ''}
      />
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">{children}</main>
    </div>
  );
}
