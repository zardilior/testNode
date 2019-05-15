'user strict';

var mysql = require('mysql');

//local mysql db connection
module.exports = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'guess'
});
