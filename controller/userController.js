const {
  signToken,
  verifyToken,
  genPass,
  checkPass,
} = require("../helpers/util");
const { User, Animal, Chat } = require("../models");

class userController {
  //! login
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
}

module.exports = userController;
