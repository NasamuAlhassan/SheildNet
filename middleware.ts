import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { ROLE_DASHBOARD } from '@/lib/utils';
import type { UserRole } from '@/types';

const ROUTE_ROLES: Record<string, UserRole[]> = {
  '/dashboard': ['individual'],
  '/business': ['business_admin', 'business_member'],
  '/gov': ['gov_admin'],
  '/admin': ['superadmin'],
};

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Always refresh the session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Helper: safely fetch role from DB (returns undefined on any error)
  async function getRole(): Promise<UserRole | undefined> {
    if (!user) return undefined;
    try {
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      return data?.role as UserRole | undefined;
    } catch {
      return undefined;
    }
  }

  // ── Protected routes ───────────────────────────────────────────────────
  const protectedPrefix = Object.keys(ROUTE_ROLES).find((prefix) =>
    pathname.startsWith(prefix)
  );

  if (protectedPrefix) {
    // Not logged in → go to login
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }

    const role = await getRole();
    const allowedRoles = ROUTE_ROLES[protectedPrefix];

    // Role found and allowed → continue
    if (role && allowedRoles.includes(role)) {
      return supabaseResponse;
    }

    // Role found but wrong tier → send to their actual dashboard
    if (role && ROLE_DASHBOARD[role]) {
      const url = request.nextUrl.clone();
      url.pathname = ROLE_DASHBOARD[role];
      return NextResponse.redirect(url);
    }

    // No profile yet (schema not run, or creation failed) → let the page
    // handle it rather than creating a redirect loop
    return supabaseResponse;
  }

  // ── Auth pages: redirect logged-in users with a valid profile ──────────
  if (user && (pathname === '/login' || pathname === '/signup')) {
    const role = await getRole();

    // Only redirect if we actually found a valid role — prevents the loop
    // when a user has an auth session but no users-table row yet
    if (role && ROLE_DASHBOARD[role]) {
      const url = request.nextUrl.clone();
      url.pathname = ROLE_DASHBOARD[role];
      return NextResponse.redirect(url);
    }

    // No profile → stay on auth page so they can complete sign-up
    return supabaseResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
