-- her henter jeg data som varenummer, beskrivelse, pris, og lagerbeholdning
-- og legger ved kontaktinfo til leverandørene for hver vare

SELECT product_id, product_name, description, unit_price, units_in_stock
FROM products
JOIN categories ON categories.category_id = products.category_id
JOIN suppliers ON products.supplier_id = suppliers.supplier_id;