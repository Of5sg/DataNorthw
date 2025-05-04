
-- her finner vi hvem som har solgt mest, og kontaktinfo til de ansatte

SELECT employees.employee_id, CONCAT(first_name, ' ', last_name) AS name, title, hire_date, count(orders.employee_id) as antall_salg
FROM employees
JOIN orders ON employees.employee_id = orders.employee_id
WHERE (EXTRACT(YEAR FROM hire_date) = $1 OR $1 IS NULL)
    AND (EXTRACT(MONTH FROM hire_date) = $2 OR $2 IS NULL)
    AND (first_name LIKE $3 OR $3 = '')
    AND (last_name LIKE $4 OR $4 = '')
    AND (employees.employee_id = $5 OR $5 IS NULL)
    AND (title LIKE $6 OR $6 = '')
GROUP BY employees.employee_id
ORDER BY antall_salg DESC;


