-- Run this whole file once in Supabase > SQL Editor
create table services (id uuid primary key default gen_random_uuid(), name text not null, description text, note text,
  price_cents int not null, price_from boolean default false, deposit_percent int default 50, duration_min int default 60,
  category text default 'Makeup', sort int default 0, active boolean default true);
create table products (id uuid primary key default gen_random_uuid(), name text not null, description text, image_url text,
  closure text, length_in int, price_cents int not null, stock int default 0, active boolean default true);
create table bookings (id uuid primary key default gen_random_uuid(), service_id uuid references services(id),
  customer_name text, customer_email text, customer_phone text, booking_date date not null, booking_time text not null,
  amount_cents int not null, status text default 'pending', reference text unique, created_at timestamptz default now());
create unique index one_slot on bookings (booking_date, booking_time) where status in ('pending','confirmed');
create table orders (id uuid primary key default gen_random_uuid(), customer_name text, customer_email text,
  customer_phone text, delivery_address text, items jsonb not null, total_cents int not null,
  status text default 'pending', reference text unique, created_at timestamptz default now());
alter table services enable row level security; alter table products enable row level security;
alter table bookings enable row level security; alter table orders enable row level security;
create policy "public read services" on services for select using (active);
create policy "public read products" on products for select using (active);

-- Real prices (1 March 2026 pricelist). Amounts are in cents: R700 = 70000.
insert into services (name, price_cents, price_from, category, sort) values
 ('Soft glam', 70000, false, 'Makeup', 0),
 ('Full glam', 80000, false, 'Makeup', 1),
 ('Bridal trial', 100000, false, 'Bridal', 2),
 ('Bridal', 150000, false, 'Bridal', 3),
 ('Bridesmaids (each)', 80000, false, 'Bridal', 4),
 ('Bridal half day (bride only)', 300000, false, 'Bridal', 5),
 ('Bridal full day (bride only)', 500000, false, 'Bridal', 6),
 ('Installation', 40000, false, 'Hair', 7),
 ('Styling', 20000, true, 'Hair', 8),
 ('Wash', 25000, true, 'Hair', 9),
 ('Treatment', 30000, false, 'Hair', 10),
 ('Customisation', 35000, false, 'Hair', 11),
 ('Wig construction', 50000, false, 'Hair', 12),
 ('Closure replacement', 20000, false, 'Hair', 13),
 ('Dye', 40000, true, 'Hair', 14);
insert into services (name, description, note, price_cents, category, sort) values
 ('Matric Bronze', 'Full glam|Basic installation', 'No styling. Wig must be customised.', 110000, 'Matric dance', 100),
 ('Matric Silver', 'Full glam|Installation|Curls or half up, half down', 'Wig must be customised.', 140000, 'Matric dance', 101),
 ('Matric Gold', 'Full glam|Installation|Up-do style|20 inch customised wig', 'Includes customisation.', 400000, 'Matric dance', 102),
 ('Matric Platinum', 'Full glam|Installation|Bridal style|24 inch customised wig', 'Includes customisation.', 510000, 'Matric dance', 103);

-- Glueless bob wigs. stock = how many you can take pre-orders for.
insert into products (name, description, closure, length_in, price_cents, stock) values
 ('Glueless bob straight, 2x6 closure, 8 inch', 'Pre-order only. Customised.', '2x6', 8, 140000, 20),
 ('Glueless bob straight, 2x6 closure, 10 inch', 'Pre-order only. Customised.', '2x6', 10, 155000, 20),
 ('Glueless bob straight, 4x4 closure, 8 inch', 'Pre-order only. Customised.', '4x4', 8, 150000, 20),
 ('Glueless bob straight, 4x4 closure, 10 inch', 'Pre-order only. Customised.', '4x4', 10, 165000, 20),
 ('Glueless bob straight, 5x5 closure, 8 inch', 'Pre-order only. Customised.', '5x5', 8, 170000, 20),
 ('Glueless bob straight, 5x5 closure, 10 inch', 'Pre-order only. Customised.', '5x5', 10, 180000, 20),
 ('Glueless bob straight, 9x6 closure, 8 inch', 'Pre-order only. Customised.', '9x6', 8, 190000, 20),
 ('Glueless bob straight, 9x6 closure, 10 inch', 'Pre-order only. Customised.', '9x6', 10, 210000, 20),
 ('Glueless bob straight, HD 5x5 closure, 10 inch', 'Pre-order only. Customised.', 'HD 5x5', 10, 230000, 20),
 ('Glueless bob straight, HD 6x6 closure, 10 inch', 'Pre-order only. Customised.', 'HD 6x6', 10, 250000, 20);
