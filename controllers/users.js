const { User } = require('../models');
const { checkPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

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
        const { id, name, password: hashedPassword, imgUrl } = find;

        if (checkPassword(password, hashedPassword)) {
          const payload = {
            id,
            email,
          };

          const access_token = generateToken(payload);
          res.status(200).json({ access_token, name, imgUrl });
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

  static async google(req, res, next) {
    try {
      const { idToken, newsPrefId } = req.body;
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { name, email, picture } = ticket.getPayload();
      const password = name + email + process.env.OAUTH_SECRET;
      const payload = {
        name,
        email,
        password,
        imgUrl: picture,
        newsPrefId,
      };

      const result = await User.findOrCreate({
        where: { email },
        defaults: payload,
      });

      const { id } = result[0];
      const newPayload = {
        id,
        email,
      };

      const accessToken = generateToken(newPayload);
      const response = {
        access_token: accessToken,
        name,
        imgUrl: picture,
      };

      res.status(result[1] ? 201 : 200).json(response);
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }

  static async edit(req, res, next) {
    try {
      const imgUrl = req.imgUrl || null;
      const name = req.body.name || null;
      const id = req.user.id;

      const payload = {
        name,
      };

      if (imgUrl) payload.imgUrl = imgUrl;

      await User.update(payload, {
        where: {
          id,
        },
      });

      res.status(200).json({ message: 'Profile updated' });
    } catch (err) {
      err.endpoint = req.baseUrl;
      next(err);
    }
  }
}

module.exports = Controller;
