const { checkPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  // ! CMS SIDE
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
        city: req.body.city,
      };

      try {
        const createUser = await User.create(data);
        res.status(201).json({
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

  static async login(req, res, next) {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const emailVerification = await User.findOne({
        where: {
          email: data.email,
        },
      });
      if (emailVerification) {
        const passwordVerification = checkPassword(
          data.password,
          emailVerification.password
        );
        if (passwordVerification) {
          const accessToken = signToken({
            id: emailVerification.id,
            email: emailVerification.email,
            role: emailVerification.role,
          });

          res.status(200).json({
            access_token: accessToken,
            user_email: emailVerification.email,
            user_role: emailVerification.role,
            user_id: emailVerification.id,
          });
        } else {
          throw { name: "UserPasswordError" };
        }
      } else {
        throw { name: "UserPasswordError" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async userProfile(req, res, next) {
    const { id } = req.user;
    try {
      const userVerified = await User.findByPk(+id);

      if (userVerified) {
        res.status(200).json(userVerified);
      } else {
        throw { name: "UserVerify" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async edit(req, res, next) {
    const { id } = req.user;

    const data = {
      fullname: req.body.fullname,
      // ! at moment email can not be changed
      // email: req.body.email,
      // password: req.body.password,
      phonenumber: req.body.phonenumber,
      address: req.body.address,
      zipCode: req.body.zipCode,
    };

    try {
      const userVerified = await User.findByPk(+id);

      if (userVerified) {
        const updatedUser = await User.update(data, {
          where: { id: id },
          returning: true,
          individualHooks: true,
        });
        res.status(200).json(updatedUser[1][0]);
      } else {
        throw { name: "UserVerify" };
      }
    } catch (err) {
      next(err);
    }
  }

  // ! PUBLIC
  static async registerPublic(req, res, next) {
    try {
      const data = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        role: "customer",
        zipCode: req.body.zipCode,
        city: req.body.city,
      };

      try {
        const createUser = await User.create(data);
        res.status(201).json({
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

  static async loginPublic(req, res, next) {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const emailVerification = await User.findOne({
        where: {
          email: data.email,
        },
      });
      if (emailVerification) {
        const passwordVerification = checkPassword(
          data.password,
          emailVerification.password
        );
        if (passwordVerification) {
          const accessToken = signToken({
            id: emailVerification.id,
            email: emailVerification.email,
            role: emailVerification.role,
          });

          res.status(200).json({
            access_token: accessToken,
            user_email: emailVerification.email,
            user_role: emailVerification.role,
            user_id: emailVerification.id,
          });
        } else {
          throw { name: "UserPasswordError" };
        }
      } else {
        throw { name: "UserPasswordError" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async userProfilePublic(req, res, next) {
    const { id } = req.user;
    try {
      const userVerified = await User.findByPk(+id);

      if (userVerified) {
        res.status(200).json(userVerified);
      } else {
        throw { name: "UserVerify" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async editPublic(req, res, next) {
    const { id } = req.user;

    const data = {
      fullname: req.body.fullname,
      // ! at moment email can not be changed
      // email: req.body.email,
      // password: req.body.password,
      phonenumber: req.body.phonenumber,
      address: req.body.address,
      zipCode: req.body.zipCode,
    };

    try {
      const userVerified = await User.findByPk(+id);

      if (userVerified) {
        const updatedUser = await User.update(data, {
          where: { id: id },
          returning: true,
          individualHooks: true,
        });
        res.status(200).json(updatedUser[1][0]);
      } else {
        throw { name: "UserVerify" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async googleAuthVerify(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const userPayload = ticket.getPayload();

      const data = {
        fullname: `${userPayload.given_name}${userPayload.family_name}`,
        email: userPayload.email,
        password: `${userPayload.given_name}branded`,
        role: "customer",
        zipCode: "16453",
        city: "depok",
        address: "Jalan Raya margonda",
      };

      const foundUser = await User.findOne({
        where: {
          email: userPayload.email,
        },
      });

      if (!foundUser) {
        // should login even email is there?
        const createUser = await User.create(data);

        const access_token = signToken({
          id: createUser.id,
          email: createUser.email,
          role: createUser.role,
        });

        const userEmail = createUser.email;
        const userRole = createUser.role;
        const userId = createUser.id;

        res.status(200).json({ access_token, userEmail, userRole, userId });
      } else {
        const access_token = signToken({
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role,
        });

        const userEmail = foundUser.email;
        const userRole = foundUser.role;
        const userId = foundUser.id;

        res.status(200).json({ access_token, userEmail, userRole, userId });
      }
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
