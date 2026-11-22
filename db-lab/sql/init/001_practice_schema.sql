-- SQL practice dataset (synthetic). Schema "practice" is a warm-up playground.
-- It is NOT the real domain model; we design that properly on Day 8+.
-- Deterministic: setseed() makes every fresh install produce the same rows
-- (dates are relative to the moment the container was first created).

CREATE SCHEMA practice;
SET search_path = practice;

CREATE TABLE branches (
  id   int  PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE menu_items (
  id       int           PRIMARY KEY,
  name     text          NOT NULL,
  category text          NOT NULL,
  price    numeric(10,2) NOT NULL
);

CREATE TABLE orders (
  id         int           PRIMARY KEY,
  branch_id  int           NOT NULL REFERENCES branches(id),
  created_at timestamptz   NOT NULL,
  status     text          NOT NULL,   -- 'open' | 'paid' | 'cancelled'
  total      numeric(10,2) NOT NULL
);

CREATE TABLE order_lines (
  order_id     int           NOT NULL REFERENCES orders(id),
  menu_item_id int           NOT NULL REFERENCES menu_items(id),
  qty          int           NOT NULL,
  unit_price   numeric(10,2) NOT NULL,
  PRIMARY KEY (order_id, menu_item_id)
);

SELECT setseed(0.42);

INSERT INTO branches (id, name) VALUES
  (1, 'Downtown'), (2, 'Airport'), (3, 'Old Town'), (4, 'Seaside'),
  (5, 'Riverside');   -- opened recently: no orders yet

INSERT INTO menu_items (id, name, category, price) VALUES
  (1,  'Margherita Pizza', 'Pizza',   12.50), (2,  'Pepperoni Pizza', 'Pizza',   14.00),
  (3,  'Veggie Pizza',     'Pizza',   13.00), (4,  'Caesar Salad',    'Salad',    9.00),
  (5,  'Greek Salad',      'Salad',    8.50), (6,  'Lentil Soup',     'Soup',     6.00),
  (7,  'Tomato Soup',      'Soup',     5.50), (8,  'Beef Burger',     'Burger',  15.00),
  (9,  'Chicken Burger',   'Burger',  13.50), (10, 'Veggie Burger',   'Burger',  12.00),
  (11, 'Fries',            'Side',     4.00), (12, 'Onion Rings',     'Side',     4.50),
  (13, 'Cola',             'Drink',    3.00), (14, 'Lemonade',        'Drink',    3.50),
  (15, 'Ayran',            'Drink',    2.50), (16, 'Espresso',        'Coffee',   2.80),
  (17, 'Latte',            'Coffee',   4.20), (18, 'Baklava',         'Dessert',  6.50),
  (19, 'Cheesecake',       'Dessert',  7.00), (20, 'Ice Cream',       'Dessert',  5.00);

-- 5,000 orders over the last 120 days, only in branches 1–4.
INSERT INTO orders (id, branch_id, created_at, status, total)
SELECT g,
       1 + floor(random() * 4)::int,
       now() - random() * interval '120 days',
       CASE WHEN r < 0.85 THEN 'paid' WHEN r < 0.93 THEN 'cancelled' ELSE 'open' END,
       0
FROM (SELECT g, random() AS r FROM generate_series(1, 5000) AS g) s;

-- 1–4 distinct menu items per order (the LATERAL subquery references o.id, so it runs per order).
INSERT INTO order_lines (order_id, menu_item_id, qty, unit_price)
SELECT o.id, m.id, 1 + floor(random() * 3)::int, m.price
FROM orders o
CROSS JOIN LATERAL (
  SELECT id, price
  FROM menu_items
  WHERE o.id IS NOT NULL
  ORDER BY random()
  LIMIT 1 + floor(random() * 4)::int
) m;

UPDATE orders o
SET total = s.line_sum
FROM (SELECT order_id, sum(qty * unit_price) AS line_sum FROM order_lines GROUP BY order_id) s
WHERE s.order_id = o.id;

-- Deliberate data-quality bug for practice: a few totals are wrong.
UPDATE orders SET total = total + 5 WHERE id % 97 = 0;

ANALYZE;
