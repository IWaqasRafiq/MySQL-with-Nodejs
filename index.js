const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
require("dotenv").config();
const express = require("express");
const app = express();
let ejs = require('ejs')
const Path = require("path");
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "/views"));


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// home page
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

// create user page
app.post("/user", (req, res)=>{
  let {name, email} = req.body;
  let q = `INSERT INTO user (username, email) VALUES ('${name}', '${email}')`;
  try {
  connection.query(q, (err, result) => {
    if (err) throw err;
    res.redirect("/");
    // res.send("User added successfully");
  });
} catch (err) {
  console.log(err);
}
});

// user show page
app.get("/user/:id", (req, res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  console.log(id);
  try {
  connection.query(q, (err, result) => {
    if (err) throw err;
    let user = result[0];
    res.render("show.ejs", {user});
  });
} catch (err) {
  console.log(err);
}
});

// user edit page
app.get("/user/:id/edit", (req, res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  console.log(id);
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

// update user
app.patch("/user/:id", (req, res)=>{
  let {id} = req.params;
  let {name: newname, email: newemail} = req.body;
  console.log(req.body);
  let q = `UPDATE user SET username = '${newname}', email = '${newemail}' WHERE id = '${id}'`;
  try {
  connection.query(q, (err, result) => {
    if (err) throw err;
    res.redirect("/");
    // res.send("User updated successfully");
  });
} catch (err) {
  console.log(err);
}
});

// delete user
app.delete("/user/:id", (req, res)=>{
  let {id} = req.params;
  let q = `DELETE FROM user WHERE id = '${id}'`;
  try {
  connection.query(q, (err, result) => {
    if (err) throw err;
    res.redirect("/");
    // res.send("User deleted successfully");
  });
} catch (err) {
  console.log(err);
}
});



app.listen("8080", ()=> {
  console.log("Server is start")
});

