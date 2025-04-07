
-- her finner vi hvem som har solgt mest, og kontaktinfo til de ansatte

SELECT employees.employee_id, CONCAT(first_name, ' ', last_name) AS name, title, hire_date, count(orders.employee_id) as antall_salg
FROM employees
JOIN orders ON employees.employee_id = orders.employee_id
GROUP BY employees.employee_id
ORDER BY antall_salg DESC;


