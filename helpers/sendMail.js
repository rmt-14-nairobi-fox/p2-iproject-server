const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: `${process.env.MAIL_USER}`, // generated ethereal user
    pass: `${process.env.MAIL_PASS}`, // generated ethereal password
  },
});

transporter.verify((err, succes) => {
  if (err) {
    console.log(err);
  } else {
    console.log("sever is ready to take our messages", succes);
  }
});

module.exports = transporter;
