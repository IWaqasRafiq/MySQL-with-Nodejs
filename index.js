const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
require("dotenv").config();
const express = require("express");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.get("/", (req , res)=>{
  res.send("Welcon to Home page");
})



app.listen("8080", ()=> {
  console.log("Server is start")
});

