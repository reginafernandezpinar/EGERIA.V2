const mysql = require("mysql"); // npm install mysql --save

// create connection to db
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'egeria'
  });
  
  // connect to db
  dbConn.connect(err => {
    if (err) {
      throw err;
    }
  });
console.log('connecting egeria db');

module.exports = dbConn;


//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

