const getConnection = require("./connection");
const express = require("express");
const inquirer = require("inquirer");

const choices = require("./questions");
const app = express();

const PORT = process.env.PORT || 3000;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const init = async () => {
  const conn = await getConnection();
  //The following two lines are to test the connection.
  //const [rows, fields] = await conn.query("SELECT * FROM (name of the table);");
  //console.log(rows);
};

init();

/*
// const for choices
const viewEmployees = async () => {};

// This will run the prompt questions
const runApp = async () => {
  let options = await inquirer.prompt(choices.optionsPrompt);
  let choice = options.choice;

  while (choice !== "Exit") {
    if (choice === "View all employees") {
      //let something = await viewEmployees;
    }
    if (choice === "Add employee") {
      //let
    }
    if (choice === "Update employee role") {
      //let
    }
    if (choice === "View all roles") {
      //let
    }
    if (choice === "Add role") {
      //let
    }
    if (choice === "View all departments") {
      //let
    }
    if (choice === "Add department") {
      //let
    }
  }
};
*/
