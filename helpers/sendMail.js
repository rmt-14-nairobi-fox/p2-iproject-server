const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "andreas160295@gmail.com", // generated ethereal user
    pass: "M@suk4j4", // generated ethereal password
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
