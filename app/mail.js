const express = require('express');
const MailsvRoute = express.Router();

// Mailsv model

// Add Mailsv
MailsvRoute.route('/').post((req, res, next) => {
  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: req.body.server,
    auth: {
      user: req.body.send_from,
      pass: req.body.password
    }
  });

  var mailOptions = {
    from: req.body.send_from,
    to: req.body.mail_to,
    subject: req.body.subject,
    text: req.body.mailtext
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.json('err')
    } else {
      console.log('Email sent: ' + info.response);
      res.json('ok')
    }
  });
});


module.exports = MailsvRoute;