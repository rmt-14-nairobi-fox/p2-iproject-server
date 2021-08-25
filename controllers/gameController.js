const { User } = require("../models");

class GameController {
  static getHome(req, res, next) {
    res.status(200).json({ message: "Welcome to WApp" });
  }

  static joinUser(req, res, next) {
    const { username, location } = req.body;
    const newUser = {
      username,
      location,
    };
    User.create(newUser)
      .then((result) => {
        res.status(201).json({ id: result.id, username: result.username });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = GameController;
