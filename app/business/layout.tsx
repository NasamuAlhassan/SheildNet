import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import BusinessSidebar from '@/components/dashboard/BusinessSidebar';

export default async function BusinessLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('users')
    .select('name, email, role')
    .eq('id', user.id)
    .single();

  if (profile && !['business_admin', 'business_member'].includes(profile.role)) redirect('/dashboard');

  const { data: business } = await supabase
    .from('businesses')
    .select('company_name')
    .eq('admin_user_id', user.id)
    .single();

  return (
    <div className="flex h-screen bg-background">
      <BusinessSidebar
        userId={user.id}
        userName={profile?.name ?? ''}
        userRole={profile?.role ?? ''}
        businessName={business?.company_name}
      />
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">{children}</main>
    </div>
  );
}
