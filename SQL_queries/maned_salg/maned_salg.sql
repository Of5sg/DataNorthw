
-- her velger jeg en måned av gangen
-- henter, og presenterer data for hver måned

SELECT 
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(MONTH FROM order_date) AS month, 
    SUM(quantity) AS totalt_antall_salg
FROM orders
JOIN order_details ON order_details.order_id = orders.order_id
WHERE (EXTRACT(YEAR FROM order_date) = $1 OR $1 IS NULL)
    AND (EXTRACT(MONTH FROM order_date) = $2 OR $2 IS NULL)
GROUP BY year, month
ORDER BY year, month;
