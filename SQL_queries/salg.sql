-- her henter jeg ut ordrenummer, ordredato, kundenavn, produktnavn og antall
--grupperer etter kunder, her ser vi hvem som kjøper mest

SELECT orders.order_id, order_date, contact_name, product_name, quantity
FROM orders
JOIN order_details ON order_details.order_id = orders.order_id
JOIN customers ON customers.customer_id = orders.customer_id
JOIN products ON products.product_id = order_details.product_id
GROUP BY customers.contact_name, quantity, orders.order_id, product_name
ORDER BY quantity DESC;

