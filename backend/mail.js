// var nodemailer = require('nodemailer');
import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arvindm.22cse@kongu.edu',
    pass: 'acjs lyjx izfi vume'
  }
});

var mailOptions = {
  from: 'arvindm.22cse@kongu.edu',
  to: 'aswanthkn.22cse@kongu.edu',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});