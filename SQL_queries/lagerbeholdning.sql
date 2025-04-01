SELECT count(order_details.product_id) as solgt, units_in_stock, product_name
FROM products
JOIN order_details ON order_details.product_id = products.product_id
GROUP BY order_details.product_id, units_in_stock, product_name
Order BY solgt;