const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
class UserController {
  static async register(req, res, next) {
    try {
      const payload = {
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
      };
      const data = await User.create(payload);
      res.status(201).json({ id: data.id, email: data.email });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!findUser) {
        throw { name: "LoginFailed" };
      } else {
        if (checkPassword(password, findUser.password)) {
          const access_token = signToken({
            id: findUser.id,
            email: findUser.email,
          });
          res.status(200).json({ access_token });
        } else {
          throw { name: "LoginFailed" };
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async googleLogin(req, res, next) {}
}

module.exports = UserController;
