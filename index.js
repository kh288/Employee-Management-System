const inquirer = require('inquirer');
const mysql = require('mysql2');

// Placeholder Function to display the datatbase quieries
function displayDB() {
    console.log("+-------------------------------------------------+");
    console.log("|   _____           _                             |");
    console.log("|  |   __|_____ ___| |___ _ _ ___ ___             |");
    console.log("|  |   __|     | . | | . | | | -_| -_|            |");
    console.log("|  |_____|_|_|_|  _|_|___|_  |___|___|            |");
    console.log("|              |_|       |___|                    |");
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

function mainMenu() {
    displayDB();
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
                console.log(`SELECTED: ${answer.menu}`);
                // viewAllEmployees();
                break;
            case(`Add Employee`):
                console.log(`SELECTED: ${answer.menu}`);
                // addEmployee();
                break;
            case(`Update Employee Role`):
                console.log(`SELECTED: ${answer.menu}`);
                // updateEmployeeRole();
                break;
            case(`View All Roles`):
                console.log(`SELECTED: ${answer.menu}`);
                // viewAllRoles();
                break;
            case(`Add Role`):
                console.log(`SELECTED: ${answer.menu}`);
                // addRole();
                break;
            case(`View All Departments`):
                console.log(`SELECTED: ${answer.menu}`);
                // viewAllDepartments();
                break;
            case(`Add Department`):
                console.log(`SELECTED: ${answer.menu}`);
                // addDepartment();
                break;
            case(`Quit`):
                console.log(`SELECTED: ${answer.menu}, Goodbye!`);
                break;
        }
    });
}

mainMenu();
