var express = require('express');
var app = express();
var models = require('./models.js');
console.log(models)
var bodyParser = require('body-parser');

app.use(bodyParser.json());

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

app.post('/employees/subscription', (req, res)=>{
    models.subscriptions.create(
        req.body.email,
        req.body.skills
    )
});

app.get('/employees/getMatching/:email', (req, res)=>{
    // get employees for a certain email account
    models.employees.getMatching(
        req.params.email
    )
});

app.post('/employees/signup', asyncMiddleware(
    (req, res)=>{
        models.employees.create(
            req.body.account,
            req.body.password,
            req.body.skills,
        )
    })
);

app.get('/', function(req, res){
   res.sendStatus(200);
});

app.listen(3000);
