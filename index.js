const mysql = require("mysql2");
const { faker } = require('@faker-js/faker');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : 'waqas@sql321',
  database: 'frist_crud',
});

try {

  connection.query ("SHOW TABLES", (err, result) => {
  if(err) throw err; 
  console.log(result);
  
}) 
  
} catch (err) {
  console.log(err);
  
}

let getRandomUser = () => {
  return {
    Id: faker.datatype.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
