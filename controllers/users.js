const { User } = require('../models');
const { checkPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

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

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const find = await User.findOne({
        where: {
          email,
        },
      });

      if (find) {
        const { id, password: hashedPassword } = find;

        if (checkPassword(password, hashedPassword)) {
          const payload = {
            id,
            email,
          };

          const access_token = generateToken(payload);
          res.status(200).json({ access_token });
        } else {
          const error = new Error();
          error.name = 'Unauthorized';
          error.message = 'Invalid email/password';

          throw error;
        }
      } else {
        const error = new Error();
        error.name = 'Unauthorized';
        error.message = 'Invalid email/password';

        throw error;
      }
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }

  static async edit(req, res, next) {}
}

module.exports = Controller;
