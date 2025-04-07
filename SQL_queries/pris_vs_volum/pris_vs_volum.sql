-- her ser vi forholdet mellom antall varer og pris

SELECT 
    EXTRACT(YEAR FROM order_date) AS year,
    ROUND(AVG(((unit_price*quantity)*(1 - discount))/quantity)::numeric, 2) AS snitt_pris_per,
    ROUND(AVG(discount)::numeric, 2) AS discount,
    CASE
        WHEN quantity < 20 THEN 'lavt volum' 
        WHEN quantity > 50 THEN 'høyt volum'
    ELSE
        'middels volum'
    END AS volum
FROM order_details
JOIN orders ON orders.order_id = order_details.order_id
GROUP BY year, volum
ORDER BY year


--- det virker som man får høyere rabatt for større antall varer
