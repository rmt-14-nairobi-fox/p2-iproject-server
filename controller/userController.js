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
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;
