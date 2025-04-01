SELECT orders.order_id, order_date, orders.customer_id, contact_name, product_name, quantity  
FROM orders
JOIN customers ON customers.customer_id = orders.customer_id
JOIN order_details ON orders.order_id = order_details.order_id
JOIN products ON products.product_id = order_details.product_id;