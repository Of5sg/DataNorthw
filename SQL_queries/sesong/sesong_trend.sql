
--her ser vi gjennomsnitt av antall solgte varer per kvartal, og per måned

-- WITH Q1 AS (
--     SELECT
--         EXTRACT(YEAR FROM order_date) AS year,
--         EXTRACT(QUARTER FROM order_date) AS quarter,
--         ROUND(AVG(quantity)::numeric, 2) AS Avg_quantity,
--         MAX(quantity) AS Max_quantity, MIN(quantity) AS Min_quantity,
--         ROW_NUMBER() OVER () AS seq
--     FROM orders
--     JOIN order_details ON orders.order_id = order_details.order_id
--     GROUP BY year, quarter
--     ORDER BY year, quarter
-- ),
-- Q2 AS (
--     SELECT
--         EXTRACT(YEAR FROM order_date) AS year,
--         EXTRACT(MONTH FROM order_date) AS month,
--         ROUND(AVG(quantity)::numeric, 2) AS Avg_quantity,
--         MAX(quantity) AS Max_quantity, MIN(quantity) AS Min_quantity,
--         ROW_NUMBER() OVER () AS seq
--     FROM orders
--     JOIN order_details ON orders.order_id = order_details.order_id
--     GROUP BY year, month
--     ORDER BY year, month
-- ),
-- combined AS (
--     SELECT
--         Q1.year,
--         Q1.quarter,
--         NULL AS month,
--         Q1.avg_quantity,
--         Q1.max_quantity,
--         Q1.min_quantity
--     FROM Q1
--     UNION ALL
--     SELECT
--         Q2.year,
--         NULL AS quarter,
--         Q2.month,
--         Q2.avg_quantity,
--         Q2.max_quantity,
--         Q2.min_quantity
--     FROM Q2
-- )
-- SELECT *
-- FROM combined
-- ORDER BY year, quarter, month;

SELECT
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(QUARTER FROM order_date) AS quarter,
    ROUND(AVG(quantity)::numeric, 2) AS avg_sales,
    MAX(quantity) AS max_quantity,
    MIN(quantity) AS min_quantity,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 1 THEN quantity END)::numeric, 2) AS jan,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 2 THEN quantity END)::numeric, 2) AS feb,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 3 THEN quantity END)::numeric, 2) AS mar,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 4 THEN quantity END)::numeric, 2) AS apr,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 5 THEN quantity END)::numeric, 2) AS mai,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 6 THEN quantity END)::numeric, 2) AS jun,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 7 THEN quantity END)::numeric, 2) AS jul,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 8 THEN quantity END)::numeric, 2) AS aug,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 9 THEN quantity END)::numeric, 2) AS sep,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 10 THEN quantity END)::numeric, 2) AS okt,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 11 THEN quantity END)::numeric, 2) AS nov,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 12 THEN quantity END)::numeric, 2) AS des
FROM orders
JOIN order_details ON orders.order_id = order_details.order_id
WHERE (EXTRACT(YEAR FROM order_date) = $1 OR $1 IS NULL)
GROUP BY year, quarter
ORDER BY year, quarter;