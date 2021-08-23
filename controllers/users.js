const { User } = require('../models');

class Controller {
  static async register(req, res, next) {
    try {
      const { name, email, password, newsPrefId } = req.body;
      const imgUrl =
        req.imgUrl ||
        'https://ik.imagekit.io/imgmarc/default-profile_4m4ooSMXJ.png?updatedAt=1629741970508';
      const payload = {
        name,
        email,
        password,
        imgUrl,
        newsPrefId,
      };

      const response = await User.create(payload);
      const { id } = response;
      res.status(201).json({
        id,
        name,
      });
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }

  static async login(req, res, next) {}

  static async edit(req, res, next) {}
}

module.exports = Controller;
