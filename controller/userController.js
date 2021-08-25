const {
  signToken,
  verifyToken,
  genPass,
  checkPass,
} = require("../helpers/util");
const { User, Animal, Chat } = require("../models");
// const transporter = require("../helpers/sendMail");
const { bullSendemail } = require("../helpers/bull");

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
      next(err);
    }
  }

  static async createAnimal(req, res, next) {
    const UserId = Number(req.user.id);
    const { name, type, imageUrl } = req.body;
    const newAnimal = { name, type, imageUrl, UserId };

    try {
      const animal = await Animal.create(newAnimal, { returning: true });

      //* send queue
      bullSendemail(animal);
      res.status(201).json(animal);
    } catch (err) {
      next(err);
    }
  }

  static async calculateLocation(req, res, next) {
    try {
      const { latitude, longitude } = req.body;
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

      res.status(200).json(data);
    } catch (error) {
      next(err);
    }

    //! Bandung
    // andreas

    //! Depok
    // adit

    //! Bekasi
    // fanly

    //! ip
    // let lat2 = -6.1741;
    // let lon2 = 106.8296;
  }
}

module.exports = userController;
