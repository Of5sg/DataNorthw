SELECT product_id, unit_price, product_name, units_in_stock, description, company_name, contact_name, phone
FROM products
JOIN categories ON categories.category_id = products.category_id
JOIN suppliers ON products.supplier_id = suppliers.supplier_id;