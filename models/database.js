let mysql = require('mysql');

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "qr_app"
});

module.exports = db;