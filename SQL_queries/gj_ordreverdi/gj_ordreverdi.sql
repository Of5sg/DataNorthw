SELECT contact_name, ROUND(AVG((unit_price * quantity) * (1 - discount))::numeric, 2) AS gjennomsnitt_per_kunde
FROM customers
JOIN orders ON orders.customer_id = customers.customer_id
JOIN order_details ON order_details.order_id = orders.order_id
GROUP BY contact_name
ORDER BY gjennomsnitt_per_kunde DESC;