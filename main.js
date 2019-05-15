var express = require('express');
var app = express();
var models = require('./models.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/employees/subscription', function(req, res){
    models.subscription.create(
        req.body.email,
        req.body.skills
    )
});

app.get('/employees/getMatching/:email', function(req, res){
    // get employees for a certain email account
    models.subscription.getMatching(
        req.params.email
    )
});

app.post('/employees/signup', function(req, res){
    models.employees.create(
        req.body.account,
        req.body.password,
        req.body.skills,
    )
});

app.get('/', function(req, res){
   res.sendStatus(200);
});

app.listen(3000);
