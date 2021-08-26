const nodemailer = require("nodemailer");

async function main() {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GOOGLE_EMAIL, // generated ethereal user
      pass: process.env.GOOGLE_PASSWORD, // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from: "hansenpanggabean@gmail.com", // sender address
    to: "hansenpanggabean@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Travel Package Confirm", // plain text body
    html: "<b>Travel Package Confirm</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);  
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);

module.exports = main