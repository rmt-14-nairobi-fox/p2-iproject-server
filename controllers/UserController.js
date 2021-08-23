const { User } = require("../models");

class UserController {
  // CMS SIDE
  static async register(req, res, next) {
    try {
      const data = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        role: "owner",
        zipCode: req.body.zipCode,
      };

      try {
        const createUser = await User.create(data);
        res
          .status(201)
          .json({
            id: createUser.id,
            fullname: createUser.fullname,
            email: createUser.email,
          });
      } catch (err) {
        next(err);
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
