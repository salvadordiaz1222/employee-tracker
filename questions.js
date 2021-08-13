const Choices = require("inquirer/lib/objects/choices");

module.exports = {
  optionsPrompt: [
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "Add employee",
        "Update employee role",
        "view all roles",
        "Add role",
        "View all departments",
        "Add department",
        "View all employees",
        "Exit",
      ],
    },
  ],
};
