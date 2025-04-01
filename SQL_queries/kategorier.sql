SELECT category_name, count(products.category_id) AS antall_salg_per_kategori
FROM categories
JOIN products ON categories.category_id = products.category_id
GROUP BY category_name
ORDER BY antall_salg_per_kategori DESC;