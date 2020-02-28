var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "<username>",
  password: "<password>",
  database: 'compass'
});
conn.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database connection established");
});

module.exports = conn;

