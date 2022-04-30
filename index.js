const inquirer = require('inquirer');
const mysql = require('mysql2');

// Placeholder Function to display the datatbase quieries
function intro() {
    console.log("+-------------------------------------------------+");
    console.log("|        _____           _                        |");
    console.log("|       |   __|_____ ___| |___ _ _ ___ ___        |");
    console.log("|       |   __|     | . | | . | | | -_| -_|       |");
    console.log("|       |_____|_|_|_|  _|_|___|_  |___|___|       |");
    console.log("|                   |_|       |___|               |");
    console.log("|   _____                                   _     |");
    console.log("|  |     |___ ___ ___ ___ ___ _____ ___ ___| |_   |");
    console.log("|  | | | | .'|   | .'| . | -_|     | -_|   |  _|  |");
    console.log("|  |_|_|_|__,|_|_|__,|_  |___|_|_|_|___|_|_|_|    |");
    console.log("|                    |___|                        |");
    console.log("+-------------------------------------------------+");
    console.log("");
    console.log(`Select from the list what you'd like to do`);
    console.log("");
}

function viewAllEmployees() {
    console.log(`SELECTED: View All Employees`);
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
    mainMenu();
}

function addRole() {
    console.log(`SELECTED: Add Role`);
    mainMenu();
}

function viewAllDepartments() {
    console.log(`SELECTED: View All Departments`);
    mainMenu();
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
                console.log(`SELECTED: ${answer.menu}, Goodbye!`);
                break;
        }
    });
}

function init() {
    intro();
    mainMenu();
}

init();