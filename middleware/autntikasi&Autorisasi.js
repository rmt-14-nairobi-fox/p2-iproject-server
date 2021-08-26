const { verifToken } = require("../helper/jwt");
const { User, Review } = require("../models");

class Middleware {
  static async authentication(req, res, next) {
    try {
      const { access_token } = req.headers;

      if (!access_token) {
        throw { name: "Unauthorized" };
      } else {
        const payload = verifToken(access_token);

        //validate
        const checkUser = await User.findByPk(payload.id);
        if (!checkUser) {
          throw { name: "Invalid Token" };
        } else {
          req.user = {
            id: payload.id,
            email: payload.email,
            username: payload.username,
          };
          next();
        }
      }
    } catch (err) {
      next(err);
    }
  }
  static async authorization(req, res, next) {
    const ReviewId = req.params.id;
    try {
      const findReview = await Review.findByPk(ReviewId);
      if (!findReview) {
        throw { name: "NotFound" };
      } else {
        const userId = findReview.UserId;

        if (userId === +req.user.id) {
          next();
        } else {
          throw { name: "Forbidden Access" };
        }
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = Middleware;
