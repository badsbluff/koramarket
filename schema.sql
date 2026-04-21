-- Kora E-commerce MVP Schema
-- Execute this in your Supabase SQL Editor

-- 1. Categories Table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- 2. Products Table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  images TEXT[] NOT NULL,
  material TEXT,
  tags TEXT[], -- e.g. ['Trending Now', 'New Arrival']
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Product Sizes Table
CREATE TABLE product_sizes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size_korean TEXT NOT NULL,
  size_indian TEXT NOT NULL,
  stock INTEGER DEFAULT 0 NOT NULL
);

-- 4. Orders Table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- user_id UUID REFERENCES auth.users(id), -- Uncomment if using Supabase Auth
  status TEXT DEFAULT 'pending' NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_id TEXT, -- Razorpay payment ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Order Items Table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL,
  price_at_time NUMERIC(10, 2) NOT NULL
);

-- Example Data Inserts
INSERT INTO categories (name, slug) VALUES 
('Apparel', 'apparel'),
('Jewelry', 'jewelry'),
('Accessories', 'accessories');
