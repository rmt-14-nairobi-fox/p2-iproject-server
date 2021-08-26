const Queue = require("bull");
const { job } = require("bull");
const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");
const { User } = require("../models");

const transporter = require("./sendMail");

// const sendEmailQueue = new Queue("send email", "redis://127.0.0.1:6379");
const sendEmailQueue = new Queue("send email", {
  redis: {
    port: 15339,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASS,
  },
});

const { router, setQueues, replaceQueues, addQueue, removeQueue } =
  createBullBoard([new BullAdapter(sendEmailQueue)]);

async function bullSendemail(animal) {
  //* Producer
  const user = await User.findAll();
  const userData = user.map((el) => {
    return { email: el.email, username: el.username };
  });

  sendEmailQueue.add({
    userData,
    animal,
  });
}

//* Consumer
sendEmailQueue.process(function (job, done) {
  let err = false;

  job.data.userData.forEach((user) => {
    const htmlToSend = `
      <h1>Hello adopter ${user.username}</h1>
      <p>Please checkout our new adoption post</p>
      <h2>Animal name: ${job.data.animal.name}</h2>
      <h2>Animal kategori: ${job.data.animal.type}</h2>
      <img src="${job.data.animal.imageUrl}" alt="animal" style="width:500px;height:600px;">
      img
    `;
    const mailOpt = {
      from: "andreas160295@gmail.com", // sender address
      to: user.email, // list of receivers
      subject: "tes Bulk email", // Subject line
      html: htmlToSend, // html body
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
