const { checkPass } = require("../helper/bycript");
const { jwtSign } = require("../helper/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    const { email, password, username } = req.body;
    try {
      const payload = {
        email: email,
        password: password,
        username: username,
      };
      const result = await User.create(payload);
      res.status(201).json({ id: result.id, email: result.email });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const result = await User.findOne({ where: { email: email } });
      if (result) {
        if (checkPass(password, result.password)) {
          const access_token = jwtSign({ id: result.id, email: result.email, username: result.username });
          res.status(200).json({ access_token });
        } else {
          throw { name: "UnauthorizedLogin" };
        }
      } else {
        throw { name: "UnauthorizedLogin" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
