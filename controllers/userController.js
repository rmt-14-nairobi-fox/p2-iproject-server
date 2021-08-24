const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
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
  static async login(req, res, next) {}
  static async googleLogin(req, res, next) {}
}

module.exports = UserController;
