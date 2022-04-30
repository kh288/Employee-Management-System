const inquirer = require('inquirer');
const mysql = require('mysql2');

// Placeholder Function to display the datatbase quieries
function displayDB() {
    console.log("+-----------------------------------------------+");
    console.log("|  _____           _                            |");
    console.log("| |   __|_____ ___| |___ _ _ ___ ___            |");
    console.log("| |   __|     | . | | . | | | -_| -_|           |");
    console.log("| |_____|_|_|_|  _|_|___|_  |___|___|           |");
    console.log("|             |_|       |___|                   |");
    console.log("|  _____                                   _    |");
    console.log("| |     |___ ___ ___ ___ ___ _____ ___ ___| |_  |");
    console.log("| | | | | .'|   | .'| . | -_|     | -_|   |  _| |");
    console.log("| |_|_|_|__,|_|_|__,|_  |___|_|_|_|___|_|_|_|   |");
    console.log("|                   |___|                       |");
    console.log("+-----------------------------------------------+");
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
        console.log(`Success!`);
    });
}

mainMenu();
