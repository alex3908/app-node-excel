-- Creating database
CREATE DATABASE nodeapp;

-- Using Database
USE btb75txot79gpnvzheed;

-- Creating table
CREATE TABLE dataApp (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    partNumber INT(3) NOT NULL,
    description1 VARCHAR(100) NOT NULL,
    quantity INT(3) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    unitPrice INT(5) NOT NULL
);
-- Show tables
SHOW TABLES;
-- describe table
describe dataApp;