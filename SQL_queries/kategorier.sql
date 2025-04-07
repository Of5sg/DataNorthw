
-- her finner vi ut hvor mange varer som er solgt for hver kategori


SELECT category_name, count(products.category_id) AS antall_salg_per_kategori
FROM categories
JOIN products ON categories.category_id = products.category_id
JOIN order_details ON order_details.product_id = products.product_id
GROUP BY category_name
ORDER BY antall_salg_per_kategori DESC;

