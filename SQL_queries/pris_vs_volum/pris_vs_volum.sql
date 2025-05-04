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
WHERE (EXTRACT(YEAR FROM order_date) = $1 OR $1 IS NULL)
    AND (EXTRACT(MONTH FROM order_date) = $2 OR $2 IS NULL)
GROUP BY year, month
ORDER BY year, month

--- jeg ser ingen sammenheng mellom gjennomsnitt av antall varer og gjennomsnitt rabatt på månedsbasis
