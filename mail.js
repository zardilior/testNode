var nodeMailer = require(nodeMailer);
let transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: ''
      pass: ''
  }
});

module.exports = function(toMail, list){
    for(let member of list){
        htmlBody += member.toHtml()
    }
    let mailOptions = {
        from: 'Test exercise Estremadoyro'
        to: toMail, // list of receivers
        subject: 'Your Developers' list', // Subject line
        html: htmlBody // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}
