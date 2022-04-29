// GAME PLAN
// Make a prompt, that branches into other prompts.
// Main menu prompt function
    // View All Employees
    // Add Employee
    // Update Employee Role
    // View All Roles
    // Add Role
    // View All Departments
        // Display All Departments
        // Call main menu function again
    // Add Department
    // Quit
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

