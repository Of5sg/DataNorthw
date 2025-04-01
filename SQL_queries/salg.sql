-- her henter jeg ut ordrenummer, ordredato, kundenavn, produktnavn og antall
--grupperer etter kunder, her ser vi hvem som kjøper mest

-- SELECT orders.order_id, order_date, orders.customer_id, contact_name, product_name, quantity  
-- FROM orders
-- JOIN customers ON customers.customer_id = orders.customer_id
-- JOIN order_details ON orders.order_id = order_details.order_id
-- JOIN products ON products.product_id = order_details.product_id;
-- -- GROUP BY orders.customer_id, quantity;

----- trenger mer arbeid, denne

SELECT orders.order_id, order_date, contact_name, product_name, quantity
FROM orders
JOIN order_details ON order_details.order_id = orders.order_id
JOIN customers ON customers.customer_id = orders.customer_id
JOIN products ON products.product_id = order_details.product_id
-- GROUP BY customers.contact_name
ORDER BY quantity DESC;

-- her er jeg ikke sikker på hvordan jeg skal bruke group by?

-- SELECT contact_name, SUM(quantity)
-- FROM customers
-- JOIN orders ON orders.customer_id = customers.customer_id
-- JOIN order_details ON order_details.order_id = orders.order_id
-- GROUP BY contact_name
-- ORDER BY contact_name;
