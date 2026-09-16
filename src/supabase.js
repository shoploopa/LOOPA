-- LOOPA: combined marketplace database setup
-- Run this once in Supabase SQL Editor.
-- Safe to re-run for the objects below because IF NOT EXISTS is used.

create extension if not exists pgcrypto;

-- =========================================================
-- ORDERS / ORDER ITEMS
-- =========================================================

alter table public.orders
  add column if not exists shipping_phone text,
  add column if not exists notes text;

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  seller_id uuid references auth.users(id) on delete set null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items(order_id);
create index if not exists order_items_seller_id_idx on public.order_items(seller_id);
create index if not exists order_items_product_id_idx on public.order_items(product_id);

alter table public.order_items enable row level security;

drop policy if exists "buyers can read their order items" on public.order_items;
drop policy if exists "sellers can read their order items" on public.order_items;
drop policy if exists "buyers can create their order items" on public.order_items;

create policy "buyers can read their order items"
on public.order_items for select
to authenticated
using (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id
      and o.buyer_id = auth.uid()
  )
);

create policy "sellers can read their order items"
on public.order_items for select
to authenticated
using (seller_id = auth.uid());

create policy "buyers can create their order items"
on public.order_items for insert
to authenticated
with check (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id
      and o.buyer_id = auth.uid()
  )
);

-- =========================================================
-- REVIEWS
-- =========================================================

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  buyer_id uuid not null references auth.users(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  created_at timestamptz not null default now(),
  unique(product_id, buyer_id)
);

create index if not exists reviews_product_id_idx on public.reviews(product_id);

alter table public.reviews enable row level security;

drop policy if exists "anyone can read reviews" on public.reviews;
drop policy if exists "buyers can create reviews" on public.reviews;
drop policy if exists "buyers can update own reviews" on public.reviews;
drop policy if exists "buyers can delete own reviews" on public.reviews;

create policy "anyone can read reviews"
on public.reviews for select
using (true);

create policy "buyers can create reviews"
on public.reviews for insert
to authenticated
with check (buyer_id = auth.uid());

create policy "buyers can update own reviews"
on public.reviews for update
to authenticated
using (buyer_id = auth.uid())
with check (buyer_id = auth.uid());

create policy "buyers can delete own reviews"
on public.reviews for delete
to authenticated
using (buyer_id = auth.uid());

-- =========================================================
-- CONVERSATIONS / MESSAGES
-- =========================================================

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references auth.users(id) on delete cascade,
  seller_id uuid not null references auth.users(id) on delete cascade,
  subject text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists conversations_buyer_id_idx on public.conversations(buyer_id);
create index if not exists conversations_seller_id_idx on public.conversations(seller_id);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_id_idx on public.messages(conversation_id);

alter table public.conversations enable row level security;
alter table public.messages enable row level security;

drop policy if exists "participants can read conversations" on public.conversations;
drop policy if exists "buyers can create conversations" on public.conversations;
drop policy if exists "participants can read messages" on public.messages;
drop policy if exists "participants can send messages" on public.messages;

create policy "participants can read conversations"
on public.conversations for select
to authenticated
using (buyer_id = auth.uid() or seller_id = auth.uid());

create policy "buyers can create conversations"
on public.conversations for insert
to authenticated
with check (buyer_id = auth.uid());

create policy "participants can read messages"
on public.messages for select
to authenticated
using (
  exists (
    select 1 from public.conversations c
    where c.id = messages.conversation_id
      and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())
  )
);

create policy "participants can send messages"
on public.messages for insert
to authenticated
with check (
  sender_id = auth.uid()
  and exists (
    select 1 from public.conversations c
    where c.id = messages.conversation_id
      and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())
  )
);

-- =========================================================
-- CUSTOM REQUESTS
-- =========================================================

create table if not exists public.custom_requests (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references auth.users(id) on delete cascade,
  seller_id uuid references auth.users(id) on delete set null,
  title text not null,
  description text not null,
  category text,
  budget numeric(12,2) check (budget is null or budget >= 0),
  deadline date,
  reference_url text,
  status text not null default 'open' check (status in ('open','quoted','accepted','in_progress','completed','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists custom_requests_buyer_id_idx on public.custom_requests(buyer_id);
create index if not exists custom_requests_seller_id_idx on public.custom_requests(seller_id);

alter table public.custom_requests enable row level security;

drop policy if exists "buyers can manage own custom requests" on public.custom_requests;
drop policy if exists "assigned sellers can read custom requests" on public.custom_requests;
drop policy if exists "assigned sellers can update custom requests" on public.custom_requests;

create policy "buyers can manage own custom requests"
on public.custom_requests for all
to authenticated
using (buyer_id = auth.uid())
with check (buyer_id = auth.uid());

create policy "assigned sellers can read custom requests"
on public.custom_requests for select
to authenticated
using (seller_id = auth.uid());

create policy "assigned sellers can update custom requests"
on public.custom_requests for update
to authenticated
using (seller_id = auth.uid())
with check (seller_id = auth.uid());

-- =========================================================
-- PAYMENTS
-- =========================================================

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  buyer_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(12,2) not null check (amount >= 0),
  method text not null check (method in ('M-Pesa','Cash on Delivery')),
  phone text,
  provider text,
  provider_reference text,
  status text not null default 'pending' check (status in ('pending','processing','paid','failed','refunded','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payments_buyer_id_idx on public.payments(buyer_id);
create index if not exists payments_status_idx on public.payments(status);

alter table public.payments enable row level security;

drop policy if exists "buyers can read own payments" on public.payments;
drop policy if exists "buyers can create own payments" on public.payments;
drop policy if exists "sellers can read payments for their orders" on public.payments;

create policy "buyers can read own payments"
on public.payments for select
to authenticated
using (buyer_id = auth.uid());

create policy "buyers can create own payments"
on public.payments for insert
to authenticated
with check (buyer_id = auth.uid());

create policy "sellers can read payments for their orders"
on public.payments for select
to authenticated
using (
  exists (
    select 1
    from public.order_items oi
    where oi.order_id = payments.order_id
      and oi.seller_id = auth.uid()
  )
);

-- Sellers can update order status only for orders containing their products.
drop policy if exists "sellers can update their order statuses" on public.orders;
create policy "sellers can update their order statuses"
on public.orders for update
to authenticated
using (
  exists (
    select 1 from public.order_items oi
    where oi.order_id = orders.id
      and oi.seller_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.order_items oi
    where oi.order_id = orders.id
      and oi.seller_id = auth.uid()
  )
);

-- Optional realtime support for messaging.
alter publication supabase_realtime add table public.messages;

-- =========================================================
-- IMPORTANT PAYMENT NOTE
-- =========================================================
-- This database setup records M-Pesa payments as 'pending'.
-- Actual M-Pesa STK Push/API calls MUST happen in a secure server-side
-- function/edge function with your Daraja credentials. Never put those
-- credentials in VITE_ environment variables or React/browser code.
