-- Health Blueprint — fix infinite recursion in admin RLS policies
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query > Run)
--
-- The original admin policies checked "is this user an admin?" by querying
-- public.profiles from inside a policy ON public.profiles, which re-triggers
-- the same policy and recurses forever (Postgres error 42P17). This function
-- is security definer, so it bypasses RLS internally and breaks the loop.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

drop policy if exists "profiles_admin_all" on public.profiles;
create policy "profiles_admin_all" on public.profiles
  for all using (public.is_admin());

drop policy if exists "agent_apps_admin_all" on public.agent_applications;
create policy "agent_apps_admin_all" on public.agent_applications
  for all using (public.is_admin());

drop policy if exists "bookings_admin_all" on public.bookings;
create policy "bookings_admin_all" on public.bookings
  for all using (public.is_admin());
