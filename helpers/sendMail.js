const nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: `${process.env.MAIL_USER}`, // generated ethereal user
//     pass: `${process.env.MAIL_PASS}`, // generated ethereal password
//   },
// });

let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "05cc23caf099e5",
    pass: "98062bca57061e",
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
