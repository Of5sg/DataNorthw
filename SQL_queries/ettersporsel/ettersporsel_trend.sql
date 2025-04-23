-- her ser vi gjennomsnittlig etterspørsel for hvert produkt, per måned

SELECT
    EXTRACT(YEAR FROM order_date) AS year,
    product_name, 
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 1 THEN quantity END)::numeric) AS Jan_salg,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 2 THEN quantity END)::numeric) AS Feb_salg,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 3 THEN quantity END)::numeric) AS Mar_salg,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 4 THEN quantity END)::numeric) AS Apr_salg,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 5 THEN quantity END)::numeric) AS Mai_salg,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 6 THEN quantity END)::numeric) AS Jun_salg,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 7 THEN quantity END)::numeric) AS Jul_salg,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 8 THEN quantity END)::numeric) AS Aug_salg,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 9 THEN quantity END)::numeric) AS Sep_salg,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 10 THEN quantity END)::numeric) AS Okt_salg,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 11 THEN quantity END)::numeric) AS Nov_salg,
    ROUND(AVG(CASE WHEN EXTRACT(MONTH FROM order_date) = 12 THEN quantity END)::numeric) AS Des_salg
FROM orders 
JOIN order_details ON orders.order_id = order_details.order_id
JOIN products ON products.product_id = order_details.product_id
GROUP BY year, product_name
ORDER BY product_name, year;