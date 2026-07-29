-- Health Blueprint — resume storage for agent applications
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query > Run)
-- Replaces Netlify Forms' built-in file handling, which we relied on for
-- storing/emailing resume uploads while the site was hosted on Netlify.

insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

-- Anyone can upload a resume (the Join Us form doesn't require login),
-- but only admins can read them back out.
create policy "resumes_insert_anyone" on storage.objects
  for insert
  with check (bucket_id = 'resumes');

create policy "resumes_admin_read" on storage.objects
  for select
  using (
    bucket_id = 'resumes'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

alter table public.agent_applications add column if not exists resume_path text;
