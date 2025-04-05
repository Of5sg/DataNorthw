
WITH Q1 AS (
    SELECT
        EXTRACT(YEAR FROM order_date) AS year,
        EXTRACT(QUARTER FROM order_date) AS quarter,
        ROUND(AVG(quantity)::numeric, 2) AS Avg_quantity,
        MAX(quantity) AS Max_quantity, MIN(quantity) AS Min_quantity,
        ROW_NUMBER() OVER () AS seq
    FROM orders
    JOIN order_details ON orders.order_id = order_details.order_id
    GROUP BY year, quarter
    ORDER BY year, quarter
),
Q2 AS (
    SELECT
        EXTRACT(YEAR FROM order_date) AS year,
        EXTRACT(MONTH FROM order_date) AS month,
        ROUND(AVG(quantity)::numeric, 2) AS Avg_quantity,
        MAX(quantity) AS Max_quantity, MIN(quantity) AS Min_quantity,
        ROW_NUMBER() OVER () AS seq
    FROM orders
    JOIN order_details ON orders.order_id = order_details.order_id
    GROUP BY year, month
    ORDER BY year, month
),
combined AS (
    SELECT
        Q1.year,
        Q1.quarter,
        NULL AS month,
        Q1.avg_quantity,
        Q1.max_quantity,
        Q1.min_quantity
    FROM Q1
    UNION ALL
    SELECT
        Q2.year,
        NULL AS quarter,
        Q2.month,
        Q2.avg_quantity,
        Q2.max_quantity,
        Q2.min_quantity
    FROM Q2
)
SELECT *
FROM combined
ORDER BY year, quarter, month;



-- dette er så nære jeg har klart å komme.



-- bruke 2 separate queries og joine etter
--https://www.postgresql.org/docs/current/queries-union.html


--kanskje:
-- WITH Query AS(
--     SELECT 
--         order_date,
--         quantity,
--         EXTRACT(YEAR from order_date) AS year,
--         EXTRACT(QUARTER FROM order_date) AS quarter,
--         ROUND(AVG(quantity)::numeric, 2),
--         MAX(quantity) AS max_quantity,
--         MIN(quantity) AS min_quantity
--     FROM orders
--     JOIN order_details ON orders.order_id = order_details.order_id
--     GROUP BY year, quarter, order_date, quantity
--     ORDER BY year, quarter
-- ),
-- Result AS(
--     SELECT
--         year,
--         quarter,
--         EXTRACT(MONTH FROM order_date) AS month,
--         ROUND(AVG(quantity)::numeric, 2),
--         MAX(quantity) AS max_quantity,
--         MIN(quantity) AS min_quantity
--     FROM Query
--     GROUP BY Year, quarter, month
--     ORDER BY Year, quarter, month
-- )
-- SELECT * FROM Result;
