const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
require("dotenv").config();
const express = require("express");
const app = express();
let ejs = require('ejs')
const Path = require("path");

app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "/views"));


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.get("/", (req , res)=>{
  let q = `SELECT * FROM user`;
  try {
  connection.query(q, (err, result) => {
    if (err) throw err;
    let users = result;
    res.render("home.ejs", {users});
  });
} catch (err) {
  console.log(err);
}
});

app.get("/user/:id/edit", (req, res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
  connection.query(q, (err, result) => {
    if (err) throw err;
    let users = result[0];
    res.render("edit.ejs", {users});
  });
} catch (err) {
  console.log(err);
}
});



app.listen("8080", ()=> {
  console.log("Server is start")
});

