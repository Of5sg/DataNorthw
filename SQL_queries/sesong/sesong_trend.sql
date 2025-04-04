SELECT 
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(QUARTER FROM order_date) AS quarter, 
    ROUND(AVG(quantity)::numeric, 2) AS Avg_quantity,
    MAX(quantity) AS Max_quantity, MIN(quantity) AS Min_quantity
    
    -- EXTRACT(MONTH FROM order_date) AS month,
FROM orders
JOIN order_details ON orders.order_id = order_details.order_id
GROUP BY year, quarter
ORDER BY year, quarter;