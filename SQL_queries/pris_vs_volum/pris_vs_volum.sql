-- SELECT order_date, product_id, unit_price, quantity
-- FROM order_details
-- jOin orders ON orders.order_id = order_details.order_id
-- ORDER BY product_id, order_date;

WITH Q1 AS(
    SELECT 
        EXTRACT(YEAR FROM order_date) AS year,
        EXTRACT(QUARTER FROM order_date) AS quarter,
        product_id, 
        ROUND(AVG(unit_price)::numeric, 2) AS avg_price_quarter,
        SUM(quantity) AS amount_sold
    FROM order_details
    jOIN orders ON orders.order_id = order_details.order_id
    GROUP BY product_id, year, quarter
    ORDER BY product_id, year, quarter
)
-- Q2 AS(
--     SELECT

-- ),
-- sammenlign AS(

-- )
SELECT * FROM Q1;

-- jeg har google litt rundt, men har ikke funnet en 
-- grunn til at prisene ser ut til å øke ganske drastisk 
-- i andre kvartal av 1997. det kan være mulig at dataen ikke 
-- er tatt fra virkeligheten. det virker som om 
-- inflasjonraten egentlig var relativt jevn i perioden.

-- fant en nettside som heter https://www.sql-practice.com/