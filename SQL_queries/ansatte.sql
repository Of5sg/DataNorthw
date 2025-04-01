SELECT employees.employee_id, first_name, last_name, title, hire_date, count(orders.employee_id)
FROM employees
JOIN orders ON employees.employee_id = orders.employee_id
GROUP BY employees.employee_id
ORDER BY employees.employee_id;

-- denne må jeg muligens jobbe litt mer på, den gir litt mening, men jeg forstår ikke helt hvordan count er riktig??
