const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'the.newromantimes21@gmail.com',
    pass: process.env.GMAIL,
  },
});

module.exports = mailTransporter;
