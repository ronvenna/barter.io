require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createPool({
    host: process.env.mysqlHost,
    user: process.env.mysqlUser,
    password: process.env.mysqlPasword,
    database : process.env.mysqlDatabase
});
module.exports = connection;