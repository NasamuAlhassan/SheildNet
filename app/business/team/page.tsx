import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Users, UserPlus, Trash2, Shield } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default async function TeamPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: business } = await supabase.from('businesses').select('id, company_name, plan').eq('admin_user_id', user.id).single();

  const { data: members } = await supabase
    .from('business_members')
    .select('*, user:users(name, email, created_at)')
    .eq('business_id', business?.id ?? '');

  const { data: caller } = await supabase.from('users').select('role').eq('id', user.id).single();
  const isAdmin = caller?.role === 'business_admin';

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-grotesk text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" /> Team Management
          </h1>
          <p className="text-foreground-muted text-sm mt-1">{business?.company_name} &bull; {(members?.length ?? 0) + 1} members</p>
        </div>
        {isAdmin && (
          <button className="flex items-center gap-2 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
            <UserPlus className="w-4 h-4" /> Invite Member
          </button>
        )}
      </div>

      <div className="card-glow rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {['Member', 'Role', 'Joined', isAdmin ? 'Actions' : ''].map((h) => h && (
                <th key={h} className="text-left text-foreground-muted text-xs font-normal px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {/* Admin (current user) */}
            <tr>
              <td className="px-5 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-blue-400/20 rounded-full flex items-center justify-center text-blue-400 text-xs font-bold">You</div>
                  <div>
                    <p className="text-foreground text-sm">Account Owner</p>
                    <p className="text-foreground-muted text-xs">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20 flex items-center gap-1 w-fit">
                  <Shield className="w-3 h-3" /> Admin
                </span>
              </td>
              <td className="px-5 py-3 text-foreground-muted text-xs">—</td>
              {isAdmin && <td className="px-5 py-3" />}
            </tr>

            {(members ?? []).map((m) => (
              <tr key={m.user_id}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center text-foreground-secondary text-xs font-bold">
                      {(m.user as { name?: string })?.name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div>
                      <p className="text-foreground text-sm">{(m.user as { name?: string })?.name}</p>
                      <p className="text-foreground-muted text-xs">{(m.user as { email?: string })?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-background-alt text-foreground-secondary capitalize">{m.role}</span>
                </td>
                <td className="px-5 py-3 text-foreground-muted text-xs">
                  {(m.user as { created_at?: string })?.created_at ? formatDate((m.user as { created_at: string }).created_at) : '—'}
                </td>
                {isAdmin && (
                  <td className="px-5 py-3">
                    <button className="text-foreground-muted hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
