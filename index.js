import express from "express"
import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : 'waqas@sql321',
  database: 'frist_crud',
});

console.log("succes");
