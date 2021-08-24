const {
  signToken,
  verifyToken,
  genPass,
  checkPass,
} = require("../helpers/util");
const { User, Animal, Chat } = require("../models");
// const transporter = require("../helpers/sendMail");
// const { bullSendemail } = require("../helpers/bull");

class userController {
  static async login(req, res, next) {
    try {
      const { email: userEmail, password } = req.body;
      const result = await User.findOne({ where: { email: userEmail } });
      if (!result) throw { code: 401, name: "Unauthorized" };

      const isUser = checkPass(password, result.password);
      if (!isUser) throw { code: 401, name: "Unauthorized" };

      const { id, username, email, profilePict } = result;
      const access_token = signToken({ id, email });
      const userProfile = {
        access_token: access_token,
        id,
        username,
        email,
        profilePict,
      };
      res
        .status(200)
        .json({ userProfile, message: "you have succesfully login" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getAllanimal(req, res) {
    try {
      const animals = await Animal.findAll({
        include: [{ model: User, attributes: { exclude: ["password"] } }],
      });
      res.status(200).json(animals);
    } catch (err) {
      next({
        code: 500,
        name: "serverErr",
      });
    }
  }

  static async createAnimal(req, res, next) {
    const UserId = Number(req.user.id);
    const { name, type, imageUrl } = req.body;
    const newAnimal = { name, type, imageUrl, UserId };

    try {
      const animal = await Animal.create(newAnimal, { returning: true });

      res.status(201).json(animal);
    } catch (err) {
      next(err);
    }
  }

  static async sendEmail(req, res, next) {
    // const animals = await Animal.findAll({
    //   include: [{ model: User, attributes: { exclude: ["password"] } }],
    // });
    // let obj = {
    //   name: animals[animals.length - 1].name,
    //   type: animals[animals.length - 1].type,
    // };
    // await bullSendemail();
    //* tes bulk email
    // let testBulk = ["andreas.febryanto@gmail.com", "bekbekcustom@gmail.com"];
    // await testBulk.forEach((el) => {
    //   const mailOpt = {
    //     from: "andreas160295@gmail.com", // sender address
    //     to: el, // list of receivers
    //     subject: "tes Bulk email", // Subject line
    //     text: "tes bulk email success?", // plain text body
    //     // html: "<b>Hello world?</b>", // html body
    //   };
    //   let info = transporter.sendMail(mailOpt, (error, information) => {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log("Email sent: " + information.response);
    //     }
    //     console.log("Message sent: %s", info.messageId);
    //     console.log("Preview URL: %s", transporter.getTestMessageUrl(info));
    //   });
    // });
  }
}

module.exports = userController;
