// Delcaring Globals
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consTable = require('console.table');

const db = mysql.createConnection({
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'password',
      database: 'company'
    },
    console.log(`Connected to the company database.`));

// Intro banner function
function intro() {
    console.log(`
+-------------------------------------------------+
|        _____           _                        |
|       |   __|_____ ___| |___ _ _ ___ ___        |
|       |   __|     | . | | . | | | -_| -_|       |
|       |_____|_|_|_|  _|_|___|_  |___|___|       |
|                   |_|       |___|               |
|   _____                                   _     |
|  |     |___ ___ ___ ___ ___ _____ ___ ___| |_   |
|  | | | | .'|   | .'| . | -_|     | -_|   |  _|  |
|  |_|_|_|__,|_|_|__,|_  |___|_|_|_|___|_|_|_|    |
|                    |___|                        |
+-------------------------------------------------+
`);
    console.log(`Select from the list what you'd like to do`);
}

function viewAllEmployees() {
    console.log(`SELECTED: View All Employees`);
    // SQL command to execute
    const sql = `SELECT * FROM company.employee;`;
    // database querying for the employee table
    db.query(sql, (error, rows) => {
        if (error){
            console.log("Error");
            return;
        } else {
            console.clear();
            console.table(rows);
        }
        mainMenu();
    });
}

function addEmployee() {
    console.log(`SELECTED: Add Employee`);

    mainMenu();
}

function updateEmployeeRole() {
    console.log(`SELECTED: Update Employee Role`);
    mainMenu();
}

function viewAllRoles() {
    console.log(`SELECTED: View All Roles`);
    // SQL command to execute
    const sql = `SELECT * FROM company.role;`;
    // database querying for the role table
    db.query(sql, (error, rows) => {
        if (error){
            console.log(`Error: ${error}`);
            return;
        } else {
            console.clear();
            console.table(rows);
        }
        mainMenu();
    });
}

function addRole() {
    console.log(`SELECTED: Add Role`);
    mainMenu();
}

function viewAllDepartments() {
    console.log(`SELECTED: View All Departments`);
    // SQL command to execute
    const sql = `SELECT * FROM company.department;`;
    // database querying for the department table
    db.query(sql, (error, rows) => {
        if (error){
            console.log(`Error: ${error}`);
            return;
        } else {
            console.clear();
            console.table(rows);
        }
        mainMenu();
    });
}

function addDepartment() {
    console.log(`SELECTED: Add Department`);
    mainMenu();
}

function mainMenu() {
    inquirer.prompt([{
        type: `list`,
        message: `Main Menu`,
        choices: [
        `View All Employees`,
        `Add Employee`,
        `Update Employee Role`,
        `View All Roles`,
        `Add Role`,
        `View All Departments`,
        `Add Department`,
        `Quit`],
        name: `menu`
    }]).then((answer) => {
        console.log(`A choice was made`);
        switch(answer.menu) {
            case(`View All Employees`):
                viewAllEmployees();
                break;
            case(`Add Employee`):
                addEmployee();
                break;
            case(`Update Employee Role`):
                updateEmployeeRole();
                break;
            case(`View All Roles`):
                viewAllRoles();
                break;
            case(`Add Role`):
                addRole();
                break;
            case(`View All Departments`):
                viewAllDepartments();
                break;
            case(`Add Department`):
                addDepartment();
                break;
            case(`Quit`):
                console.log(`Goodbye!`);
                db.end();
                break;
        }
    });
}

function init() {
    intro();
    mainMenu();
}

init();