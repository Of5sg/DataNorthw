SELECT units_in_stock, count(order_details.product_id)
FROM products
JOIN order_details ON order_details.product_id = products.product_id
GROUP BY order_details.product_id;