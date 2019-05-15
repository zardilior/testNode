var express = require('express');
var app = express();
var models = require('./models.js');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mydb'
});
app.use(bodyParser.json());

app.get('/employees/subscription', function(req, res){
    models.subscription.create(
        req.body.email,
        req.body.skills
    )
});

app.get('/employees/getMatching', function(req, res){
    // get employees for a certain email account
    models.subscription.getMatching(req.body.email)
});

app.get('/employees/signup', function(req, res){
    models.employees.create(
        req.body.account,
        req.body.password,
        req.body.skills,
    )
});

app.get('/', function(req, res){
   res.status(200);
});

app.listen(3000);
