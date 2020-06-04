let mysql = require('mysql');
const config = require('../config/appconfig');

let db = mysql.createConnection(config.config.db.freemysqlhosting);

module.exports = db;
