require('dotenv').config();
var mysql = require('mysql');

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = db;