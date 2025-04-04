SELECT 
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(QUARTER FROM order_date) AS quarter, 
    EXTRACT(MONTH FROM order_date) AS month

FROM orders
GROUP BY year, quarter, month
ORDER BY year, quarter, month