DROP DATABASE IF EXISTS EMPLOYEE_DB;
CREATE DATABASE EMPLOYEE_DB;

USE EMPLOYEE_DB;


CREATE TABLE department(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(30),
     PRIMARY KEY (id)
);


CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    Departmentid INT, 
    PRIMARY KEY (id),
    FOREIGN KEY (Departmentid) REFERENCES department(id)ON DELETE CASCADE


);


CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    Roleid INT,
    Managerid INT,
    PRIMARY KEY(id),
    FOREIGN KEY (Roleid) REFERENCES role(id)ON DELETE CASCADE,
    FOREIGN KEY (Managerid) REFERENCES employee(id) ON DELETE SET NULL



);


INSERT INTO department
    (name)
VALUES
    ('Operations'),
    ('Analystics'),
    ('Marketing'),
    ('Executive');
INSERT INTO role
    (title, salary, Departmentid)
VALUES
    ('General Manager', 11000000, 1),
    ('Coach', 4000000, 1),
    ('Team Lead Analyst', 15000000, 2),
    ('Team Analyst', 8000000, 2),
    ('Media Manager', 7000000, 3),
    ('Media Specialist', 3000000, 3),
    ('CEO', 45000000, 4),
    ('CEO Assistant', 25000000, 4);
INSERT INTO employee
    (first_name, last_name, Roleid, Managerid)
VALUES
    ('John', 'Stockton', 1, NULL),
    ('Karl', 'Malone', 2, 1),
    ('Michael', 'Jordan', 3, NULL),
    ('Steve', 'Kerr', 4, 3),
    ('Shawn', 'Kemp', 5, NULL),
    ('Gary', 'Peyton', 6, 5),
    ('Magic', 'Johnson', 7, NULL),
    ('Larry', 'Bird', 8, 7);