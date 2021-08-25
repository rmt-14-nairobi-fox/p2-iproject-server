const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_AUTH_ID);
class UserController {
  static async findUser(req, res, next) {
    const { email } = req.user;
    const userLogin = await User.findOne({
      where: {
        email: email,
      },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    res.status(200).json(userLogin);
  }
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
  static async googleLogin(req, res, next) {
    try {
      let access_token;
      const ticket = await client.verifyIdToken({
        idToken: req.body.access_token,
        audience: process.env.GOOGLE_AUTH_ID,
      });
      if (!ticket) {
        throw { name: "LoginFailed" };
      } else {
        const user = ticket.getPayload();
        const email = user.email;
        const payload = {
          fullName: user.given_name,
          username: user.given_name + user.family_name,
          email: user.email,
          password: user.sub,
          phoneNumber: user.sub,
          address: "Indonesia",
          imgUser: user.picture,
        };
        const createUser = await User.findOrCreate({
          where: { email: email },
          defaults: payload,
        });
        access_token = signToken({
          id: createUser[0].id,
          email: createUser[0].email,
        });
        res.status(200).json({ access_token });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
