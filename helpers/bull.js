const Queue = require("bull");
const { job } = require("bull");
const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");
const { User } = require("../models");

const transporter = require("./sendMail");

const sendEmailQueue = new Queue("send email", "redis://127.0.0.1:6379");
const { router, setQueues, replaceQueues, addQueue, removeQueue } =
  createBullBoard([new BullAdapter(sendEmailQueue)]);

async function bullSendemail() {
  //* Producer
  // const job = await myFirstQueue.add({
  //   foo: 'bar'
  // });
  const user = await User.findAll();
  const userEmail = user.map((el) => el.email);
  sendEmailQueue.add({
    email: userEmail,
  });
}

//* Consumer
// myFirstQueue.process(async (job) => {
//   return doSomething(job.data);
// });
sendEmailQueue.process(function (job, done) {
  let err = false;

  job.data.email.forEach((userEmail) => {
    const mailOpt = {
      from: "andreas160295@gmail.com", // sender address
      to: userEmail, // list of receivers
      subject: "tes Bulk email", // Subject line
      text: `tes bulk email success?`, // plain text body
      // html: "<b>Hello world?</b>", // html body
    };
    let info = transporter.sendMail(mailOpt, (error, information) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + information.response);
      }

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", transporter.getTestMessageUrl(info));
    });
  });

  if (!err) {
    done(null, { msg: "sukses send email new animal post" });
  } else {
    done(new Error("error send email"), {
      msg: "sukses send email new animal post",
    });
  }
});

//* Listener
sendEmailQueue.on("completed", function (job, result) {
  console.log(result);
});

sendEmailQueue.on("failed", function (job, err) {
  console.log(err);
});

module.exports = { bullSendemail, router };
