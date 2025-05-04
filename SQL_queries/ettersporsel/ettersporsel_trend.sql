-- her ser vi gjennomsnittlig etterspørsel for hvert produkt, per måned

SELECT
    EXTRACT(YEAR FROM order_date) AS year,
    product_name, 
    ROUND(AVG(quantity) FILTER (WHERE EXTRACT(Month FROM order_date) = 1)) AS Jan,
    ROUND(AVG(quantity) FILTER (WHERE EXTRACT(Month FROM order_date) = 2)) AS Feb,
    ROUND(AVG(quantity) FILTER (WHERE EXTRACT(Month FROM order_date) = 3)) AS Mar,
    ROUND(AVG(quantity) FILTER (WHERE EXTRACT(Month FROM order_date) = 4)) AS Apr,
    ROUND(AVG(quantity) FILTER (WHERE EXTRACT(Month FROM order_date) = 5)) AS Mai,
    ROUND(AVG(quantity) FILTER (WHERE EXTRACT(Month FROM order_date) = 6)) AS Jun,
    ROUND(AVG(quantity) FILTER (WHERE EXTRACT(Month FROM order_date) = 7)) AS Jul,
    ROUND(AVG(quantity) FILTER (WHERE EXTRACT(Month FROM order_date) = 8)) AS Aug,
    ROUND(AVG(quantity) FILTER (WHERE EXTRACT(Month FROM order_date) = 9)) AS Sep,
    ROUND(AVG(quantity) FILTER (WHERE EXTRACT(Month FROM order_date) = 10)) AS Okt,
    ROUND(AVG(quantity) FILTER (WHERE EXTRACT(Month FROM order_date) = 11)) AS Nov,
    ROUND(AVG(quantity) FILTER (WHERE EXTRACT(Month FROM order_date) = 12)) AS Des
FROM orders 
JOIN order_details ON orders.order_id = order_details.order_id
JOIN products ON products.product_id = order_details.product_id
WHERE (EXTRACT(YEAR FROM order_date) = $1 OR $1 IS NULL)
    AND (product_name LIKE $2 OR $2 = '')
GROUP BY year, product_name
ORDER BY product_name, year;