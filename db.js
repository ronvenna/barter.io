require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createPool({
    host: "us-cdbr-iron-east-01.cleardb.net",
    user: "bda9d2b1606a42",
    password: "0eb9da4e",
    database : "heroku_47ab34bd9cba942"
});
module.exports = connection;
