-- her ser vi forholdet mellom antall varer og pris

SELECT 
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(MONTH FROM order_date) AS month,
    ROUND(AVG(((unit_price*quantity)*(1 - discount))/quantity)::numeric, 2) AS snitt_pris_per,
    ROUND(AVG(discount)::numeric, 2) AS discount,
    CASE
        WHEN ROUND(AVG(quantity)::numeric, 2) < 20 THEN 'lavt volum' 
        WHEN ROUND(AVG(quantity)::numeric, 2) > 25 THEN 'høyt volum'
    ELSE
        'middels volum'
    END AS volum
FROM order_details
JOIN orders ON orders.order_id = order_details.order_id
GROUP BY year, month
ORDER BY year, month

--- jeg ser ingen sammenheng mellom gjennomsnitt av antall varer og gjennomsnitt rabatt på månedsbasis, har jeg gjort det feil?
