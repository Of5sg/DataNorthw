
-- her hentes informasjon om lagerbeholdning og antall solgte varer

SELECT count(order_details.product_id) as solgt, units_in_stock, product_name
FROM products
JOIN order_details ON order_details.product_id = products.product_id
WHERE (product_name LIKE $1 OR $1 = '')
GROUP BY order_details.product_id, units_in_stock, product_name
ORDER BY solgt DESC;