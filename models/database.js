let mysql = require('mysql');
const config = require('../config/appconfig');

let db = mysql.createConnection(config.config.db.db4free);

module.exports = db;
