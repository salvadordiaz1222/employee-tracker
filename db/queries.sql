-- View all departments
SELECT * FROM department;

-- View all roles
SELECT roles.id, roles.title, department.department_name, roles.salary
FROM department JOIN roles
ON department.id = roles.department_id
ORDER BY department_name;

-- View all employees
SELECT employee.id, employee.first_name, employee.last_name
FROM roles JOIN employee
ON roles.department_id = employee.manager_id;

-- Tish comments:
SELECT first_name + ' ' + last_name 
as full_name
FROM employees;

roles=manager
manager_id?
manager_id = employee.id WHERE roles = "manager";

const manager_id = 4

SELECT * FROM employees WHERE id = 4;

SELECT * FROM employees WHERE id = manager_id;

-- View employees by manager

-- View employees by department

-- View the total salaries by department