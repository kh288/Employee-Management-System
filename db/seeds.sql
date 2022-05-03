-- SELECT * FROM company.department;
INSERT INTO department (name)
VALUES
    ("Research"),
    ("Operations"),
    ("Marketing"),
    ("Financing");

-- |KEYS FOR DEPARTMENT|
-- |-------------------|
-- RESEARCH--: 1
-- OPERATIONS: 2
-- MARKETING-: 3
-- MANAGEMENT: 4
-- FINANCING-: 5



-- SELECT * FROM company.role;
INSERT INTO role(title, salary, department_id)
VALUES
    ("Manager", 160000, 1),
    ("Engineer", 120000, 1),
    ("Intern", 40000, 1);

-- |KEYS FOR ROLE| role_id
-- |-------------|
-- MANAGER-: 1 manager_id is associated with
-- ENGINEER: 2
-- INTERN--: 3



-- SELECT * FROM company.employee;
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
    ("John", "Doe", 1, 1);
    
INSERT INTO employee(first_name, last_name, role_id)
VALUES 
    ("Kevin", "Hernandez", 2);

-- |KEYS FOR EMPLOYEE|
-- |-----------------|
-- JOHN, DOE, 1, 1: MANAGER
-- KEVIN, HERNANDEZ, 2, 1: ENGINEER, AND UNDER MANAGEMENT OF ID 1.