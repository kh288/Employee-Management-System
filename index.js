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
      database: 'company_db'
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
    console.log(`SELECTED: View All Employees
    `);
    // SQL command to execute
    
    const sql =
    `SELECT
        employee.id AS ID,
        employee.first_name AS FirstName,
        employee.last_name AS LastName,
        title AS Title,
        name AS Department,
        salary AS Salary,
        CONCAT(e.first_name,' ',e.last_name) AS Manager
    FROM employee
        LEFT JOIN role
            ON employee.role_id = role.id
        LEFT JOIN department
            ON role.department_id = department.id
        LEFT JOIN employee e
            ON employee.manager_id = e.id
            ORDER BY employee.id;`;
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
    console.log(`SELECTED: Add Employee
    `);
    db.query(`SELECT DISTINCT id, title FROM role;`, (error, roles) => {
        if (error) throw (error);
        let sql = `
        SELECT DISTINCT CONCAT(e.first_name, " ", e.last_name) AS manager_name,e.id
        FROM employee
            LEFT JOIN employee e
            ON employee.manager_id = e.id
            WHERE employee.manager_id IS NOT NULL;`;
        db.query(sql, (error, managers) => {
            if (error) throw (error);

            inquirer.prompt([{
                type: "input",
                message: "Employee's First Name",
                name: "firstName",
            },{
                type: "input",
                message: "Employee's Last Name",
                name: "lastName",
            },{
                type: "list",
                message: "Choose the employee's role",
                name: "role",
                choices: () =>
                    roles.map((roles) => roles.title),
            },{
                type: "list",
                message: "Choose the employee's manager",
                name: "manager",
                choices: () =>
                    managers.map((managers) => managers.manager_name)
            }]).then((result) => {
                const managerID = managers.filter((managers) => managers.manager_name === result.manager)[0].id;
                const roleID = roles.filter((roles) => roles.title === result.role)[0].id;

                // console.log(`Should be 1: ${managerID}`);
                // console.log(`Should be 2: ${roleID}`);
                console.log(`
                    ${result.firstName},
                    ${result.lastName},
                    ${roleID},
                    ${managerID}
                    `);
                
                let insertSQL = `
                    USE company_db;
                    INSERT INTO employee(first_name, last_name, role_id, manager_id)
                    VALUES(?, ?, ?, ?)`;
                let data = {
                    first_name: result.firstName,
                    last_name: result.lastName,
                    role_id: roleID,
                    manager_id: managerID
                };
                db.query(insertSQL, data, (error, rows) => {
                    if (error) throw (error);
                    console.log(`Added ${result.firstName} ${result.lastName} to Employees table`)
                    mainMenu();
                });
            });
        });
    });
}

function updateEmployeeRole() {
    console.clear();
    console.log(`SELECTED: Update Employee Role
    `);
    mainMenu();
}
// Function to view our roles table in our SQL database
function viewAllRoles() {
    console.clear();
    console.log(`SELECTED: View All Roles
    `);
    // SQL command to execute
    const sql =
    `SELECT 
        role.id AS ID,
        title AS Title, 
        department.name AS Department,
        salary AS Salary
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

// Function to add a role element into our Role Table in our SQL database
function addRole() {
    console.clear();
    console.log(`SELECTED: Add Role
    `);
    // DELETE FROM `company`.`role` WHERE (`id` = '4');

    // GET DEPARTMENT LIST
    // STORE DEPARTMENT LIST INTO CHOICES FOR INQUIRER
    // database querying for the department table
    db.query(`SELECT * FROM department;`, (error, rows) => {
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
            let sql = `INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)`;
            // database querying for the department table
            db.query(sql, promptData, (error, rows2) => {
                if (error) throw (error)
                else {
                    let sql = 
                    `SELECT 
                        role.id AS ID,
                        title AS Title, 
                        department.name AS Department,
                        salary AS Salary
                    FROM role LEFT
                        JOIN department 
                        ON role.department_id = department.id
                        ORDER BY role.id;`;
                    db.query(sql, (error, result) => {
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

// Function to view our department table in our SQL database
function viewAllDepartments() {
    console.clear();
    console.log(`SELECTED: View All Departments
    `);
    // SQL command to execute
    const sql = `SELECT
                    department.id AS ID,
                    name as Name
                FROM department;`;
                
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

// Function to add a department element into our SQL database
function addDepartment() {
    console.clear();
    console.log(`Current Departments
    `);

    const viewSQL = `
    SELECT
        id AS ID,
        name AS Name
    FROM department;
    `;
    db.query(viewSQL, (error, departments) => {
        if (error) throw (error)
        console.table(departments);

        inquirer.prompt([{
            type: `input`,
            message: `Department Name`,
            name: `name`,
        }]).then((result) => {
            let insertSQL = `INSERT INTO department(name)VALUES(?)`;
            db.query(insertSQL, result.name, (error, rows) => {
                if (error) throw (error);
                console.clear();
                db.query(viewSQL, (error, result) => {
                    if (error) throw (error);
                    console.table(result);
                    mainMenu();
                })
            });
        });
    });
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
    }]).then((result) => {
        console.log(`A choice was made`);
        switch(result.menu) {
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