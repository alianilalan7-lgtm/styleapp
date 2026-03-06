-- Style Engine catalog lifecycle schema (approved/candidate/deprecated)

create extension if not exists pgcrypto;

create table if not exists public.catalog_items (
  id text primary key,
  fingerprint text not null unique,
  hash text not null,
  status text not null check (status in ('approved', 'candidate', 'deprecated')),
  source text not null,
  library_name text not null,
  component_name text not null,
  category text not null,
  tags text[] not null default '{}',
  use_cases text[] not null default '{}',
  industry_fit text[] not null default '{}',
  page_type_fit text[] not null default '{}',
  vertical_fit text[] not null default '{}',
  conversion_fit text[] not null default '{}',
  style_pack_fit text[] not null default '{}',
  framework text not null,
  complexity text not null check (complexity in ('low', 'medium', 'high')),
  accessibility_level text not null check (accessibility_level in ('good', 'strong')),
  url text not null,
  preview_image text,
  last_indexed_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  quality_score integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.catalog_reviews (
  id text primary key,
  item_id text not null references public.catalog_items(id) on delete cascade,
  action text not null check (action in ('approve', 'deprecate', 'reject')),
  notes text not null default '',
  reviewer text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.catalog_sync_runs (
  id text primary key,
  source text not null,
  started_at timestamptz not null,
  finished_at timestamptz not null,
  inserted integer not null default 0,
  updated integer not null default 0,
  deprecated integer not null default 0,
  notes text not null default ''
);

create or replace view public.catalog_approved as
select * from public.catalog_items where status = 'approved';

create or replace view public.catalog_candidates as
select * from public.catalog_items where status = 'candidate';

create or replace view public.catalog_deprecated as
select * from public.catalog_items where status = 'deprecated';

create or replace function public.catalog_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_catalog_items_updated_at on public.catalog_items;
create trigger trg_catalog_items_updated_at
before update on public.catalog_items
for each row
execute function public.catalog_set_updated_at();
