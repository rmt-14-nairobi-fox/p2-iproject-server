const { signToken, checkPass } = require("../helpers/util");
const { User, Animal, Chat } = require("../models");

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

  static async calculateLocation(req, res, next) {
    try {
      const { latitude, longitude } = req.location;
      const animals = await Animal.findAll({
        include: [{ model: User, attributes: { exclude: ["password"] } }],
      });

      animals.forEach((el) => {
        el.User.distance = User.getDistanceKm(
          el.User.latitude,
          el.User.longitude,
          latitude,
          longitude
        );
      });

      const data = animals.filter((el) => el.User.distance <= 30);

      if (!data.length) throw { code: 400, name: "No Nearby Adopted" };

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
