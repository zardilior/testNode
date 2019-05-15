'user strict';

var mysql = require('mysql');

//local mysql db connection
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'example'
});
module.exports = function() {
    return pool.getConnection(function(err, connection) {
        if(err) throw err;
        return connection;
    });
};

