CREATE DATABASE my_db;
use my_db;

create table users(
  ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(20),
  password varchar(500),
  email varchar(50),
  phone varchar(20),
  company varchar(50)
);