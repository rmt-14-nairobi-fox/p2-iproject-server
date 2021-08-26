const { checkPass } = require("../helper/bycript");
const { jwtSign } = require("../helper/jwt");
const { OAuth2Client } = require("google-auth-library");
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
  static async googleLogin(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.GOID);

      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOID,
      });
      const { email, name, locale } = ticket.getPayload();
      const data = {
        email,
        name,
        locale,
      };
      const result = await User.findOne({ where: { email: email } });
      if (result) {
        const access_token = jwtSign({ id: result.id, email: result.email, username: result.username });
        res.status(200).json({ access_token });
      } else {
        const create = await User.create({ email: data.email, password: `${data.email}+${data.password}`, username: name });
        const access_token = jwtSign({ id: create.id, email: create.email, role: create.role });
        res.status(200).json({ access_token });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
