const inquirer = require('inquirer');
const mysql = require('mysql2');

// Placeholder Function to display the datatbase quieries
function displayDB() {
    console.log(`-----------------------------------------`);
    console.log(`Welcome to the Employee Management System`);
    console.log(`-----------------------------------------`);
    console.log(`Select from the list what you'd like to do`);
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
        console.log(`Success!`);
    });
}

mainMenu();