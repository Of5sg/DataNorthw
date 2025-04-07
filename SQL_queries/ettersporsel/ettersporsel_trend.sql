SELECT
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(MONTH from order_date) AS month,
    product_name, 
    quantity
FROM orders 
jOIN order_details ON orders.order_id = order_details.order_id
JOIN products ON products.product_id = order_details.product_id
-- GROUP BY month
ORDER BY product_name, year, month;
------------------------------------------------------------
-- SELECT order_date, product_name, quantity
-- FROM order_details
-- JOIN orders ON orders.order_id = order_details.order_id
-- JOIN products ON order_details.product_id = products.product_id
-- ORDER BY product_name, orders.order_date;



-- denne må tenkes mer på