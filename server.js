const getConnection = require("./connection");
const express = require("express");
const inquirer = require("inquirer");
const cTable = require("console.table");

const choices = require("./questions");
const app = express();

const PORT = process.env.PORT || 3000;

let connection;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const init = async () => {
  connection = await getConnection();

  await runApp();
};

init();

const viewEmployees = async () => {
  // Run query and get results back (rows)
  const [rows, fields] = await connection.query(
    "WITH manager(manager_name, id, manager_id) as (SELECT e1.first_name, e1.id, e2.manager_id FROM employee e1, employee e2 WHERE e1.id = e2.manager_id) SELECT DISTINCT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, manager.manager_name FROM roles JOIN employee JOIN manager ON roles.id = employee.role_id;"
  );
  console.table(rows);
  // Print results to console
  return rows;
};

const viewDepartments = async () => {
  const [rows, fields] = await connection.query("SELECT * FROM department;");
  console.table(rows);
  return rows;
};

const viewRoles = async () => {
  const [rows, fields] = await connection.query(
    "SELECT roles.id, roles.title, department.department_name, roles.salary FROM department JOIN roles ON department.id = roles.department_id ORDER BY department_name;"
  );
  console.table(rows);
  return rows;
};

const addEmployee = async () => {
  const firstName = await defaultPrompt("First Name", [], "input");
  const lastName = await defaultPrompt("Last Name", [], "input");
  const roles = await getRolesNamesAndIds();
  const roleName = await defaultPrompt(
    "Choose a role",
    roles.map((r) => r.title) // Return all titles
  );
  const roleId = roles.find((r) => r.title === roleName).id; // Find the item that the user selected (by title) and only get the id

  const employeeNames = await getEmployeeNamesAndIds();
  console.log(employeeNames);
  // Run prompt with employee names
  const managerName = await defaultPrompt("Who is the employees manager", [
    "none",
    ...employeeNames.map((e) => e.first_name + " " + e.last_name),
  ]);
  const managerId =
    employeeNames.find((e) => e.first_name + " " + e.last_name === managerName)
      .id || null;

  // Call choices, one to choose employee and another to choose role
  // Give the employeeNames and roles to your prompt as options for user to select
  // Once options are selected pass it to your query
  // Since it needs to store the id, only pass the id
  const [rows, fields] = await connection.execute(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?) ;",
    [firstName, lastName, roleId, managerId]
  );
  console.log(rows);
};

const addDepartment = async () => {
  const department = await defaultPrompt(
    "What is the name of the department?",
    [],
    "input"
  );

  const [rows, fields] = await connection.execute(
    "INSERT INTO department (department_name) VALUES (?);",
    [department]
  );
};

const addRole = async () => {
  const role = await defaultPrompt(
    "What is the name of the role?",
    [],
    "input"
  );
  const salary = await defaultPrompt(
    "What is the salary of the role?",
    [],
    "input"
  );
  const departments = await viewDepartments();
  const departmentName = await defaultPrompt(
    "Choose a department",
    departments.map((d) => d.department_name)
  );
  const departmentId = departments.find(
    (d) => d.department_name === departmentName
  ).id;

  const [rows, fields] = await connection.execute(
    "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);",
    [role, salary, departmentId]
  );
  console.log(rows);
};

const updateEmployeeRole = async () => {
  const employeeNames = await getEmployeeNamesAndIds();
  const employees = await defaultPrompt(
    "Which employee do you want to update?",
    employeeNames.map((f) => f.first_name + " " + f.last_name)
  );
  const roles = await getRolesNamesAndIds();
  const role = await defaultPrompt(
    "Choose a new role",
    roles.map((r) => r.title)
  );
  const roleId = roles.find((r) => r.title === role).id;

  const employeeId = employeeNames.find(
    (f) => f.first_name + " " + f.last_name === employees
  ).id;

  const [rows, fields] = await connection.execute(
    "UPDATE employee SET role_id = ? WHERE id = ?",
    [roleId, employeeId]
  );
  console.rows(rows);
};

const getEmployeeNamesAndIds = async () => {
  // Return all employee names (managers) and ids as an array
  const [rows, fields] = await connection.query(
    "SELECT first_name, last_name, id FROM employee"
  );
  return rows;
};

const getRolesNamesAndIds = async () => {
  // Return all role names and ids as an array
  const [rows, fields] = await connection.query("SELECT title, id FROM roles");
  return rows;
};

const defaultPrompt = async (message, options, type = "list") => {
  // This is the form of the prompt
  // [
  //     {
  //       type: "list",
  //       name: "choice",
  //       message: "What would you like to do?",
  //       choices: [
  //         "View all employees",
  //         "Add employee",
  //         "Update employee role",
  //         "view all roles",
  //         "Add role",
  //         "View all departments",
  //         "Add department",
  //         "View all employees",
  //         "Exit",
  //       ],
  //     },
  //   ],
  // Generate prompt given message and options
  let choicesDefault = [
    {
      type,
      name: "choice",
      message,
      choices: options,
    },
  ];
  let data = await inquirer.prompt(choicesDefault);
  let choice = data.choice;
  return choice;
};

// This will run the prompt questions
const runApp = async () => {
  let options = await inquirer.prompt(choices.optionsPrompt);
  let choice = options.choice;

  while (choice !== "Exit") {
    if (choice === "View all employees") {
      await viewEmployees();
    }
    if (choice === "Add employee") {
      await addEmployee();
    }
    if (choice === "Update employee role") {
      await updateEmployeeRole();
    }
    if (choice === "View all roles") {
      await viewRoles();
    }
    if (choice === "Add role") {
      await addRole();
    }
    if (choice === "View all departments") {
      await viewDepartments();
    }
    if (choice === "Add department") {
      await addDepartment();
    }
    let options = await inquirer.prompt(choices.optionsPrompt);
    choice = options.choice;
  }
  process.exit(1);
};
