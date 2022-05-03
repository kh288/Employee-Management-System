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
┌─────────────────────────────────────────────────┐
│        _____           _                        │
│       |   __|_____ ___| |___ _ _ ___ ___        │
│       |   __|     | . | | . | | | -_| -_|       │
│       |_____|_|_|_|  _|_|___|_  |___|___|       │
│   _____           |_|       |___|         -     │
│  |     |___ ___ ___ ___ ___ _____ ___ ___| |_   │
│  | | | | .'|   | .'| . | -_|     | -_|   |  _|  │
│  |_|_|_|__,|_|_|__,|_  |___|_|_|_|___|_|_|_|    │
│                    |___|                        │
└─────────────────────────────────────────────────┘
`);
    console.log(`Select from the list what you'd like to do`);
}

function viewAllEmployees() {
    console.clear();
    console.log(`SELECTED: View All Employees`);
    // SQL command to execute
    const sql = `SELECT * FROM company.employee;`;
    // database querying for the employee table
    db.query(sql, (error, rows) => {
        if (error){
            console.log("Error");
            return;
        } else {
            console.table(rows);
        }
        mainMenu();
    });
}

function addEmployee() {
    console.clear();
    console.log(`SELECTED: Add Employee`);
}

function updateEmployeeRole() {
    console.clear();
    console.log(`SELECTED: Update Employee Role`);
    mainMenu();
}

function viewAllRoles() {
    console.clear();
    console.log(`SELECTED: View All Roles`);
    // SQL command to execute
    const sql =
    `SELECT role.id,title, department.name AS department,salary
    FROM role LEFT
    JOIN department 
    ON role.department_id = department.id
    ORDER BY role.id;`;
    // database querying for the role table
    db.query(sql, (error, rows) => {
        if (error){
            console.log(`Error: ${error}`);
            return;
        } else {
            console.table(rows);
        }
        mainMenu();
    });
}

function addRole() {
    console.clear();
    console.log(`SELECTED: Add Role`);

    // DELETE FROM `company`.`role` WHERE (`id` = '4');

    // GET DEPARTMENT LIST
    // STORE DEPARTMENT LIST INTO CHOICES FOR INQUIRER
    // database querying for the department table
    db.query(`SELECT * FROM company.department;`, (error, rows) => {
        if (error) throw (error);
        console.log("Adding a new role");
        
        // Prompt user for adding role data
        inquirer.prompt([{
            type: `input`,
            message: `Title`,
            name: `title`,
        },{
            type: `number`,
            message: `Enter a Salary for this role`,
            name: `salary`,
        },{
            type: `list`,
            message: `Department`,
            choices: () =>
                rows.map((result) => result.name),
            name: `department`
        }]).then((result) => {
            // Iterate through our SQL data to get the ID
            let departmentId;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].name === result.department) {
                    departmentId = rows[i].id;
                }
            }
            // SQL command to execute
            let promptData = [result.title, result.salary, departmentId];
            let sql = `INSERT INTO company.role(title, salary, department_id) VALUES(?, ?, ?)`;
            // database querying for the department table
            db.query(sql, promptData, (error, rows2) => {
                if (error) throw (error)
                else {
                    db.query(`SELECT * FROM company.role;`, (error, result) => {
                        if (error) throw (error);
                        console.table(result);
                        // Once done, iterate through the main menu loop again
                        mainMenu();
                    });
                }
            });
        });
    });
}

function viewAllDepartments() {
    console.clear();
    console.log(`SELECTED: View All Departments`);
    // SQL command to execute
    const sql = `SELECT * FROM company.department;`;
    // database querying for the department table

    let departments = [];
    db.query(sql, (error, rows) => {
        if (error){
            console.log(`Error: ${error}`);
            return;
        } else {
            rows.forEach(element => {
                departments.push(element);
            });
            console.table(rows);
        }
        mainMenu();
    });
}

function addDepartment() {
    console.clear();
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
    console.clear();
    intro();
    mainMenu();
}

init();