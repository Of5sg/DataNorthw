
-- her ser vi gjennomsnittlig forsendelsestid, for hvert fraktfirma

SELECT 
    shippers.company_name, 
    FLOOR(AVG(shipped_date - order_date)) AS dager, 
    ROUND((AVG(shipped_date - order_date) - FLOOR(AVG(shipped_date - order_date))) * 24, 2) AS timer
FROM shippers
JOIN orders 
    ON ship_via = shipper_id
GROUP BY company_name
ORDER BY shippers.company_name;


-- det virker som om datasettet bare inneholder data for 3 av fraktfirmaene