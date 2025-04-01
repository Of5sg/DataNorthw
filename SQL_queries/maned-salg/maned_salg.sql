SELECT EXTRACT(MONTH FROM order_date) AS month, SUM(quantity) AS totalt
FROM orders
JOIN order_details ON order_details.order_id = orders.order_id
GROUP BY month
ORDER BY month;