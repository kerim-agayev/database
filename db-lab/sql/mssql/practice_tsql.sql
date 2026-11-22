/* =====================================================================
   RestaurantPractice — synthetic SQL warm-up data for SQL Server (T-SQL)
   ---------------------------------------------------------------------
   Same 4 tables as the PostgreSQL lab schema "practice".
   How to run: open in SSMS → press F5 (Execute).
   Safe to re-run: it creates its own database RestaurantPractice and
   only drops/recreates tables INSIDE that database. Nothing else is touched.
   Data is random each run, so your numbers will differ from the Docker lab.
   Built-in traps for the exercises:
     - Branch 5 (Riverside) has no orders.
     - Orders whose id is divisible by 97 have a deliberately wrong total.
   ===================================================================== */

IF DB_ID(N'RestaurantPractice') IS NULL
    CREATE DATABASE RestaurantPractice;
GO
USE RestaurantPractice;
GO
SET NOCOUNT ON;

DROP TABLE IF EXISTS dbo.order_lines;
DROP TABLE IF EXISTS dbo.orders;
DROP TABLE IF EXISTS dbo.menu_items;
DROP TABLE IF EXISTS dbo.branches;

CREATE TABLE dbo.branches (
    id   int           PRIMARY KEY,
    name nvarchar(100) NOT NULL
);

CREATE TABLE dbo.menu_items (
    id       int           PRIMARY KEY,
    name     nvarchar(100) NOT NULL,
    category nvarchar(50)  NOT NULL,
    price    decimal(10,2) NOT NULL
);

CREATE TABLE dbo.orders (
    id         int           PRIMARY KEY,
    branch_id  int           NOT NULL REFERENCES dbo.branches(id),
    created_at datetime2(0)  NOT NULL,
    status     varchar(10)   NOT NULL,   -- 'open' | 'paid' | 'cancelled'
    total      decimal(10,2) NOT NULL
);

CREATE TABLE dbo.order_lines (
    order_id     int           NOT NULL REFERENCES dbo.orders(id),
    menu_item_id int           NOT NULL REFERENCES dbo.menu_items(id),
    qty          int           NOT NULL,
    unit_price   decimal(10,2) NOT NULL,
    PRIMARY KEY (order_id, menu_item_id)
);

INSERT INTO dbo.branches (id, name) VALUES
    (1, 'Downtown'), (2, 'Airport'), (3, 'Old Town'), (4, 'Seaside'),
    (5, 'Riverside');   -- opened recently: no orders yet

INSERT INTO dbo.menu_items (id, name, category, price) VALUES
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

-- Step 1: 5,000 order "skeletons" with their random values stored once (temp table),
-- so each random value is computed a single time per order.
DROP TABLE IF EXISTS #o;

WITH n AS (
    SELECT TOP (5000) ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS g
    FROM sys.all_objects AS a CROSS JOIN sys.all_objects AS b
)
SELECT g                                                                   AS id,
       1 + ABS(CHECKSUM(NEWID()) % 4)                                      AS branch_id,   -- branches 1–4 only
       DATEADD(SECOND, -ABS(CHECKSUM(NEWID()) % (120 * 86400)), SYSDATETIME()) AS created_at, -- last 120 days
       ABS(CHECKSUM(NEWID()) % 100)                                        AS r,           -- status dice
       1 + ABS(CHECKSUM(NEWID()) % 4)                                      AS k            -- lines per order
INTO #o
FROM n;

INSERT INTO dbo.orders (id, branch_id, created_at, status, total)
SELECT id, branch_id, created_at,
       CASE WHEN r < 85 THEN 'paid' WHEN r < 93 THEN 'cancelled' ELSE 'open' END,
       0
FROM #o;

-- Step 2: 1–4 distinct menu items per order.
INSERT INTO dbo.order_lines (order_id, menu_item_id, qty, unit_price)
SELECT o.id, m.id, 1 + ABS(CHECKSUM(NEWID()) % 3), m.price
FROM #o AS o
CROSS APPLY (
    SELECT TOP (o.k) mi.id, mi.price
    FROM dbo.menu_items AS mi
    WHERE mi.id <> -o.id          -- always true; ties the subquery to each order so it re-runs per order
    ORDER BY NEWID()
) AS m;

-- Step 3: order total = sum of its lines ...
UPDATE o
SET total = s.line_sum
FROM dbo.orders AS o
JOIN (SELECT order_id, SUM(qty * unit_price) AS line_sum
      FROM dbo.order_lines
      GROUP BY order_id) AS s
  ON s.order_id = o.id;

-- ... except a few deliberately wrong ones (practice: find them!).
UPDATE dbo.orders SET total = total + 5 WHERE id % 97 = 0;

DROP TABLE #o;

-- Done. Quick sanity check:
SELECT (SELECT COUNT(*) FROM dbo.branches)    AS branches,
       (SELECT COUNT(*) FROM dbo.menu_items)  AS menu_items,
       (SELECT COUNT(*) FROM dbo.orders)      AS orders,
       (SELECT COUNT(*) FROM dbo.order_lines) AS order_lines;
