-- Health Blueprint — phone auth support + extended signup profile fields
-- Run this in the Supabase SQL Editor AFTER schema.sql has already been applied.
-- (Project > SQL Editor > New query > paste > Run)

alter table public.profiles
  add column if not exists phone text,
  add column if not exists gender text,
  add column if not exists age integer,
  add column if not exists residence_country text,
  add column if not exists family_size integer,
  add column if not exists food_preference text;

-- Replace the signup trigger so it also captures phone-based signups (in
-- addition to email) and the extra profile fields collected on the signup
-- form. Those fields are passed through as auth options.data at signUp()
-- time, which Postgres sees here as new.raw_user_meta_data.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id, email, phone, full_name, gender, age, residence_country, family_size, food_preference
  )
  values (
    new.id,
    new.email,
    new.phone,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'gender',
    nullif(new.raw_user_meta_data ->> 'age', '')::integer,
    new.raw_user_meta_data ->> 'residence_country',
    nullif(new.raw_user_meta_data ->> 'family_size', '')::integer,
    new.raw_user_meta_data ->> 'food_preference'
  );
  return new;
end;
$$ language plpgsql security definer;
