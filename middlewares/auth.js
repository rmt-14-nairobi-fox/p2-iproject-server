const { verifyToken } = require("../helpers/jwt");
const { User, Accommodation } = require("../models");

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

async function authZOwner(req, res, next) {
  const paramsId = +req.params.id;

  try {
    if (req.user.role === "owner") {
      const foundAccommodation = await Accommodation.findByPk(paramsId);
      if (foundAccommodation) {
        if (foundAccommodation.AuthorId === +req.user.id) {
          next();
        } else {
          throw { name: "UserVerify" };
        }
      } else {
        throw { name: "AccommodationNotFound" };
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { auth, authZOwner };
