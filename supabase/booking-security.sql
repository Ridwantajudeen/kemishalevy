-- Kemisha Levy booking security
-- Run this in the Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  service text not null,
  preferred_date date not null,
  preferred_time text not null,
  notes text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'done')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_created_at_idx
  on public.bookings (created_at desc);

create index if not exists bookings_status_idx
  on public.bookings (status);

create index if not exists bookings_preferred_date_idx
  on public.bookings (preferred_date);

grant insert on public.bookings to anon;
grant select, insert, update, delete on public.bookings to service_role;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_bookings_updated_at on public.bookings;

create trigger set_bookings_updated_at
before update on public.bookings
for each row
execute function public.set_updated_at();

alter table public.bookings enable row level security;

drop policy if exists "Allow public booking inserts" on public.bookings;
create policy "Allow public booking inserts"
on public.bookings
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admin can read bookings" on public.bookings;
create policy "Admin can read bookings"
on public.bookings
for select
to authenticated
using (auth.uid() = '67a6e8b1-a22b-43ae-982f-3412cd75be0f'::uuid);

drop policy if exists "Admin can update bookings" on public.bookings;
create policy "Admin can update bookings"
on public.bookings
for update
to authenticated
using (auth.uid() = '67a6e8b1-a22b-43ae-982f-3412cd75be0f'::uuid)
with check (auth.uid() = '67a6e8b1-a22b-43ae-982f-3412cd75be0f'::uuid);

drop policy if exists "Admin can delete bookings" on public.bookings;
create policy "Admin can delete bookings"
on public.bookings
for delete
to authenticated
using (auth.uid() = '67a6e8b1-a22b-43ae-982f-3412cd75be0f'::uuid);
