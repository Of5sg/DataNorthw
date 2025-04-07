-- her ser vi gjennomsnittlig etterspørsel for hvert produkt, per måned

SELECT
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(MONTH from order_date) AS month,
    product_name, 
    ROUND(AVG(quantity)::numeric) AS antall
FROM orders 
jOIN order_details ON orders.order_id = order_details.order_id
JOIN products ON products.product_id = order_details.product_id
GROUP BY year, month, product_name
ORDER BY product_name, year, month;