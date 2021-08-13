INSERT INTO department (department_name)
VALUES ("Legal"), ("Finance"), ("Engineering"), ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", "80000", 4),
     ("Lead Engineer", "150000", 3),
     ("Software Engineer", "120000", 3), 
     ("Account Manager", "160000", 2), 
     ("Accountant", "125000", 2), 
     ("Legal Team Lead", "250000", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Mike", "Chan", 4), 
    ("Ashley", "Rodriguez", 3),
    ("Kevin", "Tupik", 3),
    ("Kunal", "Singh", 2),
    ("Malia", "Brown", 2),
    ("Sarah", "Lourd", 1);