-- her henter jeg data som varenummer, beskrivelse, pris, og lagerbeholdning
-- og legger ved kontaktinfo til leverandørene for hver vare

SELECT product_id, unit_price, product_name, units_in_stock, description
FROM products
JOIN categories ON categories.category_id = products.category_id
JOIN suppliers ON products.supplier_id = suppliers.supplier_id;