const { verify } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = (req, res, next) => {
  const { access_token } = req.headers;
  if (access_token) {
    const payload = verify(access_token);
    User.findOne({ where: { username: payload.username } })
      .then((result) => {
        if (result) {
          req.user = { id: result.id, username: result.username };
          next();
        } else {
          next({
            name: "InvalidToken",
            message: "Invalid access token",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next({
      name: "NotLogin",
      message: "Please login first",
    });
  }
};

module.exports = {
  authentication,
};
