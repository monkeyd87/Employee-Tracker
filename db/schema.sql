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
    ('Kitchen'),
    ('Marketing'),
    ('Executive');
INSERT INTO role
    (title, salary, Departmentid)
VALUES
    ('General Manager', 11000000, 1),
    ('Intern', 4000000, 1),
    ('Lead Analyst', 15000000, 2),
    ('Analyst', 8000000, 2),
    ('Media Manager', 7000000, 3),
    ('Media Specialist', 3000000, 3),
    ('CEO', 45000000, 4),
    ('CEO Assistant', 25000000, 4);
INSERT INTO employee
    (first_name, last_name, Roleid, Managerid)
VALUES
    ('Farm', 'Saephanh', 1, NULL),
    ('Dwayne', 'Jackson', 2, 1),
    ('Joe', 'Mama', 3, NULL),
    ('Hugh G', 'Butts', 4, 3),
    ('Han', 'Jobbs', 5, NULL),
    ('Ben', 'Dover', 6, 5),
    ('Hugh', 'Jass', 7, NULL),
    ('Tess T', 'Culls', 8, 7);