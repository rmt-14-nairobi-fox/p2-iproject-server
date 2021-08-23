const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function auth(req, res, next) {
  const { access_token: accessToken } = req.headers;
  try {
    if (accessToken) {
      const tokenVerified = verifyToken(accessToken);
      const userVerified = await User.findByPk(+tokenVerified.id);

      if (userVerified) {
        req.user = {
          id: tokenVerified.id,
          email: tokenVerified.email,
          role: tokenVerified.role,
        };
        next();
      } else {
        throw { name: "UserNotFound" };
      }
    } else {
      throw { name: "NoToken" };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { auth };
