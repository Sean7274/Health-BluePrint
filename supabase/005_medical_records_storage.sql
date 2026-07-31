-- Health Blueprint — private storage for patient-uploaded medical records
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query > Run)
-- Mirrors 003_resume_storage.sql's pattern, but for the optional "attach
-- existing medical records/reports" upload on the Plan a Trip request form.
-- Uses public.is_admin() (see 004_fix_admin_rls_recursion.sql) rather than
-- inlining the admin check, so this policy can't reintroduce that recursion.

insert into storage.buckets (id, name, public)
values ('medical-records', 'medical-records', false)
on conflict (id) do nothing;

-- Anyone can upload (the request form doesn't require login), but only
-- admins can read the files back out.
create policy "medical_records_insert_anyone" on storage.objects
  for insert
  with check (bucket_id = 'medical-records');

create policy "medical_records_admin_read" on storage.objects
  for select
  using (bucket_id = 'medical-records' and public.is_admin());

alter table public.bookings add column if not exists medical_record_path text;
