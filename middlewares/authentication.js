const { User } = require('../models');
const { checkToken } = require('../helpers/jwt');

module.exports = async function (req, res, next) {
  try {
    const access_token = req.headers.access_token || null;

    if (access_token) {
      const decoded = checkToken(access_token);
      const { id, email } = decoded;

      const find = await User.findOne({
        where: {
          id,
          email,
        },
      });

      if (find) {
        req.user = {
          id,
          email,
        };

        next();
      } else {
        const error = new Error();
        error.name = 'Unauthorized';
        error.message = 'Invalid token';

        throw error;
      }
    } else {
      const error = new Error();
      error.name = 'Unauthorized';
      error.message = 'Please login first';

      throw error;
    }
  } catch (err) {
    err.endpoint = req.baseUrl;
    next(err);
  }
};
