var models = require('./models.js');
var sendMail = require('./mail.js')
// for each subscription
var subscriptions = models.subscriptions.getAll()
for(let account of subscriptions){
    // get from developers
    models.employees.getMatching(account.skills)
    // send email with list
    sendMail(account.email)
}
