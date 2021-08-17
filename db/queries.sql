-- View all departments
SELECT * FROM department;

-- View all roles
SELECT roles.id, roles.title, department.department_name, roles.salary
FROM department JOIN roles
ON department.id = roles.department_id
ORDER BY department_name;

-- View all employees
WITH manager(manager_name, id, manager_id) as 
    (SELECT e1.first_name, e1.id, e2.manager_id
    FROM employee e1, employee e2
    WHERE e1.id = e2.manager_id)
    SELECT DISTINCT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, manager.manager_name
    FROM roles JOIN employee JOIN manager
    ON roles.id = employee.role_id;


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