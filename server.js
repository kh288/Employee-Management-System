const inquirer = require('inquirer');
const mysql = require('mysql2');

function mainMenu() {
    console.log(`Welcome to the Employee Management System`);
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
    }])
    .then((answer) => {
        
    })
}