-- her ser vi hvilken leveradørsom genererer mest omsetning

SELECT suppliers.supplier_id, company_name, count(order_details.product_id) AS solgt
FROM suppliers
JOIN products ON suppliers.supplier_id = products.supplier_id
JOIN order_details ON order_details.product_id = products.product_id
GROUP BY suppliers.supplier_id
ORDER BY solgt DESC;
