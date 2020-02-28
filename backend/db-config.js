var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "sahil",
  password: "sahil",
  database: 'compass'
});
conn.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database connection established");
});

module.exports = conn;

