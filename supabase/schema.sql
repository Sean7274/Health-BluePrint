-- Health Blueprint — initial schema
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query > Run)

-- ---------- profiles: one row per signed-up user (patient or agent) ----------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'patient' check (role in ('patient', 'agent', 'admin')),
  full_name text,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

-- ---------- agent_applications: public "Join as an Agent" submissions ----------
create table public.agent_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  city text,
  languages text,
  experience text,
  message text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

-- ---------- bookings: hospital / trip / food / safety consultation requests ----------
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  hospital_id text,
  specialty text,
  agent_id uuid references public.profiles(id) on delete set null,
  route_data jsonb,
  message text,
  status text not null default 'pending' check (status in ('pending', 'assigned', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- auto-create a profile row whenever someone signs up ----------
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- row level security ----------
alter table public.profiles enable row level security;
alter table public.agent_applications enable row level security;
alter table public.bookings enable row level security;

-- profiles
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles_admin_all" on public.profiles
  for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- agent_applications: anyone (incl. not-logged-in visitors) can apply
create policy "agent_apps_insert_public" on public.agent_applications
  for insert with check (true);
create policy "agent_apps_select_own" on public.agent_applications
  for select using (auth.uid() = user_id);
create policy "agent_apps_admin_all" on public.agent_applications
  for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- bookings: anyone (incl. guests) can submit a request
create policy "bookings_insert_public" on public.bookings
  for insert with check (true);
create policy "bookings_select_own" on public.bookings
  for select using (auth.uid() = user_id);
create policy "bookings_select_assigned_agent" on public.bookings
  for select using (auth.uid() = agent_id);
create policy "bookings_admin_all" on public.bookings
  for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
